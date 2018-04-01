import React, { Component } from 'react';
import './LoginPage.css';

class LoginPage extends Component {
  render() {
    return (
      <div className="">
        <div className="mdl-grid">
            <div className="mdl-layout-spacer"></div>
            <div className="mdl-cell mdl-cell--4-col">
                <div className="demo-card-wide mdl-card mdl-shadow--2dp">
                    <div class="mdl-card__title">
                        <h2 class="mdl-card__title-text">Login in</h2>
                    </div>
                    <form>
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input className="mdl-textfield__input" type="text" id="email"/>
                            <label className="mdl-textfield__label" for="email">Email</label>
                        </div>

                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input className="mdl-textfield__input" type="password" id="password"/>
                            <label className="mdl-textfield__label" for="password">Password</label>
                        </div>

                        <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-1">
                            <input type="checkbox" id="checkbox-1" className="mdl-checkbox__input"/>
                            <span className="mdl-checkbox__label">Remember me</span>
                        </label>

                        <div className="mdl-grid">
                            <div className="mdl-layout-spacer"></div>
                            <div className="mdl-layout-spacer"></div>
                            <button class="mdl-cell mdl-cell--4-col mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">Sing in</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="mdl-layout-spacer"></div>
        </div>
      </div>
    );
  }
}

export default LoginPage;