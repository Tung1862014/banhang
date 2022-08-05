import { combineReducers } from 'redux';
import signinReducer from './SignIn';

const rootReducer = combineReducers({
    signin: signinReducer,
});
export default rootReducer;
