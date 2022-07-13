import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { CloseIcon } from '~/components/Icons';
import { useState, memo } from 'react';
import { useDebounce } from '~/hooks';
import Button from '~/components/Button';
import Google from '../../img/google.png';
import Facebook from '../../img/facebook.png';
import Github from '../../img/github.png';

const cx = classNames.bind(styles);

function Login({ onClickLogin, onClick, onResult }) {
    const [emailValue, setEmailValue] = useState('');
    const [passValue, setPassValue] = useState('');
    // const [submitLogin, setSubmitLogin] = useState(false);

    // const resultLogin = useMemo(() => {
    //     console.log(loginResult);
    //     const result = onCurrentUse;
    //     if (resultLogin.length > 0) {
    //         console.log('Chuyển đổi');
    //     }
    //     return result;
    // }, [loginResult]);

    const email = useDebounce(emailValue, 500);
    const pass = useDebounce(passValue, 500);

    const handleEmail = (e) => {
        setEmailValue(e.target.value);
    };

    const handlePassword = (e) => {
        setPassValue(e.target.value);
    };

    const google = () => {
        window.open('http://localhost:5000/auth/google', '_self');
    };

    const github = () => {
        window.open('http://localhost:5000/auth/github', '_self');
    };

    const facebook = () => {
        window.open('http://localhost:5000/auth/facebook', '_self');
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
                        <label htmlFor="email" className={cx('form_label')}>
                            Email<font color=" red"> *</font>
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="text"
                            placeholder="VD: email@domain.com"
                            className={cx('form_control')}
                            onChange={(e) => handleEmail(e)}
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

                    <div className={cx('loginButton google')} onClick={google}>
                        <img src={Google} alt="" className={cx('icon')} />
                        Google
                    </div>
                    <div className={cx('loginButton facebook')} onClick={facebook}>
                        <img src={Facebook} alt="" className={cx('icon')} />
                        Facebook
                    </div>
                    <div className={cx('loginButton github')} onClick={github}>
                        <img src={Github} alt="" className={cx('icon')} />
                        Github
                    </div>

                    <Button className={cx('form_submit')} to="" onClick={() => onResult(pass, email)}>
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
            )
        </>
    );
}

export default memo(Login);
