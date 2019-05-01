import { makeDependency } from "../../../entities";

import nextPackageReducer, {
  changePackageObject,
  changeDependencies,
  changeDevDependencies,
  changeError
} from "./next-package";

describe("next-package reducer", () => {
  test("init", () => {
    // given
    // 초기 상태에서
    const prevState = {};

    // when
    // 빈 액션을 넣어주면
    const action = {};
    const nextState = nextPackageReducer(prevState, action);

    // then
    // 초기 상태를 그대로 리턴한다.
    expect(nextState).toBe(prevState);
  });

  describe("next-package/CHANGE_PACKAGE_OBJECT action", () => {
    const packageObject = {
      name: "npm-package-update-checker",
      version: "0.1.0"
    };
    const dependenciesObject = {
      react: "^16.8.6"
    };
    const devDependenciesObject = {
      eslint: "^5.16.0"
    };

    // given
    const prevState = {
      packageObject: {}
    };

    test("dependencies, devDependencies 속성이 없는 객체를 넘겨준 경우", () => {
      // when
      const action = changePackageObject(packageObject);
      const nextState = nextPackageReducer(prevState, action);

      // then
      expect(nextState.packageObject).toEqual(packageObject);
    });

    test("dependencies 속성은 있지만 devDependencies 속성이 없는 객체를 넘겨준 경우", () => {
      // when
      const action = changePackageObject({
        ...packageObject,
        dependencies: dependenciesObject
      });
      const nextState = nextPackageReducer(prevState, action);

      // then
      expect(nextState.packageObject).toEqual(packageObject);
    });

    test("dependencies 속성은 없지만 devDependencies 속성은 있는 객체를 넘겨준 경우", () => {
      // when
      const action = changePackageObject({
        ...packageObject,
        devDependencies: devDependenciesObject
      });
      const nextState = nextPackageReducer(prevState, action);

      // then
      expect(nextState.packageObject).toEqual(packageObject);
    });

    test("dependencies, devDependencies 속성이 모두 있는 객체를 넘겨준 경우", () => {
      // when
      const action = changePackageObject({
        ...packageObject,
        dependencies: dependenciesObject,
        devDependencies: devDependenciesObject
      });
      const nextState = nextPackageReducer(prevState, action);

      // then
      expect(nextState.packageObject).toEqual(packageObject);
    });
  });

  describe("next-package/CHANGE_DEPENDENCIES action", () => {
    const dep1 = makeDependency("dep1");
    const dep2 = makeDependency("dep2");

    test("기존 디펜던시 목록이 없는 상태에서 디펜던시 목록을 넘겨준 경우", () => {
      // given
      const prevState = {
        dependencies: new Map()
      };

      // when
      const action = changeDependencies([dep1]);
      const nextState = nextPackageReducer(prevState, action);

      // then
      expect([...nextState.dependencies.entries()]).toEqual([["dep1", dep1]]);
    });

    test("기존 디펜던시 목록이 있는 상태에서 디펜던시 목록을 넘겨준 경우", () => {
      // given
      const prevState = {
        dependencies: new Map([["dep1", dep1]])
      };

      // when
      const action = changeDependencies([dep2]);
      const nextState = nextPackageReducer(prevState, action);

      // then
      expect([...nextState.dependencies.entries()]).toEqual([["dep2", dep2]]);
    });
  });

  describe("next-package/CHANGE_DEV_DEPENDENCIES action", () => {
    const dep1 = makeDependency("dep1");
    const dep2 = makeDependency("dep2");

    test("기존 데브 디펜던시 목록이 없는 상태에서 데브 디펜던시 목록을 넘겨준 경우", () => {
      // given
      const prevState = {
        devDependencies: new Map()
      };

      // when
      const action = changeDevDependencies([dep1]);
      const nextState = nextPackageReducer(prevState, action);

      // then
      expect([...nextState.devDependencies.entries()]).toEqual([
        ["dep1", dep1]
      ]);
    });

    test("기존 데브 디펜던시 목록이 있는 상태에서 데브 디펜던시 목록을 넘겨준 경우", () => {
      // given
      const prevState = {
        devDependencies: new Map([["dep1", dep1]])
      };

      // when
      const action = changeDevDependencies([dep2]);
      const nextState = nextPackageReducer(prevState, action);

      // then
      expect([...nextState.devDependencies.entries()]).toEqual([
        ["dep2", dep2]
      ]);
    });
  });

  describe("next-package/CHANGE_ERROR", () => {
    const error = new Error("TEST");

    test("전역 에러 변경", () => {
      // given
      const prevState = {
        error: null
      };

      // when
      const action = changeError(null, error);
      const nextState = nextPackageReducer(prevState, action);

      // then
      expect(nextState.error).toBe(error);
    });

    test("존재하는 디펜던시의 에러 변경", () => {
      // given
      const prevState = {
        dependencies: new Map([["dep1", makeDependency("dep1")]])
      };

      // when
      const action = changeError(["dependencies", "dep1"], error);
      const nextState = nextPackageReducer(prevState, action);

      // then
      expect(nextState.dependencies.get("dep1").error).toBe(error);
    });

    test("존재하지 않는 디펜던시의 에러 변경", () => {
      // given
      const dep1 = makeDependency("dep1");
      const prevState = {
        dependencies: new Map([["dep1", dep1]])
      };

      // when
      const action = changeError(["dependencies", "dep2"], error);
      const nextState = nextPackageReducer(prevState, action);

      // then
      expect(nextState.dependencies.get("dep1").error).toBe(dep1.error);
    });

    test("존재하는 데브 디펜던시의 에러 변경", () => {
      // given
      const prevState = {
        devDependencies: new Map([["dep1", makeDependency("dep1")]])
      };

      // when
      const action = changeError(["devDependencies", "dep1"], error);
      const nextState = nextPackageReducer(prevState, action);

      // then
      expect(nextState.devDependencies.get("dep1").error).toBe(error);
    });

    test("존재하지 않는 데브 디펜던시의 에러 변경", () => {
      // given
      const dep1 = makeDependency("dep1");
      const prevState = {
        devDependencies: new Map([["dep1", dep1]])
      };

      // when
      const action = changeError(["devDependencies", "dep2"], error);
      const nextState = nextPackageReducer(prevState, action);

      // then
      expect(nextState.devDependencies.get("dep1").error).toBe(dep1.error);
    });
  });
});
