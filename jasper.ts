import isNaN from "lodash/isNan";

const NSE_HEADERS = {
  authority: "www.nseindia.com",
  accept: "*/*",
  "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
  "cache-control": "no-cache",
  cookie:
    '_ga_PJSKY6CFJH=deleted; _ga_PJSKY6CFJH=deleted; defaultLang=en; _ga=GA1.1.374078110.1692873860; _ga_PJSKY6CFJH=GS1.1.1701693910.35.1.1701694958.60.0.0; _ga_QJZ4447QD3=deleted; _ga_87M7PJ3R97=deleted; _ga_87M7PJ3R97=deleted; nseQuoteSymbols=[{"symbol":"FEDERALBNK","identifier":null,"type":"equity"}]; _abck=8E652D255A9C578253C961316C067700~0~YAAQN0YDFzbYvwqOAQAAHZUIFAtYmyDe2yqGPuEkbbhHlRJjL4uusgHDYCnlTmw4aAK5lF5ckJj6M87bcu1BMhde8og/l8QMOsaCMkrLEKCAl1kG03YpPriCFxkePnCp1qeOARXjYT32/wp1hGV/8Rx1na1lb3NDWv+RZwJCYqfoa2cUiAEwHcvgospfJIcTpZjiAHIi/DS/0p5fOLK2eEUJghgFSM3/K9RRiuiwvLAC7sm38SA0Sjt0RL/rjkrxadMJkR5MlMGrHupBjAKtVA1LulRR6hIZz1zMNmOLi5pWze6kDmE7WhFkZAnIUcnRx2bkVw+dCvdEeyeBVqld5SkSJmQnLnfWir5rB8N0wda9zI+KQ86H3PF1bD3DdHZjgOp33LIyhQFEoDVTd+yRln+xpRPwIYFBUWk=~-1~-1~-1; bm_sz=51737A889D35BA1FA22B41F072AC6C18~YAAQN0YDFznYvwqOAQAAHpUIFBdd0Z9Bo6RNm35jVc/q/t/gq+/fx5SPDQs7VPhzzzvTb2Nb8YILfEyO9J2D8bUyX90tsfs7x1kubqetl/CDuqJGt8XCIptis77BaaSjcgC3k5BOB0WDRWXeY0ISPl3h5kg1fDquDz0v04+P7SdesDmbWbOzxjKmeIKdjtSOt5sR+Ox4evGJMCbpUno2aDfMurS3pvGntSAs4B9yWGU191PQgmS0LnfwJu8m03hwFL6Vd2mDJKYjR+bMyB30GDy7nG8LWvyrjc2Fq4EvTFNuBYWL+sAAYWWXdkxDRUGh6fxWoSj3SXK630bjLguFeoolkJ+hlZO/B5a8JdWuSzJJoBmLnqH5~3228977~3486785; nsit=WiDVd-Sc00osnkLeWVCQAgJa; AKA_A2=A; ak_bmsc=B4BE018C08748C5A4DCA8C83AB44F3DD~000000000000000000000000000000~YAAQN0YDF4nVxAqOAQAAtwmnFBde2oWtqcH0RJk1xIP5l/4cq3URuP4ZTUk1MvwBJwYXXYZnrCDEG8Gslywx+lvmqs2ajKLTS8e2hmiN7laGAWBDxyzfMe7AD8jnsO3T30Rs+zMRUXJqoxFTNTD5omey8o4ISlyEiy6iuam/n0zpuFZtHpMdKFxe539739E2tGF1cNUD96+irueoxFI0VqNKu07TV5E5gftPG50wVZEvnGJClFK8tdRFm3Q+8z4Hff45o95i2P9W/b3qXlQe9Gu0vLm5hA3XE9LqnJSdw9VSN38/d7JveVJxjOS+ySwmziBmcbsInNHUI9dPF6RPVVZCSEPg3w4qS1a84u7UlSElJ7tJb6eJhmJZoX3zrKFDvyaE05Q/t/zBz4t0ldFLZWnDfXc39LzRQIS4YblDcSXXtrsfv0VUNyPQ/xT9Nr5ndTOfHRTIadQdkPOhKzM=; _ga_QJZ4447QD3=GS1.1.1709743491.59.1.1709744401.0.0.0; nseappid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkubnNlIiwiYXVkIjoiYXBpLm5zZSIsImlhdCI6MTcwOTc0NDgyOCwiZXhwIjoxNzA5NzUyMDI4fQ.wHNR8G5B4lo5nHlvmebexNcrIgOFS9bpA6ZHv9QqVvs; _ga_87M7PJ3R97=GS1.1.1709743474.84.1.1709744829.0.0.0; bm_sv=A24E178C26ADA6A1622AEF77B69AF094~YAAQN0YDFzuNxQqOAQAAVS+8FBdI91DAGPfEkXkhHJWng8Gjw9mV3h50MmFzaYx23VqaEBPWtyi40WpKqVnaUtsJ4q2HX81yogkVmeJhYA8Alf+ZB++gtZzJxq25hS+23nD7ORm3+YASfWNMZ/L4Cb6Z9ao63de0pFxOG13Y5I4ncPJA61G8J0/SZLMiWvdKQaqobNi5gpT5TTvjMY0qXZnU/bPfzDKVjD3RXdIwK+ScjBlh4H57IgIPRp+zG7aufa182g==~1; RT="z=1&dm=nseindia.com&si=30ca1abd-f218-43bf-adf5-eb9688cfb7a1&ss=ltg1xcbm&sl=0&se=8c&tt=0&bcn=%2F%2F684d0d45.akstat.io%2F&ld=r80g&nu=kpaxjfo&cl=tkz"',
  pragma: "no-cache",
  referer:
    "https://www.nseindia.com/market-data/live-equity-market?symbol=NIFTY%20BANK",
  "sec-ch-ua":
    '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"macOS"',
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-origin",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
  "x-requested-with": "XMLHttpRequest",
};

