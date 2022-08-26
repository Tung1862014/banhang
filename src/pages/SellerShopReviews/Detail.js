// import axios from 'axios';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
import styles from './SellerShopReviews.module.scss';

const cx = classNames.bind(styles);

function Detail({ evaluate }) {
    function takeDate(date) {
        const dateValue = new Date(date);
        let day = dateValue.getDate();
        let month = dateValue.getMonth() + 1;
        let year = dateValue.getFullYear();
        let hour = dateValue.getHours();
        let minute = dateValue.getMinutes();
        if (month < 10) {
            return hour + ':' + minute + ', ' + day + '-0' + month + '-' + year;
        } else if (day < 10) {
            return hour + ':' + minute + ', 0' + day + '-' + month + year;
        } else {
            return hour + ':' + minute + ', ' + day + '-' + month + '-' + year;
        }
    }
    return (
        <div>
            {evaluate !== '' && evaluate !== undefined
                ? evaluate.map((review, index) => (
                      <div key={index}>
                          <div className={cx('comments')}>
                              <div className={cx('comment')}>
                                  <div className={cx('container')}>
                                      <div className={cx('table')}>
                                          <div className={cx('top')}>
                                              <div className={cx('column-information')}>
                                                  <div className={cx('user')}>
                                                      Người mua:
                                                      <span className={cx('username')}>
                                                          {review.product[0].ND_hoten}
                                                      </span>
                                                  </div>
                                              </div>{' '}
                                              <div className={cx('column-evaluation-content')}></div>{' '}
                                              <div className={cx('column-reply')}>ID đơn hàng:{review.DH_id}</div>
                                          </div>{' '}
                                          <div className={cx('bottom')}>
                                              <div className={cx('column-information-product')}>
                                                  <img
                                                      src={review.product[0].SP_image || ''}
                                                      alt=""
                                                      className={cx('product-image')}
                                                  />{' '}
                                                  <div>
                                                      <div className={cx('product-name')}>
                                                          {review.product[0].SP_ten}
                                                      </div>{' '}
                                                      {/* <div className={cx('product-variation')}>
                                                                      Phân loại:1 chai|Combo 2 chai
                                                                  </div> */}
                                                  </div>
                                              </div>
                                              <div className={cx('column-evaluation-content')}>
                                                  <div>
                                                      <div className={cx('comment-info')}>
                                                          <div className={cx('content')}>
                                                              <div className={cx('review-rate-disabled')}>
                                                                  <div className={cx('shopee-rate-star')}>
                                                                      <div className={cx('shopee-rate-star__front')}>
                                                                          <FontAwesomeIcon
                                                                              className={cx(
                                                                                  review.DG_sosao === 5 ||
                                                                                      review.DG_sosao === 4 ||
                                                                                      review.DG_sosao === 3 ||
                                                                                      review.DG_sosao === 2 ||
                                                                                      review.DG_sosao === 1
                                                                                      ? 'shopee-icon'
                                                                                      : '',
                                                                              )}
                                                                              icon={faStar}
                                                                          />
                                                                      </div>{' '}
                                                                  </div>
                                                                  <div className={cx('shopee-rate-star')}>
                                                                      <div className={cx('shopee-rate-star__front')}>
                                                                          <FontAwesomeIcon
                                                                              className={cx(
                                                                                  review.DG_sosao === 5 ||
                                                                                      review.DG_sosao === 4 ||
                                                                                      review.DG_sosao === 3 ||
                                                                                      review.DG_sosao === 2
                                                                                      ? 'shopee-icon'
                                                                                      : 'shopee-icon-no',
                                                                              )}
                                                                              icon={faStar}
                                                                          />
                                                                      </div>{' '}
                                                                  </div>
                                                                  <div className={cx('shopee-rate-star')}>
                                                                      <div className={cx('shopee-rate-star__front')}>
                                                                          <FontAwesomeIcon
                                                                              className={cx(
                                                                                  review.DG_sosao === 5 ||
                                                                                      review.DG_sosao === 4 ||
                                                                                      review.DG_sosao === 3
                                                                                      ? 'shopee-icon'
                                                                                      : 'shopee-icon-no',
                                                                              )}
                                                                              icon={faStar}
                                                                          />
                                                                      </div>{' '}
                                                                  </div>
                                                                  <div className={cx('shopee-rate-star')}>
                                                                      <div className={cx('shopee-rate-star__front')}>
                                                                          <FontAwesomeIcon
                                                                              className={cx(
                                                                                  review.DG_sosao === 5 ||
                                                                                      review.DG_sosao === 4
                                                                                      ? 'shopee-icon'
                                                                                      : 'shopee-icon-no',
                                                                              )}
                                                                              icon={faStar}
                                                                          />
                                                                      </div>{' '}
                                                                  </div>
                                                                  <div className={cx('shopee-rate-star')}>
                                                                      <div className={cx('shopee-rate-star__front')}>
                                                                          <FontAwesomeIcon
                                                                              className={cx(
                                                                                  review.DG_sosao === 5
                                                                                      ? 'shopee-icon'
                                                                                      : 'shopee-icon-no',
                                                                              )}
                                                                              icon={faStar}
                                                                          />
                                                                      </div>{' '}
                                                                  </div>
                                                              </div>{' '}
                                                              <div>
                                                                  <div className={cx('content')}>
                                                                      <div className={cx('comment')}>
                                                                          {review.DG_mota}
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                          </div>{' '}
                                                      </div>{' '}
                                                      <div className={cx('date')}>{takeDate(review.DG_ngayDG)}</div>
                                                  </div>
                                              </div>{' '}
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  ))
                : ''}
        </div>
    );
}

export default Detail;
