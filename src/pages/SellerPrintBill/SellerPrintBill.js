import classNames from 'classnames/bind';
import styles from './SellerPrintBill.module.scss';

const cx = classNames.bind(styles);

// const pathId = window.location.pathname.toString();
//         const resultId = pathId.slice(26);

function SellerPrintBill() {
    return (
        <div className={cx('wrapper')} onLoad={window.print()}>
            <div className={cx('inner')}>
                <div className={cx('bill-print-detail')}>
                    <div className={cx('header-print')}>
                        <div className={cx('logo-print')}></div>
                        <div className={cx('id-bill-print')}>
                            Mã đơn hàng:
                            <span>1</span>
                        </div>
                    </div>
                    <div className={cx('shop-print-infomation')}>
                        <div className={cx('from-seller')}>
                            <div className={cx('to-print')}>Từ:</div>
                            <div className={cx('address')}>
                                <div className={cx('name-shop')}>Bánh tráng chấm KN</div>
                                <div className={cx('address-shop')}>
                                    240/7 Đường Nguyễn Văn Luông, Phường 11, Quận 6, TP.Hồ Chí Minh
                                </div>
                                <div className={cx('sdt-shop')}>
                                    SĐT: <span>84902611782</span>
                                </div>
                            </div>
                        </div>
                        <div className={cx('from-user')}>
                            <div className={cx('from-print')}>Đến:</div>
                            <div className={cx('address')}>
                                <div className={cx('name-user')}>Bánh tráng chấm KN</div>
                                <div className={cx('address-user')}>
                                    240/7 Đường Nguyễn Văn Luông, Phường 11, Quận 6, TP.Hồ Chí Minh
                                </div>
                                <div className={cx('sdt-user')}>
                                    SĐT: <span>84902611782</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('conten-product')}>
                        <div className={cx('content-title')}>Nội dung hàng(Tổng số lượng sản phẩm: 2)</div>
                        <div className={cx('content-product-detail')}>
                            <span className={cx('stt-product')}>1.</span>
                            <div className={cx('name-product')}>Tóp mỡ cháy tỏi</div>
                            <span className={cx('number-product')}>,,SL: 1</span>
                        </div>
                    </div>
                    <div className={cx('regulations-shop')}>
                        <div className={cx('content-regulations-shop')}>
                            Kiểm tra tên sản phẩm và đối chiếu mã đơn hàng trước khi nhận hàng
                        </div>
                        <div className={cx('date-order')}>
                            <div className={cx('date')}>Ngày đặt hàng:</div>
                            <div className={cx('date-content')}>19/08/2022</div>
                        </div>
                    </div>
                    <div className={cx('money-user')}>
                        <div className={cx('money-user-details')}>
                            <div className={cx('money-title')}>Tiền thu người nhận</div>
                            <div className={cx('money-content')}>135,900 VND</div>
                        </div>
                        <div className={cx('signature-user')}>
                            <div className={cx('signature-title')}>Chữ ký người nhận</div>
                            <div className={cx('signature-content')}>Xác nhận hàng nguyên vẹn,</div>
                            <div className={cx('signature-content')}>không móp/méo, bể/vở</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SellerPrintBill;
