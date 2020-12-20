import React, {useState, useEffect} from 'react';
import sortBy from 'lodash/sortBy'
import {Container, BigTitle} from "./Style";
import { GoMain } from "./GoMain";

export function RankingPage({db, userName}) {
    let [rankData, setRankData] = useState([]);

    useEffect(() => {
        console.log('첫 렌더링에만 호출')
        const fetchData = async () => {
            const ranking = await db.collection('PIHOneToFifty').get();
            let items = ranking.docs.map( item => item.data() );
            items = sortBy(items, "score");
            setRankData(items);
        }
        fetchData();
        
      }, [])

  return (
      <Container>
        <BigTitle>202012723 RankingPage {userName}</BigTitle>
            <ul>
            { rankData.map( item => (
                <li>{item.name} - {item.score}</li>
            ))}
            </ul>
        <GoMain />
      </Container>
  );
}