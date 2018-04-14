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
                title="Dashboard"
                environments={[{name: "Environment 1", uuid: "sfjgsdfjasdgfjads", class: 'active'}]}>
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