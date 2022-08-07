import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import axios from 'axios';

import styles from './Header.module.scss';
import Search from '../Search';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAsia, faGear, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { CartIcon, InboxIcon } from '~/components/Icons';
import Image from '~/components/Image';
import { useState, useEffect } from 'react';
import Login from './SignInAndSignUp/Login';
import SignUp from './SignInAndSignUp';
import { useCallback } from 'react';
import SetCookie from '~/components/Hook/SetCookies';
import GetCookie from '~/components/Hook/GetCookies';
import RemoveCookie from '~/components/Hook/RemoveCookies';
import { useSelector, useDispatch } from 'react-redux';
import { addNewSignIn } from '~/actions/SignIn';
import { ToastContainer, toast } from 'react-toastify';
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

function Header() {
    const [loginAvtice, setLoginAvtice] = useState(false);
    const [signUpAvtice, setSingUpAvtice] = useState(false);
    const [loginResult, setLoginResult] = useState([]);
    const [userGoogle, setUserGoogle] = useState(null);
    const [loading, setLoading] = useState(false);

    //console.log('Google: ' + GetCookie('logout'));

    const siginList = useSelector((state) => state.signin.list);
    const dispatchSignIn = useDispatch();
    console.log('signin: ', siginList);

    const getUser = async () => {
        try {
            const url = `${process.env.REACT_APP_URL_NODEJS}/auth/login/success`;
            const { data } = await axios.get(url, { withCredentials: true });
            console.log('gmail: ' + JSON.stringify(data.user));
            RemoveCookie('logout');
            SetCookie('logout', JSON.stringify(data.user));
            setUserGoogle(data.user);
        } catch (err) {
            console.log(err);
            RemoveCookie('err');
            SetCookie('err', JSON.stringify(err));
        }
    };
    useEffect(() => {
        if (GetCookie('err')) {
            RemoveCookie('logout');
        } else {
            getUser();
        }
    }, []);

    const userMenu = [
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Setting',
            to: `/user/setting`,
            separate: true,
            setting: true,
        },
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            href: process.env.REACT_APP_URL_FRONTEND,
            separate: true,
            onclick: () => RemoveCookie('usrin'),
        },
    ];

    const userMenuLogout = [
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            href: process.env.REACT_APP_URL,
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
        if (loginResult.length > 0) {
            setLoginAvtice((prev) => !prev);
        }

        // SetCookie('pass', loginResult));
    }, [loginResult]);

    //console.log('cookie: ' + JSON.parse(GetCookie('usergoogle')).photos[0].value);

    function handleSubmitLogin(pass, user) {
        setLoading(true);
        axios
            .post(`${process.env.REACT_APP_URL_NODEJS}/customer/login`, { password: pass, userName: user })
            .then((res) => {
                // handle success
                if (res.data.result && res.data.result.password === pass) {
                    RemoveCookie('usrin');
                    SetCookie('usrin', JSON.stringify(res.data.result));
                    //alert('Đăng nhập thành công');
                    setLoginResult([...loginResult, res.data]);
                    setLoading(false);
                    const action = addNewSignIn(res.data.result);
                    dispatchSignIn(action);
                    toast.success('Success Notification !', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                } else if (res.data.result === undefined) {
                    //alert('Tài khoản không tồn tại');
                    //const lastname = `${cx('toast-message')}`;
                    setLoading(false);
                    toast.error('Tài khoản không tồn tại', {
                        position: toast.POSITION.TOP_RIGHT,
                        className: `${cx('toast-toastify-message')}`,
                    });
                } else if (res.data.password !== pass) {
                    //alert('Mật khẩu không đúng');
                    setLoading(false);
                    toast.error('Mật khẩu không đúng', {
                        position: toast.POSITION.TOP_RIGHT,
                        className: `${cx('toast-message')}`,
                    });
                }
                console.log(process.env);
            })
            .catch(() => {
                // handle error
                console.log('loiiiii');
                setLoading(false);
                toast.error('ERROR', {
                    position: toast.POSITION.TOP_RIGHT,
                    className: `${cx('toast-message')}`,
                });
            });
    }

    function handleSubmitRegister(fullName, userName, email, password, image, address, birthday, phone) {
        //event.preventDefault();
        setLoading(true);
        const formData = new FormData();
        console.log(image);
        for (let i = 0; i < image.length; i++) {
            formData.append('image', image[i]);
        }
        formData.append('fullName', fullName);
        formData.append('userName', userName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('address', address);
        formData.append('birthday', birthday);
        formData.append('phone', phone);
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_URL_NODEJS}/customer/signup`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((res) => {
                console.log(res.data);
                if (res.data.userName === false) {
                    //alert('Tên đăng nhập đã tồn tại!');
                    toast.error('Tên đăng nhập đã tồn tại!', {
                        position: toast.POSITION.TOP_RIGHT,
                        className: `${cx('toast-message')}`,
                    });
                    setLoading(false);
                } else {
                    //alert('Đăng ký thành công');
                    toast.success('Đăng ký thành công', {
                        position: toast.POSITION.TOP_RIGHT,
                        className: `${cx('toast-message')}`,
                    });
                    setLoading(false);
                    setSingUpAvtice((prev) => !prev);
                    setLoginAvtice((prev) => prev);
                }
            })
            .catch(() => {
                setLoading(false);
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
                            src="https://www.youtube.com/embed/S7ElVoYZN0g?wmode=opaque&autohide=1&autoplay=1&enablejsapi=1"
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
                        {GetCookie('usrin') !== undefined || GetCookie('logout') ? (
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
                                            src={
                                                JSON.parse(GetCookie('usrin')).image ||
                                                process.env.REACT_APP_URL_IMAGE_AVATAR
                                            }
                                            alt=""
                                            fallback={process.env.REACT_APP_URL_IMAGE_AVATAR}
                                        />
                                    </div>
                                )}
                            </Menu>
                        )}
                        {GetCookie('logout') && userGoogle && (
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
                    <Login
                        onClickLogin={handleCloseLogin}
                        onClick={handleClose}
                        onResult={handleSubmitLogin}
                        Loading={loading}
                    />
                    <ToastContainer />
                </>
            )}
            {signUpAvtice === true && GetCookie('usrin') == null && (
                <>
                    <SignUp
                        onClickSignUp={handleCloseSignUp}
                        onClick={handleClose}
                        onRegister={handleSubmitRegister}
                        Loading={loading}
                    />
                </>
            )}
            <ToastContainer />
        </>
    );
}

export default Header;
