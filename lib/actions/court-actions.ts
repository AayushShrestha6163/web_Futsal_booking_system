"use server";

import { axiosServer } from "../api/axios.server";
import { API } from "../api/endpoints";

export const getCourtsAction = async () => {
  const api = await axiosServer();
  const res = await api.get(API.USER.COURTS);
  return res.data;
};

export const getCourtByIdAction = async (id: string) => {
  const api = await axiosServer();
  const res = await api.get(API.USER.COURT_ONE(id));
  return res.data;
};

export const getSlotsAction = async (courtId: string, date?: string) => {
  const api = await axiosServer();

  const url = date
    ? `${API.USER.SLOTS(courtId)}?date=${encodeURIComponent(date)}`
    : API.USER.SLOTS(courtId);

  const res = await api.get(url);
  return res.data;
};