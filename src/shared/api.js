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
  loadSales: () => apiTest.get("/data"),

  // user
  logIn: (id, pw) => api.post("/user/login", { username: id, password: pw }),
  nicknameCheck: (userNickname) =>
    api.get(`/api/user/nicknameCheck/${userNickname}`, { userNickname }),

  signup: (username, password, userNickname) =>
    api.post("/user/signup", {
      username: username,
      password: password,
      userNickname: userNickname,
    }),

  logout: () => api.post("/"),
  loadnickname: () => api.get("/user/nickname"),
  userInfo: () => api.get(`/api/userData`),
};
