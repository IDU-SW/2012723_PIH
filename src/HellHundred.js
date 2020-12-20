import React, { useState } from "react";
import {BoardHundred} from "./Board";
import {Timer} from "./Timer";
import {GoMain} from "./GoMain";
import {StartButton, ContainerRow, Container, Title} from "./Style";

let array = [];
for (let i = 1; i <= 100; i++) {
  array.push(i);
}
let isHomeClick = false;

export function HellHundred({userName}) {
  const [numbers, setNumbers] = useState(array);
  const [gameFlag, setGameFlag] = useState(false);
  const [current, setCurrent] = useState(1);
  const handleClick = num => {
    if (num === current && gameFlag) {
      if (num === 100) {
        console.log("Success");
        endGame();
      }
      const index = numbers.indexOf(num);
      setNumbers(numbers => [
        ...numbers.slice(0, index),
        0,
        ...numbers.slice(index + 1)
      ]);
      setCurrent(current => current + 1);
    }
  };
  const startGame = () => {
    setNumbers(shuffleArray(array));
    setCurrent(1);
    setGameFlag(true);
    isHomeClick = false;
  };
  const endGame = () => {
    setGameFlag(false);
  };

  function handleHomeClick(isClick) {
    isHomeClick = true;
  }

  function handleCheckRecord(Record) {
    console.log('record :', Record, isHomeClick);
    if(isHomeClick === false)
    {
      alert("Your Record :" + Record / 1000);
    }
    isHomeClick = false;
  }

  return (
    <Container>
      <Title>202012723 HellHundred {userName}</Title>
      <BoardHundred numbers={numbers} handleClick={handleClick}></BoardHundred>
      <ContainerRow>
        <GoMain ClickCheck={(isClick) => handleHomeClick(isClick)} />
        {gameFlag ? (
          <Timer SendTime={(Record) => handleCheckRecord(Record)}/>
        ) : (
          <StartButton onClick={startGame} primary="true">start</StartButton>
        )}
      </ContainerRow>
    </Container>
  );
}

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};