const sectorialIndices = [
  {
    tradingSymbol: "NIFTY BANK",
    instrumentToken: 260105,
    endpoint:
      "https://www.nseindia.com/api/equity-stockIndices?csv=true&index=NIFTY%20BANK&selectValFormat=crores",
  },
  {
    tradingSymbol: "NIFTY AUTO",
    instrumentToken: 263433,
    endpoint:
      "https://www.nseindia.com/api/equity-stockIndices?csv=true&index=NIFTY%20AUTO&selectValFormat=crores",
  },
  {
    tradingSymbol: "NIFTY METAL",
    instrumentToken: 263689,
    endpoint:
      "https://www.nseindia.com/api/equity-stockIndices?csv=true&index=NIFTY%20METAL&selectValFormat=crores",
  },
  {
    tradingSymbol: "NIFTY FMCG",
    instrumentToken: 261897,
    endpoint:
      "https://www.nseindia.com/api/equity-stockIndices?csv=true&index=NIFTY%20FMCG&selectValFormat=crores",
  },
  {
    tradingSymbol: "NIFTY PHARMA",
    instrumentToken: 262409,
    endpoint:
      "https://www.nseindia.com/api/equity-stockIndices?csv=true&index=NIFTY%20PHARMA&selectValFormat=crores",
  },
  {
    tradingSymbol: "NIFTY IT",
    instrumentToken: 259849,
    endpoint:
      "https://www.nseindia.com/api/equity-stockIndices?csv=true&index=NIFTY%20IT&selectValFormat=crores",
  },
  {
    tradingSymbol: "NIFTY ENERGY",
    instrumentToken: 261641,
    endpoint:
      "https://www.nseindia.com/api/equity-stockIndices?csv=true&index=NIFTY%20ENERGY&selectValFormat=crores",
  },
  {
    tradingSymbol: "NIFTY REALTY",
    instrumentToken: 261129,
    endpoint:
      "https://www.nseindia.com/api/equity-stockIndices?csv=true&index=NIFTY%20REALTY&selectValFormat=crores",
  },
  {
    tradingSymbol: "NIFTY MEDIA",
    instrumentToken: 263945,
    endpoint:
      "https://www.nseindia.com/api/equity-stockIndices?csv=true&index=NIFTY%20MEDIA&selectValFormat=crores",
  },
  {
    tradingSymbol: "NIFTY HEALTHCARE",
    instrumentToken: 288521,
    endpoint:
      "https://www.nseindia.com/api/equity-stockIndices?csv=true&index=NIFTY%20HEALTHCARE%20INDEX&selectValFormat=crores",
  },
  {
    tradingSymbol: "NIFTY OIL AND GAS",
    instrumentToken: 289033,
    endpoint:
      "https://www.nseindia.com/api/equity-stockIndices?csv=true&index=NIFTY%20OIL%20%26%20GAS&selectValFormat=crores",
  },
  {
    tradingSymbol: "NIFTY FIN SERVICE",
    instrumentToken: 257801,
    endpoint:
      "https://www.nseindia.com/api/equity-stockIndices?csv=true&index=NIFTY%20FINANCIAL%20SERVICES&selectValFormat=crores",
  },
  {
    tradingSymbol: "NIFTY CONSR DURBL",
    instrumentToken: 288777,
    endpoint:
      "https://www.nseindia.com/api/equity-stockIndices?csv=true&index=NIFTY%20CONSUMER%20DURABLES&selectValFormat=crores",
  },
  {
    tradingSymbol: "NIFTY PSU BANK",
    instrumentToken: 262921,
    endpoint:
      "https://www.nseindia.com/api/equity-stockIndices?csv=true&index=NIFTY%20PSU%20BANK&selectValFormat=crores",
  },
  {
    tradingSymbol: "NIFTY FINSRV25 50",
    instrumentToken: 288265,
    endpoint:
      "https://www.nseindia.com/api/equity-stockIndices?csv=true&index=NIFTY%20FINANCIAL%20SERVICES%2025%2F50&selectValFormat=crores",
  },
  {
    tradingSymbol: "NIFTY PVT BANK",
    instrumentToken: 271113,
    endpoint:
      "https://www.nseindia.com/api/equity-stockIndices?csv=true&index=NIFTY%20PRIVATE%20BANK&selectValFormat=crores",
  },
];

