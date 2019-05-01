import { all, put, select, call, takeLatest } from "redux-saga/effects";
import * as F from "fxjs2";

import { makeDependency } from "../../../entities";
import { getNpmPackageVersion } from "../../../requests";

import {
  REQUEST_CHECK_UPDATES,
  changePackageObject,
  changeDependencies,
  changeDevDependencies,
  changeError,
  changeDependenciesError,
  changeDevDependenciesError,
  changeDependenciesLoading,
  changeDevDependenciesLoading,
  changeDependenciesNextVersion,
  changeDevDependenciesNextVersion
} from "../../modules/next-package/next-package";

// workers

export function* processRequestCheckUpdates({ packageString }) {
  yield put(changePackageObject({}));
  yield put(changeError(null));
  yield put(changeDependencies(new Map()));
  yield put(changeDevDependencies(new Map()));

  try {
    const {
      dependencies: dependenciesObject,
      devDependencies: devDependenciesObject,
      ...packageObject
    } = JSON.parse(packageString);

    yield put(changePackageObject(packageObject));

    const dependencies = dependenciesObject
      ? F.map(
          ([name, prevVersion]) => makeDependency(name, prevVersion, "", true),
          Object.entries(dependenciesObject)
        )
      : [];
    yield put(changeDependencies(dependencies));

    const devDependencies = devDependenciesObject
      ? F.map(
          ([name, prevVersion]) => makeDependency(name, prevVersion, "", true),
          Object.entries(devDependenciesObject)
        )
      : [];
    yield put(changeDevDependencies(devDependencies));
  } catch (error) {
    yield put(changeError(error));
    return;
  }

  const { dependencies, devDependencies } = yield select(
    state => state.nextPackage
  );

  for (const [name] of dependencies) {
    const { success, version: nextVersion } = yield call(
      getNpmPackageVersion,
      name
    );

    yield success
      ? put(changeDependenciesNextVersion(name, nextVersion))
      : put(
          changeDependenciesError(
            name,
            new Error("Failed to read next version")
          )
        );
    yield put(changeDependenciesLoading(name, false));
  }

  for (const [name] of devDependencies) {
    const { success, version: nextVersion } = yield call(
      getNpmPackageVersion,
      name
    );

    yield success
      ? put(changeDevDependenciesNextVersion(name, nextVersion))
      : put(
          changeDevDependenciesError(
            name,
            new Error("Failed to read next version")
          )
        );
    yield put(changeDevDependenciesLoading(name, false));
  }
}

// watchers

function* watchRequestCheckUpdates() {
  yield takeLatest(REQUEST_CHECK_UPDATES, processRequestCheckUpdates);
}

export default function* nextPackageSaga() {
  yield all([watchRequestCheckUpdates()]);
}
