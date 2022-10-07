import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Search.module.scss';
import SearchPage from './SearchPage';

const cx = classNames.bind(styles);

function Search() {
    const [productValue, setProductValue] = useState('');
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');

    const pathId = window.location.pathname;
    const resultId = decodeURIComponent(pathId.slice(16));
    // console.log('resultId', pathId.slice(0, 16));
    const searchValueReducer = useSelector((state) => state.searchProduct.list);
    console.log('searchValueReducer', searchValueReducer);
    function TakeKeyWord() {
        const pathId = window.location.pathname;
        const resultId = pathId.slice(16);
        //console.log(pathId, decodeURIComponent(resultId));
        return decodeURIComponent(resultId);
    }

    useEffect(() => {
        // console.log(resultId);
        axios
            .get(
                `${process.env.REACT_APP_URL_NODEJS}/search/product/show/all?keyword=${resultId}&pricefrom=${priceFrom}&priceto=${priceTo}`,
            )
            .then((res) => {
                console.log('dât', res.data);
                setProductValue(res.data.results);
            })
            .catch((err) => {
                console.error('loi');
            });
    }, [priceFrom, priceTo, resultId, searchValueReducer]);

    const handlePrice = () => {
        const price_from = document.getElementById('shop-price-range-filter__input-from');
        const price_to = document.getElementById('shop-price-range-filter__input-to');
        const price_err = document.getElementById('shop-price-range-filter__error');

        console.log(Number(price_from.value));
        console.log(Number(price_to.value));
        if (Number(price_from.value) > Number(price_to.value) && Number(price_to.value) !== 0) {
            price_err.style.display = 'flex';
        } else if (Number(price_from.value) === 0 && Number(price_to.value) === 0) {
            price_err.style.display = 'flex';
        } else {
            price_err.style.display = 'none';
            setPriceFrom(Number(price_from.value));
            setPriceTo(Number(price_to.value));
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('ZgwlcK')}>
                <div className={cx('shop-search-item-result')}>
                    <h1 className={cx('shop-search-result-header')}>
                        <FontAwesomeIcon className={cx('icon-light-bulb')} icon={faLightbulb} />
                        <div className={cx('shop-search-result-header__text')}>
                            Kết quả tìm kiếm cho từ khoá `
                            <span
                                className={cx('shop-search-result-header__text-highlight')}
                                style={{ color: 'rgb(238, 77, 45)', fontWeight: '400' }}
                            >
                                {TakeKeyWord()}
                            </span>
                            `
                        </div>
                    </h1>
                    <div className={cx('shop-sort-bar')}>
                        <span className={cx('shop-sort-bar__label')}>LỌC THEO GIÁ</span>
                        <div className={cx('shop-sort-by-options')}>
                            <div className={cx('shop-price-range-filter__edit')}>
                                <div className={cx('shop-price-range-filter__inputs')}>
                                    <input
                                        type="text"
                                        maxLength="13"
                                        id="shop-price-range-filter__input-from"
                                        className={cx('shop-price-range-filter__input')}
                                        placeholder="₫ TỪ"
                                        defaultValue=""
                                    />
                                    <div className={cx('shop-price-range-filter__range-line')}></div>
                                    <input
                                        type="text"
                                        maxLength="13"
                                        id="shop-price-range-filter__input-to"
                                        className={cx('shop-price-range-filter__input')}
                                        placeholder="₫ ĐẾN"
                                        defaultValue=""
                                    />
                                    <button
                                        className={cx('shop-button-solid--primary_kcCIDE')}
                                        style={{ backgroundColor: 'rgb(238, 77, 45)' }}
                                        onClick={handlePrice}
                                    >
                                        Áp dụng
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div id="shop-price-range-filter__error" className={cx('shop-price-range-filter__error')}>
                            Vui lòng điền khoảng giá phù hợp!
                        </div>
                    </div>
                    {productValue !== '' && productValue[0] !== undefined ? (
                        <SearchPage data={productValue} />
                    ) : (
                        <div className={cx('shop-search-empty-result-section__hint')}>
                            Không có sản phẩm nào. Bạn thử diều chỉnh lại mức giá cho phù hợp và tìm lại nhé?
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Search;
