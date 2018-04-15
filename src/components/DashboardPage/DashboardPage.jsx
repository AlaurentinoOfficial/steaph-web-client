import React, { Component } from 'react'
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
        let envs = [
            {name: "Environment 1", uuid: "sfjgsdfjasdgfjads", class: 'active'},
            {name: "Environment 2", uuid: "sfjgsdfjasdgfjads"}
        ]

        envs.forEach(e => {
            this.state.list.push((<li><a href={"/environment/" + e.uuid}>{e.name}</a></li>))
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