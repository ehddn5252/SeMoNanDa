import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";

const Timer = forwardRef((props,ref) => {
  const [minutes, setMinutes] = useState(parseInt(0));
  const [seconds, setSeconds] = useState(parseInt(0));

  function resetTimer()  {
    setMinutes(3)
    setSeconds(0)
  }

  function endTimer() {
    setMinutes(0)
    setSeconds(0)
  }

  useImperativeHandle(ref, () => ({
    resetTimer,
    endTimer,
  }))

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
          clearInterval(countdown);
          props.timeOver()
        } else {
          setMinutes(parseInt(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds, props]);
  
  return (
    <div className="timer">
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
});

export default Timer;