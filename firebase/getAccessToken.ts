import { db } from "./initialise";

const getAccessToken = async (): Promise<string> => {
  const { accessToken } = (
    await db.collection("kite").doc("auth").get()
  ).data()!;

  return accessToken;
};

export default getAccessToken;
