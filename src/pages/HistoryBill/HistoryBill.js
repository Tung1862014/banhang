import { faMagnifyingGlass, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import GetCookie from '~/components/Hook/GetCookies';
import styles from './HistoryBill.module.scss';

const cx = classNames.bind(styles);

function HistoryBill() {
    const [sellerValue, setSellerValue] = useState('');
    const [sellerName, setSellerName] = useState('');
    const [orderValue, setOrderValue] = useState('');
    const [price, setPrice] = useState('');
    const [transportFee, setTransportFee] = useState('');
    const [statusBill, setStatusBill] = useState('');

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_URL_NODEJS}/historybill/cart/show/all?ND_id=${
                    JSON.parse(GetCookie('usrin')).ND_id
                }`,
            )
            .then((res) => {
                console.log('data', res.data);
                setOrderValue(res.data.results);
            })
            .catch((err) => {
                console.log('loi');
            });
    }, []);

    useEffect(() => {
        let sellerArr = [];
        let sellerName = [];
        let transportFees = [];
        let statusBills = [];
        //let sumnumber = 0;
        let price = 0;

        for (let i = 0; i < orderValue.length; i++) {
            if (!sellerArr.includes(orderValue[i].NB_id)) {
                sellerArr.push(orderValue[i].NB_id);
                sellerName.push(orderValue[i].seller.MTS_ten);
                transportFees.push(orderValue[i].DH_phivanchuyen);
                statusBills.push(orderValue[i].DH_trangthai);
            }

            //sumnumber += 1;
            price +=
                orderValue[i].product.SP_gia *
                orderValue[i].TTDH_soluong *
                ((100 - orderValue[i].product.SP_khuyenmai) / 100);
        }
        //console.log('sellerArr', sellerArr);
        if (sellerArr.length > 0) {
            setSellerValue((prev) => {
                const newSeller = [...prev, sellerArr];
                return newSeller[0];
            });
            setSellerName((prev) => {
                const newSeller = [...prev, sellerName];
                return newSeller[0];
            });
            setTransportFee((prev) => {
                const newSeller = [...prev, transportFees];
                return newSeller[0];
            });
            setStatusBill((prev) => {
                const newSeller = [...prev, statusBills];
                return newSeller[0];
            });
        }

        //setSumNumber(sumnumber);
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

    const handlePriceSeller = (sell, index) => {
        let price = 0;
        //console.log('sell', sell);
        for (let i = 0; i < orderValue.length; i++) {
            if (sell === orderValue[i].NB_id) {
                price +=
                    orderValue[i].product.SP_gia *
                    orderValue[i].TTDH_soluong *
                    ((100 - orderValue[i].product.SP_khuyenmai) / 100);
            }
            if (i === orderValue.length - 1) {
                return price + transportFee[index];
            }
        }
        //console.log('index', price);
    };
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
                    <a className={cx('vAkdD02')} href="/user/purchase/?type=9">
                        <span className={cx('_0rjE9m')}>Chờ lấy hàng</span>
                    </a>
                    <a className={cx('vAkdD02')} href="/user/purchase/?type=9">
                        <span className={cx('_0rjE9m')}>Đang giao</span>
                    </a>
                    <a className={cx('vAkdD03')} href="/user/purchase/?type=8">
                        <span className={cx('_0rjE9m')}>Đã giao</span>
                    </a>
                    <a className={cx('vAkdD04')} href="/user/purchase/?type=4">
                        <span className={cx('_0rjE9m')}>Đã Hủy</span>
                    </a>
                </div>
                {/* / */}
                {/* <div className={cx('LHWdmn')}>
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
                </div> */}
                {sellerValue !== ''
                    ? sellerValue.map((sell, index) => (
                          <div key={index}>
                              <div className={cx('tF2pJg')}>
                                  <div>
                                      <div className={cx('_6nAGBW')}>
                                          <div className={cx('_1ox39j')}>
                                              <div className={cx('_9bLyA')}>
                                                  <div className={cx('mzsqa6')}>{sellerName[index]}</div>
                                                  <a className={cx('aYsWZ')} href={`/shop/name=${sell}`}>
                                                      <button className={cx('stardust-button')}>
                                                          <svg
                                                              enableBackground="new 0 0 15 15"
                                                              viewBox="0 0 15 15"
                                                              x="0"
                                                              y="0"
                                                              className={cx('icon-btn-shop')}
                                                          >
                                                              <path d="m15 4.8c-.1-1-.8-2-1.6-2.9-.4-.3-.7-.5-1-.8-.1-.1-.7-.5-.7-.5h-8.5s-1.4 1.4-1.6 1.6c-.4.4-.8 1-1.1 1.4-.1.4-.4.8-.4 1.1-.3 1.4 0 2.3.6 3.3l.3.3v3.5c0 1.5 1.1 2.6 2.6 2.6h8c1.5 0 2.5-1.1 2.5-2.6v-3.7c.1-.1.1-.3.3-.3.4-.8.7-1.7.6-3zm-3 7c0 .4-.1.5-.4.5h-8c-.3 0-.5-.1-.5-.5v-3.1c.3 0 .5-.1.8-.4.1 0 .3-.1.3-.1.4.4 1 .7 1.5.7.7 0 1.2-.1 1.6-.5.5.3 1.1.4 1.6.4.7 0 1.2-.3 1.8-.7.1.1.3.3.5.4.3.1.5.3.8.3zm.5-5.2c0 .1-.4.7-.3.5l-.1.1c-.1 0-.3 0-.4-.1s-.3-.3-.5-.5l-.5-1.1-.5 1.1c-.4.4-.8.7-1.4.7-.5 0-.7 0-1-.5l-.6-1.1-.5 1.1c-.3.5-.6.6-1.1.6-.3 0-.6-.2-.9-.8l-.5-1-.7 1c-.1.3-.3.4-.4.6-.1 0-.3.1-.3.1s-.4-.4-.4-.5c-.4-.5-.5-.9-.4-1.5 0-.1.1-.4.3-.5.3-.5.4-.8.8-1.2.7-.8.8-1 1-1h7s .3.1.8.7c.5.5 1.1 1.2 1.1 1.8-.1.7-.2 1.2-.5 1.5z"></path>
                                                          </svg>
                                                          <span>xem gian hàng</span>
                                                      </button>
                                                  </a>
                                              </div>
                                              <div className={cx('WPNwG4')}>
                                                  <div className={cx('RcKSvW')}>
                                                      <a
                                                          className={cx('_2GgWAA')}
                                                          href="/user/purchase/order/116358025246170?type=6"
                                                      >
                                                          <span className={cx('_0vCgDb')}>
                                                              {statusBill[index] === 1
                                                                  ? 'Chờ xác nhận'
                                                                  : statusBill[index] === 2
                                                                  ? 'Chờ lấy hàng'
                                                                  : statusBill[index] === 3
                                                                  ? 'Đang giao'
                                                                  : statusBill[index] === 4
                                                                  ? 'Giao hàng thành công'
                                                                  : 'Đã hủy'}
                                                          </span>
                                                      </a>
                                                  </div>
                                                  <div className={cx('l4WFo0')}>Đã đánh giá</div>
                                              </div>
                                          </div>
                                          <div className={cx('_60q_NM')}></div>
                                          {orderValue !== ''
                                              ? orderValue.map((order, index) =>
                                                    sell === order.NB_id ? (
                                                        <a
                                                            key={index}
                                                            href="/user/purchase/order/116358025246170?type=6"
                                                        >
                                                            <div className={cx('giUtSy')}>
                                                                <div className={cx('vdofqJ')}>
                                                                    <div>
                                                                        <span className={cx('QkIuzE')}>
                                                                            <div></div>
                                                                            <div className={cx('hDGdsD')}>
                                                                                <div className={cx('_50XPwl')}>
                                                                                    <div
                                                                                        className={cx(
                                                                                            'shop-image__wrapper',
                                                                                        )}
                                                                                    >
                                                                                        <div
                                                                                            className={cx(
                                                                                                'shop-image__content',
                                                                                            )}
                                                                                        >
                                                                                            <img
                                                                                                src={
                                                                                                    `${order.product.SP_image}` ||
                                                                                                    'https://cf.shopee.vn/file/27d849ca5cd1fe66281025a2a0bb2df1_tn'
                                                                                                }
                                                                                                alt=""
                                                                                                className={cx(
                                                                                                    'shop-image__content--blur',
                                                                                                )}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className={cx('tODfT4')}>
                                                                                    <div>
                                                                                        <div className={cx('QJqUaT')}>
                                                                                            <span
                                                                                                className={cx('WVc4Oc')}
                                                                                            >
                                                                                                {order.product.SP_ten}
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div>
                                                                                        <div
                                                                                            className={cx('_9ca9GU')}
                                                                                        ></div>
                                                                                        <div className={cx('qGisqd')}>
                                                                                            x{order.TTDH_soluong}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className={cx('QRFJX')}>
                                                                                <div>
                                                                                    <span className={cx('d12Axb')}>
                                                                                        ₫
                                                                                        {formatCash(
                                                                                            order.product.SP_gia *
                                                                                                order.TTDH_soluong,
                                                                                        )}
                                                                                    </span>
                                                                                    <span
                                                                                        className={cx('ghw9hb_igidiy')}
                                                                                    >
                                                                                        ₫
                                                                                        {formatCash(
                                                                                            order.product.SP_gia *
                                                                                                order.TTDH_soluong *
                                                                                                ((100 -
                                                                                                    order.product
                                                                                                        .SP_khuyenmai) /
                                                                                                    100),
                                                                                        )}
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </span>
                                                                    </div>
                                                                    <div className={cx('_472J0A')}></div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    ) : (
                                                        ''
                                                    ),
                                                )
                                              : ''}
                                      </div>
                                      {/* / */}
                                  </div>
                                  <div className={cx('CqYika')}></div>
                                  <div className={cx('KinvoL')}>
                                      <div className={cx('BAMNqz')}>
                                          <div className={cx('Ge6yU5')}>Phí vận chuyển:</div>
                                          <div className={cx('TDMlX1')}>₫{formatCash(transportFee[index])}</div>
                                      </div>
                                      <div className={cx('BAMNqz')}>
                                          <div className={cx('Ge6yU5')}>Tổng số tiền:</div>
                                          <div className={cx('TDMlX1')}>
                                              ₫{formatCash(handlePriceSeller(sell, index))}
                                          </div>
                                      </div>
                                  </div>
                                  <div className={cx('_1ERzqw')}>
                                      <div className={cx('NIZAp8')}>
                                          <div className={cx('_8vTqu9')}>
                                              <button className={cx('stardust-button--primary_Kz9HeM')}>Hủy</button>
                                          </div>
                                          <div className={cx('VN6h8')}>
                                              <button className={cx('stardust-button--secondary_Kz9HeM')}>
                                                  Đánh Giá sản phẩm
                                              </button>
                                          </div>
                                          <div className={cx('VN6h8')}>
                                              <button className={cx('stardust-button--secondary_Kz9HeM')}>
                                                  Xem đánh giá Shop
                                              </button>
                                          </div>
                                      </div>
                                  </div>
                                  {/* / */}
                              </div>
                          </div>
                      ))
                    : ''}
            </div>
            <div>
                <div className={cx('shop-modal__transition-enter-done')}>
                    <div className={cx('shop-popup__overlay')}></div>
                    <div className={cx('shop-popup__container')}>
                        <div className={cx('shop-popup-form_7-ljVc')}>
                            <div className={cx('shop-popup-form__header')}>
                                <div className={cx('shop-popup-form__title')}>Đánh giá sản phẩm</div>
                            </div>
                            <div className={cx('shop-popup-form__main')}>
                                <div className={cx('shop-popup-form__main-container')}>
                                    <div className={cx('rating-modal-edit-item__container')}>
                                        <div className={cx('rating-modal-handler__container--last')}>
                                            <a
                                                className={cx('_4dmaxT_9EbMRg')}
                                                href="/-Mã-99FMCG1-giảm-8-đơn-250K-Combo-bánh-tráng-phơi-sương-MUỐI-RUỐC-HÀNH-PHI-i.60853163.17904188796"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <div className={cx('shop-image__wrapper_Uh')}>
                                                    <div className={cx('shop-image__content')}>
                                                        <div className={cx('shop-image__content--blur')}>
                                                            <img
                                                                src={
                                                                    'https://cf.shopee.vn/file/27d849ca5cd1fe66281025a2a0bb2df1_tn'
                                                                }
                                                                alt=""
                                                            />{' '}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={cx('_3qB3N8')}>
                                                    <div className={cx('YbNw-v')}>
                                                        [Mã 99FMCG1 giảm 8% đơn 250K] Combo bánh tráng phơi sương MUỐI
                                                        RUỐC HÀNH PHI
                                                    </div>
                                                </div>
                                            </a>
                                            <div style={{ margin: '20px 0px' }}>
                                                <div className={cx('uuEQZS')}>
                                                    <div className={cx('OU7Gr2')}>
                                                        <span>Chất lượng sản phẩm</span>
                                                    </div>
                                                    <div style={{ paddingLeft: '5px' }}>
                                                        <div className={cx('rating-stars__star--clickable_ytO7le')}>
                                                            <FontAwesomeIcon
                                                                className={cx('rating-stars__star-rewiew1')}
                                                                icon={faStar}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className={cx('rating-stars__star--clickable_ytO7le')}>
                                                            <FontAwesomeIcon
                                                                className={cx('rating-stars__star-rewiew2')}
                                                                icon={faStar}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className={cx('rating-stars__star--clickable_ytO7le')}>
                                                            <FontAwesomeIcon
                                                                className={cx('rating-stars__star-rewiew3')}
                                                                icon={faStar}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className={cx('rating-stars__star--clickable_ytO7le')}>
                                                            <FontAwesomeIcon
                                                                className={cx('rating-stars__star-rewiew4')}
                                                                icon={faStar}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className={cx('rating-stars__star--clickable_ytO7le')}>
                                                            <FontAwesomeIcon
                                                                className={cx('rating-stars__star-rewiew5')}
                                                                icon={faStar}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('YR5V7C')}>
                                                <div style={{ position: 'relative' }}>
                                                    <textarea
                                                        className={cx('plAxjc')}
                                                        placeholder="Hãy chia sẻ những điều bạn thích về sản phẩm này với những người mua khác nhé."
                                                    ></textarea>
                                                </div>
                                            </div>
                                            {/* / */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('shop-popup-form__footer')}>
                                <button className={cx('cancel-btn')}>Trở Lại</button>
                                <button type="button" className={cx('btn-solid-primary_wxJWI8')}>
                                    Hoàn thành
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HistoryBill;
