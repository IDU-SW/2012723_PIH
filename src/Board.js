import React from "react";
import styled from "styled-components";
import {Cell, CellHundred} from "./Cell";

export function Board({ numbers, handleClick }) {
  return (
    <Container>
      {numbers.map((num, index) => (
        <Cell num={num} key={index} handleClick={handleClick}></Cell>
      ))}
    </Container>
  );
}

export function BoardHundred({ numbers, handleClick }) {
  return (
    <ContainerHundred>
      {numbers.map((num, index) => (
        <CellHundred num={num} key={index} handleClick={handleClick}></CellHundred>
      ))}
    </ContainerHundred>
  );
}

const Container = styled.div`
  width: 400px;
  height: 400px;
  border: 1px solid blue;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
`;

const ContainerHundred = styled.div`
  width: 500px;
  height: 500px;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
`;
