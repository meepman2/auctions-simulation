import React from 'react';
import { useTimer } from 'react-timer-hook';
import Button from '@material-ui/core/Button';

function AuctionTimer({ expiryTimestamp }) {
  const {
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });


  return (
    <div style={{textAlign: 'center', border: '2px solid #cccccc', marginTop: '20px', padding: '10px'}}>
      <div style={{fontSize: '50px'}}>
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <p>{isRunning ? 'Running' : 'Not running'}</p>
      <Button variant="contained" style={{backgroundColor: 'green', color: '#ffffff', marginRight: '5px'}} onClick={start}>Start</Button>
      <Button variant="contained" color="secondary" onClick={pause} style={{color: '#ffffff', marginRight: '5px'}}>Pause</Button>
      <Button variant="contained" style={{backgroundColor: '#404549', color: '#ffffff', marginRight: '5px'}} onClick={() => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + 150);
        restart(time)
      }}>Restart</Button>
    </div>
  );
}

export default AuctionTimer;