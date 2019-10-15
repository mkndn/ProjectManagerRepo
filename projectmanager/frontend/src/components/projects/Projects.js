import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProjects, deleteProject } from "../../actions/projects";

export class Projects extends Component {
  static propTypes = {
    projects: PropTypes.array.isRequired,
    getProjects: PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    return (
      <Fragment>
        <div className="card">
          <div className="card-header">
            <h2>Projects</h2>
          </div>
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Start Date</th>
                  <th>Duration</th>
                  <th>Model</th>
                  <th>Resource Count</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {this.props.projects.map(project => (
                  <tr key={project.id}>
                    <td>{project.id}</td>
                    <td>{project.name}</td>
                    <td>{project.start_date}</td>
                    <td>{project.duration}</td>
                    <td>{project.project_model}</td>
                    <td>{project.resource_count}</td>
                    <td>
                      <button
                        onClick={this.props.deleteProject.bind(
                          this,
                          project.id
                        )}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projects.projects
});

export default connect(
  mapStateToProps,
  { getProjects, deleteProject }
)(Projects);
