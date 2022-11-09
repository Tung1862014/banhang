import classNames from 'classnames/bind';
import styles from './SignInAndSignUp.module.scss';
import { CloseIcon } from '~/components/Icons';
import { useState, memo } from 'react';
import { useDebounce } from '~/hooks';
import Button from '~/components/Button';
import Menu from './Menu';
import MenuItem from './Menu/MenuItem';
// import jwt_decode from 'jwt-decode';
// import SetCookie from '~/components/Hook/SetCookies';
// import RemoveCookie from '~/components/Hook/RemoveCookies';
// import { faGooglePlus } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Login({ onClickLogin, onClick, onClickSeller, onResult, Loading }) {
    const [userName, setUserName] = useState('');
    const [passValue, setPassValue] = useState('');
    // const [checkSeller, setCheckSeller] = useState(false);
    //const userObjectCookie = GetCookie('userGoogle') || {};

    //const [userGoogle, setUserGoogle] = useState(userObjectCookie);
    //const [checkEmail, setCheckEmail] = useState(false);
    // const [submitLogin, setSubmitLogin] = useState(false);

    // const resultLogin = useMemo(() => {
    //     console.log(loginResult);
    //     const result = onCurrentUse;
    //     if (resultLogin.length > 0) {
    //         console.log('Chuyển đổi');
    //     }
    //     return result;
    // }, [loginResult]);

    //const userE = useDebounce(userName, 500);

    // useEffect(() => {
    //     const regexExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // eslint-disable-line

    //     if (regexExp.test(userE)) {
    //         setCheckEmail((prev) => !prev);
    //         console.log('Check mail su');
    //     } else {
    //         setCheckEmail(false);
    //         console.log('Check mail false');
    //         // console.log('focus' + inputRef.current.focus());
    //     } // true
    // }, [userE]);

    const user = useDebounce(userName, 500);
    const pass = useDebounce(passValue, 500);
    //const seller = useDebounce(checkSeller, 100);

    const handleUserName = (e) => {
        setUserName(e.target.value);
    };

    const handlePassword = (e) => {
        setPassValue(e.target.value);
    };

    // const google = () => {
    //     RemoveCookie('err');
    //     window.open(`${process.env.REACT_APP_URL_NODEJS}/auth/google`, '_self');
    // };
    // function handleCallbackResponse(response) {
    //     //console.log('Encoded JWT ID tooken: ' + response.credential);
    //     var userObject = jwt_decode(response.credential);
    //     console.log('User: ' + JSON.stringify(userObject));
    //     RemoveCookie('userGoogle');
    //     SetCookie('userGoogle', JSON.stringify(userObject));
    // }
    // function handleSignOut(event) {
    //     RemoveCookie('userGoogle');
    //     document.getElementById('signInDiv').hidden = false;
    // }

    // useEffect(() => {
    //     /* global google*/
    //     google.accounts.id.initialize({
    //         client_id: '1083951703528-t5nld4p5cacvla6lq0l3ko1gsprsg0hg.apps.googleusercontent.com',
    //         callback: handleCallbackResponse,
    //     });
    //     google.accounts.id.renderButton(document.getElementById('signInDiv'), { theme: 'outliine', size: 'big' });
    //     google.accounts.id.prompt();
    // }, []);

    // const github = () => {
    //     window.open('${process.env.REACT_APP_URL_NODEJS}/auth/github', '_self');
    // };

    // const facebook = () => {
    //     window.open(`${process.env.REACT_APP_URL_NODEJS}/auth/facebook`, '_self');
    // };

    return (
        <>
            <div className={cx('main')}>
                <div className={cx('loading')}>
                    <div className={cx('form')} id="form-1">
                        <button className={cx('btn-icon-close')} onClick={onClickLogin}>
                            <CloseIcon className={cx('icon-close')} />
                        </button>
                        {/* <h3 className={cx('heading')}>{checkSeller ? 'Đăng nhập người bán' : 'Đăng nhập'}</h3> */}

                        <div className={cx('spacer')}></div>

                        {/* <div className={cx('form_group')}>
                            <label htmlFor="userName" className={cx('form_label')}>
                                Tên đăng nhập<font color=" red"> *</font>
                            </label>
                            <input
                                id="userName"
                                name="userName"
                                type="text"
                                placeholder="VD: ThanhTung"
                                className={cx('form_control')}
                                onChange={(e) => handleUserName(e)}
                            />
                            <span className={cx('form_message')}></span>
                        </div> */}
                        <Menu>
                            <MenuItem
                                className1="form_group"
                                className2="form_label"
                                className3="form_control"
                                className4="form_message"
                                title={'Tên đăng nhập'}
                                name="userName"
                                type={'text'}
                                placeholder={'VD: ThanhTung'}
                                onChange={(e) => handleUserName(e)}
                            />
                        </Menu>

                        {/* <div className={cx('form_group')}>
                            <label htmlFor="password" className={cx('form_label')}>
                                Mật khẩu<font color=" red"> *</font>
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Nhập mật khẩu"
                                className={cx('form_control')}
                                onChange={(e) => handlePassword(e)}
                            />
                            <span className={cx('form_message')}></span>
                        </div> */}
                        <Menu>
                            <MenuItem
                                className1="form_group"
                                className2="form_label"
                                className3="form_control"
                                className4="form_message"
                                title="Mật khẩu"
                                name="password"
                                type="password"
                                placeholder="Nhập mật khẩu"
                                onChange={(e) => handlePassword(e)}
                            />
                        </Menu>

                        {/* <div id="signInDiv" className={cx('login_button-google')} onClick={google}>
                            <FontAwesomeIcon className={cx('icon')} icon={faGooglePlus} />
                            Tiếp tục với Google
                        </div> */}

                        {/* <div className={cx('check-seller')}>
                            <input
                                type="checkbox"
                                id="seller"
                                className={cx('input-check-seller')}
                                onChange={() => setCheckSeller((prev) => !prev)}
                            />
                            <label htmlFor="seller" className={cx('seller')}>
                                Đăng nhập với tư cách chủ gian hàng
                            </label>
                        </div> */}

                        <Button className={cx('form_submit')} to="" onClick={() => onResult(pass, user)}>
                            {'Đăng nhập'}
                        </Button>
                        <div className={cx('sign-header')}>
                            <div>Đăng ký tài khoản? </div>
                            <span className={cx('loginLink-header')} onClick={onClick}>
                                Người dùng
                            </span>
                            <span className={cx('loginLink-header-bulkhead')}>/</span>
                            <span className={cx('loginLink-header')} onClick={onClickSeller}>
                                Chủ gian hàng
                            </span>
                        </div>
                        <div className={cx('sign-header')}>
                            <div></div>
                            <Link to={'/login/admin'} className={cx('loginLink-header-admin')} onClick={onClickLogin}>
                                Đăng nhập quản lý
                            </Link>
                        </div>
                    </div>
                    {Loading && (
                        <div className={cx('loading-icon')}>
                            <FontAwesomeIcon className={cx('loading-icon-sigIn')} icon={faSpinner} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default memo(Login);
