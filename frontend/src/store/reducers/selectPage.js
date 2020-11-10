import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    craigslist: {title: 'Craigslist', isSelected: true},
    kijiji: {title: 'Kijiji', isSelected: true},
}

const selectCraigslist = (state, action) => {
    return updateObject(state, {
        craigslist: {title: 'Craigslist', isSelected: true}
    });
}

const not_selectCraigslist = (state, action) => {
    return updateObject(state, {
        craigslist: {title: 'Craigslist', isSelected:false}
    });
}

const selectKijiji = (state, action) => {
    return updateObject(state, {
        kijiji: {title: 'Kijiji', isSelected:true}
    });
}

const not_selectKijiji = (state, action) => {
    return updateObject(state, {
        kijiji: {title: 'Kijiji', isSelected:false}
    });
}

const reducer = (state=initialState, action) => {
    
    switch (action.type) {
        case actionTypes.SELECT_CRAIGSLIST: return selectCraigslist(state, action);
        case actionTypes.NOT_SELECT_CRAIGSLIST: return not_selectCraigslist(state, action);
        case actionTypes.SELECT_KIJIJI: return selectKijiji(state, action);
        case actionTypes.NOT_SELECT_KIJIJI: return not_selectKijiji(state, action);
        
        default:
            return state;
    }
}

export default reducer;
