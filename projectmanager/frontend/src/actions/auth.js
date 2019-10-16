import axios from 'axios'
import { USER_LOADING, USER_LOADED, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS } from "./types"


//LOAD USER
export const loadUser = (dispatch, getState) => {
    //USER LOADING
    dispatch({ type: USER_LOADING })

    axios.get("/api/auth/user", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

//LOGIN
export const login = (username, password) => {

    //Config Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = { username, password }

    axios.post("/api/auth/user", body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            dispatch({
                type: LOGIN_FAIL
            })
        })
}

//REGISTER
export const register = (first_name, last_name, username, password, email) => {

    //Config Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = { first_name, last_name, username, password, email }

    axios.post("/api/auth/register", body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            dispatch({
                type: REGISTER_FAIL
            })
        })
}

//LOGOUT
export const logout = (dispatch, getState) => {

    axios.post("/api/auth/logout", null, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS
            })
        }).catch(err => console.log(err));
}

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

}