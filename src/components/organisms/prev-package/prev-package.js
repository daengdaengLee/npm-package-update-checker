import { connect } from "react-redux";

import { withErrorBoundary } from "../../../hocs";

import { requestCheckUpdates } from "../../../ducks/modules/next-package/next-package";

import PrevPackagePresenter from "./prev-package.presenter";

const mapDispatchToProps = dispatch => ({
  onClickCheck: packageString => dispatch(requestCheckUpdates(packageString))
});

const PrevPackage = connect(
  null,
  mapDispatchToProps
)(withErrorBoundary(PrevPackagePresenter));

export default PrevPackage;
