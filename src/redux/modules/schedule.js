import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";
import moment from "moment";
import "moment/locale/ko";
import { isLabelWithInternallyDisabledControl } from "@testing-library/user-event/dist/utils";
import { localeData } from "moment";

// Action
const GET_SCHEDULE_LIST = "GET_SCHEDULE_LIST";
const GET_SCHEDULE = "GET_SCHEDULE";
const GET_YEAR_MONTH = "GET_YEAR_MONTH";
const CREATE_SCHEDULE = "CREATE_SCHEDULE";
const DELETE_SCHEDULE = "DELETE_SCHEDULE";
const EDIT_SCHEDULE = "EDIT_SCHEDULE";

// Action Creator

const getScheduleList = createAction(GET_SCHEDULE_LIST, (list) => ({ list })); //전체 스케줄
const getSchedule = createAction(GET_SCHEDULE, (currentSchedule) => ({
  currentSchedule,
})); //스케줄
const createSchedule = createAction(CREATE_SCHEDULE, (data) => ({ data })); //스케줄 생성
const changeSchedule = createAction(EDIT_SCHEDULE, (data) => ({ data })); //스케줄 수정
const deleteSchedule = createAction(DELETE_SCHEDULE, (id) => ({ id }));
const getYearMonth = createAction(GET_YEAR_MONTH, (data) => ({ data }));

// InitialState
const initialState = {
  scheduleList: [],
  currentSchedule: [],
  yearMonth: {
    month: moment().format("MM"),
    year: moment().format("YYYY"),
  },
};

// Middleware
// 스케줄 추가하기
export const addScheduleDB = (data) => {
  //console.log(data)
  return async function (dispatch) {
    console.log(data);
    await apis
      .addSchedule(data)
      .then((res) => {
        console.log(res.data);
        dispatch(createSchedule(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
//최근 스케줄 불러오기
export const getCurrentScheduleListDB = () => {
  return async function (dispatch) {
    apis
      .loadCurrentSchedule()
      .then((res) => {
        console.log(res.data);
        dispatch(getSchedule(res.data));
      })
      .catch((err) => {
        //window.alert("최근 스케줄 불러오는 중에 오류가 발생했습니다.");
        console.log(err);
      });
  };
};

//월별 장부리스트 불러오기
export const getScheduleListDB = (date) => {
  //console.log(date);
  return async function (dispatch) {
    console.log(date);
    apis
      .loadMonthlySchedule(date)
      .then((response) => {
        console.log(response);
        dispatch(getScheduleList(response.data));
      })
      .catch((error) => {
        //window.alert("월별 스케줄을 불러오는 중에 오류가 발생했습니다.");
        console.log(error);
      });
  };
};

//스케줄 수정하기
export const editScheduleDB = (id, data) => async (dispatch) => {
  try {
    console.log("스케줄 수정 준비", id, data);
    await apis.editSchedule(id, data);

    apis.loadCurrentSchedule().then((response) => {
      console.log(response.data);
      dispatch(getSchedule(response.data));
    });
  } catch (error) {
    //window.alert("일정 수정 중에 오류가 발생했습니다");
    console.log(error);
  }
};

//스케줄 삭제하기
export const deleteScheduleDB = (id) => async (dispatch) => {
  try {
    console.log("스케줄 삭제 준비!", id);
    await apis.deleteSchedule(id);
    dispatch(deleteSchedule(id));
  } catch (err) {
    //window.alert("일정 삭제 중에 오류가 발생했습니다")
    console.log(err);
  }
};
// 선택한 년도, 월 설정
export const getYearMonthDB = (date) => {
  console.log(date);
  return async function (dispatch) {
    dispatch(getYearMonth(date));
  };
};

// reducer
export default handleActions(
  {
    [GET_SCHEDULE]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.currentSchedule = action.payload.currentSchedule;
      }),
    [GET_SCHEDULE_LIST]: (state, { payload }) =>
      produce(state, (draft) => {
        console.log(state, payload);
        draft.scheduleList = payload.list;
      }),
    [DELETE_SCHEDULE]: (state, { payload }) =>
      produce(state, (draft) => {
        console.log(payload);
        draft.currentSchedule = draft.currentSchedule.filter(
          (schedule) => Number(schedule.id) !== Number(payload.id)
        );
      }),

    [CREATE_SCHEDULE]: (state, { payload }) =>
      produce(state, (draft) => {
        console.log(state, payload);
        //최근 스케줄 생성
        draft.currentSchedule.unshift(payload.data);
        draft.currentSchedule = draft.currentSchedule.map((schedule) => {
          console.log(schedule);
          if (Number(schedule.id) === Number(payload.data.id)) {
            return {
              ...schedule,
              id: payload.data.id,
              crop: payload.data.crop,
              startTime: payload.data.startTime,
              endTime: payload.data.endTime,
              toDo: payload.data.toDo,
            };
          } else {
            return schedule;
          }
        });
        //월별 스케줄 생성
        draft.scheduleList.unshift(payload.data);
        draft.scheduleList = draft.scheduleList.map((schedule) => {
          console.log(schedule);
          if (Number(schedule.id) === Number(payload.data.id)) {
            return {
              ...schedule,
              id: payload.data.id,
              crop: payload.data.crop,
              startTime: payload.data.startTime,
              endTime: payload.data.endTime,
              toDo: payload.data.toDo,
            };
          } else {
            return schedule;
          }
        });
      }),
  },
  initialState
);
