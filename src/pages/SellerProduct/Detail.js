import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SellerProduct.module.scss';

const cx = classNames.bind(styles);

function Detail({ currentItems }) {
    const [checkBox, setCheckBox] = useState('');
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
    function handleChecked(checkid) {
        //const checkedId = document.getElementById(`checkId${checkid}`);
        // for (let i = 0; i < checkBox.length; i++) {
        console.log(checkBox);
        if (checkBox === '') {
            setCheckBox(checkid.toString());
        } else {
            const arr = checkBox.split(',');
            let locationId;

            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === checkid.toString()) {
                    locationId = i;
                }
            }
            if (locationId === undefined) {
                let idcheck = checkBox + ',' + checkid;
                setCheckBox(idcheck);
                return;
            } else {
                arr.splice(locationId, 1);

                setCheckBox(arr.join(','));
            }
            console.log(arr);
        }
        //}
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
                                                id={`checkId${pro.SP_id}`}
                                                className={cx('checkbox')}
                                                value="<?=$bien['idsp']?>"
                                                onChange={() => handleChecked(pro.SP_id)}
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
