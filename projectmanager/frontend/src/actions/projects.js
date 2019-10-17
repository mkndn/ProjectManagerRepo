import axios from "axios";
import { GET_PROJECTS, DELETE_PROJECT, ADD_PROJECT } from "./types";
import { tokenConfig } from "./auth";

//GET PROJECTS
export const getProjects = () => (dispatch, getState) => {
  axios
    .get("/api/projects/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_PROJECTS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

//GET PROJECT
export const getProject = id => (dispatch, getState) => {
  axios
    .delete(`/api/projects/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_PROJECT,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

//DELETE PROJECTS
export const deleteProject = id => (dispatch, getState) => {
  axios
    .delete(`/api/projects/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: DELETE_PROJECT,
        payload: id
      });
    })
    .catch(err => console.log(err));
};

//ADD PROJECTS
export const addProject = project => (dispatch, getState) => {
  axios
    .post("/api/projects/", project, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: ADD_PROJECT,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
