import { combineReducers } from "redux";

const dummyReducer = (state = { dummy: "hello world" }, action = {}) => state;

const rootReducer = combineReducers({ dummy: dummyReducer });

export default rootReducer;
