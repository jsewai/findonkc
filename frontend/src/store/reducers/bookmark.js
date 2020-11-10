import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
    bookmarkList: [],
    isLoading: false, 
    error: null,
}

const startBookmarkRequest = (state, action) => {
    return updateObject(state, {
        error: null,
        isLoading: true
    });
}

const getBookmarkSuccess = (state, action) => {
    return updateObject(state, {
        bookmarkList: action.bookmarkList,
        isLoading: false
    })
}

const getBookmarkFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        isLoading: false,
    })
}

const addBookmarkSuccess = (state, action) => {
    return updateObject(state, {
        isLoading: false
    })
}

const removeFromBookmark = (state, action) => {
    return updateObject(state, {
        isLoading: false
    })
}

const clearBookmarkList = (state) => {
    return updateObject(state, {
        bookmarkList: null,
    })
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.START_BOOKMARK_REQUEST: return startBookmarkRequest(state, action);
        case actionTypes.GET_BOOKMARK_SUCCESS: return getBookmarkSuccess(state, action);
        case actionTypes.GET_BOOKMARK_FAILURE: return getBookmarkFail(state, action);
        case actionTypes.ADD_TO_BOOKMARK_SUCCESS: return addBookmarkSuccess(state, action);
        case actionTypes.REMOVE_FROM_BOOKMARK: return removeFromBookmark(state, action);
        case actionTypes.CLEAR_BOOKMARK_LIST: return clearBookmarkList(state);
        default:
            return state;
    }
}

export default reducer;
