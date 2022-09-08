import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import History from '../history/History'
import Players from '../Players/Players'
import Points from '../points/Points'
import './GameBoard.css'

type Props = {}

export type PlayerObj = {
    id: number,
    name: string,
    lastDiceRoll: number,
    points: number,
    history: boolean[]
}

export default function GameBoard({ }: Props) {

    const pokemons = [
        { id: 4, name: "Charmander" },
        { id: 7, name: "Squirtle" },
        { id: 11, name: "Metapod" },
        { id: 12, name: "Butterfree" },
        { id: 25, name: "Pikachu" },
        { id: 39, name: "Jigglypuff" },
        { id: 94, name: "Gengar" },
        { id: 133, name: "Eevee" }
    ];

    const defaultPlayer: PlayerObj = { id: 0, name: '', lastDiceRoll: 1, points: 0, history: [] };
    const [players, setPlayers] = useState({player: defaultPlayer, opponent: defaultPlayer});
    const [showModal, setShowModal] = useState(false);
    const [toggleRandomNewState, setToggleRandomNewState] = useState(true);
    const [isWin, setIsWin] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleRandomNewState = () => setToggleRandomNewState(!toggleRandomNewState);

    useEffect(() => {
        setRandomPlayers();
    }, []);

    const updatePlayers = (player: PlayerObj, opponent: PlayerObj) => {
        setPlayers({
            player: { ...player }, opponent: { ...opponent }
        });
    }

    const setRandomPlayers = () => {
        let first = getRandomPlayer();
        let second = getRandomPlayer();
        while(second.id == first.id) {
            second = getRandomPlayer();
        }
        updatePlayers(first, second);
    }

    const getRandomPlayer = (): PlayerObj => {
        let randomIndex = Math.floor(Math.random() * pokemons.length);
        return { ...pokemons[randomIndex], lastDiceRoll: 1, points: 0, history: [] };
    };

    const calculatePoints = (points: number, dice: number, otherDice: number, isInitial: boolean) => {
        return points + dice - (isInitial ? 0 : otherDice);
    }

    const calculatePointsWhenExtra = (points: number, dice: number) => {
        return points + dice;
    }

    const updatePoints = (dice1: number, dice2: number, playerWithExtra: number = 0,
        isInitial: boolean = false) => {
        if (players != null) {
            let points1 = 0;
            let points2 = 0;
            if (!playerWithExtra) {
                points1 = calculatePoints(players.player.points, dice1, dice2, isInitial);
                points2 = calculatePoints(players.opponent.points, dice2, dice1, isInitial);
            }
            else {
                playerWithExtra == 1 ?
                    points1 = calculatePointsWhenExtra(players.player.points, dice1) :
                    points2 = calculatePointsWhenExtra(players.opponent.points, dice2);
            }
            setPlayers({
                player: { ...players.player, lastDiceRoll: dice1, points: points1 },
                opponent: { ...players.opponent, lastDiceRoll: dice2, points: points2 }
            })
            if (points1 < 0 || points2 == 100) {
                setIsWin(false);
                setShowModal(true);
            }
            else if (points2 < 0 || points1 == 100) {
                setIsWin(true);
                setShowModal(true);
            }
        }
    }

    const newPokemonSelected = () => {
        handleClose();
        setPlayers({ player: { ...defaultPlayer}, opponent: {...defaultPlayer} });
        setRandomPlayers();
        handleRandomNewState();
    }

    const theSamePokemonSelected = () => {
        handleClose();
        setPlayers({
            player: {
                ...players.player, lastDiceRoll: 0, points: 0,
                history: [...players.player.history, isWin]
            },
            opponent: { ...players.player, lastDiceRoll: 0, points: 0 }
        });
        handleRandomNewState();
    }

    return (
        <div className='gameBoard'>
            <h2 className='title'>Pokemon battle simulator</h2>
            <Players players={players} />
            <Points players={players}
                toggleRandomNewState={toggleRandomNewState}
                updatePoints={updatePoints} />

            {!!players && !!players.player.history.length && <History history={players.player.history} />}

            <Modal show={showModal} onHide={theSamePokemonSelected}>
                <Modal.Body>
                    <h4 id='message'>{isWin ? 'You Win!' : 'Game Over!'}</h4>
                    <p>Do you want to receive a new Pokémon or continue with the same one?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={newPokemonSelected}>
                        a new Pokémon
                    </Button>
                    <Button variant="primary" onClick={theSamePokemonSelected}>
                        the same Pokémon
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}