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
import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './Detail.module.scss';
const cx = classNames.bind(styles);

function Detail() {
    const [product, setProduct] = useState('');
    const [evaluation, setEvaluation] = useState('');
    const [evaluationNum, setEvaluationNum] = useState('');
    const [evaluationStar, setEvaluationStar] = useState('');
    const [productValue, setProductValue] = useState('');

    useEffect(() => {
        const pathId = window.location.pathname.toString();
        const resultId = pathId.slice(22);
        axios
            .get(`${process.env.REACT_APP_URL_NODEJS}/productdetail/detail/product?SP_id=${resultId}`)
            .then((res) => {
                console.log(res.data);
                setProduct(res.data.results[0]);
                setEvaluation(res.data.evaluation);
                setEvaluationNum(res.data.evaluationNum);
                setEvaluationStar(res.data.evaluationStar);
            })
            .catch((error) => {
                console.log('loi');
            });
    }, []);

    useEffect(() => {
        if (product !== '') {
            axios
                .get(`${process.env.REACT_APP_URL_NODEJS}/productdetail/product/show/all?NB_id=${product.NB_id}`)
                .then((res) => {
                    console.log(res.data.results);
                    setProductValue(res.data.results);
                })
                .catch((error) => {
                    console.log('loi');
                });
        }
    }, [product]);

    function formatCash(str) {
        return str
            .toString()
            .split('')
            .reverse()
            .reduce((prev, next, index) => {
                return (index % 3 ? next : next + '.') + prev;
            });
    }

    function takeDate(date) {
        const dateValue = new Date(date);
        let day = dateValue.getDate();
        let month = dateValue.getMonth() + 1;
        let year = dateValue.getFullYear();
        let hour = dateValue.getHours();
        let minute = dateValue.getMinutes();
        if (month < 10) {
            return hour + ':' + minute + ', ' + day + '-0' + month + '-' + year;
        } else if (day < 10) {
            return hour + ':' + minute + ', 0' + day + '-' + month + year;
        } else {
            return hour + ':' + minute + ', ' + day + '-' + month + '-' + year;
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('product-briefing_2qM0Iy')}>
                <div className={cx('jexb7x')}>
                    <div className={cx('flex-column')}>
                        <div className={cx('_1KdnTb')}>
                            <div className={cx('_2fbO7Q')}>
                                <div className={cx('_1OPdfl')}>
                                    <div className={cx('_3uzKon_2PWsS4')}>
                                        <img className={cx('_3uzKon_2PWsS4-img')} src={product.SP_image} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('xK9doz')}>
                            {product !== ''
                                ? product.image.map((image, index) => (
                                      <div key={index} className={cx('jgvTec')}>
                                          <div className={cx('k1LVKF')}>
                                              <div className={cx('_1OPdfl')}>
                                                  <div className={cx('X2N8Bt_2PWsS4')}>
                                                      <img
                                                          className={cx('X2N8Bt_2PWsS4-img')}
                                                          src={image.HA_image}
                                                          alt=""
                                                      />
                                                  </div>
                                              </div>
                                              <div className=""></div>
                                          </div>
                                      </div>
                                  ))
                                : ''}
                        </div>
                    </div>
                </div>
                <div className={cx('flex-auto-eTjGTe')}>
                    <div className={cx('flex-auto-flex-column_1Kkkb')}>
                        <div className={cx('_2rQP1z')}>
                            <span>{product.SP_ten}</span>
                        </div>
                        <div className={cx('flex_3tkSsu')}>
                            <div className={cx('flex_3T9OoL')}>
                                <div className={cx('_3y5XOB_14izon')}>{evaluationStar || 0}</div>
                                <div className={cx('_1HyS82')}>
                                    <div className={cx('shopee-rating-stars')}>
                                        <div className={cx('shopee-rating-stars__stars')}>
                                            <div className={cx('shopee-rating-stars__star-wrapper')}>
                                                <div className={cx('shopee-rating-stars__lit')}>
                                                    <FontAwesomeIcon
                                                        className={cx(
                                                            evaluationStar === 5 ||
                                                                evaluationStar === 4 ||
                                                                evaluationStar === 3 ||
                                                                evaluationStar === 2 ||
                                                                evaluationStar === 1
                                                                ? 'shopee-svg-icon'
                                                                : '',
                                                        )}
                                                        icon={faStar}
                                                    />
                                                </div>
                                            </div>
                                            <div className={cx('shopee-rating-stars__star-wrapper')}>
                                                <div className={cx('shopee-rating-stars__lit')}>
                                                    <FontAwesomeIcon
                                                        className={cx(
                                                            evaluationStar === 5 ||
                                                                evaluationStar === 4 ||
                                                                evaluationStar === 3 ||
                                                                evaluationStar === 2
                                                                ? 'shopee-svg-icon'
                                                                : '',
                                                        )}
                                                        icon={faStar}
                                                    />
                                                </div>
                                            </div>
                                            <div className={cx('shopee-rating-stars__star-wrapper')}>
                                                <div className={cx('shopee-rating-stars__lit')}>
                                                    <FontAwesomeIcon
                                                        className={cx(
                                                            evaluationStar === 5 ||
                                                                evaluationStar === 4 ||
                                                                evaluationStar === 3
                                                                ? 'shopee-svg-icon'
                                                                : '',
                                                        )}
                                                        icon={faStar}
                                                    />
                                                </div>
                                            </div>
                                            <div className={cx('shopee-rating-stars__star-wrapper')}>
                                                <div className={cx('shopee-rating-stars__lit')}>
                                                    <FontAwesomeIcon
                                                        className={cx(
                                                            evaluationStar === 5 || evaluationStar === 4
                                                                ? 'shopee-svg-icon'
                                                                : '',
                                                        )}
                                                        icon={faStar}
                                                    />
                                                </div>
                                            </div>
                                            <div className={cx('shopee-rating-stars__star-wrapper')}>
                                                <div className={cx('shopee-rating-stars__lit')}>
                                                    <FontAwesomeIcon
                                                        className={cx(evaluationStar === 5 ? 'shopee-svg-icon' : '')}
                                                        icon={faStar}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('flex_3T9OoL')}>
                                <div className={cx('_3y5XOB')}>{evaluationNum || 0}</div>
                                <div className={cx('_1HyS82')}>đánh giá</div>
                            </div>
                            <div className={cx('flex_3EOMd6')}>
                                <div className={cx('HmRxgn')}>{product.SP_soluongban || 0}</div>
                                <div className={cx('qBnNRR')}>đã bán</div>
                            </div>
                        </div>
                        <div className={cx('flex-column-price')}>
                            <div className={cx('flex-column_38g6so')}>
                                <div className={cx('items-center-price')}>
                                    <div className={cx('items-center-price_34BHKe')}>
                                        <div className={cx('_2yjfFH')}>
                                            ₫{product !== '' && formatCash(product.SP_gia)}
                                        </div>
                                        <div className={cx('items-center-price')}>
                                            <div className={cx('_2Shl1j')}>
                                                ₫{formatCash(product.SP_gia * ((100 - product.SP_khuyenmai) / 100))}
                                            </div>
                                            <div className={cx('_3PlIlX')}>{product.SP_khuyenmai}% giảm</div>
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
                                                    defaultValue="1"
                                                />
                                                <button className={cx('_1MGNbJ')}>
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            {product !== '' && product.SP_soluong - product.SP_soluongban} sản phẩm có
                                            sẵn
                                        </div>
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
                                        src={
                                            product !== ''
                                                ? product.shop[0].MTS_image
                                                : process.env.REACT_APP_URL_NODEJS_IMAGE + '/default-ui-image.webp'
                                        }
                                    />
                                </div>
                            </a>
                            <div className={cx('zYQ1eS')}>
                                <div className={cx('_3LoNDM')}>
                                    {product !== '' ? product.shop[0].MTS_ten : 'Tên Cửa Hàng'}
                                </div>
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
                                            strokeWidth="0"
                                            className={cx('svg-icon_1rcInn')}
                                        >
                                            <path d="m13 1.9c-.2-.5-.8-1-1.4-1h-8.4c-.6.1-1.2.5-1.4 1l-1.4 4.3c0 .8.3 1.6.9 2.1v4.8c0 .6.5 1 1.1 1h10.2c.6 0 1.1-.5 1.1-1v-4.6c.6-.4.9-1.2.9-2.3zm-11.4 3.4 1-3c .1-.2.4-.4.6-.4h8.3c.3 0 .5.2.6.4l1 3zm .6 3.5h.4c.7 0 1.4-.3 1.8-.8.4.5.9.8 1.5.8.7 0 1.3-.5 1.5-.8.2.3.8.8 1.5.8.6 0 1.1-.3 1.5-.8.4.5 1.1.8 1.7.8h.4v3.9c0 .1 0 .2-.1.3s-.2.1-.3.1h-9.5c-.1 0-.2 0-.3-.1s-.1-.2-.1-.3zm8.8-1.7h-1v .1s0 .3-.2.6c-.2.1-.5.2-.9.2-.3 0-.6-.1-.8-.3-.2-.3-.2-.6-.2-.6v-.1h-1v .1s0 .3-.2.5c-.2.3-.5.4-.8.4-1 0-1-.8-1-.8h-1c0 .8-.7.8-1.3.8s-1.1-1-1.2-1.7h12.1c0 .2-.1.9-.5 1.4-.2.2-.5.3-.8.3-1.2 0-1.2-.8-1.2-.9z"></path>
                                        </svg>
                                        xem Cửa Hàng
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
                                    <p className={cx('_2jrvqA')}>{product !== '' ? product.MTSP_noidung : ''}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={cx('product-ratings')}>
                            <div className={cx('product-ratings__header')}>ĐÁNH GIÁ SẢN PHẨM</div>
                            <div className={cx('product-ratings__list')}>
                                <div className={cx('detail-product-comment-list')}>
                                    {evaluation !== ''
                                        ? evaluation.map((evalue, index) => (
                                              <div key={index} className={cx('detail-product-rating')}>
                                                  <a
                                                      className={cx('detail-product-rating__avatar')}
                                                      href="/shop/154890615"
                                                  >
                                                      <div className={cx('detail-avatar')}>
                                                          {/*  */}
                                                          <img
                                                              className={cx('detail-avatar__img')}
                                                              alt=""
                                                              src={evalue.userName.ND_image || ''}
                                                          />
                                                      </div>
                                                  </a>
                                                  <div className={cx('detail-product-rating__main')}>
                                                      <a
                                                          className={cx('detail-product-rating__author-name')}
                                                          href="/shop/154890615"
                                                      >
                                                          {evalue.userName.ND_hoten || ''}
                                                      </a>
                                                      <div className={cx('repeat-purchase-con')}>
                                                          <div className={cx('detail-product-rating__rating')}>
                                                              <FontAwesomeIcon
                                                                  className={cx(
                                                                      evalue.DG_sosao === 5 ||
                                                                          evalue.DG_sosao === 4 ||
                                                                          evalue.DG_sosao === 3 ||
                                                                          evalue.DG_sosao === 2 ||
                                                                          evalue.DG_sosao === 1
                                                                          ? 'shopee-svg-icon'
                                                                          : '',
                                                                  )}
                                                                  icon={faStar}
                                                              />
                                                              <FontAwesomeIcon
                                                                  className={cx(
                                                                      evalue.DG_sosao === 5 ||
                                                                          evalue.DG_sosao === 4 ||
                                                                          evalue.DG_sosao === 3 ||
                                                                          evalue.DG_sosao === 2
                                                                          ? 'shopee-svg-icon'
                                                                          : '',
                                                                  )}
                                                                  icon={faStar}
                                                              />
                                                              <FontAwesomeIcon
                                                                  className={cx(
                                                                      evalue.DG_sosao === 5 ||
                                                                          evalue.DG_sosao === 4 ||
                                                                          evalue.DG_sosao === 3
                                                                          ? 'shopee-svg-icon'
                                                                          : '',
                                                                  )}
                                                                  icon={faStar}
                                                              />
                                                              <FontAwesomeIcon
                                                                  className={cx(
                                                                      evalue.DG_sosao === 5 || evalue.DG_sosao === 4
                                                                          ? 'shopee-svg-icon'
                                                                          : '',
                                                                  )}
                                                                  icon={faStar}
                                                              />
                                                              <FontAwesomeIcon
                                                                  className={cx(
                                                                      evalue.DG_sosao === 5 ? 'shopee-svg-icon' : '',
                                                                  )}
                                                                  icon={faStar}
                                                              />
                                                          </div>
                                                      </div>
                                                      <div className={cx('detail-product-rating__time')}>
                                                          {takeDate(evalue.DG_ngayDG)}
                                                      </div>
                                                      <div className={cx('detail-product-rating__tags')}>
                                                          <span>{evalue.DG_mota || ''}</span>
                                                      </div>
                                                  </div>
                                              </div>
                                          ))
                                        : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('recommendation-by-carousel')}>
                        <div>
                            <div className={cx('detail-header-section_2Pk9pv--simple')}>
                                <div className={cx('detail-header-section__header')}>
                                    <div className={cx('detail-header-section__header__title')}>
                                        <div>Các sản phẩm khác của Shop</div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('image-carousel_DBnDYq')}>
                                <div className={cx('image-carousel__item-list-wrapper')}>
                                    <ul className={cx('image-carousel__item-list')}>
                                        {productValue !== ''
                                            ? productValue.map((prodvalue, index) => (
                                                  <li key={index} className={cx('image-carousel__item')}>
                                                      <div className={cx('product-recommend-items__item-wrapper')}>
                                                          <a
                                                              data-sqe="link"
                                                              href={`/detail/product/nameid${prodvalue.SP_id}`}
                                                          >
                                                              <div className={cx('_3tGY4K')}>
                                                                  <div className={cx('_27gjnh')}>
                                                                      <div>
                                                                          <div className={cx('_1OPdfl_34Bbgp')}>
                                                                              <img
                                                                                  width="invalid-value"
                                                                                  height="invalid-value"
                                                                                  alt="Khô cá lóc Đồng Tháp đủ 3 nắng tự nhiên, ít mặn, dai thơm  ,đảm bảo vệ sinh Không dử dụng chất bảo quản"
                                                                                  className={cx('_3DRMhT_2PWsS4')}
                                                                                  src={prodvalue.SP_image || ''}
                                                                              />

                                                                              <div className={cx('_23y7qS')}>
                                                                                  <div
                                                                                      className={cx(
                                                                                          'VPfNgf_3Vf-cm_pKWQzh',
                                                                                      )}
                                                                                  >
                                                                                      <span className={cx('percent')}>
                                                                                          {prodvalue.SP_khuyenmai}%
                                                                                      </span>
                                                                                      <span className={cx('_1dKOej')}>
                                                                                          giảm
                                                                                      </span>
                                                                                  </div>
                                                                              </div>
                                                                          </div>
                                                                      </div>
                                                                      <div className={cx('weFbbG')}>
                                                                          <div className={cx('_3Xp1Jg')}>
                                                                              <div className={cx('_17eONp')}>
                                                                                  <div className={cx('_3KpaoK_2UGSVV')}>
                                                                                      {prodvalue.SP_ten}
                                                                                  </div>
                                                                              </div>
                                                                          </div>
                                                                          <div className={cx('vMfGQW_2NzYpj')}>
                                                                              <div className={cx('_3NkBUm_rMbdeO')}>
                                                                                  <span className={cx('_181cfk')}>
                                                                                      ₫
                                                                                  </span>
                                                                                  <span className={cx('_2igTXp')}>
                                                                                      {formatCash(
                                                                                          prodvalue.SP_gia *
                                                                                              ((100 -
                                                                                                  prodvalue.SP_khuyenmai) /
                                                                                                  100),
                                                                                      )}
                                                                                  </span>
                                                                              </div>
                                                                              <div className={cx('_2J8hZZ_2For-u')}>
                                                                                  Đã bán {prodvalue.SP_soluongban}
                                                                              </div>
                                                                          </div>
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                          </a>
                                                      </div>
                                                  </li>
                                              ))
                                            : ''}
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
