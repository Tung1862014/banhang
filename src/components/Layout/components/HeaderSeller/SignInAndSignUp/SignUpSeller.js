import classNames from 'classnames/bind';
import styles from './SignInAndSignUp.module.scss';
import { BackIcon, CloseIcon } from '~/components/Icons';
import Button from '~/components/Button';
import { useState } from 'react';
import { useDebounce } from '~/hooks';
import { useEffect, useRef } from 'react';
import Menu from './Menu';
import MenuItem from './Menu/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function SignUpSeller({ onClickSignUp, onClickSeller, onRegister, Loading }) {
    const [fullName, setFullName] = useState('');
    //const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    //const [image, setImage] = useState('');
    const [address, setAddress] = useState('');
    //const [birthday, setBirthday] = useState('');
    const [phone, setPhone] = useState('');
    const [checkEmail, setCheckEmail] = useState(false);
    const [blur, setBlur] = useState(false);
    const [testPassword, setTestPassword] = useState(false);
    const [checkPassword, setCheckPassword] = useState(false);

    const userE = useDebounce(userEmail, 500);
    const userPass = useDebounce(userPassword, 500);
    const repeatPass = useDebounce(repeatPassword, 500);

    const inputRef = useRef();

    //console.log('Image: ' + image);
    let dateValue = new Date();
    let day = dateValue.getDate();
    let month = dateValue.getMonth() + 1;
    let year = dateValue.getFullYear();
    let YMD;
    if (month < 10) {
        YMD = year + '-0' + month + '-' + day;
    } else if (day < 10) {
        YMD = year + '-' + month + '-0' + day;
    } else {
        YMD = year + '-' + month + '-' + day;
    }
    console.log('date: ' + YMD);

    useEffect(() => {
        const regexExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // eslint-disable-line

        if (regexExp.test(userE)) {
            setCheckEmail(true);
            console.log('Check mail true');
        } else {
            setCheckEmail(false);
            console.log('Check mail false');
            // console.log('focus' + inputRef.current.focus());
        } // true
    }, [userE]);

    useEffect(() => {
        if (userPass === repeatPass) {
            setCheckPassword(true);
            console.log('dung');
        } else {
            setCheckPassword(false);
            console.log('loiiii nha');
        }
    }, [repeatPass, userPass]);

    const handlePassword = (e) => {
        setUserPassword(e.target.value);
        //console.log('lenght: ' + e.target.value.length);
        if (e.target.value.length > 6) {
            setTestPassword(true);
        } else {
            setTestPassword(false);
        }
    };

    return (
        <div className={cx('main')}>
            <div className={cx('loading-signUp')}>
                <div className={cx('form-sign-up')} id="form-1">
                    <button className={cx('btn-icon-back')} onClick={onClickSeller}>
                        <BackIcon className={cx('icon-back')} />
                    </button>
                    <button className={cx('btn-icon-close')} onClick={onClickSignUp}>
                        <CloseIcon className={cx('icon-close')} />
                    </button>
                    <h3 className={cx('heading')}>Thành viên đăng ký</h3>

                    <div className={cx('spacer')}></div>
                    <div className={cx('form_group-sign-up')}>
                        <Menu>
                            <MenuItem
                                className1="form_group-control"
                                className2="form_label"
                                className3="form_control"
                                className4="form_message"
                                title="Tên đầy đủ"
                                name="fullname"
                                type="text"
                                placeholder="VD: Thanh Tùng"
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </Menu>

                        <Menu>
                            <MenuItem
                                className1="form_group-control"
                                className2="form_label"
                                className3="form_control"
                                className4="form_message"
                                title="Mật khẩu"
                                name="password"
                                type="password"
                                placeholder="VD 1234567"
                                onChange={(e) => handlePassword(e)}
                                test1={userPass !== ''}
                                test2={!testPassword}
                                titleError="Mật khẩu phải lớn hơn 6 ký tự"
                            />
                        </Menu>

                        <Menu>
                            <MenuItem
                                className1="form_group-control"
                                className2="form_label"
                                className3="form_control"
                                className4="form_message"
                                title="Nhập lại mật khẩu"
                                name="password_confirmation"
                                type="password"
                                placeholder="Nhập lại mật khẩu"
                                onChange={(e) => setRepeatPassword(e.target.value)}
                                test1={repeatPass !== ''}
                                test2={!checkPassword}
                                titleError="Mật khẩu không khớp"
                            />
                        </Menu>

                        <Menu>
                            <MenuItem
                                className1="form_group-control"
                                className2="form_label"
                                className3="form_control"
                                className4="form_message"
                                inputRef={inputRef}
                                title="Email"
                                name="email"
                                type="text"
                                placeholder="VD: email@domain.com"
                                onChange={(e) => setUserEmail(e.target.value)}
                                onBlur={() => setBlur((prev) => !prev)}
                                onFocus={() => setBlur(false)}
                                test1={userE !== ''}
                                test2={!checkEmail}
                                test3={blur}
                                titleError="Email không hợp lệ"
                            />
                        </Menu>

                        <Menu>
                            <MenuItem
                                className1="form_group-control"
                                className2="form_label"
                                className3="form_control"
                                className4="form_message"
                                title="Địa chỉ"
                                name="address"
                                type="text"
                                placeholder="VD: Cần Thơ"
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Menu>

                        <Menu>
                            <MenuItem
                                className1="form_group-control"
                                className2="form_label"
                                className3="form_control"
                                className4="form_message"
                                title="Số điện thoại"
                                name="phone"
                                type="text"
                                placeholder="VD: 0918814027"
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Menu>
                    </div>

                    <Button
                        className={cx('form_submit')}
                        to=""
                        onClick={() => {
                            checkEmail &&
                                checkPassword &&
                                onRegister(fullName, userEmail, userPassword, address, phone, YMD);
                        }}
                    >
                        {'Đăng ký'}
                    </Button>
                </div>
                {Loading && (
                    <div className={cx('loading-icon-sign-up')}>
                        <FontAwesomeIcon className={cx('loading-icon-sigIn')} icon={faSpinner} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default SignUpSeller;
