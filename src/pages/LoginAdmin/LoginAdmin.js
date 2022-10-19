import axios from 'axios';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
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
                    //console.log('');
                    toast.error('Tài khoản không tồn tại!', {
                        position: toast.POSITION.TOP_CENTER,
                    });
                } else if (res.data.result === undefined && res.data.account === true && res.data.password === false) {
                    //console.log('sai mat khau');
                    toast.error('sai mật khẩu!', {
                        position: toast.POSITION.TOP_CENTER,
                    });
                } else {
                    console.log('');
                    toast.success('Đăng nhập thành công', {
                        position: toast.POSITION.TOP_CENTER,
                    });
                    RemoveCookie('admin');
                    SetCookie('admin', JSON.stringify(res.data.result));
                    setTimeout(
                        () =>
                            window.open(`${process.env.REACT_APP_URL_FRONTEND}/admin/manage/customer=all`, '_self', 1),
                        2000,
                    );
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
                            <a className={cx('UbNlH7')} href="/" alt="">
                                <img src={`${process.env.REACT_APP_URL_NODEJS}/logo/SanPhamChoMoi.png`} alt="" />
                            </a>
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
                            className={cx('_3M9lzn-PeA8Gc-image')}
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
            <ToastContainer />
        </div>
    );
}

export default LoginAdmin;
