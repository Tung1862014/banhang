import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import styles from './ManageCustomer.module.scss';

const cx = classNames.bind(styles);

function Detail({ currentItems, clickPageCheck }) {
    const [checkBox, setCheckBox] = useState('');
    const [checkDelete, setCheckDelete] = useState(false);
    const [userId, setUserId] = useState('');
    const [noteValue, setNoteValue] = useState('');
    //const rating = [`&#9733;`, '&#9733;', '&#9733;', '&#9733;', '&#9733;'];
    console.log('checkBox', checkBox);

    useEffect(() => {
        if (clickPageCheck) {
            const checkAll = document.getElementById('checkAll');
            checkAll.checked = false;
            for (let i = 0; i < currentItems.length; i++) {
                let checkedId = document.getElementById(`checkId${currentItems[i].ND_id}`);
                //console.log(checkedId.checked);

                checkedId.checked = false;
            }
            //setCheckBox('');
        }
        setCheckBox('');
    }, [clickPageCheck, currentItems]);

    function handleDeleteAll() {
        let checkValue = checkBox.split(',');
        for (let i = 0; i < checkValue.length; i++) {
            console.log('check: ', checkValue[i]);
            axios
                .put(`${process.env.REACT_APP_URL_NODEJS}/admin/update/status/customer`, {
                    ND_id: checkValue[i],
                })

                .then((res) => {
                    console.log(res.data);
                })
                .catch(() => {
                    console.log('loi khong the update');
                });
        }
        setCheckDelete(false);
        window.open(`${process.env.REACT_APP_URL_FRONTEND}/admin/manage/customer=all`, '_self', 1);
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
            let checkedId = document.getElementById(`checkId${currentItems[i].ND_id}`);
            //console.log(checkedId.checked);
            if (checkAll.checked) {
                checkedId.checked = true;
                if (idcheck === undefined) {
                    idcheck = currentItems[i].ND_id.toString();
                } else {
                    idcheck = idcheck + ',' + currentItems[i].ND_id;
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

    function takeDate(date) {
        const dateValue = new Date(date);
        let day = dateValue.getDate();
        let month = dateValue.getMonth() + 1;
        let year = dateValue.getFullYear();
        // let hour = dateValue.getHours();
        // let minute = dateValue.getMinutes();
        //console.log('day', day);
        if (month < 10 && day >= 10) {
            return day + '-0' + month + '-' + year;
        } else if (month < 10 && day < 10) {
            return '0' + day + '-0' + month + '-' + year;
        } else if (month >= 10 && day < 10) {
            return '0' + day + '-' + month + '-' + year;
        } else if (month >= 10 && day >= 10) {
            return day + '-' + month + '-' + year;
        } else {
            return day + '-' + month + '-' + year;
        }
    }

    const handleNote = (id, value) => {
        const noteModalContainer = document.getElementById('note-modal__container');
        //const deleteModalBox = document.getElementById('delete-modal__box');

        noteModalContainer.style.display = 'flex';
        setUserId(id);
        if (value !== undefined && value !== 'false') {
            setNoteValue(value);
        } else {
            setNoteValue('');
        }
    };

    const handleNoteHuy = () => {
        const noteModalContainer = document.getElementById('note-modal__container');
        //const deleteModalBox = document.getElementById('delete-modal__box');
        //noteModalContainer.style.position = 'none';
        noteModalContainer.style.display = 'none';
        // deleteModalBox.style.display = 'none';
    };

    const handleNoteAgree = () => {
        const noteModalContainer = document.getElementById('note-modal__container');
        //const deleteModalBox = document.getElementById('delete-modal__box');
        //noteModalContainer.style.position = 'none';
        noteModalContainer.style.display = 'none';
        setCheckDelete(true);
        // deleteModalBox.style.display = 'none';
        handleNoteUpdate();
    };

    const handleNoteUpdate = () => {
        console.log('ghi chu', noteValue);
        console.log('id user', userId);
        axios
            .put(`${process.env.REACT_APP_URL_NODEJS}/admin/update/note/customer`, {
                ND_id: userId,
                ND_ghichu: noteValue,
            })

            .then((res) => {
                console.log(res.data);
                if (res.data.update) {
                    toast.success('Thành công', {
                        position: toast.POSITION.TOP_CENTER,
                        className: `${cx('toast-message')}`,
                    });
                    const pathId = window.location.pathname.toString();
                    setTimeout(window.open(pathId, '_self', 1), 3000);
                } else {
                    toast.error('Thất bại', {
                        position: toast.POSITION.TOP_CENTER,
                        className: `${cx('toast-message')}`,
                    });
                }
            })
            .catch(() => {
                console.log('loi khong the update');
            });
    };

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
                                <div className={cx('delete-modal__title')}>Bạn có muốn thay đổi trạng thái?</div>
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
            <div id="note-modal__container" className={cx('note-modal__container')}>
                <div id="note-modal__box" className={cx('note-modal__box')}>
                    <div className={cx('delete-modal__content')}>
                        <div className={cx('delete-modal__header')}>
                            <div className={cx('delete-modal__header-inner-confirm')}>
                                <div className={cx('delete-modal__title')}>Ghi chú</div>
                            </div>
                            <div className={cx('note-modal__header-inner-title')}>
                                <textarea
                                    className={cx('note-container')}
                                    defaultValue={noteValue}
                                    onChange={(e) => setNoteValue(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                        <div className={cx('note-modal__footer')}>
                            <div className={cx('note-modal__footer-buttons')}>
                                <button type="button" className={cx('delete-button--normal')} onClick={handleNoteHuy}>
                                    <span>Hủy</span>
                                </button>
                                <button
                                    type="button"
                                    className={cx('delete-button--primary')}
                                    onClick={handleNoteAgree}
                                >
                                    <span>Hoàn thành</span>
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
                                    <td className={cx('td_table-name')}>Tên người dùng</td>
                                    <td className={cx('td_table-name-number')}>Email</td>
                                    <td className={cx('td_table-name-address')}>Địa chỉ</td>
                                    <td className={cx('td_table-name-date')}>Ngày tham gia</td>
                                    <td className={cx('td_table-name-status')}>Trạng thái</td>
                                    <td className={cx('td_table-name-note')}>Ghi chú</td>
                                </tr>
                                {currentItems !== ''
                                    ? currentItems.map((pro, index) => (
                                          <tr key={index} className={cx('table__header-conten')}>
                                              <td>
                                                  <input
                                                      type="checkbox"
                                                      name="id[]"
                                                      id={`checkId${pro.ND_id}`}
                                                      className={cx('checkbox')}
                                                      value="<?=$bien['idsp']?>"
                                                      onChange={() => handleChecked(pro.ND_id)}
                                                  />
                                              </td>
                                              <td className={cx('td_table-name-sp')}>
                                                  <img
                                                      src={pro.ND_image}
                                                      alt=""
                                                      width="40"
                                                      height="40"
                                                      style={{ borderRadius: '50%' }}
                                                  />
                                                  <span className={cx('name-product-sp')}>{pro.ND_hoten}</span>
                                              </td>
                                              <td className={cx('td_table-name-number')}>{pro.ND_email}</td>
                                              <td className={cx('td_table-name-address')}>{pro.ND_diachi}</td>
                                              <td className={cx('td_table-name-date')}>{takeDate(pro.ND_ngayDK)}</td>
                                              <td className={cx('td_table-name-status')}>
                                                  <a href={`update/@${pro.ND_id}`} className={cx('btn-update')}>
                                                      {pro.ND_trangthai === 1 ? '...' : 'Khóa'}
                                                  </a>
                                              </td>
                                              <td className={cx('td_table-name-note')}>
                                                  {pro.ND_ghichu === '' || pro.ND_ghichu === undefined ? (
                                                      <span
                                                          className={cx('td_table-name-note-button')}
                                                          onClick={() => handleNote(pro.ND_id, 'false')}
                                                      >
                                                          Thêm
                                                      </span>
                                                  ) : (
                                                      <span
                                                          className={cx('td_table-name-note-button')}
                                                          onClick={() => handleNote(pro.ND_id, pro.ND_ghichu)}
                                                      >
                                                          Cập nhật
                                                      </span>
                                                  )}
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
                            <span>Cập nhật</span>
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
