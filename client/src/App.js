import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import Signin from './auth/Signin';
import HobbitList from './hobbits/HobbitList';

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
          path="/signin"
          // Had to change curly brackets after arrow to parens for some reason...???
          // THe problem is that since we are rendering this manually now, this is not
          // being rendered with all the properties.  If we want the routing properties
          // we have to spread them like this...???
          render={props => <Signin {...props} onSignin={this.signinSuccess} />}
        />
        <Route path="/hobbits" component={HobbitList}/>
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
