import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  width: 100%:
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 24rem;

  padding: 0;
  margin: 0;
  box-sizing: border-box;
`;

const PrevPackage = ({ onClickCheck }) => {
  const [prevPackageString, setPrevPackageString] = useState("");

  return (
    <Container>
      <div>prev package.json</div>
      <div>
        <button type="button" onClick={() => onClickCheck(prevPackageString)}>
          check
        </button>
      </div>
      <TextArea
        value={prevPackageString}
        onChange={({ target: { value } }) => setPrevPackageString(value)}
      />
    </Container>
  );
};

PrevPackage.defaultProps = {
  onClickCheck: prevPackageString => {}
};

PrevPackage.propTypes = {
  onClickCheck: PropTypes.func
};

export default PrevPackage;
