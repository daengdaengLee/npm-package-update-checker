// Actions

export const CHANGE_PACKAGE_OBJECT = "next-package/CHANGE_PACKAGE_OBJECT";

// Action Creators

export const changePackageObject = packageObject => ({
  type: CHANGE_PACKAGE_OBJECT,
  packageObject
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
