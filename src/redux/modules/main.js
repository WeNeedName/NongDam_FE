import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";

// Action
const GET_WEATHER = "GET_WEATHER";
const GET_TODAY_MARKET_PRICE = "GET_TODAY_MARKET_PRICE";
const GET_MARKET_PRICE = "GET_MARKET_PRICE";
const GET_MY_CROPS_MARKET_PRICE = "GET_MY_CROPS_MARKET_PRICE";
const GET_MY_CROP_MARKET_PRICE = "GET_MY_CROP_MARKET_PRICE";
const GET_TODAY_SCHEDULE_LIST = "GET_TODAY_SCHEDULE_LIST";
const GET_TODAY_NEWS_LIST = "GET_TODAY_NEWS_LIST";

// Action Creator
const getWeather = createAction(GET_WEATHER, (data) => ({ data }));
const getTodayMarketPrice = createAction(GET_TODAY_MARKET_PRICE, (data) => ({
  data,
}));
const getMarketPrice = createAction(GET_MARKET_PRICE, (data) => ({
  data,
}));
const getMyCropMarketPrice = createAction(GET_MY_CROP_MARKET_PRICE, (data) => ({
  data,
}));
const getMyCropsMarketPrice = createAction(
  GET_MY_CROPS_MARKET_PRICE,
  (data) => ({
    data,
  })
);
const getTodaySchedule = createAction(GET_TODAY_SCHEDULE_LIST, (data) => ({
  data,
}));
const getTodayNews = createAction(GET_TODAY_NEWS_LIST, (data) => ({
  data,
}));

// InitialState
const initialState = {
  //메인페이지 로딩
  weather_is_loaded: false,
  marketPrice_is_loaded: false,
  toDo_is_loaded: false,
  news_is_loaded: false,
  analysis_is_loaded: true,
  // 시세페이지 로딩
  searchMarketPrice_is_loaded: false,

  weather: [],
  todayMarketPrice: [],
  marketPrice: [],
  myCropMarketPrice: [],
  myCropsMarketPrice: [],
  todayScheduleList: [],
  todayNews: [],
};

// Middleware
// 오늘 날씨 조회
export const getWeatherDB = () => {
  return async function (dispatch) {
    apis
      .loadWeather()
      .then((response) => {
        dispatch(getWeather(response.data));
      })
      .catch((error) => {
        // window.alert("날씨정보를 불러오는 중에 오류가 발생했습니다.");
        console.log(error);
      });
  };
};
// 오늘 시세 조회
export const getTodayMarketPriceDB = (data) => {
  return async function (dispatch) {
    apis
      .loadTodayMarketPrice(data)
      .then((response) => {
        dispatch(getTodayMarketPrice(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
// 선택 작물 시세 조회
export const getMarketPriceDB = (data) => {
  return async function (dispatch) {
    apis
      .loadMarketPrice(data)
      .then((response) => {
        dispatch(getMarketPrice(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
// 내 작물 시세 전체조회
export const getMyCropsMarketPriceDB = () => {
  return async function (dispatch) {
    apis
      .firstLoadMyCropsMarketPrice()
      .then((response) => {
        dispatch(getMyCropsMarketPrice(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// 내 작물 시세 조회
export const getMyCropMarketPriceDB = (data) => {
  return async function (dispatch) {
    apis
      .loadMyCropsMarketPrice(data)
      .then((response) => {
        dispatch(getMyCropMarketPrice(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// 오늘 일정 조회
export const loadTodayScheduleDB = () => async (dispatch) => {
  try {
    const { data } = await apis.loadTodaySchedule();
    dispatch(getTodaySchedule(data));
  } catch (err) {
    console.log(err);
  }
};

// 오늘 뉴스 조회
export const loadTodayNewsDB = () => {
  return async function (dispatch) {
    apis
      .loadTodayNews()
      .then((response) => {
        dispatch(getTodayNews(response.data));
      })
      .catch((error) => {
        // window.alert("날씨정보를 불러오는 중에 오류가 발생했습니다.");
        console.log(error);
      });
  };
};

// Reducer
export default handleActions(
  {
    // 오늘 날씨 조회
    [GET_WEATHER]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.weather_is_loaded = true;
        draft.weather = payload.data;
      }),
    // 오늘 시세 조회
    [GET_TODAY_MARKET_PRICE]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.marketPrice_is_loaded = true;
        draft.todayMarketPrice = payload.data;
      }),
    // 선택 작물 시세 조회
    [GET_MARKET_PRICE]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.searchMarketPrice_is_loaded = true;
        draft.marketPrice = payload.data;
      }),
    // 내 작물 시세 전체 조회
    [GET_MY_CROPS_MARKET_PRICE]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.myCropsMarketPrice = payload.data;
      }),
    // 내 작물 시세 조회
    [GET_MY_CROP_MARKET_PRICE]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.myCropMarketPrice = payload.data;
      }),
    // 오늘 일정 조회
    [GET_TODAY_SCHEDULE_LIST]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.toDo_is_loaded = true;
        draft.todayScheduleList = payload.data;
      }),
    // 오늘 뉴스 조회
    [GET_TODAY_NEWS_LIST]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.news_is_loaded = true;
        draft.todayNews = payload.data;
      }),
  },
  initialState
);
