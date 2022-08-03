import axios from 'axios';
import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import classNames from 'classnames/bind';
import styles from './detail.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import GetCookie from '~/components/Hook/GetCookies';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Detail() {
    const [detailValue, setDetailValue] = useState('');

    //const idValue = useDebounce(GetCookie('detail'), 500);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_URL_NODEJS}/product/detail?q=${GetCookie('detail')}`)
            .then((res) => {
                setDetailValue(res.data);
                console.log(res);
            })
            .catch((err) => console.log('Loii:' + err));
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const handleShowImage = () => {
        window.open(`${process.env.REACT_APP_URL_NODEJS}/images/${detailValue.image}`, '_blank');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('intro')}>
                <div className={cx('img-product')}>
                    <img
                        className={cx('img-product-detail')}
                        src={`${process.env.REACT_APP_URL_NODEJS}/images/${detailValue.image}`}
                        alt="#"
                        onClick={handleShowImage}
                    />
                    <div className={cx('menu-list')}>
                        <div className={cx('menu-list-img')}>
                            <Slider {...settings}>
                                <div className={cx('list-img')}>
                                    <div className={cx('list-img-group')}>
                                        <img
                                            className={cx('list-img-product-detail')}
                                            src={`${process.env.REACT_APP_URL_NODEJS}/images/${detailValue.image}`}
                                            alt="#"
                                        />
                                        <img
                                            className={cx('list-img-product-detail')}
                                            src={`${process.env.REACT_APP_URL_NODEJS}/images/${detailValue.image}`}
                                            alt="#"
                                        />
                                        <img
                                            className={cx('list-img-product-detail')}
                                            src={`${process.env.REACT_APP_URL_NODEJS}/images/${detailValue.image}`}
                                            alt="#"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h3>2</h3>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>
                <div className={cx('describe')}>
                    <div className={cx('name-product')}>
                        Laptop ACER Nitro 5 AN515-52-51LW NH.Q3LSV.002 (15.6" Full HD/Intel Core i5-8300H/8GB/128GB
                        SSD/1TB HDD/NVIDIA GeForce GTX 1050Ti/Linux/2.4kg)
                    </div>
                    <div className={cx('trademark-product')}>Thương hiệu: IPHONE</div>
                    <div className={cx('number-product')}>
                        Số lượng còn lại: {detailValue.number - detailValue.sellNumber}
                    </div>
                    <div className={cx('money-product')}>
                        {detailValue.money} <i>đ</i>
                    </div>
                    <div className={cx('btn-insert')}>
                        <Button className={cx('btn-insert-card')} primary>
                            THÊM VÀO GIỎ HÀNG
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;
