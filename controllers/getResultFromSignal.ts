import { Strategies } from "../types/strategy";
import topaz from "../strategies/topaz";
import garnet from "../strategies/garnet";

import type { ITransactionSignal } from "../types/signal";
import type { IBacktestTradeResult } from "../types/trade";

const getResultFromSignal = (
  signalDate: ITransactionSignal["date"],
  signalSymbol: ITransactionSignal["symbol"],
  strategy: Strategies
): IBacktestTradeResult | null => {
  switch (strategy) {
    case Strategies.Topaz:
      return topaz(signalDate, signalSymbol);
    case Strategies.Garnet:
      return garnet(signalDate, signalSymbol);
    default:
      console.log("Unknown strategy");
      return null;
  }
};

export default getResultFromSignal;
