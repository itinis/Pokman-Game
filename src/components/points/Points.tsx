import React, { useEffect, useState } from 'react'
import { PlayerObj } from '../game-board/GameBoard';
import './Points.css'

type Props = {
  players: { player: PlayerObj, opponent: PlayerObj },
  toggleRandomNewState: boolean,
  updatePoints: (dice1: number, dice2: number, 
      playerWithExtra: number, isInitial?: boolean) => void
}

export default function Points(props: Props) {

  const [dice1, setDice1] = useState(0);
  const [dice2, setDice2] = useState(0);
  const [isInitial, setIsInitial] = useState(true);
  const [playerWithExtra, setPlayerWithExtra] = useState(0);

  useEffect(() => {
    doStep();
  }, []);

  useEffect(() => {
    props.updatePoints(dice1, dice2, playerWithExtra, isInitial);
    if (dice1 == 6) setExtraTime(1);
    if (dice2 == 6) setExtraTime(2);
  }, [dice1, dice2]);

  useEffect(() => {
    setIsInitial(true);
    doStep();
  }, [props.toggleRandomNewState]);

  const handleDice1 = () => setDice1(getRandomNumber());
  const handleDice2 = () => setDice2(getRandomNumber());

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 6) + 1;
  };

  const doStep = () => {
    setPlayerWithExtra(0);
    handleDice1();
    handleDice2();
  };

  const attacking = () => {
    if (isInitial) setIsInitial(false);
    doStep();
  };

  const setExtraTime = (player: number) => {
    setTimeout(() => {
      setPlayerWithExtra(player);
      (player == 1) ? handleDice1() : handleDice2();
    }, 500);
  };

  return (
    <div className='points'>

      <div className='wrap-dice'>
        <div className='dice'>
          <p className={dice1 == 6 ? 'extra' : ''}>{dice1}</p>
        </div>
        <div className='dice'>
          <p className={dice2 == 6 ? 'extra' : ''}>{dice2}</p>
        </div>
      </div>

      <div className='wrap-result'>
        <p>You hit for <strong>{dice1}</strong></p>
        <p>Your opponent hit for <strong>{dice2}</strong></p>
      </div>

      <button id='attack-button' disabled={dice1 == 6 || dice2 == 6} 
        onClick={() => attacking()}>Attack!</button>

    </div>
  )
}