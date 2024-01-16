import type { ITransactionSignal } from "./signal";
import type { IBacktestTradeResult } from "./trade";

enum Strategies {
  Topaz = "topaz",
  Garnet = "garnet",
  Amethyst = "amethyst",
}

type IStrategy = (
  signalDate: ITransactionSignal["date"],
  signalSymbol: ITransactionSignal["symbol"]
) => IBacktestTradeResult | null;

export { Strategies, IStrategy };
