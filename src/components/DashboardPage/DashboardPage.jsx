import React, { Component } from 'react'
import $ from 'jquery'

import './DashboardPage.css'

class DashboardPage extends Component {

    constructor(props) {
        super(props)

        if(localStorage.getItem('token') === null)
            props.history.push('/login?redirect?dashboard')
        
        $('body').removeAttr('class').addClass('Dashboard')
    }

    render() {
        return (
            <div className="Dashboard">
            </div>
        )
    }
}

export default DashboardPage