import { readFileSync } from "fs";
import getResultFromSignal from "./controllers/getResultFromSignal";
import { Strategies } from "./types/strategy";

import "dotenv/config";
import "./firebase/initialise";

import type { ITransactionSignal } from "./types/signal";
import { getReturns } from "./strategies/utils";

const csvPath = "./MACD_Breakout.csv";

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

const calculateAverage = (returns: number[]) => {
  if (returns.length === 0) {
    return 0; // To handle the case of an empty array
  }

  const sum = returns.reduce((acc, num) => acc + num, 0);
  const average = sum / returns.length;
  return average;
};

const returns: number[] = [];

(async () => {
  const csvContent = readFileSync(csvPath);
  const convertedCsvContent = Buffer.from(csvContent).toString();

  const signals = extractSignals(convertedCsvContent);

  for (let i = 0; i < signals.length; i++) {
    const signal = signals[i];

    try {
      const resultFromSignal = getResultFromSignal(
        signal.date,
        signal.symbol,
        Strategies.Topaz
      );

      if (resultFromSignal?.exitDate) {
        returns.push(
          getReturns(resultFromSignal.entryPrice, resultFromSignal.exitPrice)
        );
      }
    } catch (e) {
      console.log(`Something went wrong backtesting for ${signal.symbol}`);
    }
  }

  console.log(
    `Average return of ${calculateAverage(returns)} from ${
      returns.length
    } trades`
  );
})();
