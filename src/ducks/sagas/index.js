import { all } from "redux-saga/effects";

import nextPackageSaga from "./next-package/next-package";

export default function* rootSaga() {
  yield all([nextPackageSaga()]);
}
