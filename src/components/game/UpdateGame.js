import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { createGame, getGame, getGameTypes, updateGame } from "./GameManager.js"

export const UpdateGame = () => {
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])
    const {gameId} = useParams()
    const [currentGame, setCurrentGame] = useState({})

    useEffect(() => {
        getGameTypes().then(gameTypeData => setGameTypes(gameTypeData))
    }, [])

    useEffect(() => {
        getGame(eventId).then(gameData => setCurrentGame(gameData))
    }, [gameId])

    const changeGameState = (domEvent) => {
        const copy = {...currentGame}
        copy[domEvent.target.name] = domEvent.target.value

        setCurrentGame(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Update {currentGame.title}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required className="form-control"
                    value={currentGame.title}
                    onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="Maker">Maker: </label>
                    <input type="text" name="maker" required className="form-control"
                      value={currentGame.maker}
                      onChange={changeGameState}
                    />
                </div>            
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Number of Players: </label>
                    <input type="text" name="number_of_players" required autofocus className="form-control"
                      value={currentGame.number_of_players}
                      onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Sill Level: </label>
                    <input type="text" name="skill_level" required autofocus className="form-control"
                      value={currentGame.skill_level}
                      onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div>
                    <label>Game Type</label>
                    <select onChange={changeGameState} name="game_type" value={currentGame.game_type}>
                        <option value="0">Select a Game Type</option>
                        {
                            gameTypes.map(gameType => <option value={gameType.id}>{gameType.label}</option>)
                        }
                    </select>
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    updateGame(currentGame).then(() =>  history.push('/games'))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}