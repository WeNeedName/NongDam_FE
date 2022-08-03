import { apis } from "../../shared/api";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import jwt_decode from "jwt-decode";
import { Navigate } from "react-router";
// alert 라이브러리
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

//actions
const LOGIN_USER = "LOGIN_USER";
const LOGOUT = "users/LOGOUT";
const SIGNUP_USER = "SIGNUP_USER";
const KAKAO_LOGIN = "KAKAO_LOGIN";
const GET_INFO = "GET_INFO";
const EDIT_INFO = "EDIT_INFO";
const EDIT_PW = "EDIT_PW";
const GET_CROPS = "GET_CROPS";

//initial state
const initialState = {
  user: null,
  crops: [],
};

//action creator
const signUp = createAction(SIGNUP_USER, (user) => ({ user }));
const logIn = createAction(LOGIN_USER, (user) => ({ user }));
const kakaoLogIn = createAction(KAKAO_LOGIN, (user) => ({ user }));
const logOut = createAction(LOGOUT, (user) => ({ user }));
const getInfo = createAction(GET_INFO, (user) => ({ user }));
const editInfo = createAction(EDIT_INFO, (user) => ({ user }));
// const changePw = createAction(EDIT_PW, (pw) => ({ pw }));
const getCropsList = createAction(GET_CROPS, (data) => ({ data }));
// const loadNickname = createAction(LOAD_NICKNAME, (user) => ({ user }));

//미들웨어
//회원가입
export const signUpDB = (userInfo) => {
  return async function (dispatch) {
    await apis
      .signUp(userInfo)
      .then((res) => {
        console.log(res);
        dispatch(signUp(userInfo));
        Swal.fire({
          title: "메일 전송이 완료되었습니다.",
          html: " 가입하신 메일로 인증 후에 이용 가능합니다.",
          showConfirmButton: true,
          confirmButtonColor: "#55A349",
          color: "#black",
          padding: "20px 20px 40px 20px",
          width: "400px",
          height: "200px",
          fontWeight: "400px",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
        }).then(() => {
          window.location.assign("/login");
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: err.response.data.msg,
          icon: "warning",
          showConfirmButton: true,
          confirmButtonColor: "#55A349",
          cancelButtonColor: "#ddd",
          confirmButtonText: "확인",
          cancelButtonText: "취소",
          color: "#black",
          padding: "20px",
          width: "400px",
          height: "200px",
          fontWeight: "400px",
        });
      });
  };
};

//로그인
export const logInDB = (user) => {
  return function (dispatch) {
    apis
      .logIn(user)
      .then((res) => {
        console.log(res);
        const token = res.headers.authorization;
        const refreshToken = res.headers.refreshtoken;
        const DecodedToken = jwt_decode(token);
        sessionStorage.setItem("refreshToken", refreshToken);
        sessionStorage.setItem("jwtToken", token);
        Swal.fire({
          title: "환영합니다!",
          showConfirmButton: false,
          timer: 1600,
          color: "#black",
          padding: "20px 20px 40px 20px",
          width: "400px",
          height: "200px",
          fontWeight: "400px",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
        }).then(() => {
          window.location.assign("/");
        });
      })
      .catch((err) => {
        console.log(err);
        let code = err.response.status;
        if (code == 403)
          Swal.fire({
            title: "이메일 인증을 완료해주세요.",
            icon: "warning",
            showConfirmButton: true,
            confirmButtonColor: "#55A349",
            cancelButtonColor: "#ddd",
            confirmButtonText: "확인",
            cancelButtonText: "취소",
            color: "#black",
            padding: "20px",
            width: "400px",
            height: "200px",
            fontWeight: "400px",
          });
        else
          Swal.fire({
            title: err.response.data.msg,
            icon: "warning",
            showConfirmButton: true,
            confirmButtonColor: "#55A349",
            cancelButtonColor: "#ddd",
            confirmButtonText: "확인",
            cancelButtonText: "취소",
            color: "#black",
            padding: "20px",
            width: "400px",
            height: "200px",
            fontWeight: "400px",
          });
        console.log(err);
      });
  };
};

//소셜로그인
export const kakaoLogInDB = (data) => {
  return function (dispatch) {
    apis
      .kakaoLogIn(data)
      .then((res) => {
        const token = res.headers.authorization;
        const refreshToken = res.headers.refreshtoken;
        const DecodedToken = jwt_decode(token);
        sessionStorage.setItem("refreshToken", refreshToken);
        sessionStorage.setItem("jwtToken", token);
        Swal.fire({
          title: "환영합니다!",
          showConfirmButton: false,
          timer: 1300,
          color: "#black",
          padding: "20px",
          width: "400px",
          height: "200px",
          fontWeight: "400px",
        }).then(() => {
          window.location.assign("/");
        });
        dispatch(kakaoLogIn(data));
      })
      .catch((err) => {
        console.log(err);
        let code = err.response.status;
        if (code == 403) {
          sessionStorage.removeItem("jwtToken");
          Swal.fire({
            title: err.response.data.msg,
            icon: "warning",
            showConfirmButton: true,
            confirmButtonColor: "#55A349",
            cancelButtonColor: "#ddd",
            confirmButtonText: "확인",
            cancelButtonText: "취소",
            color: "#black",
            padding: "20px",
            width: "400px",
            height: "200px",
            fontWeight: "400px",
          });
        } else
          Swal.fire({
            title: err.response.data.msg,
            icon: "warning",
            showConfirmButton: true,
            confirmButtonColor: "#55A349",
            cancelButtonColor: "#ddd",
            confirmButtonText: "확인",
            cancelButtonText: "취소",
            color: "#black",
            padding: "20px",
            width: "400px",
            height: "200px",
            fontWeight: "400px",
          });
      });
  };
};

//회원정보가져오기
export const getInfoDB = () => {
  return async function (dispatch) {
    await apis
      .userInfo()
      .then((res) => {
        dispatch(getInfo(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//비밀번호변경
export const editPwDB = (pw) => {
  return async function (dispatch) {
    await apis
      .editPw(pw)
      .then((res) => {
        Swal.fire({
          title: "변경이 완료되었습니다.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          color: "#black",
          padding: "20px",
          width: "400px",
          height: "200px",
        });
      })
      .catch((err) => {
        console.log(err);
        window.alert(err.response.data.msg);
      });
  };
};
//로그아웃
export const logOutDB = () => {
  return function (dispatch) {
    sessionStorage.removeItem("jwtToken");
    window.location.assign("/login");
  };
};

//작물리스트받아오기
export const getCropsListDB = () => {
  return async function (dispatch) {
    await apis
      .loadCropsList()
      .then((res) => {
        //console.log(res.data)
        dispatch(getCropsList(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//리듀서
export default handleActions(
  {
    [LOGIN_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
      }),
    [SIGNUP_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
      }),

    [KAKAO_LOGIN]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
      }),

    [GET_INFO]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
      }),

    [EDIT_INFO]: (state, action) =>
      produce(state, (draft) => {
        //draft.user = action.payload.user
      }),

    [GET_CROPS]: (state, action) =>
      produce(state, (draft) => {
        draft.crops = action.payload.data;
      }),
  },
  initialState
);
const actionCreators = {
  // SignupDB,
  // loginDB,
  // logoutDB,
  // getNickname,
  // getUser,
};
export { actionCreators };
