import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';
//import axios from 'axios';

import styles from './HeaderSeller.module.scss';

import Menu from '~/components/Popper/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faGear, faSignOut } from '@fortawesome/free-solid-svg-icons';

import GetCookie from '~/components/Hook/GetCookies';
import RemoveCookie from '~/components/Hook/RemoveCookies';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function HeaderSeller() {
    //const [imageValue, setImageValue] = useState('');
    const [establish, setEstablished] = useState('');
    const userMenuSeller = [
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Thông tin tài khoản',
            href: `/seller/setting/account`,
            separate: true,
            settingsell: true,
        },
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            href: process.env.REACT_APP_URL_FRONTEND,
            separate: true,
            onclick: () => RemoveCookie('seller'),
        },
    ];

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_URL_NODEJS}/seller/show/account?ND_id=${
                    JSON.parse(GetCookie('seller')).ND_id
                }`,
            )

            .then((res) => {
                console.log(res.data.result);

                setEstablished(res.data.result);
            })
            .catch(() => {
                console.log('loi khong the show anh');
            });
    }, []);

    return (
        <>
            <header className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('action')}>
                        {establish !== '' && establish !== undefined ? (
                            <img src={establish.ND_image} className={cx('account-avatar')} alt="" />
                        ) : (
                            <img
                                src={
                                    JSON.parse(GetCookie('seller')).ND_image !== undefined
                                        ? JSON.parse(GetCookie('seller')).ND_image
                                        : 'https://cf.shopee.vn/file/fe9caaa8038750bd54a597e145ae3207'
                                }
                                className={cx('account-avatar')}
                                alt=""
                            />
                        )}
                        {GetCookie('seller') && (
                            <Menu items={GetCookie('seller') !== undefined ? userMenuSeller : ''}>
                                {GetCookie('seller') && (
                                    <div>
                                        <h3>
                                            {' '}
                                            {establish !== '' && establish !== undefined
                                                ? establish.ND_hoten
                                                : 'Xin chào ' + JSON.parse(GetCookie('seller')).ND_hoten}
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

export default HeaderSeller;
