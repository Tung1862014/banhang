import { HeaderOnly } from '~/components/Layout';
import { DefaultLayoutSeller } from '~/components/Layout';

import Home from '~/pages/Home';
import SanPham from '~/pages/SanPham';
import Shop from '~/pages/Shop';
import GioHang from '~/pages/GioHang';
import Search from '~/pages/Search';
import Detail from '~/pages/Detail';
import Setting from '~/pages/Setting';
import Login from '~/pages/Login';
import Seller from '~/pages/Seller';
import Information from '~/pages/Information';
import config from '~/config';
import SellerSetting from '~/pages/SellerSetting';
import SellerProduct from '~/pages/SellerProduct';
import SellerAddProduct from '~/pages/SellerAddProduct';
import SellerUpdateProduct from '~/pages/SellerUpdateProduct';
import SellerCategoryAndWeight from '~/pages/SellerCategoryAndWeight';
import SellerBill from '~/pages/SellerBill';
import SellerDetailBill from '~/pages/SellerDetailBill';
import SellerPrintBill from '~/pages/SellerPrintBill';
import SellerShopReviews from '~/pages/SellerShopReviews';

const publicRoutes = [
    { path: '/', component: Home, layout: HeaderOnly },
    { path: '/search', component: Search },
    { path: '/search/@:idSP', component: Detail, layout: HeaderOnly },
    { path: config.routes.sanpham, component: SanPham },
    { path: '/shop/name=:id', component: Shop, layout: HeaderOnly },
    { path: '/giohang', component: GioHang, layout: HeaderOnly },
    { path: '/detail/product/nameid:id', component: Detail, layout: HeaderOnly },
    { path: '/user/setting', component: Setting },
    { path: '/@:nickname', component: Search, layout: null },
    { path: '/login', component: Login, layout: HeaderOnly },
    { path: '/gioithieu', component: Information, layout: HeaderOnly },
    { path: '/seller', component: Seller, layout: DefaultLayoutSeller },
    { path: '/seller/setting', component: SellerSetting, layout: DefaultLayoutSeller },
    { path: '/seller/product/@:id', component: SellerProduct, layout: DefaultLayoutSeller },
    { path: '/seller/product/insert', component: SellerAddProduct, layout: DefaultLayoutSeller },
    { path: '/seller/product/update/@:id', component: SellerUpdateProduct, layout: DefaultLayoutSeller },
    { path: '/seller/categoryandweight', component: SellerCategoryAndWeight, layout: DefaultLayoutSeller },
    { path: '/seller/bill/@:id', component: SellerBill, layout: DefaultLayoutSeller },
    { path: '/seller/bill/detail/@:id', component: SellerDetailBill, layout: DefaultLayoutSeller },
    { path: '/seller/bill/detail/print/@:id', component: SellerPrintBill, layout: null },
    { path: '/seller/shop/reviews/@:id', component: SellerShopReviews, layout: DefaultLayoutSeller },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
