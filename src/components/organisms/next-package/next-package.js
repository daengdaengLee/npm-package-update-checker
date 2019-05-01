import { withErrorBoundary } from "../../../hocs";

import NextPackagePresenter from "./next-package.presenter";

const NextPackage = withErrorBoundary(NextPackagePresenter);

export default NextPackage;
