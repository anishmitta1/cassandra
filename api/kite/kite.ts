import axios from "axios";
import { getKiteHeaders } from "../utils";
import {
  amoOrderUrl,
  gttUrl,
  marginsUrl,
  quoteUrl,
  regularOrderUrl,
} from "./endpoints";
import { stringify } from "qs";

import type { IKiteGetLtpPayload, IKiteGetLtpResponse } from "./kite.types";

const createBasicGtt = async (
  tradingSymbol: string,
  quantity: number,
  triggerValue: number,
  lastPrice: number
) => {
  const headers = await getKiteHeaders();

  const payload = stringify({
    type: "single",
    condition: `{"exchange":"NSE", "tradingsymbol":"${tradingSymbol}", "trigger_values":[${triggerValue}], "last_price": ${lastPrice}}`,
    orders: `[{"exchange":"NSE", "tradingsymbol": "${tradingSymbol}", "transaction_type": "SELL", "quantity": ${quantity}, "order_type": "LIMIT","product": "CNC", "price": ${triggerValue}}]`,
  });

  const {
    data: { data },
  } = await axios.post(gttUrl, payload, {
    headers: {
      ...headers,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    maxBodyLength: Infinity,
  });

  return {
    triggerId: data.trigger_id,
  };
};

const placeAmoBuy = async (tradingsymbol: string, quantity: number) => {
  const headers = await getKiteHeaders();

  const payload = {
    tradingsymbol,
    exchange: "NSE",
    transaction_type: "BUY",
    order_type: "MARKET",
    quantity,
    product: "CNC",
    validity: "DAY",
  };

  const {
    data: { data },
  } = await axios.post(amoOrderUrl, payload, {
    headers: {
      ...headers,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const { order_id } = data;

  return {
    orderId: order_id,
  };
};

const placeMarketBuy = async (tradingsymbol: string, quantity: number) => {
  const headers = await getKiteHeaders();

  const payload = {
    tradingsymbol,
    exchange: "NSE",
    transaction_type: "BUY",
    order_type: "MARKET",
    quantity,
    product: "CNC",
    validity: "DAY",
  };

  const {
    data: { data },
  } = await axios.post(regularOrderUrl, payload, {
    headers: {
      ...headers,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const { order_id } = data;

  return {
    orderId: order_id,
  };
};

const getLtp = async ({
  symbol,
}: IKiteGetLtpPayload): Promise<IKiteGetLtpResponse> => {
  const headers = await getKiteHeaders();

  const {
    data: { data },
  } = await axios.get(`${quoteUrl}?i=${symbol}`, { headers });

  const { instrument_token, last_price } = data[symbol];

  return {
    instrumentToken: instrument_token,
    lastPrice: last_price,
  };
};

const getFundsAvailable = async (): Promise<number> => {
  const headers = await getKiteHeaders();

  const {
    data: { data },
  } = await axios.get(marginsUrl, { headers });

  return data.equity.net;
};

export {
  placeMarketBuy,
  placeAmoBuy,
  getLtp,
  getFundsAvailable,
  createBasicGtt,
};
