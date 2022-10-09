import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GetCookie from '~/components/Hook/GetCookies';
import styles from './SellerShopReviews.module.scss';
import SellerShopReviewsPage from './SellerShopReviewsPage';

const cx = classNames.bind(styles);

function SellerShopReviews() {
    const [star, setStar] = useState('');
    const [evaluate, setEvaluate] = useState('');
    const [star5Value, setStar5Value] = useState('');
    const [star4Value, setStar4Value] = useState('');
    const [star3Value, setStar3Value] = useState('');
    const [star2Value, setStar2Value] = useState('');
    const [star1Value, setStar1Value] = useState('');

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_URL_NODEJS}/sellerreviewsshop/evaluate/show/all?NB_id=${
                    JSON.parse(GetCookie('seller')).ND_id
                }&DG_sosao=${star || ''}`,
            )

            .then((res) => {
                console.log(res.data.result);
                setEvaluate(res.data.result);
            })
            .catch(() => {
                console.log('loi khong the show product');
            });
    }, [star]);

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_URL_NODEJS}/sellerreviewsshop/evaluate/show/star?NB_id=${
                    JSON.parse(GetCookie('seller')).ND_id
                }&DG_sosao=${star || ''}`,
            )

            .then((res) => {
                console.log('star', res.data);
                setStar5Value(res.data.star5[0].star5);
                setStar4Value(res.data.star4[0].star4);
                setStar3Value(res.data.star3[0].star3);
                setStar2Value(res.data.star2[0].star2);
                setStar1Value(res.data.star1[0].star1);
            })
            .catch(() => {
                console.log('loi khong the show product');
            });
    }, [star]);

    useEffect(() => {
        const pathId = window.location.pathname.toString();
        const resultId = pathId.slice(22);
        if (resultId === 'all') {
            handleCheckAll();
        } else if (resultId === 'five') {
            handleCheckStar5();
        } else if (resultId === 'four') {
            handleCheckStar4();
        } else if (resultId === 'three') {
            handleCheckStar3();
        } else if (resultId === 'two') {
            handleCheckStar2();
        } else if (resultId === 'one') {
            handleCheckStar1();
        }
    }, []);

    function handleCheckAll() {
        const checkAll = document.getElementById('shopee-tabs__nav-tab-all');
        const checkStar5 = document.getElementById('shopee-tabs__nav-tab-5');
        const checkStar4 = document.getElementById('shopee-tabs__nav-tab-4');
        const checkStar3 = document.getElementById('shopee-tabs__nav-tab-3');
        const checkStar2 = document.getElementById('shopee-tabs__nav-tab-2');
        const checkStar1 = document.getElementById('shopee-tabs__nav-tab-1');
        const subtitle5 = document.getElementById('subtitle5');
        const subtitle4 = document.getElementById('subtitle4');
        const subtitle3 = document.getElementById('subtitle3');
        const subtitle2 = document.getElementById('subtitle2');
        const subtitle1 = document.getElementById('subtitle1');
        checkAll.style.color = 'red';
        checkAll.style.border = '1px solid red';
        checkStar5.style.color = 'black';
        checkStar5.style.border = '1px solid #e5e5e5';
        checkStar4.style.color = 'black';
        checkStar4.style.border = '1px solid #e5e5e5';
        checkStar3.style.color = 'black';
        checkStar3.style.border = '1px solid #e5e5e5';
        checkStar2.style.color = 'black';
        checkStar2.style.border = '1px solid #e5e5e5';
        checkStar1.style.color = 'black';
        checkStar1.style.border = '1px solid #e5e5e5';
        subtitle5.style.color = '';
        subtitle4.style.color = '';
        subtitle3.style.color = '';
        subtitle2.style.color = '';
        subtitle1.style.color = '';
        setStar('');
    }

    function handleCheckStar5() {
        const checkAll = document.getElementById('shopee-tabs__nav-tab-all');
        const checkStar5 = document.getElementById('shopee-tabs__nav-tab-5');
        const checkStar4 = document.getElementById('shopee-tabs__nav-tab-4');
        const checkStar3 = document.getElementById('shopee-tabs__nav-tab-3');
        const checkStar2 = document.getElementById('shopee-tabs__nav-tab-2');
        const checkStar1 = document.getElementById('shopee-tabs__nav-tab-1');
        const subtitle5 = document.getElementById('subtitle5');
        const subtitle4 = document.getElementById('subtitle4');
        const subtitle3 = document.getElementById('subtitle3');
        const subtitle2 = document.getElementById('subtitle2');
        const subtitle1 = document.getElementById('subtitle1');
        checkAll.style.color = 'black';
        checkAll.style.border = '1px solid #e5e5e5';
        checkStar5.style.color = 'red';
        checkStar5.style.border = '1px solid red';
        checkStar4.style.color = 'black';
        checkStar4.style.border = '1px solid #e5e5e5';
        checkStar3.style.color = 'black';
        checkStar3.style.border = '1px solid #e5e5e5';
        checkStar2.style.color = 'black';
        checkStar2.style.border = '1px solid #e5e5e5';
        checkStar1.style.color = 'black';
        checkStar1.style.border = '1px solid #e5e5e5';
        subtitle5.style.color = 'red';
        subtitle4.style.color = '';
        subtitle3.style.color = '';
        subtitle2.style.color = '';
        subtitle1.style.color = '';
        setStar('5');
    }
    function handleCheckStar4() {
        const checkAll = document.getElementById('shopee-tabs__nav-tab-all');
        const checkStar5 = document.getElementById('shopee-tabs__nav-tab-5');
        const checkStar4 = document.getElementById('shopee-tabs__nav-tab-4');
        const checkStar3 = document.getElementById('shopee-tabs__nav-tab-3');
        const checkStar2 = document.getElementById('shopee-tabs__nav-tab-2');
        const checkStar1 = document.getElementById('shopee-tabs__nav-tab-1');
        const subtitle5 = document.getElementById('subtitle5');
        const subtitle4 = document.getElementById('subtitle4');
        const subtitle3 = document.getElementById('subtitle3');
        const subtitle2 = document.getElementById('subtitle2');
        const subtitle1 = document.getElementById('subtitle1');
        checkAll.style.color = 'black';
        checkAll.style.border = '1px solid #e5e5e5';
        checkStar5.style.color = 'black';
        checkStar5.style.border = '1px solid #e5e5e5';
        checkStar4.style.color = 'red';
        checkStar4.style.border = '1px solid red';
        checkStar3.style.color = 'black';
        checkStar3.style.border = '1px solid #e5e5e5';
        checkStar2.style.color = 'black';
        checkStar2.style.border = '1px solid #e5e5e5';
        checkStar1.style.color = 'black';
        checkStar1.style.border = '1px solid #e5e5e5';
        subtitle5.style.color = '';
        subtitle4.style.color = 'red';
        subtitle3.style.color = '';
        subtitle2.style.color = '';
        subtitle1.style.color = '';
        setStar('4');
    }
    function handleCheckStar3() {
        const checkAll = document.getElementById('shopee-tabs__nav-tab-all');
        const checkStar5 = document.getElementById('shopee-tabs__nav-tab-5');
        const checkStar4 = document.getElementById('shopee-tabs__nav-tab-4');
        const checkStar3 = document.getElementById('shopee-tabs__nav-tab-3');
        const checkStar2 = document.getElementById('shopee-tabs__nav-tab-2');
        const checkStar1 = document.getElementById('shopee-tabs__nav-tab-1');
        const subtitle5 = document.getElementById('subtitle5');
        const subtitle4 = document.getElementById('subtitle4');
        const subtitle3 = document.getElementById('subtitle3');
        const subtitle2 = document.getElementById('subtitle2');
        const subtitle1 = document.getElementById('subtitle1');
        checkAll.style.color = 'black';
        checkAll.style.border = '1px solid #e5e5e5';
        checkStar5.style.color = 'black';
        checkStar5.style.border = '1px solid #e5e5e5';
        checkStar4.style.color = 'black';
        checkStar4.style.border = '1px solid #e5e5e5';
        checkStar3.style.color = 'red';
        checkStar3.style.border = '1px solid red';
        checkStar2.style.color = 'black';
        checkStar2.style.border = '1px solid #e5e5e5';
        checkStar1.style.color = 'black';
        checkStar1.style.border = '1px solid #e5e5e5';
        subtitle5.style.color = '';
        subtitle4.style.color = '';
        subtitle3.style.color = 'red';
        subtitle2.style.color = '';
        subtitle1.style.color = '';
        setStar('3');
    }
    function handleCheckStar2() {
        const checkAll = document.getElementById('shopee-tabs__nav-tab-all');
        const checkStar5 = document.getElementById('shopee-tabs__nav-tab-5');
        const checkStar4 = document.getElementById('shopee-tabs__nav-tab-4');
        const checkStar3 = document.getElementById('shopee-tabs__nav-tab-3');
        const checkStar2 = document.getElementById('shopee-tabs__nav-tab-2');
        const checkStar1 = document.getElementById('shopee-tabs__nav-tab-1');
        const subtitle5 = document.getElementById('subtitle5');
        const subtitle4 = document.getElementById('subtitle4');
        const subtitle3 = document.getElementById('subtitle3');
        const subtitle2 = document.getElementById('subtitle2');
        const subtitle1 = document.getElementById('subtitle1');
        checkAll.style.color = 'black';
        checkAll.style.border = '1px solid #e5e5e5';
        checkStar5.style.color = 'black';
        checkStar5.style.border = '1px solid #e5e5e5';
        checkStar4.style.color = 'black';
        checkStar4.style.border = '1px solid #e5e5e5';
        checkStar3.style.color = 'black';
        checkStar3.style.border = '1px solid #e5e5e5';
        checkStar2.style.color = 'red';
        checkStar2.style.border = '1px solid red';
        checkStar1.style.color = 'black';
        checkStar1.style.border = '1px solid #e5e5e5';
        subtitle5.style.color = '';
        subtitle4.style.color = '';
        subtitle3.style.color = '';
        subtitle2.style.color = 'red';
        subtitle1.style.color = '';
        setStar('2');
    }
    function handleCheckStar1() {
        const checkAll = document.getElementById('shopee-tabs__nav-tab-all');
        const checkStar5 = document.getElementById('shopee-tabs__nav-tab-5');
        const checkStar4 = document.getElementById('shopee-tabs__nav-tab-4');
        const checkStar3 = document.getElementById('shopee-tabs__nav-tab-3');
        const checkStar2 = document.getElementById('shopee-tabs__nav-tab-2');
        const checkStar1 = document.getElementById('shopee-tabs__nav-tab-1');
        const subtitle5 = document.getElementById('subtitle5');
        const subtitle4 = document.getElementById('subtitle4');
        const subtitle3 = document.getElementById('subtitle3');
        const subtitle2 = document.getElementById('subtitle2');
        const subtitle1 = document.getElementById('subtitle1');
        checkAll.style.color = 'black';
        checkAll.style.border = '1px solid #e5e5e5';
        checkStar5.style.color = 'black';
        checkStar5.style.border = '1px solid #e5e5e5';
        checkStar4.style.color = 'black';
        checkStar4.style.border = '1px solid #e5e5e5';
        checkStar3.style.color = 'black';
        checkStar3.style.border = '1px solid #e5e5e5';
        checkStar2.style.color = 'black';
        checkStar2.style.border = '1px solid #e5e5e5';
        checkStar1.style.color = 'red';
        checkStar1.style.border = '1px solid red';
        subtitle5.style.color = '';
        subtitle4.style.color = '';
        subtitle3.style.color = '';
        subtitle2.style.color = '';
        subtitle1.style.color = 'red';
        setStar('1');
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('rating')}>
                <div className={cx('header')}>
                    <div className={cx('caption')}>
                        <div className={cx('title')}>Đánh Giá Gian Hàng</div>{' '}
                        <div className={cx('subtitle')}>Xem đánh giá gian hàng của bạn</div>
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('reviews-tabs-module-normal')}>
                        <div className={cx('shopee-tabs__nav')}>
                            {' '}
                            <div className={cx('shopee-tabs__nav-warp')}>
                                <div className={cx('shopee-tabs__nav-tabs')}>
                                    <Link
                                        to={'/seller/shop/reviews/@all'}
                                        id="shopee-tabs__nav-tab-all"
                                        className={cx('shopee-tabs__nav-tab-all')}
                                        onClick={handleCheckAll}
                                    >
                                        Tất cả{' '}
                                    </Link>
                                    <Link
                                        to={'/seller/shop/reviews/@five'}
                                        id="shopee-tabs__nav-tab-5"
                                        className={cx('shopee-tabs__nav-tab-5')}
                                        onClick={handleCheckStar5}
                                    >
                                        <span className={cx('title-5')}>5 Sao</span>
                                        <span id="subtitle5" className={cx('subtitle')}>
                                            (&nbsp;{star5Value || 0}&nbsp;)
                                        </span>
                                    </Link>
                                    <Link
                                        to={'/seller/shop/reviews/@four'}
                                        id="shopee-tabs__nav-tab-4"
                                        className={cx('shopee-tabs__nav-tab-4')}
                                        onClick={handleCheckStar4}
                                    >
                                        <span className={cx('title-4')}>4 Sao</span>{' '}
                                        <span id="subtitle4" className={cx('subtitle')}>
                                            (&nbsp;{star4Value || 0}&nbsp;)
                                        </span>
                                    </Link>
                                    <Link
                                        to={'/seller/shop/reviews/@three'}
                                        id="shopee-tabs__nav-tab-3"
                                        className={cx('shopee-tabs__nav-tab-3')}
                                        onClick={handleCheckStar3}
                                    >
                                        <span className={cx('title-3')}>3 Sao</span>{' '}
                                        <span id="subtitle3" className={cx('subtitle')}>
                                            (&nbsp;{star3Value || 0}&nbsp;)
                                        </span>
                                    </Link>
                                    <Link
                                        to={'/seller/shop/reviews/@two'}
                                        id="shopee-tabs__nav-tab-2"
                                        className={cx('shopee-tabs__nav-tab-2')}
                                        onClick={handleCheckStar2}
                                    >
                                        <span className={cx('title-2')}>2 Sao</span>{' '}
                                        <span id="subtitle2" className={cx('subtitle')}>
                                            (&nbsp;{star2Value || 0}&nbsp;)
                                        </span>
                                    </Link>
                                    <Link
                                        to={'/seller/shop/reviews/@one'}
                                        id="shopee-tabs__nav-tab-1"
                                        className={cx('shopee-tabs__nav-tab-1')}
                                        onClick={handleCheckStar1}
                                    >
                                        <span className={cx('title-1')}>1 Sao</span>{' '}
                                        <span id="subtitle1" className={cx('subtitle')}>
                                            (&nbsp;{star1Value || 0}&nbsp;)
                                        </span>
                                    </Link>
                                </div>{' '}
                            </div>{' '}
                        </div>{' '}
                    </div>
                    <div className={cx('table-header')}>
                        <div className={cx('column-information')}>Thông tin sản phẩm</div>{' '}
                        <div className={cx('column-evaluation-content')}>Đánh giá</div>{' '}
                    </div>
                    <SellerShopReviewsPage data={evaluate} />
                </div>
            </div>
        </div>
    );
}

export default SellerShopReviews;
