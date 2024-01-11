import { readFileSync } from "fs";
import "dotenv/config";
import "./firebase/initialise";

import type { ITransactionSignal } from "./types/signal";
import getDailyCandle from "./api/getDailyCandle";

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

(async () => {
  const csvContent = readFileSync(csvPath);
  const convertedCsvContent = Buffer.from(csvContent).toString();

  const signals = extractSignals(convertedCsvContent);

  const signal = signals[0];

  const candle = getDailyCandle(signal.date, signal.symbol);
})();
