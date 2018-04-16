import React, { Component } from 'react'
import {Line} from 'react-chartjs-2';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faClock, faAlignLeft, faSlidersH } from '@fortawesome/fontawesome-free-solid'
import $ from 'jquery'

import './OverviewPage.css'
import {EnvironmentById} from '../../services/Request'
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
        data: [0, 120, 80]
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

class OverviewPage extends Component {

    constructor(props) {
        super(props)

        if(localStorage.getItem('token') === null)
            props.history.push('/login')
        
        $('body').removeAttr('class').addClass('Environment')

        this.LoadEnv();
    }

    LoadEnv() {
        EnvironmentById(localStorage.getItem('token'), this.props.match.params.id)
        .then(json => {
            this.setState(json)
            this.forceUpdate()
        })
        .catch(err => {
            this.props.history.push('/dashboard')
        })
    }

    LoadOptions() {
        return [
            (
                <li>
                    <a href={"/environment/" + this.props.match.params.id+ "/overview"} className="active">
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
            )
        ]
    }

    state = {
        list: []
    }

    render() {
        return (
            <div>
                <Sidebar
                    title={this.state.name}
                    list={this.LoadOptions()}>
                    <div className="Environment">
                        <Card title="Status">
                            <div className="environment-property">
                                <span className="highlight">NAME:</span> {this.state.name}
                            </div>
                            <div className="environment-property">
                                <span className="highlight">UUID:</span> {this.state.uuid}
                            </div>
                            <div className="environment-property">
                                <span className="highlight">KEY:</span> {this.state.key}
                            </div>
                            <div className="environment-property">
                                <span className="highlight">STATUS:</span> {this.state.status}
                            </div>
                        </Card>
                        <Card title="Economy" className="card-fill-blue">
                            <Line
                                data={data}
                                options={whiteOption}
                                height={90}/>
                        </Card>
                    </div>
                </Sidebar>
            </div>
        )
    }
}

export default OverviewPage