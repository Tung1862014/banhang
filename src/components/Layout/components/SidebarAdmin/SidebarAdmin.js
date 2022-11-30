import classNames from 'classnames/bind';

import styles from './SidebarAdmin.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faBars, faUsers, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Backup from '~/pages/Backup';
// import { faBars } from '@fortawesome/free-solid-svg-icons';
//import { useState } from 'react';

const cx = classNames.bind(styles);

function SidebarAdmin() {
    // const [menuIcon, setMenuIcon] = useState(false);
    // const handleClickClose = () => {
    //     console.log(document.querySelector('#sidebar-menu').interHTML);
    //     const icon_menu_close = document.getElementById('menu-mobile-input');
    //     const input_close = document.querySelector('#sidebar-menu');
    //     icon_menu_close.onclick = () => input_close;

    // };

    const [checkDownUp, setCheckDownUp] = useState(false);
    const [checkCategory, setCheckCategory] = useState(true);

    useEffect(() => {
        const pathId = window.location.pathname.toString();
        const resultId = pathId.slice(14);
        if (checkCategory === true) {
            if (resultId === 'customer=all') {
                handleClickCategory1Statistical(checkCategory);
            } else if (resultId === 'seller=all') {
                handleClickCategory1Shop(checkCategory);
            } else if (resultId === 'se/seller=all') {
                handleClickAdvertise(checkCategory);
            }
        }
    }, [checkCategory]);

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

    const handleClickCategory1Shop = (checkCategory) => {
        const itemLink1Statistical = document.getElementById('sidebar-submenu-item-link1-statistical');
        const itemLink1Shop = document.getElementById('sidebar-submenu-item-link1-shop');
        const itemLink1Infmation = document.getElementById('sidebar-submenu-item-link1-quangba');

        itemLink1Statistical.style.color = 'var(--text-color)';
        itemLink1Shop.style.color = 'red';
        itemLink1Infmation.style.color = 'var(--text-color)';

        if (checkCategory === false) {
            const clickCategory = document.getElementById('sidebar-container');
            clickCategory.style.display = 'none';
            setCheckCategory(true);
        }
    };

    const handleClickCategory1Statistical = (checkCategory) => {
        const itemLink1Statistical = document.getElementById('sidebar-submenu-item-link1-statistical');
        const itemLink1Shop = document.getElementById('sidebar-submenu-item-link1-shop');
        const itemLink1Infmation = document.getElementById('sidebar-submenu-item-link1-quangba');

        itemLink1Statistical.style.color = 'red';
        itemLink1Shop.style.color = 'var(--text-color)';
        itemLink1Infmation.style.color = 'var(--text-color)';

        if (checkCategory === false) {
            const clickCategory = document.getElementById('sidebar-container');
            clickCategory.style.display = 'none';
            setCheckCategory(true);
        }
    };

    const handleClickAdvertise = (checkCategory) => {
        const itemLink1Statistical = document.getElementById('sidebar-submenu-item-link1-statistical');
        const itemLink1Shop = document.getElementById('sidebar-submenu-item-link1-shop');
        const itemLink1Infmation = document.getElementById('sidebar-submenu-item-link1-quangba');

        itemLink1Statistical.style.color = 'var(--text-color)';
        itemLink1Shop.style.color = 'var(--text-color)';
        itemLink1Infmation.style.color = 'red';

        if (checkCategory === false) {
            const clickCategory = document.getElementById('sidebar-container');
            clickCategory.style.display = 'none';
            setCheckCategory(true);
        }
    };

    const handleClickCategory = () => {
        const clickCategory = document.getElementById('sidebar-container');
        //console.log('clickCategory', clickCategory);
        if (checkCategory === false) {
            clickCategory.style.display = 'none';
            setCheckCategory(true);
        } else {
            clickCategory.style.display = 'flex';
            setCheckCategory(false);
        }
    };

    const handleClickCloseCategory = () => {
        const clickCategory = document.getElementById('sidebar-container');
        if (checkCategory === false) {
            clickCategory.style.display = 'none';
            setCheckCategory(true);
        }
    };

    return (
        <aside className={cx('wrapper')}>
            <div className={cx('app-container')}>
                <div className={cx('sidebar-containerx')}>
                    <FontAwesomeIcon
                        className={cx('sidebar-svg-icon_3e8zgq')}
                        icon={faBars}
                        onClick={() => handleClickCategory()}
                    />
                    <div id="sidebar-container" className={cx('sidebar-container')}>
                        <div className={cx('sidebar')}>
                            <div className={cx('sidebar-icon_close')}>
                                <FontAwesomeIcon icon={faXmark} onClick={() => handleClickCloseCategory()} />
                            </div>
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
                                        <FontAwesomeIcon className={cx('sidebar-menu-item-icon')} icon={faUsers} />

                                        <span className={cx('sidebar-menu-item-text')}>Quản lý người dùng</span>
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
                                                to={'/admin/manage/customer=all'}
                                                id="sidebar-submenu-item-link1-statistical"
                                                className={cx('sidebar-submenu-item-link1-statistical')}
                                                onClick={() => handleClickCategory1Statistical(checkCategory)}
                                            >
                                                Người dùng
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
                                        <FontAwesomeIcon className={cx('sidebar-menu-item-icon')} icon={faUsers} />
                                        <span className={cx('sidebar-menu-item-text')}>Quản lý người bán</span>
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
                                                to="/admin/manage/seller=all"
                                                id="sidebar-submenu-item-link1-shop"
                                                className={cx('sidebar-submenu-item-link1-shop')}
                                                onClick={() => handleClickCategory1Shop(checkCategory)}
                                            >
                                                <span>Chủ gian hàng</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li id="quangba" className={cx('sidebar-menu-box')}>
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
                                        <FontAwesomeIcon className={cx('sidebar-menu-item-icon')} icon={faUsers} />
                                        <span className={cx('sidebar-menu-item-text')}>
                                            Quản lý thông tin làng nghề
                                        </span>
                                        <span className={cx('sidebar-menu-item-space')}></span>
                                        <FontAwesomeIcon
                                            id="sidebar-menu-item-collapse-down-quangba"
                                            className={cx('sidebar-menu-item-collapse-down-shop')}
                                            icon={faAngleDown}
                                        />
                                        <FontAwesomeIcon
                                            id="sidebar-menu-item-collapse-up-quangba"
                                            className={cx('sidebar-menu-item-collapse-up-shop')}
                                            icon={faAngleUp}
                                        />
                                    </div>
                                    <ul id="sidebar-submenu-quangba" className={cx('sidebar-submenu-shop')}>
                                        <li className={cx('sidebar-submenu-item')}>
                                            <Link
                                                to="/admin/advertise=all"
                                                id="sidebar-submenu-item-link1-quangba"
                                                className={cx('sidebar-submenu-item-link1-shop')}
                                                onClick={() => handleClickAdvertise(checkCategory)}
                                            >
                                                <span>Thông tin làng nghề</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <Backup />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default SidebarAdmin;
