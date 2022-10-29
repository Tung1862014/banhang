import { combineReducers } from 'redux';
import numberProductReducer from './NumberProduct';
import searchProductReducer from './SearchProduct';
import detailProductReducer from './DetailProduct';
import cartProductReducer from './CartProduct';
import sidebarSellerReducer from './SidebarSeller';

const rootReducer = combineReducers({
    numberProduct: numberProductReducer,
    searchProduct: searchProductReducer,
    detailProduct: detailProductReducer,
    cartProduct: cartProductReducer,
    sidebarSeller: sidebarSellerReducer,
});
export default rootReducer;
