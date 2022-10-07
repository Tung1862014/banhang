import { combineReducers } from 'redux';
import numberProductReducer from './NumberProduct';
import searchProductReducer from './SearchProduct';
import detailProductReducer from './DetailProduct';

const rootReducer = combineReducers({
    numberProduct: numberProductReducer,
    searchProduct: searchProductReducer,
    detailProduct: detailProductReducer,
});
export default rootReducer;
