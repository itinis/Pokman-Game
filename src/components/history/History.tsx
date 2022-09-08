import React, { useEffect, useState } from 'react'
import './History.css'

type Props = {
    history: boolean[]
}

export default function History(props: Props) {

    const [wonBattlesCnt, setWonBattlesCnt] = useState(0);
    const [lostBattlesCnt, setLostBattlesCnt] = useState(0);

    useEffect(() => {
        const wonCnt = props.history.filter(current => current).length;
        setWonBattlesCnt(wonCnt);
        setLostBattlesCnt(props.history.length - wonCnt);
    }, [props.history]);
    return (
        <div className='history'>
            <h5>Your History:</h5>
            <p>{wonBattlesCnt} won battles and {lostBattlesCnt} lost battles.</p>
        </div>
    )
}