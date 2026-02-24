"use server";

import { axiosServer } from "../api/axios.server";
import { API } from "../api/endpoints";

/* ✅ CREATE BOOKING (returns booking response, NO redirect) */
export const createBookingAction = async (
  court: string,
  date: string,
  startTime: string,
  endTime: string
) => {
  try {
    const ax = await axiosServer();
    const res = await ax.post(API.BOOKINGS.CREATE, {
      court,
      date,
      startTime,
      endTime,
    });
    return res.data;
  } catch (error: any) {
    const msg =
      error?.response?.data?.message ||
      error?.message ||
      "Booking failed";
    throw new Error(msg);
  }
};

/* ✅ GET MY BOOKINGS */
export const getMyBookingsAction = async () => {
  try {
    const ax = await axiosServer();
    const res = await ax.get(API.BOOKINGS.ME);
    return res.data;
  } catch (error: any) {
    console.error("Fetch bookings error:", {
      message: error?.message,
      status: error?.response?.status,
      data: error?.response?.data,
    });
    return { bookings: [] };
  }
};

/* ✅ CANCEL BOOKING */
export const cancelBookingAction = async (bookingId: string) => {
  try {
    const ax = await axiosServer();
    const res = await ax.delete(API.BOOKINGS.CANCEL(bookingId));
    return res.data;
  } catch (error: any) {
    const msg =
      error?.response?.data?.message ||
      error?.message ||
      "Cancel failed";
    throw new Error(msg);
  }
};