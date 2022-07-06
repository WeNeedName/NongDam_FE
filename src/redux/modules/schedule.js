import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";

// Action
const GET_SCHEDULE_LIST = "GET_SCHEDULE_LIST";
const GET_SCHEDULE = "GET_SCHEDULE";
const GET_YEAR_MONTH = "GET_YEAR_MONTH";
const CREATE_SCHEDULE = "CREATE_SCHEDULE";
const DELETE_SCHEDULE = "DELETE_SCHEDULE";
const EDIT_SCHEDULE = "EDIT_SCHEDULE";

// Action Creator

const createSchedule = createAction(CREATE_SCHEDULE, (data) => ({ data }));

// InitialState
const initialState = {
  schedule: [],
};

// Middleware
// 스케줄 추가하기
export const addScheduleDB = (data) => {
  console.log(data);
  return async function (dispatch) {
    console.log(data);
    await apis
      .addSchedule(data)
      .then((res) => {
        console.log(res);
        dispatch(createSchedule(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 리듀서
export default handleActions(
  {
    [CREATE_SCHEDULE]: (state, action) =>
      produce(state, (draft) => {
        console.log(state, action);
        draft.schedule = action.payload.schedule;
      }),
  },
  initialState
);
