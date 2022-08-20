import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GetCookie from '~/components/Hook/GetCookies';
import ProductSeller from './ProductSeller';
import styles from './SellerProduct.module.scss';

const cx = classNames.bind(styles);

function SellerProduct() {
    const [product, setProduct] = useState([]);
    const [status, setStatus] = useState('');
    const [number, setNumber] = useState('');
    const [checkOutOfStock, setCheckOutOfStock] = useState();

    useEffect(() => {
        axios
            .post(`${process.env.REACT_APP_URL_NODEJS}/sellerproduct/product/show/all`, {
                NB_id: JSON.parse(GetCookie('seller')).NB_id,
                SP_trangthai: checkOutOfStock || '',
            })

            .then((res) => {
                console.log(res.data.status[0].status);
                setProduct(res.data.result);
                setStatus(res.data.status[0].status);
                setNumber(res.data.number[0].number);
            })
            .catch(() => {
                console.log('loi khong the show product');
            });
    }, [checkOutOfStock]);

    useEffect(() => {
        handlerClickAll();
    }, []);

    const handlerClickAll = () => {
        const tab1 = document.querySelector('.tabs__tab1');
        const tab2 = document.querySelector('.tabs__tab2');
        const tab3 = document.querySelector('.tabs__tab3');
        tab2.style.color = '';
        tab3.style.color = '';
        tab1.style.color = 'red';
        tab1.style.fontFamily = 'Helvetica';
        tab2.style.fontFamily = 'Helvetica';
        tab3.style.fontFamily = 'Helvetica';
        setCheckOutOfStock('');
    };
    const handlerClickAllAction = () => {
        const tab1 = document.querySelector('.tabs__tab1');
        const tab2 = document.querySelector('.tabs__tab2');
        const tab3 = document.querySelector('.tabs__tab3');
        tab2.style.color = 'red';
        tab3.style.color = '';
        tab1.style.color = '';
        tab1.style.fontFamily = 'Helvetica';
        tab2.style.fontFamily = 'Helvetica';
        tab3.style.fontFamily = 'Helvetica';
        setCheckOutOfStock('trangthaiaction');
    };
    const handlerClickAllOutOfStock = () => {
        const tab1 = document.querySelector('.tabs__tab1');
        const tab2 = document.querySelector('.tabs__tab2');
        const tab3 = document.querySelector('.tabs__tab3');
        tab2.style.color = '';
        tab3.style.color = 'red';
        tab1.style.color = '';
        tab1.style.fontFamily = 'Helvetica';
        tab2.style.fontFamily = 'Helvetica';
        tab3.style.fontFamily = 'Helvetica';
        setCheckOutOfStock('trangthai');
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
                                <div data-v-d8c4d7c4="" className={cx('tabs__tab2')} onClick={handlerClickAllAction}>
                                    Đang hoạt động<span className={cx('tab-badge')}>( {number - status} )</span>
                                </div>{' '}
                            </div>
                            <div className={cx('shopee-tabs__nav-tab')}>
                                <div
                                    data-v-d8c4d7c4=""
                                    className={cx('tabs__tab3')}
                                    onClick={handlerClickAllOutOfStock}
                                >
                                    Hết hàng<span className={cx('tab-badge')}> ( {status} )</span>
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
                                    {number} Sản Phẩm
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
            <ProductSeller data={product} />
        </div>
    );
}

export default SellerProduct;
