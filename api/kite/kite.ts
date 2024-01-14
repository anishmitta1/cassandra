import axios from "axios";
import { getKiteHeaders } from "../utils";
import {
  amoOrderUrl,
  marginsUrl,
  quoteUrl,
  regularOrderUrl,
} from "./endpoints";

import type { IKiteGetLtpPayload, IKiteGetLtpResponse } from "./kite.types";

const placeAmoBuy = async (tradingsymbol: string, quantity: number) => {
  const headers = await getKiteHeaders();

  const payload = {
    tradingsymbol,
    exchange: "NSE",
    transaction_type: "BUY",
    order_type: "MARKET",
    quantity,
    product: "CNC",
    validity: "IOC",
  };

  const {
    data: { data },
  } = await axios.post(amoOrderUrl, payload, {
    headers: {
      ...headers,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const { order_id } = data;

  return {
    orderId: order_id,
  };
};

const placeMarketBuy = async (tradingsymbol: string, quantity: number) => {
  const headers = await getKiteHeaders();

  const payload = {
    tradingsymbol,
    exchange: "NSE",
    transaction_type: "BUY",
    order_type: "MARKET",
    quantity,
    product: "CNC",
    validity: "IOC",
  };

  const {
    data: { data },
  } = await axios.post(regularOrderUrl, payload, {
    headers: {
      ...headers,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const { order_id } = data;

  return {
    orderId: order_id,
  };
};

const getLtp = async ({
  symbol,
}: IKiteGetLtpPayload): Promise<IKiteGetLtpResponse> => {
  const headers = await getKiteHeaders();

  const {
    data: { data },
  } = await axios.get(`${quoteUrl}?i=${symbol}`, { headers });

  const { instrument_token, last_price } = data[symbol];

  return {
    instrumentToken: instrument_token,
    lastPrice: last_price,
  };
};

const getFundsAvailable = async (): Promise<number> => {
  const headers = await getKiteHeaders();

  const {
    data: { data },
  } = await axios.get(marginsUrl, { headers });

  return data.equity.net;
};

export { placeMarketBuy, placeAmoBuy, getLtp, getFundsAvailable };
