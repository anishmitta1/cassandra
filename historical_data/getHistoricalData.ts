import { readFileSync } from "fs";
import { IBacktestDate, ICandle, IPrettyBacktestDate } from "../types/signal";

const compareDates = (dateA: IBacktestDate, dateB: IBacktestDate) => {
  const [dayA, monthA, yearA] = dateA;
  const [dayB, monthB, yearB] = dateB;

  if (yearA !== yearB) return yearA - yearB;
  if (monthA !== monthB) return monthA - monthB;
  return dayA - dayB;
};

const getHistoricalData = (
  symbol: string,
  fromDate: IBacktestDate,
  rows: number
): { [index: string]: ICandle } => {
  const csvPath = `./historical_data/symbols/${symbol}.csv`;

  const csvContent = readFileSync(csvPath);
  const convertedCsvContent = Buffer.from(csvContent).toString();

  const csvRows = convertedCsvContent.split("\n").slice(1);

  const historicalData: { [index: string]: ICandle } = {};

  let includeFlag = false;
  let count = 0;

  csvRows
    // Backtest data is in newest to latest order
    .reverse()
    .forEach((row) => {
      const [date, series, open, high, low, prevClose, ltp, close] =
        row.split(",");

      const backtestDate = date
        .split("-")
        .reverse()
        .map((item) => Number(item)) as IBacktestDate;

      if (compareDates(backtestDate, fromDate) >= 0) {
        includeFlag = true;
      }

      if (count >= rows) {
        includeFlag = false;
      }

      if (!includeFlag) {
        return;
      }

      count += 1;

      const candle = {
        o: Number(open),
        h: Number(high),
        l: Number(low),
        c: Number(close),
      };

      const [day, month, year] = date
        .split("-")
        .reverse()
        .map((item) => Number(item));

      const fullDate = [day, month, year].join("-");

      historicalData[fullDate] = candle;
    });

  return historicalData;
};

export default getHistoricalData;
