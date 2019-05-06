/* eslint-disable no-restricted-syntax */
import { all, put, select, call, takeLatest } from 'redux-saga/effects';

import { makeDependency } from '../../../entities';
import { getNpmPackageVersion } from '../../../requests';

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
  changeDevDependenciesNextVersion,
} from '../../modules/next-package/next-package';

// workers

export function* processRequestCheckUpdates({ packageString }) {
  yield put(changePackageObject({}));
  yield put(changeError(null));
  yield put(changeDependencies(new Map()));
  yield put(changeDevDependencies(new Map()));

  try {
    const packageObject = JSON.parse(packageString);

    const dependenciesObject = packageObject.dependencies;
    delete packageObject.dependencies;

    const devDependenciesObject = packageObject.devDependencies;
    delete packageObject.devDependencies;

    yield put(changePackageObject(packageObject));

    const dependencies = dependenciesObject
      ? Object.entries(dependenciesObject).map(([name, prevVersion]) =>
          makeDependency(name, prevVersion, '', true),
        )
      : [];
    yield put(changeDependencies(dependencies));

    const devDependencies = devDependenciesObject
      ? Object.entries(devDependenciesObject).map(([name, prevVersion]) =>
          makeDependency(name, prevVersion, '', true),
        )
      : [];
    yield put(changeDevDependencies(devDependencies));
  } catch (error) {
    yield put(changeError(error));
    return;
  }

  const { dependencies, devDependencies } = yield select(state => state.nextPackage);

  for (const [name] of dependencies) {
    const { success, version: nextVersion } = yield call(getNpmPackageVersion, name);

    yield success
      ? put(changeDependenciesNextVersion(name, nextVersion))
      : put(changeDependenciesError(name, new Error('Failed to read next version')));
    yield put(changeDependenciesLoading(name, false));
  }

  for (const [name] of devDependencies) {
    const { success, version: nextVersion } = yield call(getNpmPackageVersion, name);

    yield success
      ? put(changeDevDependenciesNextVersion(name, nextVersion))
      : put(changeDevDependenciesError(name, new Error('Failed to read next version')));
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
