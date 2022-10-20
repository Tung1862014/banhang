import { faBars, faStar, faStore } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
//import { Link } from 'react-router-dom';
import styles from './Shop.module.scss';
import ShopPage from './ShopPage';

const cx = classNames.bind(styles);

const Shop = () => {
    // const pathId = window.location.pathname.toString();
    // const resultIdlocal = pathId.slice(11);
    const [shopValue, setShopValue] = useState('');
    const [numProduct, setNumProduct] = useState('');
    const [evaluate, setEvaluate] = useState('');
    const [categoryValue, setCategoryValue] = useState('');

    //

    const [priceSortValue, setPriceSortValue] = useState('gia');
    const [sortValue, setSortValue] = useState('all');
    const [chooseCategory, setChooseCategory] = useState('all');
    const [productValue, setProductValue] = useState('');

    //
    const [checkCategory, setCheckCategory] = useState(false);

    //console.log(shopValue, numProduct, evaluate, categoryValue);
    console.log(chooseCategory);

    useEffect(() => {
        const pathId = window.location.pathname.toString();
        const resultId = pathId.slice(11);

        axios
            .get(`${process.env.REACT_APP_URL_NODEJS}/productshop/shop/show?NB_id=${resultId}`)
            .then((res) => {
                console.log(res.data);
                setShopValue(res.data.results);
                setNumProduct(res.data.numproduct.numproduct);
                setEvaluate(res.data.evaluate.evaluate);
                setCategoryValue(res.data.category);
            })
            .catch((err) => {
                console.error('loi');
            });
    }, []);

    useEffect(() => {
        const pathId = window.location.pathname.toString();
        const resultId = pathId.slice(11);
        console.log(resultId);
        if (chooseCategory !== '') {
            axios
                .get(
                    `${process.env.REACT_APP_URL_NODEJS}/productshop/shop/product/show/all?NB_id=${resultId}&DM_id=${chooseCategory}&sort=${sortValue}&price=${priceSortValue}`,
                )
                .then((res) => {
                    console.log('setProductValue', res.data);
                    setProductValue(res.data.results);
                })
                .catch((err) => {
                    console.error('loi');
                });
        }
    }, [chooseCategory, sortValue, priceSortValue]);

    function takeDate(date) {
        const dateValue = new Date(date);
        let day = dateValue.getDate();
        let month = dateValue.getMonth() + 1;
        let year = dateValue.getFullYear();

        if (month < 10 && day >= 10) {
            return day + '-0' + month + '-' + year;
        } else if (month < 10 && day < 10) {
            return '0' + day + '-0' + month + '-' + year;
        } else if (month >= 10 && day < 10) {
            return '0' + day + '-' + month + '-' + year;
        } else if (month >= 10 && day >= 10) {
            return day + '-' + month + '-' + year;
        } else {
            return day + '-' + month + '-' + year;
        }
    }

    const handleMouseOverPrice = () => {
        const price = document.getElementById('select-with-status__dropdown-shop-modal__transition-enter-done');

        price.style.display = 'flex';
    };

    const handleMouseOutPrice = () => {
        const price = document.getElementById('select-with-status__dropdown-shop-modal__transition-enter-done');

        price.style.display = 'none';
    };

    const handleMouseOverTall = () => {
        const tallprice = document.getElementById(
            'select-with-status__dropdown-item-select-with-status__dropdown-item--with-tick-tall',
        );

        tallprice.style.color = '#ee4d2d';
        tallprice.addEventListener('click', function () {
            const price = document.getElementById('select-with-status__placeholder');

            price.innerHTML = 'Giá: Thấp đến Cao';
            price.style.color = '#ee4d2d';
            setPriceSortValue('lowtohigh');
        });
    };

    const handleMouseOutTall = () => {
        const tallprice = document.getElementById(
            'select-with-status__dropdown-item-select-with-status__dropdown-item--with-tick-tall',
        );
        tallprice.style.color = '#222';
    };

    const handleMouseOverShort = () => {
        const shortprice = document.getElementById(
            'select-with-status__dropdown-item-select-with-status__dropdown-item--with-tick-short',
        );
        shortprice.style.color = '#ee4d2d';

        shortprice.addEventListener('click', function () {
            const price = document.getElementById('select-with-status__placeholder');

            price.innerHTML = 'Giá: Cao đến Thấp';
            price.style.color = '#ee4d2d';
            setPriceSortValue('hightolow');
        });
    };

    const handleMouseOutShort = () => {
        const shortprice = document.getElementById(
            'select-with-status__dropdown-item-select-with-status__dropdown-item--with-tick-short',
        );
        shortprice.style.color = '#222';
    };

    const handleSelling = () => {
        const selling = document.getElementById('shop-sort-by-options__option1');
        const newproduct = document.getElementById('shop-sort-by-options__option2');

        selling.style.color = '#fff';
        selling.style.backgroundColor = '#ee4d2d';
        newproduct.style.color = 'black';
        newproduct.style.backgroundColor = '#fff';
        setSortValue('selling');
    };

    const handleNewProduct = () => {
        const selling = document.getElementById('shop-sort-by-options__option1');
        const newproduct = document.getElementById('shop-sort-by-options__option2');

        selling.style.color = 'black';
        selling.style.backgroundColor = '#fff';
        newproduct.style.color = '#fff';
        newproduct.style.backgroundColor = '#ee4d2d';

        setSortValue('promotion');
    };

    const handleCategory = (index, DM) => {
        const category = document.getElementById(`shop-svg-icon_3mieT7${index}`);
        const title = document.getElementById(`_3mieT7${index}`);
        const selling = document.getElementById('shop-sort-by-options__option1');
        const newproduct = document.getElementById('shop-sort-by-options__option2');
        const price = document.getElementById('select-with-status__placeholder');

        console.log(index);
        category.style.display = 'inline-block';
        title.style.color = '#ee4d2d';
        selling.style.color = 'black';
        selling.style.backgroundColor = '#fff';
        newproduct.style.color = 'black';
        newproduct.style.backgroundColor = '#fff';
        price.innerHTML = 'Giá';
        price.style.color = 'black';
        setPriceSortValue('gia');
        setSortValue('all');
        setChooseCategory(DM);
        for (let i = 0; i < categoryValue.length; i++) {
            if (index !== 't') {
                const categoryIdProduct = document.getElementById(`shop-svg-icon_3mieT7t`);
                const titleId = document.getElementById(`_3mieT7t`);
                categoryIdProduct.style.display = 'none';
                titleId.style.color = 'black';
            }
            if (i !== index) {
                const categoryId = document.getElementById(`shop-svg-icon_3mieT7${i}`);
                const titleId = document.getElementById(`_3mieT7${i}`);
                categoryId.style.display = 'none';
                titleId.style.color = 'black';
            }
        }
    };

    //xu ly
    const handleClickCategory = () => {
        const clickCategory = document.getElementById('_2W5K6wsm-s');

        if (checkCategory === false) {
            clickCategory.style.display = 'none';
            setCheckCategory(true);
        } else {
            clickCategory.style.display = 'block';
            setCheckCategory(false);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('shop-page__info')}>
                <div className={cx('section-seller-overview-horizontal-container')}>
                    <div className={cx('section-seller-overview-horizontal__leading')}>
                        <div className={cx('section-seller-overview-horizontal__leading-background')}>
                            <img
                                src={
                                    shopValue !== ''
                                        ? shopValue.MTS_image
                                        : process.env.REACT_APP_URL_NODEJS_IMAGE + '/default-ui-image.webp'
                                }
                                alt=""
                            />
                        </div>
                        <div className={cx('section-seller-overview-horizontal__leading-background-mask')}></div>
                        <div className={cx('section-seller-overview-horizontal__leading-content')}>
                            <div className={cx('section-seller-overview-horizontal__seller-portrait_3_slsd')}>
                                <div className={cx('section-seller-overview-horizontal__seller-portrait-link')}>
                                    <div className={cx('shop-avatar_1a-fH5')}>
                                        <img
                                            className={cx('shop-avatar__img')}
                                            src={
                                                shopValue !== ''
                                                    ? shopValue.MTS_logo
                                                    : process.env.REACT_APP_URL_NODEJS_IMAGE + '/default-ui-image.webp'
                                            }
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div className={cx('section-seller-overview-horizontal__portrait-info')}>
                                    <h1 className={cx('section-seller-overview-horizontal__portrait-name')}>
                                        {shopValue !== '' ? shopValue.MTS_ten : 'Tên Shop'}
                                    </h1>
                                    <div className={cx('section-seller-overview-horizontal__portrait-status')}>
                                        <div className={cx('section-seller-overview-horizontal__active-time')}>
                                            Tham gia: {shopValue !== '' ? takeDate(shopValue.ND_ngay) : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('section-seller-overview-horizontal__seller-info-list')}>
                        <div className={cx('section-seller-overview__item section-seller-overview__item--clickable')}>
                            <div className={cx('section-seller-overview__item-icon-wrapper')}>
                                {/* <svg
                                    enableBackground="new 0 0 15 15"
                                    viewBox="0 0 15 15"
                                    x="0"
                                    y="0"
                                    strokeWidth="0"
                                    className={cx('shop-svg-icon')}
                                >
                                    <path d="m13 1.9c-.2-.5-.8-1-1.4-1h-8.4c-.6.1-1.2.5-1.4 1l-1.4 4.3c0 .8.3 1.6.9 2.1v4.8c0 .6.5 1 1.1 1h10.2c.6 0 1.1-.5 1.1-1v-4.6c.6-.4.9-1.2.9-2.3zm-11.4 3.4 1-3c .1-.2.4-.4.6-.4h8.3c.3 0 .5.2.6.4l1 3zm .6 3.5h.4c.7 0 1.4-.3 1.8-.8.4.5.9.8 1.5.8.7 0 1.3-.5 1.5-.8.2.3.8.8 1.5.8.6 0 1.1-.3 1.5-.8.4.5 1.1.8 1.7.8h.4v3.9c0 .1 0 .2-.1.3s-.2.1-.3.1h-9.5c-.1 0-.2 0-.3-.1s-.1-.2-.1-.3zm8.8-1.7h-1v .1s0 .3-.2.6c-.2.1-.5.2-.9.2-.3 0-.6-.1-.8-.3-.2-.3-.2-.6-.2-.6v-.1h-1v .1s0 .3-.2.5c-.2.3-.5.4-.8.4-1 0-1-.8-1-.8h-1c0 .8-.7.8-1.3.8s-1.1-1-1.2-1.7h12.1c0 .2-.1.9-.5 1.4-.2.2-.5.3-.8.3-1.2 0-1.2-.8-1.2-.9z"></path>
                                </svg> */}
                                <FontAwesomeIcon className={cx('shop-svg-icon')} icon={faStore} />
                            </div>
                            <div className={cx('section-seller-overview__item-text')}>
                                <div className={cx('section-seller-overview__item-text-name')}>Sản phẩm:&nbsp;</div>
                                <div className={cx('section-seller-overview__item-text-value')}>
                                    {numProduct !== '' ? numProduct : 0}
                                </div>
                            </div>
                        </div>
                        <div className={cx('section-seller-overview__item-section-seller-overview__item--clickable')}>
                            <div className={cx('section-seller-overview__item-icon-wrapper')}>
                                {/* <svg
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
                                </svg> */}
                                <FontAwesomeIcon className={cx('shop-svg-icon')} icon={faStar} />
                            </div>
                            <div className={cx('section-seller-overview__item-text')}>
                                <div className={cx('section-seller-overview__item-text-name')}>đánh giá:&nbsp;</div>
                                <div className={cx('section-seller-overview__item-text-value')}>
                                    {evaluate !== '' ? evaluate : 0} đánh giá
                                </div>
                            </div>
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
                <div className={cx('_2W5K6wsm')}>
                    <FontAwesomeIcon
                        className={cx('shop-svg-icon_3e8zgq')}
                        icon={faBars}
                        onClick={() => handleClickCategory()}
                    />

                    <div id="_2W5K6wsm-s" className={cx('_2W5K6wsm-s')}>
                        <div className={cx('_3e8zgq')}>Danh Mục</div>
                        <div>
                            <div id="_3mieT7t" className={cx('_3mieT7t')} onClick={() => handleCategory('t', 'all')}>
                                <svg
                                    viewBox="0 0 4 7"
                                    id="shop-svg-icon_3mieT7t"
                                    className={cx('shop-svg-icon_3mieT7t')}
                                >
                                    <polygon points="4 3.5 0 0 0 7"></polygon>
                                </svg>
                                Sản Phẩm
                            </div>
                            {categoryValue !== ''
                                ? categoryValue.map((category, index) => (
                                      <div
                                          key={index}
                                          id={`_3mieT7${index}`}
                                          className={cx(`_3mieT7${index}`)}
                                          onClick={() => handleCategory(index, category.DM_id)}
                                      >
                                          <svg
                                              viewBox="0 0 4 7"
                                              id={`shop-svg-icon_3mieT7${index}`}
                                              className={cx(`shop-svg-icon_3mieT7${index}`)}
                                          >
                                              <polygon points="4 3.5 0 0 0 7"></polygon>
                                          </svg>
                                          {category.DM_danhmuc}
                                      </div>
                                  ))
                                : ''}
                        </div>
                    </div>
                </div>
                <div className={cx('_2W5K6w')}>
                    <div className={cx('_3e8zgq')}>
                        <FontAwesomeIcon className={cx('shop-svg-icon_3e8zgq')} icon={faBars} />
                        Danh Mục
                    </div>
                    <div>
                        <div id="_3mieT7t" className={cx('_3mieT7t')} onClick={() => handleCategory('t', 'all')}>
                            <svg viewBox="0 0 4 7" id="shop-svg-icon_3mieT7t" className={cx('shop-svg-icon_3mieT7t')}>
                                <polygon points="4 3.5 0 0 0 7"></polygon>
                            </svg>
                            Sản Phẩm
                        </div>
                        {categoryValue !== ''
                            ? categoryValue.map((category, index) => (
                                  <div
                                      key={index}
                                      id={`_3mieT7${index}`}
                                      className={cx(`_3mieT7${index}`)}
                                      onClick={() => handleCategory(index, category.DM_id)}
                                  >
                                      <svg
                                          viewBox="0 0 4 7"
                                          id={`shop-svg-icon_3mieT7${index}`}
                                          className={cx(`shop-svg-icon_3mieT7${index}`)}
                                      >
                                          <polygon points="4 3.5 0 0 0 7"></polygon>
                                      </svg>
                                      {category.DM_danhmuc}
                                  </div>
                              ))
                            : ''}
                    </div>
                </div>
                {/* / */}
                <div className={cx('shop-page_product-list')}>
                    <div className={cx('shop-all-product-view')}>
                        <div className={cx('shop-sort-bar__label')}>
                            <span className={cx('shop-sort-bar__label-sort')}>Sắp xếp theo</span>
                            <div className={cx('shop-sort-by-options')}>
                                <div
                                    id="shop-sort-by-options__option1"
                                    className={cx('shop-sort-by-options__option1')}
                                    onClick={handleSelling}
                                >
                                    Bán chạy
                                </div>
                                <div
                                    id="shop-sort-by-options__option2"
                                    className={cx('shop-sort-by-options__option2')}
                                    onClick={handleNewProduct}
                                >
                                    Khuyến mãi
                                </div>
                                <div>
                                    <div className={cx('select-with-status')}>
                                        <div
                                            className={cx('select-with-status__holder-select-with-status__box-shadow')}
                                            onMouseOver={handleMouseOverPrice}
                                            onMouseOut={handleMouseOutPrice}
                                        >
                                            <span
                                                id="select-with-status__placeholder"
                                                className={cx('select-with-status__placeholder')}
                                            >
                                                Giá
                                            </span>
                                            <span>
                                                <svg viewBox="0 0 10 6" className={cx('shop-svg-icon-sort')}>
                                                    <path
                                                        d="M9.7503478 1.37413402L5.3649665 5.78112957c-.1947815.19574157-.511363.19651982-.7071046.00173827a.50153763.50153763 0 0 1-.0008702-.00086807L.2050664 1.33007451l.0007126-.00071253C.077901 1.18820749 0 1.0009341 0 .79546595 0 .35614224.3561422 0 .7954659 0c.2054682 0 .3927416.07790103.5338961.20577896l.0006632-.00066318.0226101.02261012a.80128317.80128317 0 0 1 .0105706.0105706l3.3619016 3.36190165c.1562097.15620972.4094757.15620972.5656855 0a.42598723.42598723 0 0 0 .0006944-.00069616L8.6678481.20650022l.0009529.0009482C8.8101657.07857935 8.9981733 0 9.2045341 0 9.6438578 0 10 .35614224 10 .79546595c0 .20495443-.077512.39180497-.2048207.53283641l.0003896.00038772-.0096728.00972053a.80044712.80044712 0 0 1-.0355483.03572341z"
                                                        fillRule="nonzero"
                                                    ></path>
                                                </svg>
                                            </span>
                                            <div>
                                                <div
                                                    id="select-with-status__dropdown-shop-modal__transition-enter-done"
                                                    className={cx(
                                                        'select-with-status__dropdown-shop-modal__transition-enter-done',
                                                    )}
                                                >
                                                    <div
                                                        id="select-with-status__dropdown-item-select-with-status__dropdown-item--with-tick-tall"
                                                        className={cx(
                                                            'select-with-status__dropdown-item-select-with-status__dropdown-item--with-tick-tall',
                                                        )}
                                                        onMouseOver={handleMouseOverTall}
                                                        onMouseOut={handleMouseOutTall}
                                                    >
                                                        Giá: Thấp đến Cao
                                                    </div>
                                                    <div
                                                        id="select-with-status__dropdown-item-select-with-status__dropdown-item--with-tick-short"
                                                        className={cx(
                                                            'select-with-status__dropdown-item-select-with-status__dropdown-item--with-tick-short',
                                                        )}
                                                        onMouseOver={handleMouseOverShort}
                                                        onMouseOut={handleMouseOutShort}
                                                    >
                                                        Giá: Cao đến Thấp
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* / */}
                        <div className={cx('shop-search-result-view')}>
                            <ShopPage data={productValue} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
