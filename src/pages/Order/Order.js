import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Order.module.scss';

const cx = classNames.bind(styles);

function Order() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('ZrE0do')}>
                <div className={cx('w6riq3')}>
                    <div className={cx('-JzzK5')}>
                        <div className={cx('HTDM2R_OiE33Y')}>
                            <div className={cx('HTDM2R_wXtDZ')}>Sản phẩm</div>
                        </div>

                        <div className={cx('HTDM2R')}>Đơn giá</div>
                        <div className={cx('HTDM2R')}>Số lượng</div>
                        <div className={cx('HTDM2R_eiM3n1')}>Thành tiền</div>
                    </div>
                </div>
                {/* / */}
                <div>
                    <div className={cx('dwwHJ-')}>
                        <div>
                            <div className={cx('nF6yNn')}>
                                <div className={cx('yknSi4')}>
                                    <div className={cx('WJIXj0')}>haisanmekong</div>
                                </div>
                                <div className={cx('CZ6uu2')}>
                                    <div className={cx('_6kMvNg_ka6CzP')}>
                                        <div className={cx('_4MGXB1_c7N4lb')}>
                                            <img
                                                className={cx('GCGEKm')}
                                                alt=""
                                                src="https://cf.shopee.vn/file/2b2db8d56d4ccddc3c0645cdb9507594_tn"
                                                width="40"
                                                height="40"
                                            />
                                            <span className={cx('F8X-cZ')}>
                                                <span className={cx('tPzkNt')}>
                                                    Khô cá lóc ,hàng loại đặc biệt đủ 3 nắng Đồng Tháp ,thịt dai,ngọt
                                                    ,mặn vừa ăn ,sản phẩm trọng lượng đúng chuẩn
                                                </span>
                                            </span>
                                        </div>
                                        <div className={cx('_4MGXB1')}>₫119.000</div>
                                        <div className={cx('_4MGXB1')}>1</div>
                                        <div className={cx('_4MGXB1_8fgmps')}>₫119.000</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* / */}
                        <div className={cx('BbOmi')}>
                            <div className={cx('lYtB1r')}>
                                <div className={cx('_4nelpz')}>Tổng số tiền (1 sản phẩm):</div>
                                <div className={cx('_31ayp3')}>₫151.800</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('KbJ00X')}>
                <div className={cx('EQBEfe')}>
                    <div className={cx('_7ZP-sx')}>
                        <div className={cx('Kh34EJ')}>
                            <div className={cx('_9VHkyQ')}>
                                <FontAwesomeIcon className={cx('icon-location-marker')} icon={faLocationDot} />
                            </div>
                            <span>Địa chỉ nhận hàng</span>
                        </div>
                    </div>
                    <div className={cx('fnands')}>
                        <div>
                            <div className={cx('Y3QA5S')}>
                                <div className={cx('_3yvPt8')}>nguyễn thanh (+84) 918814023</div>
                                <div className={cx('iXqine')}>
                                    Cầu An Hóa, Cầu An Hóa, Xã An Hóa, Huyện Châu Thành, Bến Tre
                                </div>
                            </div>
                        </div>
                        <div className={cx('g3BSHI')}>Thay đổi</div>
                    </div>
                </div>
            </div>
            {/* / */}
            <div className={cx('kRed1l')}>
                <div className={cx('HgQ4yt')}>
                    <div>
                        <div className={cx('checkout-payment-method-view__current')}>
                            <div className={cx('checkout-payment-method-view__current-title')}>
                                Phương thức thanh toán
                            </div>
                            <div className={cx('checkout-payment-setting__payment-methods-tab')}>
                                <span tabindex="0">
                                    <button
                                        className={cx('product-variation--selected')}
                                        aria-label="Ví ShopeePay"
                                        aria-disabled="false"
                                    >
                                        Ví ShopeePay
                                        <div className={cx('product-variation__tick')}>
                                            <svg
                                                enableBackground="new 0 0 12 12"
                                                viewBox="0 0 12 12"
                                                x="0"
                                                y="0"
                                                className={cx('icon-tick-bold-1')}
                                            >
                                                <g>
                                                    <path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path>
                                                </g>
                                            </svg>
                                        </div>
                                    </button>
                                </span>
                                <span tabindex="0">
                                    <button className={cx('product-variation--selected')}>
                                        Thẻ Tín dụng/Ghi nợ
                                        <div className={cx('product-variation__tick')}>
                                            <svg
                                                enableBackground="new 0 0 12 12"
                                                viewBox="0 0 12 12"
                                                x="0"
                                                y="0"
                                                className={cx('icon-tick-bold-2')}
                                            >
                                                <g>
                                                    <path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path>
                                                </g>
                                            </svg>
                                        </div>
                                    </button>
                                </span>
                                <span tabindex="0">
                                    <button className={cx('product-variation--selected')}>
                                        Thanh toán khi nhận hàng
                                        <div className={cx('product-variation__tick')}>
                                            <svg
                                                enableBackground="new 0 0 12 12"
                                                viewBox="0 0 12 12"
                                                x="0"
                                                y="0"
                                                className={cx('icon-tick-bold-3')}
                                            >
                                                <g>
                                                    <path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path>
                                                </g>
                                            </svg>
                                        </div>
                                    </button>
                                </span>
                            </div>
                        </div>
                        <div className={cx('_3hU2wO')}>
                            <div className={cx('hVo8me')}>
                                <div className={cx('WHQQMV')}>Thanh toán khi nhận hàng</div>
                                <div className={cx('g5caBa')}>
                                    <div className={cx('cOrEtX')}>
                                        Phí thu hộ: ₫0 VNĐ. Ưu đãi về phí vận chuyển (nếu có) áp dụng cả với phí thu hộ.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('KqH1Px')}>
                    <div className={cx('lhwDvd_Exv9ow_c5Dezq')}>Tổng tiền hàng</div>
                    <div className={cx('lhwDvd_Uu2y3K_c5Dezq')}>₫218.000</div>
                    <div className={cx('lhwDvd_Exv9ow_B6k-vE')}>Phí vận chuyển</div>
                    <div className={cx('lhwDvd_Uu2y3K_B6k-vE')}>₫75.300</div>
                    <div className={cx('lhwDvd_Exv9ow_A4gPS6')}>Tổng thanh toán:</div>
                    <div className={cx('lhwDvd_0tdvp_Uu2y3K_A4gPS6')}>₫293.300</div>
                    <div className={cx('Ql2fz0')}>
                        <button class={cx('stardust-button--large_gG-FcK')}>Đặt hàng</button>
                    </div>
                </div>
            </div>
            {/* / */}
        </div>
    );
}

export default Order;
