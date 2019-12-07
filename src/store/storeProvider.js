import { createStore, combineReducers } from "redux";
import todos from "./todo.redux";
const rootReducer = combineReducers({ todos });

const store = createStore(rootReducer);

export default store;
