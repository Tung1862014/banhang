import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Home.module.scss';

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
    return (
        <div className={cx('_6wTCb6')}>
            {product !== '' &&
                product.map(
                    (prod, index) =>
                        prod !== null && (
                            <div key={index} className={cx('_4beVMw')}>
                                <Link to={`/detail/product/nameid${prod.SP_id}`}>
                                    <div className={cx('yZLQT4')}>
                                        <div className={cx('uA1waf_4QQ4Ir')}>
                                            <div className={cx('UB2waf')}>
                                                <div className={cx('n-CE6j-iRsxV')}>
                                                    <img
                                                        width="invalid-value"
                                                        height="invalid-value"
                                                        alt="Kệ để màn hình máy tính - laptop để bàn bằng gỗ trơn kiểu dáng đơn giản tiện dụng giá rẻ HDS-NTK04"
                                                        className={cx('Vz6gJ3-edy5hG')}
                                                        src={
                                                            prod.SP_image ||
                                                            'https://cf.shopee.vn/file/0e06d428fbc48666580e0f535a208637_tn'
                                                        }
                                                    />
                                                    {prod.SP_khuyenmai !== 0 ? (
                                                        <div className={cx('vmaKHl')}>
                                                            <div className={cx('C2-vN-dCT7bq-Od5TJM')}>
                                                                <span className={cx('percent')}>
                                                                    {prod.SP_khuyenmai}%
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
                                                        <div className={cx('vc0PvV-AxYdVM')}>{prod.SP_ten}</div>
                                                    </div>
                                                </div>
                                                <div className={cx('imdVqB_2fuFWg')}>
                                                    <div className={cx('WSVId4-fepoRf')}>
                                                        <span className={cx('Fea6JM')}>₫</span>
                                                        <span className={cx('j0vBz2')}>
                                                            {formatCash(
                                                                prod.SP_gia * ((100 - prod.SP_khuyenmai) / 100),
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div className={cx('upl8wJ _82UoSS')}>
                                                        Đã bán {prod.SP_soluongban}
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
