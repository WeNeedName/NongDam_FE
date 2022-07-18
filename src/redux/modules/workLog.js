import { apis } from "../../shared/api";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

//actions
const CREATE_WORKLOG = "CREATE_WORKLOG";
const GET_WORKLOG_LIST = "GET_WORKLOG_LIST";

//Action Creator
const createWorkLog = createAction(CREATE_WORKLOG, (data) => ({ data }));
const getWorkLogList = createAction(GET_WORKLOG_LIST, () => ({}));

//InitialState = {
const initialState = {
  workLogList: [
    {
      title: "감자10kg 수확",
      crop: "감자",
      date: "2022-07-11",
      workTime: 5,
      memo: "오늘은 B농장의 감자들을 10kg정도 캤다. 오늘 수확한 감자들은 꽤 실했다. 특A를 기대해볼만 할 것 같다.",
      subMaterial: {
        type: 0,
        product: "좋은비료",
        use: "100ml",
      },
      harvest: 100,
      images:
        "https://images.unsplash.com/photo-1508313880080-c4bef0730395?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHBvdGF0b3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    },
    {
      title: "비료50kg",
      crop: "복숭아",
      date: "2022-06-13",
      workTime: 3,
      memo: "오늘은 비료를 부렸다 50kg정도를 뿌렸고, 물은 100l정도 준 것 같다",
      subMaterial: {
        type: 0,
        product: "좋은비료",
        use: "100ml",
      },
      harvest: 100,
      images:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Peaches_at_Applecrest_Farm_Orchards_-_20108457519.jpg/800px-Peaches_at_Applecrest_Farm_Orchards_-_20108457519.jpg",
    },
    {
      title: "수확 전 준비완료",
      crop: "딸기",
      date: "2022-01-28",
      workTime: 8,
      memo: "제1농장의 딸기를 수확하고자 상태를 봤는데 나쁘지 않다. 이대로만 쑥쑥 커 줘~~!",
      subMaterial: {
        type: 0,
        product: "좋은비료",
        use: "100ml",
      },
      harvest: 100,
      images:
        "http://www.varietytour.com/web/product/big/202104/0bfdfe80b149b4325872e77393c21c60.jpg",
    },
  ],
  workLog: [],
};

//Middleware

export const addWorkLogDB = (data) => {
  return async function (dispatch) {
    dispatch(createWorkLog(data));
    // addWorkLog(data) //컴포넌트에서 직접 서버 연결 했으니까 이부분 삭제 가능한가?

    // .catch((err) => {
    //   window.alert("영농일지 등록 중에 오류가 발생했습니다.");
    //   console.log(err)
    // });
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
export default handleActions(
  {
    [CREATE_WORKLOG]: (state, { payload }) =>
      produce(state, (draft) => {
        console.log(state, payload);
        draft.workLogList = payload.workLogList;
      }),

    [GET_WORKLOG_LIST]: (state, { payload }) =>
      produce(state, (draft) => {
        console.log(state, payload);
        draft.workLogList = draft.workLogList;
      }),
  },
  initialState
);
