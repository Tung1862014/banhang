import { faMagnifyingGlass, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import GetCookie from '~/components/Hook/GetCookies';
import styles from './HistoryBill.module.scss';

const cx = classNames.bind(styles);

function HistoryBill() {
    const [sellerValue, setSellerValue] = useState('');
    const [sellerName, setSellerName] = useState('');
    const [orderValue, setOrderValue] = useState('');
    const [evaluateValue, setEvaluateValue] = useState('');
    //const [price, setPrice] = useState('');
    const [transportFee, setTransportFee] = useState('');
    const [statusBill, setStatusBill] = useState('');
    const [statusClick, setStatusClick] = useState('');
    const [billId, setBillId] = useState('');
    const [billEvaluate, setBillEvaluate] = useState('');
    const [idProductEvaluate, setIdProductEvaluate] = useState('');
    const [billDate, setBillDate] = useState('');

    ///////////////////////////////////////////////
    const [IdValue, setIdValue] = useState('');
    const [idProduct, setIdProduct] = useState('');
    const [takeStar, setTakeStar] = useState('');
    const [textValue, setTextValue] = useState('');
    ////////////////////////////////////////////////
    const [cancelIdBill, setCancelIdBill] = useState('');
    //const [idMTSValue, setIdMTSValue] = useState('');
    ///////////////////////////////////////////////////search
    const [searchValue, setSearchValue] = useState('');
    const [searchTextValue, setSearchTextValue] = useState('');
    const [visible, setVisible] = useState(3);

    const [noteCancleBill, setNoteCancleBill] = useState('');
    const [noteValue, setNoteValue] = useState('');

    const [idOrderStar, setIdOrderStar] = useState('');

    console.log('setBillEvaluate : ', billEvaluate);
    useEffect(() => {
        const pathId = window.location.pathname.toString();
        const resultId = pathId.slice(23);
        console.log('resultId', resultId);
        if (GetCookie('usrin') !== undefined) {
            if (resultId === 'all') {
                handlerClickAll();
            } else if (resultId === '1') {
                handlerClickType1();
            } else if (resultId === '2') {
                handlerClickType2();
            } else if (resultId === '3') {
                handlerClickType3();
            } else if (resultId === '4') {
                handlerClickType4();
            } else if (resultId === '5') {
                handlerClickType5();
            } else {
                setSearchValue(resultId);
            }
        }
    }, []);

    useEffect(() => {
        const handleShowButtonMoreItem = () => {
            const showItem = document.getElementById('btn_btn-solid-primary');
            showItem.style.display = 'none';
        };
        const handleShowButtonShowMoreItem = (items) => {
            const showItem = document.getElementById('btn_btn-solid-primary');
            showItem.style.display = 'flex';
        };
        if (GetCookie('usrin') !== undefined) {
            axios
                .get(
                    `${process.env.REACT_APP_URL_NODEJS}/historybill/cart/show/all?ND_id=${
                        JSON.parse(GetCookie('usrin')).ND_id
                    }&DH_trangthai=${statusClick}&keyword=${searchValue}`,
                )
                .then((res) => {
                    console.log('data', res.data);
                    setOrderValue(res.data.results);
                    let idOder = [];
                    for (let i = 0; i < res.data.results.length; i++) {
                        if (!idOder.includes(res.data.results[i].DH_id)) {
                            idOder.push(res.data.results[i].DH_id);
                        }
                    }
                    if (idOder.length === 0) {
                        handleShowButtonMoreItem();
                    } else if (idOder.length <= 3) {
                        handleShowButtonMoreItem();
                    } else if (idOder.length > 3) {
                        handleShowButtonShowMoreItem();
                    }
                    if (searchValue !== '') {
                        if (res.data.results[0].DH_trangthai === 1) {
                            handlerClickType1();
                        } else if (res.data.results[0].DH_trangthai === 2) {
                            handlerClickType2();
                        } else if (res.data.results[0].DH_trangthai === 3) {
                            handlerClickType3();
                        } else if (res.data.results[0].DH_trangthai === 4) {
                            handlerClickType4();
                        } else {
                            handlerClickType5();
                        }
                    }
                })
                .catch((err) => {
                    console.log('loi');
                });
        }
    }, [statusClick, searchValue]);

    useEffect(() => {
        let sellerArr = [];
        let sellerName = [];
        let transportFees = [];
        let statusBills = [];
        let billIdValue = [];
        let billDateValue = [];
        let noteCancleBillValue = [];
        //let sumnumber = 0;
        //let price = 0;

        for (let i = 0; i < orderValue.length; i++) {
            if (!billIdValue.includes(orderValue[i].DH_id)) {
                sellerArr.push(orderValue[i].NB_id);
                sellerName.push(orderValue[i].seller.MTS_ten);
                transportFees.push(orderValue[i].DH_phivanchuyen);
                statusBills.push(orderValue[i].DH_trangthai);
                billIdValue.push(orderValue[i].DH_id);
                billDateValue.push(orderValue[i].DH_ngay);
                noteCancleBillValue.push(orderValue[i].DH_ghichuhuy);
            }

            //sumnumber += 1;
            // price +=
            //     orderValue[i].product.SP_gia *
            //     orderValue[i].TTDH_soluong *
            //     ((100 - orderValue[i].product.SP_khuyenmai) / 100);
        }
        //console.log('sellerArr', sellerArr);
        if (sellerArr.length > 0) {
            setSellerValue(sellerArr);
            setSellerName(sellerName);
            setTransportFee(transportFees);
            setStatusBill(statusBills);

            setBillId(billIdValue);
            setBillDate(billDateValue);
            setNoteCancleBill(noteCancleBillValue);
        }

        //setSumNumber(sumnumber);
        //setPrice(price);
    }, [orderValue]);

    useEffect(() => {
        if (GetCookie('usrin') !== undefined) {
            axios
                .get(
                    `${process.env.REACT_APP_URL_NODEJS}/historybill/cart/show/evaluate?ND_id=${
                        JSON.parse(GetCookie('usrin')).ND_id
                    }`,
                )
                .then((res) => {
                    console.log('evaluate', res.data);
                    let evaluateArr = [];
                    let idProductEvaluate = [];

                    for (let i = 0; i < res.data.result.length; i++) {
                        if (!evaluateArr.includes(res.data.result[i].DH_id)) {
                            evaluateArr.push(res.data.result[i].DH_id);
                            idProductEvaluate.push(res.data.result[i].SP_id);
                        }
                    }
                    console.log('sellerArr', evaluateArr);
                    if (evaluateArr.length > 0) {
                        setBillEvaluate((prev) => {
                            const newSeller = [...prev, evaluateArr];
                            return newSeller[0];
                        });
                        setIdProductEvaluate((prev) => {
                            const newSeller = [...prev, idProductEvaluate];
                            return newSeller[0];
                        });
                    }
                    setEvaluateValue(res.data.result);
                })
                .catch((err) => {
                    console.log('loi');
                });
        }
    }, []);

    function handleStatusEvaluate(evalue) {
        for (let i = 0; i < billEvaluate.length; i++) {
            if (evalue.toString() === billEvaluate[i].toString()) {
                return true;
            }
        }
        return false;
    }

    function handleButtonEvaluate(productid) {
        console.log('IdVaproductidlue', typeof productid);
        for (let i = 0; i < evaluateValue.length; i++) {
            if (IdValue === evaluateValue[i].DH_id) {
                if (productid === evaluateValue[i].SP_id) {
                    return true;
                }
            }
        }
        return false;
    }

    //tinh tien
    function formatCash(str) {
        return str
            .toString()
            .split('')
            .reverse()
            .reduce((prev, next, index) => {
                return (index % 3 ? next : next + '.') + prev;
            });
    }

    //tinh ngay
    function takeDate(date) {
        const dateValue = new Date(date);
        let day = dateValue.getDate();
        let month = dateValue.getMonth() + 1;
        let year = dateValue.getFullYear();

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

    const handlePriceSeller = (bill, index) => {
        let price = 0;
        //console.log('bill', bill);
        for (let i = 0; i < orderValue.length; i++) {
            if (bill === orderValue[i].DH_id) {
                price = orderValue[i].DH_tongtien;
                // orderValue[i].product.SP_gia *
                // orderValue[i].TTDH_soluong *
                // ((100 - orderValue[i].product.SP_khuyenmai) / 100);
            }
            if (i === orderValue.length - 1) {
                return price + transportFee[index];
            }
        }
        //console.log('index', price);
    };

    //handle click status
    const handlerClickAll = (search) => {
        const typeAll = document.getElementById('vAkdD0all');
        const type1 = document.getElementById('vAkdD01');
        const type2 = document.getElementById('vAkdD02');
        const type3 = document.getElementById('vAkdD03');
        const type4 = document.getElementById('vAkdD04');
        const type5 = document.getElementById('vAkdD05');

        typeAll.style.color = '#ee4d2d';
        type1.style.color = '#161823';
        type2.style.color = '#161823';
        type3.style.color = '#161823';
        type4.style.color = '#161823';
        type5.style.color = '#161823';
        typeAll.style.borderColor = '#ee4d2d';
        type1.style.borderColor = '';
        type2.style.borderColor = '';
        type3.style.borderColor = '';
        type4.style.borderColor = '';
        type5.style.borderColor = '';

        setStatusClick('all');
        if (search === 'search') {
            setSearchValue('');
            setSearchTextValue('');
            const searchId = document.getElementById('search-value-id');
            searchId.value = '';
        }
    };

    const handlerClickType1 = (search) => {
        const typeAll = document.getElementById('vAkdD0all');
        const type1 = document.getElementById('vAkdD01');
        const type2 = document.getElementById('vAkdD02');
        const type3 = document.getElementById('vAkdD03');
        const type4 = document.getElementById('vAkdD04');
        const type5 = document.getElementById('vAkdD05');

        typeAll.style.color = '#161823';
        type1.style.color = '#ee4d2d';
        type2.style.color = '#161823';
        type3.style.color = '#161823';
        type4.style.color = '#161823';
        type5.style.color = '#161823';
        typeAll.style.borderColor = '';
        type1.style.borderColor = '#ee4d2d';
        type2.style.borderColor = '';
        type3.style.borderColor = '';
        type4.style.borderColor = '';
        type5.style.borderColor = '';
        setStatusClick('waitForConfirmation');
        if (search === 'search') {
            setSearchValue('');
            setSearchTextValue('');
            const searchId = document.getElementById('search-value-id');
            searchId.value = '';
        }
    };

    const handlerClickType2 = (search) => {
        const typeAll = document.getElementById('vAkdD0all');
        const type1 = document.getElementById('vAkdD01');
        const type2 = document.getElementById('vAkdD02');
        const type3 = document.getElementById('vAkdD03');
        const type4 = document.getElementById('vAkdD04');
        const type5 = document.getElementById('vAkdD05');

        typeAll.style.color = '#161823';
        type1.style.color = '#161823';
        type2.style.color = '#ee4d2d';
        type3.style.color = '#161823';
        type4.style.color = '#161823';
        type5.style.color = '#161823';
        typeAll.style.borderColor = '';
        type1.style.borderColor = '';
        type2.style.borderColor = '#ee4d2d';
        type3.style.borderColor = '';
        type4.style.borderColor = '';
        type5.style.borderColor = '';
        setStatusClick('waitInLine');
        if (search === 'search') {
            setSearchValue('');
            setSearchTextValue('');
            const searchId = document.getElementById('search-value-id');
            searchId.value = '';
        }
    };

    const handlerClickType3 = (search) => {
        const typeAll = document.getElementById('vAkdD0all');
        const type1 = document.getElementById('vAkdD01');
        const type2 = document.getElementById('vAkdD02');
        const type3 = document.getElementById('vAkdD03');
        const type4 = document.getElementById('vAkdD04');
        const type5 = document.getElementById('vAkdD05');

        typeAll.style.color = '#161823';
        type1.style.color = '#161823';
        type2.style.color = '#161823';
        type3.style.color = '#ee4d2d';
        type4.style.color = '#161823';
        type5.style.color = '#161823';
        typeAll.style.borderColor = '';
        type1.style.borderColor = '';
        type2.style.borderColor = '';
        type3.style.borderColor = '#ee4d2d';
        type4.style.borderColor = '';
        type5.style.borderColor = '';
        setStatusClick('deliveryInProgress');
        if (search === 'search') {
            setSearchValue('');
            setSearchTextValue('');
            const searchId = document.getElementById('search-value-id');
            searchId.value = '';
        }
    };

    const handlerClickType4 = (search) => {
        const typeAll = document.getElementById('vAkdD0all');
        const type1 = document.getElementById('vAkdD01');
        const type2 = document.getElementById('vAkdD02');
        const type3 = document.getElementById('vAkdD03');
        const type4 = document.getElementById('vAkdD04');
        const type5 = document.getElementById('vAkdD05');

        typeAll.style.color = '#161823';
        type1.style.color = '#161823';
        type2.style.color = '#161823';
        type3.style.color = '#161823';
        type4.style.color = '#ee4d2d';
        type5.style.color = '#161823';
        typeAll.style.borderColor = '';
        type1.style.borderColor = '';
        type2.style.borderColor = '';
        type3.style.borderColor = '';
        type4.style.borderColor = '#ee4d2d';
        type5.style.borderColor = '';
        setStatusClick('delivered');
        if (search === 'search') {
            setSearchValue('');
            setSearchTextValue('');
            const searchId = document.getElementById('search-value-id');
            searchId.value = '';
        }
    };

    const handlerClickType5 = (search) => {
        const typeAll = document.getElementById('vAkdD0all');
        const type1 = document.getElementById('vAkdD01');
        const type2 = document.getElementById('vAkdD02');
        const type3 = document.getElementById('vAkdD03');
        const type4 = document.getElementById('vAkdD04');
        const type5 = document.getElementById('vAkdD05');

        typeAll.style.color = '#161823';
        type1.style.color = '#161823';
        type2.style.color = '#161823';
        type3.style.color = '#161823';
        type4.style.color = '#161823';
        type5.style.color = '#ee4d2d';
        typeAll.style.borderColor = '';
        type1.style.borderColor = '';
        type2.style.borderColor = '';
        type3.style.borderColor = '';
        type4.style.borderColor = '';
        type5.style.borderColor = '#ee4d2d';
        setStatusClick('cancelled');
        if (search === 'search') {
            setSearchValue('');
            setSearchTextValue('');
            const searchId = document.getElementById('search-value-id');
            searchId.value = '';
        }
    };

    //open form danh gia
    const handleOpenFormEvaluate = (value) => {
        console.log('setIdValue fff: ', value);
        const formeValuate = document.getElementById('shop-modal__transition');
        const btnFinish = document.getElementById('btn-solid-primary_wxJWI8');
        formeValuate.style.display = 'flex';
        btnFinish.style.display = 'none';
        setIdValue(value);
    };

    //close form danh gia
    const handleCloseFormEvaluate = () => {
        const formeValuate = document.getElementById('shop-modal__transition');
        const nostar = document.getElementById('shop-popup-form__main-container');
        const star = document.getElementById('shop-popup-form__main-container-star');
        const btnFinish = document.getElementById('btn-solid-primary_wxJWI8');

        formeValuate.style.display = 'none';
        nostar.style.display = 'inline-block';
        star.style.display = 'none';
        btnFinish.style.display = 'none';
    };

    //take id product
    const handleTakeIdProduct = (idproduct, idorder) => {
        console.log('idproduct: ', idproduct);
        const nostar = document.getElementById('shop-popup-form__main-container');
        const star = document.getElementById('shop-popup-form__main-container-star');
        const btnFinish = document.getElementById('btn-solid-primary_wxJWI8');

        nostar.style.display = 'none';
        star.style.display = 'inline-block';
        btnFinish.style.display = 'inline-block';
        setIdProduct(idproduct);
        setIdOrderStar(idorder);
    };

    //take star evaluate
    const handleEvaluateStar = (star) => {
        setTakeStar(star);
    };

    //Save/Update evaluate
    function handleSubmitEvaluate(billEvaluate) {
        // IdValue
        // idProduct
        // takeStar
        // textValue
        const dateValue = new Date();
        let day = dateValue.getDate();
        let month = dateValue.getMonth() + 1;
        let year = dateValue.getFullYear();
        let YMD;

        if (month < 10 && day >= 10) {
            YMD = year + '-0' + month + '-' + day;
        } else if (month < 10 && day < 10) {
            YMD = year + '-0' + month + '-0' + day;
        } else if (month >= 10 && day < 10) {
            YMD = year + '-' + month + '-0' + day;
        } else if (month >= 10 && day >= 10) {
            YMD = year + '-' + month + '-' + day;
        } else {
            YMD = year + '-' + month + '-' + day;
        }
        let url;

        console.log('IdValue', IdValue);
        if (billEvaluate.length > 0) {
            for (let i = 0; i < billEvaluate.length; i++) {
                if (IdValue.toString() === billEvaluate[i].toString() && idProduct === idProductEvaluate[i]) {
                    url = `${process.env.REACT_APP_URL_NODEJS}/historybill/evaluate/update/star/text`;
                }
                if (i === billEvaluate.length - 1) {
                    if (url === undefined) {
                        url = `${process.env.REACT_APP_URL_NODEJS}/historybill/evaluate/star/text`;
                    }
                }
            }
        } else {
            if (url === undefined) {
                url = `${process.env.REACT_APP_URL_NODEJS}/historybill/evaluate/star/text`;
            }
        }
        console.log('url IdValue: ', IdValue);
        console.log('url billEvaluate: ', billEvaluate);
        if (GetCookie('usrin') !== undefined) {
            axios
                .post(url, {
                    ND_id: JSON.parse(GetCookie('usrin')).ND_id,
                    DH_id: IdValue,
                    SP_id: idProduct,
                    DG_sosao: takeStar,
                    DG_mota: textValue,
                    DG_ngayDG: YMD,
                })
                .then((res) => {
                    console.log('data', res.data);
                    const pathId = window.location.pathname.toString();
                    window.open(pathId, '_self', 1);
                })
                .catch((err) => {
                    console.log('loi evaluate');
                });
        }
    }

    //handle delete form
    function handleOpenDelete(billValue, index) {
        console.log('handleDelete', index);
        const deleteModalContainer = document.getElementById('delete-modal__container');
        //const deleteModalBox = document.getElementById('delete-modal__box');
        // if (!checkDelete && checkBox !== '') {
        deleteModalContainer.style.display = 'flex';
        // deleteModalContainer.style.position = 'fixed';
        // deleteModalBox.style.display = 'flex';
        // }
        //setIdMTSValue(Number(orderValue[index].seller.MTS_id));
        console.log('index', typeof Number(orderValue[index].seller.MTS_id));
        setCancelIdBill(billValue);
    }

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
        //setCheckDelete(true);
        // deleteModalBox.style.display = 'none';
        handleCancelBill();
    };
    //huy don hang
    function handleCancelBill() {
        // axios
        //     .get(
        //         `https://dev-online-gateway.ghn.vggggggggn/shiip/public-api/v2/switch-status/cancel?order_codes=${cancelIdBill}`,
        //         {
        //             headers: {
        //                 Token: '9c10964d-37ca-11ed-b608-8a2909007fb0',
        //                 ShopId: idMTSValue,
        //             },
        //         },
        //     )
        //     .then((res) => {
        //         console.log('cancel', res.data);
        //         axios
        //             .put(`${process.env.REACT_APP_URL_NODEJS}/historybill/update/status/bill`, {
        //                 DH_id: cancelIdBill,
        //                 DH_ghichuhuy:
        //                     noteValue !== '' ? 'Khách hàng hủy đơn (lý do): ' + noteValue : 'Khách hàng hủy đơn.',
        //             })
        //             .then((res) => {
        //                 console.log('DH', res.data);
        //             })
        //             .catch((err) => {
        //                 console.log('loi update bill');
        //             });
        //     })
        //     .catch((err) => {
        axios
            .put(`${process.env.REACT_APP_URL_NODEJS}/historybill/update/status/bill`, {
                DH_id: cancelIdBill,
                DH_ghichuhuy: noteValue !== '' ? 'Khách hàng hủy đơn (lý do): ' + noteValue : 'Khách hàng hủy đơn.',
            })
            .then((res) => {
                console.log('DH', res.data);
                toast.success('Hủy thành công', {
                    position: toast.POSITION.TOP_CENTER,
                });
                const pathId = window.location.pathname.toString();
                setTimeout(window.open(pathId, '_self', 1), 2000);
            })
            .catch((err) => {
                console.log('loi update bill');
            });
        console.log('loi cancel');
        // });
    }

    ///seach bill following id bill
    const handleSearchBill = () => {
        const searchId = document.getElementById('search-value-id');
        setSearchValue(searchId.value);
    };

    const handleShowMoreItems = () => {
        setVisible((prev) => prev + 3);
        let items = visible + 3;
        handleShowButtonMoreItem(items);
    };

    const handleShowButtonMoreItem = (items) => {
        if (billId.length <= items) {
            const showItem = document.getElementById('btn_btn-solid-primary');
            showItem.style.display = 'none';
        }
    };

    return (
        <>
            {GetCookie('usrin') !== undefined ? (
                <div className={cx('wrapper')}>
                    <div id="delete-modal__container" className={cx('delete-modal__container')}>
                        <div id="delete-modal__box" className={cx('delete-modal__box')}>
                            <div className={cx('delete-modal__content')}>
                                <div className={cx('delete-modal__header')}>
                                    <div className={cx('delete-modal__header-inner-confirm')}>
                                        <div className={cx('delete-modal__title')}>Xác nhận</div>
                                    </div>
                                    <div className={cx('delete-modal__header-inner-title')}>
                                        <div className={cx('delete-modal__title')}>Bạn có muốn Hủy đơn hàng này?</div>
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
                                            onClick={handleDeleteHuy}
                                        >
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
                    <div className={cx('GBcYbK')}>
                        <div className={cx('Tfo7DW')}>
                            <Link
                                id="link_search-value"
                                to={`/history/purchase/keys=${searchTextValue}`}
                                className={cx('Tfo7DW-btn')}
                                onClick={() => handleSearchBill()}
                            >
                                <FontAwesomeIcon className={cx('Tfo7DW-icon')} icon={faMagnifyingGlass} />
                            </Link>
                            <input
                                // autoComplete="off"
                                id="search-value-id"
                                placeholder="Tìm kiếm theo ID đơn hàng "
                                defaultValue={searchTextValue}
                                onChange={(e) => setSearchTextValue(e.target.value)}
                            ></input>
                        </div>
                        <div className={cx('_0obGFe')}>
                            <div className={cx('_0obGFe-1')}>
                                <Link
                                    id="vAkdD0all"
                                    className={cx('vAkdD0all')}
                                    to="/history/purchase/type=all"
                                    onClick={() => handlerClickAll('search')}
                                >
                                    <span className={cx('_0rjE9m')}>Tất cả</span>
                                </Link>
                                <Link
                                    id="vAkdD01"
                                    className={cx('vAkdD01')}
                                    to="/history/purchase/type=1"
                                    onClick={() => handlerClickType1('search')}
                                >
                                    <span className={cx('_0rjE9m')}>Chờ xác nhận</span>
                                </Link>
                                <Link
                                    id="vAkdD02"
                                    className={cx('vAkdD02')}
                                    to="/history/purchase/type=2"
                                    onClick={() => handlerClickType2('search')}
                                >
                                    <span className={cx('_0rjE9m')}>Chờ lấy hàng</span>
                                </Link>
                            </div>
                            <div className={cx('_0obGFe-2')}>
                                <Link
                                    id="vAkdD03"
                                    className={cx('vAkdD03')}
                                    to="/history/purchase/type=3"
                                    onClick={() => handlerClickType3('search')}
                                >
                                    <span className={cx('_0rjE9m')}>Đang giao</span>
                                </Link>
                                <Link
                                    id="vAkdD04"
                                    className={cx('vAkdD04')}
                                    to="/history/purchase/type=4"
                                    onClick={() => handlerClickType4('search')}
                                >
                                    <span className={cx('_0rjE9m')}>Đã giao</span>
                                </Link>
                                <Link
                                    id="vAkdD05"
                                    className={cx('vAkdD05')}
                                    to="/history/purchase/type=5"
                                    onClick={() => handlerClickType5('search')}
                                >
                                    <span className={cx('_0rjE9m')}>Đã Hủy</span>
                                </Link>
                            </div>
                        </div>
                        {/* / */}
                        {/* <div className={cx('LHWdmn')}>
                    <div className={cx('bU5w7c')}>
                        <div className={cx('A849D8')}>
                            <img
                                className={cx('A849D8-image')}
                                src={
                                    'https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/5fafbb923393b712b96488590b8f781f.png'
                                }
                                alt=""
                            />
                        </div>
                        <div className={cx('hKbGrP')}>Chưa có đơn hàng</div>
                    </div>
                </div> */}
                        {orderValue.length === 0 ? (
                            <div className={cx('no-order-product')}>Không có đơn hàng nào</div>
                        ) : (
                            ''
                        )}
                        {billId !== '' && orderValue.length > 0
                            ? billId.slice(0, visible).map((bill, index) => (
                                  <div key={index}>
                                      <div className={cx('tF2pJg')}>
                                          <div>
                                              <div className={cx('_6nAGBW')}>
                                                  <div className={cx('_1ox39j')}>
                                                      <div className={cx('_9bLyA')}>
                                                          <div className={cx('mzsqa6')}>{sellerName[index]}</div>
                                                          <Link
                                                              className={cx('aYsWZ')}
                                                              to={`/shop/name=${sellerValue[index]}`}
                                                          >
                                                              <button className={cx('stardust-button')}>
                                                                  <svg
                                                                      enableBackground="new 0 0 15 15"
                                                                      viewBox="0 0 15 15"
                                                                      x="0"
                                                                      y="0"
                                                                      className={cx('icon-btn-shop')}
                                                                  >
                                                                      <path d="m15 4.8c-.1-1-.8-2-1.6-2.9-.4-.3-.7-.5-1-.8-.1-.1-.7-.5-.7-.5h-8.5s-1.4 1.4-1.6 1.6c-.4.4-.8 1-1.1 1.4-.1.4-.4.8-.4 1.1-.3 1.4 0 2.3.6 3.3l.3.3v3.5c0 1.5 1.1 2.6 2.6 2.6h8c1.5 0 2.5-1.1 2.5-2.6v-3.7c.1-.1.1-.3.3-.3.4-.8.7-1.7.6-3zm-3 7c0 .4-.1.5-.4.5h-8c-.3 0-.5-.1-.5-.5v-3.1c.3 0 .5-.1.8-.4.1 0 .3-.1.3-.1.4.4 1 .7 1.5.7.7 0 1.2-.1 1.6-.5.5.3 1.1.4 1.6.4.7 0 1.2-.3 1.8-.7.1.1.3.3.5.4.3.1.5.3.8.3zm.5-5.2c0 .1-.4.7-.3.5l-.1.1c-.1 0-.3 0-.4-.1s-.3-.3-.5-.5l-.5-1.1-.5 1.1c-.4.4-.8.7-1.4.7-.5 0-.7 0-1-.5l-.6-1.1-.5 1.1c-.3.5-.6.6-1.1.6-.3 0-.6-.2-.9-.8l-.5-1-.7 1c-.1.3-.3.4-.4.6-.1 0-.3.1-.3.1s-.4-.4-.4-.5c-.4-.5-.5-.9-.4-1.5 0-.1.1-.4.3-.5.3-.5.4-.8.8-1.2.7-.8.8-1 1-1h7s .3.1.8.7c.5.5 1.1 1.2 1.1 1.8-.1.7-.2 1.2-.5 1.5z"></path>
                                                                  </svg>
                                                                  <span>xem gian hàng</span>
                                                              </button>
                                                          </Link>
                                                          <div className={cx('mzsqa67')}>
                                                              ID đơn hàng: {billId[index]}
                                                          </div>
                                                          <div className={cx('mzsqa67')}>
                                                              Ngày đặt hàng: {takeDate(billDate[index])}
                                                          </div>
                                                      </div>
                                                      <div className={cx('WPNwG4')}>
                                                          <div className={cx('RcKSvW')}>
                                                              <div className={cx('_2GgWAA')}>
                                                                  <span className={cx('_0vCgDb')}>
                                                                      {statusBill[index] === 1
                                                                          ? 'Chờ xác nhận'
                                                                          : statusBill[index] === 2
                                                                          ? 'Chờ lấy hàng'
                                                                          : statusBill[index] === 3
                                                                          ? 'Đang giao'
                                                                          : statusBill[index] === 4
                                                                          ? 'Giao hàng thành công'
                                                                          : 'Đã hủy'}
                                                                  </span>
                                                              </div>
                                                          </div>

                                                          <div className={cx('l4WFo0')}>
                                                              {handleStatusEvaluate(billId[index])
                                                                  ? 'Đã đánh giá'
                                                                  : 'Chưa đánh giá'}
                                                          </div>
                                                      </div>
                                                  </div>
                                                  <div className={cx('_60q_NM')}></div>
                                                  {orderValue !== ''
                                                      ? orderValue.map((order, index) =>
                                                            bill === order.DH_id ? (
                                                                <Link
                                                                    key={index}
                                                                    to={`/detail/product/nameid${order.SP_id}`}
                                                                >
                                                                    <div className={cx('giUtSy')}>
                                                                        <div className={cx('vdofqJ')}>
                                                                            <div>
                                                                                <span className={cx('QkIuzE')}>
                                                                                    <div></div>
                                                                                    <div className={cx('hDGdsD')}>
                                                                                        <div className={cx('_50XPwl')}>
                                                                                            <div
                                                                                                className={cx(
                                                                                                    'shop-image__wrapper',
                                                                                                )}
                                                                                            >
                                                                                                <div
                                                                                                    className={cx(
                                                                                                        'shop-image__content',
                                                                                                    )}
                                                                                                >
                                                                                                    <img
                                                                                                        src={
                                                                                                            `${order.product.SP_image}` ||
                                                                                                            'https://cf.shopee.vn/file/27d849ca5cd1fe66281025a2a0bb2df1_tn'
                                                                                                        }
                                                                                                        alt=""
                                                                                                        className={cx(
                                                                                                            'shop-image__content--blur',
                                                                                                        )}
                                                                                                    />
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className={cx('tODfT4')}>
                                                                                            <div>
                                                                                                <div
                                                                                                    className={cx(
                                                                                                        'QJqUaT',
                                                                                                    )}
                                                                                                >
                                                                                                    <span
                                                                                                        className={cx(
                                                                                                            'WVc4Oc',
                                                                                                        )}
                                                                                                    >
                                                                                                        {
                                                                                                            order
                                                                                                                .product
                                                                                                                .SP_ten
                                                                                                        }
                                                                                                    </span>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div>
                                                                                                <div
                                                                                                    className={cx(
                                                                                                        '_9ca9GU',
                                                                                                    )}
                                                                                                ></div>
                                                                                                <div
                                                                                                    className={cx(
                                                                                                        'qGisqd',
                                                                                                    )}
                                                                                                >
                                                                                                    x
                                                                                                    {order.TTDH_soluong}
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className={cx('QRFJX')}>
                                                                                        <div>
                                                                                            {order.TTDH_phantram !==
                                                                                            0 ? (
                                                                                                <span
                                                                                                    className={cx(
                                                                                                        'd12Axb',
                                                                                                    )}
                                                                                                >
                                                                                                    ₫
                                                                                                    {formatCash(
                                                                                                        order.TTDH_gia,
                                                                                                    )}
                                                                                                </span>
                                                                                            ) : (
                                                                                                ''
                                                                                            )}
                                                                                            <span
                                                                                                className={cx(
                                                                                                    'ghw9hb_igidiy',
                                                                                                )}
                                                                                            >
                                                                                                ₫
                                                                                                {order.TTDH_gia !==
                                                                                                    undefined &&
                                                                                                order.TTDH_gia.toString()
                                                                                                    .length > 6
                                                                                                    ? formatCash(
                                                                                                          order.TTDH_gia *
                                                                                                              ((100 -
                                                                                                                  order.TTDH_phantram) /
                                                                                                                  100),
                                                                                                      )
                                                                                                    : order.TTDH_phantram !==
                                                                                                      0
                                                                                                    ? Math.round(
                                                                                                          formatCash(
                                                                                                              order.TTDH_gia *
                                                                                                                  ((100 -
                                                                                                                      order.TTDH_phantram) /
                                                                                                                      100),
                                                                                                          ),
                                                                                                      ).toFixed(3)
                                                                                                    : formatCash(
                                                                                                          order.TTDH_gia,
                                                                                                      )}
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                            <div className={cx('_472J0A')}></div>
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            ) : (
                                                                ''
                                                            ),
                                                        )
                                                      : ''}
                                              </div>
                                              {/* / */}
                                          </div>
                                          <div className={cx('CqYika')}></div>
                                          <div className={cx('KinvoL')}>
                                              <div className={cx('BAMNqz')}>
                                                  <div className={cx('Ge6yU5')}>Phí vận chuyển:</div>
                                                  <div className={cx('TDMlX1')}>₫{formatCash(transportFee[index])}</div>
                                              </div>
                                              <div className={cx('BAMNqz')}>
                                                  <div className={cx('Ge6yU5')}>Tổng số tiền:</div>
                                                  <div className={cx('TDMlX1')}>
                                                      ₫{formatCash(handlePriceSeller(bill, index))}
                                                  </div>
                                              </div>
                                          </div>
                                          {statusBill[index] === 5 ? (
                                              <div className={cx('RcKSvW')}>
                                                  <div className={cx('_2GgWAA')}>
                                                      <span className={cx('_0vCgDb')}>{noteCancleBill[index]}</span>
                                                  </div>
                                              </div>
                                          ) : (
                                              ''
                                          )}
                                          <div className={cx('_1ERzqw')}>
                                              <div className={cx('NIZAp8')}>
                                                  {statusBill[index] === 1 ? (
                                                      <div className={cx('_8vTqu9')}>
                                                          <button
                                                              className={cx('stardust-button--primary_Kz9HeM')}
                                                              onClick={() => handleOpenDelete(billId[index], index)}
                                                          >
                                                              Hủy
                                                          </button>
                                                      </div>
                                                  ) : statusBill[index] === 2 ? (
                                                      ''
                                                  ) : statusBill[index] === 3 ? (
                                                      ''
                                                  ) : statusBill[index] === 4 ? (
                                                      handleStatusEvaluate(billId[index]) ? (
                                                          <div className={cx('VN6h8')}>
                                                              <button
                                                                  className={cx('stardust-button--secondary_Kz9HeM')}
                                                                  onClick={() => handleOpenFormEvaluate(billId[index])}
                                                              >
                                                                  Xem đánh giá Shop
                                                              </button>
                                                          </div>
                                                      ) : (
                                                          <div className={cx('VN6h8')}>
                                                              <button
                                                                  className={cx('stardust-button--secondary_Kz9HeM')}
                                                                  onClick={() => handleOpenFormEvaluate(billId[index])}
                                                              >
                                                                  Đánh Giá sản phẩm
                                                              </button>
                                                          </div>
                                                      )
                                                  ) : (
                                                      ''
                                                  )}
                                              </div>
                                          </div>
                                          {/* / */}
                                      </div>
                                  </div>
                              ))
                            : ''}
                        <div id="btn_btn-solid-primary" className={cx('btn_btn-solid-primary')}>
                            <button className={cx('btn_btn-solid-primary-suggestions')} onClick={handleShowMoreItems}>
                                Xem Thêm
                            </button>
                        </div>
                    </div>

                    {/* ////////////////////////////////////////////////////////////// */}
                    <div id="shop-modal__transition" className={cx('shop-modal__transition')}>
                        <div className={cx('shop-modal__transition-enter-done')}>
                            <div className={cx('shop-popup__overlay')}></div>
                            <div className={cx('shop-popup__container')}>
                                <div className={cx('shop-popup-form_7-ljVc')}>
                                    <div className={cx('shop-popup-form__header')}>
                                        <div className={cx('shop-popup-form__title')}>Đánh giá sản phẩm</div>
                                    </div>

                                    <div className={cx('shop-popup-form__main')}>
                                        <div
                                            id="shop-popup-form__main-container"
                                            className={cx('shop-popup-form__main-container')}
                                        >
                                            {orderValue !== ''
                                                ? orderValue.map((order, index) =>
                                                      IdValue === order.DH_id ? (
                                                          <div
                                                              key={index}
                                                              className={cx('rating-modal-edit-item__container')}
                                                          >
                                                              <div className={cx('OeeSb')}>
                                                                  <a
                                                                      className={cx('_4dmaxT_H5b3yv')}
                                                                      href="/-Mã-99FMCG1-giảm-8-đơn-250K-Combo-bánh-tráng-phơi-sương-MUỐI-RUỐC-HÀNH-PHI-i.60853163.17904188796"
                                                                      target="_blank"
                                                                      rel="noopener noreferrer"
                                                                  >
                                                                      <div className={cx('shop-image__wrapper_Uh')}>
                                                                          <div className={cx('shop-image__content')}>
                                                                              <div
                                                                                  className={cx(
                                                                                      'shop-image__content--blur',
                                                                                  )}
                                                                              >
                                                                                  <img
                                                                                      src={order.product.SP_image || ''}
                                                                                      alt=""
                                                                                  />{' '}
                                                                              </div>
                                                                          </div>
                                                                      </div>
                                                                      <div className={cx('_3qB3N8')}>
                                                                          <div className={cx('YbNw-v')}>
                                                                              {order.product.SP_ten}
                                                                          </div>
                                                                      </div>
                                                                  </a>
                                                                  {order.product.SP_trangthai !== 2 ? (
                                                                      <button
                                                                          className={cx('shop-button-outline')}
                                                                          onClick={() =>
                                                                              handleTakeIdProduct(
                                                                                  order.product.SP_id,
                                                                                  order.DH_id,
                                                                              )
                                                                          }
                                                                      >
                                                                          <span>
                                                                              {handleButtonEvaluate(order.product.SP_id)
                                                                                  ? 'Cập nhật'
                                                                                  : 'Đánh giá'}
                                                                          </span>
                                                                      </button>
                                                                  ) : (
                                                                      ''
                                                                  )}
                                                              </div>
                                                              {evaluateValue !== ''
                                                                  ? evaluateValue.map((evalua, index) =>
                                                                        order.DH_id === evalua.DH_id &&
                                                                        order.product.SP_id === evalua.SP_id ? (
                                                                            <div key={index} className={cx('tRi-ot')}>
                                                                                <div className={cx('DfB_wQ')}>
                                                                                    <div
                                                                                        className={cx(
                                                                                            'rating-stars__container',
                                                                                        )}
                                                                                    >
                                                                                        <div
                                                                                            className={cx(
                                                                                                'rating-stars__star_ytO7le',
                                                                                            )}
                                                                                        >
                                                                                            <FontAwesomeIcon
                                                                                                className={cx(
                                                                                                    evalua.DG_sosao ===
                                                                                                        5 ||
                                                                                                        evalua.DG_sosao ===
                                                                                                            4 ||
                                                                                                        evalua.DG_sosao ===
                                                                                                            3 ||
                                                                                                        evalua.DG_sosao ===
                                                                                                            2 ||
                                                                                                        evalua.DG_sosao ===
                                                                                                            1
                                                                                                        ? '_9MGQf1'
                                                                                                        : '_9MGQf',
                                                                                                )}
                                                                                                icon={faStar}
                                                                                            />
                                                                                        </div>
                                                                                        <div
                                                                                            className={cx(
                                                                                                'rating-stars__star_ytO7le',
                                                                                            )}
                                                                                        >
                                                                                            <FontAwesomeIcon
                                                                                                className={cx(
                                                                                                    evalua.DG_sosao ===
                                                                                                        5 ||
                                                                                                        evalua.DG_sosao ===
                                                                                                            4 ||
                                                                                                        evalua.DG_sosao ===
                                                                                                            3 ||
                                                                                                        evalua.DG_sosao ===
                                                                                                            2
                                                                                                        ? '_9MGQf1'
                                                                                                        : '_9MGQf',
                                                                                                )}
                                                                                                icon={faStar}
                                                                                            />
                                                                                        </div>
                                                                                        <div
                                                                                            className={cx(
                                                                                                'rating-stars__star_ytO7le',
                                                                                            )}
                                                                                        >
                                                                                            <FontAwesomeIcon
                                                                                                className={cx(
                                                                                                    evalua.DG_sosao ===
                                                                                                        5 ||
                                                                                                        evalua.DG_sosao ===
                                                                                                            4 ||
                                                                                                        evalua.DG_sosao ===
                                                                                                            3
                                                                                                        ? '_9MGQf1'
                                                                                                        : '_9MGQf',
                                                                                                )}
                                                                                                icon={faStar}
                                                                                            />
                                                                                        </div>
                                                                                        <div
                                                                                            className={cx(
                                                                                                'rating-stars__star_ytO7le',
                                                                                            )}
                                                                                        >
                                                                                            <FontAwesomeIcon
                                                                                                className={cx(
                                                                                                    evalua.DG_sosao ===
                                                                                                        5 ||
                                                                                                        evalua.DG_sosao ===
                                                                                                            4
                                                                                                        ? '_9MGQf1'
                                                                                                        : '_9MGQf',
                                                                                                )}
                                                                                                icon={faStar}
                                                                                            />
                                                                                        </div>
                                                                                        <div
                                                                                            className={cx(
                                                                                                'rating-stars__star_ytO7le',
                                                                                            )}
                                                                                        >
                                                                                            <FontAwesomeIcon
                                                                                                className={cx(
                                                                                                    evalua.DG_sosao ===
                                                                                                        5
                                                                                                        ? '_9MGQf1'
                                                                                                        : '_9MGQf',
                                                                                                )}
                                                                                                icon={faStar}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className={cx('iSbtQg')}>
                                                                                        {evalua.DG_mota}
                                                                                    </div>
                                                                                    <div className={cx('qyTV2S')}>
                                                                                        {evalua.DG_ngayCN !==
                                                                                        '0000-00-00' ? (
                                                                                            <span>
                                                                                                Cập nhật mới nhất:
                                                                                                {takeDate(
                                                                                                    evalua.DG_ngayCN,
                                                                                                )}
                                                                                            </span>
                                                                                        ) : (
                                                                                            takeDate(evalua.DG_ngayDG)
                                                                                        )}
                                                                                    </div>
                                                                                    <div className={cx('DLPrlG_exFBM')}>
                                                                                        <div className={cx('qCsf4o')}>
                                                                                            phản hồi của Người Bán
                                                                                        </div>
                                                                                        <div className={cx('_4I27Dz')}>
                                                                                            {evalua.DG_traloi}❣️
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ) : (
                                                                            ''
                                                                        ),
                                                                    )
                                                                  : ''}
                                                          </div>
                                                      ) : (
                                                          ''
                                                      ),
                                                  )
                                                : ''}
                                        </div>
                                        <div
                                            id="shop-popup-form__main-container-star"
                                            className={cx('shop-popup-form__main-container-star')}
                                        >
                                            <div className={cx('rating-modal-edit-item__container')}>
                                                <div className={cx('rating-modal-handler__container--last')}>
                                                    {orderValue !== ''
                                                        ? orderValue.map((order, index) =>
                                                              order.DH_id === idOrderStar &&
                                                              idProduct === order.product.SP_id ? (
                                                                  <a
                                                                      key={index}
                                                                      className={cx('_4dmaxT_9EbMRg')}
                                                                      href="/-Mã-99FMCG1-giảm-8-đơn-250K-Combo-bánh-tráng-phơi-sương-MUỐI-RUỐC-HÀNH-PHI-i.60853163.17904188796"
                                                                      target="_blank"
                                                                      rel="noopener noreferrer"
                                                                  >
                                                                      <div className={cx('shop-image__wrapper_Uh')}>
                                                                          <div className={cx('shop-image__content')}>
                                                                              <div
                                                                                  className={cx(
                                                                                      'shop-image__content--blur',
                                                                                  )}
                                                                              >
                                                                                  <img
                                                                                      src={order.product.SP_image}
                                                                                      alt=""
                                                                                  />{' '}
                                                                              </div>
                                                                          </div>
                                                                      </div>
                                                                      <div className={cx('_3qB3N8')}>
                                                                          <div className={cx('YbNw-v')}>
                                                                              {order.product.SP_ten}
                                                                          </div>
                                                                      </div>
                                                                  </a>
                                                              ) : (
                                                                  ''
                                                              ),
                                                          )
                                                        : ''}

                                                    <div style={{ margin: '20px 0px' }}>
                                                        <div className={cx('uuEQZS')}>
                                                            <div className={cx('OU7Gr2')}>
                                                                <span>Chất lượng sản phẩm</span>
                                                            </div>
                                                            <div style={{ paddingLeft: '5px' }}>
                                                                <div
                                                                    className={cx(
                                                                        'rating-stars__star--clickable_ytO7le',
                                                                    )}
                                                                >
                                                                    <FontAwesomeIcon
                                                                        className={cx(
                                                                            takeStar === '5' ||
                                                                                takeStar === '4' ||
                                                                                takeStar === '3' ||
                                                                                takeStar === '2' ||
                                                                                takeStar === '1'
                                                                                ? 'rating-stars__star-rewiew'
                                                                                : 'rating-stars__star-rewiew1',
                                                                        )}
                                                                        icon={faStar}
                                                                        onClick={() => handleEvaluateStar('1')}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div
                                                                    className={cx(
                                                                        'rating-stars__star--clickable_ytO7le',
                                                                    )}
                                                                >
                                                                    <FontAwesomeIcon
                                                                        className={cx(
                                                                            takeStar === '5' ||
                                                                                takeStar === '4' ||
                                                                                takeStar === '3' ||
                                                                                takeStar === '2'
                                                                                ? 'rating-stars__star-rewiew'
                                                                                : 'rating-stars__star-rewiew1',
                                                                        )}
                                                                        icon={faStar}
                                                                        onClick={() => handleEvaluateStar('2')}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div
                                                                    className={cx(
                                                                        'rating-stars__star--clickable_ytO7le',
                                                                    )}
                                                                >
                                                                    <FontAwesomeIcon
                                                                        className={cx(
                                                                            takeStar === '5' ||
                                                                                takeStar === '4' ||
                                                                                takeStar === '3'
                                                                                ? 'rating-stars__star-rewiew'
                                                                                : 'rating-stars__star-rewiew1',
                                                                        )}
                                                                        icon={faStar}
                                                                        onClick={() => handleEvaluateStar('3')}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div
                                                                    className={cx(
                                                                        'rating-stars__star--clickable_ytO7le',
                                                                    )}
                                                                >
                                                                    <FontAwesomeIcon
                                                                        className={cx(
                                                                            takeStar === '5' || takeStar === '4'
                                                                                ? 'rating-stars__star-rewiew'
                                                                                : 'rating-stars__star-rewiew1',
                                                                        )}
                                                                        icon={faStar}
                                                                        onClick={() => handleEvaluateStar('4')}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div
                                                                    className={cx(
                                                                        'rating-stars__star--clickable_ytO7le',
                                                                    )}
                                                                >
                                                                    <FontAwesomeIcon
                                                                        className={cx(
                                                                            takeStar === '5'
                                                                                ? 'rating-stars__star-rewiew'
                                                                                : 'rating-stars__star-rewiew1',
                                                                        )}
                                                                        icon={faStar}
                                                                        onClick={() => handleEvaluateStar('5')}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={cx('YR5V7C')}>
                                                        <div style={{ position: 'relative' }}>
                                                            <textarea
                                                                className={cx('plAxjc')}
                                                                placeholder="Hãy chia sẻ những điều bạn thích về sản phẩm này với những người mua khác nhé."
                                                                onChange={(e) => setTextValue(e.target.value)}
                                                            ></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('shop-popup-form__footer')}>
                                        <button className={cx('cancel-btn')} onClick={handleCloseFormEvaluate}>
                                            Thoát
                                        </button>
                                        <button
                                            id="btn-solid-primary_wxJWI8"
                                            type="button"
                                            className={cx('btn-solid-primary_wxJWI8')}
                                            onClick={() => handleSubmitEvaluate(billEvaluate)}
                                        >
                                            Hoàn thành
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={cx('order-no-login')}>Bạn cần đăng nhập để xem đơn hàng của mình</div>
            )}
            <ToastContainer />
        </>
    );
}

export default HistoryBill;
