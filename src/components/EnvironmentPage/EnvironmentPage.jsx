import React, { Component } from 'react'
import $ from 'jquery'

import './EnvironmentPage.css'
import Sidebar from '../Sidebar/Sidebar';

class EnvironmentPage extends Component {

    constructor(props) {
        super(props)

        if(localStorage.getItem('token') === null)
            props.history.push('/login?redirect?environment')
        
        $('body').removeAttr('class').addClass('Environment')

        console.log(this.props.id)
    }

    render() {
        return (
            <Sidebar
                title="Environment">
                <div className="Environment">
                    <div className="container">
                        <div className="content">
                            r
                        </div>
                    </div>
                </div>
            </Sidebar>
        )
    }
}

export default EnvironmentPage