import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";

// Action
const GET_WEATHER = "GET_WEATHER";
const GET_MARKET_PRICE = "GET_MARKET_PRICE";

// Action Creator
const getWeather = createAction(GET_WEATHER, (data) => ({ data }));
const getMarketPrice = createAction(GET_MARKET_PRICE, (data) => ({ data }));

// InitialState
const initialState = {
  weather: [],
  marketPrice: [],
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
// 오늘의 시세
export const getMarketPriceDB = () => {
  return async function (dispatch) {
    apis
      .loadMarketPrice()
      .then((response) => {
        console.log(response);
        dispatch(getMarketPrice(response.data));
      })
      .catch((error) => {
        window.alert("시세정보를 불러오는 중에 오류가 발생했습니다.");
        console.log(error);
      });
  };
};

// Reducer
export default handleActions(
  {
    [GET_WEATHER]: (state, { payload }) =>
      produce(state, (draft) => {
        console.log(state, payload);
        draft.weather = payload.data;
      }),

    [GET_MARKET_PRICE]: (state, { payload }) =>
      produce(state, (draft) => {
        console.log(state, payload);
        draft.marketPrice = payload.data;
      }),
  },
  initialState
);
