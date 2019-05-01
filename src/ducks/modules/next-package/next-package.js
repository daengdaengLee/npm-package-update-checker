import * as F from "fxjs2";

// Actions

export const CHANGE_PACKAGE_OBJECT = "next-package/CHANGE_PACKAGE_OBJECT";
export const CHANGE_DEPENDENCIES = "next-package/CHANGE_DEPENDENCIES";

// Action Creators

export const changePackageObject = packageObject => ({
  type: CHANGE_PACKAGE_OBJECT,
  packageObject
});
export const changeDependencies = dependencies => ({
  type: CHANGE_DEPENDENCIES,
  dependencies
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
