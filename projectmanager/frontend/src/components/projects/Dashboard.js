import React, { Component, Fragment } from "react";
import Form from "./Form";
import Projects from "./Projects";

export class Dashboard extends Component {
  state = {
    id: "",
    name: "",
    start_date: "",
    duration: "",
    project_model: "",
    resource_count: ""
  };

  editProjectCallback = dataFromProjects => {
    console.log("Child Click: ", dataFromProjects);
    this.setState({ ...dataFromProjects });
  };

  render() {
    const state = this.state;
    return (
      <Fragment>
        <Form stateFromParent={this.state} />
        <Projects callbackToParent={this.editProjectCallback} />
      </Fragment>
    );
  }
}

export default Dashboard;
