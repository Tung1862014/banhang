// import axios from 'axios';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
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

    const handleAnswers = (review) => {
        const form = document.getElementById('ReDGyJ');
        const btnSave = document.getElementById('HtW4DS_IJ1jvV');

        form.style.display = 'flex';

        btnSave.addEventListener('click', function () {
            const text = document.getElementById('ChI2Nx_92k3pl');
            console.log('review', text.value);
            axios
                .put(`${process.env.REACT_APP_URL_NODEJS}/sellerreviewsshop/update/answer`, {
                    DG_id: review,
                    DG_traloi: text.value,
                })
                .then((res) => {
                    console.log('successfully');
                })
                .catch((err) => {
                    console.log('loi');
                });
        });
    };

    return (
        <div>
            <div id="ReDGyJ" className={cx('ReDGyJ')}>
                <div className={cx('_68lNMv')}>
                    <div className={cx('nwCEcV')}>
                        <div className={cx('w2EqJ')}>
                            <div className={cx('_84tOMz')}>Trả lời</div>
                            <form>
                                <div className={cx('lHCVqO')}>
                                    <div className={cx('iWBSHn')}>
                                        <div className={cx('_0fHnjY')}>
                                            <div className={cx('XjHkd3')}>
                                                <div className={cx('T1souv')}>
                                                    <div className={cx('u1wAmL')}>
                                                        <div className={cx('vEFwLK_6DXlE9')}>Nội dung</div>
                                                        <textarea
                                                            id="ChI2Nx_92k3pl"
                                                            className={cx('ChI2Nx_92k3pl')}
                                                            //onChange={(e) => setContenValue(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* / */}
                                    <div className={cx('GixP1t')}>
                                        <button
                                            className={cx('HtW4DS_x4AEET')}
                                            //onClick={() => handleShowFormAddress('back')}
                                        >
                                            Trở Lại
                                        </button>
                                        <button
                                            id="HtW4DS_IJ1jvV"
                                            className={cx('HtW4DS_IJ1jvV')}
                                            //onClick={() => handleSubmitFormAddress()}
                                        >
                                            Lưu
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
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
                                                      <div className={cx('content-answer')}>
                                                          <div className={cx('content-answer-shop')}>
                                                              Phản hồi: {review.DG_traloi}
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>{' '}
                                              <div className={cx('btn-evaluation-answer')}>
                                                  <button
                                                      className={cx('btn-evaluation-answer-button')}
                                                      onClick={() => handleAnswers(review.DG_id)}
                                                  >
                                                      Trả lời
                                                  </button>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  ))
                : ''}
            {evaluate[0] === undefined ? (
                <div className={cx('reviews-title-no-product')}>Không có đánh giá nào.</div>
            ) : (
                ''
            )}
        </div>
    );
}

export default Detail;
