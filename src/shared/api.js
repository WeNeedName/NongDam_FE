import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const baseURL = "https://idontcare.shop";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

// form data용
const formApi = axios.create({
  baseURL: baseURL,
  headers: {
    "content-type": "multipart/form-data",
  },
});

api.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem("jwtToken");
  const refreshToken = sessionStorage.getItem("refreshToken");
  config.headers.common["Authorization"] = `Bearer ${token}`;
  config.headers.common["RefreshToken"] = `Bearer ${refreshToken}`;
  return config;
});

formApi.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem("jwtToken");
  const refreshToken = sessionStorage.getItem("refreshToken");
  config.headers.common["Authorization"] = `Bearer ${token}`;
  config.headers.common["RefreshToken"] = `Bearer ${refreshToken}`;
  return config;
});
api.interceptors.response.use((response) => {
  if (response.headers.authorization !== undefined) {
    console.log("set New Token");
    sessionStorage.setItem("jwtToken", response.headers.authorization);
  }
  return response;
});

export const apis = {
  //메인페이지
  // 날씨
  loadWeather: () => api.get("/weather"),
  // 시세
  loadTodayMarketPrice: (data) =>
    api.get(`/todaymarketprice/${data.cropId}/${data.productClsCode}`),
  // 매출통계
  loadSales: () => api.get("/data"),
  // 오늘일정
  loadTodaySchedule: () => api.get("/schedule/today"),
  // 오늘 뉴스
  loadTodayNews: () => api.get("/news"),

  // 시세페이지
  loadMarketPrice: (data) =>
    api.get(`/marketprice?cropId=${data.cropId}&data=${data.data}`),
  loadMyCropsMarketPrice: (data) => api.get(`/marketprices/${data}`),

  // loadMyCropsMarketPrice: (data) =>
  //   api.get(`/marketprice/${data.cropId}/${data.data}`),

  //장부
  loadAccountBook: (date) => api.get(`accountbook/${date.year}-${date.month}`),
  loadCurrentAccount: () => api.get("/accountbook"),
  addAccount: (account) => api.post("/accountbook", account),
  editAccount: (id, account) => api.put(`/accountbook/${id}`, account),
  deleteAccount: (id) => api.delete(`/accountbook/${id}`),

  // user
  logIn: (data) => api.post("/member/login", data),
  // nicknameCheck: (userNickname) =>
  //   api.get(`/api/user/nicknameCheck/${userNickname}`, { userNickname }),
  signUp: (data) => api.post("/member", data),
  kakaoLogIn: (data) => api.post("/member/auth", data),
  logout: () => api.post("/"),
  loadnickname: () => api.get("/user/nickname"),
  userInfo: () => api.get("/member"),
  editUserInfo: (id, data) => formApi.put(`/member/{memberid}`, id, data),
  editPw: (data) => api.put(`/member/{memberid}/password`, data),

  loadCropsList: () => api.get("/crops"),

  //일정(schedule)
  loadSchedule: () => api.get("/schedule"),
  loadCurrentSchedule: () => api.get("/schedule"),
  loadMonthlySchedule: (date) =>
    api.get(`/schedule/${date.year}-${date.month}`),
  addSchedule: (data) => api.post("/schedule", data),
  editSchedule: (id, schedule) => api.put(`/schedule/${id}`, schedule),
  deleteSchedule: (scheduleId) => api.delete(`/schedule/${scheduleId}`),

  //일지(worklog)
  addWorkLog: (data) => formApi.post("/worklog", data),
  loadWorkLogList: () => api.get("/worklog"),
  loadWorkLog: (worklogid) => api.get(`/worklog/${worklogid}`),
  deleteWorkLog: (worklogid) => api.delete(`/worklog/${worklogid}`),
  editWorkLog: (worklogid, data) => api.patch(`/worklog/${worklogid}/update`),
};
