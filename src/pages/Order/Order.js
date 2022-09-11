import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import GetCookie from '~/components/Hook/GetCookies';
import styles from './Order.module.scss';

const cx = classNames.bind(styles);

function Order() {
    const [sellerValue, setSellerValue] = useState('');
    const [sellerName, setSellerName] = useState('');
    const [orderValue, setOrderValue] = useState('');
    const [sumNumber, setSumNumber] = useState('');
    const [price, setPrice] = useState('');
    const [userVaule, setUserVaule] = useState('');
    const [ctyVaule, setCtyVaule] = useState('');
    const [addressVaule, setAddressVaule] = useState('');

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_URL_NODEJS}/orderproduct/user/show?ND_id=${
                    JSON.parse(GetCookie('usrin')).ND_id
                }`,
            )
            .then((res) => {
                console.log('data', res.data);
                setUserVaule(res.data.results);
            })
            .catch((err) => {
                console.log('loi');
            });
    }, []);

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_URL_NODEJS}/cartcustomer/cart/show/all?ND_id=${
                    JSON.parse(GetCookie('usrin')).ND_id
                }`,
            )
            .then((res) => {
                //console.log(res.data);
                setOrderValue(res.data.results);
            })
            .catch((err) => {
                console.log('loi');
            });
    }, []);

    useEffect(() => {
        let sellerArr = [];
        let sellerName = [];
        let sumnumber = 0;
        let price = 0;

        for (let i = 0; i < orderValue.length; i++) {
            if (!sellerArr.includes(orderValue[i].NB_id)) {
                sellerArr.push(orderValue[i].NB_id);
                sellerName.push(orderValue[i].seller.NB_hoten);
            }

            sumnumber += 1;
            price +=
                orderValue[i].product.SP_gia *
                orderValue[i].TTDH_soluong *
                ((100 - orderValue[i].product.SP_khuyenmai) / 100);
        }
        console.log('sellerArr', sellerArr);
        if (sellerArr.length > 0) {
            setSellerValue((prev) => {
                const newSeller = [...prev, sellerArr];
                return newSeller[0];
            });
            setSellerName((prev) => {
                const newSeller = [...prev, sellerName];
                return newSeller[0];
            });
        }

        setSumNumber(sumnumber);
        setPrice(price);
    }, [orderValue]);

    function formatCash(str) {
        return str
            .toString()
            .split('')
            .reverse()
            .reduce((prev, next, index) => {
                return (index % 3 ? next : next + '.') + prev;
            });
    }

    const handleSumProduct = (sell) => {
        let numbers = 0;
        console.log('sell', sell);
        for (let i = 0; i < orderValue.length; i++) {
            if (sell === orderValue[i].NB_id) {
                numbers += 1;
            }
        }
        console.log('index', numbers);
        return numbers;
    };

    const handlePriceSeller = (sell) => {
        let price = 0;
        console.log('sell', sell);
        for (let i = 0; i < orderValue.length; i++) {
            if (sell === orderValue[i].NB_id) {
                price +=
                    orderValue[i].product.SP_gia *
                    orderValue[i].TTDH_soluong *
                    ((100 - orderValue[i].product.SP_khuyenmai) / 100);
            }
        }
        console.log('index', price);
        return price;
    };

    const handleShowFormAddress = (index) => {
        const address = document.getElementById('ReDGyJ');
        if (index === 'back') {
            address.style.display = 'none';
        } else {
            address.style.display = 'flex';
        }
    };

    const handleSubmitFormAddress = () => {
        console.log('cty', ctyVaule);
        console.log('address', addressVaule);
        if (ctyVaule === '' && addressVaule === '') {
        } else {
            axios
                .put(`${process.env.REACT_APP_URL_NODEJS}/orderproduct/update/address`, {
                    ND_id: JSON.parse(GetCookie('usrin')).ND_id,
                    ND_ttqhpx: ctyVaule,
                    ND_diachigiaohang: addressVaule,
                })
                .then((res) => {
                    if (res.data.update) {
                        const address = document.getElementById('ReDGyJ');
                        address.style.display = 'none';
                    }
                })
                .catch((err) => {
                    console.log('loi');
                });
        }
    };

    const handleClickPay = (pay) => {
        const buttonTick1 = document.getElementById('product-variation--selected');
        const buttonTick2 = document.getElementById('product-variation--selected_pay');
        const iconTick1 = document.getElementById('icon-tick-bold-1');
        const iconTick2 = document.getElementById('icon-tick-bold-2');
        const payID = document.getElementById('_3hU2wO');
        const orderId = document.getElementById('KqH1Px');

        if (pay === 'pay') {
            buttonTick1.style.color = '#222';
            buttonTick1.style.border = '1px solid #222';
            iconTick1.style.display = 'none';

            buttonTick2.style.color = '#ee4d2d';
            buttonTick2.style.border = '1px solid #ee4d2d';
            iconTick2.style.display = 'inline-block';
            payID.style.display = 'none';
            orderId.style.display = 'none';
        } else {
            buttonTick2.style.color = '#222';
            buttonTick2.style.border = '1px solid #222';
            iconTick2.style.display = 'none';
            const orderId = document.getElementById('KqH1Px');

            buttonTick1.style.color = '#ee4d2d';
            buttonTick1.style.border = '1px solid #ee4d2d';
            iconTick1.style.display = 'inline-block';
            payID.style.display = 'flex';
            orderId.style.display = 'grid';
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div id="ReDGyJ" className={cx('ReDGyJ')}>
                <div className={cx('_68lNMv')}>
                    <div className={cx('nwCEcV')}>
                        <div className={cx('w2EqJ')}>
                            <div className={cx('_84tOMz')}>Cập nhật địa chỉ</div>
                            <form>
                                <div className={cx('lHCVqO')}>
                                    <div className={cx('iWBSHn')}>
                                        <div className={cx('_0fHnjY')}>
                                            <div className={cx('XjHkd3')}>
                                                <div className={cx('T1souv')}>
                                                    <div className={cx('u1wAmL')}>
                                                        <div className={cx('vEFwLK_6DXlE9')}>
                                                            Phường/Xã, Quận/Huyện,Tỉnh/ Thành phố
                                                        </div>
                                                        <input
                                                            className={cx('ChI2Nx_92k3pl')}
                                                            type="text"
                                                            placeholder="Xã An Hóa, Huyện Châu Thành, Bến Tre  "
                                                            defaultValue={
                                                                userVaule !== '' && userVaule.ND_ttqhpx !== ''
                                                                    ? userVaule.ND_ttqhpx
                                                                    : ''
                                                            }
                                                            onChange={(e) => setCtyVaule(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('_0fHnjY')}>
                                            <div className={cx('SnzDoF')}>
                                                <div className={cx('QbqEj_tyikTg_RYXN7V')}>
                                                    <div className={cx('M9JCAS')}>
                                                        <div className={cx('oaCSZH_bG1pWU')}>Địa chỉ cụ thể</div>
                                                        <textarea
                                                            className={cx('gRsrLD')}
                                                            placeholder="Địa chỉ cụ thể"
                                                            defaultValue={
                                                                userVaule !== '' && userVaule.ND_diachigiaohang !== ''
                                                                    ? userVaule.ND_diachigiaohang
                                                                    : ''
                                                            }
                                                            onChange={(e) => setAddressVaule(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* / */}
                                    <div className={cx('GixP1t')}>
                                        <button
                                            className={cx('HtW4DS_x4AEET')}
                                            onClick={() => handleShowFormAddress('back')}
                                        >
                                            Trở Lại
                                        </button>
                                        <button
                                            className={cx('HtW4DS_IJ1jvV')}
                                            onClick={() => handleSubmitFormAddress()}
                                        >
                                            Hoàn thành
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div>
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
                    {sellerValue !== ''
                        ? sellerValue.map((sell, index) => (
                              <div key={index}>
                                  <div className={cx('dwwHJ-')}>
                                      <div>
                                          <div className={cx('nF6yNn')}>
                                              <div className={cx('yknSi4')}>
                                                  <div className={cx('WJIXj0')}>{sellerName[index]}</div>
                                              </div>
                                              {orderValue !== ''
                                                  ? orderValue.map((order, index) =>
                                                        sell === order.NB_id ? (
                                                            <div key={index} className={cx('CZ6uu2')}>
                                                                <div className={cx('_6kMvNg_ka6CzP')}>
                                                                    <div className={cx('_4MGXB1_c7N4lb')}>
                                                                        <img
                                                                            className={cx('GCGEKm')}
                                                                            alt=""
                                                                            src={
                                                                                order.product.SP_image ||
                                                                                process.env.REACT_APP_URL_NODEJS_IMAGE +
                                                                                    '/default-ui-image.webp'
                                                                            }
                                                                            width="40"
                                                                            height="40"
                                                                        />
                                                                        <span className={cx('F8X-cZ')}>
                                                                            <span className={cx('tPzkNt')}>
                                                                                {order.product.SP_ten}
                                                                            </span>
                                                                        </span>
                                                                    </div>
                                                                    <div className={cx('_4MGXB1')}>
                                                                        ₫
                                                                        {formatCash(
                                                                            order.product.SP_gia *
                                                                                ((100 - order.product.SP_khuyenmai) /
                                                                                    100),
                                                                        )}
                                                                    </div>
                                                                    <div className={cx('_4MGXB1')}>
                                                                        {order.TTDH_soluong}
                                                                    </div>
                                                                    <div className={cx('_4MGXB1_8fgmps')}>
                                                                        ₫
                                                                        {formatCash(
                                                                            order.product.SP_gia *
                                                                                order.TTDH_soluong *
                                                                                ((100 - order.product.SP_khuyenmai) /
                                                                                    100),
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            ''
                                                        ),
                                                    )
                                                  : ''}
                                          </div>
                                      </div>
                                      {/* / */}
                                      <div className={cx('BbOmi')}>
                                          <div className={cx('lYtB1r')}>
                                              <div className={cx('_4nelpz')}>
                                                  Tổng số tiền ({handleSumProduct(sell)} sản phẩm):
                                              </div>
                                              <div className={cx('_31ayp3')}>
                                                  ₫{formatCash(handlePriceSeller(sell))}
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          ))
                        : ''}
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
                                    <div className={cx('_3yvPt8')}>
                                        {userVaule !== '' ? userVaule.ND_hoten : ''} (+84){' '}
                                        {userVaule !== '' ? userVaule.ND_sdt : ''}
                                    </div>
                                    <div className={cx('iXqine')}>
                                        {userVaule !== ''
                                            ? userVaule.ND_diachigiaohang !== ''
                                                ? userVaule.ND_diachigiaohang + ',' + userVaule.ND_ttqhpx
                                                : handleShowFormAddress()
                                            : ''}
                                    </div>
                                </div>
                            </div>
                            <div className={cx('g3BSHI')} onClick={handleShowFormAddress}>
                                {userVaule !== '' && userVaule.ND_diachigiaohang !== '' ? 'Thay đổi' : 'Xác định'}
                            </div>
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
                                    <span tabIndex="0">
                                        <button
                                            id="product-variation--selected"
                                            className={cx('product-variation--selected')}
                                            onClick={() => handleClickPay()}
                                        >
                                            Thanh toán khi nhận hàng
                                            <div className={cx('product-variation__tick')}>
                                                <svg
                                                    enableBackground="new 0 0 12 12"
                                                    viewBox="0 0 12 12"
                                                    x="0"
                                                    y="0"
                                                    id="icon-tick-bold-1"
                                                    className={cx('icon-tick-bold-1')}
                                                >
                                                    <g>
                                                        <path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path>
                                                    </g>
                                                </svg>
                                            </div>
                                        </button>
                                    </span>
                                    <span tabIndex="0">
                                        <button
                                            id="product-variation--selected_pay"
                                            className={cx('product-variation--selected_pay')}
                                            aria-label="Ví ShopeePay"
                                            aria-disabled="false"
                                            onClick={() => handleClickPay('pay')}
                                        >
                                            Ví Pay
                                            <div className={cx('product-variation__tick_pay')}>
                                                <svg
                                                    enableBackground="new 0 0 12 12"
                                                    viewBox="0 0 12 12"
                                                    x="0"
                                                    y="0"
                                                    id="icon-tick-bold-2"
                                                    className={cx('icon-tick-bold-2')}
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
                            <div id="_3hU2wO" className={cx('_3hU2wO')}>
                                <div className={cx('hVo8me')}>
                                    <div className={cx('WHQQMV')}>Thanh toán khi nhận hàng</div>
                                    <div className={cx('g5caBa')}>
                                        <div className={cx('cOrEtX')}>
                                            Phí thu hộ: ₫0 VNĐ. Ưu đãi về phí vận chuyển (nếu có) áp dụng cả với phí thu
                                            hộ.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="KqH1Px" className={cx('KqH1Px')}>
                        <div className={cx('lhwDvd_Exv9ow_c5Dezq')}>Tổng tiền hàng</div>
                        <div className={cx('lhwDvd_Uu2y3K_c5Dezq')}>₫{price !== '' ? formatCash(price) : ''}</div>
                        <div className={cx('lhwDvd_Exv9ow_B6k-vE')}>Phí vận chuyển</div>
                        <div className={cx('lhwDvd_Uu2y3K_B6k-vE')}>₫75.300</div>
                        <div className={cx('lhwDvd_Exv9ow_A4gPS6')}>Tổng thanh toán:</div>
                        <div className={cx('lhwDvd_0tdvp_Uu2y3K_A4gPS6')}>₫{price !== '' ? formatCash(price) : ''}</div>
                        <div className={cx('Ql2fz0')}>
                            <button className={cx('stardust-button--large_gG-FcK')}>Đặt hàng</button>
                        </div>
                    </div>
                </div>
                {/* / */}
            </div>
        </div>
    );
}

export default Order;
