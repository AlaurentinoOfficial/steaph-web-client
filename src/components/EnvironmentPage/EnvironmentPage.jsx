import React, { Component } from 'react'
import {Line} from 'react-chartjs-2';
import $ from 'jquery'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faClock, faAlignLeft, faSlidersH } from '@fortawesome/fontawesome-free-solid'

import './EnvironmentPage.css'
import Sidebar from '../Sidebar/Sidebar';
import Card from '../Card/Card'

const data = {
    labels: ['Sunday', 'Monday', 'Tuesday', 'Wedesday', 'Thursday', 'Friday', 'Saturday'],
    datasets: [{
        label: 'Economy in KVh/$',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderColor: 'rgba(255, 255, 255, 1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(255, 255, 255, 1)',
        pointBackgroundColor: 'rgba(7, 71, 166, 1)',
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
        pointHoverBorderColor: 'rgba(2555,255,255,1)',
        pointHoverBorderWidth: 2,
        pointHighlightFill: "#fff",
        pointRadius: 4,
        pointHitRadius: 10,
        scaleFontColor: "#fff",
        data: [0, 120, 80, 100, 56, 55, 40]
    }]
};

const whiteOption = {
    "legend": {
        "position": 'bottom',
        "labels": {
          "fontColor": 'white'
        }
    },
    "scales": {
      "yAxes": [
        {
          "gridLines": {"color": "rgba(255, 255, 255, 0.2"},
          "ticks": { "beginAtZero": true, "fontColor": "#fff"}
        }
      ],
      "xAxes": [
        {
          "gridLines": { "color": "rgba(255, 255, 255, 0.2" },
          "ticks": { "beginAtZero": true, "fontColor": "#fff"}
        }
      ],
      "angleLines": {color: "white"}
    }
};

class EnvironmentPage extends Component {

    constructor(props) {
        super(props)

        if(localStorage.getItem('token') === null)
            props.history.push('/login?redirect?environment')
        
        $('body').removeAttr('class').addClass('Environment')

        console.log(this.props.match.params.id)

        this.LoadOptions();
    }

    LoadOptions() {
        this.state.list = [
            (
                <li>
                    <a href={"/environment/" + this.props.match.params.id+ "/overview"} class="active">
                        <FontAwesomeIcon icon={faAlignLeft} />
                        <span>Overview</span>
                    </a>
                </li>
            ),
            (
                <li>
                    <a href={"/environment/" + this.props.match.params.id+ "/schedule"}>
                        <FontAwesomeIcon icon={faClock} />
                        <span>Schedule</span>
                    </a>
                </li>
            ),
            (
                <li>
                    <a href={"/environment/" + this.props.match.params.id+ "/settings"}>
                        <FontAwesomeIcon icon={faSlidersH} />
                        <span>Settings</span>
                    </a>
                </li>
            ),
        ]
    }

    state = {
        list: []
    }

    render() {
        return (
            <Sidebar
                title="Environment"
                list={this.state.list}>
                <div className="Environment">
                    <div className="content">
                        <div className="env-graph">
                            <Card title="Status">
                                <div className="environment-property">
                                    <span className="highlight">NAME:</span> Tal
                                </div>
                                <div className="environment-property">
                                    <span className="highlight">UUID:</span> sdflsdkfiuh9rhsf23urhoksodu9
                                </div>
                                <div className="environment-property">
                                    <span className="highlight">KEY:</span> dsh9ew8ufhwef9jsdhfjhdsifhsd
                                </div>
                                <div className="environment-property">
                                    <span className="highlight">STATUS:</span> Actived
                                </div>
                            </Card>
                            <Card title="Economy" className="card-fill-blue">
                                <Line
                                    data={data}
                                    options={whiteOption}
                                    height={90}/>
                            </Card>
                        </div>
                    </div>
                </div>
            </Sidebar>
        )
    }
}

export default EnvironmentPage