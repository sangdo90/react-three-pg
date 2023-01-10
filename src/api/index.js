import axios from "axios";

export async function getNftApi() {
  const res = await axios.get(
    `https://nft-api.prenet.blockchainbusan.kr/v1/assets`,
    {
      headers: {
        Authorization:
          "Basic ODgxZEdtRU8yQU5kSDB0eWJXSkk6WjBhUVlONEZhTDFZcUhVWk5TdzZmX0owdC1N",
        "x-chain-id": 82051,
        "Content-Type": "application/json",
        "x-user": "all",
      },
    }
  );

  return res.data;
}
