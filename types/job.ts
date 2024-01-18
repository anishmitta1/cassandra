enum Intent {
  Sell = "sell",
  Notify = "notify",
}

interface ISellIntentPayload {
  symbol: string;
}

interface INotifyIntentPayload {
  message: string;
}

type IIntentPayload = ISellIntentPayload | INotifyIntentPayload;

interface IJob {
  cronTab: string;
  intent: Intent;
  payload: IIntentPayload;
  jobId: string;
  isCompleted: boolean;
}

export type { IJob, ISellIntentPayload, INotifyIntentPayload };
export { Intent };
