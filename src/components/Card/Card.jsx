import React, { Component } from 'react'

import './Card.css'

class EnvironmentPage extends Component {

    render() {
        return (
            <div className={"card" + " " + this.props.className}>
                <div className="card-header">
                    {this.props.title}
                </div>
                <div className="card-body">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default EnvironmentPage