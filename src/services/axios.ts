import axios from "axios";
import { APP_CONFIG } from "../constants/config";

// FYI: this should be in ENV normally
const API_BASE_URL = "https://api.bitpin.ir/";


const axiosBase = axios.create({
  baseURL: API_BASE_URL,
  timeout: APP_CONFIG.REQUEST_TIMEOUT,
});



export const getService = axiosBase.get;