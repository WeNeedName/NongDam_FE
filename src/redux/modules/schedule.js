// import { createAction, handleActions } from "redux-actions";
// import { produce } from "immer";
// import { apis } from "../../shared/api";

// // Action
// const GET_SCHEDULE_LIST = "GET_SCHEDULE_LIST";
// const GET_SCHEDULE = "GET_SCHEDULE";
// const GET_YEAR_MONTH = "GET_YEAR_MONTH";
// const CREATE_SCHEDULE = "CREATE_SCHEDULE";
// const DELETE_SCHEDULE = "DELETE_SCHEDULE";
// const EDIT_SCHEDULE = "EDIT_SCHEDULE"

// // Action Creator

// const createSchedule = createAction(CREATE_SCHEDULE, (data) => ({ data }));

// // InitialState
// const initialState = {
//   schedule: [null],
// };

// // Middleware
// // 스케줄 추가하기
// export const addScheduleDB=(data)=> async (dispatch) => {
//     try{
//     console.log("스케줄에 들어갈 데이터 ", data)
//     const {} = await apis.addSchedule(data);
//     dispatch(createSchedule(data));
//     }
//     catch(err){
//     console.log(err)
//     }
// }

// // Reducer
// export default handleActions(
//   {
//     [CREATE_SCHEDULE]: (state, {payload}) =>
//     produce(state, (draft)) => {
//         console.log(state, payload);

//     })
//   },
//   initialState
// );
