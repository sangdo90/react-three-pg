import axios from "axios";
const authorzization = process.env.REACT_APP_AUTHORIZATION;
const chainId = process.env.REACT_APP_CHAIN_ID;
export async function getNftApi() {
  console.log(process.env.REACT_APP_AUTHORIZATION);
  const res = await axios.get(
    `https://nft-api.prenet.blockchainbusan.kr/v1/assets`,
    {
      headers: {
        Authorization: authorzization,
        "x-chain-id": chainId,
        "Content-Type": "application/json",
        "x-user": "all",
      },
    }
  );

  return res.data;
}
