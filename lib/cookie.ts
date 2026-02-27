"use server";

import { cookies } from "next/headers";

interface UserData {
  _id: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}


const COOKIE_OPTIONS = {
  path: "/", 
  httpOnly: true,
  sameSite: "lax" as const,
  
};

export const setAuthToken = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "auth_token",
    value: token,
    ...COOKIE_OPTIONS,
  });
};

export const getAuthToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("auth_token")?.value || null;
};

export const setUserData = async (userData: UserData) => {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "user_data",
    value: JSON.stringify(userData),
    ...COOKIE_OPTIONS,
  });
};

export const getUserData = async (): Promise<UserData | null> => {
  const cookieStore = await cookies();
  const userData = cookieStore.get("user_data")?.value || null;
  return userData ? JSON.parse(userData) : null;
};

export const clearAuthCookies = async () => {
  const cookieStore = await cookies();

  cookieStore.set({
    name: "auth_token",
    value: "",
    ...COOKIE_OPTIONS,
    maxAge: 0,
  });

  cookieStore.set({
    name: "user_data",
    value: "",
    ...COOKIE_OPTIONS,
    maxAge: 0,
  });
};