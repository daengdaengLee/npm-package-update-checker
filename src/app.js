import { connect } from "react-redux";

import { withErrorBoundary } from "./hocs";

import { requestCheckUpdates } from "./ducks/modules/next-package/next-package";

import AppPresenter from "./app.presenter";

const mapStateToProps = ({
  nextPackage: { packageObject, dependencies, devDependencies }
}) => ({
  nextPackageObject: packageObject,
  nextDependencies: dependencies,
  nextDevDependencies: devDependencies
});

const mapDispatchToProps = dispatch => ({
  onClickCheck: packageString => dispatch(requestCheckUpdates(packageString))
});

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorBoundary(AppPresenter));

export default App;
