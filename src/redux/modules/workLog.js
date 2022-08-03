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
const deleteWorkLog = createAction(DELETE_WORKLOG, (id) => ({ id }));

//InitialState = {
const initialState = {
  workLogList_is_loaded: false,
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
        dispatch(getWorkLogList(res.data));
      })
      .catch((err) => {
        if (error.response.status === 403) {
          sessionStorage.removeItem("jwtToken");
          window.location.assign("/login");
        } else {
          window.alert(err.response.data.msg);
          console.log(err);
        }
      });
  };
};

export const loadWorkLogDB = (id) => {
  return async function (dispatch) {
    await apis
      .loadWorkLog(id)
      .then((res) => {
        dispatch(getWorkLog(res.data));
      })
      .catch((err) => {
        window.alert(err.response.data.msg);
        console.log(err);
      });
  };
};

export const deleteWorkLogDB = (id) => {
  return async function (dispatch) {
    try {
      await apis.deleteWorkLog(id);
      dispatch(deleteWorkLog(id));
    } catch (error) {
      window.alert(error.response.data.msg);
      console.log(error);
    }
  };
};

//reducer
export default handleActions(
  {
    [CREATE_WORKLOG]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.workLogList = payload.workLogList;
      }),

    [GET_WORKLOG_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.workLogList_is_loaded = true;
        draft.workLogList = action.payload.list;
      }),

    [GET_WORKLOG]: (state, action) =>
      produce(state, (draft) => {
        draft.workLog = action.payload.data;
      }),

    [DELETE_WORKLOG]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.workLogList = draft.workLogList.filter((workLog) => {
          Number(workLog.id) !== Number(payload.id);
        });
      }),
  },
  initialState
);
