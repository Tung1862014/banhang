import axios from 'axios';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import GetCookie from '~/components/Hook/GetCookies';
import styles from './Seller.module.scss';

const cx = classNames.bind(styles);

function Seller() {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        axios
            .post(`${process.env.REACT_APP_URL_NODEJS}/seller/establish/show`, {
                NB_id: JSON.parse(GetCookie('seller')).NB_id,
            })

            .then((res) => {
                console.log(res.data);
                setTitle(res.data.result.MTS_ten);
                setImage(res.data.result.MTS_image);
            })
            .catch(() => {
                console.log('loi khong the show anh');
            });
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('establish')}>
                    <div className={cx('image')}>
                        <img
                            src={image || process.env.REACT_APP_URL_NODEJS_IMAGE + '/default-ui-image.webp'}
                            alt=""
                            className={cx('establish-image')}
                        />
                    </div>
                    <div className={cx('establish-name-shop')}>{title}</div>
                </div>
                <div className={cx('establish-product')}></div>
            </div>
        </div>
    );
}

export default Seller;
