import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createEvent, getGames} from './EventManager.js'

export const EventForm = () => {
    const history = useHistory()
    const [games, setGames] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentEvent, setCurrentEvent] = useState({
        gameId: 0,
        description: "",
        date: "",
        time: ""
    })

    useEffect(() => {
        getGames().then(gameData => setGames(gameData))
    }, [])

    const changeEventState = (domEvent) => {
        const copy = {...currentEvent}
        // const copy = Object.assign({}, currentGame)
        copy[domEvent.target.name] = domEvent.target.value
    
        setCurrentEvent(copy)
      }

        // TODO: Complete the onChange function
    

    return (
        <form className="eventForm">
            <h2 className="eventForm__description">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date (0000-00-00): </label>
                    <input type="text" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time (00-00): </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div>
                  <label>Event Type</label>
                  <select onChange={changeEventState} name="gameId" value={currentEvent.gameId}>
                  <option value="0">Select a game</option>
                  {
                      games.map(game => <option value={game.id}>{game.title}</option>)
                  }
                  </select>
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        game: parseInt(currentEvent.gameId),
                      
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}