import * as F from "fxjs2";

// Actions

export const CHANGE_PACKAGE_OBJECT = "next-package/CHANGE_PACKAGE_OBJECT";
export const CHANGE_DEPENDENCIES = "next-package/CHANGE_DEPENDENCIES";
export const CHANGE_DEV_DEPENDENCIES = "next-package/CHANGE_DEV_DEPENDENCIES";
export const CHANGE_ERROR = "next-package/CHANGE_ERROR";

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
export const changeError = (target, error) => ({
  type: CHANGE_ERROR,
  target,
  error
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

function applyChangeError(state, { target, error }) {
  if (!target) return { ...state, error };

  const prevMap = state[target[0]];
  const prevDependency = prevMap.get(target[1]);
  if (!prevDependency) return state;

  const nextDependency = { ...prevDependency, error };
  const nextMap = new Map(prevMap).set(nextDependency.name, nextDependency);

  return {
    ...state,
    [target[0]]: nextMap
  };
}
