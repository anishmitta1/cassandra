import { Strategies } from "../types/strategy";
import topaz from "../strategies/topaz";

import type { ITransactionSignal } from "../types/signal";

const getReturnFromSignal = async (
  signalDate: ITransactionSignal["date"],
  signalSymbol: ITransactionSignal["symbol"],
  strategy: Strategies
) => {
  switch (strategy) {
    case Strategies.Topaz:
      return topaz(signalDate, signalSymbol);
    default:
      console.log("Unknown strategy");
  }
};

export default getReturnFromSignal;
