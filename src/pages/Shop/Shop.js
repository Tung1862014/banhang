import classNames from 'classnames/bind';
import styles from './Shop.module.scss';

const cx = classNames.bind(styles);

const Shop = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('section-seller-overview-horizontal-container')}>
                <div className={cx('section-seller-overview-horizontal__leading')}>
                    <div className={cx('section-seller-overview-horizontal__leading-background')}>
                        <img src={'https://cf.shopee.vn/file/4c5dddef57e11647150a0e7549e9d44f_tn'} alt="" />
                    </div>
                    <div className={cx('section-seller-overview-horizontal__leading-background-mask')}></div>
                    <div className={cx('section-seller-overview-horizontal__leading-content')}>
                        <div className={cx('section-seller-overview-horizontal__seller-portrait_3_slsd')}>
                            <div className={cx('section-seller-overview-horizontal__seller-portrait-link')}>
                                <div className={cx('shop-avatar_1a-fH5')}>
                                    <img
                                        className={cx('shop-avatar__img')}
                                        src="https://cf.shopee.vn/file/aa873a4c115057d53fb2c3ad9f56cdfb_tn"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className={cx('section-seller-overview-horizontal__portrait-info')}>
                                <h1 className={cx('section-seller-overview-horizontal__portrait-name')}>
                                    haisanmekong
                                </h1>
                                <div className={cx('section-seller-overview-horizontal__portrait-status')}>
                                    <div className={cx('section-seller-overview-horizontal__active-time')}>
                                        Online 40 phút trước
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('section-seller-overview-horizontal__seller-info-list')}>
                    <div className={cx('section-seller-overview__item section-seller-overview__item--clickable')}>
                        <div className={cx('section-seller-overview__item-icon-wrapper')}>
                            <svg
                                enableBackground="new 0 0 15 15"
                                viewBox="0 0 15 15"
                                x="0"
                                y="0"
                                strokeWidth="0"
                                className={cx('shop-svg-icon')}
                            >
                                <path d="m13 1.9c-.2-.5-.8-1-1.4-1h-8.4c-.6.1-1.2.5-1.4 1l-1.4 4.3c0 .8.3 1.6.9 2.1v4.8c0 .6.5 1 1.1 1h10.2c.6 0 1.1-.5 1.1-1v-4.6c.6-.4.9-1.2.9-2.3zm-11.4 3.4 1-3c .1-.2.4-.4.6-.4h8.3c.3 0 .5.2.6.4l1 3zm .6 3.5h.4c.7 0 1.4-.3 1.8-.8.4.5.9.8 1.5.8.7 0 1.3-.5 1.5-.8.2.3.8.8 1.5.8.6 0 1.1-.3 1.5-.8.4.5 1.1.8 1.7.8h.4v3.9c0 .1 0 .2-.1.3s-.2.1-.3.1h-9.5c-.1 0-.2 0-.3-.1s-.1-.2-.1-.3zm8.8-1.7h-1v .1s0 .3-.2.6c-.2.1-.5.2-.9.2-.3 0-.6-.1-.8-.3-.2-.3-.2-.6-.2-.6v-.1h-1v .1s0 .3-.2.5c-.2.3-.5.4-.8.4-1 0-1-.8-1-.8h-1c0 .8-.7.8-1.3.8s-1.1-1-1.2-1.7h12.1c0 .2-.1.9-.5 1.4-.2.2-.5.3-.8.3-1.2 0-1.2-.8-1.2-.9z"></path>
                            </svg>
                        </div>
                        <div className={cx('section-seller-overview__item-text')}>
                            <div className={cx('section-seller-overview__item-text-name')}>Sản phẩm:&nbsp;</div>
                            <div className={cx('section-seller-overview__item-text-value')}>198</div>
                        </div>
                        {/* <div
                            className={cx(
                                'section-seller-overview__item-text section-seller-overview__item-text--no-product',
                            )}
                        >
                            <div className={cx('section-seller-overview__item-text-value')}>198</div>
                            <div className={cx('section-seller-overview__item-text-name')}>Sản phẩm</div>
                        </div> */}
                    </div>
                    <div className={cx('section-seller-overview__item section-seller-overview__item--clickable')}>
                        <div className={cx('section-seller-overview__item-icon-wrapper')}>
                            <svg
                                enableBackground="new 0 0 15 15"
                                viewBox="0 0 15 15"
                                x="0"
                                y="0"
                                className={cx('shopee-svg-icon icon-rating')}
                            >
                                <polygon
                                    fill="none"
                                    points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit="10"
                                ></polygon>
                            </svg>
                        </div>
                        <div className={cx('section-seller-overview__item-text')}>
                            <div className={cx('section-seller-overview__item-text-name')}>đánh giá:&nbsp;</div>
                            <div className={cx('section-seller-overview__item-text-value')}>4.8 (380 đánh giá)</div>
                        </div>
                        {/* <div
                            className={cx(
                                'section-seller-overview__item-text section-seller-overview__item-text--no-product',
                            )}
                        >
                            <div className={cx('section-seller-overview__item-text-value')}>4.8 (380 đánh giá)</div>
                            <div className={cx('section-seller-overview__item-text-name')}>đánh giá</div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
