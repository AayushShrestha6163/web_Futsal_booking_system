"use server";

import {
  login,
  register,
  requestPasswordReset,
  resetPassword,
  updateProfile,
} from "@/lib/api/auth";
import { LoginData, RegisterData } from "@/app/(auth)/schema";
import { setAuthToken, setUserData, clearAuthCookies } from "../cookie";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";


export const handleRegister = async (data: RegisterData) => {
  try {
    const response = await register(data);
    if (response.success) {
      return {
        success: true,
        message: "Registration successful",
        data: response.data,
      };
    }
    return { success: false, message: response.message || "Registration failed" };
  } catch (error: any) {
    return { success: false, message: error.message || "Registration action failed" };
  }
};


export const handleLogin = async (formData: FormData) => {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  const response: any = await login({ email, password });

 
  if (!response || response.success !== true) {
    redirect(
      `/login?error=${encodeURIComponent(response?.message || "Invalid credentials")}`
    );
  }


  await setAuthToken(response.token);
  await setUserData(response.data);

  if (response.data?.role === "admin") redirect("/admin");
  redirect("/dashboard");
};


export async function handleUpdateProfile(profileData: FormData) {
  try {
    const result = await updateProfile(profileData);

    if (result.success) {
      await setUserData(result.data);
      revalidatePath("/user/profile");
      return {
        success: true,
        message: "Profile updated successfully",
        data: result.data,
      };
    }

    return { success: false, message: result.message || "Failed to update profile" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}


export const handleRequestPasswordReset = async (email: string) => {
  try {
    const response = await requestPasswordReset(email);
    if (response.success) {
      return { success: true, message: "Password reset email sent successfully" };
    }
    return { success: false, message: response.message || "Request password reset failed" };
  } catch (error: any) {
    return { success: false, message: error.message || "Request password reset action failed" };
  }
};


export const handleResetPassword = async (token: string, newPassword: string) => {
  try {
    const response = await resetPassword(token, newPassword);
    if (response.success) {
      return { success: true, message: "Password has been reset successfully" };
    }
    return { success: false, message: response.message || "Reset password failed" };
  } catch (error: any) {
    return { success: false, message: error.message || "Reset password action failed" };
  }
};

export const logoutAction = async () => {
  await clearAuthCookies();
  redirect("/login");
};