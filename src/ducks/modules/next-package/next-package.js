// Actions

// Action Creators

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
    default:
      return state;
  }
}

// Reducer Functions
