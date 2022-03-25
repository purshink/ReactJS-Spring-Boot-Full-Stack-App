import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

const BounceAnimation = keyframes`
  0% { margin-bottom: 0; }
  50% { margin-bottom: 15px }
  100% { margin-bottom: 0 }
`;
const DotWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  height: 30px;
`;
const Dot = styled.div`
  background-color: rgb(135, 158, 187);
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin: auto 5px;
  /* Animation */
  animation: ${BounceAnimation} 0.5s linear infinite;
  animation-delay: ${(props) => props.delay};
`;
class LoadingDotsDark extends Component {
  render() {
    return (
      <DotWrapper>
        <Dot delay="14s" />
        <Dot delay=".16s" />
        <Dot delay=".20s" />
      </DotWrapper>
    );
  }
}

export default LoadingDotsDark;
