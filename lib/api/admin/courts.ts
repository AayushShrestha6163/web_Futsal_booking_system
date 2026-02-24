import axiosInstance from "../axios";
import { API } from "../endpoints";

export const getAdminCourts = async (page = 1, limit = 6) => {
  const res = await axiosInstance.get(API.ADMIN.COURTS, {
    params: { page, limit },
  });
  return res.data;
};

export const createAdminCourt = async (payload: any) => {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("location", payload.location);
  formData.append("pricePerHour", String(payload.pricePerHour));
  formData.append("openingTime", payload.openingTime);
  formData.append("closingTime", payload.closingTime);

  // ✅ file field name MUST be "image"
  if (payload.image) formData.append("image", payload.image);

  const res = await axiosInstance.post(API.ADMIN.COURTS, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

export const updateAdminCourt = async (id: string, payload: any) => {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("location", payload.location);
  formData.append("pricePerHour", String(payload.pricePerHour));
  formData.append("openingTime", payload.openingTime);
  formData.append("closingTime", payload.closingTime);

  if (payload.image) formData.append("image", payload.image);

  const res = await axiosInstance.put(API.ADMIN.COURT_UPDATE(id), formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

export const deleteAdminCourt = async (id: string) => {
  const res = await axiosInstance.delete(API.ADMIN.COURT_DELETE(id));
  return res.data;
};