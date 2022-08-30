// import axios from 'axios';
// import { useState, useEffect } from 'react';
// import Slider from 'react-slick';
// import classNames from 'classnames/bind';
// import styles from './detail.module.scss';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// import GetCookie from '~/components/Hook/GetCookies';
// import Button from '~/components/Button';

// const cx = classNames.bind(styles);

// function Detail() {
//     const [detailValue, setDetailValue] = useState('');

//     //const idValue = useDebounce(GetCookie('detail'), 500);

//     useEffect(() => {
//         axios
//             .get(`${process.env.REACT_APP_URL_NODEJS}/product/detail?q=${JSON.parse(GetCookie('detail'))}`)
//             .then((res) => {
//                 setDetailValue(res.data);
//                 console.log(res);
//             })
//             .catch((err) => console.log('Loii:' + err));
//     }, []);

//     const settings = {
//         dots: false,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//     };

//     const handleShowImage = () => {
//         window.open(`${process.env.REACT_APP_URL_NODEJS}/images/${detailValue.image}`, '_blank');
//     };

//     function formatCash(str) {
//         return str
//             .toString()
//             .split('')
//             .reverse()
//             .reduce((prev, next, index) => {
//                 return (index % 3 ? next : next + '.') + prev;
//             });
//     }

//     return (
//         <div className={cx('wrapper')}>
//             <div className={cx('intro')}>
//                 <div className={cx('img-product')}>
//                     <img
//                         className={cx('img-product-detail')}
//                         src={`${process.env.REACT_APP_URL_NODEJS}/images/${detailValue.image}`}
//                         alt="#"
//                         onClick={handleShowImage}
//                     />
//                     <div className={cx('menu-list')}>
//                         <div className={cx('menu-list-img')}>
//                             <Slider {...settings}>
//                                 <div className={cx('list-img')}>
//                                     <div className={cx('list-img-group')}>
//                                         <img
//                                             className={cx('list-img-product-detail')}
//                                             src={`${process.env.REACT_APP_URL_NODEJS}/images/${detailValue.image}`}
//                                             alt="#"
//                                         />
//                                         <img
//                                             className={cx('list-img-product-detail')}
//                                             src={`${process.env.REACT_APP_URL_NODEJS}/images/${detailValue.image}`}
//                                             alt="#"
//                                         />
//                                         <img
//                                             className={cx('list-img-product-detail')}
//                                             src={`${process.env.REACT_APP_URL_NODEJS}/images/${detailValue.image}`}
//                                             alt="#"
//                                         />
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <h3>2</h3>
//                                 </div>
//                             </Slider>
//                         </div>
//                     </div>
//                 </div>
//                 <div className={cx('describe')}>
//                     <div className={cx('name-product')}>{detailValue.nameProduct}</div>
//                     <div className={cx('trademark-product')}>Thương hiệu: IPHONE</div>
//                     <div className={cx('number-product')}>
//                         Số lượng còn lại: {detailValue.number - detailValue.sellNumber}
//                     </div>
//                     <div className={cx('number-product')}>Giảm: {detailValue.promotion}%</div>
//                     <div className={cx('money-product')}>
//                         Giá: {formatCash(detailValue.money * ((100 - detailValue.promotion) / 100))}₫
//                         <div className={cx('cost-product')}>
//                             {formatCash(detailValue.money * ((100 - detailValue.promotion) / 100))}₫
//                         </div>
//                     </div>
//                     <div className={cx('btn-insert')}>
//                         <Button className={cx('btn-insert-card')} primary>
//                             THÊM VÀO GIỎ HÀNG
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//             <div className={cx('describe-product-details')}>
//                 <div className={cx('describe-product')}>
//                     <h2>Mô tả sản phẩm</h2>
//                     <div className={cx('describe')}>phần mô tả</div>
//                 </div>
//                 <div className={cx('detail-product')}>
//                     <h2>Thông tin chi tiết</h2>
//                     <div className={cx('table-detail')}>
//                         <div className={cx('css-1h28ttq')}>
//                             <div className={cx('css-1i3ajxp')}>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     Thương hiệu
//                                 </div>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     APPLE
//                                 </div>
//                             </div>
//                             <div className={cx('css-1i3ajxp')}>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     Bảo hành
//                                 </div>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     12
//                                 </div>
//                             </div>
//                             <div type="body" color="textSecondary" className="css-xjd6tr">
//                                 Thông tin chung
//                             </div>
//                             <div className={cx('css-1i3ajxp')}>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     Nhóm sản phẩm
//                                 </div>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     Điện thoại
//                                 </div>
//                             </div>
//                             <div className={cx('css-1i3ajxp')}>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     Tên
//                                 </div>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     iPhone 12 Pro Max - MGDL3VN/A
//                                 </div>
//                             </div>
//                             <div className={cx('css-1i3ajxp')}>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     Màu sắc
//                                 </div>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     {' '}
//                                     Bạc Silver{' '}
//                                 </div>
//                             </div>
//                             <div type="body" color="textSecondary" className="css-xjd6tr">
//                                 Màn hình
//                             </div>
//                             <div className={cx('css-1i3ajxp')}>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     Loại màn hình
//                                 </div>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     6.7" Super Retina XDR
//                                 </div>
//                             </div>
//                             <div className={cx('css-1i3ajxp')}>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     Độ phân giải
//                                 </div>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     2778 x 1284 pixels
//                                 </div>
//                             </div>
//                             <div type="body" color="textSecondary" className="css-xjd6tr">
//                                 Cấu hình
//                             </div>
//                             <div className={cx('css-1i3ajxp')}>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     Dung lượng (ROM)
//                                 </div>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     256GB
//                                 </div>
//                             </div>
//                             <div className={cx('css-1i3ajxp')}>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     Hệ điều hành
//                                 </div>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     IOS
//                                 </div>
//                             </div>
//                             <div className={cx('css-1i3ajxp')}>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     RAM
//                                 </div>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     6GB
//                                 </div>
//                             </div>
//                             <div className={cx('css-1i3ajxp')}>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     Chip
//                                 </div>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     Apple A14 Bionic
//                                 </div>
//                             </div>
//                             <div className={cx('css-1i3ajxp')}>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     Pin
//                                 </div>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     Lithium ‑ ion
//                                 </div>
//                             </div>
//                             <div className={cx('css-1i3ajxp')}>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     Công nghệ pin
//                                 </div>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     - Sạc pin nhanh- Tiết kiệm pin- Sạc không dây
//                                 </div>
//                             </div>
//                             <div className={cx('css-1i3ajxp')}>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     Cổng sạc
//                                 </div>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     Lightning
//                                 </div>
//                             </div>
//                             <div className={cx('css-1i3ajxp')}>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     Loại sim
//                                 </div>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     Nano SIM và eSIM
//                                 </div>
//                             </div>
//                             <div className={cx('css-1i3ajxp')}>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     Mạng di động
//                                 </div>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     Hỗ trợ 5G
//                                 </div>
//                             </div>
//                             <div type="body" color="textSecondary" className="css-xjd6tr">
//                                 Camera
//                             </div>
//                             <div className={cx('css-1i3ajxp')}>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     Camera sau
//                                 </div>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     3x 12MP
//                                 </div>
//                             </div>
//                             <div className={cx('css-1i3ajxp')}>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     Camera trước
//                                 </div>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     12MP
//                                 </div>
//                             </div>
//                             <div type="body" color="textSecondary" className="css-xjd6tr">
//                                 Kết nối
//                             </div>
//                             <div className={cx('css-1i3ajxp')}>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     Wifi
//                                 </div>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     - Wi-Fi 802.11 a/b/g/n/ac/ax - Wi-Fi hotspot- Dual-band (2.4 GHz/5 GHz)
//                                 </div>
//                             </div>
//                             <div className={cx('css-1i3ajxp')}>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     GPS
//                                 </div>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     - GLONASS- BDS- A-GPS
//                                 </div>
//                             </div>
//                             <div className={cx('css-1i3ajxp')}>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     Kết nối khác
//                                 </div>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     OTG
//                                 </div>
//                             </div>
//                             <div type="body" color="textSecondary" className="css-xjd6tr">
//                                 Thiết kế &amp; trọng lượng
//                             </div>
//                             <div className={cx('css-1i3ajxp')}>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     Kích thước
//                                 </div>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     160.8 x 78.1 x 7.4 mm
//                                 </div>
//                             </div>
//                             <div className={cx('css-1i3ajxp')}>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     Khối lượng
//                                 </div>
//                                 <div type="body" className={cx('css-ivgpor')}>
//                                     228 g
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Detail;

