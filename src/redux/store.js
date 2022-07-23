import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import users from "./modules/users";
import main from "./modules/main";
import account from "./modules/account";
import schedule from "./modules/schedule";
import workLog from "./modules/workLog";
import analysis from "./modules/analysis";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();
// root 리듀서
const rootReducer = combineReducers({
  users,
  main,
  account,
  schedule,
  workLog,
  analysis,
});

// 미들웨어들을 모아두는 곳
const middlewares = [thunk];
const enhancer = applyMiddleware(...middlewares);

// 스토어
const store = createStore(rootReducer, enhancer);

export default store;
