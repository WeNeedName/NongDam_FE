import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import users from "./modules/users";
import main from "./modules/main";
import account from "./modules/account";
import schedule from "./modules/schedule";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();
// root 리듀서를 만들어줍니다.
// 나중에 리듀서를 여러개 만들게 되면 여기에 하나씩 추가해주는 거예요!
const rootReducer = combineReducers({
  users,
  main,
  account,
  schedule,
});

// 미들웨어들을 모아두는 곳
const middlewares = [thunk];
const enhancer = applyMiddleware(...middlewares);

// 스토어를 만듭니다.
const store = createStore(rootReducer, enhancer);

export default store;
