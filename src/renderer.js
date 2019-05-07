import { getNpmPackageLatestVersion } from './requests';
import store from './ducks';

// eslint-disable-next-line no-undef
window.store = store;

getNpmPackageLatestVersion('react')
  .then(console.log)
  .catch(console.error);
