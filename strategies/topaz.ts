import getHistoricalData from "../historical_data/getHistoricalData";

import type { IStrategy } from "../types/strategy";

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
  const change = getChange(sellPrice, buyPrice);

  console.log(
    `Got return of ${change} from ${signalSymbol} in ${daysInPosition} days from ${signalDate}`
  );

  return change;
};

export default topaz;
