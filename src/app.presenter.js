import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import * as F from "fxjs2";
import { L } from "fxjs2";

const Container = styled.div`
  width: 100%;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 24rem;

  padding: 0;
  margin: 0;
  box-sizing: border-box;
`;

const App = ({
  nextPackageObject,
  nextDependencies,
  nextDevDependencies,
  onClickCheck
}) => {
  const [prevPackageJsonString, setPrevPackageJsonString] = useState("");
  const nextPackageJsonString = useMemo(() => {
    if (!nextPackageObject || typeof nextPackageObject !== "object") return "";

    const dependencies = F.go(
      nextDependencies,
      L.map(([name, { prevVersion, nextVersion }]) => ({
        name,
        version: nextVersion || prevVersion
      })),
      iter =>
        F.reduce(
          (dependencies, dependency) => {
            dependencies[dependency.name] = dependency.version;
            return dependencies;
          },
          {},
          iter
        )
    );
    const devDependencies = F.go(
      nextDevDependencies,
      L.map(([name, { prevVersion, nextVersion }]) => ({
        name,
        version: nextVersion || prevVersion
      })),
      iter =>
        F.reduce(
          (devDependencies, devDependency) => {
            devDependencies[devDependency.name] = devDependency.version;
            return devDependencies;
          },
          {},
          iter
        )
    );

    const packageObject = {
      ...nextPackageObject,
      dependencies,
      devDependencies
    };

    return JSON.stringify(packageObject, null, 2);
  }, [nextPackageObject, nextDependencies, nextDevDependencies]);

  return (
    <Container>
      <div>prev package.json</div>
      <TextArea
        value={prevPackageJsonString}
        onChange={({ target: { value } }) => setPrevPackageJsonString(value)}
      />
      <div>
        <button
          type="button"
          onClick={() => onClickCheck(prevPackageJsonString)}
        >
          check
        </button>
      </div>
      <div>next package.json</div>
      <TextArea value={nextPackageJsonString} readOnly />
    </Container>
  );
};

App.defaultProps = {
  nextPackageObject: {},
  nextDependencies: new Map(),
  nextDevDependencies: new Map(),
  onClickCheck: prevPackageJsonString => {}
};

App.propTypes = {
  nextPackageObject: PropTypes.object,
  nextDependencies: PropTypes.instanceOf(Map),
  nextDevDependencies: PropTypes.instanceOf(Map),
  onClickCheck: PropTypes.func
};

export default App;
