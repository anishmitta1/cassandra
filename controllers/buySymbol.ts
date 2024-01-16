import { kiteApi } from "../api";
import { checkIsMarketOpen } from "../api/utils";

import type { IBuySymbolConfig, IBuySymbolConfirmation } from "../types/trade";

const buySymbol = async (
  config: IBuySymbolConfig
): Promise<IBuySymbolConfirmation> => {
  try {
    const { amount, amo, symbol, stoploss } = config;
    const isMarketOpen = checkIsMarketOpen();

    if (!isMarketOpen && !amo) {
      throw new Error("Market closed");
    }

    const [{ lastPrice }, funds] = await Promise.all([
      kiteApi.getLtp({
        symbol: `NSE:${symbol}`,
      }),
      kiteApi.getFundsAvailable(),
    ]);

    if (funds < amount) {
      throw new Error("Insufficient funds to place trade");
    }

    const qty = Math.round(amount / lastPrice);

    const placeOrder = amo ? kiteApi.placeAmoBuy : kiteApi.placeMarketBuy;

    const stoplossPrice = (1 - stoploss / 100) * lastPrice;

    const [{ orderId }, { triggerId }] = await Promise.all([
      placeOrder(symbol, qty),
      kiteApi.createBasicGtt(symbol, qty, stoplossPrice, lastPrice),
    ]);

    return { success: true, orderId };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};

export default buySymbol;
