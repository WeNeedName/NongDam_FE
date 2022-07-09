import { apis } from "../../shared/api";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import jwt_decode from "jwt-decode";

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
const editPw = createAction(EDIT_PW, (user) => ({ user }));
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
      })
      .catch((err) => {
        console.log(err);
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
        console.log(DecodedToken);
        sessionStorage.setItem("refreshToken",refreshToken)
        sessionStorage.setItem("jwtToken", token);
        window.alert("환영합니다!");
        window.location.assign("/");
        // dispatch(
        //   logIn(
        //     {
        //     email: email,
        //     nickname: DecodedToken.nickname,
        //     }
        //   )
        // );
        // localStorage.setItem("email", email);
        // localStorage.setItem("nickname", DecodedToken.nickname);
      })
      .catch((err) => {
        window.alert("잘못된 로그인 정보 입니다.");
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
        console.log(res);
        dispatch(kakaoLogIn(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//회원정보가져오기
export const getInfoDB = () => {
  return async function (dispatch) {
    await apis
      .userInfo()
      .then((res) => {
        //console.log(res.data);
        dispatch(getInfo(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//회원정보수정
export const editInfoDB = (user) => {
  return async function (dispatch) {
    console.log(user)
    await apis
      .editUserInfo(user)
      .then((res) => {
        console.log(res);
        dispatch(editInfo(user));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//비밀번호변경
export const editPwDB = (user) => {
  return async function (dispatch) {
    await apis.editPw(user).then((res) => {
      console.log(res).catch((err) => {
        console.log(err);
      });
    });
  };
};
//로그아웃
export const logOutDB = () => {
  return function (dispatch) {
    sessionStorage.removeItem("jwtToken");
    window.location.assign("/");
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
        //   draft.is_login = true;
        //   console.log(draft.user.username);
        //   draft.uploading = false;
        console.log("리듀서로 적용 완료", state, action.payload);
      }),
    [SIGNUP_USER]: (state, action) =>
      produce(state, (draft) => {
        //console.log(state);
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
        console.log(state,action)
        //draft.user = action.payload.user
      }),

    [GET_CROPS]: (state, action) =>
      produce(state, (draft) => {
        draft.crops = action.payload.data;
      }),

    // [LOGOUT]: (state, action) => produce(state, (draft) => {
    //   draft.user = null;
    //   draft.isLogin = false;
    //     }),

    //   [LOAD_NICKNAME]: (state, action) =>
    //     produce(state, (draft) => {
    //       console.log(action.payload.user);
    //       return { nickname: action.payload.user };
    //     }),
    //   [GET_NICKNAME]: (state, action) =>
    //     produce(state, (draft) => {
    //       return { user: action.data };
    //     }),
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
