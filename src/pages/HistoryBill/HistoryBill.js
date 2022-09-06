import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './HistoryBill.module.scss';

const cx = classNames.bind(styles);

function HistoryBill() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('GBcYbK')}>
                <div className={cx('Tfo7DW')}>
                    <button className={cx('Tfo7DW-btn')}>
                        <FontAwesomeIcon className={cx('Tfo7DW-icon')} icon={faMagnifyingGlass} />
                    </button>
                    <input
                        autoComplete="off"
                        placeholder="Tìm kiếm theo Tên Shop, ID đơn hàng hoặc Tên Sản phẩm"
                    ></input>
                </div>
                <div className={cx('_0obGFe')}>
                    <a className={cx('vAkdD01')} href="/user/purchase/?type=6">
                        <span className={cx('_0rjE9m')}>Tất cả</span>
                    </a>
                    <a className={cx('vAkdD02')} href="/user/purchase/?type=9">
                        <span className={cx('_0rjE9m')}>Chờ xác nhận</span>
                    </a>
                    <a className={cx('vAkdD03')} href="/user/purchase/?type=8">
                        <span className={cx('_0rjE9m')}>Đã giao</span>
                    </a>
                    <a className={cx('vAkdD04')} href="/user/purchase/?type=4">
                        <span className={cx('_0rjE9m')}>Đã Hủy</span>
                    </a>
                </div>
                {/* / */}
                <div className={cx('LHWdmn')}>
                    <div className={cx('bU5w7c')}>
                        <div className={cx('A849D8')}>
                            <img
                                className={cx('A849D8-image')}
                                src={
                                    'https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/5fafbb923393b712b96488590b8f781f.png'
                                }
                                alt=""
                            />
                        </div>
                        <div className={cx('hKbGrP')}>Chưa có đơn hàng</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HistoryBill;
