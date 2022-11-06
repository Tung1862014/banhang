import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import axios from 'axios';

import styles from './Header.module.scss';
import Search from '../Search';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { CartIcon, InboxIcon } from '~/components/Icons';
import Image from '~/components/Image';
import { useState, useEffect } from 'react';
import Login from './SignInAndSignUp/Login';
import SignUp from './SignInAndSignUp';
import { useCallback } from 'react';
import SetCookie from '~/components/Hook/SetCookies';
import GetCookie from '~/components/Hook/GetCookies';
import RemoveCookie from '~/components/Hook/RemoveCookies';
import { useDispatch, useSelector } from 'react-redux';
// import { addNumberProduct } from '~/actions/NumberProduct';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUpSeller from './SignInAndSignUp/SignUpSeller';
import { Link } from 'react-router-dom';
import { cartProduct } from '~/actions/CartProduct';

const cx = classNames.bind(styles);

// const MENU_ITEMS = [
//     {
//         icon: <FontAwesomeIcon icon={faEarthAsia} />,
//         title: 'English',
//         children: {
//             title: 'Languare',
//             data: [
//                 {
//                     code: 'en',
//                     title: 'English',
//                     type: 'language',
//                 },
//                 {
//                     code: 'vn',
//                     title: 'Tiếng Việt',
//                     type: 'language',
//                 },
//             ],
//         },
//     },
// ];

