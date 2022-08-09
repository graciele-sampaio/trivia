import React, { useState, useEffect } from 'react';

const Timer = () => {
  const waitTime = 30;
  const [timer, setTimer] = useState(waitTime);
  const [timerOn, setTimerOn] = useState(true);

  useEffect(() => {
    const oneSecond = 1000;
    let interval = null;
    let passedTime = 0;
    if (timerOn) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - interval);
        passedTime += 1;
        if (passedTime === waitTime) {
          setTimerOn(false);
          // Lógica
          console.log('Lógica Aqui!');
        }
      }, oneSecond);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerOn]);

  return <h2>{timer}</h2>;
};

export default Timer;
