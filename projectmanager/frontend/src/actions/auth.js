import axios from "axios";
import {
  USER_LOADING,
  USER_LOADED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS
} from "./types";

//LOAD USER
export const loadUser = () => (dispatch, getState) => {
  //USER LOADING
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

//LOGIN
export const login = (username, password) => {
  //Config Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ username, password });

  axios
    .post("/api/auth/login", body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

//REGISTER
export const register = ({
  username,
  password,
  email,
  first_name,
  last_name,
  date_of_birth
}) => dispatch => {
  //Config Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = {
    username,
    password,
    email,
    first_name,
    last_name,
    date_of_birth
  };

  console.log(body);

  axios
    .post("/api/auth/register", body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

//LOGOUT
export const logout = () => (dispatch, getState) => {
  axios
    .post("/api/auth/logout", null, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: LOGOUT_SUCCESS
      });
    })
    .catch(err => console.log(err));
};

//Token Config
export const tokenConfig = getState => {
  //GET TOKEN
  const token = getState().auth.token;

  //Config Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (token) {
    config.headers["authorization"] = `token ${token}`;
  }

  return config;
};
