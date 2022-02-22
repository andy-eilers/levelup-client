import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { deleteEvent, getEvents, leaveEvent, joinEvent } from "./EventManager.js"

export const UpdateEvent = () => {
    const history = useHistory()
    const [games, setGames] = useState([])
    const {eventId} = useParams()

    const [currentEvent, setCurrentEvent] = useState({})

    useEffect(() => {
        getGames().then(gameDate => setGames(gameData))
    }, [])

    useEffect(() => {
        getEvent(eventId).then(eventData => setCurrentEvent({
            id: eventData.id,
            date: eventData.date,
            time: eventData.time,
            description: eventData.description,
            game: eventData.game.id
        }))
    }, [eventId])

    const changeEventState = (domEvent) => {
        const copy = {...currentEvent}
        copy[domEvent.target.name] = domEvent.target.value

        setCurrentEvent(copy)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__time">UpdateEvent</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time" required className="form-control"
                    value={currentEvent.time}
                    onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <textarea name="description" required className="form-control"
                    value={currentEvent.description}
                    onChange={changeEventState}
                    ></textarea>
                </div>            
            </fieldset>

            <fieldset>
                <div>
                    <label>Event Type: </label>
                    <select onChange={changeEventState} name="game" value={currentEvent.game}>
                        <option value="0">Select a Game</option>
                        {
                            games.map(game => <option value={game.id}>{game.title}</option>)
                        }
                    </select>
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    updateEvent(currentEvent).then(() =>  history.push('/events'))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}