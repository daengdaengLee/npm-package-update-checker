import { put, call } from "redux-saga/effects";

import { makeDependency } from "../../../entities";
import { getNpmPackageVersion } from "../../../requests";

import {
  changePackageObject,
  changeDependencies,
  changeDevDependencies,
  changeError,
  changeDependenciesNextVersion,
  changeDependenciesLoading,
  changeDevDependenciesNextVersion,
  changeDevDependenciesLoading
} from "../../modules/next-package/next-package";

import { processRequestCheckUpdates } from "./next-package";

describe("next-package saga", () => {
  describe("processRequestCheckUpdates", () => {
    test("정상 상황", () => {
      // given
      const packageString = `
{
  "name": "test",
  "dependencies": {
    "dep": "prevVersion"
  },
  "devDependencies": {
    "devDep": "prevVersion"
  }
}
      `.trim();
      const saga = processRequestCheckUpdates({ packageString });

      // 초기화
      expect(saga.next().value).toEqual(put(changePackageObject({})));
      expect(saga.next().value).toEqual(put(changeError(null)));
      expect(saga.next().value).toEqual(put(changeDependencies(new Map())));
      expect(saga.next().value).toEqual(put(changeDevDependencies(new Map())));

      // package.json 문자열 파싱 결과 업데이트
      expect(saga.next().value).toEqual(
        put(changePackageObject({ name: "test" }))
      );
      const dep = makeDependency("dep", "prevVersion", "", true);
      const devDep = makeDependency("devDep", "prevVersion", "", true);
      expect(saga.next().value).toEqual(put(changeDependencies([dep])));
      expect(saga.next().value).toEqual(put(changeDevDependencies([devDep])));

      // 업데이트한 상태 조회
      expect(saga.next().value.type).toEqual("SELECT");
      const state = {
        dependencies: new Map([["dep", dep]]),
        devDependencies: new Map([["devDep", devDep]])
      };

      // dependencies 조회
      expect(saga.next(state).value).toEqual(call(getNpmPackageVersion, "dep"));
      expect(
        saga.next({ success: true, version: "nextVersion" }).value
      ).toEqual(put(changeDependenciesNextVersion("dep", "nextVersion")));
      expect(saga.next().value).toEqual(
        put(changeDependenciesLoading("dep", false))
      );

      // devDependencies 조회
      expect(saga.next().value).toEqual(call(getNpmPackageVersion, "devDep"));
      expect(
        saga.next({ success: true, version: "nextVersion" }).value
      ).toEqual(put(changeDevDependenciesNextVersion("devDep", "nextVersion")));
      expect(saga.next().value).toEqual(
        put(changeDevDependenciesLoading("devDep", false))
      );

      // 종료
      expect(saga.next().done).toBe(true);
    });
  });
});
