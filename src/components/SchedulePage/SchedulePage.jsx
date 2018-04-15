import React, { Component } from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faClock, faAlignLeft, faSlidersH, faTimes, faPencilAlt } from '@fortawesome/fontawesome-free-solid'
import $ from 'jquery'

import './SchedulePage.css'
import Sidebar from '../Sidebar/Sidebar';
import {EnvironmentById, Schedules, RemoveSchedules} from '../../services/Request'
import Card from '../Card/Card';

class SchedulePage extends Component {

    constructor(props) {
        super(props)

        if(localStorage.getItem('token') === null)
            props.history.push('/login')
        
        $('body').removeAttr('class').addClass('Environment')

        this.LoadEnv();
    }

    LoadSchedule() {
        Schedules(localStorage.getItem('token'), this.props.match.params.id)
        .then(json => {
            this.state.schedule = []

            json.forEach(e => {
                this.state.schedule.push((
                    <tr>
                        <th>
                            {new Date(e.start).getHours() + ":" + new Date(e.start).getMinutes()}
                        </th>
                        <th>
                            {new Date(e.end).getHours() + ":" + new Date(e.end).getMinutes()}
                        </th>
                        <th>
                            {e.day}
                        </th>
                        <th>
                            <a href="#"><FontAwesomeIcon icon={faPencilAlt} /></a>
                        </th>
                        <th>
                            <a onClick={ev => this.remove(ev, e._id)} href="#"><FontAwesomeIcon icon={faTimes} /></a>
                        </th>
                    </tr>
                ))
            })

            this.forceUpdate()
        })
        .catch(err => {
            this.props.history.push('/dashboard')
        })
    }

    state = {
        list: []
    }

    LoadEnv() {
        EnvironmentById(localStorage.getItem('token'), this.props.match.params.id)
        .then(json => {
            this.setState(json)
            this.LoadSchedule()
            this.forceUpdate()
        })
        .catch(err => {
            this.props.history.push('/dashboard')
        })
    }

    LoadOptions() {
        return [
            (
                <li>
                    <a href={"/environment/" + this.props.match.params.id+ "/overview"}>
                        <FontAwesomeIcon icon={faAlignLeft} />
                        <span>Overview</span>
                    </a>
                </li>
            ),
            (
                <li>
                    <a href={"/environment/" + this.props.match.params.id+ "/schedule"} className="active">
                        <FontAwesomeIcon icon={faClock} />
                        <span>Schedule</span>
                    </a>
                </li>
            ),
            (
                <li>
                    <a href={"/environment/" + this.props.match.params.id+ "/settings"}>
                        <FontAwesomeIcon icon={faSlidersH} />
                        <span>Settings</span>
                    </a>
                </li>
            ),
        ]
    }

    remove = (e, id) => {
        e.preventDefault()

        RemoveSchedules(localStorage.getItem('token'), id)
        .then(json => {
            this.LoadEnv();
            this.forceUpdate()
        })
        .catch(err => {
            this.LoadEnv();
            this.forceUpdate()
        })
    }

    render() {
        return (
            <Sidebar
                title={this.state.name}
                list={this.LoadOptions()}>
                <div>
                    <Card
                        title="Schedule">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>Start</th>
                                    <th>End</th>
                                    <th>Day</th>
                                    <th>Edit</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.schedule}
                            </tbody>
                        </table>
                    </Card>
                </div>
            </Sidebar>
        )
    }
}

export default SchedulePage