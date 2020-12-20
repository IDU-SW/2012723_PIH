import React, {useState, useEffect} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {OneToFifty} from "./OneToFifty";
import {MainPage} from "./MainPage";
import {HellHundred} from "./HellHundred";
import {TimeAttack} from "./TimeAttack";
import { RankingPage } from "./RankingPage";

import firebase from "firebase/app";
//import 'firebase/firebase-firestore';
import "firebase/firestore";
import {firebaseConfig} from "./firebaseConfig";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

function App() {
    let [userName, setUserName] = useState('PIH');
    function handleChangeName(newName) {
        console.log('App newName :', newName);
        setUserName(newName);   
    }

  return(
      <BrowserRouter>
      <Switch>
        <Route path="/pihMain" exact={true}>
            <MainPage userName={userName} MainChangeName={(newName) => handleChangeName(newName)}/>
        </Route>
        <Route path="/pihGame" exact={true}>
            <OneToFifty db={db} userName={userName}/>
        </Route>
        <Route path="/pihGameHundred" exact={true}>
            <HellHundred userName={userName}/>
        </Route>
        <Route path="/pihTimeAttack" exact={true}>
            <TimeAttack userName={userName}/>
        </Route>
        <Route path="/pihRanking" exact={true}>
            <RankingPage db={db} userName={userName}/>
        </Route>
        <Route path="*">
                <Redirect to="/pihMain" />
        </Route>
      </Switch>
      </BrowserRouter>
  );
}

export default App;