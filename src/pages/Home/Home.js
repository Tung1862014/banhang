import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import axios from 'axios';
import GetCookie from '~/components/Hook/GetCookies';
import HomePage from './HomePage';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
//import GetCookie from '~/components/Hook/GetCookies';
//import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Home() {
    const [product, setProduct] = useState('');
    const [clickSuggestions, setClickSuggestions] = useState('');
    //console.log(product.length);
    const [orderValue, setOrderValue] = useState('');
    const [billId, setBillId] = useState('');
    const [advertiseValue, setAdvertiseValue] = useState('');
    const [checkPromotion, setCheckPromotion] = useState(false);
    const [visible, setVisible] = useState(6);

    // const siginList = useSelector((state) => state.numberProduct.list);
    // console.log('billId: ', billId);
    useEffect(() => {
        if (GetCookie('usrin') !== undefined) {
            axios
                .get(
                    `${process.env.REACT_APP_URL_NODEJS}/historybill/cart/show/all?ND_id=${
                        JSON.parse(GetCookie('usrin')).ND_id
                    }&DH_trangthai=all`,
                )
                .then((res) => {
                    console.log('data', res.data);
                    setOrderValue(res.data.results);
                })
                .catch((err) => {
                    console.log('loi');
                });
        }
    }, []);

    useEffect(() => {
        if (GetCookie('usrin') !== undefined) {
            let sellerArr = [];
            let billIdValue = [];

            for (let i = 0; i < orderValue.length; i++) {
                if (!sellerArr.includes(orderValue[i].NB_id)) {
                    sellerArr.push(orderValue[i].NB_id);
                    billIdValue.push(orderValue[i].DH_id);
                }
            }

            if (sellerArr.length > 0) {
                setBillId((prev) => {
                    const newSeller = [...prev, billIdValue];
                    return newSeller[0];
                });
            }
        }
    }, [orderValue]);
    //take status bill do update
    useEffect(() => {
        if (billId !== '' && GetCookie('usrin') !== undefined) {
            for (let i = 0; i < billId.length; i++) {
                console.log('id bill', billId[i]);
                axios
                    .get(
                        `https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/detail?order_code=${billId[i]}`,
                        {
                            headers: {
                                Token: '9c10964d-37ca-11ed-b608-8a2909007fb0',
                            },
                        },
                    )
                    .then((res) => {
                        console.log('data status', res.data.data.status);

                        if (res.data.data.status === 'picked') {
                            let status = '3';
                            console.log('id bill', billId[i]);
                            axios
                                .put(`${process.env.REACT_APP_URL_NODEJS}/historybill/update/auto/bill`, {
                                    NB_id: JSON.parse(GetCookie('seller')).ND_id,
                                    DH_id: billId[i],
                                    DH_trangthai: status,
                                })

                                .then((res) => {
                                    console.log(res.data);
                                })
                                .catch(() => {
                                    console.log('loi khong the show bill');
                                });
                        } else if (res.data.data.status === 'delivered') {
                            let status = '4';
                            console.log('id bill', billId[i]);
                            axios
                                .put(`${process.env.REACT_APP_URL_NODEJS}/historybill/update/auto/bill`, {
                                    NB_id: JSON.parse(GetCookie('seller')).ND_id,
                                    DH_id: billId[i],
                                    DH_trangthai: status,
                                })

                                .then((res) => {
                                    console.log(res.data);
                                })
                                .catch(() => {
                                    console.log('loi khong the show bill');
                                });
                        }
                    })
                    .catch((err) => {
                        console.log('loi status');
                    });
            }
        }
    }, [billId]);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_URL_NODEJS}/admin/show/advertise`)
            .then((res) => {
                console.log('Advertise', res.data.numbers);
                setAdvertiseValue(res.data.advertise);
            })
            .catch(() => {
                console.log('loi khong the show product');
            });
    }, []);

    // useEffect(() => {
    //     // let url;
    //     // if (clickSuggestions === 'suggestions' || clickSuggestions === '') {
    //     //     url = ;
    //     // } else if (clickSuggestions === 'promotion') {
    //     //     url = `${process.env.REACT_APP_URL_NODEJS}/product/show/promotion/all`;
    //     // }
    //     if (GetCookie('usrin') !== undefined) {
    //         axios
    //             .get(
    //                 `${process.env.REACT_APP_URL_NODEJS}/product/show/suggestions/user/all?ND_id=${
    //                     JSON.parse(GetCookie('usrin')).ND_id
    //                 }`,
    //             )
    //             .then((res) => {
    //                 console.log('suggestions user', res.data.results);
    //                 //setProduct(res.data.results);
    //             })
    //             .catch((err) => {
    //                 console.log('loi');
    //             });
    //     }
    // }, []);
    const centers = cx('center-sliders');
    var settings = {
        className: centers,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
    };

    useEffect(() => {
        let url;
        if (GetCookie('usrin') !== undefined && clickSuggestions === '') {
            url = `${process.env.REACT_APP_URL_NODEJS}/product/show/suggestions/user/all?ND_id=${
                JSON.parse(GetCookie('usrin')).ND_id
            }`;
        } else if (GetCookie('usrin') !== undefined && clickSuggestions === 'suggestions') {
            url = `${process.env.REACT_APP_URL_NODEJS}/product/show/suggestions/user/all?ND_id=${
                JSON.parse(GetCookie('usrin')).ND_id
            }`;
        } else if (clickSuggestions === 'suggestions' || clickSuggestions === '') {
            url = `${process.env.REACT_APP_URL_NODEJS}/product/show/suggestions/all`;
        } else if (clickSuggestions === 'promotion') {
            url = `${process.env.REACT_APP_URL_NODEJS}/product/show/promotion/all`;
        }
        axios
            .get(url)
            .then((res) => {
                console.log('results', res.data.results);
                if (res.data.results.length > 0) {
                    setProduct(res.data.results);
                } else {
                    axios
                        .get(`${process.env.REACT_APP_URL_NODEJS}/product/show/suggestions/all`)
                        .then((res) => {
                            console.log('results', res.data.results);

                            setProduct(res.data.results);
                        })
                        .catch((err) => {
                            console.log('loi');
                        });
                }
            })
            .catch((err) => {
                console.log('loi');
            });
    }, [clickSuggestions, checkPromotion]);

    function handleClickSuggestions() {
        const suggestions = document.getElementById('FA284N-N-5qHu-suggestions');
        const promotion = document.getElementById('FA284N-N-5qHu-promotion');

        suggestions.style.display = 'block';
        promotion.style.display = 'none';

        setClickSuggestions('suggestions');
        setCheckPromotion(false);
    }

    function handleClickPromotion() {
        const suggestions = document.getElementById('FA284N-N-5qHu-suggestions');
        const promotion = document.getElementById('FA284N-N-5qHu-promotion');

        suggestions.style.display = 'none';
        promotion.style.display = 'block';
        setClickSuggestions('promotion');
        setCheckPromotion(true);
    }

    function formatCash(str) {
        return str
            .toString()
            .split('')
            .reverse()
            .reduce((prev, next, index) => {
                return (index % 3 ? next : next + '.') + prev;
            });
    }

    function takeDateNow(date) {
        let dateValue;
        if (date !== 'true') {
            dateValue = new Date(date);
        } else {
            dateValue = new Date();
        }
        let day = dateValue.getDate();
        let month = dateValue.getMonth() + 1;
        let year = dateValue.getFullYear();

        if (month < 10 && day >= 10) {
            return year + '-0' + month + '-' + day;
        } else if (month < 10 && day < 10) {
            return year + '-0' + month + '-0' + day;
        } else if (month >= 10 && day < 10) {
            return year + '-' + month + '-0' + day;
        } else if (month >= 10 && day >= 10) {
            return year + '-' + month + '-' + day;
        } else {
            return year + '-' + month + '-' + day;
        }
    }

    function handleTestDate(promotion) {
        console.log('handleTestDate', promotion);
        if (promotion !== 0) {
            let date1 = new Date(takeDateNow('true'));
            let datefrom = new Date(takeDateNow(promotion.KM_tungay));
            let dateto = new Date(takeDateNow(promotion.KM_denngay));
            if (date1 >= datefrom && date1 <= dateto) {
                return true;
            } else {
                return false;
            }
            // console.log('date1', date1);
        }
    }

    const handleShowMoreItems = () => {
        setVisible((prev) => prev + 6);
        let items = visible + 6;
        handleShowButtonMoreItem(items);
    };

    const handleShowButtonMoreItem = (items) => {
        if (product.length <= items) {
            const showItem = document.getElementById('btn_btn-solid-primary');
            showItem.style.display = 'none';
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('image-carousel_DBnDYq')}>
                <div className={cx('image-carousel__item-list-wrapper')}>
                    <ul className={cx('image-carousel__item-lists')}>
                        <Slider {...settings}>
                            {advertiseValue !== '' &&
                                advertiseValue.map((advertise, index) => (
                                    <li key={index} className={cx('image-carousel__item')}>
                                        <div className={cx('product-recommend-items__item-wrapper')}>
                                            <Link
                                                to={`/introduce/advartise=${advertise.QB_id}`}
                                                className={cx('product-recommend-image')}
                                            >
                                                <img
                                                    className={cx('product-recommend-advertise-image')}
                                                    src={advertise.QB_image}
                                                    alt=""
                                                />
                                            </Link>
                                            <Link
                                                to={`/introduce/advartise=${advertise.QB_id}`}
                                                className={cx('advertise-title')}
                                            >
                                                {advertise.QB_tieude}
                                            </Link>
                                        </div>
                                    </li>
                                ))}
                        </Slider>
                    </ul>
                </div>
            </div>
            <div className={cx('stardust-tabs-header-wrapper')}>
                <ul className={cx('stardust-tabs-header')}>
                    <li className={cx('stardust-tabs-header__tab-active')} onClick={handleClickSuggestions}>
                        <div id="FA284N-N-5qHu-suggestions" className={cx('FA284N-N-5qHu-suggestions')}></div>
                        <div className={cx('FJibgJ-suggestions')}>
                            {GetCookie('usrin') !== undefined ? (
                                <span>GỢI Ý DÀNH CHO BẠN</span>
                            ) : (
                                <span>GỢI Ý HÔM NAY</span>
                            )}
                        </div>
                    </li>
                    <li className={cx('stardust-tabs-header__tab-active')} onClick={handleClickPromotion}>
                        <div id="FA284N-N-5qHu-promotion" className={cx('FA284N-N-5qHu-promotion')}></div>
                        <div className={cx('FJibgJ-promotion')}>
                            <span>SẢN PHẨM KHUYẾN MÃI</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div className={cx('stardust-tabs-panels')}>
                <div className={cx('stardust-tabs-panels__panel')}>
                    {!checkPromotion ? (
                        <>
                            <div id="_6wTCb6-suggestions" className={cx('_6wTCb6')}>
                                {product !== '' &&
                                    product.slice(0, visible).map(
                                        (prod, index) =>
                                            prod !== null && (
                                                <div key={index} className={cx('_4beVMw')}>
                                                    <Link to={`/detail/product/nameid${prod.SP_id}`}>
                                                        <div className={cx('yZLQT4')}>
                                                            <div className={cx('uA1waf_4QQ4Ir')}>
                                                                <div className={cx('UB2waf')}>
                                                                    <div className={cx('n-CE6j-iRsxV')}>
                                                                        <img
                                                                            width="invalid-value"
                                                                            height="invalid-value"
                                                                            alt="Kệ để màn hình máy tính - laptop để bàn bằng gỗ trơn kiểu dáng đơn giản tiện dụng giá rẻ HDS-NTK04"
                                                                            className={cx('Vz6gJ3-edy5hG')}
                                                                            src={
                                                                                prod.SP_image ||
                                                                                'https://cf.shopee.vn/file/0e06d428fbc48666580e0f535a208637_tn'
                                                                            }
                                                                        />
                                                                        {prod.promotion !== 0 &&
                                                                        prod.promotion !== undefined &&
                                                                        handleTestDate(prod.promotion) ? (
                                                                            <div className={cx('vmaKHl')}>
                                                                                <div
                                                                                    className={cx(
                                                                                        'C2-vN-dCT7bq-Od5TJM',
                                                                                    )}
                                                                                >
                                                                                    <span className={cx('percent')}>
                                                                                        {prod.promotion.KM_phantram}%
                                                                                    </span>
                                                                                    <span className={cx('mXP-A3')}>
                                                                                        giảm
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        ) : (
                                                                            ''
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className={cx('W3bJfG')}>
                                                                    <div className={cx('qUEEG4')}>
                                                                        <div className={cx('hPc1Pf')}>
                                                                            <div className={cx('vc0PvV-AxYdVM')}>
                                                                                {prod.SP_ten}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className={cx('imdVqB_2fuFWg')}>
                                                                        {prod.promotion !== undefined ? (
                                                                            <div className={cx('WSVId4-fepoRf')}>
                                                                                <span className={cx('Fea6JM')}>₫</span>
                                                                                <span className={cx('j0vBz2')}>
                                                                                    {/* {formatCash(
                                                                                        prod.SP_gia *
                                                                                            ((100 -
                                                                                                prod.promotion
                                                                                                    .KM_phantram) /
                                                                                                100),
                                                                                    )} */}
                                                                                    {prod.SP_gia !== undefined &&
                                                                                    prod.SP_gia.toString().length > 6 &&
                                                                                    prod.promotion !== 0 &&
                                                                                    handleTestDate(prod.promotion)
                                                                                        ? formatCash(
                                                                                              prod.SP_gia *
                                                                                                  ((100 -
                                                                                                      prod.promotion
                                                                                                          .KM_phantram) /
                                                                                                      100),
                                                                                          )
                                                                                        : prod.promotion !== 0 &&
                                                                                          handleTestDate(prod.promotion)
                                                                                        ? Math.round(
                                                                                              formatCash(
                                                                                                  prod.SP_gia *
                                                                                                      ((100 -
                                                                                                          prod.promotion
                                                                                                              .KM_phantram) /
                                                                                                          100),
                                                                                              ),
                                                                                          ).toFixed(3)
                                                                                        : prod.promotion === 0 &&
                                                                                          formatCash(
                                                                                              prod.SP_gia *
                                                                                                  ((100 -
                                                                                                      prod.promotion) /
                                                                                                      100),
                                                                                          )}
                                                                                </span>
                                                                            </div>
                                                                        ) : (
                                                                            ''
                                                                        )}
                                                                        <div className={cx('upl8wJ _82UoSS')}>
                                                                            Đã bán {prod.SP_soluongban}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* <div className={cx('shopee-item-card__hover-footer _1X2yZq')}>
                                                    Tìm sản phẩm tương tự
                                                </div> */}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            ),
                                    )}
                            </div>
                            <div id="btn_btn-solid-primary" className={cx('btn_btn-solid-primary')}>
                                <button
                                    className={cx('btn_btn-solid-primary-suggestions')}
                                    onClick={handleShowMoreItems}
                                >
                                    Xem Thêm
                                </button>
                            </div>
                        </>
                    ) : (
                        ''
                    )}
                    {checkPromotion ? <HomePage data={product} checkPromotion={checkPromotion} /> : ''}
                </div>
            </div>
        </div>
    );
}

export default Home;
