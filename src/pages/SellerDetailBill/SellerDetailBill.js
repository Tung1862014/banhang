import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import GetCookie from '~/components/Hook/GetCookies';
import styles from './SellerDetailBill.module.scss';

const cx = classNames.bind(styles);

function SellerDetailBill() {
    const [information, setInformation] = useState('');
    const [tokenValue, setTokenValue] = useState('');
    const [amountValue, setAmountValue] = useState('');
    const [idProductValue, setIdProductValue] = useState('');
    const [sellNumberValue, setSellNumberValue] = useState('');
    const [idOrderValue, setIdOrderValue] = useState('');

    const [noteValue, setNoteValue] = useState('');

    console.log('tokenValue', tokenValue);
    console.log('amountValue', amountValue);
    console.log('idProductValue', idProductValue);
    console.log('sellNumberValue', sellNumberValue);
    function formatCash(str) {
        return str
            .toString()
            .split('')
            .reverse()
            .reduce((prev, next, index) => {
                return (index % 3 ? next : next + '.') + prev;
            });
    }

    useEffect(() => {
        const pathId = window.location.pathname.toString();
        const resultId = pathId.slice(21);
        setIdOrderValue(resultId);
        console.log(resultId);
        axios
            .post(`${process.env.REACT_APP_URL_NODEJS}/sellerdetailbill/bill/show/all`, {
                NB_id: JSON.parse(GetCookie('seller')).ND_id,
                DH_id: resultId || '',
            })

            .then((res) => {
                console.log('result', res.data.result);
                let number = [];
                let idProduct = [];
                let sellNumber = [];
                for (let i = 0; i < res.data.result[0].product.length; i++) {
                    number.push(res.data.result[0].product[i].TTDH_soluong);
                    idProduct.push(res.data.result[0].product[i].SP_id);
                    sellNumber.push(res.data.result[0].product[i].SP_soluongban);

                    if (i === res.data.result[0].product.length - 1) {
                        setAmountValue((prev) => {
                            const newSeller = [...prev, number];
                            return newSeller[0];
                        });
                        setIdProductValue((prev) => {
                            const newSeller = [...prev, idProduct];
                            return newSeller[0];
                        });
                        setSellNumberValue((prev) => {
                            const newSeller = [...prev, sellNumber];
                            return newSeller[0];
                        });
                    }
                }
                console.log('number', number);
                console.log('idProduct', idProduct);
                console.log('sellNumber', sellNumber);
                setInformation(res.data.result);
            })
            .catch(() => {
                console.log('loi khong the show bill');
            });
    }, []);

    //take token do print
    useEffect(() => {
        const pathId = window.location.pathname.toString();
        const resultId = pathId.slice(21);
        console.log(resultId);
        axios
            .get(`https://dev-online-gateway.ghn.vn/shiip/public-api/v2/a5/gen-token?order_codes=${resultId}`, {
                headers: {
                    Token: '9c10964d-37ca-11ed-b608-8a2909007fb0',
                },
            })

            .then((res) => {
                console.log('token', res.data.data.token);
                setTokenValue(res.data.data.token);
            })
            .catch(() => {
                console.log('loi khong lay token');
            });
    }, []);

    const handlePrepare = () => {
        const deleteModalContainer = document.getElementById('delete-modal__container');
        //const deleteModalBox = document.getElementById('delete-modal__box');
        // if (!checkDelete && checkBox !== '') {
        deleteModalContainer.style.display = 'flex';
        // deleteModalContainer.style.position = 'fixed';
        // deleteModalBox.style.display = 'flex';
        // }
    };

    const handlePrepareHuy = () => {
        const deleteModalContainer = document.getElementById('delete-modal__container');
        //const deleteModalBox = document.getElementById('delete-modal__box');
        //deleteModalContainer.style.position = 'none';
        deleteModalContainer.style.display = 'none';
        // deleteModalBox.style.display = 'none';
    };

    const handlePrepareAgree = () => {
        const deleteModalContainer = document.getElementById('delete-modal__container');
        //const deleteModalBox = document.getElementById('delete-modal__box');
        //deleteModalContainer.style.position = 'none';
        deleteModalContainer.style.display = 'none';
        // setCheckDelete(true);
        // // deleteModalBox.style.display = 'none';
        handleUpdateBill();
    };

    function handleUpdateBill() {
        const pathId = window.location.pathname.toString();
        const resultId = pathId.slice(21);
        console.log(resultId);
        axios
            .put(`${process.env.REACT_APP_URL_NODEJS}/sellerdetailbill/bill/update/prepare`, {
                NB_id: JSON.parse(GetCookie('seller')).ND_id,
                DH_id: resultId || '',
                DH_trangthai: '2',
                TTDH_soluong: amountValue,
                SP_id: idProductValue,
                SP_soluongban: sellNumberValue,
            })

            .then((res) => {
                if (res.data.update) {
                    toast.success('Xác nhận thành công đơn hàng', {
                        position: toast.POSITION.TOP_CENTER,
                        className: `${cx('toast-message')}`,
                    });
                    setTimeout(() => {
                        window.open(`/seller/bill/detail/@${resultId}`, '_self', 1);
                    }, 3000);
                }
            })
            .catch(() => {
                console.log('loi khong the show bill');
            });
    }

    //Cancel Bill
    const handleCancelBill = () => {
        const deleteModalContainer = document.getElementById('cancel-modal__container');
        //const deleteModalBox = document.getElementById('delete-modal__box');
        //deleteModalContainer.style.position = 'none';
        deleteModalContainer.style.display = 'flex';
        // deleteModalBox.style.display = 'none';
    };

    const handleCancelBillHuy = () => {
        const deleteModalContainer = document.getElementById('cancel-modal__container');
        //const deleteModalBox = document.getElementById('delete-modal__box');
        //deleteModalContainer.style.position = 'none';
        deleteModalContainer.style.display = 'none';
        // deleteModalBox.style.display = 'none';
    };

    const handleCancelBillAgree = () => {
        const deleteModalContainer = document.getElementById('cancel-modal__container');
        //const deleteModalBox = document.getElementById('delete-modal__box');
        //deleteModalContainer.style.position = 'none';
        deleteModalContainer.style.display = 'none';
        // setCheckDelete(true);
        // // deleteModalBox.style.display = 'none';
        handleUpdateCancelBill();
    };

    function handleUpdateCancelBill() {
        const pathId = window.location.pathname.toString();
        const resultId = pathId.slice(21);
        //console.log('information Cancel', information[0].MTS_id);
        if (information[0].MTS_id !== undefined) {
            // axios
            //     .get(
            //         `https://dev-online-gateway.ghn.vgggn/shiip/public-api/v2/switch-status/cancel?order_codes=${resultId}`,
            //         {
            //             headers: {
            //                 Token: '9c10964d-37ca-11ed-b608-8a2909007fb0',
            //                 ShopId: information[0].MTS_id,
            //             },
            //         },
            //     )
            //     .then((res) => {
            //         console.log('cancel', res.data);
            //         axios
            //             .put(`${process.env.REACT_APP_URL_NODEJS}/sellerdetailbill/bill/update/prepare`, {
            //                 NB_id: JSON.parse(GetCookie('seller')).ND_id,
            //                 DH_id: resultId || '',
            //                 DH_trangthai: '5',
            //                 TTDH_soluong: 0,
            //                 SP_id: 0,
            //                 SP_soluongban: 0,
            //                 DH_ghichuhuy:
            //                     noteValue !== '' ? 'Chủ gian hàng hủy đơn (lý do): ' + noteValue : 'Chủ gian hàng hủy.',
            //             })

            //             .then((res) => {
            //                 if (res.data.update) {
            //                     toast.success('Hủy thành công đơn hàng', {
            //                         position: toast.POSITION.TOP_CENTER,
            //                         className: `${cx('toast-message')}`,
            //                     });
            //                     setTimeout(() => {
            //                         window.open(`/seller/bill/@all`, '_self', 1);
            //                     }, 3000);
            //                 }
            //             })
            //             .catch(() => {
            //                 console.log('loi khong the show bill');
            //             });
            //     })
            //     .catch((err) => {
            axios
                .put(`${process.env.REACT_APP_URL_NODEJS}/sellerdetailbill/bill/update/prepare`, {
                    NB_id: JSON.parse(GetCookie('seller')).ND_id,
                    DH_id: resultId || '',
                    DH_trangthai: '5',
                    TTDH_soluong: 0,
                    SP_id: 0,
                    SP_soluongban: 0,
                    DH_ghichuhuy:
                        noteValue !== '' ? 'Chủ gian hàng hủy đơn (lý do): ' + noteValue : 'Chủ gian hàng hủy.',
                })

                .then((res) => {
                    if (res.data.update) {
                        toast.success('Hủy thành công đơn hàng', {
                            position: toast.POSITION.TOP_CENTER,
                            className: `${cx('toast-message')}`,
                        });
                        const pathId = window.location.pathname.toString();
                        setTimeout(window.open(pathId, '_self', 1), 3000);
                    }
                })
                .catch(() => {
                    console.log('loi khong the show bill');
                });
            console.log('loi cancel');
            // });
        }
    }

    function takeDate(date) {
        const datevalue = new Date(date);
        let day = datevalue.getDate();
        let month = datevalue.getMonth() + 1;
        let year = datevalue.getFullYear();

        if (month < 10 && day >= 10) {
            return day + '-0' + month + '-' + year;
        } else if (month < 10 && day < 10) {
            return '0' + day + '-0' + month + year;
        } else if (month >= 10 && day < 10) {
            return '0' + day + '-' + month + '-' + year;
        } else if (month >= 10 && day >= 10) {
            return day + '-' + month + '-' + year;
        } else {
            return day + '-' + month + '-' + year;
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div id="delete-modal__container" className={cx('delete-modal__container')}>
                <div className={cx('delete-modal__box-xx')}>
                    <div className={cx('delete-modal__content')}>
                        <div className={cx('delete-modal__header-xx')}>
                            <div className={cx('delete-modal__header-inner-confirm')}>
                                <div className={cx('delete-modal__title')}>Xác nhận</div>
                            </div>
                            <div className={cx('delete-modal__header-inner-title-xx')}>
                                <div className={cx('delete-modal__title')}>Bạn có muốn xác nhận đơn hàng?</div>
                            </div>
                        </div>
                        <div className={cx('delete-modal__footer')}>
                            <div className={cx('delete-modal__footer-buttons')}>
                                <button
                                    type="button"
                                    className={cx('delete-button--normal')}
                                    onClick={handlePrepareHuy}
                                >
                                    <span>Hủy</span>
                                </button>
                                <button
                                    type="button"
                                    className={cx('delete-button--primary')}
                                    onClick={handlePrepareAgree}
                                >
                                    <span>Đồng ý</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}
            <div id="cancel-modal__container" className={cx('cancel-modal__container')}>
                <div className={cx('delete-modal__box')}>
                    <div className={cx('delete-modal__content')}>
                        <div className={cx('delete-modal__header')}>
                            <div className={cx('delete-modal__header-inner-confirm')}>
                                <div className={cx('delete-modal__title')}>Xác nhận</div>
                            </div>
                            <div className={cx('delete-modal__header-inner-title')}>
                                <div className={cx('delete-modal__title')}>Bạn có muốn hủy đơn hàng?</div>
                                <div className={cx('delete-modal__title')}>Hãy cho biết lý do (nếu có):</div>
                                <textarea
                                    className={cx('delete-modal__note')}
                                    onChange={(e) => setNoteValue(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                        <div className={cx('delete-modal__footer')}>
                            <div className={cx('delete-modal__footer-buttons')}>
                                <button
                                    type="button"
                                    className={cx('delete-button--normal')}
                                    onClick={handleCancelBillHuy}
                                >
                                    <span>Hủy</span>
                                </button>
                                <button
                                    type="button"
                                    className={cx('delete-button--primary')}
                                    onClick={handleCancelBillAgree}
                                >
                                    <span>Đồng ý</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {information !== ''
                ? information.map((info, index) => (
                      <div key={index} className={cx('wrapper')}>
                          <div className={cx('card-style')}>
                              <div className={cx('detail-card__content')}>
                                  <div className={cx('row-grid-section')}>
                                      <div card-style="margin: 0" className={cx('col-detail')}>
                                          <div className={cx('header-detail')}>
                                              <div className={cx('icon-detail')}>
                                                  <i className={cx('order-detail-title-icon')}>
                                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                                          <path d="M23.3 11.5h-1.8l.5-1.7c.2-.6-.2-1.3-.8-1.5-.6-.2-1.3.2-1.5.8l-.7 2.4h-3.6l.6-1.7c.2-.6-.2-1.3-.8-1.5s-1.3.2-1.5.8l-.7 2.4h-3c-.7 0-1.2.5-1.2 1.2s.5 1.2 1.2 1.2h2.2l-1 3.3H8.7c-.7 0-1.2.5-1.2 1.2s.5 1.2 1.2 1.2h1.7l-.7 2.3c-.2.6.2 1.3.8 1.5.1 0 .2.1.4.1.5 0 1-.3 1.1-.8l.9-3h3.6l-.7 2.3c-.2.6.2 1.3.8 1.5.1 0 .2.1.4.1.5 0 1-.3 1.1-.8l.9-3h3c.7 0 1.2-.5 1.2-1.2s-.5-1.2-1.2-1.2h-2.3l1-3.3h2.5c.7 0 1.2-.5 1.2-1.2s-.4-1.4-1.1-1.4zm-6 5.7h-3.6l1-3.3h3.6l-1 3.3zM11.4 2.1c0 .6-.4 1-1 1H6.8c-2 0-3.6 1.6-3.6 3.6V10c0 .6-.4 1-1 1s-1-.4-1-1V6.8c0-3.1 2.5-5.6 5.6-5.6h3.6c.6-.1 1 .4 1 .9zm9.5 26.4h4.3c2 0 3.6-1.6 3.6-3.6v-3.4c0-.6.4-1 1-1s1 .4 1 1v3.4c0 3.1-2.5 5.6-5.6 5.6h-4.3m0 0c-.6 0-1-.4-1-1s.4-1 1-1"></path>
                                                      </svg>
                                                  </i>
                                              </div>{' '}
                                              <div className={cx('name-detail')}>ID Đơn hàng</div>
                                          </div>{' '}
                                          <div className={cx('body-detail')}>
                                              <div>{info.DH_id}</div>
                                          </div>
                                      </div>{' '}
                                  </div>
                                  <div className={cx('section')}>
                                      <div className={cx('header-detail')}>
                                          <div className={cx('icon-detail')}>
                                              <i className={cx('order-detail-title-icon')}>
                                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                                      <path d="M17.7 29.2H22c.6 0 1 .4 1 1s-.4 1-1 1H10c-.6 0-1-.4-1-1s.4-1 1-1h4.3C11.3 25.4 5 17.1 5 12.4 5 6.2 9.9 1.2 16 1.2s11 5 11 11.2c0 4.7-6.3 13-9.3 16.8zM16 3.2c-5 0-9 4.2-9 9.4s9 15.6 9 15.6 9-10.4 9-15.6c0-5.2-4-9.4-9-9.4zm-5 9c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5-5-2.3-5-5zm8 0c0-1.7-1.3-3-3-3s-3 1.3-3 3 1.3 3 3 3 3-1.4 3-3z"></path>
                                                  </svg>
                                              </i>
                                          </div>{' '}
                                          <div className={cx('name-detail')}>Địa chỉ nhận hàng</div>{' '}
                                      </div>{' '}
                                      <div className={cx('body-detail')}>
                                          <div>
                                              {info.product[0].ND_hoten}, {'0' + info.product[0].ND_sdt.toString()}
                                          </div>{' '}
                                          <div className={cx('ship-address')}>
                                              {info.DH_diachi}
                                              {/* , Quận {info.DH_quan}, TP. {info.DH_thanhpho} */}
                                          </div>
                                      </div>
                                  </div>
                                  {/* <div className={cx('section')}>
                                      <div className={cx('header-detail')}>
                                          <div className={cx('icon-detail')}>
                                              <i className={cx('order-detail-title-icon')}>
                                                  <svg
                                                      version="1.1"
                                                      id="Layer_1"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      x="0px"
                                                      y="0px"
                                                      viewBox="0 0 32 32"
                                                  >
                                                      <style type="text/css"></style>
                                                      <path
                                                          // class="st0"
                                                          d="M27.8,27h-20c-1.1,0-2-0.9-2-2V3c0-1.1,0.9-2,2-2h20c1.1,0,2,0.9,2,2v22C29.8,26.1,28.9,27,27.8,27z M27.8,4 c0-0.6-0.4-1-1-1h-18c-0.6,0-1,0.4-1,1v20c0,0.6,0.4,1,1,1h18c0.6,0,1-0.4,1-1V4z M24.8,21h-14c-0.6,0-1-0.4-1-1c0-0.6,0.4-1,1-1h14 c0.6,0,1,0.4,1,1C25.8,20.6,25.3,21,24.8,21z M24.8,15h-14c-0.6,0-1-0.4-1-1c0-0.6,0.4-1,1-1h14c0.6,0,1,0.4,1,1 C25.8,14.6,25.3,15,24.8,15z M18.8,9h-8c-0.6,0-1-0.4-1-1c0-0.6,0.4-1,1-1h8c0.6,0,1,0.4,1,1C19.8,8.6,19.3,9,18.8,9z M25.8,31h-22 c-1.1,0-2-0.9-2-2V7c0-1.1,0.9-2,2-2v24h24C27.8,30.1,26.9,31,25.8,31z"
                                                      ></path>
                                                  </svg>
                                              </i>
                                          </div>{' '}
                                          <div className={cx('name-detail')}>Thông tin đơn hàng</div>{' '}
                                      </div>{' '}
                                      <div className={cx('body-detail')}>
                                          <div>Phương Anh, 84909959261</div>{' '}
                                          <div className={cx('ship-address')}>
                                              256 Nam Kỳ Khởi Nghĩa, Phường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh
                                          </div>
                                      </div>
                                      <div className={cx('image-container')}>
                                          <div className={cx('image-combine')}>
                                              <div className={cx('image-item-1')}>
                                                  <img
                                                      className={cx('image-item-detail')}
                                                      src="https://cf.shopee.vn/file/b7eb04c48688f851652397ef62cbaacd_tn"
                                                      alt=""
                                                  />
                                              </div>
                                          </div>{' '}
                                          <span className={cx('image-desc')}>Total 1 products</span>
                                      </div>
                                  </div> */}
                                  <div className={cx('section')}>
                                      <div className={cx('header-detail')}>
                                          <div className={cx('icon-detail')}>
                                              <i className={cx('order-detail-title-icon')}>
                                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                      <path
                                                          fillRule="evenodd"
                                                          d="M5,2 L5,3 L3,3 L3,14 L13,14 L13,3 L11,3 L11,2 L13,2 C13.5522847,2 14,2.44771525 14,3 L14,14 C14,14.5522847 13.5522847,15 13,15 L3,15 C2.44771525,15 2,14.5522847 2,14 L2,3 C2,2.44771525 2.44771525,2 3,2 L5,2 Z M6,2 L6,3 L10,3 L10,2 L6,2 Z M6,1 L10,1 C10.5522847,1 11,1.44771525 11,2 L11,3 C11,3.55228475 10.5522847,4 10,4 L6,4 C5.44771525,4 5,3.55228475 5,3 L5,2 C5,1.44771525 5.44771525,1 6,1 Z M5.5,6 L10.5,6 C10.7761424,6 11,6.22385763 11,6.5 C11,6.77614237 10.7761424,7 10.5,7 L5.5,7 C5.22385763,7 5,6.77614237 5,6.5 C5,6.22385763 5.22385763,6 5.5,6 Z M5.5,9 L10.5,9 C10.7761424,9 11,9.22385763 11,9.5 C11,9.77614237 10.7761424,10 10.5,10 L5.5,10 C5.22385763,10 5,9.77614237 5,9.5 C5,9.22385763 5.22385763,9 5.5,9 Z"
                                                      ></path>
                                                  </svg>
                                              </i>
                                          </div>{' '}
                                          <div className={cx('name-detail')}>Trạng thái đơn hàng</div>{' '}
                                      </div>{' '}
                                      <div className={cx('body-detail')}>
                                          <div>
                                              {info.DH_trangthai === 1
                                                  ? 'Chờ xác nhận'
                                                  : info.DH_trangthai === 2
                                                  ? 'Chờ lấy hàng'
                                                  : info.DH_trangthai === 3
                                                  ? 'Đang giao'
                                                  : info.DH_trangthai === 4
                                                  ? 'Đã giao'
                                                  : info.DH_trangthai === 5
                                                  ? 'Đã hủy, ' + info.DH_ghichuhuy.toString()
                                                  : '...'}
                                          </div>{' '}
                                      </div>
                                  </div>
                                  <div className={cx('section')}>
                                      <div className={cx('header-detail')}>
                                          <div className={cx('icon-detail')}>
                                              <i className={cx('order-detail-title-icon')}>
                                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                      <path
                                                          fillRule="evenodd"
                                                          d="M5,2 L5,3 L3,3 L3,14 L13,14 L13,3 L11,3 L11,2 L13,2 C13.5522847,2 14,2.44771525 14,3 L14,14 C14,14.5522847 13.5522847,15 13,15 L3,15 C2.44771525,15 2,14.5522847 2,14 L2,3 C2,2.44771525 2.44771525,2 3,2 L5,2 Z M6,2 L6,3 L10,3 L10,2 L6,2 Z M6,1 L10,1 C10.5522847,1 11,1.44771525 11,2 L11,3 C11,3.55228475 10.5522847,4 10,4 L6,4 C5.44771525,4 5,3.55228475 5,3 L5,2 C5,1.44771525 5.44771525,1 6,1 Z M5.5,6 L10.5,6 C10.7761424,6 11,6.22385763 11,6.5 C11,6.77614237 10.7761424,7 10.5,7 L5.5,7 C5.22385763,7 5,6.77614237 5,6.5 C5,6.22385763 5.22385763,6 5.5,6 Z M5.5,9 L10.5,9 C10.7761424,9 11,9.22385763 11,9.5 C11,9.77614237 10.7761424,10 10.5,10 L5.5,10 C5.22385763,10 5,9.77614237 5,9.5 C5,9.22385763 5.22385763,9 5.5,9 Z"
                                                      ></path>
                                                  </svg>
                                              </i>
                                          </div>{' '}
                                          <div className={cx('name-detail')}>Hình thức thanh toán</div>{' '}
                                      </div>{' '}
                                      <div className={cx('body-detail')}>
                                          <div>
                                              {info.DH_loaithanhtoan === 1
                                                  ? 'Thanh toán khi nhận hàng'
                                                  : info.DH_loaithanhtoan === 2
                                                  ? 'Thanh toán qua Paypal'
                                                  : '...'}
                                          </div>{' '}
                                      </div>
                                  </div>
                                  <div className={cx('section')}>
                                      <div className={cx('header-detail')}>
                                          <div className={cx('icon-detail')}>
                                              <i className={cx('order-detail-title-icon')}>
                                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                      <path
                                                          fillRule="evenodd"
                                                          d="M5,2 L5,3 L3,3 L3,14 L13,14 L13,3 L11,3 L11,2 L13,2 C13.5522847,2 14,2.44771525 14,3 L14,14 C14,14.5522847 13.5522847,15 13,15 L3,15 C2.44771525,15 2,14.5522847 2,14 L2,3 C2,2.44771525 2.44771525,2 3,2 L5,2 Z M6,2 L6,3 L10,3 L10,2 L6,2 Z M6,1 L10,1 C10.5522847,1 11,1.44771525 11,2 L11,3 C11,3.55228475 10.5522847,4 10,4 L6,4 C5.44771525,4 5,3.55228475 5,3 L5,2 C5,1.44771525 5.44771525,1 6,1 Z M5.5,6 L10.5,6 C10.7761424,6 11,6.22385763 11,6.5 C11,6.77614237 10.7761424,7 10.5,7 L5.5,7 C5.22385763,7 5,6.77614237 5,6.5 C5,6.22385763 5.22385763,6 5.5,6 Z M5.5,9 L10.5,9 C10.7761424,9 11,9.22385763 11,9.5 C11,9.77614237 10.7761424,10 10.5,10 L5.5,10 C5.22385763,10 5,9.77614237 5,9.5 C5,9.22385763 5.22385763,9 5.5,9 Z"
                                                      ></path>
                                                  </svg>
                                              </i>
                                          </div>{' '}
                                          <div className={cx('name-detail')}>Trạng thái thanh toán</div>{' '}
                                      </div>{' '}
                                      <div className={cx('body-detail')}>
                                          <div>
                                              {info.DH_trangthaiTT === 1
                                                  ? 'Chưa thanh toán'
                                                  : info.DH_trangthaiTT === 2
                                                  ? 'Đã thanh toán'
                                                  : '...'}
                                          </div>{' '}
                                      </div>
                                  </div>

                                  <div className={cx('section')}>
                                      <div className={cx('header-detail')}>
                                          <div className={cx('icon-detail')}>
                                              <i className={cx('order-detail-title-icon')}>
                                                  <FontAwesomeIcon className={cx('')} icon={faCalendarDays} />
                                              </i>
                                          </div>{' '}
                                          <div className={cx('name-detail')}>Ngày đặt hàng:</div>{' '}
                                      </div>{' '}
                                      <div className={cx('body-detail')}>
                                          <div>{takeDate(info.DH_ngay)}</div>{' '}
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className={cx('card-style')}>
                              <div className={cx('detail-card__content')}>
                                  <div className={cx('remote-component')}>
                                      <div className={cx('card-style od-card')}>
                                          <div className={cx('od-card-head')}>
                                              <div>
                                                  <div className={cx('header-detail')}>
                                                      <div className={cx('icon-detail')}>
                                                          <i className={cx('order-detail-title-icon')}>
                                                              <svg
                                                                  version="1.1"
                                                                  id="Layer_1"
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  x="0px"
                                                                  y="0px"
                                                                  viewBox="0 0 32 32"
                                                              >
                                                                  <path d="M27.8,27.1H8.5c-1,0-1.8-0.8-1.8-1.8v-1.8h1.8v0.9c0,0.5,0.4,0.9,0.9,0.9h17.6c0.5,0,0.9-0.4,0.9-0.9V12.2 c0-0.5-0.4-0.9-0.9-0.9H26v-0.9c0-0.5-0.4-0.9-0.9-0.9h2.6c1,0,1.8,0.8,1.8,1.8v14C29.6,26.3,28.8,27.1,27.8,27.1z M22.5,21.9H3.2 c-1,0-1.8-0.8-1.8-1.8v-14c0-1,0.8-1.8,1.8-1.8h19.3c1,0,1.8,0.8,1.8,1.8v14C24.3,21.1,23.5,21.9,22.5,21.9z M22.5,6.9 c0-0.5-0.4-0.9-0.9-0.9H4.1c-0.5,0-0.9,0.4-0.9,0.9v12.3c0,0.5,0.4,0.9,0.9,0.9h17.6c0.5,0,0.9-0.4,0.9-0.9V6.9z M15.5,14.9 c0,1.1-0.8,2.2-2.1,2.4v1.1h-1v-1.1c-1.4-0.2-2.2-1.1-2.2-1.1l0.8-1.1c0,0,0.9,0.9,1.9,0.9c0.6,0,1.1-0.4,1.1-1 c0-1.4-3.7-1.2-3.7-3.7c0-1.2,0.9-2.1,2.1-2.3V7.8h1v1.1c1.3,0.1,1.9,0.9,1.9,0.9L14.8,11c0,0-0.8-0.7-1.8-0.7c-0.7,0-1.1,0.4-1.1,1 C11.8,12.6,15.5,12.4,15.5,14.9z"></path>
                                                              </svg>
                                                          </i>
                                                      </div>{' '}
                                                      <div className={cx('name-detail')}>Thông tin thanh toán</div>
                                                  </div>
                                              </div>
                                          </div>
                                          <div className={cx('product-list')}>
                                              <div className={cx('product-list-item-head')}>
                                                  <div className={cx('no-detail')}>STT</div>
                                                  <div className={cx('product-detail-item')}>Sản phẩm</div>
                                                  <div className={cx('price-detail')}>Đơn Giá</div>
                                                  <div className={cx('qty-detail')}>Số lượng</div>
                                                  <div className={cx('subtotal-detail')}>Thành tiền</div>
                                              </div>
                                              {info.product.map((pro, index) => (
                                                  <div key={index}>
                                                      <div className={cx('product-list-item')}>
                                                          <div className={cx('no-detail')}>{index + 1}</div>{' '}
                                                          <div className={cx('product-item')}>
                                                              <div className={cx('product-image')}>
                                                                  <img
                                                                      className={cx('image-item-detail-product')}
                                                                      src={
                                                                          pro.SP_image ||
                                                                          'https://cf.shopee.vn/file/f105d17bdb77bec4d53c2c4cc907ba97_tn'
                                                                      }
                                                                      alt=""
                                                                  />
                                                              </div>{' '}
                                                              <div className={cx('product-detail-title')}>
                                                                  {' '}
                                                                  <div
                                                                      title="SET NẠ 10-30 VIÊN, MẶT NẠ NÉN BEAUTY TOOLS BẢN LỤA  , BỎ TÚI ĐI DU LỊCH TIỆN LỢI"
                                                                      className={cx('product-name-title')}
                                                                  >
                                                                      {pro.SP_ten}
                                                                  </div>{' '}
                                                                  {/* <div className={cx('product-meta')}>
                                                                      <div>Phân loại:&nbsp;10 viên</div>{' '}
                                                                  </div> */}
                                                              </div>
                                                          </div>{' '}
                                                          <div className={cx('price-detail')}>
                                                              {pro.TTDH_gia.toString().length > 6
                                                                  ? formatCash(
                                                                        pro.TTDH_gia *
                                                                            ((100 - pro.TTDH_phantram) / 100),
                                                                    )
                                                                  : Math.round(
                                                                        formatCash(
                                                                            pro.TTDH_gia *
                                                                                ((100 - pro.TTDH_phantram) / 100),
                                                                        ),
                                                                    ).toFixed(3)}
                                                          </div>
                                                          <div className={cx('qty-detail')}>{pro.TTDH_soluong}</div>{' '}
                                                          <div className={cx('subtotal-detail')}>
                                                              {pro.TTDH_gia.toString().length > 6
                                                                  ? formatCash(
                                                                        pro.TTDH_gia *
                                                                            ((100 - pro.TTDH_phantram) / 100) *
                                                                            pro.TTDH_soluong,
                                                                    )
                                                                  : formatCash(
                                                                        Number(
                                                                            Math.round(
                                                                                formatCash(
                                                                                    pro.TTDH_gia *
                                                                                        ((100 - pro.TTDH_phantram) /
                                                                                            100),
                                                                                ),
                                                                            )
                                                                                .toFixed(3)
                                                                                .replace('.', ''),
                                                                        ) * pro.TTDH_soluong,
                                                                    )}
                                                          </div>
                                                      </div>
                                                  </div>
                                              ))}
                                              {/* <div>
                                                  <div className={cx('product-list-item')}>
                                                      <div className={cx('no-detail')}>2</div>{' '}
                                                      <div className={cx('product-item')}>
                                                          <div className={cx('product-image')}>
                                                              <img
                                                                  className={cx('image-item-detail-product')}
                                                                  src="https://cf.shopee.vn/file/f105d17bdb77bec4d53c2c4cc907ba97_tn"
                                                                  alt=""
                                                              />
                                                          </div>{' '}
                                                          <div className={cx('product-detail-title')}>
                                                              {' '}
                                                              <div
                                                                  title="SET NẠ 10-30 VIÊN, MẶT NẠ NÉN BEAUTY TOOLS BẢN LỤA  , BỎ TÚI ĐI DU LỊCH TIỆN LỢI"
                                                                  className={cx('product-name-title')}
                                                              >
                                                                  SET NẠ 10-30 VIÊN, MẶT NẠ NÉN BEAUTY TOOLS BẢN LỤA ,
                                                                  BỎ TÚI ĐI DU LỊCH TIỆN LỢI
                                                              </div>{' '}
                                                              <div className={cx('product-meta')}>
                                                                  <div>Phân loại:&nbsp;10 viên</div>{' '}
                                                              </div>
                                                          </div>
                                                      </div>{' '}
                                                      <div className={cx('price-detail')}>15.000</div>
                                                      <div className={cx('qty-detail')}>1</div>{' '}
                                                      <div className={cx('subtotal-detail')}>15.000</div>
                                                  </div>
                                              </div> */}
                                          </div>
                                          <div className={cx('payment-info-details')}>
                                              <div className={cx('income-container')}>
                                                  <div className={cx('income-label-column')}>
                                                      <div className={cx('income-item-subtotal')}>
                                                          <div className={cx('income-label')}>Tổng tiền sản phẩm</div>
                                                      </div>{' '}
                                                      <div className={cx('income-group')}> </div>{' '}
                                                      <div className={cx('income-item-subtotal')}>
                                                          <div className={cx('income-label')}>
                                                              <div>Phí vận chuyển (không tính trợ giá)</div>{' '}
                                                              <div className={cx('flex-break')}></div>{' '}
                                                          </div>
                                                      </div>{' '}
                                                      <div className={cx('income-item-subtotal')}>
                                                          <div className={cx('income-label')}>
                                                              Phí vận chuyển người mua trả
                                                          </div>
                                                      </div>{' '}
                                                      <div className={cx('income-item-total-subtotal')}>
                                                          <div className={cx('income-label')}>
                                                              Doanh thu
                                                              <div className={cx('question-popover--light')}>
                                                                  <div className={cx('shopee-popover__ref')}>
                                                                      <i className={cx('shopee-icon')}>
                                                                          <svg
                                                                              id="Layer_1"
                                                                              data-name="Layer 1"
                                                                              xmlns="http://www.w3.org/2000/svg"
                                                                              viewBox="0 0 32 32"
                                                                          >
                                                                              <defs>
                                                                                  <style></style>
                                                                              </defs>
                                                                              <title>question</title>
                                                                              <path
                                                                                  className={cx('cls-1')}
                                                                                  d="M32,16A16,16,0,1,0,16,32,16,16,0,0,0,32,16Zm-2,0A14,14,0,1,1,16,2,14,14,0,0,1,30,16ZM10.56,12.12a5.51,5.51,0,0,1,1.68-3.74A5.33,5.33,0,0,1,16,7a5.6,5.6,0,0,1,3.92,1.36,4.47,4.47,0,0,1,1.49,3.46,4.81,4.81,0,0,1-.51,2.2A8,8,0,0,1,19,16.26a6.82,6.82,0,0,0-1.74,2,6.57,6.57,0,0,0-.32,2.43h-2a8.15,8.15,0,0,1,.49-3.29,7.41,7.41,0,0,1,1.82-2.23,7.65,7.65,0,0,0,1.65-1.82A2.93,2.93,0,0,0,19.21,12a3.15,3.15,0,0,0-.87-2.29A3,3,0,0,0,16,8.79q-2.76,0-3.24,3.33H10.56ZM17.18,25H14.83V22.52h2.36V25Z"
                                                                              ></path>
                                                                          </svg>
                                                                      </i>
                                                                  </div>{' '}
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </div>{' '}
                                                  <div className={cx('income-value-column')}>
                                                      <div className={cx('income-item-subtotal')}>
                                                          <div className={cx('income-value')}>
                                                              ₫{formatCash(info.DH_tongtien)}
                                                          </div>
                                                      </div>{' '}
                                                      <div className={cx('income-group')}> </div>{' '}
                                                      <div className={cx('income-item-subtotal')}>
                                                          <div className={cx('income-value')}>
                                                              ₫{formatCash(info.DH_phivanchuyen) || 0}
                                                          </div>{' '}
                                                      </div>{' '}
                                                      <div className={cx('income-item-subtotal')}>
                                                          <div className={cx('income-value')}>
                                                              ₫
                                                              {info.DH_loaithanhtoan !== 2
                                                                  ? formatCash(
                                                                        info.DH_tongtien + info.DH_phivanchuyen,
                                                                    ) || 0
                                                                  : '0'}
                                                          </div>
                                                      </div>{' '}
                                                      <div className={cx('income-item-income-subtotal')}>
                                                          <div className={cx('income-value-big-total')}>
                                                              ₫{formatCash(info.DH_tongtien)}
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          {info.DH_trangthai === 1 && info.DH_trangthai !== 3 ? (
                              <div className={cx('grid-right')}>
                                  <button className={cx('add-action')} onClick={handlePrepare}>
                                      <span className={cx('shopee-add-title')}>Chuẩn bị đơn hàng</span>
                                  </button>
                                  <button className={cx('add-action')} onClick={handleCancelBill}>
                                      <span className={cx('shopee-add-title')}>Hủy đơn hàng</span>
                                  </button>
                              </div>
                          ) : info.DH_trangthai === 2 ? (
                              <div className={cx('grid-right-print')}>
                                  <a
                                      //`https://dev-online-gateway.ghn.vn/a5/public-api/printA5?token=${tokenValue}` ||
                                      href={`${process.env.REACT_APP_URL_FRONTEND}/seller/bill/detail/print/@${idOrderValue}`}
                                      target={'_blank'}
                                      rel="noreferrer"
                                      className={cx('add-action')}
                                  >
                                      <span className={cx('shopee-add-title')}>In hóa đơn</span>
                                  </a>
                                  {/* <a
                                      href={`http://localhost:3000/seller/bill/detail/print/@${info.DH_id}`}
                                      target={'_blank'}
                                      rel="noreferrer"
                                      className={cx('add-action')}
                                  >
                                      <span className={cx('shopee-add-title')}>In hóa đơn</span>
                                  </a> */}
                              </div>
                          ) : (
                              ''
                          )}
                          <ToastContainer />
                      </div>
                  ))
                : ''}
        </div>
    );
}

export default SellerDetailBill;
