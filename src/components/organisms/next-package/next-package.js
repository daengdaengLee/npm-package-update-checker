import { connect } from "react-redux";

import { withErrorBoundary } from "../../../hocs";

import NextPackagePresenter from "./next-package.presenter";

const mapStateToProps = ({
  nextPackage: { packageObject, dependencies, devDependencies }
}) => ({
  nextPackageObject: packageObject,
  nextDependencies: dependencies,
  nextDevDependencies: devDependencies
});

const NextPackage = connect(mapStateToProps)(
  withErrorBoundary(NextPackagePresenter)
);

export default NextPackage;
