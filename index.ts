import { readFileSync } from "fs";
import getResultFromSignal from "./controllers/getResultFromSignal";
import { Strategies } from "./types/strategy";
import { getReturns } from "./strategies/utils";
import { IBacktestTradeResult } from "./types/trade";

import "dotenv/config";
import "./firebase/initialise";

import type { ITransactionSignal } from "./types/signal";

const csvPath = "./Backtest MACD Breakout, Technical Analysis Scanner.csv";

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

const calculateProfitsFromResults = (
  results: IBacktestTradeResult[]
): number => {
  const wins: IBacktestTradeResult[] = [];
  const losses: IBacktestTradeResult[] = [];

  results.forEach((result) => {
    if (result.exitPrice > result.entryPrice) {
      wins.push(result);
    } else {
      losses.push(result);
    }
  });

  const averageWin =
    wins.reduce(
      (acc, win) => acc + getReturns(win.entryPrice, win.exitPrice),
      0
    ) / wins.length;

  const averageLoss =
    losses.reduce(
      (acc, loss) => acc + getReturns(loss.entryPrice, loss.exitPrice),
      0
    ) / losses.length;

  console.log({
    wins: wins.length,
    losses: losses.length,
    averageWin,
    averageLoss,
    average:
      (averageWin * wins.length + averageLoss * losses.length) /
      (wins.length + losses.length),
  });
  return 0;
};

const results: IBacktestTradeResult[] = [];

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
        Strategies.Garnet
      );

      if (resultFromSignal?.exitDate) {
        results.push(resultFromSignal);
      }
    } catch (e) {
      //
    }
  }

  calculateProfitsFromResults(results);
})();
