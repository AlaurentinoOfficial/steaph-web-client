import React, { Component } from 'react';
import './LoginPage.css';
import { Login } from '../../services/Request';

class LoginPage extends Component {

    state = {
        email: '',
        password: '',
        remember: false
    }

    onChange = (e) => {
        if(e.target.name === 'remember') {
            this.setState({
                [e.target.name]: e.target.checked
            })
        }
        else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    checkFields() {

    }

    onSubmit = (e) => {
        e.preventDefault()

        Login(this.state).then((response) => {
            if(response.token !== undefined) {
                localStorage.setItem('token', response.token)
            }
            else {
                console.log("Invalid email or password!")
            }
        })
        .catch((err) => {
            console.log("Connection error!")
        })
    }

    render() {
        return (
        <div className="">
            <div className="mdl-grid">
                <div className="mdl-layout-spacer"></div>
                <div className="mdl-cell mdl-cell--4-col">
                    <div className="demo-card-wide mdl-card mdl-shadow--2dp">
                        <div className="mdl-card__title">
                            <h2 className="mdl-card__title-text">Login in</h2>
                        </div>
                        <div id="p2" class="mdl-progress mdl-js-progress mdl-progress__indeterminate hidden"></div>
                        <form>
                            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <input className="mdl-textfield__input" type="text" name="email" onChange={this.onChange}/>
                                <label className="mdl-textfield__label" htmlFor="email">Email</label>
                            </div>

                            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <input className="mdl-textfield__input" type="password" name="password" onChange={this.onChange}/>
                                <label className="mdl-textfield__label" htmlFor="password">Password</label>
                            </div>

                            <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-1">
                                <input type="checkbox" id="checkbox-1" className="mdl-checkbox__input" name="remember" checked={this.state.remember} onChange={e => this.onChange(e)}/>
                                <span className="mdl-checkbox__label">Remember me</span>
                            </label>

                            <div className="mdl-grid">
                                <div className="mdl-layout-spacer"></div>
                                <div className="mdl-layout-spacer"></div>
                                <button onClick={this.onSubmit} className="mdl-cell mdl-cell--4-col mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">Sing in</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="mdl-layout-spacer"></div>
            </div>
        </div>
        )
    }
}

export default LoginPage