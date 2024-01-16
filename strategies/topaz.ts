import getHistoricalData from "../historical_data/getHistoricalData";

import type { IStrategy } from "../types/strategy";
import { getReturns } from "./utils";

const getChange = (close: number, open: number) => {
  const change = close / open - 1;

  return change * 100;
};

const STOPLOSS = 10;
const TTL = 30;

const topaz: IStrategy = (signalDate, signalSymbol) => {
  const historicalData = getHistoricalData(signalSymbol, signalDate, 60);

  if (!historicalData) {
    return null;
  }

  const entries = Object.entries(historicalData);

  const buyPrice = entries[0][1].o;
  let sellPrice: any;
  const stoplossPrice = ((100 - STOPLOSS) / 100) * buyPrice;

  let ttlCounter = TTL;
  let daysInPosition;
  let sellDate;

  for (let i = 0; i < entries.length; i++) {
    const [date, candle] = entries[i];
    const { o, c } = candle;

    if (c <= stoplossPrice) {
      daysInPosition = i + 1;
      sellPrice = stoplossPrice;
      sellDate = date.split("-").map((item) => Number(item));
      break;
    }

    if (ttlCounter <= 0) {
      daysInPosition = i + 1;
      sellPrice = c;
      sellDate = date.split("-").map((item) => Number(item));
      break;
    }

    ttlCounter = ttlCounter - 1;
  }

  const change = getChange(sellPrice, buyPrice);

  console.log(
    `Got return of ${change} from ${signalSymbol} in ${daysInPosition} days from ${signalDate}`
  );

  return {
    entryDate: signalDate,
    entryPrice: buyPrice,
    exitDate: sellDate as [number, number, number],
    exitPrice: sellPrice,
    symbol: signalSymbol,
  };
};

export default topaz;
