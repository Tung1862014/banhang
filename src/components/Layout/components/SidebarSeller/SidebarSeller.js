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
import {
    faAngleDown,
    faAngleUp,
    faClipboardList,
    faIndustry,
    faMoneyCheck,
    faReceipt,
    faShop,
    faStar,
    faStore,
} from '@fortawesome/free-solid-svg-icons';
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
        const resultId = pathId.slice(7);
        if (resultId === '') {
            handleClickCategory1Statistical();
        } else if (resultId === '/setting') {
            handleClickCategory1Shop();
        } else if (resultId === '/product/@all') {
            handleClickCategory1();
        } else if (resultId === '/product/insert') {
            handleClickCategory2();
        } else if (resultId === '/bill/@all') {
            handleClickCategoryOrder1();
        } else if (resultId === '/bill/@canceloder') {
            handleClickCategoryOrder2();
        } else if (resultId === '/categoryandweight') {
            handleClickCategory1Weight();
        } else if (resultId === '/shop/reviews/@all') {
            handleClickCategory1Evaluate();
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
        const itemLink1Statistical = document.getElementById('sidebar-submenu-item-link1-statistical');
        const itemLink1Shop = document.getElementById('sidebar-submenu-item-link1-shop');
        const itemLink1 = document.getElementById('sidebar-submenu-item-link1');
        const itemLink2 = document.getElementById('sidebar-submenu-item-link2');
        const itemLink1Order = document.getElementById('sidebar-submenu-item-link1-order');
        const itemLink2Order = document.getElementById('sidebar-submenu-item-link2-order');
        const itemLink1Weight = document.getElementById('sidebar-submenu-item-link1-weight');
        const itemLink1evaluate = document.getElementById('sidebar-submenu-item-link1-evaluate');

        itemLink1Statistical.style.color = 'var(--text-color)';
        itemLink1Shop.style.color = 'var(--text-color)';
        itemLink1.style.color = 'red';
        itemLink2.style.color = 'var(--text-color)';
        itemLink1Order.style.color = 'var(--text-color)';
        itemLink2Order.style.color = 'var(--text-color)';
        itemLink1Weight.style.color = 'var(--text-color)';
        itemLink1evaluate.style.color = 'var(--text-color)';
    };

    const handleClickCategory2 = () => {
        const itemLink1Statistical = document.getElementById('sidebar-submenu-item-link1-statistical');
        const itemLink1Shop = document.getElementById('sidebar-submenu-item-link1-shop');
        const itemLink1 = document.getElementById('sidebar-submenu-item-link1');
        const itemLink2 = document.getElementById('sidebar-submenu-item-link2');
        const itemLink1Order = document.getElementById('sidebar-submenu-item-link1-order');
        const itemLink2Order = document.getElementById('sidebar-submenu-item-link2-order');
        const itemLink1Weight = document.getElementById('sidebar-submenu-item-link1-weight');
        const itemLink1evaluate = document.getElementById('sidebar-submenu-item-link1-evaluate');

        itemLink1Statistical.style.color = 'var(--text-color)';
        itemLink1Shop.style.color = 'var(--text-color)';
        itemLink1.style.color = 'var(--text-color)';
        itemLink2.style.color = 'red';
        itemLink1Order.style.color = 'var(--text-color)';
        itemLink2Order.style.color = 'var(--text-color)';
        itemLink1Weight.style.color = 'var(--text-color)';
        itemLink1evaluate.style.color = 'var(--text-color)';
    };

    const handleClickCategoryOrder1 = () => {
        const itemLink1Statistical = document.getElementById('sidebar-submenu-item-link1-statistical');
        const itemLink1Shop = document.getElementById('sidebar-submenu-item-link1-shop');
        const itemLink1 = document.getElementById('sidebar-submenu-item-link1');
        const itemLink2 = document.getElementById('sidebar-submenu-item-link2');
        const itemLink1Order = document.getElementById('sidebar-submenu-item-link1-order');
        const itemLink2Order = document.getElementById('sidebar-submenu-item-link2-order');
        const itemLink1Weight = document.getElementById('sidebar-submenu-item-link1-weight');
        const itemLink1evaluate = document.getElementById('sidebar-submenu-item-link1-evaluate');

        itemLink1Statistical.style.color = 'var(--text-color)';
        itemLink1Shop.style.color = 'var(--text-color)';
        itemLink1Order.style.color = 'red';
        itemLink2Order.style.color = 'var(--text-color)';
        itemLink1.style.color = 'var(--text-color)';
        itemLink2.style.color = 'var(--text-color)';
        itemLink1Weight.style.color = 'var(--text-color)';
        itemLink1evaluate.style.color = 'var(--text-color)';
    };

    const handleClickCategoryOrder2 = () => {
        const itemLink1Statistical = document.getElementById('sidebar-submenu-item-link1-statistical');
        const itemLink1Shop = document.getElementById('sidebar-submenu-item-link1-shop');
        const itemLink1 = document.getElementById('sidebar-submenu-item-link1');
        const itemLink2 = document.getElementById('sidebar-submenu-item-link2');
        const itemLink1Order = document.getElementById('sidebar-submenu-item-link1-order');
        const itemLink2Order = document.getElementById('sidebar-submenu-item-link2-order');
        const itemLink1Weight = document.getElementById('sidebar-submenu-item-link1-weight');
        const itemLink1evaluate = document.getElementById('sidebar-submenu-item-link1-evaluate');

        itemLink1Statistical.style.color = 'var(--text-color)';
        itemLink1Shop.style.color = 'var(--text-color)';
        itemLink1Order.style.color = 'var(--text-color)';
        itemLink2Order.style.color = 'red';
        itemLink1.style.color = 'var(--text-color)';
        itemLink2.style.color = 'var(--text-color)';
        itemLink1Weight.style.color = 'var(--text-color)';
        itemLink1evaluate.style.color = 'var(--text-color)';
    };

    const handleClickCategory1Shop = () => {
        const itemLink1Statistical = document.getElementById('sidebar-submenu-item-link1-statistical');
        const itemLink1Shop = document.getElementById('sidebar-submenu-item-link1-shop');
        const itemLink1 = document.getElementById('sidebar-submenu-item-link1');
        const itemLink2 = document.getElementById('sidebar-submenu-item-link2');
        const itemLink1Order = document.getElementById('sidebar-submenu-item-link1-order');
        const itemLink2Order = document.getElementById('sidebar-submenu-item-link2-order');
        const itemLink1Weight = document.getElementById('sidebar-submenu-item-link1-weight');
        const itemLink1evaluate = document.getElementById('sidebar-submenu-item-link1-evaluate');

        itemLink1Statistical.style.color = 'var(--text-color)';
        itemLink1Shop.style.color = 'red';
        itemLink1Order.style.color = 'var(--text-color)';
        itemLink2Order.style.color = 'var(--text-color)';
        itemLink1.style.color = 'var(--text-color)';
        itemLink2.style.color = 'var(--text-color)';
        itemLink1Weight.style.color = 'var(--text-color)';
        itemLink1evaluate.style.color = 'var(--text-color)';
    };

    const handleClickCategory1Statistical = () => {
        const itemLink1Statistical = document.getElementById('sidebar-submenu-item-link1-statistical');
        const itemLink1Shop = document.getElementById('sidebar-submenu-item-link1-shop');
        const itemLink1 = document.getElementById('sidebar-submenu-item-link1');
        const itemLink2 = document.getElementById('sidebar-submenu-item-link2');
        const itemLink1Order = document.getElementById('sidebar-submenu-item-link1-order');
        const itemLink2Order = document.getElementById('sidebar-submenu-item-link2-order');
        const itemLink1Weight = document.getElementById('sidebar-submenu-item-link1-weight');
        const itemLink1evaluate = document.getElementById('sidebar-submenu-item-link1-evaluate');

        itemLink1Statistical.style.color = 'red';
        itemLink1Shop.style.color = 'var(--text-color)';
        itemLink1Order.style.color = 'var(--text-color)';
        itemLink2Order.style.color = 'var(--text-color)';
        itemLink1.style.color = 'var(--text-color)';
        itemLink2.style.color = 'var(--text-color)';
        itemLink1Weight.style.color = 'var(--text-color)';
        itemLink1evaluate.style.color = 'var(--text-color)';
    };

    const handleClickCategory1Weight = () => {
        const itemLink1Statistical = document.getElementById('sidebar-submenu-item-link1-statistical');
        const itemLink1Shop = document.getElementById('sidebar-submenu-item-link1-shop');
        const itemLink1 = document.getElementById('sidebar-submenu-item-link1');
        const itemLink2 = document.getElementById('sidebar-submenu-item-link2');
        const itemLink1Order = document.getElementById('sidebar-submenu-item-link1-order');
        const itemLink2Order = document.getElementById('sidebar-submenu-item-link2-order');
        const itemLink1Weight = document.getElementById('sidebar-submenu-item-link1-weight');
        const itemLink1evaluate = document.getElementById('sidebar-submenu-item-link1-evaluate');

        itemLink1Statistical.style.color = 'var(--text-color)';
        itemLink1Shop.style.color = 'var(--text-color)';
        itemLink1Order.style.color = 'var(--text-color)';
        itemLink2Order.style.color = 'var(--text-color)';
        itemLink1.style.color = 'var(--text-color)';
        itemLink2.style.color = 'var(--text-color)';
        itemLink1Weight.style.color = 'red';
        itemLink1evaluate.style.color = 'var(--text-color)';
    };

    const handleClickCategory1Evaluate = () => {
        const itemLink1Statistical = document.getElementById('sidebar-submenu-item-link1-statistical');
        const itemLink1Shop = document.getElementById('sidebar-submenu-item-link1-shop');
        const itemLink1 = document.getElementById('sidebar-submenu-item-link1');
        const itemLink2 = document.getElementById('sidebar-submenu-item-link2');
        const itemLink1Order = document.getElementById('sidebar-submenu-item-link1-order');
        const itemLink2Order = document.getElementById('sidebar-submenu-item-link2-order');
        const itemLink1Weight = document.getElementById('sidebar-submenu-item-link1-weight');
        const itemLink1evaluate = document.getElementById('sidebar-submenu-item-link1-evaluate');

        itemLink1Statistical.style.color = 'var(--text-color)';
        itemLink1Shop.style.color = 'var(--text-color)';
        itemLink1Order.style.color = 'var(--text-color)';
        itemLink2Order.style.color = 'var(--text-color)';
        itemLink1.style.color = 'var(--text-color)';
        itemLink2.style.color = 'var(--text-color)';
        itemLink1Weight.style.color = 'var(--text-color)';
        itemLink1evaluate.style.color = 'red';
    };

    return (
        <aside className={cx('wrapper')}>
            <div className={cx('app-container')}>
                <div className={cx('sidebar-container')}>
                    <div className={cx('sidebar-container')}>
                        <div className={cx('sidebar')}>
                            <ul className={cx('sidebar-menu')}>
                                <li id="statistical" className={cx('sidebar-menu-box')}>
                                    <div
                                        className={cx('sidebar-menu-item-statistical')}
                                        onClick={() =>
                                            handleCheckIcon(
                                                'sidebar-menu-item-collapse-down-statistical',
                                                'sidebar-menu-item-collapse-up-statistical',
                                                'sidebar-submenu-statistical',
                                            )
                                        }
                                    >
                                        {/* <img
                                            src="https://cf.shopee.vn/file/09759afab8ae066ca5e1630bc19133a1"
                                            alt=""
                                            className={cx('sidebar-menu-item-icon')}
                                        /> */}
                                        <FontAwesomeIcon className={cx('sidebar-menu-item-icon')} icon={faIndustry} />
                                        <span className={cx('sidebar-menu-item-text')}>Thống kê</span>
                                        <span className={cx('sidebar-menu-item-space')}></span>
                                        <FontAwesomeIcon
                                            id="sidebar-menu-item-collapse-down-statistical"
                                            className={cx('sidebar-menu-item-collapse-down-statistical')}
                                            icon={faAngleDown}
                                        />
                                        <FontAwesomeIcon
                                            id="sidebar-menu-item-collapse-up-statistical"
                                            className={cx('sidebar-menu-item-collapse-up-statistical')}
                                            icon={faAngleUp}
                                        />
                                    </div>
                                    <ul id="sidebar-submenu-statistical" className={cx('sidebar-submenu-statistical')}>
                                        <li className={cx('sidebar-submenu-item')}>
                                            <Link
                                                to="/seller"
                                                id="sidebar-submenu-item-link1-statistical"
                                                className={cx('sidebar-submenu-item-link1-statistical')}
                                                onClick={handleClickCategory1Statistical}
                                            >
                                                <span>Dữ Liệu</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li id="shop" className={cx('sidebar-menu-box')}>
                                    <div
                                        className={cx('sidebar-menu-item-shop')}
                                        onClick={() =>
                                            handleCheckIcon(
                                                'sidebar-menu-item-collapse-down-shop',
                                                'sidebar-menu-item-collapse-up-shop',
                                                'sidebar-submenu-shop',
                                            )
                                        }
                                    >
                                        {/* <img
                                            src="https://cf.shopee.vn/file/6b1ffcde1ff12621088110f419a5283a"
                                            alt=""
                                            className={cx('sidebar-menu-item-icon')}
                                        /> */}
                                        <FontAwesomeIcon className={cx('sidebar-menu-item-icon')} icon={faStore} />
                                        <span className={cx('sidebar-menu-item-text')}>Thiết Lập Gian Hàng</span>
                                        <span className={cx('sidebar-menu-item-space')}></span>
                                        <FontAwesomeIcon
                                            id="sidebar-menu-item-collapse-down-shop"
                                            className={cx('sidebar-menu-item-collapse-down-shop')}
                                            icon={faAngleDown}
                                        />
                                        <FontAwesomeIcon
                                            id="sidebar-menu-item-collapse-up-shop"
                                            className={cx('sidebar-menu-item-collapse-up-shop')}
                                            icon={faAngleUp}
                                        />
                                    </div>
                                    <ul id="sidebar-submenu-shop" className={cx('sidebar-submenu-shop')}>
                                        <li className={cx('sidebar-submenu-item')}>
                                            <Link
                                                to="/seller/setting"
                                                id="sidebar-submenu-item-link1-shop"
                                                className={cx('sidebar-submenu-item-link1-shop')}
                                                onClick={handleClickCategory1Shop}
                                            >
                                                <span>Hồ Sơ Gian Hàng</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
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
                                        {/* <img
                                            src="https://cf.shopee.vn/file/3fa3bdb20eb201ae3f157ee8d11a39d5"
                                            alt=""
                                            className={cx('sidebar-menu-item-icon')}
                                        /> */}
                                        <FontAwesomeIcon className={cx('sidebar-menu-item-icon')} icon={faReceipt} />
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
                                <li id="order" className={cx('sidebar-menu-box')}>
                                    <div
                                        className={cx('sidebar-menu-item-order')}
                                        onClick={() =>
                                            handleCheckIcon(
                                                'sidebar-menu-item-collapse-down-order',
                                                'sidebar-menu-item-collapse-up-order',
                                                'sidebar-submenu-order',
                                            )
                                        }
                                    >
                                        {/* <img
                                            src="https://cf.shopee.vn/file/f82f8ccb649afcdf4f07f1dd9c41bcb0"
                                            alt=""
                                            className={cx('sidebar-menu-item-icon')}
                                        /> */}
                                        <FontAwesomeIcon
                                            className={cx('sidebar-menu-item-icon')}
                                            icon={faClipboardList}
                                        />
                                        <span className={cx('sidebar-menu-item-text')}>Quản Lý Đơn Hàng</span>
                                        <span className={cx('sidebar-menu-item-space')}></span>
                                        <FontAwesomeIcon
                                            id="sidebar-menu-item-collapse-down-order"
                                            className={cx('sidebar-menu-item-collapse-down-order')}
                                            icon={faAngleDown}
                                        />
                                        <FontAwesomeIcon
                                            id="sidebar-menu-item-collapse-up-order"
                                            className={cx('sidebar-menu-item-collapse-up-order')}
                                            icon={faAngleUp}
                                        />
                                    </div>
                                    <ul id="sidebar-submenu-order" className={cx('sidebar-submenu-order')}>
                                        <li className={cx('sidebar-submenu-item')}>
                                            <Link
                                                to="/seller/bill/@all"
                                                id="sidebar-submenu-item-link1-order"
                                                className={cx('sidebar-submenu-item-link1-order')}
                                                onClick={handleClickCategoryOrder1}
                                            >
                                                <span>Tất Cả</span>
                                            </Link>
                                        </li>
                                        <li className={cx('sidebar-submenu-item')}>
                                            <Link
                                                to="/seller/bill/@canceloder"
                                                id="sidebar-submenu-item-link2-order"
                                                className={cx('sidebar-submenu-item-link2-order')}
                                                onClick={handleClickCategoryOrder2}
                                            >
                                                <span>Hủy Đơn</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li id="weight" className={cx('sidebar-menu-box')}>
                                    <div
                                        className={cx('sidebar-menu-item-weight')}
                                        onClick={() =>
                                            handleCheckIcon(
                                                'sidebar-menu-item-collapse-down-weight',
                                                'sidebar-menu-item-collapse-up-weight',
                                                'sidebar-submenu-weight',
                                            )
                                        }
                                    >
                                        {/* <img
                                            src="https://cf.shopee.vn/file/9f2ae273250a1a723d7d8892c9584c6d"
                                            alt=""
                                            className={cx('sidebar-menu-item-icon')}
                                        /> */}
                                        <FontAwesomeIcon className={cx('sidebar-menu-item-icon')} icon={faMoneyCheck} />
                                        <span className={cx('sidebar-menu-item-text')}>Quản Lý Danh Mục</span>
                                        <span className={cx('sidebar-menu-item-space')}></span>
                                        <FontAwesomeIcon
                                            id="sidebar-menu-item-collapse-down-weight"
                                            className={cx('sidebar-menu-item-collapse-down-weight')}
                                            icon={faAngleDown}
                                        />
                                        <FontAwesomeIcon
                                            id="sidebar-menu-item-collapse-up-weight"
                                            className={cx('sidebar-menu-item-collapse-up-weight')}
                                            icon={faAngleUp}
                                        />
                                    </div>
                                    <ul id="sidebar-submenu-weight" className={cx('sidebar-submenu-weight')}>
                                        <li className={cx('sidebar-submenu-item')}>
                                            <Link
                                                to="/seller/categoryandweight"
                                                id="sidebar-submenu-item-link1-weight"
                                                className={cx('sidebar-submenu-item-link1-weight')}
                                                onClick={handleClickCategory1Weight}
                                            >
                                                <span>Danh Mục</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li id="evaluate" className={cx('sidebar-menu-box')}>
                                    <div
                                        className={cx('sidebar-menu-item-evaluate')}
                                        onClick={() =>
                                            handleCheckIcon(
                                                'sidebar-menu-item-collapse-down-evaluate',
                                                'sidebar-menu-item-collapse-up-evaluate',
                                                'sidebar-submenu-evaluate',
                                            )
                                        }
                                    >
                                        {/* <img
                                            src="https://cf.shopee.vn/file/6b1ffcde1ff12621088110f419a5283a"
                                            alt=""
                                            className={cx('sidebar-menu-item-icon')}
                                        /> */}
                                        <FontAwesomeIcon className={cx('sidebar-menu-item-icon')} icon={faStar} />
                                        <span className={cx('sidebar-menu-item-text')}>Quản Lý Đánh Giá</span>
                                        <span className={cx('sidebar-menu-item-space')}></span>
                                        <FontAwesomeIcon
                                            id="sidebar-menu-item-collapse-down-evaluate"
                                            className={cx('sidebar-menu-item-collapse-down-evaluate')}
                                            icon={faAngleDown}
                                        />
                                        <FontAwesomeIcon
                                            id="sidebar-menu-item-collapse-up-evaluate"
                                            className={cx('sidebar-menu-item-collapse-up-evaluate')}
                                            icon={faAngleUp}
                                        />
                                    </div>
                                    <ul id="sidebar-submenu-evaluate" className={cx('sidebar-submenu-evaluate')}>
                                        <li className={cx('sidebar-submenu-item')}>
                                            <Link
                                                to="/seller/shop/reviews/@all"
                                                id="sidebar-submenu-item-link1-evaluate"
                                                className={cx('sidebar-submenu-item-link1-evaluate')}
                                                onClick={handleClickCategory1Evaluate}
                                            >
                                                <span>Đánh giá</span>
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
