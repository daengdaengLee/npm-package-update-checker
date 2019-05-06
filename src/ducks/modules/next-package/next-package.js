/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
// Actions

export const REQUEST_CHECK_UPDATES = 'next-package/REQUEST_CHECK_UPDATES';

export const CHANGE_PACKAGE_OBJECT = 'next-package/CHANGE_PACKAGE_OBJECT';
export const CHANGE_DEPENDENCIES = 'next-package/CHANGE_DEPENDENCIES';
export const CHANGE_DEV_DEPENDENCIES = 'next-package/CHANGE_DEV_DEPENDENCIES';
export const CHANGE_ERROR = 'next-package/CHANGE_ERROR';
export const CHANGE_DEPENDENCIES_ERROR = 'next-package/CHANGE_DEPENDENCIES_ERROR';
export const CHANGE_DEV_DEPENDENCIES_ERROR = 'next-package/CHANGE_DEV_DEPENDENCIES_ERROR';
export const CHANGE_DEPENDENCIES_LOADING = 'next-package/CHANGE_DEPENDENCIES_LOADING';
export const CHANGE_DEV_DEPENDENCIES_LOADING = 'next-package/CHANGE_DEV_DEPENDENCIES_LOADING';
export const CHANGE_DEPENDENCIES_NEXT_VERSION = 'next-package/CHANGE_DEPENDENCIES_NEXT_VERSION';
export const CHANGE_DEV_DEPENDENCIES_NEXT_VERSION =
  'next-package/CHANGE_DEV_DEPENDENCIES_NEXT_VERSION';

// Action Creators

export const requestCheckUpdates = packageString => ({
  type: REQUEST_CHECK_UPDATES,
  packageString,
});

export const changePackageObject = packageObject => ({
  type: CHANGE_PACKAGE_OBJECT,
  packageObject,
});
export const changeDependencies = dependencies => ({
  type: CHANGE_DEPENDENCIES,
  dependencies,
});
export const changeDevDependencies = devDependencies => ({
  type: CHANGE_DEV_DEPENDENCIES,
  devDependencies,
});
export const changeError = error => ({
  type: CHANGE_ERROR,
  error,
});
export const changeDependenciesError = (name, error) => ({
  type: CHANGE_DEPENDENCIES_ERROR,
  name,
  error,
});
export const changeDevDependenciesError = (name, error) => ({
  type: CHANGE_DEV_DEPENDENCIES_ERROR,
  name,
  error,
});
export const changeDependenciesLoading = (name, loading) => ({
  type: CHANGE_DEPENDENCIES_LOADING,
  name,
  loading,
});
export const changeDevDependenciesLoading = (name, loading) => ({
  type: CHANGE_DEV_DEPENDENCIES_LOADING,
  name,
  loading,
});
export const changeDependenciesNextVersion = (name, nextVersion) => ({
  type: CHANGE_DEPENDENCIES_NEXT_VERSION,
  name,
  nextVersion,
});
export const changeDevDependenciesNextVersion = (name, nextVersion) => ({
  type: CHANGE_DEV_DEPENDENCIES_NEXT_VERSION,
  name,
  nextVersion,
});

// Init State

const initState = {
  error: null,
  packageObject: {},
  dependencies: new Map(),
  devDependencies: new Map(),
};

// Reducer

