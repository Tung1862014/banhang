import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { BackIcon, CloseIcon } from '~/components/Icons';
import Button from '~/components/Button';
import { useState } from 'react';
import { useDebounce } from '~/hooks';
import { useEffect, useRef } from 'react';

const cx = classNames.bind(styles);

function SignUp({ onClickSignUp, onClick, onRegister }) {
    const [fullName, setFullName] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [address, setAddress] = useState('');
    const [birthday, setBirthday] = useState('');
    const [phone, setPhone] = useState('');
    const [checkEmail, setCheckEmail] = useState(false);
    const [blur, setBlur] = useState(false);
    const [checkPassword, setCheckPassword] = useState(false);

    const userE = useDebounce(userEmail, 500);
    const userPass = useDebounce(userPassword, 500);
    const repeatPass = useDebounce(repeatPassword, 500);

    const inputRef = useRef();

    useEffect(() => {
        const regexExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // eslint-disable-line

        if (regexExp.test(userE)) {
            setCheckEmail((prev) => !prev);
            console.log('Check mail su');
        } else {
            setCheckEmail(false);
            console.log('Check mail false');
            // console.log('focus' + inputRef.current.focus());
        } // true
    }, [userE]);

    useEffect(() => {
        if (userPass === repeatPass) {
            setCheckPassword((prev) => !prev);
            console.log('dung');
        } else {
            setCheckPassword(false);
            console.log('loiiii nha');
        }
    }, [repeatPass, userPass]);

    return (
        <div className={cx('main')}>
            <div className={cx('form')} id="form-1">
                <button className={cx('btn-icon-back')} onClick={onClick}>
                    <BackIcon className={cx('icon-back')} />
                </button>
                <button className={cx('btn-icon-close')} onClick={onClickSignUp}>
                    <CloseIcon className={cx('icon-close')} />
                </button>
                <h3 className={cx('heading')}>Thành viên đăng ký</h3>

                <div className={cx('spacer')}></div>

                <div className={cx('form_group')}>
                    <label htmlFor="fullname" className={cx('form_label')}>
                        Tên đầy đủ <font color=" red"> *</font>
                    </label>
                    <input
                        id="fullname"
                        name="fullname"
                        type="text"
                        placeholder="VD: Thanh Tùng"
                        className={cx('form_control')}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <span className={cx('form_message')}></span>
                </div>

                <div className={cx('form_group')}>
                    <label htmlFor="userName" className={cx('form_label')}>
                        Tên đăng nhập <font color=" red"> *</font>
                    </label>
                    <input
                        id="userName"
                        name="userName"
                        type="text"
                        placeholder="VD: ThanhTung"
                        className={cx('form_control')}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <span className={cx('form_message')}></span>
                </div>

                <div className={cx('form_group')}>
                    <label htmlFor="email" className={cx('form_label')}>
                        Email<font color=" red"> *</font>
                    </label>
                    <input
                        ref={inputRef}
                        id="email"
                        name="email"
                        type="text"
                        placeholder="VD: email@domain.com"
                        className={cx('form_control')}
                        onChange={(e) => setUserEmail(e.target.value)}
                        onBlur={() => setBlur((prev) => !prev)}
                        onFocus={() => setBlur(false)}
                    />
                    {userE !== '' && !checkEmail && blur && (
                        <span className={cx('form_message')}>Email không hợp lệ</span>
                    )}
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
                        onChange={(e) => setUserPassword(e.target.value)}
                    />
                    <span className={cx('form_message')}></span>
                </div>

                <div className={cx('form_group')}>
                    <label htmlFor="password_confirmation" className={cx('form_label')}>
                        Nhập lại mật khẩu<font color=" red"> *</font>
                    </label>
                    <input
                        id="password_confirmation"
                        name="password_confirmation"
                        placeholder="Nhập lại mật khẩu"
                        type="password"
                        className={cx('form_control')}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                    {repeatPass !== '' && !checkPassword && (
                        <span className={cx('form_message')}>Mật khẩu không khớp</span>
                    )}
                </div>
                <div className={cx('form_group')}>
                    <label htmlFor="address" className={cx('form_label')}>
                        Địa chỉ <font color=" red"> *</font>
                    </label>
                    <input
                        id="address"
                        name="address"
                        type="text"
                        placeholder="VD: 14/02/2000"
                        className={cx('form_control')}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <span className={cx('form_message')}></span>
                </div>
                <div className={cx('form_group')}>
                    <label htmlFor="birthday" className={cx('form_label')}>
                        Ngày sinh <font color=" red"> *</font>
                    </label>
                    <input
                        id="birthday"
                        name="birthday"
                        type="date"
                        placeholder="VD: 14/02/2000"
                        className={cx('form_control')}
                        onChange={(e) => setBirthday(e.target.value)}
                    />
                    <span className={cx('form_message')}></span>
                </div>

                <div className={cx('form_group')}>
                    <label htmlFor="birthday" className={cx('form_label')}>
                        Số điện thoại <font color=" red"> *</font>
                    </label>
                    <input
                        id="birthday"
                        name="birthday"
                        type="text"
                        placeholder="VD: 0918814027"
                        className={cx('form_control')}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <span className={cx('form_message')}></span>
                </div>

                <Button
                    className={cx('form_submit')}
                    to=""
                    onClick={() => {
                        checkEmail &&
                            checkPassword &&
                            onRegister(fullName, userName, userEmail, userPassword, address, birthday, phone);
                    }}
                >
                    {'Đăng ký'}
                </Button>
            </div>
        </div>
    );
}

export default SignUp;
