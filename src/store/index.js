import { combineReducers, createStore } from "redux";
import hoverReducer from "./hoverReducer";

const rootReducer = combineReducers({
  hover: hoverReducer,
});

const store = createStore(rootReducer);

export default store;