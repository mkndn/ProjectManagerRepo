import React, { Component, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/auth'

export class Login extends Component {
    state = {
        username: "",
        password: ""
    }

    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    onSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password)
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />
        }
        const { username, password } = this.state
        return (
            <div className="card">
                <div className="card-header">
                    <h2>Login</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>
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
                            <button type="submit">Login</button>
                        </div>
                        <p>
                            Don't have an account? <Link to="/Register">Register</Link>
                        </p>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    isAuthenticated: state.auth.isAuthenticated
}

export default connect(mapStateToProps, { login })(Login)
