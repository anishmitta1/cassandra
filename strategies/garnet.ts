import getHistoricalData from "../historical_data/getHistoricalData";
import { getReturns } from "./utils";

import type { IStrategy } from "../types/strategy";

const getStopLossFromDays = (days: number): number => {
  if (days <= 5) {
    return -10;
  } else if (days <= 10) {
    return -5;
  } else if (days <= 15) {
    return 0;
  } else if (days <= 20) {
    return 5;
  } else if (days <= 25) {
    return 10;
  } else if (days <= 30) {
    return 15;
  } else {
    return days - 5;
  }
};

const garnet: IStrategy = (signalDate, signalSymbol) => {
  const historicalData = getHistoricalData(signalSymbol, signalDate, 60);

  if (!historicalData) {
    return null;
  }

  const entries = Object.entries(historicalData);

  const buyPrice = entries[0][1].o;
  let sellPrice: any;

  let daysInPosition = 0;
  let sellDate;

  for (let i = 0; i < entries.length; i++) {
    const [date, candle] = entries[i];
    const { o, c } = candle;
    const stopLoss = getStopLossFromDays(daysInPosition);
    const stoplossPrice = ((100 + stopLoss) / 100) * buyPrice;

    if (c <= stoplossPrice) {
      daysInPosition = i + 1;
      sellPrice = stoplossPrice;
      sellDate = date.split("-").map((item) => Number(item));
      break;
    }

    daysInPosition += 1;
  }

  const change = getReturns(buyPrice, sellPrice);

  console.log(`Traded ${signalSymbol} for ${change} in ${daysInPosition} days`);

  return {
    entryDate: signalDate,
    entryPrice: buyPrice,
    exitDate: sellDate as [number, number, number],
    exitPrice: sellPrice,
    symbol: signalSymbol,
  };
};

export default garnet;
