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
    title : "비료뿌리는 날!", 
    crop : "복숭아",
    date : "2022-07-11" ,
    workTime : 3,
    memo : "오늘은 비료를 부렸다 50kg정도를 뿌렸고, 물은 100l정도 준 것 같다",
    subMaterial : {
      type:0,
      product:"좋은비료",
      use: "100ml"
    },
    harvest : 100,
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
