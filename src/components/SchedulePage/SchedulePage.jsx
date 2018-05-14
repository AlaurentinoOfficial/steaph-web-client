import React, { Component } from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faClock, faAlignLeft, faSlidersH, faTimes, faPencilAlt } from '@fortawesome/fontawesome-free-solid'
import $ from 'jquery'

import './SchedulePage.css'
import Sidebar from '../Sidebar/Sidebar';
import { AddSchedules, EnvironmentById, Schedules, RemoveSchedules } from '../../services/Request'
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
            var schedule = []

            json.forEach(e => {
                schedule.push((
                    <tr>
                        <th>{new Date(e.start).getHours() + ":" + new Date(e.start).getMinutes()}</th>
                        <th>{new Date(e.end).getHours() + ":" + new Date(e.end).getMinutes()}</th>
                        <th>{this.int2Day(e.day)}</th>
                        <th><a onClick={ev => this.remove(ev, e._id)} href="#"><FontAwesomeIcon icon={faTimes} /></a></th>
                    </tr>
                ))
            })

            this.setState({schedule: schedule})
            this.forceUpdate()
        })
        .catch(err => {
            this.props.history.push('/dashboard')
        })
    }

    state = {
        schedule: [],
        start_hour: 0,
        start_minute: 0,
        end_hour: 0,
        end_minute: 0,
        day: new Date().getDay()
    }

    LoadEnv() {
        EnvironmentById(localStorage.getItem('token'), this.props.match.params.id)
        .then(json => {
            json.schedule = []
            this.setState(json)

            
            this.LoadSchedule()
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

    int2Day = (number) => {
        return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][number]    
    }

    remove = (e, id) => {
        e.preventDefault()

        RemoveSchedules(localStorage.getItem('token'), id)
        .then(json => {
            this.LoadEnv();
        })
        .catch(err => {
            this.LoadEnv();
            this.forceUpdate()
        })
    }

    addSchedule = (e) => {
        e.preventDefault()

        let start = new Date()
        start.setHours(this.state.start_hour)
        start.setMinutes(this.state.start_minute)
        start.setMilliseconds(0)

        let end = new Date()
        end.setHours(this.state.end_hour)
        end.setMinutes(this.state.end_minute)
        end.setMilliseconds(0)

        this.setState({
            start_hour: 0,
            start_minute: 0,
            end_hour: 0,
            end_minute: 0,
            day: new Date().getDay()
        })

        let body = {
            start: start.toISOString(),
            end: end.toISOString(),
            day: this.state.day
        }

        AddSchedules(localStorage.getItem('token'), this.props.match.params.id, body)
        .then(json => {
            this.LoadEnv()

            $("#AddModel").removeClass('show')
            $(".modal-backdrop.fade.show").remove()
        })
        .catch(err => {
            this.forceUpdate()
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <Sidebar
                    title={this.state.name}
                    list={this.LoadOptions()}>
                    <div>
                        <Card
                            title="Schedule">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Start</th>
                                        <th>End</th>
                                        <th>Day</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(this.state.schedule)}
                                </tbody>
                            </table>

                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#AddModel">Add new schedule</button>
                        </Card>
                    </div>
                </Sidebar>
                <div className="modal fade" id="AddModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add new schedule</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="small">
                                <div className="form-group" id="email">
                                    <span className="highlight">Start</span><br/>
                                    <input onChange={e => this.onChange(e)} value={this.state.start_hour} className="form-control small placeholder-no-fix" min="0" max="23" type="number" autoComplete="off" name="start_hour"/>
                                    : <input onChange={e => this.onChange(e)} value={this.state.start_minute} className="form-control small placeholder-no-fix" min="0" max="59" type="number" autoComplete="off" name="start_minute"/>
                                </div>
                                <div className="form-group" id="email">
                                    <span className="highlight">End</span><br/>
                                    <input onChange={e => this.onChange(e)} value={this.state.end_hour} className="form-control small placeholder-no-fix" min="0" max="23" type="number" autoComplete="off" name="end_hour"/>
                                    : <input onChange={e => this.onChange(e)} value={this.state.end_minute} className="form-control small placeholder-no-fix" min="0" max="59" type="number" autoComplete="off" name="end_minute"/>
                                </div>
                                <div className="form-group" id="email">
                                    <span className="highlight">Day:</span>
                                    <select onChange={e => this.onChange(e)} value={this.state.day} name="day" className="form-control">
                                        <option value={0}>Sunday</option>
                                        <option value={1}>Monday</option>
                                        <option value={2}>Tuesday</option>
                                        <option value={3}>Wednesday</option>
                                        <option value={4}>Thursday</option>
                                        <option value={5}>Friday</option>
                                        <option value={6}>Saturday</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button onClick={e => this.addSchedule(e)} type="button" className="btn btn-primary">Save changes</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SchedulePage