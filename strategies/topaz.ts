import getHistoricalData from "../historical_data/getHistoricalData";
import { getReturns } from "./utils";

import type { IStrategy } from "../types/strategy";

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
    const { c } = candle;

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

  const change = getReturns(buyPrice, sellPrice);

  const logColor = change > 0 ? "\x1b[32m" : "\x1b[31m";

  if (!daysInPosition) {
    throw new Error("Something went wrong");
  }

  console.log(
    logColor,
    `Traded ${signalSymbol} for ${change} in ${daysInPosition} days. Bought on ${signalDate.join(
      "-"
    )}`
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
