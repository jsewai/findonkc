import axios from 'axios';
import * as actionTypes from './actionTypes';

const BOOKMARK_REQUEST_URL = `${process.env.REACT_APP_HOST_IP_ADDRESS}/api/bookmark/`;

export const startBookmarkRequest = () => {
    return {
        type: actionTypes.START_BOOKMARK_REQUEST
    }
}

const removedBookmarkFromlist = (bookmarkList) => {
    return {
        type: actionTypes.REMOVE_FROM_BOOKMARK,
        bookmarkList: bookmarkList
    }
}

export const getBookmarkSuccess = (bookmarkList) => {
    return {
        type: actionTypes.GET_BOOKMARK_SUCCESS,
        bookmarkList: bookmarkList
    }
}

export const getBookmarkFail = (error) => {
    return {
        type: actionTypes.GET_BOOKMARK_FAILURE,
        error: error
    }
}

export const addBookmarkSuccess = () => {
    return {
        type: actionTypes.ADD_TO_BOOKMARK_SUCCESS
    }
}

export const clearBookmarkList = () => {
    return {
        type: actionTypes.CLEAR_BOOKMARK_LIST
    }
}

export const getBookmark = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === undefined) {
            dispatch(getBookmarkFail("No Token"));
        } else {
            axios.get(BOOKMARK_REQUEST_URL,{
                headers: {
                    Authorization: 'Token ' + token 
                  }
            })
            .then(res => {
              dispatch(getBookmarkSuccess(res.data))
            })
            .catch(err => {
              dispatch(getBookmarkFail(err))
            })
        }
    }
}

export const addBookmark = (payload) => {
    return dispatch => {
        dispatch(startBookmarkRequest());
        const token = localStorage.getItem('token');
        if (token === undefined) {
            dispatch(getBookmarkFail("No Token"));
        } else {
            axios.post(`${BOOKMARK_REQUEST_URL}add/`,
                payload,
                {
                    headers: {
                        'Authorization': 'Token ' + token 
                      }
                }
            )
            .then(res => {
              dispatch(addBookmarkSuccess())
            })
            .catch(err => {
              dispatch(getBookmarkFail(err))
            })
        }
    }
}


export const removeBookmark = (pk) => {
    return dispatch => {
        dispatch(startBookmarkRequest());
        const token = localStorage.getItem('token');
        if (token === undefined) {
            dispatch(getBookmarkFail("No Token"));
        } else {
            axios.delete(`${BOOKMARK_REQUEST_URL}delete/${pk}/`,
                {
                    headers: {
                        'Authorization': 'Token ' + token 
                      }
                }
            )
            .then(res => {
              dispatch(removedBookmarkFromlist())
              dispatch(getBookmark())
            })
            .catch(err => {
              dispatch(getBookmarkFail(err))
            })
        }
    }
}