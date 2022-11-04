import { HeaderOnly } from '~/components/Layout';
import { DefaultLayoutSeller } from '~/components/Layout';
import { DefaultLayoutAdmin } from '~/components/Layout';

import Home from '~/pages/Home';
import Introduce from '~/pages/Introduce';
// import SanPham from '~/pages/SanPham';
import Shop from '~/pages/Shop';
import Order from '~/pages/Order';
import Search from '~/pages/Search';
import Detail from '~/pages/Detail';
import Setting from '~/pages/Setting';
import Login from '~/pages/Login';
import Seller from '~/pages/Seller';
// import config from '~/config';
import SellerSetting from '~/pages/SellerSetting';
import SellerProduct from '~/pages/SellerProduct';
import SellerAddProduct from '~/pages/SellerAddProduct';
import SellerUpdateProduct from '~/pages/SellerUpdateProduct';
import SellerCategory from '~/pages/SellerCategory';
import SellerBill from '~/pages/SellerBill';
import SellerDetailBill from '~/pages/SellerDetailBill';
import SellerPrintBill from '~/pages/SellerPrintBill';
import SellerShopReviews from '~/pages/SellerShopReviews';
import Cart from '~/pages/Cart';
import HistoryBill from '~/pages/HistoryBill';
import LoginAdmin from '~/pages/LoginAdmin';
import ManageCustomer from '~/pages/ManageCustomer';
import ManageSeller from '~/pages/ManageSeller';
import Advertise from '~/pages/Advertise';
import AdvertiseAdd from '~/pages/AdvertiseAdd';
import AdvertiseUpdate from '~/pages/AdvertiseUpdate';
import SettingAdmin from '~/pages/SettingAdmin';
import SettingSeller from '~/pages/SettingSeller';

const publicRoutes = [
    { path: '/', component: Home, layout: HeaderOnly },
    { path: '/introduce', component: Introduce, layout: HeaderOnly },
    //{ path: '/search', component: Search, layout: HeaderOnly },
    { path: '/search/keyword:id', component: Search, layout: HeaderOnly },
    // { path: config.routes.sanpham, component: SanPham },
    { path: '/shop/name=:id', component: Shop, layout: HeaderOnly },
    { path: '/cart/order', component: Order, layout: HeaderOnly },
    { path: '/detail/product/nameid:id', component: Detail, layout: HeaderOnly },
    { path: '/user/setting/account', component: Setting, layout: HeaderOnly },
    { path: '/@:nickname', component: Search, layout: null },
    { path: '/login', component: Login, layout: HeaderOnly },
    { path: '/cart', component: Cart, layout: HeaderOnly },
    { path: '/history/purchase/type:id', component: HistoryBill, layout: HeaderOnly },
    { path: '/history/purchase/keys:id', component: HistoryBill, layout: HeaderOnly },
    { path: '/login/admin', component: LoginAdmin, layout: null },
    { path: '/admin/manage/customer=:id', component: ManageCustomer, layout: DefaultLayoutAdmin },
    { path: '/admin/manage/seller=:id', component: ManageSeller, layout: DefaultLayoutAdmin },
    { path: '/admin/advertise=:id', component: Advertise, layout: DefaultLayoutAdmin },
    { path: '/admin/add/advertise', component: AdvertiseAdd, layout: DefaultLayoutAdmin },
    { path: '/admin/update/advertise=:id', component: AdvertiseUpdate, layout: DefaultLayoutAdmin },
    { path: '/setting/admin', component: SettingAdmin, layout: DefaultLayoutAdmin },
    { path: '/seller', component: Seller, layout: DefaultLayoutSeller },
    { path: '/seller/setting', component: SellerSetting, layout: DefaultLayoutSeller },
    { path: '/seller/product/@:id', component: SellerProduct, layout: DefaultLayoutSeller },
    { path: '/seller/product/insert', component: SellerAddProduct, layout: DefaultLayoutSeller },
    { path: '/seller/product/update/@:id', component: SellerUpdateProduct, layout: DefaultLayoutSeller },
    { path: '/seller/category', component: SellerCategory, layout: DefaultLayoutSeller },
    { path: '/seller/bill/@:id', component: SellerBill, layout: DefaultLayoutSeller },
    { path: '/seller/bill/detail/@:id', component: SellerDetailBill, layout: DefaultLayoutSeller },
    { path: '/seller/bill/detail/print/@:id', component: SellerPrintBill, layout: null },
    { path: '/seller/shop/reviews/@:id', component: SellerShopReviews, layout: DefaultLayoutSeller },
    { path: '/seller/setting/account', component: SettingSeller, layout: DefaultLayoutSeller },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
