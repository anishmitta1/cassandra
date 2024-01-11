type Day = number;
type Month = number;
type Year = number;

type IBacktestDate = [Day, Month, Year];

interface ITransactionSignal {
  date: IBacktestDate;
  symbol: string;
  marketcap: string;
  sector: string;
}

interface IBacktestCandle {
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
}

export type { ITransactionSignal, IBacktestCandle };
