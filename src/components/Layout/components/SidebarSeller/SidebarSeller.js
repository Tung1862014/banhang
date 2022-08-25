import classNames from 'classnames/bind';
import {
    HomeIcon,
    HomeActiveIcon,
    UserGroupIcon,
    UserGroupActiveIcon,
    LiveIcon,
    LiveActiveIcon,
    CloseIcon,
} from '~/components/Icons';
import Menu from './Menu';
import MenuItem from './Menu/MenuItem';
import styles from './SidebarSeller.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
//import { useState } from 'react';

const cx = classNames.bind(styles);

function Sidebar() {
    // const [menuIcon, setMenuIcon] = useState(false);
    const handleClickClose = () => {
        console.log(document.querySelector('#sidebar-menu').interHTML);
        const icon_menu_close = document.getElementById('menu-mobile-input');
        const input_close = document.querySelector('#sidebar-menu');
        icon_menu_close.onclick = () => input_close;
    };
    return (
        <aside className={cx('wrapper')}>
            <nav className={cx('menu-icon')}>
                <label htmlFor="menu-mobile-input" className={cx('menu-mobile-input')}>
                    <FontAwesomeIcon icon={faBars} className={cx('menu-mobile-input-icon')} />
                </label>
                <input type="checkbox" hidden className={cx('sidebar-menu')} id="menu-mobile-input" />

                {/* {menuIcon && clickMenu && ( */}
                <div id="menu-mobile-input" className={cx('wrapper-icon')}>
                    <label htmlFor="menu-mobile-input">
                        <CloseIcon className={cx('icon-close')} />
                    </label>
                    <div className={cx('menu-sidebar')}>
                        <Menu>
                            <MenuItem
                                title="Shop của bạn"
                                to={'/seller'}
                                icon={<HomeIcon className={cx('icon-size')} />}
                                activeIcon={<HomeActiveIcon className={cx('icon-size')} />}
                                //onclick={handleClickClose}
                            />
                            <MenuItem
                                title="Thiết lập shop"
                                to={'/seller/setting'}
                                icon={<HomeIcon className={cx('icon-size')} />}
                                activeIcon={<HomeActiveIcon className={cx('icon-size')} />}
                                //onclick={handleClickClose}
                            />
                            <MenuItem
                                title="Quản lý sản phẩm"
                                to={'/seller/product'}
                                icon={<UserGroupIcon className={cx('icon-size')} />}
                                activeIcon={<UserGroupActiveIcon className={cx('icon-size')} />}
                                // onClick={() => setClickMenu(false)}
                                onclick={handleClickClose}
                            />
                            <MenuItem
                                title="Đơn hàng"
                                to={'/seller/bill'}
                                icon={<LiveIcon className={cx('icon-size')} />}
                                activeIcon={<LiveActiveIcon className={cx('icon-size')} />}
                            />
                            <MenuItem
                                title="Quản lý danh mục và trong lượng"
                                to={'/seller/categoryandweight'}
                                icon={<LiveIcon className={cx('icon-size')} />}
                                activeIcon={<LiveActiveIcon className={cx('icon-size')} />}
                            />
                            <MenuItem
                                title="Đánh giá shop"
                                to={'/seller/shop/reviews'}
                                icon={<LiveIcon className={cx('icon-size')} />}
                                activeIcon={<LiveActiveIcon className={cx('icon-size')} />}
                            />
                        </Menu>
                    </div>
                </div>
            </nav>
            {/* )} */}
            {/* {!menuIcon && !clickMenu && (
                <aside className={cx('wrapper')}>
                    <Menu>
                        <MenuItem
                            title="For You"
                            to={config.routes.home}
                            icon={<HomeIcon className={cx('icon-size')} />}
                            activeIcon={<HomeActiveIcon className={cx('icon-size')} />}
                        />
                        <MenuItem
                            title="Following"
                            to={config.routes.sanpham}
                            icon={<UserGroupIcon className={cx('icon-size')} />}
                            activeIcon={<UserGroupActiveIcon className={cx('icon-size')} />}
                        />
                        <MenuItem
                            title="Live"
                            to={config.routes.phukien}
                            icon={<LiveIcon className={cx('icon-size')} />}
                            activeIcon={<LiveActiveIcon className={cx('icon-size')} />}
                        />
                    </Menu>
                </aside>
            )} */}
        </aside>
    );
}

export default Sidebar;
