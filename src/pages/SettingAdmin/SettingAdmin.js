import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './SettingAdmin.module.scss';

const cx = classNames.bind(styles);

function SettingAdmin() {
    const [userValue, setUaerValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [addressValue, setAddressValue] = useState('');
    const [phoneValue, setPhoneValue] = useState('');
    const [imageValue, setImageValue] = useState('');

    console.log(nameValue, emailValue, addressValue, phoneValue, imageValue);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_URL_NODEJS}/admin/show/account`)
            .then((res) => {
                console.log(res.data.result);
                setUaerValue(res.data.result);
            })
            .catch((err) => {
                console.log('loi');
            });
    }, []);

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
    const handleClickChangePassword = (index) => {
        const formPass = document.getElementById('ReDGyJ');
        if (index === 'close') {
            formPass.style.display = 'none';
        } else {
            formPass.style.display = 'flex';
        }
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
                                                        placeholder="Xã An Hóa, Huyện Châu Thành, Bến Tre  "
                                                        defaultValue={userValue !== '' ? userValue.ND_password : ''}
                                                        // onChange={(e) => setCtyVaule(e.target.value)}
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
                                                        className={cx('ChI2Nx_92k3pl')}
                                                        type="password"
                                                        placeholder="Mật khẩu mới"
                                                        defaultValue={''}
                                                        // onChange={(e) => setCtyVaule(e.target.value)}
                                                    />
                                                </div>
                                                <span className={cx('form_message')}>
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
                                                        className={cx('ChI2Nx_92k3pl')}
                                                        type="password"
                                                        placeholder="Nhập lại mật khẩu"
                                                        defaultValue={''}
                                                        // onChange={(e) => setCtyVaule(e.target.value)}
                                                    />
                                                </div>
                                                <span className={cx('form_message')}>Mật khẩu không khớp</span>
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
                                        className={cx('HtW4DS_IJ1jvV')}
                                        // onClick={() => handleSubmitFormAddress()}
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
                                            type="text"
                                            placeholder=""
                                            maxLength="255"
                                            defaultValue={userValue !== '' ? userValue.ND_email : ''}
                                            onChange={(e) => setEmailValue(e.target.value)}
                                        />
                                    </div>
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
                                        />
                                    </div>
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
                        <button type="button" className={cx('btn-solid-primary')}>
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

export default SettingAdmin;
