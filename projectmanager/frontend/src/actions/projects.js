import axios from "axios";
import { GET_PROJECTS, DELETE_PROJECT, ADD_PROJECT } from "./types";

//GET PROJECTS
export const getProjects = () => dispatch => {
  axios
    .get("/api/projects/")
    .then(res => {
      dispatch({
        type: GET_PROJECTS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

//DELETE PROJECTS
export const deleteProject = id => dispatch => {
  axios
    .delete(`/api/projects/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_PROJECT,
        payload: id
      });
    })
    .catch(err => console.log(err));
};

//ADD PROJECTS
export const addProject = project => dispatch => {
  axios
    .post("/api/projects/", project)
    .then(res => {
      dispatch({
        type: ADD_PROJECT,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
