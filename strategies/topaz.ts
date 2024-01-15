import getHistoricalData from "../historical_data/getHistoricalData";

import type { IStrategy } from "../types/strategy";

const getChange = (close: number, open: number) => {
  const change = close / open - 1;

  return change * 100;
};

const STOPLOSS = 6;
const TTL = 30;

const topaz: IStrategy = async (signalDate, signalSymbol) => {
  const historicalData = getHistoricalData(signalSymbol, signalDate, 60);

  if (!historicalData) {
    return null;
  }

  const entries = Object.entries(historicalData);

  const buyPrice = entries[0][1].o;
  let sellPrice: any;
  const stoplossPrice = ((100 - STOPLOSS) / 100) * buyPrice;

  let ttlCounter = TTL;

  for (let i = 0; i < entries.length; i++) {
    const [date, candle] = entries[i];
    const { o, c } = candle;

    if (c <= stoplossPrice) {
      sellPrice = c;
      break;
    }

    if (ttlCounter <= 0) {
      sellPrice = c;
      break;
    }

    const dailyChange = c / o - 1;

    if (dailyChange < -2) {
      ttlCounter = ttlCounter - Math.abs(Math.round(dailyChange) * 2) - 1;
    } else {
      ttlCounter = ttlCounter - 1;
    }
  }

  return getChange(sellPrice, buyPrice);
};

export default topaz;
