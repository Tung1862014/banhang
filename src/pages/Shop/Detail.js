// import axios from 'axios';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
//import { Link } from 'react-router-dom';
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
import styles from './Shop.module.scss';

const cx = classNames.bind(styles);

function Detail({ productValue }) {
    function formatCash(str) {
        return str
            .toString()
            .split('')
            .reverse()
            .reduce((prev, next, index) => {
                return (index % 3 ? next : next + '.') + prev;
            });
    }

    return (
        <div className={cx('row')}>
            {productValue !== ''
                ? productValue.map((prod, index) => (
                      <div key={index} className={cx('shop-search-result-view__item-col-xs-2-4')}>
                          <Link data-sqe="link" to={`/detail/product/nameid${prod.SP_id}`} className={cx('dd')}>
                              <div className={cx('_3DGyGY')}>
                                  <div className={cx('_3ZU4Xu')}>
                                      <div className={cx('nHUlre_2CaWwM')}>
                                          <img
                                              width="invalid-value"
                                              height="invalid-value"
                                              alt="Khô cá dứa  cần giờ ngon đặc biệt thịt dai thơm ngon - hút chân không bảo quản lâu dùng chất lượng Mekong Foods"
                                              className={cx('yFkmMY_1KQ1MG')}
                                              src={
                                                  prod.SP_image !== undefined
                                                      ? prod.SP_image
                                                      : process.env.REACT_APP_URL_NODEJS_IMAGE +
                                                        '/default-ui-image.webp'
                                              }
                                          />
                                          {prod.SP_khuyenmai !== 0 ? (
                                              <div className={cx('_3atTkb')}>
                                                  <div className={cx('CNco3q_2PoYxv_HpfQ6t')}>
                                                      <span className={cx('percent')}>{prod.SP_khuyenmai}%</span>
                                                      <span className={cx('_338wTY')}>giảm</span>
                                                  </div>
                                              </div>
                                          ) : (
                                              ''
                                          )}
                                      </div>
                                      <div className={cx('_2477Dv')}>
                                          <div className={cx('_1G5uNe')}>
                                              <div className={cx('_2mQnW2')}>
                                                  <div className={cx('_3Gla5X_2j2K92_3j20V6')}>{prod.SP_ten}</div>
                                              </div>
                                          </div>
                                          <div className={cx('_3CsOH6')}>
                                              <div className={cx('_3w3Slt_1NAEoM')}>
                                                  {prod.SP_khuyenmai !== 0 ? (
                                                      <span className={cx('_2whgI2')}>₫{formatCash(prod.SP_gia)}</span>
                                                  ) : (
                                                      ''
                                                  )}

                                                  <span className={cx('_3TJGx5')}>
                                                      ₫{formatCash(prod.SP_gia * ((100 - prod.SP_khuyenmai) / 100))}
                                                  </span>
                                              </div>
                                          </div>
                                          <div className={cx('_3UeJ1q')}>
                                              <div className={cx('_3VDfUA')}>
                                                  <div className={cx('shop-rating-stars')}>
                                                      <div className={cx('shop-rating-stars__stars')}>
                                                          <div className={cx('shop-rating-stars__star-wrapper')}>
                                                              <FontAwesomeIcon
                                                                  className={cx(
                                                                      prod.star === 5 ||
                                                                          prod.star === 4 ||
                                                                          prod.star === 3 ||
                                                                          prod.star === 2 ||
                                                                          prod.star === 1
                                                                          ? 'shop-rating-stars__gold-star'
                                                                          : '',
                                                                  )}
                                                                  icon={faStar}
                                                              />
                                                          </div>
                                                          <div className={cx('shop-rating-stars__star-wrapper')}>
                                                              <FontAwesomeIcon
                                                                  className={cx(
                                                                      prod.star === 5 ||
                                                                          prod.star === 4 ||
                                                                          prod.star === 3 ||
                                                                          prod.star === 2
                                                                          ? 'shop-rating-stars__gold-star'
                                                                          : '',
                                                                  )}
                                                                  icon={faStar}
                                                              />
                                                          </div>
                                                          <div className={cx('shop-rating-stars__star-wrapper')}>
                                                              <FontAwesomeIcon
                                                                  className={cx(
                                                                      prod.star === 5 ||
                                                                          prod.star === 4 ||
                                                                          prod.star === 3
                                                                          ? 'shop-rating-stars__gold-star'
                                                                          : '',
                                                                  )}
                                                                  icon={faStar}
                                                              />
                                                          </div>
                                                          <div className={cx('shop-rating-stars__star-wrapper')}>
                                                              <FontAwesomeIcon
                                                                  className={cx(
                                                                      prod.star === 5 || prod.star === 4
                                                                          ? 'shop-rating-stars__gold-star'
                                                                          : '',
                                                                  )}
                                                                  icon={faStar}
                                                              />
                                                          </div>
                                                          <div className={cx('shop-rating-stars__star-wrapper')}>
                                                              <FontAwesomeIcon
                                                                  className={cx(
                                                                      prod.star === 5
                                                                          ? 'shop-rating-stars__gold-star'
                                                                          : '',
                                                                  )}
                                                                  icon={faStar}
                                                              />
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div className={cx('_2Tc7Qg_2R-Crv')}>
                                                  Đã bán {prod.SP_soluongban !== null ? prod.SP_soluongban : '0'}
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </Link>
                      </div>
                  ))
                : ''}
        </div>
    );
}

export default Detail;
