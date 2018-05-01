import React from 'react';
import axios from 'axios';

// This will be a class component because we have a form in here
class Signin extends React.Component {
  state = {
    username: '',
    password: ''
  };
  render() {
    return (
      <form onSubmit={this.submitHandler} className="form">
        <div className="form-row">
          <label>Username</label>
          <input
            name="username"
            value={this.state.username}
            onChange={this.inputHandler}
            type="text"
          />
        </div>
        <div className="form-row">
          <label>Password</label>
          <input
            name="password"
            value={this.state.password}
            onChange={this.inputHandler}
            type="password"
            placeholder="TYPE 'Bodo' to TEST"
          />
        </div>
        <div className="form-row">
          <button>Sign In</button>
        </div>
      </form>
    );
  }

  inputHandler = ({ target }) => {
    // This enables you to type in the password input field.  When '5' is pressed inside the password field,
    // onChange runs inputHandler, which brings in the [name], which is 'password', and the value which is '5',
    // and updates the state using setState.
    const { name, value } = target;
    // Here we are looking for the name property (see above), so that when the onChange fires, we will get
    // the event/target.  QUESTION: How does this work???
    this.setState({ [name]: value });
    // console.log(this.state);
  };

  submitHandler = event => {
    event.preventDefault();

    axios
      .post('http://localhost:5000/api/login', this.state)
      .then(response => {
        console.log('response', response.data);
      })
      .catch(err => {
        console.log('ERROR: You are not authorized', err);
      });
  };
}

export default Signin;
