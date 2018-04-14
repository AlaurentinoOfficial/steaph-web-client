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
    }

    render() {
        return (
            <Sidebar
                title="Dashboard">
                <div className="Dashboard">
                    Bla
                </div>
            </Sidebar>
        )
    }
}

export default DashboardPage