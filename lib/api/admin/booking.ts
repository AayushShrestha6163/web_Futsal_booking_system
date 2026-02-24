import axiosInstance from "../axios";
import { API } from "../endpoints";

export const getAdminBookings = async () => {
  const res = await axiosInstance.get(API.ADMIN.BOOKINGS);
  return res.data;
};