const { readFileSync } = require("fs");
const shell = require("shelljs");

const csvPath = "./historical_data/nifty500list.csv";

(() => {
  const csvContent = readFileSync(csvPath);
  const convertedCsvContent = Buffer.from(csvContent).toString();

  const csvRows = convertedCsvContent
    .split("\n")
    .slice(1)
    .map((row) => row.slice(0, -1));

  csvRows.slice(0, 5).forEach((row) => {
    const [name, sector, symbol] = row.split(",");

    shell.exec(`npm run download ${symbol}`);
  });
})();
