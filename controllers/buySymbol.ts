import { kiteApi } from "../api";
import { checkIsMarketOpen, getDateAfterCandles } from "../utils/date";
const { randomUUID } = require("crypto"); // Added in: node v14.17.0
import { Intent, type IJob } from "../types/job";
import createJob from "../firebase/createJob";

import type { IBuySymbolConfig, IBuySymbolConfirmation } from "../types/trade";

const getTtlJob = (symbol: IBuySymbolConfig["symbol"], qty: number) => {
  const finalDate = getDateAfterCandles();
  const [day, month] = finalDate.split("-").map(Number);
  const jobCronTab = `0 9 ${day} ${month} *`;
  const ttlJob: IJob = {
    cronTab: jobCronTab,
    intent: Intent.Sell,
    isCompleted: false,
    jobId: randomUUID(),
    payload: {
      symbol,
      qty,
    },
  };

  return ttlJob;
};

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

    const job = getTtlJob(config.symbol, qty);

    const stoplossPrice = (1 - stoploss / 100) * lastPrice;

    const [{ orderId }, { triggerId }] = await Promise.all([
      placeOrder(symbol, qty),
      kiteApi.createBasicGtt(symbol, qty, stoplossPrice, lastPrice),
      createJob(job),
    ]);

    return { success: true, orderId };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};

export default buySymbol;
