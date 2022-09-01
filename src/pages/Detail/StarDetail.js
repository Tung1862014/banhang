import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Detail.module.scss';

const cx = classNames.bind(styles);

function StarDetail({ evaluation }) {
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
        <div className={cx('detail-product-comment-list')}>
            {evaluation !== ''
                ? evaluation.map((evalue, index) => (
                      <div key={index} className={cx('detail-product-rating')}>
                          <a className={cx('detail-product-rating__avatar')} href="/shop/154890615">
                              <div className={cx('detail-avatar')}>
                                  {/*  */}
                                  <img
                                      className={cx('detail-avatar__img')}
                                      alt=""
                                      src={evalue.userName.ND_image || ''}
                                  />
                              </div>
                          </a>
                          <div className={cx('detail-product-rating__main')}>
                              <a className={cx('detail-product-rating__author-name')} href="/shop/154890615">
                                  {evalue.userName.ND_hoten || ''}
                              </a>
                              <div className={cx('repeat-purchase-con')}>
                                  <div className={cx('detail-product-rating__rating')}>
                                      <FontAwesomeIcon
                                          className={cx(
                                              evalue.DG_sosao === 5 ||
                                                  evalue.DG_sosao === 4 ||
                                                  evalue.DG_sosao === 3 ||
                                                  evalue.DG_sosao === 2 ||
                                                  evalue.DG_sosao === 1
                                                  ? 'shopee-svg-icon'
                                                  : '',
                                          )}
                                          icon={faStar}
                                      />
                                      <FontAwesomeIcon
                                          className={cx(
                                              evalue.DG_sosao === 5 ||
                                                  evalue.DG_sosao === 4 ||
                                                  evalue.DG_sosao === 3 ||
                                                  evalue.DG_sosao === 2
                                                  ? 'shopee-svg-icon'
                                                  : '',
                                          )}
                                          icon={faStar}
                                      />
                                      <FontAwesomeIcon
                                          className={cx(
                                              evalue.DG_sosao === 5 || evalue.DG_sosao === 4 || evalue.DG_sosao === 3
                                                  ? 'shopee-svg-icon'
                                                  : '',
                                          )}
                                          icon={faStar}
                                      />
                                      <FontAwesomeIcon
                                          className={cx(
                                              evalue.DG_sosao === 5 || evalue.DG_sosao === 4 ? 'shopee-svg-icon' : '',
                                          )}
                                          icon={faStar}
                                      />
                                      <FontAwesomeIcon
                                          className={cx(evalue.DG_sosao === 5 ? 'shopee-svg-icon' : '')}
                                          icon={faStar}
                                      />
                                  </div>
                              </div>
                              <div className={cx('detail-product-rating__time')}>{takeDate(evalue.DG_ngayDG)}</div>
                              <div className={cx('detail-product-rating__tags')}>
                                  <span>{evalue.DG_mota || ''}</span>
                              </div>
                          </div>
                      </div>
                  ))
                : ''}
            {/* {bill[0] === undefined ? <div className={cx('bill-title-no-product')}>Không có đơn hàng nào.</div> : ''} */}
        </div>
    );
}

export default StarDetail;
