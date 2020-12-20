import styled from "styled-components";

export const Container = styled.div`
  width: 600px;
  height: 800px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ContainerRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

export const BigTitle = styled.h1`
  font-size: 3em;
  text-align: center;
  color: palevioletred;
`;

export const StartButton = styled.button`
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};

  font-size: 2em;
  margin: 1.5em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  width: 150px;
`;

export const LinkButton = styled.button`
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};

  font-size: 2em;
  margin: 1.5em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  width: 150px;
`;