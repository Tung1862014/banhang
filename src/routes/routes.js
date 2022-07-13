import { HeaderOnly } from '~/components/Layout';

import Home from '~/pages/Home';
import SanPham from '~/pages/SanPham';
import PhuKien from '~/pages/PhuKien';
import GioHang from '~/pages/GioHang';
import Search from '~/pages/Search';
import Login from '~/pages/Login';
import config from '~/config';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: '/search', component: Home },
    { path: config.routes.sanpham, component: SanPham },
    { path: config.routes.phukien, component: PhuKien },
    { path: '/giohang', component: GioHang, layout: HeaderOnly },
    { path: '/@:nickname', component: Search, layout: null },
    { path: '/login', component: Login, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
