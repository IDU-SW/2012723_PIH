import React, { useState, useEffect } from "react";
import {Board} from "./Board";
import {Timer} from "./Timer";
import {GoMain} from "./GoMain";
import {Container, ContainerRow, Title, StartButton} from "./Style";
import sortBy from 'lodash/sortBy'

let array = [];
for (let i = 1; i <= 25; i++) {
  array.push(i);
}
let isHomeClick = false;

export function OneToFifty({db, userName}) {
  const [numbers, setNumbers] = useState(array);
  const [gameFlag, setGameFlag] = useState(false);
  const [current, setCurrent] = useState(1);

  let [rankData, setRankData] = useState([]);
  const fetchData = async () => {
    const ranking = await db.collection('PIHOneToFifty').get();
    let items = ranking.docs.map( item => item.data() );
    items = sortBy(items, "score");
    setRankData(items);
  }
  useEffect(() => {
    console.log('첫 렌더링에만 호출')
    fetchData();
  }, [])

  const handleClick = num => {
    if (num === current && gameFlag) {
      if (num === 50) {
        console.log("Success");
        endGame();
      }
      const index = numbers.indexOf(num);
      setNumbers(numbers => [
        ...numbers.slice(0, index),
        num < 26 ? num + 25 : 0,
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

  function DeleteRanking(score, myScore) {
    let rankingCol = db.collection('PIHOneToFifty');
          let query = rankingCol.where('score', '==', score).get()
                                .then(snapshot => {
                                  if (snapshot.empty) {
                                    console.log('No matching documents.');
                                    return;
                                  }
  
                                  snapshot.forEach(doc => {
                                    console.log("삭제", doc.id, '=>', doc.data());
                                    rankingCol.doc(doc.id).delete().then(() => {
                                      rankingCol.add({name:userName, score:myScore});
                                      alert("Your Record :" + myScore);
                                    })
                                  });
                                })
                                .catch(err => {
                                  console.log('Error getting documents', err);
                                });
  }

  function handleHomeClick(isClick) {
    console.log('success works :', isClick);
    isHomeClick = true;
  }

  function handleCheckRecord(Record) {
    console.log('record :', Record, isHomeClick);
    if(isHomeClick === false)
    {
      let myScore = Record / 1000;
      if(rankData.length >= 10)
      {
        if(rankData[9].score > myScore)
        {
          // 기존 상태값 복제
          let newData = [...rankData];
          let addData = {name: userName, score: myScore};
          newData.push(addData);
          newData = newData.filter(item => item.score !== rankData[9].score)
          newData = sortBy(newData, "score");
          setRankData(newData);
          console.log("new RankingData : " + newData);
          
          DeleteRanking(rankData[9].score, myScore)
        }
        else
          alert("Your Record :" + myScore);
      }
      else
      {
        db.collection('PIHOneToFifty').add({name:userName, score:myScore});
        alert("Your Record :" + myScore);
      }
    }
    isHomeClick = false;
  }

  return (
    <div>
    <Container>
      <Title>202012723 OneToFifty {userName}</Title>
      <Board numbers={numbers} handleClick={handleClick}></Board>
      <ContainerRow>
      <GoMain ClickCheck={(isClick) => handleHomeClick(isClick)} />
      {gameFlag ? (
        <Timer SendTime={(Record) => handleCheckRecord(Record)}/>
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