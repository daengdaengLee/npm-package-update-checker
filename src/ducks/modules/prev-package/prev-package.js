// Actions

export const CHANGE_PACKAGE_STRING = "prev-package/CHANGE_PACKAGE_STRING";

// Action Creators

export const changePackageString = string => ({
  type: CHANGE_PACKAGE_STRING,
  string
});

// Init State

const initState = {
  string: "",
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

function applyChangePackageString(state, { string }) {
  return {
    ...state,
    string
  };
}
