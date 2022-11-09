// import axios from 'axios';
// import { faPrint } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
//import { Link } from 'react-router-dom';
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
import styles from './SellerCategory.module.scss';

const cx = classNames.bind(styles);

function Detail({ product }) {
    function formatCash(str) {
        return str
            .toString()
            .split('')
            .reverse()
            .reduce((prev, next, index) => {
                return (index % 3 ? next : next + '.') + prev;
            });
    }
    const handleTestColor = (color) => {
        if (color % 2 === 0) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <>
            {product !== '' && product !== undefined && product.length > 0 ? (
                <div id="product-list-container" className={cx('product-list-container')}>
                    <div className={cx('product-list-table')}>
                        <div className={cx('shopee-table__header-container')}>
                            <table className={cx('shopee-table__header')}>
                                <thead>
                                    <tr className={cx('table__header-product')}>
                                        <td className={cx('td_table-name-product')}>Tên sản phẩm</td>
                                        <td className={cx('td_table-name-number')}>Số lượng</td>
                                        <td className={cx('td_table-name-product')}>Giá</td>
                                        <td className={cx('td_table-name-number')}>Số lượng bán</td>
                                    </tr>
                                    {product !== '' &&
                                        product !== undefined &&
                                        product.map((pro, index) => (
                                            <tr
                                                key={index}
                                                className={cx(
                                                    handleTestColor(index)
                                                        ? 'table__header-conten-color'
                                                        : 'table__header-conten',
                                                )}
                                            >
                                                <td className={cx('td_table-name-sp')}>
                                                    <img src={pro.SP_image} alt="" width="40" height="40" />
                                                    <span className={cx('name-product-sp')}>{pro.SP_ten}</span>
                                                </td>
                                                <td className={cx('td_table-name-number')}>{pro.SP_soluong}</td>
                                                <td className={cx('td_table-name-product')}>
                                                    {formatCash(pro.SP_gia)}₫
                                                </td>
                                                <td className={cx('td_table-name-number')}>{pro.SP_soluongban}</td>
                                            </tr>
                                        ))}
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            ) : (
                ''
            )}
        </>
    );
}

export default Detail;
