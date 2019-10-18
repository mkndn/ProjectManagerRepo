import {
  GET_PROJECTS,
  DELETE_PROJECT,
  ADD_PROJECT,
  GET_PROJECT,
  UPDATE_PROJECT,
  UPDATE_SUCCESS
} from "../actions/types";

const initialState = {
  projects: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS:
    case UPDATE_SUCCESS:
      return {
        ...state,
        projects: action.payload
      };
    case GET_PROJECT:
      return {
        ...state,
        project: action.payload
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          project => project.id !== action.payload
        )
      };
    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload]
      };
    default:
      return state;
  }
}
