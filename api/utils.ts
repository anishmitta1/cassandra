import getAccessToken from "../firebase/getAccessToken";

const getKiteHeaders = async () => {
  const accessToken = await getAccessToken();

  return {
    "X-Kite-Version": "3",
    Authorization: `token ${process.env.KITE_API_KEY}:${accessToken}`,
  };
};

export { getKiteHeaders };
