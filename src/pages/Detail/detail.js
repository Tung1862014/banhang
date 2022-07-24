import axios from 'axios';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './detail.module.scss';

import GetCookie from '~/components/Hook/GetCookies';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Detail() {
    const [detailValue, setDetailValue] = useState('');

    //const idValue = useDebounce(GetCookie('detail'), 500);

    useEffect(() => {
        axios
            .get(`https://api-store-backend-nodejs.herokuapp.com/product/detail?q=${GetCookie('detail')}`)
            .then((res) => {
                setDetailValue(res.data);
                console.log(res);
            })
            .catch((err) => console.log('Loii:' + err));
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('intro')}>
                <div className={cx('img-product')}>
                    <img
                        className={cx('img-product-detail')}
                        src={`https://api-store-backend-nodejs.herokuapp.com/images/${detailValue.image}`}
                        alt="#"
                    />
                    <div className={cx('menu-list-img')}>
                        <div className={cx('list-img')}>
                            <img
                                className={cx('list-img-product-detail')}
                                src={`https://api-store-backend-nodejs.herokuapp.com/images/${detailValue.image}`}
                                alt="#"
                            />
                        </div>
                        <div className={cx('list-img')}>
                            <img
                                className={cx('list-img-product-detail')}
                                src={`https://api-store-backend-nodejs.herokuapp.com/images/${detailValue.image}`}
                                alt="#"
                            />
                        </div>
                        <div className={cx('list-img')}>
                            <img
                                className={cx('list-img-product-detail')}
                                src={`https://api-store-backend-nodejs.herokuapp.com/images/${detailValue.image}`}
                                alt="#"
                            />
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
