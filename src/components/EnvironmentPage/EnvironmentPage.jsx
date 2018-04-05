import React, { Component } from 'react'
import { Environments } from '../../services/Request'
import EnvironemntFragment from '../EnvironmentFragment/EnvironmentFragment'

import './EnvironmentPage.css'

class EnvironmentPage extends Component {

    state = {
        tabs: [],
        sections: []
    }

    createFragments = (envs) => {
        var first = " is-active";

        envs.forEach(e => {
            this.state.tabs.push((
                <a href={'#' + e.id} className={"mdl-layout__tab" + first}>{e.name}</a>
            ))

            this.state.sections.push((
                <section className={"mdl-layout__tab-panel" + first} id={e.id}>
                    <div className="page-content">
                        <EnvironemntFragment env={e} />
                    </div>
                </section>
            ))

            first = ""
        })
    }

    constructor(props) {
        super(props)

        if(localStorage.getItem('token') === null)
            props.history.push('/login?redirect=/environment')

        Environments(localStorage.getItem("token"))
        .then(json => {
            this.createFragments(json)
            this.forceUpdate()
        })
    }

    render() {
        return (
            <div className="Dashboard">
                <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                    <header className="mdl-layout__header">
                        <div className="mdl-layout__header-row">
                        {/* Title */}
                        <span className="mdl-layout-title">Steaph Environments</span>
                        </div>
                        {/* Tabs */}
                        <div className="mdl-layout__tab-bar mdl-js-ripple-effect">
                            {this.state.tabs}
                        </div>
                    </header>
                    <div className="mdl-layout__drawer">
                        <span className="mdl-layout-title">Title</span>
                    </div>
                    <main className="mdl-layout__content">
                        {this.state.sections}
                    </main>
                    </div>
            </div>
        )
    }
}

export default EnvironmentPage