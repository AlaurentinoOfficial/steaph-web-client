import React, { Component } from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faCouch } from '@fortawesome/fontawesome-free-solid'
import $ from 'jquery'

import './DashboardPage.css'
import Sidebar from '../Sidebar/Sidebar';

class DashboardPage extends Component {

    constructor(props) {
        super(props)

        if(localStorage.getItem('token') === null)
            props.history.push('/login?redirect?dashboard')
        
        $('body').removeAttr('class').addClass('Dashboard')
        this.LoadEnvs()
    }

    state = {
        list: []
    }

    LoadEnvs() {

        envs.forEach(e => {
            this.state.list.push((
                <li>
                    <a href={"/environment/" + e.uuid}><FontAwesomeIcon icon={faCouch} /> {e.name}</a>
                </li>
            ))
        })
    }

    render() {
        return (
            <Sidebar
                title="Dashboard"
                list={this.state.list}>
                <div className="Dashboard">
                    <div className="container">
                        hj
                    </div>
                </div>
            </Sidebar>
        )
    }
}

export default DashboardPage