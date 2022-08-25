import classNames from 'classnames/bind';
import styles from './SellerShopReviews.module.scss';

const cx = classNames.bind(styles);

function SellerShopReviews() {
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
                    <div className={cx('tab-wrapper')}>
                        <div className={cx('shopee-tabs shopee-tabs-line shopee-tabs-normal shopee-tabs-top')}>
                            <div className={cx('shopee-tabs__nav')}>
                                {' '}
                                <div className={cx('shopee-tabs__nav-warp')}>
                                    <div className={cx('shopee-tabs__nav-tabs')}>
                                        <div className={cx('shopee-tabs__nav-tab active')}>Tất cả </div>
                                        <div className={cx('shopee-tabs__nav-tab')}>Chưa trả lời </div>
                                        <div className={cx('shopee-tabs__nav-tab')}>Đã trả lời </div>
                                    </div>{' '}
                                    <div className="shopee-tabs__ink-bar"></div>
                                </div>{' '}
                            </div>{' '}
                            <div className={cx('shopee-tabs__content')}>
                                <div className={cx('shopee-tabs-tabpane')}></div>
                                <div className={cx('shopee-tabs-tabpane')}></div>
                                <div className={cx('shopee-tabs-tabpane')}></div>
                            </div>
                        </div>{' '}
                        <div className={cx('reply-tooltip')}>
                            <div className={cx('reply-tooltip-content')}>
                                Nhấn vào để xem nội dung trả lời đánh giá.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SellerShopReviews;
