import classNames from 'classnames/bind';
import styles from './SettingAdmin.module.scss';

const cx = classNames.bind(styles);

function SettingAdmin() {
    return (
        <div className={cx('wrapper')}>
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
                                        <input type="text" placeholder="" maxlength="255" value="" />
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
                                        <input type="text" placeholder="" maxlength="255" value="" />
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
                                        <input type="text" placeholder="" maxlength="255" value="" />
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
                                        <input type="text" placeholder="" maxlength="255" value="" />
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
                                    <button className={cx('OcJZJm')}>Thay đổi</button>
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
                {/* / */}
            </div>
        </div>
    );
}

export default SettingAdmin;
