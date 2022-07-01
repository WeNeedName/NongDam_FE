import { apis } from "../../shared/api";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import jwt_decode from "jwt-decode";

//actions
const LOGIN_USER = "LOGIN_USER";
const LOGOUT = 'users/LOGOUT'
const SIGNUP_USER= 'SIGNUP_USER'
const KAKAO_LOGIN= 'KAKAO_LOGIN'
const GET_INFO = "GET_INFO"


//initial state
const initialState = {
  user: null,
};

//action creator
const signUp = createAction(SIGNUP_USER, (user) => ({ user }));
const logIn = createAction(LOGIN_USER, (user) => ({ user }));

const kakaoLogIn = createAction(KAKAO_LOGIN, (user) => ({user}));
const getInfo = createAction(GET_INFO, () => ({}));

// const loadNickname = createAction(LOAD_NICKNAME, (user) => ({ user }));
const logOut = createAction(LOGOUT, (user) => ({ user }));



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
        const DecodedToken = jwt_decode(token);
        console.log(DecodedToken);
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

    apis.kakaoLogIn(data)
    .then((res) => {
      console.log(res);
      dispatch(kakaoLogIn(data))
    })
    .catch((err) => {
      console.log(err);
    })
  }
}


//회원정보가져오기
export const getInfoDB = () => {
  return async function(dispatch){
      await apis.userInfo()
      .then((res) => {
          console.log(res);
          dispatch(getInfo())
      }) 
      .catch((err) => {
          console.log(err);
      })
  }
}

//로그아웃
export const logOutDB = () => {
  return function (dispatch) {
    sessionStorage.removeItem("jwtToken");
    window.location.assign("/"); 
    
  };
}




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
        console.log(state);
        draft.user = action.payload.user;
      }),

    [KAKAO_LOGIN]: (state, action) =>
      produce(state, (draft) => {

        draft.user=action.payload.user
      }),
      
    [GET_INFO]: (state, action) =>
        produce(state, (draft) => {
            console.log(state, action)
            draft.user=action.payload.user
            // draft.user = action.payload;
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
