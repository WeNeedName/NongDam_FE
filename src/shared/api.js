import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const token = sessionStorage.getItem("jwtToken");

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
}); //여기까지만 있었다.
//   function (err) {
//     return Promise.reject(err);
//   }
// );

// api.interceptors.response.use(
//   function(response){
//     return response;
//   },
//   async function(err){
//     const {
//       config,
//       response: { status },
//     } = err;
//     if (status === 401) {
//       if (err.response.data.message === "TokenExpiredError") {
//         const originalRequest = config;
//         const refreshToken = await AsyncStorage.getItem("refreshToken");
//         //token refresh 요청
//         const {data} = await axios.post(
//           'http://localhost:3000/refresh/token',//token refresh api
//           {
//             refreshToken,
//           }
//         );
//         //새로운 토큰 저장
//         const {
//           accessToken: newAccessToken,
//           refreshToken: newRefreshToken,
//         } = data;
//         await AsyncStorage.multiSet([
//           ["accessToken",newAccessToken],
//           ["refreshToken", newRefreshToken],
//         ]);
//         api.defaults.headers.common.Authorization = `Baearer ${newAccessToken}`;
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         //401로 요청 실패 했었던 요청을 새롭게 accessToken으로 재요청
//         return axios(originalRequest);
//         }

//       }
//       return Promise.reject(err);
//     }
// )

formApi.interceptors.request.use(function (config) {
  config.headers.common["Authorization"] = `Bearer ${token}`;
  return config;
});

export const apis = {
  //오늘날씨
  loadWeather: () => api.get("/weather"),
  // 시세
  loadMarketPrice: () => api.get("/marketprice"),

  // 매출통계
  loadSales: () => api.get("/data"),

  //장부
  loadAccountBook: (date) => api.get(`accountbook/${date.year}-${date.month}`),
  loadCurrentAccount: () => api.get("/accountbook"),
  addAccount: (account) => api.post("/accountbook", account),
  editAccount: (account) =>
    api.put(`/accountbook/${account.id}`, account.account),
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

  editUserInfo: (data) => api.put(`/member/{memberid}`, data),
  editPw: (data) => api.put(`/member/{memberid}/password`, data),

  //일정
  loadSchedule: () => api.get("/schedule"),
  loadMonthlySchedule: (date) =>
    api.get(`/schedule/${date.year}-${date.month}`),
  addSchedule: (data) => api.post("/schedule", data),
  editSchedule: (scheduleId) => api.put(`/schedule/${scheduleId}`),
  deleteSchedule: (scheduleId) => api.delete(`/schedule/${scheduleId}`),
};
