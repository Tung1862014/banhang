import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import axios from 'axios';

import styles from './Header.module.scss';
import Search from '../Search';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAsia, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { CartIcon, InboxIcon } from '~/components/Icons';
import Image from '~/components/Image';
import { useState, useEffect } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import { useCallback } from 'react';
import SetCookie from './Hook/SetCookies';
import GetCookie from './Hook/GetCookies';
import RemoveCookie from './Hook/RemoveCookies';

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

function Header() {
    const [loginAvtice, setLoginAvtice] = useState(false);
    const [signUpAvtice, setSingUpAvtice] = useState(false);
    const [loginResult, setLoginResult] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/auth/login/success', {
            method: 'GET',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
            },
        })
            .then((response) => {
                if (response.status === 200) return response.json();
                throw new Error('authentication has been failed!');
            })
            .then((resObject) => {
                RemoveCookie('logout');
                SetCookie('logout', JSON.stringify(resObject.user));
                setUser(resObject.user);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const userMenu = [
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            href: 'http://localhost:3000/',
            separate: true,
            onclick: () => RemoveCookie('usrin'),
        },
    ];

    const userMenuLogout = [
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            href: 'http://localhost:3000/',
            separate: true,
            logoutuse: true,
        },
    ];

    const handleCloseLogin = useCallback(() => {
        setLoginAvtice((prev) => !prev);
    }, []);

    const handleClose = useCallback(() => {
        setLoginAvtice((prev) => !prev);
        setSingUpAvtice((prev) => !prev);
    }, []);

    const handleCloseSignUp = useCallback(() => {
        setSingUpAvtice((prev) => !prev);
    }, []);

    useEffect(() => {
        setLoginAvtice((prev) => !prev);

        // SetCookie('pass', loginResult));
    }, [loginResult]);

    //console.log('cookie: ' + JSON.parse(GetCookie('usrin')).tennd);

    function handleSubmitLogin(pass, email) {
        axios
            .post(`http://localhost:5000/staff/login`, { password: pass, email: email })
            .then((res) => {
                // handle success
                if (res.data.resultEmail.length > 0 && res.data.resultPassword.length > 0) {
                    RemoveCookie('usrin');
                    SetCookie('usrin', JSON.stringify(res.data.resultEmail[0]));
                    alert('Đăng nhập thành công');
                    setLoginResult([...loginResult, res.data]);
                } else if (res.data.resultEmail.length === 0) {
                    alert('Tài khoản không tồn tại');
                } else if (res.data.resultPassword.length === 0) {
                    alert('Mật khẩu không đúng');
                }
                console.log(res.data.resultEmail[0]);
            })
            .catch(() => {
                // handle error
                console.log('loiiiii');
            });
    }

    function handleSubmitRegister(tennd, email, password) {
        axios
            .post(`http://localhost:5000/staff/insert`, {
                tennd,
                email,
                password,
            })
            .then((res) => {
                console.log(res.data);
                alert('Đăng nhập thành công');
                setSingUpAvtice((prev) => !prev);
                setLoginAvtice((prev) => prev);
            })
            .catch(() => {
                console.log('loi insert');
            });
    }
    return (
        <>
            <header className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('logo')}>
                        <iframe
                            className={cx('video-logo')}
                            src="https://www.youtube.com/embed/knW7-x7Y7RE?wmode=opaque&autohide=1&autoplay=1&enablejsapi=1"
                            title="YouTube video player"
                            frameBorder="0"
                            autoPlay={true}
                            muted
                            loop={true}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <Search />
                    <div className={cx('action')}>
                        <Tippy delay={[0, 50]} content="Giỏ hàng" placement="bottom">
                            <button className={cx('action-btn')}>
                                <CartIcon className={cx('cart-icon')} />
                                <span className={cx('badge')}>12</span>
                            </button>
                        </Tippy>
                        <Tippy delay={[0, 50]} content="Lịch sử" placement="bottom">
                            <button className={cx('action-btn')}>
                                <InboxIcon className={cx('inbox-icon')} />
                            </button>
                        </Tippy>
                        {GetCookie('usrin') !== undefined || user ? (
                            <></>
                        ) : (
                            <Button className={cx('login-btn')} primary onClick={handleCloseLogin}>
                                Log in
                            </Button>
                        )}
                        {GetCookie('usrin') && (
                            <Menu items={GetCookie('usrin') !== undefined ? userMenu : MENU_ITEMS}>
                                {GetCookie('usrin') && (
                                    <div>
                                        <Image
                                            className={cx('user-avatar')}
                                            src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/7097454878913953798~c5_100x100.jpeg?x-expires=1652684400&x-signature=ziMbzQAeuYOeHCqDH4X%2FWYbvr7I%3D"
                                            alt={JSON.parse(GetCookie('usrin')).tennd}
                                            fallback="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/ea0854578085ab26effc2c7b8cefa270~c5_100x100.jpeg?x-expires=1652616000&x-signature=VLKoVcGNZpXSs6RZfWAFzzHsM2c%3D"
                                        />
                                    </div>
                                )}
                            </Menu>
                        )}
                        {GetCookie('logout') && (
                            <Menu items={GetCookie('logout') ? userMenuLogout : MENU_ITEMS}>
                                <div>
                                    <Image
                                        className={cx('user-avatar')}
                                        src={
                                            GetCookie('logout') !== undefined
                                                ? JSON.parse(GetCookie('logout')).photos[0].value
                                                : ''
                                        }
                                        alt="loi"
                                        fallback="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/ea0854578085ab26effc2c7b8cefa270~c5_100x100.jpeg?x-expires=1652616000&x-signature=VLKoVcGNZpXSs6RZfWAFzzHsM2c%3D"
                                    />
                                </div>
                            </Menu>
                        )}
                    </div>
                </div>
            </header>
            {loginAvtice === true && GetCookie('usrin') == null && (
                <>
                    <Login onClickLogin={handleCloseLogin} onClick={handleClose} onResult={handleSubmitLogin} />
                </>
            )}
            {signUpAvtice === true && GetCookie('usrin') == null && (
                <>
                    <SignUp onClickSignUp={handleCloseSignUp} onClick={handleClose} onRegister={handleSubmitRegister} />
                </>
            )}
        </>
    );
}

export default Header;
