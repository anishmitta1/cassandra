import { readFileSync } from "fs";
import { getReturns } from "./strategies/utils";
import { IBacktestTradeResult } from "./types/trade";
import getHistoricalData from "./historical_data/getHistoricalData";

import "dotenv/config";
import "./firebase/initialise";

import type { ITransactionSignal } from "./types/signal";

const csvPath = "./Jasper.csv";

const extractSignals = (convertedCsvContent: string) => {
  const csvRows = convertedCsvContent
    .split("\n")
    .slice(1)
    .map((row) => row.slice(0, -1));

  const jsonTransactionRows: ITransactionSignal[] = csvRows.map((row) => {
    const [rawDate, symbol, marketcap, sector] = row.split(",");

    const [day, month, year] = rawDate.split("-").map((item) => Number(item));

    return {
      date: [day, month, year],
      symbol,
      marketcap,
      sector,
    };
  });

  return jsonTransactionRows;
};

const calculateProfitsFromResults = (results: number[]): number => {
  return 0;
};

const results: number[] = [];

const getChange = (
  signalDate: ITransactionSignal["date"],
  signalSymbol: ITransactionSignal["symbol"]
): number | null => {
  const historicalData = getHistoricalData(signalSymbol, signalDate, 1);

  if (Object.keys(historicalData).length === 0) {
    return null;
  }

  const [{ o, c }] = Object.values(historicalData);

  return getReturns(o, c);
};

(async () => {
  const csvContent = readFileSync(csvPath);
  const convertedCsvContent = Buffer.from(csvContent).toString();

  const signals = extractSignals(convertedCsvContent);

  for (let i = 0; i < signals.length; i++) {
    const signal = signals[i];

    try {
      const resultFromSignal = getChange(signal.date, signal.symbol);

      if (typeof resultFromSignal === "number") {
        const logColor = resultFromSignal > 0 ? "\x1b[32m" : "\x1b[31m";

        console.log(logColor, `${resultFromSignal}% ${signal.symbol}`);
      }
    } catch (e) {
      //
    }
  }

  //   calculateProfitsFromResults(results);
})();
