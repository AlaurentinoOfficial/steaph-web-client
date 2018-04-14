import React, { Component } from 'react'
import $ from 'jquery'

import './Sidebar.css'

class Sidebar extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="Sidebar">
                Sidebar
                <main className="main-content">
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Sidebar