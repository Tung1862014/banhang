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
import styles from './Sidebar.module.scss';
import config from '~/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
//mport { useState } from 'react';

const cx = classNames.bind(styles);

function Sidebar() {
    //const [menuIcon, setMenuIcon] = useState(false);
    const handleClickClose = () => {
        console.log(document.querySelector('#sidebar-menu').interHTML);
    };
    return (
        <aside className={cx('wrapper')}>
            <nav className={cx('menu-icon')}>
                <label htmlFor="menu-mobile-input" className={cx('menu-mobile-input')}>
                    <FontAwesomeIcon icon={faBars} />
                </label>
                <input type="checkbox" hidden className={cx('sidebar-menu')} id="menu-mobile-input" />

                {/* {menuIcon && clickMenu && ( */}
                <div className={cx('wrapper-icon')}>
                    <label htmlFor="menu-mobile-input">
                        <CloseIcon className={cx('icon-close')} />
                    </label>
                    <Menu>
                        <MenuItem
                            title="For You"
                            to={config.routes.home}
                            icon={<HomeIcon className={cx('icon-size')} />}
                            activeIcon={<HomeActiveIcon className={cx('icon-size')} />}
                            onClick={() => handleClickClose()}
                        />
                        <MenuItem
                            title="Following"
                            to={config.routes.sanpham}
                            icon={<UserGroupIcon className={cx('icon-size')} />}
                            activeIcon={<UserGroupActiveIcon className={cx('icon-size')} />}
                            // onClick={() => setClickMenu(false)}
                            onClick={() => handleClickClose()}
                        />
                        <MenuItem
                            title="Live"
                            to={config.routes.phukien}
                            icon={<LiveIcon className={cx('icon-size')} />}
                            activeIcon={<LiveActiveIcon className={cx('icon-size')} />}
                        />
                    </Menu>
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
