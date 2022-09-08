import React, { useEffect } from 'react'
import Player from './player/Player'
import { PlayerObj } from '../game-board/GameBoard'
import './Players.css'

type Props = {
    players: { player: PlayerObj, opponent: PlayerObj }
}

const playerType = { player: 'player', opponent: 'opponent' };

export default function Players(props: Props) {

    return (
        <div className='players'>
            {Object.values(props.players).map((player, index) => {
                return <Player key={index}
                    player={player}
                    type={Object.values(playerType)[index]}
                    isRtl={!index} />
            })}
        </div>
    )
}