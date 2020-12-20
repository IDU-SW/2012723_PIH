import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import _ from 'lodash';
import styled from "styled-components";
import {Container, BigTitle} from "./Style";

export function MainPage({userName, MainChangeName}) {
  let [name, setName] = useState(userName);
  const [isChangeName, setIsChangeName] = useState(false);

  const history = useHistory();
  const GoOneToFifty = () => {
    history.push("/pihGame");
  };
  const GoHellHundred = () => {
    history.push("/pihGameHundred");
  };
  const GoTimeAttack = () => {
    history.push("/pihTimeAttack");
  };
  const GoRanking = () => {
    history.push("/pihRanking");
  };

  function handleNameChange(newName, isChange) {
    console.log('newName :', newName);
    if(isChange)
    {
      setName(newName)
      MainChangeName(newName)
    }
    setIsChangeName(false);   
}

  return (
      <Container>
        <BigTitle>PIH Games! Hello {name}</BigTitle>
        <LinkButton onClick={GoOneToFifty}>Play OneToFifty</LinkButton>
        <LinkButton onClick={GoHellHundred}>Play HellHundred</LinkButton>
        <LinkButton onClick={GoTimeAttack}>Play TimeAttack</LinkButton>
        <LinkButton onClick={GoRanking}>RankingPage</LinkButton>
        {isChangeName ? (
          <ChangeNameForm changeName={handleNameChange}></ChangeNameForm>
        ) : (
          <SmallButton onClick={()=>setIsChangeName(true)}>이름 변경</SmallButton>
        )}
      </Container>
  );
}

function ChangeNameForm({changeName}) {
  let [newName, setNewName] = useState('');
  return (
      <div>
          <input placeholder='변경할 이름을 입력하세요.' onChange={e => setNewName(e.target.value)} />
          <SmallButton onClick={()=>changeName(newName, true)}>변경</SmallButton>
          <SmallButton onClick={()=>changeName(newName, false)}>취소</SmallButton>
      </div>
  )
}

const LinkButton = styled.button`
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};

  font-size: 2em;
  margin: 1.5em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const SmallButton = styled.button`
  background: "white";
  color: "palevioletred";

  font-size: 1em;
  margin: 1.5em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;