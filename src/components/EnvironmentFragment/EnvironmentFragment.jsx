import React, { Component } from 'react'

import './EnvironmentFragment.css'

class EnvironmentFragment extends Component {

    

    render() {
        return (
            <div className="Fragment">
                <div className="mdl-grid">
                    <div className="mdl-layout-spacer"></div>
                    <div className="mdl-cell mdl-cell--8-col">
                        <div className="demo-card-wide mdl-card mdl-shadow--2dp">
                            <div className="mdl-card__title">
                                <h2 className="mdl-card__title-text">{this.props.env.name}</h2>
                            </div>
                            <div className="mdl-card__actions mdl-card--border">

                            </div>
                        </div>
                    </div>
                    <div className="mdl-layout-spacer"></div>
                </div>
            </div>
        )
    }
}

export default EnvironmentFragment