import { kiteApi } from "../api";
import "dotenv/config";

const STOPLOSS = 10;

(async () => {
  const symbol = "INFY";

  const { lastPrice } = await kiteApi.getLtp({
    symbol: `NSE:${symbol}`,
  });

  const stoplossPrice = (1 - STOPLOSS / 100) * lastPrice;

  await kiteApi.createBasicGtt(symbol, 1, stoplossPrice, lastPrice);
})();
