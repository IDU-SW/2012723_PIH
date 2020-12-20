import React, { useState, useEffect } from "react";
import {Board} from "./Board";
import {TimerCountDown} from "./Timer";
import {GoMain} from "./GoMain";
import {Container, ContainerRow, Title, StartButton} from "./Style";

let array = [];
for (let i = 1; i <= 25; i++) {
  array.push(i);
}
let isHomeClick = false;
let record = 0;

export function TimeAttack({userName}) {
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
        num < 26 ? num + 25 : 
            num < 51 ? num + 50 :
                num < 76 ? num + 75 : 0,
        ...numbers.slice(index + 1)
      ]);
      setCurrent(current => current + 1);
      record = record + 1;
    }
  };
  const startGame = () => {
    record = 0;
    setNumbers(shuffleArray(array));
    setCurrent(1);
    setGameFlag(true);
    isHomeClick = false;
  };
  const endGame = () => {
    setGameFlag(false);
  };

  function handleHomeClick(isClick) {
    console.log('success works :', isClick);
    isHomeClick = true;
  }

  function handleCheckRecord() {
    console.log('record :', isHomeClick);
    if(isHomeClick === false)
    {
        alert("Your Record :" + record);
    }
    isHomeClick = false;
    endGame();
  }

  return (
    <div>
    <Container>
      <Title>202012723 TimeAttack {userName}</Title>
      <Board numbers={numbers} handleClick={handleClick}></Board>
      <ContainerRow>
      <GoMain ClickCheck={(isClick) => handleHomeClick(isClick)} />
      {gameFlag ? (
        <TimerCountDown min={0} second={30} EndEvent={() => handleCheckRecord()}/>
      ) : (
        <StartButton onClick={startGame} primary="true">start</StartButton>
      )}
      </ContainerRow>
    </Container>
    </div>
  );

}

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};