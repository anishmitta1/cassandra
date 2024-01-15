import getHistoricalData from "../historical_data/getHistoricalData";

import type { IStrategy } from "../types/strategy";
import type {
  IBacktestCandle,
  IBacktestDate,
  ICandle,
  ITransactionSignal,
} from "../types/signal";

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

const addMonthsToDate = (
  date: IBacktestDate,
  monthsToAdd: number
): IBacktestDate => {
  const [day, month, year] = date;

  const newMonth = ((month + monthsToAdd - 1) % 12) + 1;

  const newYear = newMonth === 1 ? year + 1 : year;

  return [day, newMonth, newYear];
};

const topaz: IStrategy = async (signalDate, signalSymbol) => {
  // const toDate: IBacktestDate = [30, 4, 2023];

  const historicalData = getHistoricalData(signalSymbol, signalDate, 50);

  console.log({ historicalData });

  // const symbolWithExchange = `${signalSymbol}.BSE`;
  // const endpoint = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbolWithExchange}&outputsize=full&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`;

  // const { data } = await axios.get(endpoint);

  // const historicalData = data[Object.keys(data)[1]];

  // if (!historicalData) {
  //   console.log(`Something went wrong with ${signalSymbol}`, historicalData);
  //   return null;
  // }

  // const candleEntries = Object.entries(historicalData).reverse();

  // const formattedSignalDate = getFormattedSignalDate(signalDate);

  // let buyPrice = 0;
  // let sellPrice = 0;
  // let ttl = 30;
  // let isPositionAcitve = false;

  // for (let i = 0; i < candleEntries.length; i++) {
  //   const [date, candle]: any = candleEntries[i];
  //   if (date === formattedSignalDate) {
  //     buyPrice = Number(candle["1. open"]);
  //     isPositionAcitve = true;
  //   }

  //   if (isPositionAcitve) {
  //     const candleOpen = Number(candle["1. open"]);
  //     const candleClose = Number(candle["4. close"]);

  //     if (ttl <= 0) {
  //       sellPrice = candleOpen;
  //       isPositionAcitve = false;
  //       break;
  //     }

  //     const change = getReturns(candleOpen, candleClose);

  //     if (change < -2) {
  //       ttl = ttl - Math.abs(Math.round(change) * 2) - 1;
  //     } else {
  //       ttl = ttl - 1;
  //     }
  //   }
  // }

  // const returns = getReturns(buyPrice, sellPrice);

  return 0;
};

export default topaz;