export default function nextPackageReducer(state = initState, action = {}) {
  switch (action.type) {
    case CHANGE_PACKAGE_OBJECT:
      return applyChangePackageObject(state, action);
    case CHANGE_DEPENDENCIES:
      return applyChangeDependencies(state, action);
    case CHANGE_DEV_DEPENDENCIES:
      return applyChangeDevDependencies(state, action);
    case CHANGE_ERROR:
      return applyChangeError(state, action);
    case CHANGE_DEPENDENCIES_ERROR:
      return applyChangeDependenciesError(state, action);
    case CHANGE_DEV_DEPENDENCIES_ERROR:
      return applyChangeDevDependenciesError(state, action);
    case CHANGE_DEPENDENCIES_LOADING:
      return applyChangeDependenciesLoading(state, action);
    case CHANGE_DEV_DEPENDENCIES_LOADING:
      return applyChangeDevDependenciesLoading(state, action);
    case CHANGE_DEPENDENCIES_NEXT_VERSION:
      return applyChangeDependenciesNextVersion(state, action);
    case CHANGE_DEV_DEPENDENCIES_NEXT_VERSION:
      return applyChangeDevDependenciesNextVersion(state, action);
    default:
      return state;
  }
}

// Reducer Functions

function applyChangePackageObject(state, { packageObject }) {
  const nextPackageObject = Object.assign({}, packageObject);

  delete nextPackageObject.dependencies;
  delete nextPackageObject.devDependencies;

  return Object.assign({}, state, { packageObject });
}

function applyChangeDependencies(state, { dependencies }) {
  const nextDependencies = new Map();

  for (const dependency of dependencies) {
    nextDependencies.set(dependency.name, dependency);
  }

  return Object.assign({}, state, { dependencies: nextDependencies });
}

function applyChangeDevDependencies(state, { devDependencies }) {
  const nextDevDependencies = new Map();

  for (const devDependency of devDependencies) {
    nextDevDependencies.set(devDependency.name, devDependency);
  }

  return Object.assign({}, state, { devDependencies: nextDevDependencies });
}

function applyChangeError(state, { error }) {
  return Object.assign({}, state, { error });
}

function applyChangeDependenciesError(state, { name, error }) {
  const prevDependency = state.dependencies.get(name);
  if (!prevDependency) return state;

  const nextDependency = Object.assign({}, prevDependency, { error });
  const dependencies = new Map(state.dependencies).set(nextDependency.name, nextDependency);

  return Object.assign({}, state, { dependencies });
}

function applyChangeDevDependenciesError(state, { name, error }) {
  const prevDevDependency = state.devDependencies.get(name);
  if (!prevDevDependency) return state;

  const nextDevDependency = Object.assign({}, prevDevDependency, { error });
  const devDependencies = new Map(state.devDependencies).set(
    nextDevDependency.name,
    nextDevDependency,
  );

  return Object.assign({}, state, { devDependencies });
}

function applyChangeDependenciesLoading(state, { name, loading }) {
  const prevDependency = state.dependencies.get(name);
  if (!prevDependency) return state;

  const nextDependency = Object.assign({}, prevDependency, { loading });
  const dependencies = new Map(state.dependencies).set(nextDependency.name, nextDependency);

  return Object.assign({}, state, { dependencies });
}

function applyChangeDevDependenciesLoading(state, { name, loading }) {
  const prevDevDependency = state.devDependencies.get(name);
  if (!prevDevDependency) return state;

  const nextDevDependency = Object.assign({}, prevDevDependency, { loading });
  const devDependencies = new Map(state.devDependencies).set(
    nextDevDependency.name,
    nextDevDependency,
  );

  return Object.assign({}, state, { devDependencies });
}

function applyChangeDependenciesNextVersion(state, { name, nextVersion }) {
  const prevDependency = state.dependencies.get(name);
  if (!prevDependency) return state;

  const nextDependency = Object.assign({}, prevDependency, { nextVersion });
  const dependencies = new Map(state.dependencies).set(nextDependency.name, nextDependency);

  return Object.assign({}, state, { dependencies });
}

function applyChangeDevDependenciesNextVersion(state, { name, nextVersion }) {
  const prevDevDependency = state.devDependencies.get(name);
  if (!prevDevDependency) return state;

  const nextDevDependency = Object.assign({}, prevDevDependency, { nextVersion });
  const devDependencies = new Map(state.devDependencies).set(
    nextDevDependency.name,
    nextDevDependency,
  );

  return Object.assign({}, state, { devDependencies });
}
