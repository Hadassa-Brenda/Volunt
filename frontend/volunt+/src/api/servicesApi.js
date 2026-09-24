import { api } from "./axiosConfig";

export async function fetchServices(params = {}) {
  const response = await api.get("/services", { params });

  return response.data;
}

export async function fetchServiceById(id) {
  const response = await api.get(`/services/${id}`);

  return response.data;
}

export async function createService(payload) {
  const response = await api.post("/services", payload);

  return response.data;
}

export async function updateService(id, payload) {
  const response = await api.patch(`/services/${id}`, payload);

  return response.data;
}

export async function deleteService(id) {
  await api.delete(`/services/${id}`);
}
