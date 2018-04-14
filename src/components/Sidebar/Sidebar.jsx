import React, { Component } from 'react'
import account from './account.svg'
import search from './search.svg'
import add from './plus.svg'
import logo from './google-logo.svg'

import './Sidebar.css'

class Sidebar extends Component {

    constructor(props) {
        super(props)

        this.LoadEnvs();
    }

    state = {
        list: []
    }

    LoadEnvs() {
        if (this.props.environments !== undefined)
            this.props.environments.forEach(e => {
                this.state.list.push((<li><a href={"/environment/" + e.uuid}>{e.name}</a></li>))
            })
    }

    search = (e) => {
        e.preventDefault()
    }

    render() {
        return (
            <div className="Sidebar">
                <div className="sidebar">
                    <div className="sidebar-helper">
                        <ul className="sidebar-menu-helper">
                            <li>
                                <a href="/dashboard"><img  src={logo} alt="logo"/></a>
                            </li>
                            <li className="small">
                                <a href="#search"><img  src={search} alt="search"/></a>
                            </li>
                            <li className="small">
                                <a href="/environment/add"><img  src={add} alt="add"/></a>
                            </li>
                        </ul>
                        <ul className="sidebar-menu-helper sidebar-menu-down">
                            <li>
                                <a href="/account"><img  src={account} alt="account"/></a>
                            </li>
                        </ul>
                    </div>

                    <div className="sidebar-content">
                        <div className="sidebar-header">
                            <span className="sidebar-title">
                                {this.props.title}
                            </span>
                        </div>

                        <span className="sidebar-body">
                            <ul className="sidebar-menu">
                                {this.state.list}
                            </ul>
                        </span>
                    </div>
                </div>
                <main className="main-content">
                    {this.props.children}
                </main>
                {/* <div className="search">
                    <div className="search-content">
                        <div className="search-header">
                            <span className="search-title">Seach</span>
                        </div>
                        <div className="seach-body">
                            <form>
                                <input type="text"/>
                            </form>
                        </div>
                    </div>
                </div> */}
            </div>
        )
    }
}

export default Sidebar