function Header() {
    const [loginAvtice, setLoginAvtice] = useState(false);
    const [signUpAvtice, setSingUpAvtice] = useState(false);
    const [signUpAvticeSeller, setSingUpAvticeSeller] = useState(false);
    const [loginResult, setLoginResult] = useState([]);
    //const [userGoogle, setUserGoogle] = useState(null);
    const [userValue, setUserValue] = useState('');
    const [loading, setLoading] = useState(false);

    const [sumNumber, setSumNumber] = useState('');

    //console.log('Google: ' + GetCookie('logout'));

    const siginList = useSelector((state) => state.numberProduct.list);
    const dispatchCart = useDispatch();
    //localStorage.removeItem('product');
    // localStorage.setItem('product', JSON.stringify(siginList));

    // const getUser = async () => {
    //     try {
    //         const url = `${process.env.REACT_APP_URL_NODEJS}/auth/login/success`;
    //         const { data } = await axios.get(url, { withCredentials: true });
    //         console.log('gmail: ' + JSON.stringify(data.user));
    //         RemoveCookie('logout');
    //         SetCookie('logout', JSON.stringify(data.user));
    //         setUserGoogle(data.user);
    //     } catch (err) {
    //         console.log(err);
    //         RemoveCookie('err');
    //         SetCookie('err', JSON.stringify(err));
    //     }
    // };
    // useEffect(() => {
    //     if (GetCookie('err')) {
    //         RemoveCookie('logout');
    //     } else {
    //         getUser();
    //     }
    // }, []);

    useEffect(() => {
        if (GetCookie('usrin') !== undefined) {
            axios
                .get(
                    `${process.env.REACT_APP_URL_NODEJS}/cartcustomer/cart/show/number/product?ND_id=${
                        JSON.parse(GetCookie('usrin')).ND_id
                    }`,
                )
                .then((res) => {
                    console.log('setSumNumber', res.data.results);
                    setSumNumber(res.data.results);
                    if (res.data.results > 0) {
                        const action = cartProduct(res.data.results);
                        dispatchCart(action);
                    }
                })
                .catch((err) => {
                    console.log('loi number');
                });
        }
    }, [siginList, dispatchCart]);

    useEffect(() => {
        if (GetCookie('usrin') !== undefined) {
            axios
                .get(
                    `${process.env.REACT_APP_URL_NODEJS}/customer/show/account?ND_id=${
                        JSON.parse(GetCookie('usrin')).ND_id
                    }`,
                )
                .then((res) => {
                    console.log('resultHeader', res.data.result);
                    setUserValue(res.data.result);
                })
                .catch((err) => {
                    console.log('loi');
                });
        }
    }, [loginResult]);

    const userMenu = [
        // ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Thông tin tài khoản',
            to: `/user/setting/account`,
            separate: true,
            // settingsell: true,
        },
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Đăng xuất',
            href: process.env.REACT_APP_URL_FRONTEND,
            separate: true,
            onclick: () => RemoveCookie('usrin'),
        },
    ];

    // const userMenuSeller = [
    //     {
    //         icon: <FontAwesomeIcon icon={faSignOut} />,
    //         title: 'Log out',
    //         href: process.env.REACT_APP_URL_FRONTEND,
    //         separate: true,
    //         onclick: () => RemoveCookie('seller'),
    //     },
    // ];

    // const userMenuLogout = [
    //     // ...MENU_ITEMS,
    //     {
    //         icon: <FontAwesomeIcon icon={faSignOut} />,
    //         title: 'Log out',
    //         href: process.env.REACT_APP_URL,
    //         separate: true,
    //         logoutuse: true,
    //     },
    // ];

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
        setSingUpAvtice((prev) => !prev);
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

        //  if (seller) {
        //     axios
        //         .post(`${process.env.REACT_APP_URL_NODEJS}/seller/login`, { password: pass, userName: user, seller: seller })
        //         .then((res) => {
        //             // handle success
        //             console.log(res.data);
        //             if (res.data.result && res.data.result.NB_password === pass) {
        //                 RemoveCookie('seller');
        //                 SetCookie('seller', JSON.stringify(res.data.result));
        //                 //alert('Đăng nhập thành công');
        //                 setLoginResult([...loginResult, res.data.result]);
        //                 //setLoading(false);
        //                 // const action = addNumberProduct(res.data.result);
        //                 // dispatchSignIn(action);
        //                 toast.success('Đăng nhập thành công người bán', {
        //                     position: toast.POSITION.TOP_RIGHT,
        //                 });
        //                 window.open('http://localhost:3000/seller', '_self', 1);
        //             } else if (res.data.result === undefined) {
        //                 //alert('Tài khoản không tồn tại');
        //                 //const lastname = `${cx('toast-message')}`;
        //                 //setLoading(false);
        //                 toast.error('Tài khoản không tồn tại nguoi ban', {
        //                     position: toast.POSITION.TOP_RIGHT,
        //                     className: `${cx('toast-toastify-message')}`,
        //                 });
        //             } else if (res.data.result.password !== pass) {
        //                 //alert('Mật khẩu không đúng');
        //                 //setLoading(false);
        //                 toast.error('Mật khẩu không đúng', {
        //                     position: toast.POSITION.TOP_RIGHT,
        //                     className: `${cx('toast-message')}`,
        //                 });
        //             }
        //         })
        //         .catch(() => {
        //             // handle error
        //             console.log('loiiiii');
        //             setLoading(false);
        //             toast.error('ERROR', {
        //                 position: toast.POSITION.TOP_RIGHT,
        //                 className: `${cx('toast-message')}`,
        //             });
        //         });
        // } else {
        axios
            .post(`${process.env.REACT_APP_URL_NODEJS}/customer/login`, {
                ND_password: pass,
                ND_username: user,
                seller: seller,
            })
            .then((res) => {
                //console.log('data: ' + JSON.stringify(res.data.result.image));
                // handle success
                console.log('data', res.data);
                if (seller) {
                    if (res.data.account && res.data.pass && res.data.status !== 0) {
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
                    } else if (!res.data.account) {
                        //alert('Tài khoản không tồn tại');
                        //const lastname = `${cx('toast-message')}`;
                        //setLoading(false);
                        // console.log('account', res.data.account);
                        toast.error('Tài khoản không tồn tại', {
                            position: toast.POSITION.TOP_RIGHT,
                            className: `${cx('toast-toastify-message')}`,
                        });
                    } else if (!res.data.pass) {
                        //alert('Mật khẩu không đúng');
                        //setLoading(false);
                        // console.log('pass', res.data.pass);
                        toast.error('Mật khẩu không đúng', {
                            position: toast.POSITION.TOP_RIGHT,
                            className: `${cx('toast-message')}`,
                        });
                    } else if (res.data.status === 0) {
                        //alert('Mật khẩu không đúng');
                        //setLoading(false);
                        // console.log('pass', res.data.pass);

                        toast.error(`Tài khoản của bạn đã bị khóa. ${res.data.note}!`, {
                            position: toast.POSITION.TOP_RIGHT,
                            className: `${cx('toast-message')}`,
                        });
                        const pathId = window.location.pathname.toString();
                        setTimeout(window.open(pathId, '_self', 1), 2000);
                    }
                } else {
                    if (res.data.account && res.data.pass && res.data.status !== 0) {
                        RemoveCookie('usrin');
                        SetCookie('usrin', JSON.stringify(res.data.result));
                        //alert('Đăng nhập thành công');
                        setLoginResult([...loginResult, res.data.result]);
                        //setLoading(false);
                        // console.log('loginResult', res.data.result);
                        // const action = addNumberProduct(res.data.result);
                        // dispatchSignIn(action);

                        toast.success('Đăng nhập thành công', {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                        const pathId = window.location.pathname.toString();
                        setTimeout(window.open(pathId, '_self', 1), 2000);
                        //window.open(`${process.env.REACT_APP_URL_FRONTEND}`, '_self', 1);
                    } else if (!res.data.account) {
                        //alert('Tài khoản không tồn tại');
                        //const lastname = `${cx('toast-message')}`;
                        //setLoading(false);
                        // console.log('account', res.data.account);
                        toast.error('Tài khoản không tồn tại!', {
                            position: toast.POSITION.TOP_RIGHT,
                            className: `${cx('toast-toastify-message')}`,
                        });
                    } else if (!res.data.pass) {
                        //alert('Mật khẩu không đúng');
                        //setLoading(false);
                        // console.log('pass', res.data.pass);
                        toast.error('Mật khẩu không đúng', {
                            position: toast.POSITION.TOP_RIGHT,
                            className: `${cx('toast-message')}`,
                        });
                    } else if (res.data.status === 0) {
                        //alert('Mật khẩu không đúng');
                        //setLoading(false);
                        // console.log('pass', res.data.pass);
                        toast.error(`Tài khoản của bạn đã bị khóa. Lý do: ${res.data.note}!`, {
                            position: toast.POSITION.TOP_RIGHT,
                            className: `${cx('toast-message')}`,
                        });
                    }
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
        // }
    }

    function handleSubmitRegister(fullName, userName, email, password, image, address, YMD, phone) {
        //event.preventDefault();
        setLoading(true);
        const formData = new FormData();
        console.log(image);
        for (let i = 0; i < image.length; i++) {
            formData.append('image', image[i]);
        }
        formData.append('ND_hoten', fullName);
        formData.append('ND_username', userName);
        formData.append('ND_email', email);
        formData.append('ND_password', password);
        formData.append('ND_diachi', address);
        formData.append('ND_ngay', YMD);
        formData.append('ND_sdt', phone);
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
                if (res.data.ND_username === false) {
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
    function handleSubmitRegisterSeller(fullName, userName, email, password, image, address, YMD, phone) {
        //setLoading(true);
        //console.log('fullname: ' + fullName, email, password, address, phone);
        // const formData = new FormData();
        //console.log(image);

        const formData = new FormData();
        console.log(image);
        for (let i = 0; i < image.length; i++) {
            formData.append('image', image[i]);
        }
        formData.append('ND_hoten', fullName);
        formData.append('ND_username', userName);
        formData.append('ND_email', email);
        formData.append('ND_password', password);
        formData.append('ND_diachi', address);
        formData.append('ND_ngay', YMD);
        formData.append('ND_sdt', phone);
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_URL_NODEJS}/seller/signup`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((res) => {
                console.log(res.data);
                if (res.data.ND_username === false) {
                    //alert('Tên đăng nhập đã tồn tại!');
                    toast.error('Tên đăng nhập đã tồn tại!', {
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
                <div>
                    <div className={cx('inner')}>
                        <Link to={'/'} className={cx('logo')}>
                            <img src={`${process.env.REACT_APP_URL_NODEJS}/logo/SanPhamChoMoi.png`} alt="" />
                            {/* <iframe
                                className={cx('video-logo')}
                                src="https://www.youtube.com/embed/S7ElVoYZN0g?wmode=opaque&autohide=1&autoplay=1&enablejsapi=1"
                                title="YouTube video player"
                                frameBorder="0"
                                autoPlay={true}
                                muted
                                loop={true}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe> */}
                        </Link>

                        <div className={cx('home-page-zytl')}>
                            <Link to="/" className={cx('home-page-zytlt1')}>
                                Trang chủ
                            </Link>
                        </div>
                        <div className={cx('introduce-page-zytl')}>
                            <Link to="/introduce" className={cx('introduce-page-zytlt1')}>
                                Giới thiệu
                            </Link>
                        </div>
                        {GetCookie('seller') !== undefined ? (
                            <Link to="/seller" className={cx('link-seller')}>
                                Kênh người bán
                            </Link>
                        ) : (
                            ''
                        )}
                        {<Search />}
                        <div className={cx('action')}>
                            {
                                <>
                                    <Tippy delay={[0, 50]} content="Giỏ hàng" placement="bottom">
                                        <Link to="/cart" className={cx('action-btn-cart')}>
                                            <CartIcon className={cx('cart-icon')} />
                                            <span className={cx('badge')}>{sumNumber !== '' ? sumNumber : '0'}</span>
                                        </Link>
                                    </Tippy>

                                    <Tippy delay={[0, 50]} content="Đơn hàng" placement="bottom">
                                        <Link to="/history/purchase/type=all" className={cx('action-btn')}>
                                            <InboxIcon className={cx('inbox-icon')} />
                                        </Link>
                                    </Tippy>
                                </>
                            }
                            {GetCookie('usrin') !== undefined ? (
                                <></>
                            ) : (
                                <Button className={cx('login-btn')} primary onClick={handleCloseLogin}>
                                    Đăng Nhập
                                </Button>
                            )}

                            {GetCookie('usrin') && (
                                <Menu items={GetCookie('usrin') !== undefined ? userMenu : ''}>
                                    {GetCookie('usrin') && (
                                        <div>
                                            <Image
                                                className={cx('user-avatar')}
                                                src={
                                                    userValue !== ''
                                                        ? userValue.ND_image
                                                        : process.env.REACT_APP_URL_IMAGE_AVATAR
                                                }
                                                alt=""
                                                fallback={process.env.REACT_APP_URL_IMAGE_AVATAR}
                                            />
                                        </div>
                                    )}
                                </Menu>
                            )}
                            {/* {GetCookie('seller') && (
                                <Menu items={GetCookie('seller') !== undefined ? userMenuSeller : ''}>
                                    {GetCookie('seller') && (
                                        <div>
                                            <h3>
                                                Xin chào {JSON.parse(GetCookie('seller')).ND_hoten}
                                                <FontAwesomeIcon icon={faCaretDown} />
                                            </h3>
                                        </div>
                                    )}
                                </Menu>
                            )} */}
                            {/* {GetCookie('logout') && userGoogle && (
                                <Menu items={GetCookie('logout') ? userMenuLogout : ''}>
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
                            )} */}
                        </div>
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
            {signUpAvticeSeller === true && GetCookie('seller') == null ? (
                <>
                    <SignUpSeller
                        onClickSignUp={handleCloseSignUpSeller}
                        onClickSeller={handleBackSeller}
                        onRegister={handleSubmitRegisterSeller}
                        Loading={loading}
                    />
                </>
            ) : (
                ''
            )}
            <ToastContainer />
        </>
    );
}

export default Header;
