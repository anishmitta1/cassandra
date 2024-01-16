import buySymbol from "../controllers/buySymbol";
import "dotenv/config";

/**
 * This script buys a symbol worth the amount provided and also places a gtt with a single stoploss
 */
(async () => {
  const amount = 4000;

  const symbol = process.argv[2];
  const { success, orderId } = await buySymbol({
    amount,
    symbol,
    amo: false,
    stoploss: 10,
  });
  if (success) {
    console.log(`Buy order placed with orderId: ${orderId}`);
  } else {
    console.log("Something went wrong, inspect logs.");
  }
})();
