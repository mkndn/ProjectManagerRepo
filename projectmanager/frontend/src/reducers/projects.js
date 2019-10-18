import {
  GET_PROJECTS,
  DELETE_PROJECT,
  ADD_PROJECT,
  GET_PROJECT,
  UPDATE_PROJECT
} from "../actions/types";

const initialState = {
  projects: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload
      };
    case GET_PROJECT:
      return {
        ...state,
        projects: action.payload
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          project => project.id !== action.payload
        )
      };
    case ADD_PROJECT:
    case UPDATE_PROJECT:
      return {
        ...state
      };
    default:
      return state;
  }
}
