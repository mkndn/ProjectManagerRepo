import React, { Component, Fragment } from "react";
import Form from "./Form";
import Projects from "./Projects";

export class Dashboard extends Component {

  render() {
    const state = this.state;
    return (
      <Fragment>
        <Form />
        <Projects />
      </Fragment>
    );
  }
}

export default Dashboard;
