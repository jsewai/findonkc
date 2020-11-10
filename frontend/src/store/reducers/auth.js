import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    error: null,
    errorDetail: '',
    isLoading: false,
    isAuthenticated: false,
    user: "a",
    isLoginFail: false,
}

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        isLoading: true
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        user: action.user,
        error: null,
        isLoading: false,
        isAuthenticated: true,
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        errorDetail: action.errorDetail,
        isLoading: false,
        isAuthenticated: false
    });
}

const loginFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        isLoading: false,
        isAuthenticated: false,
        isLoginFail: true
    });
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        isAuthenticated: false,
        user: action.user
    });
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.LOGIN_FAIL: return loginFail(state, action);
        default:
            return state;
    }
}

export default reducer;
