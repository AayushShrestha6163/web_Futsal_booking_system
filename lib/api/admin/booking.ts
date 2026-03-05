import axiosInstance from "../axios";
import { API } from "../endpoints";

export const getAdminBookings = async (page = 1, limit = 10) => {
  const res = await axiosInstance.get(API.ADMIN.BOOKINGS, {
    params: { page, limit },
  });
  return res.data;
};