import * as F from "fxjs2";

// Actions

export const CHANGE_PACKAGE_OBJECT = "next-package/CHANGE_PACKAGE_OBJECT";
export const CHANGE_DEPENDENCIES = "next-package/CHANGE_DEPENDENCIES";
export const CHANGE_DEV_DEPENDENCIES = "next-package/CHANGE_DEV_DEPENDENCIES";
export const CHANGE_ERROR = "next-package/CHANGE_ERROR";
export const CHANGE_DEPENDENCIES_ERROR =
  "next-package/CHANGE_DEPENDENCIES_ERROR";
export const CHANGE_DEV_DEPENDENCIES_ERROR =
  "next-package/CHANGE_DEV_DEPENDENCIES_ERROR";
export const CHANGE_DEPENDENCIES_LOADING =
  "next-package/CHANGE_DEPENDENCIES_LOADING";
export const CHANGE_DEV_DEPENDENCIES_LOADING =
  "next-package/CHANGE_DEV_DEPENDENCIES_LOADING";
export const CHANGE_DEPENDENCIES_NEXT_VERSION =
  "next-package/CHANGE_DEPENDENCIES_NEXT_VERSION";
export const CHANGE_DEV_DEPENDENCIES_NEXT_VERSION =
  "next-package/CHANGE_DEV_DEPENDENCIES_NEXT_VERSION";

// Action Creators

export const changePackageObject = packageObject => ({
  type: CHANGE_PACKAGE_OBJECT,
  packageObject
});
export const changeDependencies = dependencies => ({
  type: CHANGE_DEPENDENCIES,
  dependencies
});
export const changeDevDependencies = devDependencies => ({
  type: CHANGE_DEV_DEPENDENCIES,
  devDependencies
});
export const changeError = error => ({
  type: CHANGE_ERROR,
  error
});
export const changeDependenciesError = (name, error) => ({
  type: CHANGE_DEPENDENCIES_ERROR,
  name,
  error
});
export const changeDevDependenciesError = (name, error) => ({
  type: CHANGE_DEV_DEPENDENCIES_ERROR,
  name,
  error
});
export const changeDependenciesLoading = (name, loading) => ({
  type: CHANGE_DEPENDENCIES_LOADING,
  name,
  loading
});
export const changeDevDependenciesLoading = (name, loading) => ({
  type: CHANGE_DEV_DEPENDENCIES_LOADING,
  name,
  loading
});
export const changeDependenciesNextVersion = (name, nextVersion) => ({
  type: CHANGE_DEPENDENCIES_NEXT_VERSION,
  name,
  nextVersion
});
export const changeDevDependenciesNextVersion = (name, nextVersion) => ({
  type: CHANGE_DEV_DEPENDENCIES_NEXT_VERSION,
  name,
  nextVersion
});

// Init State

const initState = {
  error: null,
  packageObject: {},
  dependencies: new Map(),
  devDependencies: new Map()
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

function applyChangePackageObject(
  state,
  { packageObject: { dependencies, devDependencies, ...packageObject } }
) {
  return { ...state, packageObject };
}

function applyChangeDependencies(state, { dependencies }) {
  return {
    ...state,
    dependencies: F.reduce(
      (dependencies, dependency) => {
        dependencies.set(dependency.name, dependency);
        return dependencies;
      },
      new Map(),
      dependencies
    )
  };
}

function applyChangeDevDependencies(state, { devDependencies }) {
  return {
    ...state,
    devDependencies: F.reduce(
      (devDependencies, devDependency) => {
        devDependencies.set(devDependency.name, devDependency);
        return devDependencies;
      },
      new Map(),
      devDependencies
    )
  };
}

function applyChangeError(state, { error }) {
  return {
    ...state,
    error
  };
}

function applyChangeDependenciesError(state, { name, error }) {
  const prevDependency = state.dependencies.get(name);
  if (!prevDependency) return state;

  const nextDependency = { ...prevDependency, error };
  const dependencies = new Map(state.dependencies).set(
    nextDependency.name,
    nextDependency
  );

  return {
    ...state,
    dependencies
  };
}

function applyChangeDevDependenciesError(state, { name, error }) {
  const prevDevDependency = state.devDependencies.get(name);
  if (!prevDevDependency) return state;

  const nextDevDependency = { ...prevDevDependency, error };
  const devDependencies = new Map(state.devDependencies).set(
    nextDevDependency.name,
    nextDevDependency
  );

  return {
    ...state,
    devDependencies
  };
}

function applyChangeDependenciesLoading(state, { name, loading }) {
  const prevDependency = state.dependencies.get(name);
  if (!prevDependency) return state;

  const nextDependency = { ...prevDependency, loading };
  const dependencies = new Map(state.dependencies).set(
    nextDependency.name,
    nextDependency
  );

  return {
    ...state,
    dependencies
  };
}

function applyChangeDevDependenciesLoading(state, { name, loading }) {
  const prevDevDependency = state.devDependencies.get(name);
  if (!prevDevDependency) return state;

  const nextDevDependency = { ...prevDevDependency, loading };
  const devDependencies = new Map(state.devDependencies).set(
    nextDevDependency.name,
    nextDevDependency
  );

  return {
    ...state,
    devDependencies
  };
}

function applyChangeDependenciesNextVersion(state, { name, nextVersion }) {
  const prevDependency = state.dependencies.get(name);
  if (!prevDependency) return state;

  const nextDependency = { ...prevDependency, nextVersion };
  const dependencies = new Map(state.dependencies).set(
    nextDependency.name,
    nextDependency
  );

  return {
    ...state,
    dependencies
  };
}

function applyChangeDevDependenciesNextVersion(state, { name, nextVersion }) {
  const prevDevDependency = state.devDependencies.get(name);
  if (!prevDevDependency) return state;

  const nextDevDependency = { ...prevDevDependency, nextVersion };
  const devDependencies = new Map(state.devDependencies).set(
    nextDevDependency.name,
    nextDevDependency
  );

  return {
    ...state,
    devDependencies
  };
}
