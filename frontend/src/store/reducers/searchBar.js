import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    isFetching: false,
    result: [],
    keyword: "",
}

const setSearchKeyword = (state, action) => {
    return updateObject(state, {
        keyword: action.keyword,
    });
}

const getPostingRequest = (state, action) => {
    return updateObject(state, {
        isFetching: true,
        result: [],
        keyword: action.keyword,
    });
}

const getPostingSuccess = (state, action) => {
    return updateObject(state, {
        isFetching: false,
        result: action.data
    });
}

const getPostingFailure = (state, action) => {
    return updateObject(state, {
        isFetching: false,
        error: action.error
    });
}


const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_POSTING_REQUEST: return getPostingRequest(state, action);
        case actionTypes.SET_SEARCH_KEYWORD: return setSearchKeyword(state, action);
        case actionTypes.GET_POSTING_SUCCESS: return getPostingSuccess(state, action);
        case actionTypes.GET_POSTING_FAILURE: return getPostingFailure(state, action);
        default:
            return state;
    }
}

export default reducer;