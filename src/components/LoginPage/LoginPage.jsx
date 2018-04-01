import React, { Component } from 'react';
import { Login } from '../../services/Request';
import './LoginPage.css';

import $ from 'jquery'

class LoginPage extends Component {

    state = {
        email: '',
        password: '',
        remember: false
    }

    errors = {
        email: '',
        password: '4'
    }

    validate() {
        var err = false;

        if(this.state.email === '') {
            this.errors.email = "This field is required"
            err = !err ? true : err
        }
        else if(!this.state.email.includes('@')) {
            this.errors.email = "Invalid email"
            err = !err ? true : err
        }
        else
            this.errors.email = ''

        if(this.state.password === '') {
            this.errors.password = "This field is required"
            err = !err ? true : err
        }
        else
            this.errors.password = ''

        if(this.errors.email != '') {
            $('#email').addClass('is-invalid')
            $('#email>.mdl-textfield__error').text(this.errors.email)
        }
        else
            $('#email').removeClass('is-invalid')

        if(this.errors.password != '') {
            $('#password').addClass('is-invalid')
            $('#password>.mdl-textfield__error').text(this.errors.password)
        }
        else
            $('#password').removeClass('is-invalid')

        return err
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
            
            $(e.target.parentNode.id).removeClass('is-invalid')
        }
    }

    onSubmit = (e) => {
        e.preventDefault()

        const err = this.validate()

        if(!err) {
            Login(this.state).then((response) => {
                if(response.token !== undefined) {
                    localStorage.setItem('token', response.token)
                }
                else if(response.code == 4) {
                    $('#email').addClass('is-invalid')
                    $('#email>.mdl-textfield__error').text("Invalid email")
                }
                else {
                    $('#password').addClass('is-invalid')
                    $('#password>.mdl-textfield__error').text("Invalid password")
                }
            })
            .catch((err) => {
                console.log("Connection error!")
            })
        }
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
                        <div id="p2" className="mdl-progress mdl-js-progress mdl-progress__indeterminate hidden"></div>
                        <form>
                            <div id="email" className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <input onChange={this.onChange} className="mdl-textfield__input" type="text" name="email" novalidate/>
                                <label className="mdl-textfield__label" htmlFor="email">Email</label>
                                <span class="mdl-textfield__error"></span>
                            </div>

                            <div id="password" className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <input onChange={this.onChange} className="mdl-textfield__input" type="password" pattern="[A-Z,a-z, ]*" name="password"/>
                                <label className="mdl-textfield__label" htmlFor="password">Password</label>
                                <span class="mdl-textfield__error"></span>
                            </div>

                            <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox">
                                <input checked={this.state.remember} onChange={this.onChange} type="checkbox" id="checkbox" className="mdl-checkbox__input" name="remember"/>
                                <span className="mdl-checkbox__label">Remember me</span>
                            </label>

                            <div className="mdl-grid">
                                <div className="mdl-layout-spacer"></div>
                                <div className="mdl-layout-spacer"></div>
                                <button onClick={this.onSubmit} id="singin" className="mdl-cell mdl-cell--4-col mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">Sing in</button>
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