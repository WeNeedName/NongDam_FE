import {apis} from "../../shared/api";
import {createAction, handleActions} from "redux-actions";
import {produce} from "immer";

//actions
const CREATE_WORKLOG = "CREATE_WORKLOG";
const GET_WORKLOG_LIST = "GET_WORKLOG_LIST"



//Action Creator
const createWorkLog = createAction(CREATE_WORKLOG, (data) => ({data}))
const getWorkLogList = createAction(GET_WORKLOG_LIST, () => ({}))

//InitialState = {
const initialState ={  
  workLogList : [{
    crop : "복숭아",
    startTime : "2022-07-11 07:20" ,
    endTime : "2022-07-11 11:30" ,
    memo : "비료 10kg 주기",
    subMaterial : [{
      type:0,
      product:"세다세농약",
      use: "100ml"
    }, {
      type:1,
      product:"유기농비료",
      use: "200kg"
    }],
    harvest : 10,
    //images
   }
  ],
  workLog : []
}

//Middleware

export const addWorkLogDB = (data) => {
  return async function(dispatch) {
    apis
    .addWorkLog(data) //컴포넌트에서 직접 서버 연결 했으니까 이부분 삭제 가능한가?
    .then((res) => {
      console.log(res)
      dispatch(createWorkLog(data));
    })
    .catch((err) => {
      window.alert("영농일지 등록 중에 오류가 발생했습니다.");
      console.log(err)
    });
  };
};

// export const loadWorkLogDB = () => {
//   return async function (dispatch) {
//     // apis
//     // .loadWorkLog()
//     dispatch(getWorkLogList())
//     .then((res) => {
//       console.log(res)
      
//     })
//     .catch((err) => {
//       window.alert("영농일지를 불러오는 중에 오류가 발생했습니다.");
//       console.log(err)
//     });
//   }
// }




//reducer
export default handleActions({
[CREATE_WORKLOG]: (state, {payload}) => 
  produce(state, (draft) => {
    console.log(state, payload);
    draft.workLogList=payload.workLogList;
  }),

[GET_WORKLOG_LIST] : (state, {payload}) => 
  produce(state, (draft) => {
    console.log(state, payload);
    draft.workLogList=draft.workLogList;
  })



},
initialState
);
