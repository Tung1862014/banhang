import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import styles from './SellerShopReviews.module.scss';

const cx = classNames.bind(styles);

function SellerShopReviews() {
    useEffect(() => {
        handleCheckAll();
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
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('rating')}>
                <div className={cx('header')}>
                    <div className={cx('caption')}>
                        <div className={cx('title')}>Đánh Giá Shop</div>{' '}
                        <div className={cx('subtitle')}>Xem đánh giá Shop của bạn</div>
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('reviews-tabs-module-normal')}>
                        <div className={cx('shopee-tabs__nav')}>
                            {' '}
                            <div className={cx('shopee-tabs__nav-warp')}>
                                <div className={cx('shopee-tabs__nav-tabs')}>
                                    <div
                                        id="shopee-tabs__nav-tab-all"
                                        className={cx('shopee-tabs__nav-tab-all')}
                                        onClick={handleCheckAll}
                                    >
                                        Tất cả{' '}
                                    </div>
                                    <div
                                        id="shopee-tabs__nav-tab-5"
                                        className={cx('shopee-tabs__nav-tab-5')}
                                        onClick={handleCheckStar5}
                                    >
                                        <span className={cx('title-5')}>5 Sao</span>
                                        <span id="subtitle5" className={cx('subtitle')}>
                                            (&nbsp;1&nbsp;)
                                        </span>
                                    </div>
                                    <div
                                        id="shopee-tabs__nav-tab-4"
                                        className={cx('shopee-tabs__nav-tab-4')}
                                        onClick={handleCheckStar4}
                                    >
                                        <span className={cx('title-4')}>4 Sao</span>{' '}
                                        <span id="subtitle4" className={cx('subtitle')}>
                                            (&nbsp;1&nbsp;)
                                        </span>
                                    </div>
                                    <div
                                        id="shopee-tabs__nav-tab-3"
                                        className={cx('shopee-tabs__nav-tab-3')}
                                        onClick={handleCheckStar3}
                                    >
                                        <span className={cx('title-3')}>3 Sao</span>{' '}
                                        <span id="subtitle3" className={cx('subtitle')}>
                                            (&nbsp;1&nbsp;)
                                        </span>
                                    </div>
                                    <div
                                        id="shopee-tabs__nav-tab-2"
                                        className={cx('shopee-tabs__nav-tab-2')}
                                        onClick={handleCheckStar2}
                                    >
                                        <span className={cx('title-2')}>2 Sao</span>{' '}
                                        <span id="subtitle2" className={cx('subtitle')}>
                                            (&nbsp;1&nbsp;)
                                        </span>
                                    </div>
                                    <div
                                        id="shopee-tabs__nav-tab-1"
                                        className={cx('shopee-tabs__nav-tab-1')}
                                        onClick={handleCheckStar1}
                                    >
                                        <span className={cx('title-1')}>1 Sao</span>{' '}
                                        <span id="subtitle1" className={cx('subtitle')}>
                                            (&nbsp;1&nbsp;)
                                        </span>
                                    </div>
                                </div>{' '}
                            </div>{' '}
                        </div>{' '}
                        <div className="shopee-tabs__content">
                            <div className="shopee-tabs-tabpane"></div> <div className="shopee-tabs-tabpane"></div>
                            <div className="shopee-tabs-tabpane"></div>
                            <div className="shopee-tabs-tabpane"></div>
                            <div className="shopee-tabs-tabpane"></div>
                            <div className="shopee-tabs-tabpane"></div>
                        </div>
                    </div>
                    <div className={cx('table-header')}>
                        <div className={cx('column-information')}>Thông tin Sản phẩm</div>{' '}
                        <div className={cx('column-evaluation-content')}>Đánh giá của Người mua</div>{' '}
                    </div>
                    <div>
                        <div className={cx('comments')}>
                            <div className={cx('comment')}>
                                <div className={cx('container')}>
                                    <div className={cx('table')}>
                                        <div className={cx('top')}>
                                            <div className={cx('column-information')}>
                                                <div className={cx('user')}>
                                                    Người mua:
                                                    <span className={cx('username')}>hoalan485</span>
                                                </div>
                                            </div>{' '}
                                            <div className={cx('column-evaluation-content')}></div>{' '}
                                            <div className={cx('column-reply')}>ID đơn hàng:2204070MCYBCPS</div>
                                        </div>{' '}
                                        <div className={cx('bottom')}>
                                            <div className={cx('column-information-product')}>
                                                <img
                                                    src="https://cf.shopee.vn/file/0595d246caa2025dd7e2978bc64a722a_tn"
                                                    alt=""
                                                    className={cx('product-image')}
                                                />{' '}
                                                <div>
                                                    <div className={cx('product-name')}>
                                                        Nước Tẩy Trang Hoa Hồng Cocoon
                                                    </div>{' '}
                                                    <div className={cx('product-variation')}>
                                                        Phân loại:1 chai|Combo 2 chai
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('column-evaluation-content')}>
                                                <div>
                                                    <div className={cx('comment-info')}>
                                                        <div className={cx('content')}>
                                                            <div className={cx('review-rate-disabled')}>
                                                                <div className={cx('shopee-rate-star')}>
                                                                    <div className={cx('shopee-rate-star__front')}>
                                                                        <FontAwesomeIcon
                                                                            className={cx('shopee-icon1')}
                                                                            icon={faStar}
                                                                        />
                                                                    </div>{' '}
                                                                </div>
                                                                <div className={cx('shopee-rate-star')}>
                                                                    <div className={cx('shopee-rate-star__front')}>
                                                                        <FontAwesomeIcon
                                                                            className={cx('shopee-icon2')}
                                                                            icon={faStar}
                                                                        />
                                                                    </div>{' '}
                                                                </div>
                                                                <div className={cx('shopee-rate-star')}>
                                                                    <div className={cx('shopee-rate-star__front')}>
                                                                        <FontAwesomeIcon
                                                                            className={cx('shopee-icon3')}
                                                                            icon={faStar}
                                                                        />
                                                                    </div>{' '}
                                                                </div>
                                                                <div className={cx('shopee-rate-star')}>
                                                                    <div className={cx('shopee-rate-star__front')}>
                                                                        <FontAwesomeIcon
                                                                            className={cx('shopee-icon4')}
                                                                            icon={faStar}
                                                                        />
                                                                    </div>{' '}
                                                                </div>
                                                                <div className={cx('shopee-rate-star')}>
                                                                    <div className={cx('shopee-rate-star__front')}>
                                                                        <FontAwesomeIcon
                                                                            className={cx('shopee-icon5')}
                                                                            icon={faStar}
                                                                        />
                                                                    </div>{' '}
                                                                </div>
                                                            </div>{' '}
                                                            <div>
                                                                <div className={cx('content')}>
                                                                    <div className={cx('comment')}>
                                                                        Công dụng:chất lượng sản phẩm tuyệt vời , đóng
                                                                        gói cẩn thận, giao hàng nhanh
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>{' '}
                                                    </div>{' '}
                                                    <div data-v-21a0901d="" className={cx('date')}>
                                                        10:44 01/05/2022
                                                    </div>
                                                </div>
                                            </div>{' '}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SellerShopReviews;
