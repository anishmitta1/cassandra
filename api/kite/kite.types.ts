interface IKiteGetLtpPayload {
  symbol: `NSE:${string}`;
}

interface IKiteGetLtpResponse {
  instrumentToken: number;
  lastPrice: number;
}

export { IKiteGetLtpPayload, IKiteGetLtpResponse };
