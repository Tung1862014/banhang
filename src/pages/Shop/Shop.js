import { faBars, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Shop.module.scss';

const cx = classNames.bind(styles);

const Shop = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('shop-page__info')}>
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
                        <div className={cx('section-seller-overview__item-section-seller-overview__item--clickable')}>
                            <div className={cx('section-seller-overview__item-icon-wrapper')}>
                                <svg
                                    enableBackground="new 0 0 15 15"
                                    viewBox="0 0 15 15"
                                    x="0"
                                    y="0"
                                    className={cx('shop-svg-icon')}
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
            {/* / */}
            <div className={cx('shop-page-menu')}>
                <div className={cx('navbar-with-more-menu-navbar-with-more-menu--narrow')}>
                    <div className={cx('containerwrapper-navbar-with-more-menu__wrapper--no-shadow')}>
                        <div className={cx('navbar-with-more-menu__items')}>
                            <a className={cx('navbar-with-more-menu__item')} href="/haisanmekong#product_list">
                                <span>TẤT CẢ SẢN PHẨM</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* / */}
            <div className={cx('shop-page__all-products-section')}>
                <div className={cx('_2W5K6w')}>
                    <div className={cx('_3e8zgq')}>
                        <FontAwesomeIcon className={cx('shop-svg-icon_3e8zgq')} icon={faBars} />
                        Danh Mục
                    </div>
                    <div>
                        <div className={cx('_3mieT7')}>
                            <svg viewBox="0 0 4 7" className={cx('shop-svg-icon_3mieT7')}>
                                <polygon points="4 3.5 0 0 0 7"></polygon>
                            </svg>
                            Sản Phẩm
                        </div>
                        <div className={cx('_3mieT7')}>
                            <svg viewBox="0 0 4 7" className={cx('shop-svg-icon_3mieT7')}>
                                <polygon points="4 3.5 0 0 0 7"></polygon>
                            </svg>
                            KHÔ GÀ NHÀ LÀM
                        </div>
                    </div>
                </div>
                {/* / */}
                <div className={cx('shop-page_product-list')}>
                    <div className={cx('shop-all-product-view')}>
                        <div className={cx('shop-sort-bar__label')}>
                            <span className={cx('shop-sort-bar__label-sort')}>Sắp xếp theo</span>
                            <div className={cx('shop-sort-by-options')}>
                                <div className={cx('shop-sort-by-options__option')}>Phổ biến</div>
                                <div className={cx('shop-sort-by-options__option')}>Mới nhất</div>
                                <div className={cx('shop-sort-by-options__option')}>Bán chạy</div>
                                <div>
                                    <div className={cx('select-with-status')}>
                                        <div
                                            className={cx('select-with-status__holder-select-with-status__box-shadow')}
                                        >
                                            <span className={cx('select-with-status__placeholder')}>Giá</span>
                                            <span>
                                                <svg viewBox="0 0 10 6" className={cx('shop-svg-icon-sort')}>
                                                    <path
                                                        d="M9.7503478 1.37413402L5.3649665 5.78112957c-.1947815.19574157-.511363.19651982-.7071046.00173827a.50153763.50153763 0 0 1-.0008702-.00086807L.2050664 1.33007451l.0007126-.00071253C.077901 1.18820749 0 1.0009341 0 .79546595 0 .35614224.3561422 0 .7954659 0c.2054682 0 .3927416.07790103.5338961.20577896l.0006632-.00066318.0226101.02261012a.80128317.80128317 0 0 1 .0105706.0105706l3.3619016 3.36190165c.1562097.15620972.4094757.15620972.5656855 0a.42598723.42598723 0 0 0 .0006944-.00069616L8.6678481.20650022l.0009529.0009482C8.8101657.07857935 8.9981733 0 9.2045341 0 9.6438578 0 10 .35614224 10 .79546595c0 .20495443-.077512.39180497-.2048207.53283641l.0003896.00038772-.0096728.00972053a.80044712.80044712 0 0 1-.0355483.03572341z"
                                                        fillRule="nonzero"
                                                    ></path>
                                                </svg>
                                            </span>
                                            <div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* / */}
                        <div className={cx('shop-search-result-view')}>
                            <div className={cx('row')}>
                                <div className={cx('shop-search-result-view__item-col-xs-2-4')}>
                                    <a data-sqe="link" href="/" className={cx('dd')}>
                                        <div className={cx('_3DGyGY')}>
                                            <div className={cx('_3ZU4Xu')}>
                                                <div className={cx('nHUlre_2CaWwM')}>
                                                    <img
                                                        width="invalid-value"
                                                        height="invalid-value"
                                                        alt="Khô cá dứa  cần giờ ngon đặc biệt thịt dai thơm ngon - hút chân không bảo quản lâu dùng chất lượng Mekong Foods"
                                                        className={cx('yFkmMY_1KQ1MG')}
                                                        src="https://cf.shopee.vn/file/1b9c60b8f2145a2307ca35c64959a4e6_tn"
                                                    />
                                                    <div className={cx('_3atTkb')}>
                                                        <div className={cx('CNco3q_2PoYxv_HpfQ6t')}>
                                                            <span className={cx('percent')}>43%</span>
                                                            <span className={cx('_338wTY')}>giảm</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={cx('_2477Dv')}>
                                                    <div className={cx('_1G5uNe')}>
                                                        <div className={cx('_2mQnW2')}>
                                                            <div className={cx('_3Gla5X_2j2K92_3j20V6')}>
                                                                Khô cá dứa cần giờ ngon đặc biệt thịt dai thơm ngon -
                                                                hút chân không bảo quản lâu dùng chất lượng Mekong Foods
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={cx('_3CsOH6')}>
                                                        <div className={cx('_3w3Slt_1NAEoM')}>
                                                            <span className={cx('_2whgI2')}>₫</span>
                                                            <span className={cx('_3TJGx5')}>77.000</span> -{' '}
                                                            <span className={cx('_2whgI2')}>₫</span>
                                                            <span className={cx('_3TJGx5')}>115.000</span>
                                                        </div>
                                                    </div>
                                                    <div className={cx('_3UeJ1q')}>
                                                        <div className={cx('_3VDfUA')}>
                                                            <div className={cx('shopee-rating-stars')}>
                                                                <div className={cx('shopee-rating-stars__stars')}>
                                                                    <div
                                                                        className={cx(
                                                                            'shopee-rating-stars__star-wrapper',
                                                                        )}
                                                                    >
                                                                        <FontAwesomeIcon
                                                                            // className={cx(
                                                                            //     evaluationStar === 5 ||
                                                                            //         evaluationStar === 4 ||
                                                                            //         evaluationStar === 3 ||
                                                                            //         evaluationStar === 2 ||
                                                                            //         evaluationStar === 1
                                                                            //         ? 'shopee-svg-icon'
                                                                            //         : '',
                                                                            // )}
                                                                            icon={faStar}
                                                                        />
                                                                    </div>
                                                                    <div
                                                                        className={cx(
                                                                            'shopee-rating-stars__star-wrapper',
                                                                        )}
                                                                    >
                                                                        <FontAwesomeIcon
                                                                            // className={cx(
                                                                            //     evaluationStar === 5 ||
                                                                            //         evaluationStar === 4 ||
                                                                            //         evaluationStar === 3 ||
                                                                            //         evaluationStar === 2 ||
                                                                            //         evaluationStar === 1
                                                                            //         ? 'shopee-svg-icon'
                                                                            //         : '',
                                                                            // )}
                                                                            icon={faStar}
                                                                        />
                                                                    </div>
                                                                    <div
                                                                        className={cx(
                                                                            'shopee-rating-stars__star-wrapper',
                                                                        )}
                                                                    >
                                                                        <FontAwesomeIcon
                                                                            // className={cx(
                                                                            //     evaluationStar === 5 ||
                                                                            //         evaluationStar === 4 ||
                                                                            //         evaluationStar === 3 ||
                                                                            //         evaluationStar === 2 ||
                                                                            //         evaluationStar === 1
                                                                            //         ? 'shopee-svg-icon'
                                                                            //         : '',
                                                                            // )}
                                                                            icon={faStar}
                                                                        />
                                                                    </div>
                                                                    <div
                                                                        className={cx(
                                                                            'shopee-rating-stars__star-wrapper',
                                                                        )}
                                                                    >
                                                                        <FontAwesomeIcon
                                                                            // className={cx(
                                                                            //     evaluationStar === 5 ||
                                                                            //         evaluationStar === 4 ||
                                                                            //         evaluationStar === 3 ||
                                                                            //         evaluationStar === 2 ||
                                                                            //         evaluationStar === 1
                                                                            //         ? 'shopee-svg-icon'
                                                                            //         : '',
                                                                            // )}
                                                                            icon={faStar}
                                                                        />
                                                                    </div>
                                                                    <div
                                                                        className={cx(
                                                                            'shopee-rating-stars__star-wrapper',
                                                                        )}
                                                                    >
                                                                        <FontAwesomeIcon
                                                                            // className={cx(
                                                                            //     evaluationStar === 5 ||
                                                                            //         evaluationStar === 4 ||
                                                                            //         evaluationStar === 3 ||
                                                                            //         evaluationStar === 2 ||
                                                                            //         evaluationStar === 1
                                                                            //         ? 'shopee-svg-icon'
                                                                            //         : '',
                                                                            // )}
                                                                            icon={faStar}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={cx('_2Tc7Qg _2R-Crv')}>Đã bán 93</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
