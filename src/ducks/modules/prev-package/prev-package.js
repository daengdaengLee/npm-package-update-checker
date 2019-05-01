// Actions

export const CHANGE_PACKAGE_STRING = "prev-package/CHANGE_PACKAGE_STRING";

// Action Creators

export const changePackageString = packageString => ({
  type: CHANGE_PACKAGE_STRING,
  packageString
});

// Init State

const initState = {
  packageString: ""
};

// Reducer

export default function prevPackageReducer(state = initState, action = {}) {
  switch (action.type) {
    case CHANGE_PACKAGE_STRING:
      return applyChangePackageString(state, action);
    default:
      return state;
  }
}

// Reducer Functions

function applyChangePackageString(state, { packageString }) {
  return {
    ...state,
    packageString
  };
}
