import React, { Component } from 'react';
import { Login } from '../../services/Request';
import $ from 'jquery'

import './LoginPage.css';

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

        if(this.errors.email !== '') {
            $('#email').addClass('is-invalid')
            $('#email>.mdl-textfield__error').text(this.errors.email)
        }
        else
            $('#email').removeClass('is-invalid')

        if(this.errors.password !== '') {
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
            $('#progressbar').removeClass('hidden')

            Login(this.state).then((response) => {
                if(response.token !== undefined) {
                    localStorage.setItem('token', response.token)
                }
                else if(response.code === 4) {
                    $('#email').addClass('is-invalid')
                    $('#email>.mdl-textfield__error').text("Invalid email")
                }
                else {
                    $('#password').addClass('is-invalid')
                    $('#password>.mdl-textfield__error').text("Invalid password")
                }

                $('#progressbar').addClass('hidden')
            })
            .catch((err) => {
                $('#progressbar').addClass('hidden')

                const snackbarContainer = document.querySelector('#snack').MaterialSnackbar
                snackbarContainer.showSnackbar({
                    message: 'Connection offline',
                    timeout: 7000,
                    actionHandler: () => { snackbarContainer.cleanup_(); this.onSubmit(e) },
                    actionText: 'RETRY'
                })
            })
        }
    }

    render() {
        return (
        <div className="Login">
            <div className="mdl-grid">
                <div className="mdl-layout-spacer"></div>
                <div className="mdl-cell mdl-cell--4-col">
                    <div className="demo-card-wide mdl-card mdl-shadow--2dp">
                        <div className="mdl-card__title">
                            <h2 className="mdl-card__title-text">Login in</h2>
                        </div>
                        <div className="progressbar-content">
                            <div id="progressbar" className="mdl-progress mdl-js-progress mdl-progress__indeterminate hidden"></div>
                        </div>
                        <form>
                            <div id="email" className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <input onChange={this.onChange} className="mdl-textfield__input" type="text" name="email" noValidate/>
                                <label className="mdl-textfield__label" htmlFor="email">Email</label>
                                <span className="mdl-textfield__error"></span>
                            </div>

                            <div id="password" className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <input onChange={this.onChange} className="mdl-textfield__input" type="password" name="password" noValidate/>
                                <label className="mdl-textfield__label" htmlFor="password">Password</label>
                                <span className="mdl-textfield__error"></span>
                            </div>

                            <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox">
                                <input checked={this.state.remember} onChange={this.onChange} type="checkbox" id="checkbox" className="mdl-checkbox__input" name="remember"/>
                                <span className="mdl-checkbox__label">Remember me</span>
                            </label>

                            <div className="mdl-grid">
                                <div className="mdl-layout-spacer"></div>
                                <div className="mdl-layout-spacer"></div>
                                <button onClick={this.onSubmit} id="signin" className="mdl-cell mdl-cell--4-col mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">Sign in</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="mdl-layout-spacer"></div>
            </div>
            <div id="snack" className="mdl-js-snackbar mdl-snackbar">
                <div className="mdl-snackbar__text"></div>
                <button className="mdl-snackbar__action" type="button"></button>
            </div>
        </div>
        )
    }
}

export default LoginPage