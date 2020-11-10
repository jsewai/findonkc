import { combineReducers } from 'redux';
import auth from './auth';
import selectPage from './selectPage';
import searchBar from './searchBar';
import bookmark from './bookmark';

const reducer = combineReducers({
    auth,
    selectPage,
    searchBar,
    bookmark,
});

export default reducer;