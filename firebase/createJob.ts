import { Intent } from "../types/job";
import { db } from "./initialise";

const { randomUUID } = require("crypto"); // Added in: node v14.17.0

import type { IJob } from "../types/job";

const sampleJob: IJob = {
  cronTab: "35 9 19 1 *",
  intent: Intent.Notify,
  isCompleted: false,
  jobId: randomUUID(),
  payload: {
    message: "Hello from lazuli via cassandra",
  },
};

const getDateForJob = (job: IJob) => {
  const [m, h, day, month] = job.cronTab.split(" ");
  const date = [day.padStart(2, "0"), month.padStart(2, "0"), 2024].join("-");
  return date;
};

const createJob = async (job = sampleJob) => {
  const date = getDateForJob(job);
  const documentRef = db.collection("jobs").doc(date);
  const documentExists = (await documentRef.get()).exists;

  if (!documentExists) {
    await documentRef.set({ jobs: [job] });
  } else {
    const { jobs } = (await db.collection("jobs").doc(date).get()).data()!;

    jobs.push(job);

    await db.collection("jobs").doc(date).set({ jobs }, { merge: true });
  }
};

export default createJob;
