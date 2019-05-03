import { connect } from "react-redux";

import { withErrorBoundary } from "./hocs";

import AppPresenter from "./app.presenter";

const mapStateToProps = ({
  nextPackage: { packageObject, dependencies, devDependencies }
}) => ({
  nextPackageObject: packageObject,
  nextDependencies: dependencies,
  nextDevDependencies: devDependencies
});

const App = connect(mapStateToProps)(withErrorBoundary(AppPresenter));

export default App;
