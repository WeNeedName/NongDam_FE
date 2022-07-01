import axios from "axios";

const token = localStorage.getItem("jwtToken");

const apiTest = axios.create({
  baseURL: "http://localhost:5001",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

const api = axios.create({
  baseURL: "http://idontcare.shop",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

// form data용
const formApi = axios.create({
  baseURL: "http://3.39.230.66",
  headers: {
    "content-type": "multipart/form-data",
  },
});

api.interceptors.request.use(function (config) {
  config.headers.common["Authorization"] = `Bearer ${token}`;
  return config;
});

formApi.interceptors.request.use(function (config) {
  config.headers.common["Authorization"] = `Bearer ${token}`;
  return config;
});

export const apis = {
  //오늘날씨
  loadWeather: () => api.get("/weather"),

  // 매출통계
  loadSales: () => api.get("/data"),

  //장부
  loadAccountBook: (date) => api.get(`accountbook/${date.year}-${date.month}`),
  loadCurrentAccount: () => api.get("/accountbook"),
  addAccount: (account) => api.post("/accountbook", account),
  editAccount: (id) => api.put(`/accountbook/${id}`),
  deleteAccount: (id) => api.delete(`/accountbook/${id}`),

  // user
  logIn: (data) => api.post("/member/login", data),
  // nicknameCheck: (userNickname) =>
  //   api.get(`/api/user/nicknameCheck/${userNickname}`, { userNickname }),

  signUp: (data) => api.post("/member", data),
  KakaoLogIn: (data) => api.post("/member/auth", data),
  logout: () => api.post("/"),
  loadnickname: () => api.get("/user/nickname"),
  userInfo: () => api.get(`/api/userData`),
};
