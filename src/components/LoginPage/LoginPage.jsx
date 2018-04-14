import React, { Component } from 'react'
import { Login } from '../../services/Request'
import $ from 'jquery'

import './LoginPage.css'

class LoginPage extends Component {

    constructor(props) {
        super(props)

        $('body').removeAttr('class').addClass('Login')
        
        if(localStorage.getItem('token') !== null)
            props.history.push('/dashboard')
        
    }

    state = {
        email: '',
        password: '',
        remember: true
    }

    errors = {
        email: '',
        password: '4'
    }

    validate() {
        var err = false

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
            $('#email>.form-text-error').text(this.errors.email)
        }
        else
            $('#email').removeClass('is-invalid')

        if(this.errors.password !== '') {
            $('#password').addClass('is-invalid')
            $('#password>.form-text-error').text(this.errors.password)
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
            
            $("#" + e.target.parentNode.id).removeClass('is-invalid')
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
                    this.props.history.push('/dashboard')
                }
                else if(response.code === 4) {
                    $('#email').addClass('is-invalid')
                    $('#email>.form-text-error').text("Invalid email")
                }
                else {
                    $('#password').addClass('is-invalid')
                    $('#password>.form-text-error').text("Invalid password")
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
            <div className="container">
				<div className="login-page">
					<div className="login-head">
					STEAPH
					</div>
					<div className="login-body">
					<form>
						<div className="form-group" id="email">
						    <input onChange={e => this.onChange(e)} value={this.state.email} className="form-control placeholder-no-fix" type="email" autoComplete="off" placeholder="Email" name="email"/>
                            <span className="form-text-error">e</span>
                        </div>
						<div className="form-group" id="password">
						    <input onChange={e => this.onChange(e)} value={this.state.password} className="form-control placeholder-no-fix" type="password" autoComplete="off" placeholder="Password" name="password"/>
                            <span className="form-text-error">e</span>
                        </div>
						<div className="form-actions container">
						    <button onClick={this.onSubmit} type="submit" className="btn">Sign in</button>
						</div>
					</form>
					</div>
					<div className="login-footer">
					<a href="/register">Become our client!</a>
					</div>
				</div>
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