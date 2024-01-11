import axios from "axios";
import getAccessToken from "../firebase/getAccessToken";

import type { IBacktestCandle, ITransactionSignal } from "../types/signal";
import { historicalUrl, quoteUrl } from "./config";

let accessToken: string | null = null;

const instrumentTokenCache: { [symbol: string]: number } = {};

const getDailyCandle = async (
  date: ITransactionSignal["date"],
  symbol: ITransactionSignal["symbol"]
) => {
  if (!accessToken) {
    accessToken = await getAccessToken();
  }

  if (!instrumentTokenCache[symbol]) {
    const endpoint = `${quoteUrl}?i=NSE:${symbol}`;
    const {
      data: { data },
    } = await axios.get(endpoint, {
      headers: {
        "X-Kite-Version": "3",
        Authorization: `token ${process.env.KITE_API_KEY}:${accessToken}`,
      },
    });

    const { instrument_token: instrumentToken } = data[`NSE:${symbol}`];
    instrumentTokenCache[symbol] = instrumentToken;
  }

  const instrumentToken = instrumentTokenCache[symbol];

  const candleDate = `${date[2]}-${date[1]}-${date[0]}+09:15:00`;

  const endpoint = `${historicalUrl}/${instrumentToken}/day?from=${candleDate}&to${candleDate}`;

  const { data } = await axios.get(endpoint, {
    headers: {
      "X-Kite-Version": "3",
      Authorization: `token ${process.env.KITE_API_KEY}:${accessToken}`,
    },
  });

  console.log({ data });

  return {
    foo: "bar",
  };
};

export default getDailyCandle;
