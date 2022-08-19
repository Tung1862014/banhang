import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './SellerProduct.module.scss';

const cx = classNames.bind(styles);

function Detail({ currentItems }) {
    //const rating = [`&#9733;`, '&#9733;', '&#9733;', '&#9733;', '&#9733;'];
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
        <div className={cx('product-list-setion')}>
            <div className={cx('product-list-container')}>
                <div className={cx('product-list-table')}>
                    <div className={cx('shopee-table__header-container')}>
                        <table className={cx('shopee-table__header')}>
                            <thead>
                                <tr className={cx('table__header')}>
                                    <td width="30">
                                        <input type="checkbox" name="check" className="checkbox" />
                                    </td>
                                    <td className={cx('td_table-name')}>Tên sản phẩm</td>
                                    <td className={cx('td_table-name')}>Số lượng</td>
                                    <td className={cx('td_table-name')}>Giá</td>
                                    <td className={cx('td_table-name')}>Số lượng bán</td>
                                    <td>Hoạt động</td>
                                </tr>
                                {currentItems.map((pro, index) => (
                                    <tr key={index} className={cx('table__header-conten')}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                name="id[]"
                                                className={cx('checkbox')}
                                                value="<?=$bien['idsp']?>"
                                            />
                                        </td>
                                        <td className={cx('td_table-name')}>
                                            <img src={pro.SP_image} alt="" width="40" height="40" />
                                            <span className={cx('name-product')}>{pro.SP_ten}</span>
                                        </td>
                                        <td className={cx('td_table-name')}>{pro.SP_soluong}</td>
                                        <td className={cx('td_table-name')}>{formatCash(pro.SP_gia)}₫</td>
                                        <td className={cx('td_table-name')}>{pro.SP_soluongban}</td>
                                        <td>
                                            <Link to={`update/@${pro.SP_id}`} className={cx('btn-update')}>
                                                Cập nhật
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;
