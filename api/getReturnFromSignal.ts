import axios from "axios";

import type { ITransactionSignal } from "../types/signal";

const getFormattedSignalDate = (signalDate: ITransactionSignal["date"]) => {
  return signalDate
    .map((dateItem) => {
      if (dateItem.toString().length === 1) {
        return `0${dateItem}`;
      }

      return dateItem;
    })
    .reverse()
    .join("-");
};

const getReturns = (open: number, close: number) => {
  return (close / open - 1) * 100;
};

const getReturnFromSignal = async (
  signalDate: ITransactionSignal["date"],
  signalSymbol: ITransactionSignal["symbol"]
) => {
  const symbolWithExchange = `${signalSymbol}.BSE`;
  const endpoint = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbolWithExchange}&outputsize=full&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`;

  const { data } = await axios.get(endpoint);

  const historicalData = data[Object.keys(data)[1]];
  console.log({ historicalData, data });
  const candleEntries = Object.entries(historicalData).reverse();

  const formattedSignalDate = getFormattedSignalDate(signalDate);

  let buyPrice = 0;
  let sellPrice = 0;
  let ttl = 30;
  let isPositionAcitve = false;

  for (let i = 0; i < candleEntries.length; i++) {
    const [date, candle]: any = candleEntries[i];
    if (date === formattedSignalDate) {
      buyPrice = Number(candle["1. open"]);
      isPositionAcitve = true;
    }

    if (isPositionAcitve) {
      const candleOpen = Number(candle["1. open"]);
      const candleClose = Number(candle["4. close"]);

      if (ttl <= 0) {
        sellPrice = candleOpen;
        isPositionAcitve = false;
        break;
      }

      const change = getReturns(candleOpen, candleClose);

      if (change < -2) {
        ttl = ttl - Math.abs(Math.round(change) * 2) - 1;
      } else {
        ttl = ttl - 1;
      }
    }
  }

  const returns = getReturns(buyPrice, sellPrice);

  return returns;
};

export default getReturnFromSignal;
