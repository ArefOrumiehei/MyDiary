import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const attachInterceptors = (store) => {
  // store = { start, finish }
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;

    if (!config.skipLoading) store.start();

    return config;
  });

  api.interceptors.response.use(
    res => { store.finish(); return res; },
    err => { store.finish(); return Promise.reject(err); }
  );
};


export default api;
