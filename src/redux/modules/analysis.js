import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";

// Action
const GET_INCOME = "GET_INCOME";
const GET_EXPENSE = "GET_EXPENSE";
const GET_WORKTIME = "GET_WORKTIME";
const GET_SALES = "GET_SALES";
const GET_TOTAL_HARVEST = "GET_TOTAL_HARVEST";

// Action Creator
const getIncome = createAction(GET_INCOME, (data) => ({ data }));
const getExpense = createAction(GET_EXPENSE, (data) => ({ data }));
const getWorktime = createAction(GET_WORKTIME, (data) => ({ data }));
const getSales = createAction(GET_SALES, (data) => ({ data }));
const getTortalHarvest = createAction(GET_TOTAL_HARVEST, (data) => ({ data }));

// InitialState
const initialState = {
  // 로딩
  income_is_loaded: false,
  expense_is_loaded: false,
  worktime_is_loaded: false,
  sales_is_loaded: false,
  totalharvest_is_loaded: false,

  income: [],
  expense: [],
  worktime: [],
  sales: [],
  totalharvest: [],
};

// Middleware
// 올해 수입 조회
export const getIncomeDB = () => {
  return async function (dispatch) {
    apis
      .loadIncome()
      .then((response) => {
        dispatch(getIncome(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
// 올해 지출 조회
export const getExpenseDB = () => {
  return async function (dispatch) {
    apis
      .loadExpense()
      .then((response) => {
        dispatch(getExpense(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
// 5년간 작업시간 조회
export const getWorktimeDB = () => {
  return async function (dispatch) {
    apis
      .loadWorkTime()
      .then((response) => {
        console.log(response.data);
        dispatch(getWorktime(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
// 5년간 매출통계 조회
export const getSalesDB = () => {
  return async function (dispatch) {
    apis
      .loadSales()
      .then((response) => {
        console.log(response);
        dispatch(getSales(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
// 5년간 수확량 조회
export const getTotalHarvestDB = () => {
  return async function (dispatch) {
    apis
      .loadTotalHarvest()
      .then((response) => {
        dispatch(getTortalHarvest(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// Reducer
export default handleActions(
  {
    // 올해 수입 조회
    [GET_INCOME]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.income_is_loaded = true;
        draft.income = payload.data;
      }),

    // 올해 지출 조회
    [GET_EXPENSE]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.expense_is_loaded = true;
        draft.expense = payload.data;
      }),

    // 5년간 작업시간 조회
    [GET_WORKTIME]: (state, { payload }) =>
      produce(state, (draft) => {
        console.log(payload);
        draft.worktime_is_loaded = true;
        draft.worktime = payload.data;
      }),

    // 5년간 매출통계 조회
    [GET_SALES]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.sales_is_loaded = true;
        draft.sales = payload.data;
      }),

    // 5년간 수확량 조회
    [GET_TOTAL_HARVEST]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.totalharvest_is_loaded = true;
        draft.totalharvest = payload.data;
      }),
  },
  initialState
);
