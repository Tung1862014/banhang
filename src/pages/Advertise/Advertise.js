import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Advertise.module.scss';
import AdvertisePage from './AdvertisePage';

const cx = classNames.bind(styles);

function Advertise() {
    const [advertiseValue, setAdvertiseValue] = useState('');
    const [NumberAdvertiseValue, setNumberAdvertiseValue] = useState('');

    console.log('setAdvertiseValue', advertiseValue);
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_URL_NODEJS}/admin/show/advertise`)
            .then((res) => {
                console.log('Advertise', res.data.numbers);
                setAdvertiseValue(res.data.advertise);
                setNumberAdvertiseValue(res.data.numbers.numbers);
            })
            .catch(() => {
                console.log('loi khong the show product');
            });
    }, []);

    useEffect(() => {
        const pathId = window.location.pathname.toString();
        const resultId = pathId.slice(24);
        console.log('resultId', resultId);
        if (resultId === 'all') {
            handlerClickAll();
        }
    }, []);

    const handlerClickAll = () => {
        const tab1 = document.getElementById('tabs__tab1');
        const badge1 = document.getElementById('tab-badge1');

        tab1.style.color = 'red';
        tab1.style.fontFamily = 'Helvetica';
        badge1.style.color = 'red';
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('shopee-tabs')}>
                <div className={cx('shopee-tabs__nav')}>
                    {' '}
                    <div className={cx('shopee-tabs__nav-warp')}>
                        <div className={cx('shopee-tabs__nav-tabs')}>
                            <div className={cx('shopee-tabs__nav-tab')}>
                                <Link
                                    to="/admin/advertise=all"
                                    id="tabs__tab1"
                                    className={cx('tabs__tab1')}
                                    // onClick={handlerClickAll}
                                >
                                    Tất cả
                                    <span id="tab-badge1" className={cx('tab-badge1')}>
                                        {/* ( {number !== '' ? number : '0'} ) */}
                                    </span>
                                </Link>{' '}
                            </div>
                        </div>{' '}
                        <div className={cx('shopee-tabs__ink-bar')}></div>
                    </div>{' '}
                </div>{' '}
            </div>
            <div className={cx('product-grid')}>
                <div className={cx('grid')}>
                    <div data-v-3cbfdb84="" className={cx('grid-left')}>
                        <div data-v-3cbfdb84="" className={cx('title-box')}>
                            <div data-v-3cbfdb84="" className={cx('page-title-box')}>
                                <div data-v-3cbfdb84="" className={cx('page-title')}>
                                    {NumberAdvertiseValue !== '' ? NumberAdvertiseValue : '0'} Thông tin
                                </div>{' '}
                            </div>
                        </div>
                    </div>
                    <div className={cx('grid-right')}>
                        <Link
                            to={'/admin/add/advertise'}
                            className={cx('add-action')}
                            //onClick={() => handleAddProduct()}
                        >
                            <i className={cx('shopee-icon')}>
                                <svg viewBox="0 0 32 32">
                                    <path d="M17.5 2.5h-3v12h-12v3h12v12h3v-12h12v-3h-12v-12z"></path>
                                </svg>
                            </i>
                            <span className={cx('shopee-add-title')}>Thêm 1 thông tin làng nghề</span>
                        </Link>
                    </div>
                </div>
            </div>
            <AdvertisePage data={advertiseValue} />
        </div>
    );
}

export default Advertise;
