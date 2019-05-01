import { makeDependency } from "../../../entities";

import nextPackageReducer, {
  changePackageObject,
  changeDependencies,
  changeDevDependencies,
  changeError,
  changeDependenciesError,
  changeDevDependenciesError,
  changeDependenciesLoading,
  changeDevDependenciesLoading,
  changeDependenciesNextVersion
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

  describe("next-package/CHANGE_ERROR action", () => {
    test("전역 에러 변경", () => {
      // given
      const prevState = {
        error: null
      };

      // when
      const error = new Error("TEST");
      const action = changeError(error);
      const nextState = nextPackageReducer(prevState, action);

      // then
      expect(nextState.error).toBe(error);
    });
  });

  describe("next-package/CHANGE_DEPENDENCIES_ERROR action", () => {
    const dep1 = makeDependency("dep1");
    const error = new Error("TEST");

    test("존재하는 디펜던시의 에러 상태 변경 (null -> error)", () => {
      // given
      const prevState = {
        dependencies: new Map([["dep1", { ...dep1, error: null }]])
      };

      // when
      const action = changeDependenciesError("dep1", error);
      const nextState = nextPackageReducer(prevState, action);

      // then
      expect(nextState.dependencies.get("dep1").error).toBe(error);
    });

    test("존재하는 디펜던시의 에러 상태 변경 (error -> null)", () => {
      // given
      const prevState = {
        dependencies: new Map([["dep1", { ...dep1, error }]])
      };

      // when
      const action = changeDependenciesError("dep1", null);
      const nextState = nextPackageReducer(prevState, action);

      // then
      expect(nextState.dependencies.get("dep1").error).toBe(null);
    });

    test("존재하지 않는 디펜던시의 에러 상태 변경 (null -> error)", () => {
      // given
      const prevState = {
        dependencies: new Map([["dep1", { ...dep1, error: null }]])
      };

      // when
      const action = changeDependenciesError("dep2", error);
      const nextState = nextPackageReducer(prevState, action);

      // then
      expect(nextState.dependencies.get("dep1").error).toBe(null);
    });

    test("존재하지 않는 디펜던시의 에러 상태 변경 (error -> null)", () => {
      // given
      const prevState = {
        dependencies: new Map([["dep1", { ...dep1, error }]])
      };

      // when
      const action = changeDependenciesError("dep2", null);
      const nextState = nextPackageReducer(prevState, action);

      // then
      expect(nextState.dependencies.get("dep1").error).toBe(error);
    });
  });

  describe("next-package/CHANGE_DEV_DEPENDENCIES_ERROR action", () => {
    const dep1 = makeDependency("dep1");
    const error = new Error("TEST");

    test("존재하는 데브 디펜던시의 에러 상태 변경 (null -> error)", () => {
      // given
      const prevState = {
        devDependencies: new Map([["dep1", { ...dep1, error: null }]])
      };

      // when
      const action = changeDevDependenciesError("dep1", error);
      const nextState = nextPackageReducer(prevState, action);

      // then
      expect(nextState.devDependencies.get("dep1").error).toBe(error);
    });

    test("존재하는 데브 디펜던시의 에러 상태 변경 (error -> null)", () => {
      // given
      const prevState = {
        devDependencies: new Map([["dep1", { ...dep1, error }]])
      };

      // when
      const action = changeDevDependenciesError("dep1", null);
      const nextState = nextPackageReducer(prevState, action);

      // then
      expect(nextState.devDependencies.get("dep1").error).toBe(null);
    });

    test("존재하지 않는 데브 디펜던시의 에러 상태 변경 (null -> error)", () => {
      // given
      const prevState = {
        devDependencies: new Map([["dep1", { ...dep1, error: null }]])
      };

      // when
      const action = changeDevDependenciesError("dep2", error);
      const nextState = nextPackageReducer(prevState, action);

      // then
      expect(nextState.devDependencies.get("dep1").error).toBe(null);
    });

    test("존재하지 않는 데브 디펜던시의 에러 상태 변경 (error -> null)", () => {
      // given
      const prevState = {
        devDependencies: new Map([["dep1", { ...dep1, error }]])
      };

      // when
      const action = changeDevDependenciesError("dep2", null);
      const nextState = nextPackageReducer(prevState, action);

      // then
      expect(nextState.devDependencies.get("dep1").error).toBe(error);
    });
  });

  describe("next-package/CHANGE_DEPENDENCIES_LOADING action", () => {
    const dep1 = makeDependency("dep1");

    test("존재하는 디펜던시의 로딩 상태 변경 (false -> true)", () => {
      // given
      const prevState = {
        dependencies: new Map([["dep1", { ...dep1, loading: false }]])
      };

      // when
      const action = changeDependenciesLoading("dep1", true);
      const nextState = nextPackageReducer(prevState, action);

      // then
      expect(nextState.dependencies.get("dep1").loading).toBe(true);
    });

    test("존재하는 디펜던시의 로딩 상태 변경 (true -> false)", () => {
      // given
      const prevState = {
        dependencies: new Map([["dep1", { ...dep1, loading: true }]])
      };

      // when
      const action = changeDependenciesLoading("dep1", false);
      const nextState = nextPackageReducer(prevState, action);

      // then
      expect(nextState.dependencies.get("dep1").loading).toBe(false);
    });

    test("존재하지 않는 디펜던시의 로딩 상태 변경 (false -> true)", () => {
      // given
      const prevState = {
        dependencies: new Map([["dep1", { ...dep1, loading: false }]])
      };

      // when
      const action = changeDependenciesLoading("dep2", true);
      const nextState = nextPackageReducer(prevState, action);

      // then
      expect(nextState.dependencies.get("dep1").loading).toBe(false);
    });

    test("존재하지 않는 디펜던시의 로딩 상태 변경 (true -> false)", () => {
      // given
      const prevState = {
        dependencies: new Map([["dep1", { ...dep1, loading: true }]])
      };

      // when
      const action = changeDependenciesLoading("dep2", false);
      const nextState = nextPackageReducer(prevState, action);

      // then
      expect(nextState.dependencies.get("dep1").loading).toBe(true);
    });
  });

  describe("next-package/CHANGE_DEV_DEPENDENCIES_LOADING action", () => {
    const dep1 = makeDependency("dep1");

    test("존재하는 데브 디펜던시의 로딩 상태 변경 (false -> true)", () => {
      // given
      const prevState = {
        devDependencies: new Map([["dep1", { ...dep1, loading: false }]])
      };

      // when
      const action = changeDevDependenciesLoading("dep1", true);
      const nextState = nextPackageReducer(prevState, action);

      // then
      expect(nextState.devDependencies.get("dep1").loading).toBe(true);
    });

    test("존재하는 데브 디펜던시의 로딩 상태 변경 (true -> false)", () => {
      // given
      const prevState = {
        devDependencies: new Map([["dep1", { ...dep1, loading: true }]])
      };

      // when
      const action = changeDevDependenciesLoading("dep1", false);
      const nextState = nextPackageReducer(prevState, action);

      // then
      expect(nextState.devDependencies.get("dep1").loading).toBe(false);
    });

    test("존재하지 않는 데브 디펜던시의 로딩 상태 변경 (false -> true)", () => {
      // given
      const prevState = {
        devDependencies: new Map([["dep1", { ...dep1, loading: false }]])
      };

      // when
      const action = changeDevDependenciesLoading("dep2", true);
      const nextState = nextPackageReducer(prevState, action);

      // then
      expect(nextState.devDependencies.get("dep1").loading).toBe(false);
    });

    test("존재하지 않는 데브 디펜던시의 로딩 상태 변경 (true -> false)", () => {
      // given
      const prevState = {
        devDependencies: new Map([["dep1", { ...dep1, loading: true }]])
      };

      // when
      const action = changeDevDependenciesLoading("dep2", false);
      const nextState = nextPackageReducer(prevState, action);

      // then
      expect(nextState.devDependencies.get("dep1").loading).toBe(true);
    });
  });

  describe("next-package/CHANGE_DEPENDENCIES_NEXT_VERSION action", () => {
    const dep1 = makeDependency("dep1", "1", "2");

    test("존재하는 디펜던시의 nextVerion을 변경", () => {
      // given
      const prevState = {
        dependencies: new Map([["dep1", dep1]])
      };

      // when
      const action = changeDependenciesNextVersion("dep1", "3");
      const nextState = nextPackageReducer(prevState, action);

      // then
      expect(nextState.dependencies.get("dep1").nextVersion).toBe("3");
    });

    test("존재하지 않는 디펜던시의 nextVerion을 변경", () => {
      // given
      const prevState = {
        dependencies: new Map([["dep1", dep1]])
      };

      // when
      const action = changeDependenciesNextVersion("dep2", "3");
      const nextState = nextPackageReducer(prevState, action);

      // then
      expect(nextState.dependencies.get("dep1").nextVersion).toBe("2");
    });
  });
});
