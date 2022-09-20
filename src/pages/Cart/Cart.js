import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GetCookie from '~/components/Hook/GetCookies';
import styles from './Cart.module.scss';

const cx = classNames.bind(styles);

function Cart() {
    const [sellerValue, setSellerValue] = useState('');
    const [sellerName, setSellerName] = useState('');
    const [orderValue, setOrderValue] = useState('');
    const [numberValue, setNumberValue] = useState('');
    const [checkNumber, setCheckNumber] = useState('');
    const [checkId, setCheckId] = useState('');

    const [sumNumber, setSumNumber] = useState('');
    const [price, setPrice] = useState('');

    // console.log('sellerValue', sellerValue);
    // console.log('sellerName', sellerName);

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_URL_NODEJS}/cartcustomer/cart/show/all?ND_id=${
                    JSON.parse(GetCookie('usrin')).ND_id
                }`,
            )
            .then((res) => {
                console.log(res.data);
                setOrderValue(res.data.results);
            })
            .catch((err) => {
                console.log('loi');
            });
    }, []);

    useEffect(() => {
        let sellerArr = [];
        let sellerName = [];
        let number = [];
        let sumnumber = 0;
        let price = 0;

        for (let i = 0; i < orderValue.length; i++) {
            if (!sellerArr.includes(orderValue[i].NB_id)) {
                sellerArr.push(orderValue[i].NB_id);
                sellerName.push(orderValue[i].seller.MTS_ten);
            }

            number = [...number, orderValue[i].TTDH_soluong];
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
        if (number.length > 0) {
            setNumberValue((prev) => {
                const newSeller = [...prev, number];
                return newSeller[0];
            });

            setSumNumber(sumnumber);
            setPrice(price);
        }
    }, [orderValue]);

    useEffect(() => {
        if (checkNumber !== '' && checkId !== '') {
            axios
                .put(`${process.env.REACT_APP_URL_NODEJS}/cartcustomer/update/number/product`, {
                    TTDH_id: checkId,
                    TTDH_soluong: checkNumber,
                })
                .then((res) => {})
                .catch((err) => {
                    console.log('loi');
                });
        }
    }, [checkNumber, checkId]);

    function formatCash(str) {
        return str
            .toString()
            .split('')
            .reverse()
            .reduce((prev, next, index) => {
                return (index % 3 ? next : next + '.') + prev;
            });
    }

    const handleAddNumber = (ttdhid, index, price, promotion, number, sellnumber) => {
        console.log('id: ', ttdhid, 'number: ');
        const inpurId = document.getElementById(`EcPhjV_3cj9Np${index}`);
        console.log(index);
        if (number - sellnumber > Number(inpurId.value)) {
            inpurId.value = Number(inpurId.value) + 1;

            const priceVaule = document.getElementById(`dn3H7Y${index}`);
            priceVaule.innerHTML = '₫' + formatCash(price * Number(inpurId.value) * ((100 - promotion) / 100));

            setCheckNumber(inpurId.value);
            setCheckId(ttdhid);
        } else {
            console.log('số lượng đã đặt giới hạn');
            const notification = document.getElementById('cart-popup-modal__transition-enter-done');
            notification.style.display = 'inline-block';

            setTimeout(() => (notification.style.display = 'none'), 1200);
        }
    };

    const handlePlusNumber = (ttdhid, index, price, promotion, number, sellnumber) => {
        console.log('id: ', ttdhid, 'number: ');
        console.log('id: ', ttdhid, 'number: ');
        const inpurId = document.getElementById(`EcPhjV_3cj9Np${index}`);
        console.log(index);
        if (Number(inpurId.value) > 1) {
            inpurId.value = Number(inpurId.value) - 1;

            const priceVaule = document.getElementById(`dn3H7Y${index}`);
            priceVaule.innerHTML = '₫' + formatCash(price * Number(inpurId.value) * ((100 - promotion) / 100));

            setCheckNumber(inpurId.value);
            setCheckId(ttdhid);
        } else {
            console.log('số lượng 1');
        }
    };

    const handleDeleteProduct = (ttdhid) => {
        axios
            .delete(`${process.env.REACT_APP_URL_NODEJS}/cartcustomer/delete/product`, {
                data: {
                    TTDH_id: ttdhid,
                },
            })
            .then((res) => {
                //console.log(res.data);
            })
            .catch((err) => {
                console.log('loi');
            });
    };

    // const handleChangeNumber = (number) => {
    //     console.log('soluong', number);
    // };

    return (
        <div className={cx('wrapper')}>
            <div id="cart-popup-modal__transition-enter-done" className={cx('cart-popup-modal__transition-enter-done')}>
                <div className={cx('cart-popup__overlay')}></div>
                <div className={cx('cart-popup__container')}>
                    <div className={cx('cart-alert-popup_card')}>
                        <div className={cx('cart-alert-popup__message')}>
                            Rất tiếc, bạn chỉ có thể mua tối đa 10 sản phẩm của chương trình giảm giá này.
                            <div className={cx('cart-alert-popup__message-list')}>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
                                                            <button
                                                                className={cx('EcPhjV')}
                                                                onClick={() =>
                                                                    handlePlusNumber(
                                                                        order.TTDH_id,
                                                                        index,
                                                                        order.product.SP_gia,
                                                                        order.product.SP_khuyenmai,
                                                                        order.product.SP_soluong,
                                                                        order.product.SP_soluongban,
                                                                    )
                                                                }
                                                            >
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
                                                                key={index}
                                                                id={`EcPhjV_3cj9Np${index}`}
                                                                className={cx('EcPhjV_3cj9Np')}
                                                                type="text"
                                                                role="spinbutton"
                                                                aria-valuenow="1"
                                                                defaultValue={
                                                                    numberValue !== ''
                                                                        ? numberValue[index]
                                                                        : order.TTDH_soluong
                                                                }
                                                                //onChange={() => handleChangeNumber(order.TTDH_id)}
                                                            />

                                                            <button
                                                                className={cx('EcPhjV')}
                                                                onClick={() =>
                                                                    handleAddNumber(
                                                                        order.TTDH_id,
                                                                        index,
                                                                        order.product.SP_gia,
                                                                        order.product.SP_khuyenmai,
                                                                        order.product.SP_soluong,
                                                                        order.product.SP_soluongban,
                                                                    )
                                                                }
                                                            >
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
                                                    <div id={`dn3H7Y${index}`} className={cx('dn3H7Y')}>
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
                                                        <a
                                                            href="/cart"
                                                            className={cx('RCd1Gx')}
                                                            onClick={() => handleDeleteProduct(order.TTDH_id)}
                                                        >
                                                            Xóa
                                                        </a>
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
                            <div className={cx('_10A7e2')}>
                                Tổng thanh toán ({sumNumber !== '' ? sumNumber : ''} Sản phẩm):
                            </div>
                            <div className={cx('nBHs8H')}>₫{price !== '' ? formatCash(price) : ''}</div>
                        </div>
                    </div>
                    <div className={cx('_1TwgPm')}></div>
                </div>
                <Link to={'/cart/order'} className={cx('-button-solid--primary')}>
                    <span className={cx('kcsswk')}>Mua hàng</span>
                </Link>
            </div>
        </div>
    );
}

export default Cart;
