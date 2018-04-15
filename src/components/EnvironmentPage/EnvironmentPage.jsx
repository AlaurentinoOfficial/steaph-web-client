import React, { Component } from 'react'
import {Line} from 'react-chartjs-2';
import $ from 'jquery'

import './EnvironmentPage.css'
import Sidebar from '../Sidebar/Sidebar';
import Card from '../Card/Card'

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
        label: 'Economy in $',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(7, 71, 166, 1)',
        borderColor: 'rgba(7, 71, 166, 1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(7, 71, 166, 1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(7, 71, 166, 1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40]
    }]
};

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
                                <Card title="Economy">
                                    <Line
                                        data={data}
                                        height={90}/>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </Sidebar>
        )
    }
}

export default EnvironmentPage