type Day = number;
type Month = number;
type Year = number;

type IBacktestDate = [Day, Month, Year];

/**
 * DD_MM_YYYY
 */
type IPrettyBacktestDate = `${string}_${string}_${string}`;

interface ITransactionSignal {
  date: IBacktestDate;
  symbol: string;
  marketcap: string;
  sector: string;
}

interface ICandle {
  o: number;
  h: number;
  l: number;
  c: number;
}

interface IBacktestCandle extends ICandle {
  v: number;
}

export type {
  ITransactionSignal,
  IBacktestCandle,
  ICandle,
  IBacktestDate,
  IPrettyBacktestDate,
};
