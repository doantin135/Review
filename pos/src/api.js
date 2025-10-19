import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

export const getProducts = async () => axios.get(`${API_BASE}/products`);
export const addProduct = async (data) => axios.post(`${API_BASE}/products`, data);
export const updateProduct = async (id, data) => axios.put(`${API_BASE}/products/${id}`, data);
export const deleteProduct = async (id) => axios.delete(`${API_BASE}/products/${id}`);
