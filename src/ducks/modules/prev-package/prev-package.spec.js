import prevPackageReducer, { changePackageString } from "./prev-package";

describe("prev-package reducer", () => {
  test("init", () => {
    // given
    // 초기 상태에서
    const prevState = {};

    // when
    // 빈 액션을 넘겨주면
    const action = {};
    const nextState = prevPackageReducer(prevState, action);

    // then
    // 초기 상태를 그대로 리턴한다.
    expect(nextState).toBe(prevState);
  });

  describe("prev-package/CHANGE_PACKAGE_STRING action", () => {
    test("package.json 문자열을 입력", () => {
      // given
      // 특정 상태에서
      const prevState = {
        string: ""
      };

      // when
      // package.json 문자열을 입력하면
      const packageJsonObject = {
        name: "npm-package-update-checker",
        version: "0.1.0"
      };
      const packageJsonString = JSON.stringify(packageJsonObject);
      const action = changePackageString(packageJsonString);
      const nextState = prevPackageReducer(prevState, action);

      expect(nextState.string).toBe(packageJsonString);
    });
  });
});