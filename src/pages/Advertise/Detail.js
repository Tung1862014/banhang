import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import styles from './Advertise.module.scss';

const cx = classNames.bind(styles);

function Detail({ currentItems, clickPageCheck }) {
    const [checkBox, setCheckBox] = useState('');
    const [checkDelete, setCheckDelete] = useState(false);
    // const [userId, setUserId] = useState('');
    // const [noteValue, setNoteValue] = useState('');
    //const rating = [`&#9733;`, '&#9733;', '&#9733;', '&#9733;', '&#9733;'];
    console.log(checkBox.split(',').length);

    useEffect(() => {
        if (clickPageCheck) {
            const checkAll = document.getElementById('checkAll');
            checkAll.checked = false;
            for (let i = 0; i < currentItems.length; i++) {
                let checkedId = document.getElementById(`checkId${currentItems[i].ND_id}`);
                //console.log(checkedId.checked);

                checkedId.checked = false;
            }
            setCheckBox('');
        }
    }, [clickPageCheck, currentItems]);

    function handleDeleteAll() {
        let checkValue = checkBox.split(',');
        for (let i = 0; i < checkValue.length; i++) {
            console.log('check: ', checkValue[i]);
            axios
                .post(`${process.env.REACT_APP_URL_NODEJS}/admin/delete/advertise`, {
                    QB_id: checkValue[i],
                })

                .then((res) => {
                    console.log(res.data);
                })
                .catch(() => {
                    console.log('loi khong the update');
                });
        }
        setCheckDelete(false);
        window.open(`${process.env.REACT_APP_URL_FRONTEND}/admin/advertise=all`, '_self', 1);
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
            let checkedId = document.getElementById(`checkId${currentItems[i].QB_id}`);
            //console.log(checkedId.checked);
            if (checkAll.checked) {
                checkedId.checked = true;
                if (idcheck === undefined) {
                    idcheck = currentItems[i].QB_id.toString();
                } else {
                    idcheck = idcheck + ',' + currentItems[i].QB_id;
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
                                <div className={cx('delete-modal__title')}>Bạn có muốn xóa các thông tin này?</div>
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
                                    <td className={cx('td_table-name')}>Làng nghề</td>
                                    <td className={cx('td_table-name')}>Mô tả</td>
                                    <td className={cx('td_table-name-note')}>Hoạt động</td>
                                </tr>
                                {currentItems !== ''
                                    ? currentItems.map((info, index) => (
                                          <tr key={index} className={cx('table__header-conten')}>
                                              <td>
                                                  <input
                                                      type="checkbox"
                                                      name="id[]"
                                                      id={`checkId${info.QB_id}`}
                                                      className={cx('checkbox')}
                                                      value="<?=$bien['idsp']?>"
                                                      onChange={() => handleChecked(info.QB_id)}
                                                  />
                                              </td>
                                              <td className={cx('td_table-name-sp')}>
                                                  <img src={info.QB_image} alt="" width="90" height="60" />
                                                  <span className={cx('name-product-sp')}>{info.QB_tieude}</span>
                                              </td>
                                              <td className={cx('td_table-name-sp')}>
                                                  <span
                                                      className={cx('name-product-sp')}
                                                      dangerouslySetInnerHTML={{
                                                          __html: info.QB_mota !== '' ? `${info.QB_mota}` : '',
                                                      }}
                                                  ></span>
                                              </td>

                                              <td className={cx('td_table-name-note')}>
                                                  <Link
                                                      to={`/admin/update/advertise=${info.QB_id}`}
                                                      className={cx('td_table-name-note-button')}
                                                      //   onClick={() => handleNote(pro.ND_id, pro.ND_ghichu)}
                                                  >
                                                      Cập nhật
                                                  </Link>
                                              </td>
                                          </tr>
                                      ))
                                    : ''}
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
                                : checkBox.split(',').length === 1
                                ? 1
                                : checkBox.split(',').length === 2
                                ? 2
                                : checkBox.split(',').length === 3
                                ? 3
                                : checkBox.split(',').length === 4
                                ? 4
                                : checkBox.split(',').length === 5
                                ? 5
                                : 6}
                            <span> sản phẩm đã được chọn</span>
                        </div>
                        <button type="button" className={cx('delete-button')} onClick={handleDelete}>
                            <span>Xóa</span>
                        </button>
                    </div>
                    <ToastContainer />
                </div>
            )}
            {currentItems[0] === undefined ? (
                <div className={cx('bill-title-no-product')}>Không có người dùng nào.</div>
            ) : (
                ''
            )}
        </div>
    );
}

export default Detail;
