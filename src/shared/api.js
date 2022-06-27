import axios from "axios";

const token = localStorage.getItem("jwtToken");

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
  // post
  loadPage: (page) => api.get(`api/posts?page=${page}`),
  loadPostList: () => api.get("/api/posts"),
  loadPost: (postId) => api.get(`/api/post/${postId}`),
  loadRanking: () => api.get("/api/post/ranking"),

  addPost: (post) => formApi.post("/api/post", post),
  editPost: (id, post) => formApi.put(`api/post/${id}`, post),
  deletePost: (id) => api.delete(`/api/post/${id}`),

  //마이페이지
  loadUserPost: () => api.get("/api/post/mypage/picture"),
  loadUserPostList: () => api.get("/api/post/mypage/pictures"),
  loadUserInfoList: () => api.get("/api/post/mypage/information"),

  // 게시글 좋아요
  addHeart: (postId) => api.post(`/api/postHeart/${postId}`),
  //댓글 좋아요
  addHeartComment: (postId) => api.post(`/api/commentHeart/${postId}`),

  // 북마크
  bookmark: (postId) => api.post(`/api/bookmark/${postId}`),

  // comment
  loadCommentList: (postId) => api.get(`/api/comment/${postId}`),
  createComment: (comment) =>
    api.post(`/api/comment/${comment.postId}`, { comment: comment.comment }),
  deleteComment: (id) => api.delete(`/api/comment/${id}`),

  // user
  logIn: (data) => api.post("/member/login", data),
  signUp: (data) => api.post("/member", data),
  signout: () => api.post("/member/logout"),
};
