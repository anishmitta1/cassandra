import type { ITransactionSignal } from "./signal";

enum Strategies {
  Topaz = "topaz",
  Garnet = "garnet",
  Amethyst = "amethyst",
}

type IStrategy = (
  signalDate: ITransactionSignal["date"],
  signalSymbol: ITransactionSignal["symbol"]
) => number | null;

export { Strategies, IStrategy };
