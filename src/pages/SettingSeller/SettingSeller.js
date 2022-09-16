import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import GetCookie from '~/components/Hook/GetCookies';
import styles from './SettingSeller.module.scss';

const cx = classNames.bind(styles);

function SettingSeller() {
    const [userValue, setUserValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [addressValue, setAddressValue] = useState('');
    const [phoneValue, setPhoneValue] = useState('');
    const [imageValue, setImageValue] = useState('');
    const [newPassVlaue, setNewPassVlaue] = useState('');
    const [rewritePassValue, setRewritePassValue] = useState('');

    //
    const [checkPass, setCheckPass] = useState(false);
    const [checkPassRe, setCheckPassRe] = useState(false);

    console.log(nameValue, emailValue, addressValue, phoneValue, imageValue);
    console.log('newPassVlaue', newPassVlaue);
    console.log('rewritePassValue', rewritePassValue);
    console.log('imageValue', imageValue[0]);

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_URL_NODEJS}/seller/show/account?ND_id=${
                    JSON.parse(GetCookie('seller')).ND_id
                }`,
            )
            .then((res) => {
                console.log(res.data.result);
                setUserValue(res.data.result);
            })
            .catch((err) => {
                console.log('loi');
            });
    }, []);

    //Submit update
    const handleSubmitUpdate = () => {
        if (imageValue[0] !== undefined) {
            const formData = new FormData();
            formData.append('image', imageValue[0]);
            formData.append('ND_id', JSON.parse(GetCookie('seller')).ND_id);
            formData.append('ND_hoten', nameValue);
            formData.append('ND_password', newPassVlaue);
            formData.append('ND_email', emailValue);
            formData.append('ND_diachi', addressValue);
            formData.append('ND_sdt', phoneValue);

            axios({
                method: 'PUT',
                url: `${process.env.REACT_APP_URL_NODEJS}/seller/update/account/image`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((res) => {
                    console.log(res.data);
                    //window.open(`${process.env.REACT_APP_URL_FRONTEND}/setting/admin`, '_self', 1);
                })
                .catch((err) => {
                    console.log('loi');
                });
        } else {
            axios
                .put(`${process.env.REACT_APP_URL_NODEJS}/seller/update/account`, {
                    ND_id: JSON.parse(GetCookie('seller')).ND_id,
                    ND_hoten: nameValue,
                    ND_email: emailValue,
                    ND_password: newPassVlaue,
                    ND_diachi: addressValue,
                    ND_sdt: phoneValue,
                })
                .then((res) => {
                    console.log(res.data);
                    window.open(`${process.env.REACT_APP_URL_FRONTEND}/seller/setting/account`, '_self', 1);
                })
                .catch((err) => {
                    console.log('loi');
                });
        }
    };

    function ChooseImg(e) {
        const chooseFile = document.getElementById('LKP1ct');
        const image = document.getElementById('bGrzJw-icon-headshot');
        const files = chooseFile.files[0];
        if (files) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(files);
            fileReader.addEventListener('load', function () {
                image.src = this.result;
                // imgPreview.style.display = 'flex';
                // imgPreview.innerHTML =
                //     '<img src="' +
                //     this.result +
                //     '" style ="width:55px; height:45px; display: flex;  justify-content: center;  align-items: center;"/>';
            });
            setImageValue(e.target.files);
        }
    }

    //password
    const handleClickChangePassword = (index) => {
        const formPass = document.getElementById('ReDGyJ');
        if (index === 'close') {
            formPass.style.display = 'none';
        } else {
            formPass.style.display = 'flex';
        }
    };

    const handleCheckNewPassword = (e) => {
        const newpass = document.getElementById('form_message-new');

        if (e.length !== 0) {
            if (e.length < 7) {
                newpass.style.display = 'flex';
                setCheckPass(true);
            } else {
                newpass.style.display = 'none';
                setCheckPass(false);
            }
        }
    };

    const handleCheckPassword = (e) => {
        const newpass = document.getElementById('ChI2Nx_92k3pl-new');
        const pass = document.getElementById('form_message');
        console.log('newpass', newpass.innerHTML);
        if (e !== newpass.value) {
            pass.style.display = 'flex';
            setCheckPassRe(true);
        } else {
            pass.style.display = 'none';
            setCheckPassRe(false);
        }
    };

    const handleCloseCheckPass = (index) => {
        const newpass = document.getElementById('form_message-new');
        const pass = document.getElementById('form_message');
        if (index === 'new') {
            newpass.style.display = 'none';
        } else {
            pass.style.display = 'none';
        }
    };

    const handleConfirmPassword = () => {
        const newpass = document.getElementById('ChI2Nx_92k3pl-new');
        const rewritepass = document.getElementById('ChI2Nx_92k3pl-rewrite');
        const formPass = document.getElementById('ReDGyJ');
        setNewPassVlaue(newpass.value);
        setRewritePassValue(rewritepass.value);
        formPass.style.display = 'none';
    };

    //email

    const handleCheckEmail = (e) => {
        const emailTest = document.getElementById('form_message-email');

        const regexExp =
            /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!regexExp.test(e)) {
            emailTest.style.display = 'flex';
        }
    };
    const handleCloseCheckEmail = () => {
        const emailTest = document.getElementById('form_message-email');
        emailTest.style.display = 'none';
    };

    //phone
    const handleCheckPhone = (e) => {
        const phoneTest = document.getElementById('form_message-phone');

        if (e.length < 10) {
            phoneTest.style.display = 'flex';
            phoneTest.innerHTML = 'Độ dài số điện thoại chưa đủ';
        } else if (e.length > 10) {
            phoneTest.style.display = 'flex';
            phoneTest.innerHTML = 'Độ dài số điện thoại lớn hơn 10';
        }
    };
    const handleCloseCheckPhone = () => {
        const phoneTest = document.getElementById('form_message-phone');
        phoneTest.style.display = 'none';
    };

    return (
        <div className={cx('wrapper')}>
            <div id="ReDGyJ" className={cx('ReDGyJ')}>
                <div className={cx('_68lNMv')}>
                    <div className={cx('nwCEcV')}>
                        <div className={cx('w2EqJ')}>
                            <div className={cx('_84tOMz')}>Thay đổi mật khẩu</div>
                            {/* <form> */}
                            <div className={cx('lHCVqO')}>
                                <div className={cx('iWBSHn')}>
                                    <div className={cx('_0fHnjY')}>
                                        <div className={cx('XjHkd3')}>
                                            <div className={cx('T1souv')}>
                                                <div className={cx('u1wAmL')}>
                                                    <div className={cx('vEFwLK_6DXlE9')}>Mật khẩu hiện tại</div>
                                                    <input
                                                        className={cx('ChI2Nx_92k3pl')}
                                                        type="password"
                                                        placeholder=" "
                                                        defaultValue={userValue !== '' ? userValue.ND_password : ''}
                                                        // onChange={(e) => setCtyVaule(e.target.value)}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('_0fHnjY')}>
                                        <div className={cx('XjHkd3')}>
                                            <div className={cx('T1souv')}>
                                                <div className={cx('u1wAmL')}>
                                                    <div className={cx('vEFwLK_6DXlE9')}>Mật khẩu mới</div>
                                                    <input
                                                        id="ChI2Nx_92k3pl-new"
                                                        className={cx('ChI2Nx_92k3pl-new')}
                                                        type="password"
                                                        placeholder="Mật khẩu mới"
                                                        defaultValue={newPassVlaue}
                                                        onBlur={(e) => handleCheckNewPassword(e.target.value)}
                                                        onFocus={() => handleCloseCheckPass('new')}
                                                    />
                                                </div>
                                                <span id="form_message-new" className={cx('form_message-new')}>
                                                    Mật khẩu phải lớn hơn 6 ký tự
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('_0fHnjY')}>
                                        <div className={cx('XjHkd3')}>
                                            <div className={cx('T1souv')}>
                                                <div className={cx('u1wAmL')}>
                                                    <div className={cx('vEFwLK_6DXlE9')}>Nhập lại mật khẩu</div>
                                                    <input
                                                        id="ChI2Nx_92k3pl-rewrite"
                                                        className={cx('ChI2Nx_92k3pl-rewrite')}
                                                        type="password"
                                                        placeholder="Nhập lại mật khẩu"
                                                        defaultValue={rewritePassValue}
                                                        onBlur={(e) => handleCheckPassword(e.target.value)}
                                                        onFocus={() => handleCloseCheckPass()}
                                                    />
                                                </div>
                                                <span id="form_message" className={cx('form_message')}>
                                                    Mật khẩu không khớp
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* / */}
                                <div className={cx('GixP1t')}>
                                    <button
                                        className={cx('HtW4DS_x4AEET')}
                                        onClick={() => handleClickChangePassword('close')}
                                    >
                                        Trở Lại
                                    </button>
                                    <button
                                        id="HtW4DS_IJ1jvV"
                                        className={cx('HtW4DS_IJ1jvV')}
                                        onClick={() => {
                                            !checkPass && !checkPassRe && handleConfirmPassword();
                                        }}
                                    >
                                        Xác nhận
                                    </button>
                                </div>
                            </div>
                            {/* </form> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* / */}
            <div className={cx('GDF4Dt')}>
                <div className={cx('aBgnwW')}>
                    <h1 className={cx('QvBZmg')}>Hồ sơ của tôi</h1>
                    <div className={cx('ItVhT')}>Quản lý thông tin hồ sơ</div>
                </div>
            </div>
            {/* / */}
            <div className={cx('xbLgBv')}>
                <div className={cx('cfTCNE')}>
                    {/* <form> */}
                    <div className={cx('es8DWX')}>
                        <div className={cx('_5eQ8vX')}>
                            <div className={cx('_3cfiVM')}>
                                <label>Tên</label>
                            </div>
                            <div className={cx('v1Bl9')}>
                                <div className={cx('input-with-validator-wrapper')}>
                                    <div className={cx('input-with-validator')}>
                                        <input
                                            type="text"
                                            placeholder=""
                                            maxLength="255"
                                            defaultValue={userValue !== '' ? userValue.ND_hoten : ''}
                                            onChange={(e) => setNameValue(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('es8DWX')}>
                        <div className={cx('_5eQ8vX')}>
                            <div className={cx('_3cfiVM')}>
                                <label>Email</label>
                            </div>
                            <div className={cx('v1Bl9')}>
                                <div className={cx('input-with-validator-wrapper')}>
                                    <div className={cx('input-with-validator')}>
                                        <input
                                            type="email"
                                            placeholder=""
                                            maxLength="255"
                                            defaultValue={userValue !== '' ? userValue.ND_email : ''}
                                            onChange={(e) => setEmailValue(e.target.value)}
                                            onBlur={(e) => handleCheckEmail(e.target.value)}
                                            onFocus={() => handleCloseCheckEmail()}
                                        />
                                    </div>
                                    <span id="form_message-email" className={cx('form_message-email')}>
                                        Email chưa hợp lệ
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('es8DWX')}>
                        <div className={cx('_5eQ8vX')}>
                            <div className={cx('_3cfiVM')}>
                                <label>Địa chỉ</label>
                            </div>
                            <div className={cx('v1Bl9')}>
                                <div className={cx('input-with-validator-wrapper')}>
                                    <div className={cx('input-with-validator')}>
                                        <input
                                            type="text"
                                            placeholder=""
                                            maxLength="255"
                                            defaultValue={userValue !== '' ? userValue.ND_diachi : ''}
                                            onChange={(e) => setAddressValue(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('es8DWX')}>
                        <div className={cx('_5eQ8vX')}>
                            <div className={cx('_3cfiVM')}>
                                <label>Số điện thoại</label>
                            </div>
                            <div className={cx('v1Bl9')}>
                                <div className={cx('input-with-validator-wrapper')}>
                                    <div className={cx('input-with-validator')}>
                                        <input
                                            type="text"
                                            placeholder=""
                                            defaultValue={userValue !== '' ? userValue.ND_sdt : ''}
                                            onChange={(e) => setPhoneValue(e.target.value)}
                                            onBlur={(e) => handleCheckPhone(e.target.value)}
                                            onFocus={() => handleCloseCheckPhone()}
                                        />
                                    </div>
                                    <span id="form_message-phone" className={cx('form_message-phone')}></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('es8DWX')}>
                        <div className={cx('_5eQ8vX')}>
                            <div className={cx('_3cfiVM')}>
                                <label>Thay đổi mật khẩu</label>
                            </div>
                            <div className={cx('v1Bl9')}>
                                <div className={cx('_2MJTPE')}>
                                    <div className={cx('J7g-AJ')}></div>
                                    <button className={cx('OcJZJm')} onClick={handleClickChangePassword}>
                                        Thay đổi
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('HqWwZ8')}>
                        <button type="button" className={cx('btn-solid-primary')} onClick={() => handleSubmitUpdate()}>
                            Lưu
                        </button>
                    </div>
                    {/* </form> */}
                </div>
                <div className={cx('x40Sa7')}>
                    <div className={cx('_8LEXgI')}>
                        <div className={cx('snzcsS')}>
                            <div className={cx('wWOwv6')}>
                                {/* <svg
                                    enableBackground="new 0 0 15 15"
                                    viewBox="0 0 15 15"
                                    x="0"
                                    y="0"
                                    className={cx('bGrzJw-icon-headshot')}
                                >
                                    <g>
                                        <circle cx="7.5" cy="4.5" fill="none" r="3.8" strokeMiterlimit="10"></circle>
                                        <path
                                            d="m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeMiterlimit="10"
                                        ></path>
                                    </g>
                                </svg> */}
                                <img
                                    id="bGrzJw-icon-headshot"
                                    className={cx('bGrzJw-icon-headshot')}
                                    src={
                                        userValue !== ''
                                            ? userValue.ND_image
                                            : `${process.env.REACT_APP_URL_IMAGE_AVATAR}`
                                    }
                                    alt=""
                                />
                            </div>
                        </div>
                        <input
                            id="LKP1ct"
                            className={cx('LKP1ct')}
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            onChange={(e) => ChooseImg(e)}
                        />
                        <label htmlFor="LKP1ct" type="button" className={cx('btn-light-btn--m')}>
                            Chọn ảnh
                        </label>
                        <div className={cx('CqJMQZ')}>
                            <div className={cx('IJoKH5')}>Chọn ảnh đại diện</div>
                        </div>
                        {/* / */}
                    </div>
                </div>
                {/* / */}
            </div>
        </div>
    );
}

export default SettingSeller;
