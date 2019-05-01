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
        packageString: ""
      };

      // when
      // package.json 문자열을 입력하면
      const packageObject = {
        name: "npm-package-update-checker",
        version: "0.1.0"
      };
      const packageString = JSON.stringify(packageObject);
      const action = changePackageString(packageString);
      const nextState = prevPackageReducer(prevState, action);

      expect(nextState.packageString).toBe(packageString);
    });
  });
});
