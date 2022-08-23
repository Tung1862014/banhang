// import axios from 'axios';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
import styles from './SellerBill.module.scss';

const cx = classNames.bind(styles);

function Detail({ bill }) {
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
        <div className={cx('order-list-body')}>
            {bill.map((bill, index) => (
                <div key={index} className={cx('order-item')}>
                    <div className={cx('order-title')}>
                        {bill.nguoidung.map((use, index) => (
                            <div key={index} className={cx('title-prefix')}>
                                <div className={cx('user-header-view-item')}>
                                    <div className={cx('avatar')}>
                                        <img src={use.ND_image} alt="" className={cx('image')} />
                                    </div>
                                    <div className={cx('content')}>
                                        <div className={cx('username-text-overflow')}>{use.ND_hoten}</div>{' '}
                                    </div>
                                </div>
                                <div className={cx('id-btn')}>
                                    <span className={cx('orderid')}>ID Đơn hàng&nbsp;22080492QKCNVA{bill.DH_id}</span>
                                </div>
                            </div>
                        ))}

                        <div className={cx('body-bill')}>
                            <div className={cx('item-product')}>
                                {bill.soluong.map((num, index) => (
                                    <div key={index} className={cx('order-view-item--small')}>
                                        <div className={cx('order-product-list')}>
                                            <div className={cx('order-product-wrapper')}>
                                                <img src={num.SP_image} alt="" className={cx('item-images')} />
                                                <div className={cx('ct-item-product')}>
                                                    <div className={cx('ct-item-product-inner')}>
                                                        <div className={cx('ct-item-product-info')}>
                                                            <div className={cx('ct-item-product-name-link')}>
                                                                {num.SP_ten}
                                                            </div>
                                                        </div>
                                                        <div className={cx('ct-item-price-qty')}>
                                                            <div className={cx('ct-item-product-qty')}>
                                                                <div className={cx('ct-item-product-num')}>
                                                                    x{num.TTDH_soluong}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {/* <div className={cx('order-view-item--small')}>
                                                <div className={cx('order-product-list')}>
                                                    <div className={cx('order-product-wrapper')}>
                                                        <img
                                                            src="https://cf.shopee.vn/file/b7eb04c48688f851652397ef62cbaacd_tn"
                                                            alt=""
                                                            className={cx('item-images')}
                                                        />
                                                        <div className={cx('ct-item-product')}>
                                                            <div className={cx('ct-item-product-inner')}>
                                                                <div className={cx('ct-item-product-info')}>
                                                                    <div className={cx('ct-item-product-name-link')}>
                                                                        SET NẠ 10-30 VIÊN, MẶT NẠ NÉN BEAUTY TOOLS BẢN
                                                                        LỤA , BỎ TÚI ĐI DU LỊCH TIỆN LỢI
                                                                    </div>
                                                                </div>
                                                                <div className={cx('ct-item-price-qty')}>
                                                                    <div className={cx('ct-item-product-qty')}>
                                                                        <div className={cx('ct-item-product-num')}>
                                                                            x1
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                            </div>{' '}
                            <div className={cx('item-total')}>
                                <div className={cx('price')}>₫{formatCash(bill.DH_tongtien)}</div>{' '}
                                <div className={cx('payment-method')}>Thanh toán {bill.DH_loaithanhtoan}</div>
                            </div>{' '}
                            <div className={cx('item-status')}>
                                <div className={cx('status')}>
                                    <span>
                                        {bill.DH_trangthai === 1
                                            ? 'Chờ xác nhận'
                                            : bill.DH_trangthai === 2
                                            ? 'Đã giao'
                                            : bill.DH_trangthai === 3
                                            ? 'Đã hủy'
                                            : '...'}
                                    </span>{' '}
                                </div>{' '}
                                <div className={cx('substatus')}></div>
                            </div>{' '}
                            <div className={cx('item-channel')}></div>{' '}
                            <div className={cx('item-action')}>
                                <div className={cx('shopee-popover--light')}>
                                    <div className={cx('shopee-popover__ref')}>
                                        <Link to={`detail/@${bill.DH_id}`} className={cx('shopee-button--normal')}>
                                            <i className={cx('shopee-icon')}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                    <g>
                                                        <path d="M6.868 13.717H2.469a.49.49 0 0 1-.489-.489V2.476c0-.274.215-.489.49-.489h9.774a.49.49 0 0 1 .489.49v4.398a.489.489 0 0 0 .977 0V1.987a.98.98 0 0 0-.977-.977H1.98a.98.98 0 0 0-.977.977v11.73c0 .538.44.978.977.978h4.888a.489.489 0 1 0 0-.978zm7.593.089l-1.27-1.27c-.099-.098-.196-.098-.294-.098-.293 0-.489.195-.489.488 0 .098 0 .196.098.294l1.27 1.27c.098.098.196.196.392.196.293 0 .488-.196.488-.489 0-.098-.097-.293-.195-.391z"></path>
                                                        <path d="M10.642 7.83a2.932 2.932 0 1 0 0 5.866 2.932 2.932 0 0 0 0-5.865zm0 4.888a1.955 1.955 0 1 1-.089-3.909 1.955 1.955 0 0 1 .089 3.91zm.495-7.808H3.302a.482.482 0 0 1-.481-.48v-.016c0-.265.216-.481.48-.481h7.836c.265 0 .481.216.481.48v.016c0 .264-.217.481-.48.481zm-.031 1.955H3.27a.482.482 0 0 1-.48-.48v-.017c0-.264.216-.48.48-.48h7.836c.265 0 .48.216.48.48v.016a.483.483 0 0 1-.481.481zm-4.862 1.95H3.297a.482.482 0 0 1-.481-.48v-.016c0-.265.216-.481.48-.481h2.948c.265 0 .48.216.48.48v.016c0 .266-.215.48-.48.481z"></path>
                                                    </g>
                                                </svg>
                                            </i>
                                            <span>Xem chi tiết</span>
                                        </Link>
                                    </div>{' '}
                                    <div
                                        className={cx(
                                            'shopee-popper shopee-popover__popper shopee-popover__popper--light with-arrow',
                                        )}
                                    >
                                        <div className={cx('shopee-popover__content')}></div>
                                    </div>
                                </div>{' '}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Detail;
