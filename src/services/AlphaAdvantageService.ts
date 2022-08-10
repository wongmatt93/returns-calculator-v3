import axios from "axios";
import AlphaAdvantageResponse from "../models/AlphaAdvantageResponse";

const key: string = process.env.REACT_APP_API_KEY || "";

const getStockInfo = (ticker: string): Promise<AlphaAdvantageResponse> =>
  axios
    .get("https://www.alphavantage.co/query", {
      params: { function: "OVERVIEW", symbol: ticker, apikey: key },
    })
    .then((response) => response.data);

export { getStockInfo };
