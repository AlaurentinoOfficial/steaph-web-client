import React, { Component } from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faUser, faPlus, faSearch  } from '@fortawesome/fontawesome-free-solid'
import $ from 'jquery'

import logo from './google-logo.svg'
import './Sidebar.css'

import { AddEnvironments } from '../../services/Request'

class Sidebar extends Component {

    search = (e) => {
        e.preventDefault()
    }

    state = {
        name: "",
        device_id: ""
    }

    onSubmit = (e) => {
        e.preventDefault()

        AddEnvironments(localStorage.getItem('token'), this.state)
        .then(json => {
            $("#AddEnv").removeClass('show')
            $(".modal-backdrop.fade.show").remove()
            this.forceUpdate();
        })
        .catch(err => {
            $("#AddEnv").removeClass('show')
            $(".modal-backdrop.fade.show").remove()
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="page-container">
                <div className="sidebar">
                    <div className="sidebar-helper">
                        <ul className="sidebar-menu-helper">
                            <li>
                                <a href="/dashboard"><img src={logo} alt="steaph"/></a>
                            </li>
                            <li className="small">
                                <a href="#search"><FontAwesomeIcon icon={faSearch} /></a>
                            </li>
                            <li className="small">
                                <a href="/environment/add" data-toggle="modal" data-target="#AddEnv"><FontAwesomeIcon icon={faPlus} /></a>
                            </li>
                        </ul>
                        <ul className="sidebar-menu-helper sidebar-menu-down">
                            <li>
                                <a href="/account"><FontAwesomeIcon icon={faUser} /></a>
                            </li>
                        </ul>
                    </div>

                    <div className="sidebar-content">
                        <div className="sidebar-header">
                            <span className="sidebar-title">
                                {this.props.title}
                            </span>
                        </div>

                        <span className="sidebar-body">
                            <ul className="sidebar-menu">
                                {this.props.list}
                            </ul>
                        </span>
                    </div>
                </div>
                <div className="modal fade" id="AddEnv" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add new environment</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="small">
                                <div className="form-group">
                                    <span className="highlight">Name:</span><br/>
                                    <input onChange={e => this.onChange(e)} value={this.state.name} className="form-control placeholder-no-fix" max="25" type="text" autoComplete="off" name="name"/>
                                </div>
                                <div className="form-group">
                                    <span className="highlight">Device:</span><br/>
                                    <input onChange={e => this.onChange(e)} value={this.state.device_id} className="form-control placeholder-no-fix" type="text" autoComplete="off" name="device_id"/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button onClick={e => this.onSubmit(e)} type="button" className="btn btn-primary">Save changes</button>
                        </div>
                        </div>
                    </div>
                </div>
                <main className="main-content">
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Sidebar