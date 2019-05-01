import nextPackageReducer, { changePackageObject } from "./next-package";

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
});
