import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";

// Action
const GET_WEATHER = "GET_WEATHER";

// Action Creator
const getWeather = createAction(GET_WEATHER, (data) => ({ data }));

// InitialState
const initialState = {
  weather: [],
};

// Middleware

// 오늘의 날씨
export const getWeatherDB = () => {
  return async function (dispatch) {
    apis
      .loadWeather()
      .then((response) => {
        console.log(response);
        dispatch(getWeather(response.data));
      })
      .catch((error) => {
        window.alert("날씨정보를 불러오는 중에 오류가 발생했습니다.");
        console.log(error);
      });
  };
};

// Reducer
export default handleActions(
  {
    [GET_WEATHER]: (state, { payload }) =>
      produce(state, (draft) => {
        console.log(payload);
        draft.weather = payload.weather;
      }),
  },
  initialState
);
