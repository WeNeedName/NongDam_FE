import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";
import moment from "moment";
import "moment/locale/ko";
// alert 라이브러리
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

// Action
const GET_ACCOUNT_LIST = "GET_ACCOUNT_LIST";
const GET_ACCOUNT = "GET_ACCOUNT";
const CREATE_ACCOUNT = "CREATE_ACCOUNT";
const MODIFI_ACCOUNT = "CREATE_ACCOUNT";
const DELETE_ACCOUNT = "DELETE_ACCOUNT";

const GET_YEAR_MONTH = "GET_YEAR_MONTH";

// Action Creator
const getAccountList = createAction(GET_ACCOUNT_LIST, (list) => ({ list }));
const getAccount = createAction(GET_ACCOUNT, (currentAccount) => ({
  currentAccount,
}));
const createAccount = createAction(CREATE_ACCOUNT, (account) => ({ account }));
const modifiAccount = createAction(MODIFI_ACCOUNT, (account) => ({ account }));
const deleteAccount = createAction(DELETE_ACCOUNT, (id) => ({ id }));

const getYearMonth = createAction(GET_YEAR_MONTH, (data) => ({ data }));

// InitialState
const initialState = {
  is_loaded: false,
  accountList: [],
  currentAccount: [],
  yearMonth: {
    month: moment().format("MM"),
    year: moment().format("YYYY"),
  },
};

// Middleware

// 선택한 년도, 월 설정
export const getYearMonthDB = (date) => {
  // console.log(date);
  return async function (dispatch) {
    dispatch(getYearMonth(date));
  };
};

//월별 장부리스트 불러오기
export const getAccountListDB = (date) => {
  return async function (dispatch) {
    apis
      .loadAccountBook(date)
      .then((response) => {
        dispatch(getAccountList(response.data));
      })
      .catch((error) => {
        // window.alert("월별 장부를 불러오는 중에 오류가 발생했습니다.");
        console.log(error);
      });
  };
};

// 최근 거래내역 불러오기
export const getCurrentAccountListDB = () => {
  return async function (dispatch) {
    apis
      .loadCurrentAccount()
      .then((response) => {
        dispatch(getAccount(response.data));
      })
      .catch((error) => {
        // window.alert("최근 거래내역을 불러오는 중에 오류가 발생했습니다.");
        console.log(error);
      });
  };
};

// 장부 추가하기
export const addAccountDB = (account) => async (dispatch) => {
  try {
    console.log("장부 만들 준비", account);
    const { data } = await apis.addAccount(account);
    console.log(data);
    dispatch(createAccount(data));
    Swal.fire({
      title: "작성이 완료되었습니다.",
      icon: "success",
      showConfirmButton: false,
      timer: 1300,
      color: "#black",
      padding: "20px",
      width: "400px",
      height: "200px",
    });
  } catch (error) {
    window.alert("장부 등록 중에 오류가 발생했습니다.");
    console.log(error);
  }
};

// 장부 수정하기
export const ModifiAccountDB = (id, account) => async (dispatch) => {
  try {
    console.log("장부 수정 준비", account);
    await apis.editAccount(id, account);

    apis.loadCurrentAccount().then((response) => {
      console.log(response.data);
      dispatch(getAccount(response.data));

      MySwal.fire({
        title: <h5>수정이 완료되었습니다.</h5>,
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
        color: "#black",
        padding: "10px",
        width: "400px",
        height: "200px",
      });
    });
  } catch (error) {
    window.alert("장부 수정 중에 오류가 발생했습니다.");
    console.log(error);
  }
};

// 장부 삭제하기
export const deleteAccountDB = (id) => {
  console.log(id);
  return async function (dispatch) {
    try {
      console.log("장부를 삭제할거야!");

      await apis.deleteAccount(id);
      dispatch(deleteAccount(id));
    } catch (error) {
      alert("장부 삭제 중에 오류가 발생했습니다.");
      console.log(error);
    }
  };
};

// Reducer
export default handleActions(
  {
    [GET_YEAR_MONTH]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.yearMonth = payload.data;
      }),

    [GET_ACCOUNT_LIST]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.accountList = payload.list;
      }),

    [GET_ACCOUNT]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.is_loaded = true;
        draft.currentAccount = payload.currentAccount;
      }),

    // 최근내역, 월별 내역에 내역 추가
    [CREATE_ACCOUNT]: (state, { payload }) =>
      produce(state, (draft) => {
        console.log(state, payload);
        draft.currentAccount.unshift(payload.account);
        draft.currentAccount = draft.currentAccount.map((account) => {
          console.log(account);
          if (Number(account.id) === Number(payload.account.id)) {
            return {
              ...account,
              date: payload.account.date,
              id: payload.account.id,
              memo: payload.account.memo,
              price: payload.account.price,
              type: payload.account.type,
            };
          } else {
            return account;
          }
        });
        draft.accountList.unshift(payload.account);
        draft.accountList = draft.accountList.map((account) => {
          console.log(account);
          if (Number(account.id) === Number(payload.account.id)) {
            return {
              ...account,
              date: payload.account.date,
              id: payload.account.id,
              memo: payload.account.memo,
              price: payload.account.price,
              type: payload.account.type,
            };
          } else {
            return account;
          }
        });
      }),

    // 최근내역, 월별 내역에 내역 수정
    // [MODIFI_ACCOUNT]: (state, { payload }) =>
    //   produce(state, (draft) => {
    //     console.log(state, payload);
    //     draft.currentAccount.unshift(payload.account);
    //     console.log(state.currentAccount);

    //   const new_account_list = draft.currentAccount.map((l, idx) => {
    //     console.log(...l);
    //     console.log(payload.account.id, l.id);
    //     if (payload.account.id === l.id) {
    //       return { ...l };
    //     } else {
    //       return l;
    //     }
    //   });
    //   return { ...draft, currentAccount: new_account_list };
    // }),

    //   draft.accountList.unshift(payload.account);
    //   draft.accountList = draft.accountList.map((account) => {
    //     console.log(account);
    //     if (Number(account.id) === Number(payload.account.id)) {
    //       return {
    //         ...account,
    //         date: payload.account.date,
    //         id: payload.account.id,
    //         memo: payload.account.memo,
    //         price: payload.account.price,
    //         type: payload.account.type,
    //       };
    //     } else {
    //       return account;
    //     }
    //   });
    // }),

    [DELETE_ACCOUNT]: (state, { payload }) =>
      produce(state, (draft) => {
        console.log(payload);
        draft.currentAccount = draft.currentAccount.filter(
          (account) => Number(account.id) !== Number(payload.id)
        );
      }),
  },
  initialState
);
