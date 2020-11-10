import axios from 'axios';
import * as actionTypes from './actionTypes';

const BASE_API_URL = `${process.env.REACT_APP_HOST_IP_ADDRESS}/api/user`;

const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

 const authSuccess = (token, user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    user: user
  }
}

 const authFail = (error, response) => {

  response = !!response ? response[0].charAt(0).toUpperCase() + response[0].slice(1) : response
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
    errorDetail: response
  }
}

const loginFail = error => {
  return {
    type: actionTypes.LOGIN_FAIL,
    error: error
  }
}

const authLogOut = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const logout = () => {

  return async (dispatch) => {
    const token = localStorage.getItem('token');
    await axios
    .post(`${BASE_API_URL}/logout/`,null, {
      headers: {
        'Authorization': `Token ${token}`
      }
    }
    )
    .then((res) => {
      localStorage.removeItem('token');
      localStorage.removeItem('expirationDate');
      dispatch(authLogOut());
    })
    .catch((err) => {
      dispatch(authFail(err));
    });
  }
}

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000)
  }
}

export const authLogin = (payload) => {
  return async dispatch => {
    dispatch(authStart());
    await axios.post(`${BASE_API_URL}/login/`,
      payload
    )
      .then(res => {
        // const token = res.data.key;
        const token = res.data.token;
        const user = res.data.user;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationDate', expirationDate);
        dispatch(authSuccess(token, user));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(loginFail(err))
      })
  }
}

export const authSignup = (payload) => {
  return async dispatch => {
    dispatch(authStart());
    await axios.post(`${BASE_API_URL}/create/`,
      payload
    )
      .then(res => {
        const token = res.data.token;
        const user = res.data.user;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationDate', expirationDate);
        dispatch(authSuccess(token, user));
        dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        dispatch(authFail(err,err.response.data.email))
      })
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (token === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  }
}
