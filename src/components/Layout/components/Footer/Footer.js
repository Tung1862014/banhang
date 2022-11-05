import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('name-project')}>
                    <div className={cx('_2ypCMv')}>
                        <div>
                            <div className={cx('shopee-footer-section')}>
                                <div className={cx('elementor-column-gap-default')}>
                                    <div className={cx('elementor-element-14420b8')}>
                                        <h6 className={cx('elementor-size-default')}>THÔNG TIN LIÊN QUAN</h6>
                                    </div>
                                    <div className={cx('elementor-element-14420b8-list')}>
                                        <h6 className={cx('elementor-size-default')}>
                                            Sinh viên thực hiện: Nguyễn Thanh Tùng
                                        </h6>
                                    </div>
                                    <div className={cx('elementor-element-14420b8-list')}>
                                        <h6 className={cx('elementor-size-default')}>Mã số sinh viên: B1805832</h6>
                                    </div>
                                    <div className={cx('elementor-element-14420b8-list')}>
                                        <h6 className={cx('elementor-size-default')}>
                                            Email: tungb11805832@student.ctu.edu.vn
                                        </h6>
                                    </div>
                                </div>
                                <div className={cx('elementor-column-gap-default')}>
                                    <div className={cx('elementor-element-14420b8')}>
                                        <h6 className={cx('elementor-size-default')}>THÔNG TIN LIÊN HỆ</h6>
                                    </div>
                                    <div className={cx('elementor-element-14420b8-list')}>
                                        <h6 className={cx('elementor-size-default')}>
                                            Địa chỉ: Đường Nguyễn Huệ, Ấp Thị,Thị trấn Chợ Mới
                                        </h6>
                                    </div>
                                    <div className={cx('elementor-element-14420b8-list')}>
                                        <h6 className={cx('elementor-size-default')}>
                                            Điện thoại : 0918814027 - 0948833271
                                        </h6>
                                    </div>
                                    <div className={cx('elementor-element-14420b8-list')}>
                                        <h6 className={cx('elementor-size-default')}>
                                            Email: tungb11805832@student.ctu.edu.vn
                                        </h6>
                                    </div>
                                </div>
                                <div className={cx('elementor-column-gap-default')}>
                                    <div className={cx('elementor-element-14420b8-image')}>
                                        <img
                                            src={`${process.env.REACT_APP_URL_NODEJS}/logo/SanPhamChoMoi.png`}
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
