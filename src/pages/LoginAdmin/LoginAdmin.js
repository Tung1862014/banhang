import axios from 'axios';
import classNames from 'classnames/bind';
import { useState } from 'react';
import RemoveCookie from '~/components/Hook/RemoveCookies';
import SetCookie from '~/components/Hook/SetCookies';
import styles from './LoginAdmin.module.scss';

const cx = classNames.bind(styles);

function LoginAdmin() {
    const [userNameValue, setUserNameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    // console.log('userNameValue', userNameValue, 'passwordValue', passwordValue);

    const handleSubmitLogin = (userName, password) => {
        console.log('userName', userName, 'password', password);
        axios
            .post(`${process.env.REACT_APP_URL_NODEJS}/admin/login`, {
                ND_username: userName,
                ND_password: password,
            })
            .then((res) => {
                console.log('success', res.data);
                if (res.data.result === undefined && res.data.account === false) {
                    console.log('tai khoan khong ton tai');
                } else if (res.data.result === undefined && res.data.account === true && res.data.password === false) {
                    console.log('sai mat khau');
                } else {
                    console.log('Đăng nhập thành công');
                    RemoveCookie('admin');
                    SetCookie('admin', JSON.stringify(res.data.result));
                    window.open(`${process.env.REACT_APP_URL_FRONTEND}/manage/customer/admin`, '_self', 1);
                }
            })
            .catch((err) => {
                console.log('loi');
            });
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('vtexOX')}>
                <div className={cx('axexMF')}>
                    <div className={cx('D3jUo5')}>
                        <div className={cx('_0L93MD')}>
                            {/* <a className={cx("UbNlH7")} href="/" alt=""></a> */}
                            <div className={cx('u9tve2')}>Đăng nhập</div>
                        </div>
                    </div>
                </div>
                <div style={{ backgroundColor: 'rgb(177 234 240)' }}>
                    <div className={cx('_3M9lzn-PeA8Gc')}>
                        <img
                            src={
                                'https://preview.colorlib.com/theme/bootstrap/login-form-07/images/undraw_remotely_2j6y.svg'
                            }
                            alt=""
                            width="750px"
                            height="590px"
                        />
                        {/* <form > */}
                        <div className={cx('Gxi65y-J1i6cp-B-fiUo')}>
                            <div className={cx('gZNAGg')}>
                                <div className={cx('KGUtm')}>
                                    <div className={cx('K1dDgL')}>Đăng nhập</div>
                                </div>
                            </div>
                            <div className={cx('yXry6s')}>
                                <div className={cx('D3QIf1')}>
                                    <div className={cx('lab-username')}>Tên đăng nhập</div>
                                    <div className={cx('yup5K8')}>
                                        <input
                                            id="pDzPRp-username"
                                            className={cx('pDzPRp-username')}
                                            type="text"
                                            placeholder="Tên đăng nhập"
                                            name="loginKey"
                                            onChange={(e) => setUserNameValue(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className={cx('vkgBkQ')}>
                                    <div className={cx('lab-username')}>Mật khẩu</div>
                                    <div className={cx('yup5K8')}>
                                        <input
                                            id="pDzPRp-password"
                                            className={cx('pDzPRp-password')}
                                            type="password"
                                            placeholder="Mật khẩu"
                                            name="password"
                                            onChange={(e) => setPasswordValue(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <button
                                    className={cx('btn-cepDQ1_7w24N1')}
                                    onClick={() => handleSubmitLogin(userNameValue, passwordValue)}
                                >
                                    Đăng nhập
                                </button>
                            </div>
                        </div>
                        {/* </form> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginAdmin;
