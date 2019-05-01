import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./modules";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  process.env.NODE_ENV === "production"
    ? compose
    : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

export default store;
