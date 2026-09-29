import { authenticatedApi, publicApi } from "./axiosConfig";

export async function fetchServices(params = {}) {
  const response = await publicApi.get("/services", { params });

  return response.data;
}

export async function fetchServiceById(id) {
  const response = await publicApi.get(`/services/${id}`);

  return response.data;
}

export async function createService(payload) {
  const response = await authenticatedApi.post("/services", payload);

  return response.data;
}

export async function updateService(id, payload) {
  const response = await authenticatedApi.patch(`/services/${id}`, payload);

  return response.data;
}

export async function deleteService(id) {
  await authenticatedApi.delete(`/services/${id}`);
}
