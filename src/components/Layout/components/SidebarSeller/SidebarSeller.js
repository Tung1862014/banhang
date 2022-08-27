import classNames from 'classnames/bind';
// import {
//     HomeIcon,
//     HomeActiveIcon,
//     UserGroupIcon,
//     UserGroupActiveIcon,
//     LiveIcon,
//     LiveActiveIcon,
//     CloseIcon,
// } from '~/components/Icons';
// import Menu from './Menu';
// import MenuItem from './Menu/MenuItem';
import styles from './SidebarSeller.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { faBars } from '@fortawesome/free-solid-svg-icons';
//import { useState } from 'react';

const cx = classNames.bind(styles);

function Sidebar() {
    // const [menuIcon, setMenuIcon] = useState(false);
    // const handleClickClose = () => {
    //     console.log(document.querySelector('#sidebar-menu').interHTML);
    //     const icon_menu_close = document.getElementById('menu-mobile-input');
    //     const input_close = document.querySelector('#sidebar-menu');
    //     icon_menu_close.onclick = () => input_close;

    // };

    const [checkDownUp, setCheckDownUp] = useState(false);

    useEffect(() => {
        const pathId = window.location.pathname.toString();
        const resultId = pathId.slice(17);
        if (resultId === 'all') {
            handleClickCategory1();
        } else if (resultId === 'nsert') {
            handleClickCategory2();
        }
    }, []);

    const handleClickDownUpIcon = (idIcon1, idIcon2, sidebarIcon) => {
        const downIcon = document.getElementById(idIcon1);
        const upIcon = document.getElementById(idIcon2);
        const sidebar = document.getElementById(sidebarIcon);
        if (checkDownUp) {
            upIcon.style.display = 'inline-block';
            downIcon.style.display = 'none';
            sidebar.style.display = 'inline-block';
        } else {
            upIcon.style.display = 'none';
            downIcon.style.display = 'inline-block';
            sidebar.style.display = 'none';
        }
    };

    const handleCheckIcon = (idIcon1, idIcon2, sidebarIcon) => {
        setCheckDownUp((prev) => !prev);
        handleClickDownUpIcon(idIcon1, idIcon2, sidebarIcon);
    };

    const handleClickCategory1 = () => {
        const itemLink1 = document.getElementById('sidebar-submenu-item-link1');
        const itemLink2 = document.getElementById('sidebar-submenu-item-link2');

        itemLink1.style.color = 'red';
        itemLink2.style.color = 'var(--text-color)';
    };

    const handleClickCategory2 = () => {
        const itemLink1 = document.getElementById('sidebar-submenu-item-link1');
        const itemLink2 = document.getElementById('sidebar-submenu-item-link2');

        itemLink1.style.color = 'var(--text-color)';
        itemLink2.style.color = 'red';
    };

    return (
        <aside className={cx('wrapper')}>
            <div className={cx('app-container')}>
                <div className={cx('sidebar-container')}>
                    <div className={cx('sidebar-container')}>
                        <div className={cx('sidebar')}>
                            <ul className={cx('sidebar-menu')}>
                                <li id="product" className={cx('sidebar-menu-box')}>
                                    <div
                                        className={cx('sidebar-menu-item')}
                                        onClick={() =>
                                            handleCheckIcon(
                                                'sidebar-menu-item-collapse-down',
                                                'sidebar-menu-item-collapse-up',
                                                'sidebar-submenu',
                                            )
                                        }
                                    >
                                        <img
                                            src="https://cf.shopee.vn/file/3fa3bdb20eb201ae3f157ee8d11a39d5"
                                            alt=""
                                            className={cx('sidebar-menu-item-icon')}
                                        />
                                        <span className={cx('sidebar-menu-item-text')}>Quản Lý Sản Phẩm</span>
                                        <span className={cx('sidebar-menu-item-space')}></span>
                                        <FontAwesomeIcon
                                            id="sidebar-menu-item-collapse-down"
                                            className={cx('sidebar-menu-item-collapse-down')}
                                            icon={faAngleDown}
                                        />
                                        <FontAwesomeIcon
                                            id="sidebar-menu-item-collapse-up"
                                            className={cx('sidebar-menu-item-collapse-up')}
                                            icon={faAngleUp}
                                        />
                                    </div>
                                    <ul id="sidebar-submenu" className={cx('sidebar-submenu')}>
                                        <li className={cx('sidebar-submenu-item')}>
                                            <Link
                                                to="/seller/product/@all"
                                                id="sidebar-submenu-item-link1"
                                                className={cx('sidebar-submenu-item-link1')}
                                                onClick={handleClickCategory1}
                                            >
                                                <span>Tất Cả Sản Phẩm</span>
                                            </Link>
                                        </li>
                                        <li className={cx('sidebar-submenu-item')}>
                                            <Link
                                                to="/seller/product/insert"
                                                id="sidebar-submenu-item-link2"
                                                className={cx('sidebar-submenu-item-link2')}
                                                onClick={handleClickCategory2}
                                            >
                                                <span>Thêm Sản Phẩm</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* <nav className={cx('menu-icon')}>
                <label htmlFor="menu-mobile-input" className={cx('menu-mobile-input')}>
                    <FontAwesomeIcon icon={faBars} className={cx('menu-mobile-input-icon')} />
                </label>
                <input type="checkbox" hidden className={cx('sidebar-menu')} id="menu-mobile-input" />

               
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
                                to={'/seller/product/@all'}
                                icon={<UserGroupIcon className={cx('icon-size')} />}
                                activeIcon={<UserGroupActiveIcon className={cx('icon-size')} />}
                                // onClick={() => setClickMenu(false)}
                                onclick={handleClickClose}
                            />
                            <MenuItem
                                title="Đơn hàng"
                                to={`/seller/bill/@${'all'}`}
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
                                to={'/seller/shop/reviews/@all'}
                                icon={<LiveIcon className={cx('icon-size')} />}
                                activeIcon={<LiveActiveIcon className={cx('icon-size')} />}
                            />
                        </Menu>
                    </div>
                </div>
            </nav> */}
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
