import { combineReducers } from "redux";

import nextPackage from "./next-package/next-package";
import prevPackage from "./prev-package/prev-package";

const rootReducer = combineReducers({ nextPackage, prevPackage });

export default rootReducer;
