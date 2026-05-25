import environment from "@/configs/environment";
import axios from "axios";

export const instance = axios.create({
  baseURL: environment.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
