import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";
import moment from "moment";
import "moment/locale/ko";

// alert 라이브러리
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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
  is_loaded: false,
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
  return async function (dispatch) {
    await apis
      .addSchedule(data)
      .then((res) => {
        dispatch(createSchedule(res.data));
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
      })
      .catch((err) => {
        console.log(err);
        window.alert(err.response.data.msg);
      });
  };
};
//최근 스케줄 불러오기
export const getCurrentScheduleListDB = () => {
  return async function (dispatch) {
    apis
      .loadCurrentSchedule()
      .then((res) => {
        dispatch(getSchedule(res.data));
      })
      .catch((err) => {
        //window.alert("최근 스케줄 불러오는 중에 오류가 발생했습니다.");
        console.log(err);
      });
  };
};

//월별 일정리스트 불러오기
export const getScheduleListDB = (date) => {
  return async function (dispatch) {
    apis
      .loadSchedule(date)
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
export const editScheduleDB = (id, data, yearMonth) => async (dispatch) => {
  try {
    //console.log("스케줄 수정 준비", id, data);
    await apis.editSchedule(id, data);
    apis.loadSchedule(yearMonth).then((response) => {
      //dispatch(getSchedule(response.data));
      dispatch(getScheduleList(response.data));
      Swal.fire({
        title: "수정이 완료되었습니다.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
        color: "#black",
        padding: "10px",
        width: "400px",
        // height: "200px",
      });
    });

    apis.loadCurrentSchedule().then((response) => {
      dispatch(getSchedule(response.data));
      //dispatch(getScheduleList(response.data));
      Swal.fire({
        title: "수정이 완료되었습니다.",
        icon: "success",
        showConfirmButton: false,
        timer: 1300,
        color: "#black",
        padding: "20px",
        width: "400px",
        // height: "200px",
      });
    });
  } catch (error) {
    window.alert("일정 수정 중에 오류가 발생했습니다");
    console.log(error);
  }
};

//스케줄 삭제하기
export const deleteScheduleDB = (id) => async (dispatch) => {
  try {
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
    [GET_YEAR_MONTH]: (state, { payload }) =>
      produce(state, (draft) => {
        // console.log(payload);
        draft.yearMonth = payload.data;
      }),

    [GET_SCHEDULE_LIST]: (state, { payload }) =>
      produce(state, (draft) => {
        console.log(payload);
        draft.scheduleList = payload.list;
      }),

    [GET_SCHEDULE]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loaded = true;
        draft.currentSchedule = action.payload.currentSchedule;
      }),

    [DELETE_SCHEDULE]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.currentSchedule = draft.currentSchedule.filter(
          (schedule) => Number(schedule.id) !== Number(payload.id)
        );
        draft.scheduleList = draft.scheduleList.filter(
          (schedule) => Number(schedule.id) !== Number(payload.id)
        );
      }),

    [CREATE_SCHEDULE]: (state, { payload }) =>
      produce(state, (draft) => {
        //최근 스케줄 생성
        draft.currentSchedule.unshift(payload.data);
        draft.currentSchedule = draft.currentSchedule.map((schedule) => {
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