import { faCartPlus, faMinus, faPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Detail.module.scss';
const cx = classNames.bind(styles);

function Detail() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('product-briefing_2qM0Iy')}>
                <div className={cx('jexb7x')}>
                    <div className={cx('flex-column')}>
                        <div className={cx('_1KdnTb')}>
                            <div className={cx('_2fbO7Q')}>
                                <div className={cx('_1OPdfl')}>
                                    <div className={cx('_3uzKon_2PWsS4')}>
                                        <img
                                            className={cx('_3uzKon_2PWsS4-img')}
                                            src={'https://cf.shopee.vn/file/09859e00592d7a3ea8d418368de656d6_tn'}
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('xK9doz')}>
                            <div className={cx('jgvTec')}>
                                <div className={cx('k1LVKF')}>
                                    <div className={cx('_1OPdfl')}>
                                        <div className={cx('X2N8Bt_2PWsS4')}>
                                            <img
                                                className={cx('X2N8Bt_2PWsS4-img')}
                                                src="https://cf.shopee.vn/file/09859e00592d7a3ea8d418368de656d6_tn"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className=""></div>
                                </div>
                            </div>
                            <div className={cx('jgvTec')}>
                                <div className={cx('k1LVKF')}>
                                    <div className={cx('_1OPdfl')}>
                                        <div className={cx('X2N8Bt_2PWsS4')}>
                                            <img
                                                className={cx('X2N8Bt_2PWsS4-img')}
                                                src="https://cf.shopee.vn/file/575323ffcc1c3f476a809833f585afc1_tn"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className=""></div>
                                </div>
                            </div>
                            <div className={cx('jgvTec')}>
                                <div className={cx('k1LVKF')}>
                                    <div className={cx('_1OPdfl')}>
                                        <div className={cx('X2N8Bt_2PWsS4')}>
                                            <img
                                                className={cx('X2N8Bt_2PWsS4-img')}
                                                src="https://cf.shopee.vn/file/d4a6f5105502c14ec1dc02981263f5e3_tn"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className={cx('_248Eqj')}></div>
                                </div>
                            </div>
                            <div className={cx('jgvTec')}>
                                <div className={cx('k1LVKF')}>
                                    <div className={cx('_1OPdfl')}>
                                        <div className={cx('X2N8Bt_2PWsS4')}>
                                            <img
                                                className={cx('X2N8Bt_2PWsS4-img')}
                                                src="https://cf.shopee.vn/file/f9959bac33e8ab08ac7c02e4f45471af_tn"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className=""></div>
                                </div>
                            </div>
                            <div className={cx('jgvTec')}>
                                <div className={cx('k1LVKF')}>
                                    <div className={cx('_1OPdfl')}>
                                        <div className={cx('X2N8Bt_2PWsS4')}>
                                            <img
                                                className={cx('X2N8Bt_2PWsS4-img')}
                                                src="https://cf.shopee.vn/file/f05af5f7c18f6b31e3248b466490cc25_tn"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className=""></div>
                                </div>
                            </div>
                            <button className={cx('shopee-icon-button _2Y6bnD G5H4N9')} tabIndex="-1">
                                <svg
                                    enableBackground="new 0 0 13 20"
                                    viewBox="0 0 13 20"
                                    x="0"
                                    y="0"
                                    className="shopee-svg-icon icon-arrow-left-bold"
                                >
                                    <polygon points="4.2 10 12.1 2.1 10 -.1 1 8.9 -.1 10 1 11 10 20 12.1 17.9"></polygon>
                                </svg>
                            </button>
                            <button className={cx('shopee-icon-button _2Y6bnD HA5mBn')} tabIndex="-1">
                                <svg
                                    enableBackground="new 0 0 13 21"
                                    viewBox="0 0 13 21"
                                    x="0"
                                    y="0"
                                    className="shopee-svg-icon icon-arrow-right-bold"
                                >
                                    <polygon points="11.1 9.9 2.1 .9 -.1 3.1 7.9 11 -.1 18.9 2.1 21 11.1 12 12.1 11"></polygon>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={cx('flex-auto-eTjGTe')}>
                    <div className={cx('flex-auto-flex-column_1Kkkb')}>
                        <div className={cx('_2rQP1z')}>
                            <span>KHÔ CÁ LÓC CHẤT LƯỢNG THƠM NGON BỔ DƯỠNG KHÔNG CHẤT BẢO QUẢN PHẨM MÀU</span>
                        </div>
                        <div className={cx('flex_3tkSsu')}>
                            <div className={cx('flex_3T9OoL')}>
                                <div className={cx('_3y5XOB_14izon')}>5.0</div>
                                <div className={cx('_1HyS82')}>
                                    <div className={cx('shopee-rating-stars')}>
                                        <div className={cx('shopee-rating-stars__stars')}>
                                            <div className={cx('shopee-rating-stars__star-wrapper')}>
                                                <div className={cx('shopee-rating-stars__lit')}>
                                                    <FontAwesomeIcon
                                                        className={cx('shopee-svg-icon')}
                                                        //   className={cx(
                                                        //       review.DG_sosao === 5 ||
                                                        //           review.DG_sosao === 4 ||
                                                        //           review.DG_sosao === 3 ||
                                                        //           review.DG_sosao === 2 ||
                                                        //           review.DG_sosao === 1
                                                        //           ? 'shopee-icon'
                                                        //           : '',
                                                        //   )}
                                                        icon={faStar}
                                                    />
                                                </div>
                                            </div>
                                            <div className={cx('shopee-rating-stars__star-wrapper')}>
                                                <div className={cx('shopee-rating-stars__lit')}>
                                                    <FontAwesomeIcon
                                                        className={cx('shopee-svg-icon')}
                                                        //   className={cx(
                                                        //       review.DG_sosao === 5 ||
                                                        //           review.DG_sosao === 4 ||
                                                        //           review.DG_sosao === 3 ||
                                                        //           review.DG_sosao === 2 ||
                                                        //           review.DG_sosao === 1
                                                        //           ? 'shopee-icon'
                                                        //           : '',
                                                        //   )}
                                                        icon={faStar}
                                                    />
                                                </div>
                                            </div>
                                            <div className={cx('shopee-rating-stars__star-wrapper')}>
                                                <div className={cx('shopee-rating-stars__lit')}>
                                                    <FontAwesomeIcon
                                                        className={cx('shopee-svg-icon')}
                                                        //   className={cx(
                                                        //       review.DG_sosao === 5 ||
                                                        //           review.DG_sosao === 4 ||
                                                        //           review.DG_sosao === 3 ||
                                                        //           review.DG_sosao === 2 ||
                                                        //           review.DG_sosao === 1
                                                        //           ? 'shopee-icon'
                                                        //           : '',
                                                        //   )}
                                                        icon={faStar}
                                                    />
                                                </div>
                                            </div>
                                            <div className={cx('shopee-rating-stars__star-wrapper')}>
                                                <div className={cx('shopee-rating-stars__lit')}>
                                                    <FontAwesomeIcon
                                                        className={cx('shopee-svg-icon')}
                                                        //   className={cx(
                                                        //       review.DG_sosao === 5 ||
                                                        //           review.DG_sosao === 4 ||
                                                        //           review.DG_sosao === 3 ||
                                                        //           review.DG_sosao === 2 ||
                                                        //           review.DG_sosao === 1
                                                        //           ? 'shopee-icon'
                                                        //           : '',
                                                        //   )}
                                                        icon={faStar}
                                                    />
                                                </div>
                                            </div>
                                            <div className={cx('shopee-rating-stars__star-wrapper')}>
                                                <div className={cx('shopee-rating-stars__lit')}>
                                                    <FontAwesomeIcon
                                                        className={cx('shopee-svg-icon')}
                                                        //   className={cx(
                                                        //       review.DG_sosao === 5 ||
                                                        //           review.DG_sosao === 4 ||
                                                        //           review.DG_sosao === 3 ||
                                                        //           review.DG_sosao === 2 ||
                                                        //           review.DG_sosao === 1
                                                        //           ? 'shopee-icon'
                                                        //           : '',
                                                        //   )}
                                                        icon={faStar}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('flex_3T9OoL')}>
                                <div className={cx('_3y5XOB')}>1</div>
                                <div className={cx('_1HyS82')}>đánh giá</div>
                            </div>
                            <div className={cx('flex_3EOMd6')}>
                                <div className={cx('HmRxgn')}>7</div>
                                <div className={cx('qBnNRR')}>đã bán</div>
                            </div>
                        </div>
                        <div className={cx('flex-column-price')}>
                            <div className={cx('flex-column_38g6so')}>
                                <div className={cx('items-center-price')}>
                                    <div className={cx('items-center-price_34BHKe')}>
                                        <div className={cx('_2yjfFH')}>₫210.000 - ₫375.000</div>
                                        <div className={cx('items-center-price')}>
                                            <div className={cx('_2Shl1j')}>₫130.000 - ₫269.000</div>
                                            <div className={cx('_3PlIlX')}>38% giảm</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('flex_VrhRS0_1RCFQu')}>
                            <div className={cx('flex-column-number')}>
                                <div className={cx('flex-column-number_283ldj')}>
                                    <div className={cx('_34CHXV')}>Số lượng</div>
                                    <div className={cx('flex-column-number')}>
                                        <div>
                                            <div className={cx('_1RTqoK-input-quantity')}>
                                                <button className={cx('_1MGNbJ')}>
                                                    <FontAwesomeIcon icon={faMinus} />
                                                </button>
                                                <input
                                                    className={cx('_1MGNbJ_1eS5m1')}
                                                    type="text"
                                                    role="spinbutton"
                                                    aria-valuenow="1"
                                                    value="1"
                                                />
                                                <button className={cx('_1MGNbJ')}>
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </button>
                                            </div>
                                        </div>
                                        <div>263 sản phẩm có sẵn</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={cx('_3pcTIL')}>
                                <div className={cx('_37uIr4')}>
                                    <button className={cx('btn-tinted_3f7_YI_1TpzVc')}>
                                        <FontAwesomeIcon
                                            className={cx('shopee-svg-icon_1FtIAE-icon-add-to-cart')}
                                            icon={faCartPlus}
                                        />
                                        <span>Thêm vào giỏ hàng</span>
                                    </button>
                                    <button type="button" className={cx('btn-solid-primary_3f7_YI')}>
                                        Mua ngay
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={cx('_1YY3XU')}>
                            <a className={cx('_2O_CHG')} href="/haisanmekong?categoryId=100629&amp;itemId=10515661050">
                                <div className={cx('avatar_3q1-OA')}>
                                    <img
                                        className={cx('avatar__img')}
                                        alt=""
                                        src="https://cf.shopee.vn/file/aa873a4c115057d53fb2c3ad9f56cdfb_tn"
                                    />
                                </div>
                            </a>
                            <div className={cx('zYQ1eS')}>
                                <div className={cx('_3LoNDM')}>haisanmekong</div>
                                <div className={cx('_2xDNx7')}>
                                    <a
                                        className={cx('btn-light--link_1CglVM')}
                                        href="/haisanmekong?categoryId=100629&amp;itemId=10515661050"
                                    >
                                        <svg
                                            enableBackground="new 0 0 15 15"
                                            viewBox="0 0 15 15"
                                            x="0"
                                            y="0"
                                            stroke-width="0"
                                            className={cx('svg-icon_1rcInn')}
                                        >
                                            <path d="m13 1.9c-.2-.5-.8-1-1.4-1h-8.4c-.6.1-1.2.5-1.4 1l-1.4 4.3c0 .8.3 1.6.9 2.1v4.8c0 .6.5 1 1.1 1h10.2c.6 0 1.1-.5 1.1-1v-4.6c.6-.4.9-1.2.9-2.3zm-11.4 3.4 1-3c .1-.2.4-.4.6-.4h8.3c.3 0 .5.2.6.4l1 3zm .6 3.5h.4c.7 0 1.4-.3 1.8-.8.4.5.9.8 1.5.8.7 0 1.3-.5 1.5-.8.2.3.8.8 1.5.8.6 0 1.1-.3 1.5-.8.4.5 1.1.8 1.7.8h.4v3.9c0 .1 0 .2-.1.3s-.2.1-.3.1h-9.5c-.1 0-.2 0-.3-.1s-.1-.2-.1-.3zm8.8-1.7h-1v .1s0 .3-.2.6c-.2.1-.5.2-.9.2-.3 0-.6-.1-.8-.3-.2-.3-.2-.6-.2-.6v-.1h-1v .1s0 .3-.2.5c-.2.3-.5.4-.8.4-1 0-1-.8-1-.8h-1c0 .8-.7.8-1.3.8s-1.1-1-1.2-1.7h12.1c0 .2-.1.9-.5 1.4-.2.2-.5.3-.8.3-1.2 0-1.2-.8-1.2-.9z"></path>
                                        </svg>
                                        xem shop
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('page-product__content')}>
                <div className={cx('page-product__content--left')}>
                    <div className={cx('page-product__detail')}>
                        <div className={cx('_3ICPhk')}>
                            <div className={cx('_2N2_VN')}>MÔ TẢ SẢN PHẨM</div>
                            <div className={cx('_2jz573')}>
                                <div className={cx('_1MqcWX')}>
                                    <p className={cx('_2jrvqA')}>
                                        KHÔ CÁ LÓC CHẤT LƯỢNG THƠM NGON BỔ DƯỠNG KHÔNG CHẤT BẢO QUẢN PHẨM MÀU Bán hàng
                                        và phân phối : Hải Sản Mekong Foods Xuất xứ : Đồng Tháp Hạn sử dụng : 6 Tháng kể
                                        từ ngày đóng gói giao hàng Nguyên liệu : Nguyên liệu chế biến từ cá lóc tươi
                                        ngon được nuôi tại các vùng cửa ngõ sông Miền tây. Vì thế khách hàng nên yên tâm
                                        về chất lượng nguồn cá khô của chúng tôi Chế biến : Sản phẩm được chế biến hoàn
                                        toàn thủ công bởi nông dân vớii công thức gia truyền sẽ được phơi nắng tự nhiên
                                        3-5 nắng trong môi trường nhà khép kín tránh côn trùng Giá thành : Do lấy trực
                                        tiếp từ nông dân làm cá khô nên giá thành mỗi sản phẩm của chúng tôi là tốt
                                        nhất, ngoài ra chúng tôi còn hỗ trợ đóng gói hút chân không cho khách phương xa
                                        làm quà cho người thân, bạn bè, đối tác. Cách dùng : Chế biến cho các món canh ,
                                        rim , kho , gỏi ,xào , sốt... 1. Khô cá lóc nướng 2. Khô cá lóc kho thơm 3. Khô
                                        cá lóc chiên nước mắm 4. Khô cá lóc sốt me 5. Khô cá lóc chiên giấm đường 6. Khô
                                        cá lóc kho tiêu 7. Khô cá lóc nấu canh chua 8. Khô cá lóc sốt bơ tỏi Tiêu chuẩn
                                        chất lượng : Đạt tiêu chuẩn sạch, KHÔNG hóa chất, KHÔNG phẩm màu, đảm bảo
                                        VSATTP. Hình thức kinh doanh sỉ và lẻ. (sỉ liên hệ giá tốt nhất thị trường ) Vận
                                        chuyển : Toàn quốc và phục vụ vận chuyển cho kiều bào nước ngoài (Nhà mình nhớ
                                        sưu tầm mã FREESHIP EXTRA và Follow shop để tiết kiệm chi phí vận chuyển và nhận
                                        được nhiều mã giảm giá nhé ) Anh chị mua hàng gởi đi nước ngoài nhắn tin để shop
                                        lưu ý cách vận chuyển cho anh chị • Hiện nay có hàng ngàn đơn vị kinh doanh hải
                                        sản khô trên toàn quốc, nhưng Hải Sản Mekong Foods vẫn chiếm trọn sự tin yêu của
                                        khách hàng và có cho mình một lượng khách hàng ổn định. Đơn giản bởi chúng tôi
                                        mang tới cho khách hàng chất lượng sản phẩm tốt nhất, cung cách phục vụ chuyên
                                        nghiệp nhất: • Hải sản được lựa chọn kỹ càng từ những vựa hải sản lớn trên khắp
                                        cả nước, đảm bảo chất lượng hải sản tốt nhất, thơm ngon nhất như Quảng Ninh, Hải
                                        Phòng, Nghệ An, Nha Trang, Phú Quốc… Tất cả hải sản được chọn lọc để sấy khô,
                                        phơi một nắng đều là hải sản tươi ngon, không phải hải sản đã chết ươn, chất
                                        lượng kém. --------------------------------- #khô_cá_lóc_cà_mau #tôm_khô_biển
                                        #cá_cơm_nhỏ #cá_cơm_ăn_liền #khô_cá_cơm_1kg #khocaloc1kg #khô_cá_lóc_3_nắng
                                        #khô_cá_lóc_bao_nhiêu_1_kg #khocaloclammongingon #khô_cá_lóc_làm_món_gì_ngon
                                        #kho_cá_lóc_loại_1 #khocalocloai1 #cakho #cá_khô #haisansaykho #hải_sản_sấy_khô
                                        #dacsan #cadacsan #cangon #cakhongon #cakhothientu #đặc_sản #quà_tặng #quà_biếu
                                        #dacsancamau #monngoncamau #haisankho #haisankhongon #haisanmekong
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={cx('product-ratings')}>
                            <div className={cx('product-ratings__header')}>ĐÁNH GIÁ SẢN PHẨM</div>
                            <div className={cx('product-ratings__list')}>
                                <div className={cx('detail-product-comment-list')}>
                                    <div className={cx('detail-product-rating')}>
                                        <a className={cx('detail-product-rating__avatar')} href="/shop/154890615">
                                            <div className={cx('detail-avatar')}>
                                                <div className={cx('detail-avatar__placeholder')}>
                                                    <svg
                                                        enable-background="new 0 0 15 15"
                                                        viewBox="0 0 15 15"
                                                        x="0"
                                                        y="0"
                                                        className={cx('shopee-svg-icon icon-headshot')}
                                                    >
                                                        <g>
                                                            <circle
                                                                cx="7.5"
                                                                cy="4.5"
                                                                fill="none"
                                                                r="3.8"
                                                                stroke-miterlimit="10"
                                                            ></circle>
                                                            <path
                                                                d="m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6"
                                                                fill="none"
                                                                stroke-linecap="round"
                                                                stroke-miterlimit="10"
                                                            ></path>
                                                        </g>
                                                    </svg>
                                                </div>
                                                <img
                                                    className={cx('detail-avatar__img')}
                                                    alt=""
                                                    src="https://cf.shopee.vn/file/51de41fd1eafccfd5a68d165ddbfb210_tn"
                                                />
                                            </div>
                                        </a>
                                        <div className={cx('detail-product-rating__main')}>
                                            <a
                                                className={cx('detail-product-rating__author-name')}
                                                href="/shop/154890615"
                                            >
                                                nguyentuanvietnho
                                            </a>
                                            <div className={cx('repeat-purchase-con')}>
                                                <div className={cx('detail-product-rating__rating')}>
                                                    <FontAwesomeIcon
                                                        className={cx('shopee-svg-icon')}
                                                        //   className={cx(
                                                        //       review.DG_sosao === 5 ||
                                                        //           review.DG_sosao === 4 ||
                                                        //           review.DG_sosao === 3 ||
                                                        //           review.DG_sosao === 2 ||
                                                        //           review.DG_sosao === 1
                                                        //           ? 'shopee-icon'
                                                        //           : '',
                                                        //   )}
                                                        icon={faStar}
                                                    />
                                                    <FontAwesomeIcon
                                                        className={cx('shopee-svg-icon')}
                                                        //   className={cx(
                                                        //       review.DG_sosao === 5 ||
                                                        //           review.DG_sosao === 4 ||
                                                        //           review.DG_sosao === 3 ||
                                                        //           review.DG_sosao === 2 ||
                                                        //           review.DG_sosao === 1
                                                        //           ? 'shopee-icon'
                                                        //           : '',
                                                        //   )}
                                                        icon={faStar}
                                                    />
                                                    <FontAwesomeIcon
                                                        className={cx('shopee-svg-icon')}
                                                        //   className={cx(
                                                        //       review.DG_sosao === 5 ||
                                                        //           review.DG_sosao === 4 ||
                                                        //           review.DG_sosao === 3 ||
                                                        //           review.DG_sosao === 2 ||
                                                        //           review.DG_sosao === 1
                                                        //           ? 'shopee-icon'
                                                        //           : '',
                                                        //   )}
                                                        icon={faStar}
                                                    />
                                                    <FontAwesomeIcon
                                                        className={cx('shopee-svg-icon')}
                                                        //   className={cx(
                                                        //       review.DG_sosao === 5 ||
                                                        //           review.DG_sosao === 4 ||
                                                        //           review.DG_sosao === 3 ||
                                                        //           review.DG_sosao === 2 ||
                                                        //           review.DG_sosao === 1
                                                        //           ? 'shopee-icon'
                                                        //           : '',
                                                        //   )}
                                                        icon={faStar}
                                                    />
                                                    <FontAwesomeIcon
                                                        className={cx('shopee-svg-icon')}
                                                        //   className={cx(
                                                        //       review.DG_sosao === 5 ||
                                                        //           review.DG_sosao === 4 ||
                                                        //           review.DG_sosao === 3 ||
                                                        //           review.DG_sosao === 2 ||
                                                        //           review.DG_sosao === 1
                                                        //           ? 'shopee-icon'
                                                        //           : '',
                                                        //   )}
                                                        icon={faStar}
                                                    />
                                                </div>
                                            </div>
                                            <div className={cx('detail-product-rating__time')}>2022-07-22 10:45</div>
                                            <div className={cx('detail-product-rating__tags')}>
                                                <span>Noi dung</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('recommendation-by-carousel')}>
                        <div>
                            <div className={cx('shopee-header-section _2Pk9pv shopee-header-section--simple')}>
                                <div className={cx('shopee-header-section__header')}>
                                    <div className={cx('shopee-header-section__header__title')}>
                                        <div>Các sản phẩm khác của Shop</div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('image-carousel DBnDYq')}>
                                <div className={cx('image-carousel__item-list-wrapper')}>
                                    <ul className={cx('image-carousel__item-list')}>
                                        <li className={cx('image-carousel__item')}>
                                            <div className={cx('product-recommend-items__item-wrapper')}>
                                                <a
                                                    data-sqe="link"
                                                    href="/Khô-cá-lóc-Đồng-Tháp-đủ-3-nắng-tự-nhiên-ít-mặn-dai-thơm-đảm-bảo-vệ-sinh-Không-dử-dụng-chất-bảo-quản-i.477743977.9273761219?sp_atk=3cef0878-8d69-44fc-9c4b-5f6c573b90bf&amp;xptdk=3cef0878-8d69-44fc-9c4b-5f6c573b90bf"
                                                >
                                                    <div class="_3tGY4K">
                                                        <div class="_27gjnh">
                                                            <div style="pointer-events: none;">
                                                                <div class="_1OPdfl _34Bbgp">
                                                                    <img
                                                                        width="invalid-value"
                                                                        height="invalid-value"
                                                                        alt="Khô cá lóc Đồng Tháp đủ 3 nắng tự nhiên, ít mặn, dai thơm  ,đảm bảo vệ sinh Không dử dụng chất bảo quản"
                                                                        class="_3DRMhT _2PWsS4"
                                                                        style="object-fit: contain"
                                                                        src="https://cf.shopee.vn/file/5ae7210d56a92df9658b16d8783bf630_tn"
                                                                    />
                                                                    <div class="_3F69Qs">
                                                                        <div
                                                                            class="_3eZsU2 _2BHlBE"
                                                                            style="color: rgb(242, 82, 32);"
                                                                        >
                                                                            <span class="_2KPc0Z">Yêu thích</span>
                                                                        </div>
                                                                    </div>
                                                                    <div class="_23y7qS">
                                                                        <div class="VPfNgf _3Vf-cm pKWQzh">
                                                                            <span class="percent">40%</span>
                                                                            <span class="_1dKOej">giảm</span>
                                                                        </div>
                                                                    </div>
                                                                    <div class="_3AoG8W">
                                                                        <div class="customized-overlay-image">
                                                                            <img
                                                                                alt=""
                                                                                src="https://cf.shopee.vn/file/32a76c9dddedcd5ee92d7db20830b6e8"
                                                                                width=""
                                                                                height=""
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="weFbbG">
                                                                <div class="_3Xp1Jg">
                                                                    <div class="_17eONp">
                                                                        <div class="_3KpaoK _2UGSVV">
                                                                            Khô cá lóc Đồng Tháp đủ 3 nắng tự nhiên, ít
                                                                            mặn, dai thơm ,đảm bảo vệ sinh Không dử dụng
                                                                            chất bảo quản
                                                                        </div>
                                                                    </div>
                                                                    <div class="_34HOLt">
                                                                        <div
                                                                            class="_1PWkR nt-medium nt-foot _3nkRL"
                                                                            style="color: rgb(246, 145, 19);"
                                                                        >
                                                                            <svg
                                                                                class="_2DRZW _2xFcL"
                                                                                viewBox="-0.5 -0.5 4 16"
                                                                            >
                                                                                <path
                                                                                    d="M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3"
                                                                                    stroke-width="1"
                                                                                    transform=""
                                                                                    stroke="currentColor"
                                                                                    fill="#f69113"
                                                                                ></path>
                                                                            </svg>
                                                                            <div
                                                                                class="_1FKkT _3Ao0A"
                                                                                style="color: white; background-color: rgb(246, 145, 19);"
                                                                            >
                                                                                5% Giảm
                                                                            </div>
                                                                            <svg
                                                                                class="_2DRZW _2xFcL"
                                                                                viewBox="-0.5 -0.5 4 16"
                                                                            >
                                                                                <path
                                                                                    d="M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3"
                                                                                    stroke-width="1"
                                                                                    transform="rotate(180) translate(-3 -15)"
                                                                                    stroke="currentColor"
                                                                                    fill="#f69113"
                                                                                ></path>
                                                                            </svg>
                                                                        </div>
                                                                        <div
                                                                            class="_3rLTln"
                                                                            style="color: rgb(255, 0, 32);"
                                                                        >
                                                                            #ShopDacBiet
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="vMfGQW _2NzYpj">
                                                                    <div class="_3NkBUm rMbdeO">
                                                                        <span class="_181cfk">₫</span>
                                                                        <span class="_2igTXp">125.000</span>
                                                                    </div>
                                                                    <div class="_2J8hZZ _2For-u">Đã bán 8</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* / */}
                </div>
            </div>
        </div>
    );
}

export default Detail;
