import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './SellerProduct.module.scss';

const cx = classNames.bind(styles);

function Detail({ currentItems, clickPageCheck }) {
    const [checkBox, setCheckBox] = useState('');
    const [checkDelete, setCheckDelete] = useState(false);
    //const rating = [`&#9733;`, '&#9733;', '&#9733;', '&#9733;', '&#9733;'];
    console.log(checkBox);

    useEffect(() => {
        if (clickPageCheck) {
            const checkAll = document.getElementById('checkAll');
            checkAll.checked = false;
            for (let i = 0; i < currentItems.length; i++) {
                let checkedId = document.getElementById(`checkId${currentItems[i].SP_id}`);
                //console.log(checkedId.checked);

                checkedId.checked = false;
            }
            setCheckBox('');
        }
    }, [clickPageCheck, currentItems]);
    function formatCash(str) {
        return str
            .toString()
            .split('')
            .reverse()
            .reduce((prev, next, index) => {
                return (index % 3 ? next : next + '.') + prev;
            });
    }

    function handleDeleteAll() {
        let checkValue = checkBox.split(',');
        for (let i = 0; i < checkValue.length; i++) {
            console.log('check: ', checkValue[i]);
            axios
                .post(`${process.env.REACT_APP_URL_NODEJS}/sellerupdateproduct/product/delete`, {
                    SP_id: checkValue[i],
                })

                .then((res) => {
                    console.log(res.data);
                })
                .catch(() => {
                    console.log('loi khong the delete product');
                });
        }
        setCheckDelete(false);
        window.open('http://localhost:3000/seller/product/@all', '_self', 1);
    }

    const handleDelete = () => {
        const deleteModalContainer = document.getElementById('delete-modal__container');
        //const deleteModalBox = document.getElementById('delete-modal__box');
        if (!checkDelete && checkBox !== '') {
            deleteModalContainer.style.display = 'flex';
            // deleteModalContainer.style.position = 'fixed';
            // deleteModalBox.style.display = 'flex';
        }
    };

    const handleDeleteHuy = () => {
        const deleteModalContainer = document.getElementById('delete-modal__container');
        //const deleteModalBox = document.getElementById('delete-modal__box');
        //deleteModalContainer.style.position = 'none';
        deleteModalContainer.style.display = 'none';
        // deleteModalBox.style.display = 'none';
    };

    const handleDeleteAgree = () => {
        const deleteModalContainer = document.getElementById('delete-modal__container');
        //const deleteModalBox = document.getElementById('delete-modal__box');
        //deleteModalContainer.style.position = 'none';
        deleteModalContainer.style.display = 'none';
        setCheckDelete(true);
        // deleteModalBox.style.display = 'none';
        handleDeleteAll();
    };

    function handleChecked(checkid) {
        clickPageCheck = false;
        //const checkedId = document.getElementById(`checkId${checkid}`);
        // for (let i = 0; i < checkBox.length; i++) {
        const checkAll = document.getElementById('checkAll');
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
                if (checkAll.checked === false && idcheck.split(',').length === currentItems.length) {
                    checkAll.checked = true;
                }
                return;
            } else {
                arr.splice(locationId, 1);
                if (checkAll.checked === true) {
                    checkAll.checked = false;
                }

                setCheckBox(arr.join(','));
            }
            console.log(arr);
        }
        //}
    }

    function handleCheckAll() {
        clickPageCheck = false;
        const checkAll = document.getElementById('checkAll');
        let idcheck;
        for (let i = 0; i < currentItems.length; i++) {
            let checkedId = document.getElementById(`checkId${currentItems[i].SP_id}`);
            //console.log(checkedId.checked);
            if (checkAll.checked) {
                checkedId.checked = true;
                if (idcheck === undefined) {
                    idcheck = currentItems[i].SP_id.toString();
                } else {
                    idcheck = idcheck + ',' + currentItems[i].SP_id;
                }
            } else {
                checkedId.checked = false;
                idcheck = '';
                // console.log(checkAll.checked);
            }
            setCheckBox(idcheck);
        }
        console.log(checkAll.checked);
    }

    return (
        <div className={cx('product-list-setion')}>
            <div id="delete-modal__container" className={cx('delete-modal__container')}>
                <div id="delete-modal__box" className={cx('delete-modal__box')}>
                    <div className={cx('delete-modal__content')}>
                        <div className={cx('delete-modal__header')}>
                            <div className={cx('delete-modal__header-inner-confirm')}>
                                <div className={cx('delete-modal__title')}>Xác nhận</div>
                            </div>
                            <div className={cx('delete-modal__header-inner-title')}>
                                <div className={cx('delete-modal__title')}>Bạn có muốn xóa sản phẩm?</div>
                            </div>
                        </div>
                        <div className={cx('delete-modal__footer')}>
                            <div className={cx('delete-modal__footer-buttons')}>
                                <button type="button" className={cx('delete-button--normal')} onClick={handleDeleteHuy}>
                                    <span>Hủy</span>
                                </button>
                                <button
                                    type="button"
                                    className={cx('delete-button--primary')}
                                    onClick={handleDeleteAgree}
                                >
                                    <span>Đồng ý</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('product-list-container')}>
                <div className={cx('product-list-table')}>
                    <div className={cx('shopee-table__header-container')}>
                        <table className={cx('shopee-table__header')}>
                            <thead>
                                <tr className={cx('table__header')}>
                                    <td width="30">
                                        <input
                                            type="checkbox"
                                            name="check"
                                            id="checkAll"
                                            className="checkbox"
                                            onChange={() => handleCheckAll()}
                                        />
                                    </td>
                                    <td className={cx('td_table-name')}>Tên sản phẩm</td>
                                    <td className={cx('td_table-name-number')}>Số lượng</td>
                                    <td className={cx('td_table-name')}>Giá</td>
                                    <td className={cx('td_table-name-number')}>Số lượng bán</td>
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
                                        <td className={cx('td_table-name-sp')}>
                                            <img src={pro.SP_image} alt="" width="40" height="40" />
                                            <span className={cx('name-product-sp')}>{pro.SP_ten}</span>
                                        </td>
                                        <td className={cx('td_table-name-number')}>{pro.SP_soluong}</td>
                                        <td className={cx('td_table-name')}>{formatCash(pro.SP_gia)}₫</td>
                                        <td className={cx('td_table-name-number')}>{pro.SP_soluongban}</td>
                                        <td>
                                            <a href={`update/@${pro.SP_id}`} className={cx('btn-update')}>
                                                Cập nhật
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
            {currentItems[0] !== undefined && (
                <div className={cx('selected-panel')}>
                    <div className={cx('selected')}>
                        <div className={cx('selected-text')}>
                            {checkBox.length === 0
                                ? 0
                                : checkBox.length === 1
                                ? 1
                                : checkBox.length === 3
                                ? 2
                                : checkBox.length === 5
                                ? 3
                                : checkBox.length === 7
                                ? 4
                                : checkBox.length === 9
                                ? 5
                                : 6}
                            <span> sản phẩm đã được chọn</span>
                        </div>
                        <button type="button" className={cx('delete-button')} onClick={handleDelete}>
                            <span>Xóa</span>
                        </button>
                    </div>
                </div>
            )}
            {currentItems[0] === undefined ? (
                <div className={cx('bill-title-no-product')}>Không có sản phẩm nào.</div>
            ) : (
                ''
            )}
        </div>
    );
}

export default Detail;
