import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import Signin from './auth/Signin';

class App extends Component {
  state = {
    user: null
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {this.state.user && (
          <h1 className="App-title">Welcome {this.state.user.username}!</h1>
        )}
        </header>
        <Route
          to="/signin"
          // Had to change curly brackets after arrow to parens for some reason...???
          render={() => <Signin onSignin={this.signinSuccess} />}
        />
      </div>
    );
  }
  // When you call onSignin, which then points to signinSuccess, which takes data
  // which was passed in this.props.onSignin(response.data) - should include token
  // and everything.
  signinSuccess = data => {
    console.log('data from c.l in signinSuccess:', data);
    this.setState({user: data.user})
    localStorage.setItem('authtoken', data.token)
  };
}

export default App;
