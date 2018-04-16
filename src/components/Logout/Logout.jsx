import React, { Component } from 'react'

class Logout extends Component {

    constructor(props) {
        super(props)

        localStorage.removeItem('token')
        props.history.push('/login')
    }

    render() {
        return (
            <div>Please wait...</div>
        )
    }
}

export default Logout