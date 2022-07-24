import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { CloseIcon } from '~/components/Icons';
import { useState, memo } from 'react';
import { useDebounce } from '~/hooks';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGooglePlus } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);

function Login({ onClickLogin, onClick, onResult }) {
    const [userName, setUserName] = useState('');
    const [passValue, setPassValue] = useState('');
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

    const handleUserName = (e) => {
        setUserName(e.target.value);
    };

    const handlePassword = (e) => {
        setPassValue(e.target.value);
    };

    const google = () => {
        window.open(`${process.env.REACT_APP_URL_NODEJS}/auth/google`, '_self');
    };

    // const github = () => {
    //     window.open('${process.env.REACT_APP_URL_NODEJS}/auth/github', '_self');
    // };

    const facebook = () => {
        window.open(`${process.env.REACT_APP_URL_NODEJS}/auth/facebook`, '_self');
    };

    return (
        <>
            <div className={cx('main')}>
                <div className={cx('form')} id="form-1">
                    <button className={cx('btn-icon-close')} onClick={onClickLogin}>
                        <CloseIcon className={cx('icon-close')} />
                    </button>
                    <h3 className={cx('heading')}>Thành viên đăng nhập</h3>

                    <div className={cx('spacer')}></div>

                    <div className={cx('form_group')}>
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
                    </div>

                    <div className={cx('form_group')}>
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
                    </div>

                    <div className={cx('login_button-google')} onClick={google}>
                        <FontAwesomeIcon className={cx('icon')} icon={faGooglePlus} />
                        Tiếp tục với Google
                    </div>
                    <div className={cx('login_button-facebook')} onClick={facebook}>
                        <FontAwesomeIcon className={cx('icon')} icon={faFacebook} />
                        Facebook
                    </div>

                    <Button className={cx('form_submit')} to="" onClick={() => onResult(pass, user)}>
                        {'Đăng nhập'}
                    </Button>
                    <div className={cx('sign-header')}>
                        <div>Already have an account? </div>
                        <span className={cx('loginLink-header')} onClick={onClick}>
                            Sign up
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default memo(Login);