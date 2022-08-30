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

import { faMinus, faPlus, faStar } from '@fortawesome/free-solid-svg-icons';
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
                                    <button className={cx('btn btn-tinted btn--l _3f7_YI _1TpzVc')}>
                                        <FontAwesomeIcon icon={faPlus} />
                                        <span>thêm vào giỏ hàng</span>
                                    </button>
                                    <button type="button" className={cx('btn btn-solid-primary btn--l _3f7_YI')}>
                                        Mua ngay
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;
