import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import GetCookie from '~/components/Hook/GetCookies';
import styles from './Cart.module.scss';

const cx = classNames.bind(styles);

function Cart() {
    const [sellerValue, setSellerValue] = useState('');
    const [sellerName, setSellerName] = useState('');
    const [orderValue, setOrderValue] = useState('');

    console.log(sellerName);

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_URL_NODEJS}/cartcustomer/cart/show/all?ND_id=${
                    JSON.parse(GetCookie('usrin')).ND_id
                }`,
            )
            .then((res) => {
                console.log(res.data.results);
                setOrderValue(res.data.results);
            })
            .catch((err) => {
                console.log('loi');
            });
    }, []);

    useEffect(() => {
        let sellerArr = [];
        let sellerName = [];
        for (let i = 0; i < orderValue.length; i++) {
            console.log(orderValue[i].NB_id);
            if (sellerArr.length > 0) {
                for (let j = 0; j < sellerArr.length; j++) {
                    if (sellerArr[j] !== orderValue[i].NB_id) {
                        if (j === sellerArr.length - 1) {
                            sellerArr = [...sellerArr, orderValue[i].NB_id];
                            sellerName = [...sellerName, orderValue[i].seller.NB_hoten];
                        }
                    }
                }
            } else {
                sellerArr = [...sellerArr, orderValue[i].NB_id];
                sellerName = [...sellerName, orderValue[i].seller.NB_hoten];
            }
        }
        //console.log(sellerArr);
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

    return (
        <div className={cx('wrapper')}>
            <div className={cx('_1nrPtQ')}>
                <div className={cx('_27GGo9')}>Sản Phẩm</div>
                <div className={cx('_3hJbyz')}>Đơn Giá</div>
                <div className={cx('_155Uu2')}>Số Lượng</div>
                <div className={cx('_10ZkNr')}>Số Tiền</div>
                <div className={cx('_1coJFb')}>Hành động</div>
            </div>
            {/* / */}
            {sellerValue !== ''
                ? sellerValue.map((sell, index) => (
                      <div key={index} className={cx('aCSbhb')}>
                          <div key={index} className={cx('_3ApheT')}>
                              <div className={cx('_2zUYwP')}>
                                  <a className={cx('eQP4g3')} href="/">
                                      <span>{sellerName !== '' ? sellerName[index] : ''}</span>
                                  </a>
                              </div>
                          </div>

                          {orderValue !== ''
                              ? orderValue.map((order, index) =>
                                    sell === order.NB_id ? (
                                        <div key={index} className={cx('_2qN5oG')}>
                                            <div className={cx('_216OLk')}>
                                                <div className={cx('_1GcTXp')}>
                                                    <div className={cx('_2pPbjQ')}>
                                                        <div className={cx('YxpsCR')}>
                                                            <a
                                                                title="Dép Bánh Mì Đế Cao Đi Trong Nhà Êm Chân Ngộ Nghĩnh Hot Trend"
                                                                href="/Dép-Bánh-Mì-Đế-Cao-Đi-Trong-Nhà-Êm-Chân-Ngộ-Nghĩnh-Hot-Trend-i.788908334.20420777735?xptdk=1d3bc720-f816-4653-8855-b7fc7c65768a"
                                                            >
                                                                <div className={cx('_3SWf-5')}>
                                                                    <img
                                                                        src={
                                                                            order.product.SP_image ||
                                                                            process.env.REACT_APP_URL_NODEJS_IMAGE +
                                                                                '/default-ui-image.webp'
                                                                        }
                                                                        alt=""
                                                                    />
                                                                </div>
                                                            </a>
                                                            <div className={cx('_3OrWGt')}>
                                                                <a
                                                                    className={cx('_2fQT1K')}
                                                                    title="Dép Bánh Mì Đế Cao Đi Trong Nhà Êm Chân Ngộ Nghĩnh Hot Trend"
                                                                    href="/Dép-Bánh-Mì-Đế-Cao-Đi-Trong-Nhà-Êm-Chân-Ngộ-Nghĩnh-Hot-Trend-i.788908334.20420777735?xptdk=1d3bc720-f816-4653-8855-b7fc7c65768a"
                                                                >
                                                                    {order.product.SP_ten}
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* / */}
                                                    <div className={cx('Ra8lP2')}>
                                                        <div>
                                                            {order.product.SP_khuyenmai !== 0 && (
                                                                <span className={cx('_1CXksa_1k1Vcm')}>
                                                                    ₫{formatCash(order.product.SP_gia)}
                                                                </span>
                                                            )}
                                                            <span className={cx('_1CXksa')}>
                                                                ₫
                                                                {formatCash(
                                                                    order.product.SP_gia *
                                                                        ((100 - order.product.SP_khuyenmai) / 100),
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    {/* / */}
                                                    <div className={cx('_2ZUrV7')}>
                                                        <div className={cx('_36kVQQ-input-quantity')}>
                                                            <button className={cx('EcPhjV')}>
                                                                <svg
                                                                    enableBackground="new 0 0 10 10"
                                                                    viewBox="0 0 10 10"
                                                                    x="0"
                                                                    y="0"
                                                                    className={cx('shop-svg-icon')}
                                                                >
                                                                    <polygon points="4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5"></polygon>
                                                                </svg>
                                                            </button>
                                                            <input
                                                                className={cx('EcPhjV_3cj9Np')}
                                                                type="text"
                                                                role="spinbutton"
                                                                aria-valuenow="1"
                                                                defaultValue={order.TTDH_soluong}
                                                            />
                                                            <button className={cx('EcPhjV')}>
                                                                <svg
                                                                    enableBackground="new 0 0 10 10"
                                                                    viewBox="0 0 10 10"
                                                                    x="0"
                                                                    y="0"
                                                                    className={cx('shop-svg-icon')}
                                                                >
                                                                    <polygon points="10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5"></polygon>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {/* / */}
                                                    <div className={cx('dn3H7Y')}>
                                                        <span>
                                                            ₫
                                                            {formatCash(
                                                                order.product.SP_gia *
                                                                    order.TTDH_soluong *
                                                                    ((100 - order.product.SP_khuyenmai) / 100),
                                                            )}
                                                        </span>
                                                    </div>
                                                    {/* / */}
                                                    <div className={cx('_2y8iJi_2qPRqW')}>
                                                        <button className={cx('RCd1Gx')}>Xóa</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        ''
                                    ),
                                )
                              : ''}
                      </div>
                  ))
                : ''}
            {/* / */}
            <div className={cx('W2HjBQ_zzOmij')}>
                <div className={cx('_2BT_es')}>
                    <div className={cx('_3BPMNN')}>
                        <div className={cx('_2LMWss')}>
                            <div className={cx('_10A7e2')}>Tổng thanh toán (0 Sản phẩm):</div>
                            <div className={cx('nBHs8H')}>₫0</div>
                        </div>
                    </div>
                    <div className={cx('_1TwgPm')}></div>
                </div>
                <button className={cx('-button-solid--primary')}>
                    <span className={cx('kcsswk')}>Mua hàng</span>
                </button>
            </div>
        </div>
    );
}

export default Cart;
