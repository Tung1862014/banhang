import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { SidberSeller } from '~/actions/SidberSeller';
import GetCookie from '~/components/Hook/GetCookies';
import ProductSeller from './ProductSeller';
import styles from './SellerProduct.module.scss';

const cx = classNames.bind(styles);

function SellerProduct() {
    const [product, setProduct] = useState([]);
    const [status, setStatus] = useState('');
    const [number, setNumber] = useState('');
    const [checkOutOfStock, setCheckOutOfStock] = useState();
    const [searchValue, setSearchValue] = useState('');

    const dispatchSignIn = useDispatch();

    useEffect(() => {
        axios
            .post(`${process.env.REACT_APP_URL_NODEJS}/sellerproduct/product/show/all`, {
                NB_id: JSON.parse(GetCookie('seller')).ND_id,
                SP_trangthai: checkOutOfStock || '',
            })

            .then((res) => {
                console.log('...', res.data.status[0].status);
                setProduct(res.data.result);
                setStatus(res.data.status[0].status);
                setNumber(res.data.number[0].number);
            })
            .catch(() => {
                console.log('loi khong the show product');
            });
    }, [checkOutOfStock]);

    useEffect(() => {
        const pathId = window.location.pathname.toString();
        const resultId = pathId.slice(17);
        if (resultId === 'all') {
            handlerClickAll();
        } else if (resultId === 'action') {
            handlerClickAllAction();
        } else {
            handlerClickAllOutOfStock();
        }
    }, []);

    const handlerClickAll = () => {
        const tab1 = document.getElementById('tabs__tab1');
        const tab2 = document.getElementById('tabs__tab2');
        const tab3 = document.getElementById('tabs__tab3');
        const badge1 = document.getElementById('tab-badge1');
        const badge2 = document.getElementById('tab-badge2');
        tab2.style.color = '';
        tab3.style.color = '';
        tab1.style.color = 'red';
        tab1.style.fontFamily = 'Helvetica';
        tab2.style.fontFamily = 'Helvetica';
        tab3.style.fontFamily = 'Helvetica';
        badge1.style.color = '#999';
        badge2.style.color = '#999';
        setCheckOutOfStock('');
    };
    const handlerClickAllAction = () => {
        const tab1 = document.getElementById('tabs__tab1');
        const tab2 = document.getElementById('tabs__tab2');
        const tab3 = document.getElementById('tabs__tab3');
        const badge1 = document.getElementById('tab-badge1');
        const badge2 = document.getElementById('tab-badge2');
        tab2.style.color = 'red';
        tab3.style.color = '';
        tab1.style.color = '';
        tab1.style.fontFamily = 'Helvetica';
        tab2.style.fontFamily = 'Helvetica';
        tab3.style.fontFamily = 'Helvetica';
        badge1.style.color = 'red';
        badge2.style.color = '#999';
        setCheckOutOfStock('trangthaiaction');
    };
    const handlerClickAllOutOfStock = () => {
        const tab1 = document.getElementById('tabs__tab1');
        const tab2 = document.getElementById('tabs__tab2');
        const tab3 = document.getElementById('tabs__tab3');
        const badge1 = document.getElementById('tab-badge1');
        const badge2 = document.getElementById('tab-badge2');
        tab2.style.color = '';
        tab3.style.color = 'red';
        tab1.style.color = '';
        tab1.style.fontFamily = 'Helvetica';
        tab2.style.fontFamily = 'Helvetica';
        tab3.style.fontFamily = 'Helvetica';
        badge1.style.color = '#999';
        badge2.style.color = 'red';
        setCheckOutOfStock('trangthai');
    };

    const handleSearch = () => {
        axios
            .get(
                `${process.env.REACT_APP_URL_NODEJS}/sellerproduct/product/search/name?NB_id=${
                    JSON.parse(GetCookie('seller')).ND_id
                }&SP_ten=${searchValue || ''}`,
            )

            .then((res) => {
                console.log(res.data.result);
                setProduct(res.data.result);
                setStatus(res.data.status[0].status);
                setNumber(res.data.number[0].number);
            })
            .catch(() => {
                console.log('loi khong the show product');
            });
    };

    const handleAddProduct = () => {
        const action = SidberSeller('add_product');
        dispatchSignIn(action);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('shopee-tabs')}>
                <div className={cx('shopee-tabs__nav')}>
                    {' '}
                    <div className={cx('shopee-tabs__nav-warp')}>
                        <div className={cx('shopee-tabs__nav-tabs')}>
                            <div className={cx('shopee-tabs__nav-tab')}>
                                <Link
                                    to="/seller/product/@all"
                                    id="tabs__tab1"
                                    className={cx('tabs__tab1')}
                                    onClick={handlerClickAll}
                                >
                                    Tất cả
                                </Link>{' '}
                            </div>
                            <div className={cx('shopee-tabs__nav-tab')}>
                                <Link
                                    to="/seller/product/@action"
                                    id="tabs__tab2"
                                    className={cx('tabs__tab2')}
                                    onClick={handlerClickAllAction}
                                >
                                    Đang hoạt động
                                    <span id="tab-badge1" className={cx('tab-badge1')}>
                                        ( {number - status} )
                                    </span>
                                </Link>{' '}
                            </div>
                            <div className={cx('shopee-tabs__nav-tab')}>
                                <Link
                                    to="/seller/product/@OutOfStock"
                                    id="tabs__tab3"
                                    className={cx('tabs__tab3')}
                                    onClick={handlerClickAllOutOfStock}
                                >
                                    Hết hàng
                                    <span id="tab-badge2" className={cx('tab-badge2')}>
                                        {' '}
                                        ( {status !== '' ? status : '0'} )
                                    </span>
                                </Link>{' '}
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
                    <div className={cx('input-group-search')}>
                        <span className={cx('search-input-group__append')}>
                            <div className={cx('order-search-input')}>
                                <div className={cx('search-warpper')}>
                                    <div className={cx('input-order-search-btn')}>
                                        <div className={cx('input__inner--normal')}>
                                            <input
                                                type="text"
                                                placeholder="Nhập tên sản phẩm"
                                                clearable="true"
                                                resize="vertical"
                                                rows="2"
                                                minrows="2"
                                                restrictiontype="input"
                                                max="Infinity"
                                                min="-Infinity"
                                                className={cx('shopee-input__input')}
                                                onChange={(e) => setSearchValue(e.target.value)}
                                            />
                                            <div className={cx('shopee-input__suffix')}>
                                                <div className={cx('input__clear-btn')}>
                                                    <i className={cx('shopee-input__clear-btn')}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M8,2 C11.3137085,2 14,4.6862915 14,8 C14,11.3137085 11.3137085,14 8,14 C4.6862915,14 2,11.3137085 2,8 C2,4.6862915 4.6862915,2 8,2 Z M10.5924919,5.27303573 C10.4094355,5.1521972 10.1606887,5.17236516 9.99956233,5.33352414 L9.99956233,5.33352414 L8.00023568,7.33325477 L6.00047136,5.33349045 C5.81628967,5.14930876 5.51767215,5.14930876 5.33349045,5.33349045 L5.33349045,5.33349045 L5.27301564,5.40754038 C5.1522078,5.59059052 5.17239885,5.83931011 5.33355782,6.00040399 L5.33355782,6.00040399 L7.33372614,7.99976432 L5.33352414,9.99956232 L5.33352414,9.99956232 L5.27306194,10.0735738 C5.15220491,10.2566181 5.17234775,10.5053668 5.33349045,10.6665095 L5.33349045,10.6665095 L5.40750807,10.7269643 C5.5905645,10.8478028 5.83931125,10.8276348 6.00043768,10.6664759 L6.00043768,10.6664759 L8.00023568,8.66627386 L9.99959601,10.6664422 L9.99959601,10.6664422 L10.0736337,10.726932 C10.2566595,10.8477768 10.5053831,10.827636 10.6665095,10.6665095 C10.8506912,10.4823279 10.8506912,10.1837103 10.6665095,9.99952864 L10.6665095,9.99952864 L8.66674523,7.99976432 L10.6664759,6.00043767 L10.6664759,6.00043767 L10.7269381,5.92642616 C10.8477951,5.74338194 10.8276522,5.49463316 10.6665095,5.33349045 L10.6665095,5.33349045 Z"
                                                            ></path>
                                                        </svg>
                                                    </i>
                                                </div>
                                                <div className={cx('input__suffix-icon')} onClick={handleSearch}>
                                                    <i className={cx('shopee-input__suffix-icon')}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                            <path d="M6.99383468,0.993751221 C10.3075432,0.993751221 12.9938347,3.68004272 12.9938347,6.99375122 C12.9938347,8.46891634 12.4614742,9.81974201 11.5783922,10.8645893 L14.8572322,14.1431825 C15.0524943,14.3384447 15.0524943,14.6550272 14.8572322,14.8502893 C14.6836658,15.0238557 14.4142414,15.0431408 14.2193733,14.9081448 L14.1501254,14.8502893 L10.8716694,11.5723862 C9.82585916,12.45901 8.47229467,12.9937512 6.99383468,12.9937512 C3.68012618,12.9937512 0.993834675,10.3074597 0.993834675,6.99375122 C0.993834675,3.68004272 3.68012618,0.993751221 6.99383468,0.993751221 Z M6.99383468,1.99375122 C4.23241093,1.99375122 1.99383468,4.23232747 1.99383468,6.99375122 C1.99383468,9.75517497 4.23241093,11.9937512 6.99383468,11.9937512 C9.75525842,11.9937512 11.9938347,9.75517497 11.9938347,6.99375122 C11.9938347,4.23232747 9.75525842,1.99375122 6.99383468,1.99375122 Z"></path>
                                                        </svg>
                                                    </i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </span>
                    </div>
                    <div className={cx('grid-right')}>
                        <Link
                            to={'/seller/product/insert'}
                            className={cx('add-action')}
                            onClick={() => handleAddProduct()}
                        >
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
