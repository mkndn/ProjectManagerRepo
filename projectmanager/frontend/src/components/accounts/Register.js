import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";

export class Register extends Component {
  state = {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    date_of_birth: "",
    password: "",
    password2: ""
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    register: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();

    const {
      first_name,
      last_name,
      email,
      date_of_birth,
      username,
      password,
      password2
    } = this.state;

    if (password !== password2) {
      console.log("passwords don't match");
    }

    const data = { username, password, email, first_name, last_name, date_of_birth };

    this.props.register(data);
  };

  render() {
    const { isAuthenticated } = this.props.isAuthenticated;

    if (isAuthenticated) {
      return <Redirect to="/" />;
    }

    const {
      first_name,
      last_name,
      email,
      date_of_birth,
      username,
      password,
      password2
    } = this.state;
    return (
      <div className="card">
        <div className="card-header">
          <h2>Register</h2>
        </div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="first_name">First name:</label>
              <input
                type="text"
                className="form-control"
                name="first_name"
                onChange={this.onChange}
                value={first_name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="last_name">Last name:</label>
              <input
                type="text"
                className="form-control"
                name="last_name"
                onChange={this.onChange}
                value={last_name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="duration">Username:</label>
              <input
                type="text"
                className="form-control"
                name="username"
                onChange={this.onChange}
                value={username}
              />
            </div>
            <div className="form-group">
              <label htmlFor="project_model">Email:</label>
              <input
                type="text"
                className="form-control"
                name="email"
                onChange={this.onChange}
                value={email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="date_of_birth">Date Of Birth:</label>
              <input
                type="date"
                className="form-control"
                name="date_of_birth"
                onChange={this.onChange}
                value={date_of_birth}
              />
            </div>
            <div className="form-group">
              <label htmlFor="resource_count">Password:</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>
            <div className="form-group">
              <label htmlFor="resource_count">Confirm Password:</label>
              <input
                type="password"
                className="form-control"
                name="password2"
                onChange={this.onChange}
                value={password2}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary" type="submit">
                Register
              </button>
            </div>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { register }
)(Register);
