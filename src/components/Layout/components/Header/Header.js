import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import axios from 'axios';

import styles from './Header.module.scss';
import Search from '../Search';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faEarthAsia, faGear, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { CartIcon, InboxIcon } from '~/components/Icons';
import Image from '~/components/Image';
import { useState, useEffect } from 'react';
import Login from './SignInAndSignUp/Login';
import SignUp from './SignInAndSignUp';
import { useCallback } from 'react';
import SetCookie from '~/components/Hook/SetCookies';
import GetCookie from '~/components/Hook/GetCookies';
import RemoveCookie from '~/components/Hook/RemoveCookies';
//import { useSelector } from 'react-redux';
// import { addNumberProduct } from '~/actions/NumberProduct';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUpSeller from './SignInAndSignUp/SignUpSeller';
import { Link } from 'react-router-dom';

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
    const [signUpAvticeSeller, setSingUpAvticeSeller] = useState(false);
    const [loginResult, setLoginResult] = useState([]);
    const [userGoogle, setUserGoogle] = useState(null);
    const [loading, setLoading] = useState(false);

    //console.log('Google: ' + GetCookie('logout'));

    // const siginList = useSelector((state) => state.numberProduct.list);
    // // const dispatchSignIn = useDispatch();
    // console.log('product: ', siginList);
    //localStorage.removeItem('product');
    // localStorage.setItem('product', JSON.stringify(siginList));

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

    const userMenuSeller = [
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            href: process.env.REACT_APP_URL_FRONTEND,
            separate: true,
            onclick: () => RemoveCookie('seller'),
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
        //setSingUpAvticeSeller(false);
    }, []);

    const handleClose = useCallback(() => {
        setLoginAvtice((prev) => !prev);
        setSingUpAvtice((prev) => !prev);
        setSingUpAvticeSeller(false);
    }, []);

    const handleCloseSeller = useCallback(() => {
        setLoginAvtice((prev) => !prev);
        setSingUpAvtice(false);
        setSingUpAvticeSeller(true);
    }, []);

    const handleBackSeller = useCallback(() => {
        setLoginAvtice(true);
        setSingUpAvtice(false);
        setSingUpAvticeSeller(false);
    }, []);

    const handleCloseSignUp = useCallback(() => {
        setSingUpAvtice((prev) => !prev);
    }, []);

    const handleCloseSignUpSeller = useCallback(() => {
        setSingUpAvticeSeller(false);
    }, []);

    useEffect(() => {
        if (loginResult.length > 0) {
            setLoginAvtice((prev) => !prev);
        }

        // SetCookie('pass', loginResult));
    }, [loginResult]);

    //console.log('cookie: ' + JSON.parse(GetCookie('usergoogle')).photos[0].value);

    function handleSubmitLogin(pass, user, seller) {
        //setLoading(true);

        if (seller) {
            axios
                .post(`${process.env.REACT_APP_URL_NODEJS}/seller/login`, { password: pass, userName: user })
                .then((res) => {
                    // handle success
                    console.log(res.data);
                    if (res.data.result && res.data.result.NB_password === pass) {
                        RemoveCookie('seller');
                        SetCookie('seller', JSON.stringify(res.data.result));
                        //alert('Đăng nhập thành công');
                        setLoginResult([...loginResult, res.data.result]);
                        //setLoading(false);
                        // const action = addNumberProduct(res.data.result);
                        // dispatchSignIn(action);
                        toast.success('Đăng nhập thành công người bán', {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                        window.open('http://localhost:3000/seller', '_self', 1);
                    } else if (res.data.result === undefined) {
                        //alert('Tài khoản không tồn tại');
                        //const lastname = `${cx('toast-message')}`;
                        //setLoading(false);
                        toast.error('Tài khoản không tồn tại nguoi ban', {
                            position: toast.POSITION.TOP_RIGHT,
                            className: `${cx('toast-toastify-message')}`,
                        });
                    } else if (res.data.result.password !== pass) {
                        //alert('Mật khẩu không đúng');
                        //setLoading(false);
                        toast.error('Mật khẩu không đúng', {
                            position: toast.POSITION.TOP_RIGHT,
                            className: `${cx('toast-message')}`,
                        });
                    }
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
        } else {
            axios
                .post(`${process.env.REACT_APP_URL_NODEJS}/customer/login`, { ND_password: pass, ND_username: user })
                .then((res) => {
                    //console.log('data: ' + JSON.stringify(res.data.result.image));
                    // handle success
                    if (res.data.result && res.data.result.ND_password === pass) {
                        RemoveCookie('usrin');
                        SetCookie('usrin', JSON.stringify(res.data.result));
                        //alert('Đăng nhập thành công');
                        setLoginResult([...loginResult, res.data.result]);
                        //setLoading(false);
                        // const action = addNumberProduct(res.data.result);
                        // dispatchSignIn(action);
                        toast.success('Success Notification !', {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                    } else if (res.data.result === undefined) {
                        //alert('Tài khoản không tồn tại');
                        //const lastname = `${cx('toast-message')}`;
                        //setLoading(false);
                        toast.error('Tài khoản không tồn tại', {
                            position: toast.POSITION.TOP_RIGHT,
                            className: `${cx('toast-toastify-message')}`,
                        });
                    } else if (res.data.result.ND_password !== pass) {
                        //alert('Mật khẩu không đúng');
                        //setLoading(false);
                        toast.error('Mật khẩu không đúng', {
                            position: toast.POSITION.TOP_RIGHT,
                            className: `${cx('toast-message')}`,
                        });
                    }
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
    function handleSubmitRegisterSeller(fullName, email, password, address, phone, YMD) {
        //setLoading(true);
        console.log('fullname: ' + fullName, email, password, address, phone);
        // const formData = new FormData();
        //console.log(image);

        axios
            .post(`${process.env.REACT_APP_URL_NODEJS}/seller/signup`, {
                fullName,
                email,
                password,
                address,
                phone,
                YMD,
            })

            .then((res) => {
                console.log(res.data);
                if (res.data.err === true && res.data.email === 'email already exist') {
                    //alert('Tên đăng nhập đã tồn tại!');
                    console.log(res.data);
                    toast.error('Email đã tồn tại!', {
                        position: toast.POSITION.TOP_RIGHT,
                        className: `${cx('toast-message')}`,
                    });
                } else {
                    //alert('Đăng ký thành công');
                    toast.success('Đăng ký thành công', {
                        position: toast.POSITION.TOP_RIGHT,
                        className: `${cx('toast-message')}`,
                    });

                    setSingUpAvticeSeller((prev) => !prev);
                    setLoginAvtice((prev) => prev);
                }
            })
            .catch(() => {
                console.log('loi insert');
            });
    }
    return (
        <>
            <header className={cx('wrapper')}>
                <div className={cx('inner')}>
                    {/* <div className={cx('logo')}>
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
                    </div> */}
                    {GetCookie('seller') === undefined && <Search />}
                    <div className={cx('action')}>
                        {GetCookie('seller') === undefined && (
                            <>
                                <Tippy delay={[0, 50]} content="Giỏ hàng" placement="bottom">
                                    <Link to="/cart" className={cx('action-btn-cart')}>
                                        <CartIcon className={cx('cart-icon')} />
                                        <span className={cx('badge')}>12</span>
                                    </Link>
                                </Tippy>
                                <Tippy delay={[0, 50]} content="Lịch sử" placement="bottom">
                                    <button className={cx('action-btn')}>
                                        <InboxIcon className={cx('inbox-icon')} />
                                    </button>
                                </Tippy>
                            </>
                        )}
                        {GetCookie('usrin') !== undefined ||
                        GetCookie('logout') ||
                        GetCookie('seller') !== undefined ? (
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
                        {GetCookie('seller') && (
                            <Menu items={GetCookie('seller') !== undefined ? userMenuSeller : MENU_ITEMS}>
                                {GetCookie('seller') && (
                                    <div>
                                        <h3>
                                            Xin chào {JSON.parse(GetCookie('seller')).NB_hoten}
                                            <FontAwesomeIcon icon={faCaretDown} />
                                        </h3>
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
                        onClickSeller={handleCloseSeller}
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
            {signUpAvticeSeller === true && GetCookie('seller') == null && (
                <>
                    <SignUpSeller
                        onClickSignUp={handleCloseSignUpSeller}
                        onClickSeller={handleBackSeller}
                        onRegister={handleSubmitRegisterSeller}
                        Loading={loading}
                    />
                </>
            )}
            <ToastContainer />
        </>
    );
}

export default Header;
