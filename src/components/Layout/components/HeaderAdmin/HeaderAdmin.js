import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';
//import axios from 'axios';

import styles from './HeaderAdmin.module.scss';

import Menu from '~/components/Popper/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faEarthAsia, faGear, faSignOut } from '@fortawesome/free-solid-svg-icons';

import GetCookie from '~/components/Hook/GetCookies';
import RemoveCookie from '~/components/Hook/RemoveCookies';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Languare',
            data: [
                {
                    code: 'en',
                    title: 'English',
                    type: 'language',
                },
                {
                    code: 'vn',
                    title: 'Tiếng Việt',
                    type: 'language',
                },
            ],
        },
    },
];

function HeaderAdmin() {
    //const [imageValue, setImageValue] = useState('');

    const userMenuSeller = [
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Thông tin tài khoản',
            to: `/setting/admin`,
            separate: true,
            setting: true,
        },
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            href: process.env.REACT_APP_URL_FRONTEND,
            separate: true,
            onclick: () => RemoveCookie('admin'),
        },
    ];

    return (
        <>
            <header className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('action')}>
                        <img
                            src={
                                JSON.parse(GetCookie('admin')).ND_image !== undefined
                                    ? JSON.parse(GetCookie('admin')).ND_image
                                    : 'https://cf.shopee.vn/file/fe9caaa8038750bd54a597e145ae3207'
                            }
                            className={cx('account-avatar')}
                            alt=""
                        />

                        {GetCookie('admin') && (
                            <Menu items={GetCookie('admin') !== undefined ? userMenuSeller : MENU_ITEMS}>
                                {GetCookie('admin') && (
                                    <div>
                                        <h3>
                                            {' '}
                                            {'Xin chào ' + JSON.parse(GetCookie('admin')).ND_hoten}
                                            <FontAwesomeIcon className={cx('icon-seller')} icon={faCaretDown} />
                                        </h3>
                                    </div>
                                )}
                            </Menu>
                        )}
                    </div>
                </div>
            </header>
            <ToastContainer />
        </>
    );
}

export default HeaderAdmin;
