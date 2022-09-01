import { combineReducers } from 'redux';
import numberProductReducer from './NumberProduct';

const rootReducer = combineReducers({
    numberProduct: numberProductReducer,
});
export default rootReducer;