const toNumber = (value: string) => {
  let convertedValue = +value.replace(",", "");
  if (isNaN(convertedValue)) {
    convertedValue = Number(value);
  }
  if (isNaN(convertedValue)) {
    convertedValue = parseFloat(value);
  }

  return convertedValue;
};

const getTopStocks = (
  stocks: {
    symbol: string;
    weightedChange: number;
  }[],
  count: number
) => {
  const topStocks = stocks
    .sort((a, b) => b.weightedChange - a.weightedChange)
    .slice(0, count);

  return topStocks;
};

const getTopSectors = (
  sectoralIndicePerformances: {
    tradingSymbol: string;
    indexChange: number;
    topStocks: {
      symbol: string;
      weightedChange: number;
    }[];
  }[],
  count: number
) => {
  return sectoralIndicePerformances
    .sort((a, b) => b.indexChange - a.indexChange)
    .slice(0, count);
};

const analyseIndex = (convertedCsvContent: string) => {
  const [indexEntry, ...stockEntries] = convertedCsvContent
    .split("\n")
    .slice(15);

  const indexPerformance = indexEntry.replace(/^"|"$/g, "").split('","');

  const indexChange = toNumber(indexPerformance[12]);

  const indexMarketValue = toNumber(indexPerformance[9]);

  const stockPerformances = stockEntries.map((entry) => {
    return entry.replace(/^"|"$/g, "").split('","');
  });

  const weightedStockReturns = stockPerformances.map((stock) => {
    const change = toNumber(stock[12]);

    const weightage = toNumber(stock[9]) / indexMarketValue;

    const weightedChange = change * weightage;

    return {
      symbol: stock[0],
      weightedChange,
    };
  });

  return {
    topStocks: getTopStocks(weightedStockReturns, 3),
    indexChange,
  };
};

const jasper = async () => {
  const sectoralIndicePerformances: any[] = [];

  const axios = require("axios");
  for (let i = 0; i < sectorialIndices.length; i++) {
    const { endpoint, tradingSymbol, instrumentToken } = sectorialIndices[i];

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: endpoint,
      headers: NSE_HEADERS,
    };
    try {
      const { data } = await axios.request(config);

      const { indexChange, topStocks } = analyseIndex(data);

      const indicePerformance = {
        tradingSymbol,
        indexChange,
        topStocks,
      };

      sectoralIndicePerformances.push(indicePerformance);
    } catch (error) {
      console.log({ error });
    }
  }

  const topSectors = getTopSectors(sectoralIndicePerformances, 3);

  let topStocks: any = [];

  topSectors.forEach((sector) => {
    topStocks = [...topStocks, ...sector.topStocks];
  });

  console.log({ topStocks });
};

jasper();
