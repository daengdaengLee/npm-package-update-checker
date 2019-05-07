/* global window document */

import store from './ducks';
import { requestCheckUpdates } from './ducks/modules/next-package/next-package';

window.store = store;

const prevPackageTextareaEl = document.querySelector('#prev-package textarea');
const checkButtonEl = document.querySelector('#update-check-button');
const dependenciesListEl = document.querySelector('#dependencies');
const devDependenciesListEl = document.querySelector('#dev-dependencies');

function makeDependencyLiTemplate(name) {
  const html = `
<li data-package-name="${name}">
  <label>
    ${name}
  </label>
  <label data-loading class="hide">
    loading...
  </label>
  <label data-error class="hide">
    error!
  </label>
  <label>
    prev version
  </label>
  <input type="text" data-prev-version />
  <label>
    next version
  </label>
  <input type="text" data-next-version />
</li>
  `;

  return html;
}

function onClickCheck() {
  const prevPackageJsonString = prevPackageTextareaEl.value;
  dependenciesListEl.innerHTML = '<li>no dependencies</li>';
  devDependenciesListEl.innerHTML = '<li>no devDependencies</li>';

  let success = true;
  let json;

  try {
    json = JSON.parse(prevPackageJsonString);
  } catch (error) {
    dependenciesListEl.innerHTML = '<li>invalid package.json</li>';
    devDependenciesListEl.innerHTML = '<li>invalid package.json</li>';
    return;
  }

  try {
    if (json.dependencies) {
      const dependenciesHtml = Object.keys(json.dependencies)
        .map(name => makeDependencyLiTemplate(name))
        .reduce((acc, cur) => acc + cur, '');
      dependenciesListEl.innerHTML = dependenciesHtml;
    }
  } catch (error) {
    dependenciesListEl.innerHTML = "<li>invalid package.json's dependencies</li>";
    success = false;
  }

  try {
    if (json.devDependencies) {
      const devDependenciesHtml = Object.keys(json.devDependencies)
        .map(name => makeDependencyLiTemplate(name))
        .reduce((acc, cur) => acc + cur, '');
      devDependenciesListEl.innerHTML = devDependenciesHtml;
    }
  } catch (error) {
    devDependenciesListEl.innerHTML = "<li>invalid package.json's devDependencies</li>";
    success = false;
  }

  if (!success) return;
  store.dispatch(requestCheckUpdates(prevPackageJsonString));
}

checkButtonEl.addEventListener('click', onClickCheck);
