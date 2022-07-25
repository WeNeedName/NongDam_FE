import { apis } from "../../shared/api";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { Navigate } from "react-router";

//actions
const CREATE_WORKLOG = "CREATE_WORKLOG";
const GET_WORKLOG_LIST = "GET_WORKLOG_LIST";
const GET_WORKLOG = "GET_WORKLOG";
const DELETE_WORKLOG = "DELETE_WORKLOG";

//Action Creator
const createWorkLog = createAction(CREATE_WORKLOG, (data) => ({ data }));
const getWorkLogList = createAction(GET_WORKLOG_LIST, (list) => ({ list }));
const getWorkLog = createAction(GET_WORKLOG, (data) => ({ data }));
const deleteWorkLog = createAction(DELETE_WORKLOG, (data) => ({ data }));

//InitialState = {
const initialState = {
  workLogList: [],
  workLog: [],
};

//Middleware
export const addWorkLogDB = (data) => {
  return async function (dispatch) {
    dispatch(createWorkLog(data));
  };
};

export const loadWorkLogListDB = () => {
  return async function (dispatch) {
    await apis
      .loadWorkLogList()
      .then((res) => {
        console.log(res);
        dispatch(getWorkLogList(res.data));
      })
      .catch((err) => {
        window.alert("영농일지를 불러오는 중에 오류가 발생했습니다.");
        console.log(err);
      });
  };
};

export const loadWorkLogDB = (id) => {
  return async function (dispatch) {
    await apis
      .loadWorkLog(id)
      .then((res) => {
        console.log(res);
        dispatch(getWorkLog(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteWorkLogDB = (id) => {
  return async function (dispatch) {
    await apis
      .deleteWorkLog(id)
      .then((res) => {
        console.log(res);
        dispatch(removeWorkLog(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//reducer
export default handleActions(
  {
    [CREATE_WORKLOG]: (state, { payload }) =>
      produce(state, (draft) => {
        console.log(state, payload);
        draft.workLogList = payload.workLogList;
      }),

    [GET_WORKLOG_LIST]: (state, action) =>
      produce(state, (draft) => {
        console.log(state, action);
        draft.workLogList = action.payload.list;
      }),

    [GET_WORKLOG]: (state, action) =>
      produce(state, (draft) => {
        console.log(state, action);
        draft.workLog = action.payload.data;
      }),

    [DELETE_WORKLOG]: (state, action) =>
      produce(state, (draft) => {
        console.log(state, action);
        draft.workLog = draft.workLog.filter(
          (workLog) => Number(workLog.id) !== Number(payload.id)
        );
      }),
  },
  initialState
);
