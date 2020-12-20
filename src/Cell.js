import React from "react";
import styled from "styled-components";

export function Cell({ num, handleClick }) {
  return (
    <Container onClick={() => handleClick(num)}>
      {num !== 0 ? num : null}
    </Container>
  );
}

export function CellHundred({ num, handleClick }) {
  return (
    <ContainerHundred onClick={() => handleClick(num)}>
      {num !== 0 ? num : null}
    </ContainerHundred>
  );
}

const Container = styled.div`
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`;

const ContainerHundred = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`;