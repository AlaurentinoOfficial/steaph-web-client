import React, { Component } from 'react'
import {Line} from 'react-chartjs-2';
import $ from 'jquery'

import './EnvironmentPage.css'
import Sidebar from '../Sidebar/Sidebar';

class EnvironmentPage extends Component {

    constructor(props) {
        super(props)

        if(localStorage.getItem('token') === null)
            props.history.push('/login?redirect?environment')
        
        $('body').removeAttr('class').addClass('Environment')

        console.log(this.props.match.params.id)
    }

    render() {
        return (
            <Sidebar
                title="Environment">
                <div className="Environment">
                    <div className="container">
                        <div className="content">
                            <div className="env-graph">
                                <Line
                                    height={90}/>
                            </div>
                        </div>
                    </div>
                </div>
            </Sidebar>
        )
    }
}

export default EnvironmentPage