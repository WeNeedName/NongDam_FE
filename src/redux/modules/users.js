import { apis } from "../../shared/api";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import jwt_decode from "jwt-decode";

//actions
const LOGIN_USER = "LOGIN_USER";
// const SIGNOUT = 'users/SIGNOUT'
const SIGNUP_USER = "SIGNUP_USER";
const KAKAO_LOGIN = "KAKAO_LOGIN";

//initial state
const initialState = {
  user: null,
};

//action creator
const signUp = createAction(SIGNUP_USER, (user) => ({ user }));
const logIn = createAction(LOGIN_USER, (user) => ({ user }));
const kakaoLogIn = createAction(KAKAO_LOGIN, (user) => ({ user }));
// const loadNickname = createAction(LOAD_NICKNAME, (user) => ({ user }));
// const logOut = createAction(LOG_OUT, (user) => ({ user }));

// export const logIn =(userInfo) => {
//     return {type:LOGIN, userInfo}
// }
// export const signOut =() => {
//     return {type:SIGNOUT}
// }
// export const signUp =(userInfo) => {
//     return {type:SIGNUP, userInfo}
// }

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
export const logInDB = (userInfo) => {
  return function (dispatch) {
    console.log(userInfo);
    apis
      .logIn(userInfo)
      .then((res) => {
        console.log(res);
        const token = res.headers.authorization;
        const DecodedToken = jwt_decode(token);
        console.log(DecodedToken);
        localStorage.setItem("jwtToken", token);
        window.alert("환영합니다!");
        window.location.assign("/");
        dispatch(
          logIn(
            userInfo
            // username: username,
            // nickname: DecodedToken.nickname,
          )
        );
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
      .KakaoLogIn(data)
      .then((res) => {
        console.log(res);
        dispatch(kakaoLogIn(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//reducer
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
        console.log(state);
        draft.user = action.payload.user;
      }),

    [KAKAO_LOGIN]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
      }),

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
