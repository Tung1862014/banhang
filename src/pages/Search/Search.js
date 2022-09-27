import { faLightbulb, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    function TakeKeyWord() {
        const pathId = window.location.pathname.toString();
        const resultId = pathId.slice(11);
        console.log(resultId);
        return resultId.replace(/%20/g, '');
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('ZgwlcK')}>
                <div className={cx('shop-search-item-result')}>
                    <h1 className={cx('shop-search-result-header')}>
                        <FontAwesomeIcon className={cx('icon-light-bulb')} icon={faLightbulb} />
                        <div className={cx('shop-search-result-header__text')}>
                            Kết quả tìm kiếm cho từ khoá
                            <span
                                className={cx('shop-search-result-header__text-highlight')}
                                style={{ color: 'rgb(238, 77, 45)', fontWeight: '400' }}
                            >
                                '{TakeKeyWord()}'
                            </span>
                        </div>
                    </h1>
                    <div className={cx('shop-sort-bar')}>
                        <span className={cx('shop-sort-bar__label')}>Sắp xếp theo</span>
                        <div className={cx('shop-sort-by-options')}>
                            <div className={cx('shop-price-range-filter__edit')}>
                                <div className={cx('shop-price-range-filter__inputs')}>
                                    <input
                                        type="text"
                                        maxLength="13"
                                        className={cx('shop-price-range-filter__input')}
                                        placeholder="₫ TỪ"
                                        defaultValue=""
                                    />
                                    <div className={cx('shop-price-range-filter__range-line')}>_</div>
                                    <input
                                        type="text"
                                        maxLength="13"
                                        className={cx('shop-price-range-filter__input')}
                                        placeholder="₫ ĐẾN"
                                        defaultValue=""
                                    />
                                    <button
                                        className={cx('shop-button-solid--primary_kcCIDE')}
                                        style={{ backgroundColor: 'rgb(238, 77, 45)' }}
                                    >
                                        Áp dụng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={cx('row')}>
                        <div className={cx('shop-search-result-view__item-col-xs-2-4')}>
                            <a data-sqe="link" href={`/detail/product/nameid`} className={cx('dd')}>
                                <div className={cx('_3DGyGY')}>
                                    <div className={cx('_3ZU4Xu')}>
                                        <div className={cx('nHUlre_2CaWwM')}>
                                            <img
                                                width="invalid-value"
                                                height="invalid-value"
                                                alt="Khô cá dứa  cần giờ ngon đặc biệt thịt dai thơm ngon - hút chân không bảo quản lâu dùng chất lượng Mekong Foods"
                                                className={cx('yFkmMY_1KQ1MG')}
                                                src={'https://cf.shopee.vn/file/6b79524dfe26bc47548a15c20b8409bd_tn'}
                                            />

                                            <div className={cx('_3atTkb')}>
                                                <div className={cx('CNco3q_2PoYxv_HpfQ6t')}>
                                                    <span className={cx('percent')}>10%</span>
                                                    <span className={cx('_338wTY')}>giảm</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('_2477Dv')}>
                                            <div className={cx('_1G5uNe')}>
                                                <div className={cx('_2mQnW2')}>
                                                    <div className={cx('_3Gla5X_2j2K92_3j20V6')}>
                                                        Khô Cá Lóc Loại Đặc Biệt Thơm Ngon Phơi Nắng Tự Nhiên Mebaoshop
                                                        Cá Khô Đồng Tháp
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('_3CsOH6')}>
                                                <div className={cx('_3w3Slt_1NAEoM')}>
                                                    <span className={cx('_2whgI2')}>₫115.000</span>

                                                    <span className={cx('_3TJGx5')}>₫115.000</span>
                                                </div>
                                            </div>
                                            <div className={cx('_3UeJ1q')}>
                                                <div className={cx('_3VDfUA')}>
                                                    <div className={cx('shop-rating-stars')}>
                                                        <div className={cx('shop-rating-stars__stars')}>
                                                            <div className={cx('shop-rating-stars__star-wrapper')}>
                                                                <FontAwesomeIcon
                                                                    className={cx('shop-rating-stars__gold-star')}
                                                                    //   className={cx(
                                                                    //       prod.star === 5 ||
                                                                    //           prod.star === 4 ||
                                                                    //           prod.star === 3 ||
                                                                    //           prod.star === 2 ||
                                                                    //           prod.star === 1
                                                                    //           ? 'shop-rating-stars__gold-star'
                                                                    //           : '',
                                                                    //   )}
                                                                    icon={faStar}
                                                                />
                                                            </div>
                                                            <div className={cx('shop-rating-stars__star-wrapper')}>
                                                                <FontAwesomeIcon
                                                                    className={cx('shop-rating-stars__gold-star')}
                                                                    //   className={cx(
                                                                    //       prod.star === 5 ||
                                                                    //           prod.star === 4 ||
                                                                    //           prod.star === 3 ||
                                                                    //           prod.star === 2
                                                                    //           ? 'shop-rating-stars__gold-star'
                                                                    //           : '',
                                                                    //   )}
                                                                    icon={faStar}
                                                                />
                                                            </div>
                                                            <div className={cx('shop-rating-stars__star-wrapper')}>
                                                                <FontAwesomeIcon
                                                                    className={cx('shop-rating-stars__gold-star')}
                                                                    //   className={cx(
                                                                    //       prod.star === 5 ||
                                                                    //           prod.star === 4 ||
                                                                    //           prod.star === 3
                                                                    //           ? 'shop-rating-stars__gold-star'
                                                                    //           : '',
                                                                    //   )}
                                                                    icon={faStar}
                                                                />
                                                            </div>
                                                            <div className={cx('shop-rating-stars__star-wrapper')}>
                                                                <FontAwesomeIcon
                                                                    className={cx('shop-rating-stars__gold-star')}
                                                                    //   className={cx(
                                                                    //       prod.star === 5 || prod.star === 4
                                                                    //           ? 'shop-rating-stars__gold-star'
                                                                    //           : '',
                                                                    //   )}
                                                                    icon={faStar}
                                                                />
                                                            </div>
                                                            <div className={cx('shop-rating-stars__star-wrapper')}>
                                                                <FontAwesomeIcon
                                                                    className={cx('shop-rating-stars__gold-star')}
                                                                    //   className={cx(
                                                                    //       prod.star === 5
                                                                    //           ? 'shop-rating-stars__gold-star'
                                                                    //           : '',
                                                                    //   )}
                                                                    icon={faStar}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={cx('_2Tc7Qg_2R-Crv')}>Đã bán 9</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className={cx('shop-search-result-view__item-col-xs-2-4')}>
                            <a data-sqe="link" href={`/detail/product/nameid`} className={cx('dd')}>
                                <div className={cx('_3DGyGY')}>
                                    <div className={cx('_3ZU4Xu')}>
                                        <div className={cx('nHUlre_2CaWwM')}>
                                            <img
                                                width="invalid-value"
                                                height="invalid-value"
                                                alt="Khô cá dứa  cần giờ ngon đặc biệt thịt dai thơm ngon - hút chân không bảo quản lâu dùng chất lượng Mekong Foods"
                                                className={cx('yFkmMY_1KQ1MG')}
                                                src={'https://cf.shopee.vn/file/6b79524dfe26bc47548a15c20b8409bd_tn'}
                                            />

                                            <div className={cx('_3atTkb')}>
                                                <div className={cx('CNco3q_2PoYxv_HpfQ6t')}>
                                                    <span className={cx('percent')}>10%</span>
                                                    <span className={cx('_338wTY')}>giảm</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('_2477Dv')}>
                                            <div className={cx('_1G5uNe')}>
                                                <div className={cx('_2mQnW2')}>
                                                    <div className={cx('_3Gla5X_2j2K92_3j20V6')}>
                                                        Khô Cá Lóc Loại Đặc Biệt Thơm Ngon Phơi Nắng Tự Nhiên Mebaoshop
                                                        Cá Khô Đồng Tháp
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('_3CsOH6')}>
                                                <div className={cx('_3w3Slt_1NAEoM')}>
                                                    <span className={cx('_2whgI2')}>₫115.000</span>

                                                    <span className={cx('_3TJGx5')}>₫115.000</span>
                                                </div>
                                            </div>
                                            <div className={cx('_3UeJ1q')}>
                                                <div className={cx('_3VDfUA')}>
                                                    <div className={cx('shop-rating-stars')}>
                                                        <div className={cx('shop-rating-stars__stars')}>
                                                            <div className={cx('shop-rating-stars__star-wrapper')}>
                                                                <FontAwesomeIcon
                                                                    className={cx('shop-rating-stars__gold-star')}
                                                                    //   className={cx(
                                                                    //       prod.star === 5 ||
                                                                    //           prod.star === 4 ||
                                                                    //           prod.star === 3 ||
                                                                    //           prod.star === 2 ||
                                                                    //           prod.star === 1
                                                                    //           ? 'shop-rating-stars__gold-star'
                                                                    //           : '',
                                                                    //   )}
                                                                    icon={faStar}
                                                                />
                                                            </div>
                                                            <div className={cx('shop-rating-stars__star-wrapper')}>
                                                                <FontAwesomeIcon
                                                                    className={cx('shop-rating-stars__gold-star')}
                                                                    //   className={cx(
                                                                    //       prod.star === 5 ||
                                                                    //           prod.star === 4 ||
                                                                    //           prod.star === 3 ||
                                                                    //           prod.star === 2
                                                                    //           ? 'shop-rating-stars__gold-star'
                                                                    //           : '',
                                                                    //   )}
                                                                    icon={faStar}
                                                                />
                                                            </div>
                                                            <div className={cx('shop-rating-stars__star-wrapper')}>
                                                                <FontAwesomeIcon
                                                                    className={cx('shop-rating-stars__gold-star')}
                                                                    //   className={cx(
                                                                    //       prod.star === 5 ||
                                                                    //           prod.star === 4 ||
                                                                    //           prod.star === 3
                                                                    //           ? 'shop-rating-stars__gold-star'
                                                                    //           : '',
                                                                    //   )}
                                                                    icon={faStar}
                                                                />
                                                            </div>
                                                            <div className={cx('shop-rating-stars__star-wrapper')}>
                                                                <FontAwesomeIcon
                                                                    className={cx('shop-rating-stars__gold-star')}
                                                                    //   className={cx(
                                                                    //       prod.star === 5 || prod.star === 4
                                                                    //           ? 'shop-rating-stars__gold-star'
                                                                    //           : '',
                                                                    //   )}
                                                                    icon={faStar}
                                                                />
                                                            </div>
                                                            <div className={cx('shop-rating-stars__star-wrapper')}>
                                                                <FontAwesomeIcon
                                                                    className={cx('shop-rating-stars__gold-star')}
                                                                    //   className={cx(
                                                                    //       prod.star === 5
                                                                    //           ? 'shop-rating-stars__gold-star'
                                                                    //           : '',
                                                                    //   )}
                                                                    icon={faStar}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={cx('_2Tc7Qg_2R-Crv')}>Đã bán 9</div>
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
    );
}

export default Search;
