import React, { Component } from 'react'

import './DashboardPage.css'

class DashboardPage extends Component {

    constructor(props) {
        super(props)

        if(localStorage.getItem('token') === null)
            props.history.push('/login')
    }

    render() {
        return (
            <div className="Dashboard">
                <h1>Dashboard</h1>
            </div>
        )
    }
}

export default DashboardPage