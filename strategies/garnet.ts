import getHistoricalData from "../historical_data/getHistoricalData";

import type { IStrategy } from "../types/strategy";

const STOPLOSS = 8;
const TTL = 14;

const garnet: IStrategy = (signalDate, signalSymbol) => {
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

  for (let i = 0; i < entries.length; i++) {
    const [date, candle] = entries[i];
    const { o, c } = candle;

    if (c <= stoplossPrice) {
      daysInPosition = i + 1;
      sellPrice = stoplossPrice;
      break;
    }

    if (ttlCounter <= 0) {
      daysInPosition = i + 1;
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

  return 0;
};

export default garnet;
