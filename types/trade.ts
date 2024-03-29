import { IBacktestDate } from "./signal";

interface IBuySymbolConfig {
  /**
   * Symbol to be traded.
   */
  symbol: string;
  /**
   * Amount you want to use to purchase shares, will fail if exceeds
   * fund balance.
   */
  amount: number;
  /**
   * Immediate or Cancel, set to false if you intend to place an amo
   */
  amo: boolean;
  /**
   * Stoploss value in percentage
   */
  stoploss: number;
}

interface IBuySymbolConfirmation {
  success: boolean;
  orderId?: string;
}

interface IBacktestTradeResult {
  entryDate: IBacktestDate;
  exitDate: IBacktestDate;
  entryPrice: number;
  exitPrice: number;
  symbol: string;
}

export type { IBuySymbolConfig, IBuySymbolConfirmation, IBacktestTradeResult };
