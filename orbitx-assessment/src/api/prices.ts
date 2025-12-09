import axios from "axios";
import { TOKEN_PRICE_MAP } from "../utils/tokenPriceMap";

export async function fetchTokenPrices() {
  const ids = Object.values(TOKEN_PRICE_MAP).join(",");

  const res = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
  );

  return res.data;
}
