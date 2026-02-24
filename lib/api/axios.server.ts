"use server";

import axios from "axios";
import { getAuthToken } from "../cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export const axiosServer = async () => {
  const token = await getAuthToken(); // reads auth_token cookie

  return axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    withCredentials: true,
  });
};