import React from 'react';

// This will be a class component because we have a form in here
class Signin extends React.Component {
  state = {
    username: 'frodo',
    password: ''
  };
  render() {
    return (
      <form className="form">
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
    console.log(this.state);
  };
}

export default Signin;
