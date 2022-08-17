import { HeaderOnly } from '~/components/Layout';
import { DefaultLayoutSeller } from '~/components/Layout';

import Home from '~/pages/Home';
import SanPham from '~/pages/SanPham';
import PhuKien from '~/pages/PhuKien';
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

const publicRoutes = [
    { path: '/', component: Home, layout: HeaderOnly },
    { path: '/search', component: Search },
    { path: '/search/@:idSP', component: Detail },
    { path: config.routes.sanpham, component: SanPham },
    { path: config.routes.phukien, component: PhuKien },
    { path: '/giohang', component: GioHang, layout: HeaderOnly },
    { path: '/sanpham/@:idSP', component: Detail },
    { path: '/user/setting', component: Setting },
    { path: '/@:nickname', component: Search, layout: null },
    { path: '/login', component: Login, layout: HeaderOnly },
    { path: '/gioithieu', component: Information, layout: HeaderOnly },
    { path: '/seller', component: Seller, layout: DefaultLayoutSeller },
    { path: '/seller/setting', component: SellerSetting, layout: DefaultLayoutSeller },
    { path: '/seller/product', component: SellerProduct, layout: DefaultLayoutSeller },
    { path: '/seller/product/insert', component: SellerAddProduct, layout: DefaultLayoutSeller },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
