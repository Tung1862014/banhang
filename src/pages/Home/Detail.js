import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Detail({ product, checkPromotion }) {
    function formatCash(str) {
        return str
            .toString()
            .split('')
            .reverse()
            .reduce((prev, next, index) => {
                return (index % 3 ? next : next + '.') + prev;
            });
    }

    function takeDateNow(date) {
        let dateValue;
        if (date !== 'true') {
            dateValue = new Date(date);
        } else {
            dateValue = new Date();
        }
        let day = dateValue.getDate();
        let month = dateValue.getMonth() + 1;
        let year = dateValue.getFullYear();

        if (month < 10 && day >= 10) {
            return year + '-0' + month + '-' + day;
        } else if (month < 10 && day < 10) {
            return year + '-0' + month + '-0' + day;
        } else if (month >= 10 && day < 10) {
            return year + '-' + month + '-0' + day;
        } else if (month >= 10 && day >= 10) {
            return year + '-' + month + '-' + day;
        } else {
            return year + '-' + month + '-' + day;
        }
    }

    function handleTestDate(promotion) {
        console.log('handleTestDate', promotion);
        if (promotion !== undefined) {
            let date1 = new Date(takeDateNow('true'));
            let datefrom = new Date(takeDateNow(promotion.KM_tungay));
            let dateto = new Date(takeDateNow(promotion.KM_denngay));
            if (date1 >= datefrom && date1 <= dateto) {
                return true;
            } else {
                return false;
            }
            // console.log('date1', date1);
        }
    }
    return (
        <div className={cx('_6wTCb6')}>
            {checkPromotion &&
                product !== '' &&
                product.map(
                    (prod, index) =>
                        prod !== null &&
                        handleTestDate(prod) && (
                            <div key={index} className={cx('_4beVMw')}>
                                <Link to={`/detail/product/nameid${prod.SP_id}`}>
                                    <div className={cx('yZLQT4')}>
                                        <div className={cx('uA1waf_4QQ4Ir')}>
                                            <div className={cx('UB2waf')}>
                                                <div className={cx('n-CE6j-iRsxV')}>
                                                    {prod.product !== undefined && (
                                                        <img
                                                            width="invalid-value"
                                                            height="invalid-value"
                                                            alt="Kệ để màn hình máy tính - laptop để bàn bằng gỗ trơn kiểu dáng đơn giản tiện dụng giá rẻ HDS-NTK04"
                                                            className={cx('Vz6gJ3-edy5hG')}
                                                            src={
                                                                prod.product.SP_image ||
                                                                'https://cf.shopee.vn/file/0e06d428fbc48666580e0f535a208637_tn'
                                                            }
                                                        />
                                                    )}
                                                    {prod.KM_phantram !== 0 &&
                                                    prod.KM_phantram !== undefined &&
                                                    handleTestDate(prod) ? (
                                                        <div className={cx('vmaKHl')}>
                                                            <div className={cx('C2-vN-dCT7bq-Od5TJM')}>
                                                                <span className={cx('percent')}>
                                                                    {prod.KM_phantram}%
                                                                </span>
                                                                <span className={cx('mXP-A3')}>giảm</span>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        ''
                                                    )}
                                                </div>
                                            </div>
                                            <div className={cx('W3bJfG')}>
                                                <div className={cx('qUEEG4')}>
                                                    <div className={cx('hPc1Pf')}>
                                                        {prod.product !== undefined && (
                                                            <div className={cx('vc0PvV-AxYdVM')}>
                                                                {prod.product.SP_ten}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className={cx('imdVqB_2fuFWg')}>
                                                    <div className={cx('WSVId4-fepoRf')}>
                                                        <span className={cx('Fea6JM')}>₫</span>
                                                        <span className={cx('j0vBz2')}>
                                                            {prod.product !== undefined
                                                                ? prod.product.SP_gia.toString().length > 6 &&
                                                                  prod.KM_phantram !== undefined &&
                                                                  handleTestDate(prod)
                                                                    ? formatCash(
                                                                          prod.product.SP_gia *
                                                                              ((100 - prod.KM_phantram) / 100),
                                                                      )
                                                                    : prod.KM_phantram !== undefined &&
                                                                      prod.product.SP_gia !== undefined &&
                                                                      handleTestDate(prod)
                                                                    ? Math.round(
                                                                          formatCash(
                                                                              prod.product.SP_gia *
                                                                                  ((100 - prod.KM_phantram) / 100),
                                                                          ),
                                                                      ).toFixed(3)
                                                                    : prod.product.SP_gia !== undefined
                                                                    ? formatCash(prod.product.SP_gia)
                                                                    : ''
                                                                : ''}
                                                        </span>
                                                    </div>
                                                    <div className={cx('upl8wJ _82UoSS')}>
                                                        Đã bán{' '}
                                                        {prod.product !== undefined && prod.product.SP_soluongban}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className={cx('shopee-item-card__hover-footer _1X2yZq')}>
                                                Tìm sản phẩm tương tự
                                            </div> */}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ),
                )}
        </div>
    );
}

export default Detail;
