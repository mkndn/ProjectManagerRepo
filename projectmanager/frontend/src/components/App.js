import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import {
  Switch,
  Redirect,
  HashRouter as Router,
  Route
} from "react-router-dom";
import PrivateRoute from "./common/PrivateRoute";

import Header from "./layout/Header";
import Dashboard from "./projects/Dashboard";
import Login from "./accounts/Login";
import Register from "./accounts/Register";

import { loadUser } from "../actions/auth";

import { Provider } from "react-redux";
import store from "../store";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Header />
            <div className="mt-3 container">
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
