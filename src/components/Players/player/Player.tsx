import React, { useEffect, useState } from 'react'
import { ProgressBar } from 'react-bootstrap'
import { PlayerObj } from '../../game-board/GameBoard'
import './Player.css'

type Props = {
  player: PlayerObj,
  type: string,
  isRtl: boolean
}

export default function Player(props: Props) {

  const [src, setSrc]: any = useState(null);
  const [points, setPoints] = useState(0);
  const [currentPoints, setCurrentPoints] = useState(0);

  useEffect(() => {
    setPoints(props.player.points);
  }, [props.player.points]);
  
  useEffect(() => {
    setCurrentPoints(props.player.lastDiceRoll);
  }, [props.player.lastDiceRoll]);

  useEffect(() => {
    setSrc(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.player.id}.png`);
  }, [props.player.id]);

  return (
    <div className={'player ' + (props.isRtl ? 'rightPlayer' : 'leftPlayer')}>
      <h4 className='type'>{props.type}</h4>
      <div className='wrap-progress-bar'>
        <ProgressBar now={points} />
        <p>{points} / 100</p>
      </div>
      <div className='wrap-pokemon'>
        <img src={src} />
        <p className='name'>{props.player.name}</p>
      </div>
    </div>
  )
}