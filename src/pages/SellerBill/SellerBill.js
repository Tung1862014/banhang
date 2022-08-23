import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GetCookie from '~/components/Hook/GetCookies';
import styles from './SellerBill.module.scss';
import SellerBillPage from './SellerBillPage';

const cx = classNames.bind(styles);

function SellerBill() {
    const [bill, setBill] = useState([]);
    const [statusConfirm, setStatusConfirm] = useState('');
    const [statusDelivered, setStatusDelivered] = useState('');
    const [statusCancelOrder, setStatusCancelOrder] = useState('');
    const [number, setNumber] = useState('');
    const [checkStatus, setCheckStatus] = useState();

    useEffect(() => {
        axios
            .post(`${process.env.REACT_APP_URL_NODEJS}/sellerbill/bill/show/all`, {
                NB_id: JSON.parse(GetCookie('seller')).NB_id,
                DH_trangthai: checkStatus || '',
            })

            .then((res) => {
                console.log(res.data.result);
                setBill(res.data.result);
                setStatusConfirm(res.data.statusconfirm[0].statusconfirm);
                setStatusDelivered(res.data.statusdelivered[0].statusdelivered);
                setStatusCancelOrder(res.data.statuscancelOrder[0].statuscancelOrder);
                setNumber(res.data.number[0].number);
            })
            .catch(() => {
                console.log('loi khong the show bill');
            });
    }, [checkStatus]);

    useEffect(() => {
        handlerClickAll();
    }, []);

    const handlerClickAll = () => {
        const tab1 = document.querySelector('.tabs__tab1');
        const tab2 = document.querySelector('.tabs__tab2');
        const tab3 = document.querySelector('.tabs__tab3');
        const tab4 = document.querySelector('.tabs__tab4');
        tab2.style.color = '';
        tab3.style.color = '';
        tab4.style.color = '';
        tab1.style.color = 'red';
        tab1.style.fontFamily = 'Helvetica';
        tab2.style.fontFamily = 'Helvetica';
        tab3.style.fontFamily = 'Helvetica';
        tab4.style.fontFamily = 'Helvetica';
        setCheckStatus('');
    };
    const handlerClickAllConfirm = () => {
        const tab1 = document.querySelector('.tabs__tab1');
        const tab2 = document.querySelector('.tabs__tab2');
        const tab3 = document.querySelector('.tabs__tab3');
        const tab4 = document.querySelector('.tabs__tab4');
        tab2.style.color = 'red';
        tab3.style.color = '';
        tab1.style.color = '';
        tab4.style.color = '';
        tab1.style.fontFamily = 'Helvetica';
        tab2.style.fontFamily = 'Helvetica';
        tab3.style.fontFamily = 'Helvetica';
        tab4.style.fontFamily = 'Helvetica';
        setCheckStatus('trangthaixacnhan');
    };
    const handlerClickAllDelivered = () => {
        const tab1 = document.querySelector('.tabs__tab1');
        const tab2 = document.querySelector('.tabs__tab2');
        const tab3 = document.querySelector('.tabs__tab3');
        const tab4 = document.querySelector('.tabs__tab4');
        tab2.style.color = '';
        tab3.style.color = 'red';
        tab1.style.color = '';
        tab4.style.color = '';
        tab1.style.fontFamily = 'Helvetica';
        tab2.style.fontFamily = 'Helvetica';
        tab3.style.fontFamily = 'Helvetica';
        tab4.style.fontFamily = 'Helvetica';
        setCheckStatus('trangthaidagiao');
    };

    const handlerClickAllCancelOrder = () => {
        const tab1 = document.querySelector('.tabs__tab1');
        const tab2 = document.querySelector('.tabs__tab2');
        const tab3 = document.querySelector('.tabs__tab3');
        const tab4 = document.querySelector('.tabs__tab4');
        tab2.style.color = '';
        tab3.style.color = '';
        tab1.style.color = '';
        tab4.style.color = 'red';
        tab1.style.fontFamily = 'Helvetica';
        tab2.style.fontFamily = 'Helvetica';
        tab3.style.fontFamily = 'Helvetica';
        tab4.style.fontFamily = 'Helvetica';
        setCheckStatus('trangthaihuy');
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('shopee-tabs')}>
                <div className={cx('shopee-tabs__nav')}>
                    {' '}
                    <div className={cx('shopee-tabs__nav-warp')}>
                        <div className={cx('shopee-tabs__nav-tabs')}>
                            <div className={cx('shopee-tabs__nav-tab')}>
                                <div data-v-d8c4d7c4="" className={cx('tabs__tab1')} onClick={handlerClickAll}>
                                    Tất cả
                                </div>{' '}
                            </div>
                            <div className={cx('shopee-tabs__nav-tab')}>
                                <div data-v-d8c4d7c4="" className={cx('tabs__tab2')} onClick={handlerClickAllConfirm}>
                                    Chờ xác nhận<span className={cx('tab-badge')}>( {statusConfirm} )</span>
                                </div>{' '}
                            </div>
                            <div className={cx('shopee-tabs__nav-tab')}>
                                <div data-v-d8c4d7c4="" className={cx('tabs__tab3')} onClick={handlerClickAllDelivered}>
                                    Đã giao<span className={cx('tab-badge')}> ( {statusDelivered} )</span>
                                </div>{' '}
                            </div>
                            <div className={cx('shopee-tabs__nav-tab')}>
                                <div
                                    data-v-d8c4d7c4=""
                                    className={cx('tabs__tab4')}
                                    onClick={handlerClickAllCancelOrder}
                                >
                                    Đơn hủy<span className={cx('tab-badge')}> ( {statusCancelOrder} )</span>
                                </div>{' '}
                            </div>
                        </div>{' '}
                        <div className={cx('shopee-tabs__ink-bar')}></div>
                    </div>{' '}
                </div>{' '}
            </div>
            <div className={cx('product-grid')}>
                <div className={cx('grid')}>
                    <div data-v-3cbfdb84="" className={cx('grid-left')}>
                        <div data-v-3cbfdb84="" className={cx('title-box')}>
                            <div data-v-3cbfdb84="" className={cx('page-title-box')}>
                                <div data-v-3cbfdb84="" className={cx('page-title')}>
                                    {number} Đơn hàng
                                </div>{' '}
                            </div>
                        </div>
                    </div>
                    <div className={cx('grid-right')}>
                        <Link to={'/seller/product/insert'} className={cx('add-action')}>
                            <i className={cx('shopee-icon')}>
                                <svg viewBox="0 0 32 32">
                                    <path d="M17.5 2.5h-3v12h-12v3h12v12h3v-12h12v-3h-12v-12z"></path>
                                </svg>
                            </i>
                            <span className={cx('shopee-add-title')}>Thêm 1 sản phẩm mới</span>
                        </Link>
                    </div>
                </div>
            </div>
            {/* <ProductSeller data={product} /> */}
            <div className={cx('order-list-pannel')}>
                <div className={cx('order-list-section')}>
                    <div className={cx('shopee-fixed-top-card')}>
                        <div className={cx('fixed-container')}>
                            <div className={cx('order-list-header')}>
                                <span className={cx('item-product')}>Sản phẩm</span>
                                <span className={cx('item-total')}>Tổng Đơn hàng</span>{' '}
                                <span className={cx('item-status')}>Trạng thái</span>{' '}
                                <span className={cx('item-channel')}>Vận Chuyển</span>
                                <span className={cx('item-action')}>Thao tác</span>
                            </div>
                        </div>{' '}
                        <div data-v-dff31658="" className={cx('fixed-placeholder')}></div>
                    </div>
                    <SellerBillPage data={bill} />
                </div>
            </div>
        </div>
    );
}

export default SellerBill;
