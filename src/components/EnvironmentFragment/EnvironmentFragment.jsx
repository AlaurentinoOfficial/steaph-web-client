import React, { Component } from 'react'
import { Schedules, RemoveSchedules } from '../../services/Request'

import './EnvironmentFragment.css'

class EnvironmentFragment extends Component {

    state = {
        schedule: []
    }

    getSchedules = () => {
        Schedules(localStorage.getItem('token'), this.props.env._id)
        .then(json => {

            console.log(json)

            if(json === []) {
                this.createTable()
                this.forceUpdate()
            }
        })
    }

    removeSchedule = (id) => {
        RemoveSchedules(localStorage.getItem('token'), id)
        .then(json => {
            const snackbarContainer = document.querySelector('#snack').MaterialSnackbar
            snackbarContainer.showSnackbar({
                message: 'Schedule removed with success',
                timeout: 2000
            })
        })
    }

    createTable = (json) => {
        json.forEach(s => {
            this.state.schedule.push((
                <tr>
                    <td>{new Date(s.start).getHours() + ":" + new Date(s.start).getMinutes()}</td>
                    <td>{new Date(s.end).getHours() + ":" + new Date(s.end).getMinutes()}</td>
                    <td>
                        <button onClick={this.removeSchedule(s._id)} className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                            <i className="material-icons">close</i>
                        </button>
                    </td>
                </tr>
            ))
        })
    }

    componentDidMount() {
        this.getSchedules()
    }

    


    render() {
        return (
            <div className="Fragment">
                <div className="mdl-grid">
                    <div className="mdl-layout-spacer"></div>
                    <div className="mdl-cell mdl-cell--6-col">
                        <div className="demo-card-wide mdl-card mdl-shadow--2dp">
                            <div className="mdl-card__title">
                                <h2 className="mdl-card__title-text">{this.props.env.name}</h2>
                            </div>
                            <div className="mdl-card__actions mdl-card--border">
                                <table className="mdl-data-table mdl-js-data-table mdl-data-table--selectable">
                                    <thead>
                                        <tr>
                                            <th>Start</th>
                                            <th>End</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.schedule}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mdl-card__actions mdl-card--border">
                                <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Add new schedule</a>
                            </div>
                        </div>
                    </div>
                    <div className="mdl-layout-spacer"></div>
                </div>
            </div>
        )
    }
}

export default EnvironmentFragment