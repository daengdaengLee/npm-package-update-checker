import { withErrorBoundary } from "../../../hocs";

import PrevPackagePresenter from "./prev-package.presenter";

const PrevPackage = withErrorBoundary(PrevPackagePresenter);

export default PrevPackage;
