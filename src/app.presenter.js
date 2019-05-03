import React from "react";
import styled from "styled-components";

import NextPackage from "./components/organisms/next-package/next-package";
import PrevPackage from "./components/organisms/prev-package/prev-package";

const Container = styled.div`
  width: 100%;
`;

const App = () => (
  <Container>
    <PrevPackage />
    <NextPackage />
  </Container>
);

export default App;
