import { readFileSync } from "fs";

import firebaseAdmin from "firebase-admin";

const SVC_CONFIG = JSON.parse(readFileSync("./firebase_svc.json", "utf-8"));

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(SVC_CONFIG),
});

const db = firebaseAdmin.firestore();

export { db };
