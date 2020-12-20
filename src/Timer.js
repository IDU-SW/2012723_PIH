import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

export function Timer({SendTime}) {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const record = useRef();
  record.current = timeElapsed;
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(timeElapsed => timeElapsed + 30);
    }, 30);
    return () => {
      SendTime(record.current)
      clearInterval(timer);
    };
  }, []);
  return (
    <Container>
      <Front>{Math.floor(timeElapsed / 1000)}:</Front>
      <Back>{(timeElapsed % 1000) / 10}</Back>
    </Container>
  );
}

export function TimerCountDown({min, second, EndEvent}) {
  const [minutes, setMinutes] = useState(min);
  const [seconds, setSeconds] = useState(second);
  const [millisecond, setMillisecond] = useState(0);

  useEffect(() => {
    const countdown = setInterval(() => {
      if(parseInt(millisecond) > 0)
      {
        setMillisecond(parseInt(millisecond) - 30);
      }
      else
      {
        setMillisecond(parseInt(millisecond) + 1000);
        if (parseInt(seconds) > 0) {
          setSeconds(parseInt(seconds) - 1);
        }
        if (parseInt(seconds) === 0) {
          if (parseInt(minutes) === 0) {
            EndEvent();
            clearInterval(countdown);
          } else {
            setMinutes(parseInt(minutes) - 1);
            setSeconds(59);
          }
        }
      }
    }, 30);
    return () => clearInterval(countdown);
  }, [minutes, seconds, millisecond]);

  return (
    <Container>
        <Front>
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}:
        </Front>
        <Back>{millisecond < 0 ? 0 : (millisecond % 1000) / 10}</Back>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 30px;
  width: 100px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`;

const Front = styled.div`
align-items: center;
  text-align: right;
`;

const Back = styled.div`
  width: 1em;
`;