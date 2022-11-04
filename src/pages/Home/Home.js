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
    }, [clickSuggestions]);

    function handleClickSuggestions() {
        const suggestions = document.getElementById('FA284N-N-5qHu-suggestions');
        const promotion = document.getElementById('FA284N-N-5qHu-promotion');

        suggestions.style.display = 'block';
        promotion.style.display = 'none';

        setClickSuggestions('suggestions');
    }

    function handleClickPromotion() {
        const suggestions = document.getElementById('FA284N-N-5qHu-suggestions');
        const promotion = document.getElementById('FA284N-N-5qHu-promotion');

        suggestions.style.display = 'none';
        promotion.style.display = 'block';
        setClickSuggestions('promotion');
    }

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
                    <HomePage data={product} />
                </div>
            </div>
        </div>
    );
}

export default Home;
