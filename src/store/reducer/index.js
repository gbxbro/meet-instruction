import { combineReducers } from 'redux';

import layoutSlice from '../../features/layout/reducer';

const rootReducer = combineReducers({
    layout: layoutSlice
});

export default rootReducer;
