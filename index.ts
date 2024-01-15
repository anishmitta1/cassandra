import { readFileSync } from "fs";
import getReturnFromSignal from "./controllers/getReturnFromSignal";
import { Strategies } from "./types/strategy";

import "dotenv/config";
import "./firebase/initialise";

import type { ITransactionSignal } from "./types/signal";

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

  const signals = extractSignals(convertedCsvContent).slice(0, 20);

  for (let i = 0; i < signals.length; i++) {
    const signal = signals[i];

    const returnFromSignal = await getReturnFromSignal(
      signal.date,
      signal.symbol,
      Strategies.Topaz
    );

    if (returnFromSignal) {
      console.log(
        `Traded ${signal.symbol} for a return of ${returnFromSignal}%`
      );
    }
  }
})();
