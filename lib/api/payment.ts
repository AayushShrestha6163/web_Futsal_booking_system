import axiosInstance from "./axios";
import { API } from "./endpoints";

export const initiateEsewaPayment = async (bookingId: string) => {
  try {
    const res = await axiosInstance.post(API.PAYMENTS.ESEWA_INITIATE, { bookingId });
    return res.data;
  } catch (error: any) {
    const msg =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to initiate eSewa payment";
    throw new Error(msg);
  }
};