import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addProject, updateProject } from "../../actions/projects";

export class Form extends Component {
  state = {
    id: 0,
    name: "",
    start_date: "",
    duration: 0,
    project_model: "",
    resource_count: 0
  };

  static propTypes = {
    addProject: PropTypes.func.isRequired,
    stateFromParent: PropTypes.object.isRequired,
    updateProject: PropTypes.func.isRequired
  };

  static getDerivedStateFromProps(props, state) {
    console.log("Props: ", props);
    console.log("state: ", state);
    var isStateFromParentSet = false;

    if (state.id && state.id === props.stateFromParent.id) {
      isStateFromParentSet = true;
    }

    return !isStateFromParentSet ? props.stateFromParent : props;
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const {
      name,
      start_date,
      duration,
      project_model,
      resource_count
    } = this.state;

    const project = {
      name,
      start_date,
      duration,
      project_model,
      resource_count
    };

    if (this.state.id && this.state.id !== 0) {
      project.id = this.state.id;

      this.setState({
        name: "",
        start_date: "",
        duration: 0,
        project_model: "",
        resource_count: 0
      });

      this.props.updateProject(project);
    } else {
      this.setState({
        name: "",
        start_date: "",
        duration: 0,
        project_model: "",
        resource_count: 0
      });

      this.props.addProject(project);
    }
  };

  render() {
    const {
      name,
      start_date,
      duration,
      project_model,
      resource_count
    } = this.state;
    return (
      <div className="card">
        <div className="card-header">
          <h2>Add Project</h2>
        </div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Project Name:</label>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={this.onChange}
                value={name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="start_date">Start Date:</label>
              <input
                type="date"
                className="form-control"
                name="start_date"
                onChange={this.onChange}
                value={start_date}
              />
            </div>
            <div className="form-group">
              <label htmlFor="duration">Duration:</label>
              <input
                type="text"
                className="form-control"
                name="duration"
                onChange={this.onChange}
                value={duration}
              />
            </div>
            <div className="form-group">
              <label htmlFor="project_model">Project Model:</label>
              <input
                type="text"
                className="form-control"
                name="project_model"
                onChange={this.onChange}
                value={project_model}
              />
            </div>
            <div className="form-group">
              <label htmlFor="resource_count">Resource Count:</label>
              <input
                type="text"
                className="form-control"
                name="resource_count"
                onChange={this.onChange}
                value={resource_count}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { addProject, updateProject }
)(Form);
