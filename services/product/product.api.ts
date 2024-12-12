import axios from "axios";

const BASE_URL = "https://fakestoreapi.com";

export const productAPI = {
  getAll: () => axios.get(`${BASE_URL}/products`),
  getById: (id: number) => axios.get(`${BASE_URL}/products/${id}`),
  create: (data: any) => axios.post(`${BASE_URL}/products`, data),
  update: (id: number, data: any) => axios.put(`${BASE_URL}/products/${id}`, data),
  delete: (id: number) => axios.delete(`${BASE_URL}/products/${id}`),
};
