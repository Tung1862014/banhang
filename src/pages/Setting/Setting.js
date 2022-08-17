import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './Setting.module.scss';
import Menu from '~/components/Layout/components/Header/SignInAndSignUp/Menu';
import MenuItem from '~/components/Layout/components/Header/SignInAndSignUp/Menu/MenuItem';
import GetCookie from '~/components/Hook/GetCookies';
import { useDebounce } from '~/hooks';
import RemoveCookie from '~/components/Hook/RemoveCookies';
import SetCookie from '~/components/Hook/SetCookies';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Setting() {
    const dateValue = new Date(JSON.parse(GetCookie('usrin')).Ngaysinh);
    let day = dateValue.getDate();
    let month = dateValue.getMonth() + 1;
    let year = dateValue.getFullYear();
    let YMD = '';
    if (month < 10) {
        YMD = year + '-0' + month + '-' + day;
    } else if (day < 10) {
        YMD = year + '-' + month + '-0' + day;
    } else {
        YMD = year + '-' + month + '-' + day;
    }

    const [fullName, setFullName] = useState(JSON.parse(GetCookie('usrin')).Hoten);
    //const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState(JSON.parse(GetCookie('usrin')).Email);
    const [userPassword, setUserPassword] = useState(JSON.parse(GetCookie('usrin')).password);
    const [repeatPassword, setRepeatPassword] = useState(JSON.parse(GetCookie('usrin')).password);
    const [imageValue, setImageValue] = useState(JSON.parse(GetCookie('usrin')).image);
    const [address, setAddress] = useState('Can Tho');
    const [birthday, setBirthday] = useState(YMD);
    const [phone, setPhone] = useState(JSON.parse(GetCookie('usrin')).Sodt);
    const [checkEmail, setCheckEmail] = useState(JSON.parse(GetCookie('usrin')).Email ? true : false);
    const [blur, setBlur] = useState(false);
    const [testPassword, setTestPassword] = useState(JSON.parse(GetCookie('usrin')).password.length > 6 ? true : false);
    const [checkPassword, setCheckPassword] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [loading, setLoading] = useState(false);

    //const [user, setUser] = useState();

    const userE = useDebounce(userEmail, 500);
    const userPass = useDebounce(userPassword, 500);
    const repeatPass = useDebounce(repeatPassword, 500);
    //const userNameCookie = JSON.parse(GetCookie('usrin'));

    const inputRef = useRef();

    //console.log('Image: ' + image);

    useEffect(() => {
        const regexExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // eslint-disable-line

        if (regexExp.test(userE)) {
            setCheckEmail((prev) => !prev);
            console.log('Check mail true');
        } else {
            setCheckEmail(false);
            console.log('Check mail false');
            // console.log('' + inputRef.current.focus());
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

    function ChooseImg(e) {
        const chooseFile = document.getElementById('choose-file');
        const imgPreview = document.getElementById('img-preview-setting-show');
        const files = chooseFile.files[0];
        if (files) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(files);
            fileReader.addEventListener('load', function () {
                imgPreview.style.display = 'flex';
                imgPreview.innerHTML =
                    '<img src="' +
                    this.result +
                    '" style =" width: 150px; display: flex;  justify-content: center;  align-items: center;"/>';
            });
            setImageValue(e.target.files);
            setShowImage(true);
        }
    }
    const handleUpdateUser = () => {
        setLoading(true);
        const formData = new FormData();
        if (imageValue[0] !== 'h') {
            formData.append('image', imageValue[0]);
        }

        formData.append('fullName', fullName);
        formData.append('idND', JSON.parse(GetCookie('usrin')).idND);
        formData.append('password', userPassword);
        formData.append('email', userEmail);
        formData.append('address', address);
        formData.append('birthday', birthday);
        formData.append('phone', phone);

        let urlNode = null;
        if (imageValue[0] !== 'h') {
            urlNode = `${process.env.REACT_APP_URL_NODEJS}/customer/user/image`;
        } else {
            urlNode = `${process.env.REACT_APP_URL_NODEJS}/customer/user`;
        }

        axios({
            method: 'PUT',
            url: urlNode,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((res) => {
                if (res.data.result !== undefined) {
                    RemoveCookie('usrin');
                    SetCookie('usrin', JSON.stringify(res.data.result));
                    console.log('data: ' + JSON.stringify(res.data));
                    //alert('Cập nhật thành công');
                    //window.open(`${process.env.REACT_APP_URL}/user/setting`, '_self', 1);
                    setLoading(false);
                    toast.success('Update Successfully ', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    setTimeout(
                        () => window.open(`${process.env.REACT_APP_URL_FRONTEND}/user/setting`, '_self', 1),
                        5000,
                    );
                } else {
                    setLoading(false);
                    console.log('Loi: ' + JSON.stringify(res.data));
                }
            })
            .catch(() => {
                setLoading(false);
                console.log('error data');
            });
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('loading')}>
                <div className={cx('container')}>
                    <div className={cx('heading')}>Thông Tin Người Dùng</div>
                    <div className={cx('form_group-sign-up')}>
                        {/* <img src={userNameCookie.image} alt="" /> */}
                        <Menu>
                            <MenuItem
                                className1="form_group-control-setting"
                                className2="form_label"
                                className3="form_control"
                                className4="form_message"
                                title="Tên đầy đủ"
                                name="fullname"
                                type="text"
                                value={fullName}
                                placeholder="VD: Thanh Tùng"
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </Menu>

                        <Menu>
                            <MenuItem
                                className1="form_group-control-setting"
                                className2="form_label"
                                className3="form_control"
                                className4="form_message"
                                title="Mật khẩu"
                                name="password"
                                type="password"
                                value={userPassword}
                                placeholder="VD 1234567"
                                onChange={(e) => handlePassword(e)}
                                test1={userPass !== ''}
                                test2={!testPassword}
                                titleError="Mật khẩu phải lớn hơn 6 ký tự"
                            />
                        </Menu>

                        <Menu>
                            <MenuItem
                                className1="form_group-control-setting"
                                className2="form_label"
                                className3="form_control"
                                className4="form_message"
                                title="Nhập lại mật khẩu"
                                name="password_confirmation"
                                type="password"
                                value={repeatPassword}
                                placeholder="Nhập lại mật khẩu"
                                onChange={(e) => setRepeatPassword(e.target.value)}
                                test1={repeatPass !== ''}
                                test2={!checkPassword}
                                titleError="Mật khẩu không khớp"
                            />
                        </Menu>

                        <Menu>
                            <MenuItem
                                className1="form_group-control-setting"
                                className2="form_label"
                                className3="form_control"
                                className4="form_message"
                                inputRef={inputRef}
                                title="Email"
                                name="email"
                                type="text"
                                value={userEmail}
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
                                className1="form_group-control-setting"
                                className2="form_label"
                                className3="form_control"
                                className4="form_message"
                                title="Địa chỉ"
                                name="address"
                                type="text"
                                value={address}
                                placeholder="VD: Cần Thơ"
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Menu>

                        <Menu>
                            <MenuItem
                                className1="form_group-control-setting"
                                className2="form_label"
                                className3="form_control"
                                className4="form_message"
                                title="Ngày sinh"
                                name="birthday"
                                type="date"
                                value={birthday}
                                placeholder="VD: 14/02/2000"
                                onChange={(e) => setBirthday(e.target.value)}
                            />
                        </Menu>

                        <Menu>
                            <MenuItem
                                className1="form_group-control-setting"
                                className2="form_label"
                                className3="form_control"
                                className4="form_message"
                                title="Số điện thoại"
                                name="phone"
                                type="text"
                                value={phone}
                                placeholder="VD: 0918814027"
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Menu>
                        <div>
                            <Menu>
                                <MenuItem
                                    className1="form_group-control-image"
                                    className2="form_label-image"
                                    className3="form_control"
                                    className4="form_message"
                                    className5="img-preview-setting-show"
                                    title="Chọn ảnh đại diện"
                                    name="choose-file"
                                    idname="choose-file"
                                    type="file"
                                    valueImage={showImage}
                                    image={imageValue || process.env.REACT_APP_URL_IMAGE_AVATAR}
                                    check={true}
                                    accept="image/*"
                                    hidden
                                    onChange={(e) => ChooseImg(e)}
                                />
                            </Menu>
                        </div>
                    </div>

                    <div className={cx('btn-submit-update')}>
                        <Button primary onClick={handleUpdateUser}>
                            Cập Nhật
                        </Button>
                    </div>
                </div>
                <ToastContainer />
            </div>
            {loading && (
                <div className={cx('loading-icon')}>
                    <FontAwesomeIcon className={cx('loading-icon-setting')} icon={faSpinner} />
                </div>
            )}
        </div>
    );
}

export default Setting;
