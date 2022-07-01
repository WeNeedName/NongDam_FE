import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";

// Action
const GET_ACCOUNT_LIST = "GET_ACCOUNT_LIST";
const GET_ACCOUNT = "GET_ACCOUNT";
const CREATE_ACCOUNT = "CREATE_ACCOUNT";
const DELETE_ACCOUNT = "DELETE_ACCOUNT";

const GET_YEAR_MONTH = "GET_YEAR_MONTH";

// Action Creator
const getAccountList = createAction(GET_ACCOUNT_LIST, (list) => ({ list }));
const getAccount = createAction(GET_ACCOUNT, (currentAccount) => ({
  currentAccount,
}));
const createAccount = createAction(CREATE_ACCOUNT, (account) => ({ account }));
const deleteAccount = createAction(DELETE_ACCOUNT, (id) => ({ id }));

const getYearMonth = createAction(GET_YEAR_MONTH, (data) => ({ data }));

// InitialState
const initialState = {
  accountList: [],
  currentAccount: [],
  yearMonth: null,
};

// Middleware

// 선택한 년도, 월 설정
export const getYearMonthDB = (date) => {
  console.log(date);
  return async function (dispatch) {
    dispatch(getYearMonth(date));
  };
};

//월별 장부리스트 불러오기
export const getAccountListDB = (date) => {
  console.log(date);
  return async function (dispatch) {
    apis
      .loadAccountBook(date)
      .then((response) => {
        console.log(response);
        dispatch(getAccountList(response.data));
      })
      .catch((error) => {
        window.alert("월별 장부를 불러오는 중에 오류가 발생했습니다.");
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
        console.log(response.data);
        dispatch(getAccount(response.data));
      })
      .catch((error) => {
        window.alert("최근 거래내역을 불러오는 중에 오류가 발생했습니다.");
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
  } catch (error) {
    window.alert("장부 등록 중에 오류가 발생했습니다.");
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
        console.log(state, payload);
        draft.yearMonth = payload.data;
      }),

    [GET_ACCOUNT_LIST]: (state, { payload }) =>
      produce(state, (draft) => {
        console.log(state, payload);
        draft.accountList = payload.list;
      }),

    [GET_ACCOUNT]: (state, { payload }) =>
      produce(state, (draft) => {
        console.log(state, payload);
        draft.currentAccount = payload.currentAccount;
      }),

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
      }),

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
