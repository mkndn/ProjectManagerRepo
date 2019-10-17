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
    this.setState({ ...dataFromProjects });
  };

  render() {
    const state = this.props.state;
    return (
      <Fragment>
        <Form state={state} />
        <Projects callback={this.editProjectCallback} />
      </Fragment>
    );
  }
}

export default Dashboard;
