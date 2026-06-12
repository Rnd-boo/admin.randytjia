import environment from "@/configs/environment";
import { SessionExtended } from "@/types/auth";
import axios from "axios";
import { getSession } from "next-auth/react";

const instance = axios.create({
  baseURL: environment.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60 * 1000,
});

// Request interceptor - add token to requests
instance.interceptors.request.use(
  async (request) => {
    const session: SessionExtended | null = await getSession();
    if (session && session.accessToken) {
      request.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor - enhanced error logging
instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default instance;
