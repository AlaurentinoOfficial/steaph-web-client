import React, { Component } from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faUser, faPlus, faSearch  } from '@fortawesome/fontawesome-free-solid'

import logo from './google-logo.svg'
import './Sidebar.css'

class Sidebar extends Component {

    search = (e) => {
        e.preventDefault()
    }

    render() {
        return (
            <div className="page-container">
                <div className="sidebar">
                    <div className="sidebar-helper">
                        <ul className="sidebar-menu-helper">
                            <li>
                                <a href="/dashboard"><img src={logo} alt="steaph"/></a>
                            </li>
                            <li className="small">
                                <a href="#search"><FontAwesomeIcon icon={faSearch} /></a>
                            </li>
                            <li className="small">
                                <a href="/environment/add"><FontAwesomeIcon icon={faPlus} /></a>
                            </li>
                        </ul>
                        <ul className="sidebar-menu-helper sidebar-menu-down">
                            <li>
                                <a href="/account"><FontAwesomeIcon icon={faUser} /></a>
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
                                {this.props.list}
                            </ul>
                        </span>
                    </div>
                </div>
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
                <main className="main-content">
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Sidebar