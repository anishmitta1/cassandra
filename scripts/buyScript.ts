import buySymbol from "../controllers/buySymbol";
import "dotenv/config";

(async () => {
  const amount = 4000;

  const symbol = process.argv[2];
  const { success, orderId } = await buySymbol({ amount, symbol, amo: true });
  if (success) {
    console.log(`Buy order placed with orderId: ${orderId}`);
  } else {
    console.log("Something went wrong, inspect logs.");
  }
})();
