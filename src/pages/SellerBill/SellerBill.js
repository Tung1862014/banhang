import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { SidberSeller } from '~/actions/SidberSeller';
import GetCookie from '~/components/Hook/GetCookies';
import styles from './SellerBill.module.scss';
import SellerBillPage from './SellerBillPage';

const cx = classNames.bind(styles);

function SellerBill() {
    const [bill, setBill] = useState([]);
    const [statusConfirm, setStatusConfirm] = useState('');
    const [statusConfirmed, setStatusConfirmed] = useState('');
    const [statusTransport, setStatusTransport] = useState('');
    const [statusDelivered, setStatusDelivered] = useState('');
    const [statusCancelOrder, setStatusCancelOrder] = useState('');
    const [number, setNumber] = useState('');
    const [checkStatus, setCheckStatus] = useState('');
    const [searchValue, setSearchValue] = useState('');

    const [checkProduct, setCheckProduct] = useState('');

    const [dateValue1, setDateValue1] = useState('');
    const [dateValue2, setDateValue2] = useState('');
    const [activeTurnover, setActiveTurnover] = useState(
        `${process.env.REACT_APP_URL_NODEJS}/sellerbill/bill/show/all?NB_id=${
            JSON.parse(GetCookie('seller')).ND_id
        }&DH_trangthai=${checkStatus}&tungay=${dateValue1}&denngay=${dateValue2}`,
    );

    const [checkStatistical, setCheckStatistical] = useState('');

    const SidebarReducer = useSelector((state) => state.sidebarSeller.list);
    const dispatchSignIn = useDispatch();

    useEffect(() => {
        const pathId = window.location.pathname.toString();
        const resultId = pathId.slice(14);
        if (resultId === 'all') {
            handlerClickAll();
        } else if (resultId === 'confirm') {
            handlerClickAllConfirm();
        } else if (resultId === 'confirmed') {
            handlerClickAllConfirmed();
        } else if (resultId === 'transport') {
            handlerClickAllTransport();
        } else if (resultId === 'delivered') {
            handlerClickAllDelivered();
        } else {
            handlerClickAllCancelOrder();
        }
    }, [SidebarReducer]);

    useEffect(() => {
        setActiveTurnover(
            `${process.env.REACT_APP_URL_NODEJS}/sellerbill/bill/show/all?NB_id=${
                JSON.parse(GetCookie('seller')).ND_id
            }&DH_trangthai=${checkStatus}&tungay=${dateValue1}&denngay=${dateValue2}`,
        );
    }, [checkStatus]);

    useEffect(() => {
        axios
            .get(`${activeTurnover}`)

            .then((res) => {
                console.log('result bill', res.data.result);
                setBill(res.data.result);
            })
            .catch(() => {
                console.log('loi khong the show bill');
            });
    }, [activeTurnover]);

    useEffect(() => {
        if (
            checkStatus !== '' &&
            dateValue1 !== '' &&
            dateValue2 !== '' &&
            handleTestDate(dateValue1, dateValue2) &&
            checkStatistical !== ''
        ) {
            setActiveTurnover(
                `${process.env.REACT_APP_URL_NODEJS}/sellerbill/bill/show/all?NB_id=${
                    JSON.parse(GetCookie('seller')).ND_id
                }&DH_trangthai=${checkStatus}&tungay=${dateValue1}&denngay=${dateValue2}`,
            );
        } else if (checkStatus !== '' && dateValue1 === '' && dateValue2 === '') {
            setActiveTurnover(
                `${process.env.REACT_APP_URL_NODEJS}/sellerbill/bill/show/all?NB_id=${
                    JSON.parse(GetCookie('seller')).ND_id
                }&DH_trangthai=${checkStatus}&tungay=${dateValue1}&denngay=${dateValue2}`,
            );
        }
    }, [checkStatus, dateValue1, dateValue2, checkStatistical]);

    useEffect(() => {
        if (
            dateValue1 !== '' &&
            dateValue2 !== '' &&
            handleTestDate(dateValue1, dateValue2) &&
            checkStatistical !== ''
        ) {
            axios
                .get(
                    `${process.env.REACT_APP_URL_NODEJS}/sellerbill/bill/show/number?NB_id=${
                        JSON.parse(GetCookie('seller')).ND_id
                    }&tungay=${dateValue1}&denngay=${dateValue2}`,
                )
                .then((res) => {
                    setStatusConfirm(res.data.statusconfirm[0].statusconfirm);
                    setStatusConfirmed(res.data.statusconfirmed[0].statusconfirmed);
                    setStatusTransport(res.data.statustransport[0].statustransport);
                    setStatusDelivered(res.data.statusdelivered[0].statusdelivered);
                    setStatusCancelOrder(res.data.statuscancelOrder[0].statuscancelOrder);
                    setNumber(res.data.number[0].number);
                })
                .catch(() => {
                    console.log('loi khong the show bill');
                });
        } else if (dateValue1 === '' && dateValue2 === '') {
            console.log('ggggggggggggggggggg');
            axios
                .get(
                    `${process.env.REACT_APP_URL_NODEJS}/sellerbill/bill/show/number?NB_id=${
                        JSON.parse(GetCookie('seller')).ND_id
                    }&tungay=${dateValue1}&denngay=${dateValue2}`,
                )
                .then((res) => {
                    setStatusConfirm(res.data.statusconfirm[0].statusconfirm);
                    setStatusConfirmed(res.data.statusconfirmed[0].statusconfirmed);
                    setStatusTransport(res.data.statustransport[0].statustransport);
                    setStatusDelivered(res.data.statusdelivered[0].statusdelivered);
                    setStatusCancelOrder(res.data.statuscancelOrder[0].statuscancelOrder);
                    setNumber(res.data.number[0].number);
                })
                .catch(() => {
                    console.log('loi khong the show bill rong');
                });
        }
    }, [dateValue1, dateValue2, checkStatistical]);

    useEffect(() => {
        const action = SidberSeller(checkProduct);
        dispatchSignIn(action);
    }, [checkProduct, dispatchSignIn]);

    const handlerClickAll = () => {
        const tab1 = document.getElementById('tabs__tab1');
        const tab2 = document.getElementById('tabs__tab2');
        const tab3 = document.getElementById('tabs__tab3');
        const tab4 = document.getElementById('tabs__tab4');
        const tab5 = document.getElementById('tabs__tab5');
        const tab6 = document.getElementById('tabs__tab6');
        const badge1 = document.getElementById('tab-badge1');
        const badge2 = document.getElementById('tab-badge2');
        const badge3 = document.getElementById('tab-badge3');
        const badge4 = document.getElementById('tab-badge4');
        const badge5 = document.getElementById('tab-badge5');
        tab2.style.color = '';
        tab3.style.color = '';
        tab4.style.color = '';
        tab5.style.color = '';
        tab6.style.color = '';
        tab1.style.color = 'red';
        tab1.style.fontFamily = 'Helvetica';
        tab2.style.fontFamily = 'Helvetica';
        tab3.style.fontFamily = 'Helvetica';
        tab4.style.fontFamily = 'Helvetica';
        badge1.style.color = '#999';
        badge2.style.color = '#999';
        badge3.style.color = '#999';
        badge4.style.color = '#999';
        badge5.style.color = '#999';
        //setCheckProduct('add_product');
        setCheckStatus('all');
    };
    const handlerClickAllConfirm = () => {
        const tab1 = document.getElementById('tabs__tab1');
        const tab2 = document.getElementById('tabs__tab2');
        const tab3 = document.getElementById('tabs__tab3');
        const tab4 = document.getElementById('tabs__tab4');
        const tab5 = document.getElementById('tabs__tab5');
        const tab6 = document.getElementById('tabs__tab6');
        const badge1 = document.getElementById('tab-badge1');
        const badge2 = document.getElementById('tab-badge2');
        const badge3 = document.getElementById('tab-badge3');
        const badge4 = document.getElementById('tab-badge4');
        const badge5 = document.getElementById('tab-badge5');
        tab2.style.color = 'red';
        tab3.style.color = '';
        tab1.style.color = '';
        tab4.style.color = '';
        tab5.style.color = '';
        tab6.style.color = '';
        tab1.style.fontFamily = 'Helvetica';
        tab2.style.fontFamily = 'Helvetica';
        tab3.style.fontFamily = 'Helvetica';
        tab4.style.fontFamily = 'Helvetica';
        badge1.style.color = 'red';
        badge2.style.color = '#999';
        badge3.style.color = '#999';
        badge4.style.color = '#999';
        badge5.style.color = '#999';
        setCheckStatus('WaitConfirm');
    };
    const handlerClickAllConfirmed = () => {
        const tab1 = document.getElementById('tabs__tab1');
        const tab2 = document.getElementById('tabs__tab2');
        const tab3 = document.getElementById('tabs__tab3');
        const tab4 = document.getElementById('tabs__tab4');
        const tab5 = document.getElementById('tabs__tab5');
        const tab6 = document.getElementById('tabs__tab6');
        const badge1 = document.getElementById('tab-badge1');
        const badge2 = document.getElementById('tab-badge2');
        const badge3 = document.getElementById('tab-badge3');
        const badge4 = document.getElementById('tab-badge4');
        const badge5 = document.getElementById('tab-badge5');
        tab2.style.color = '';
        tab3.style.color = 'red';
        tab1.style.color = '';
        tab4.style.color = '';
        tab5.style.color = '';
        tab6.style.color = '';
        tab1.style.fontFamily = 'Helvetica';
        tab2.style.fontFamily = 'Helvetica';
        tab3.style.fontFamily = 'Helvetica';
        tab4.style.fontFamily = 'Helvetica';
        badge1.style.color = '#999';
        badge2.style.color = 'red';
        badge3.style.color = '#999';
        badge4.style.color = '#999';
        badge5.style.color = '#999';
        setCheckStatus('Confirmed');
    };

    const handlerClickAllTransport = () => {
        const tab1 = document.getElementById('tabs__tab1');
        const tab2 = document.getElementById('tabs__tab2');
        const tab3 = document.getElementById('tabs__tab3');
        const tab4 = document.getElementById('tabs__tab4');
        const tab5 = document.getElementById('tabs__tab5');
        const tab6 = document.getElementById('tabs__tab6');
        const badge1 = document.getElementById('tab-badge1');
        const badge2 = document.getElementById('tab-badge2');
        const badge3 = document.getElementById('tab-badge3');
        const badge4 = document.getElementById('tab-badge4');
        const badge5 = document.getElementById('tab-badge5');
        tab2.style.color = '';
        tab3.style.color = '';
        tab1.style.color = '';
        tab4.style.color = 'red';
        tab5.style.color = '';
        tab6.style.color = '';
        tab1.style.fontFamily = 'Helvetica';
        tab2.style.fontFamily = 'Helvetica';
        tab3.style.fontFamily = 'Helvetica';
        tab4.style.fontFamily = 'Helvetica';
        badge1.style.color = '#999';
        badge2.style.color = '#999';
        badge3.style.color = 'red';
        badge4.style.color = '#999';
        badge5.style.color = '#999';
        setCheckStatus('Transport');
    };
    const handlerClickAllDelivered = () => {
        const tab1 = document.getElementById('tabs__tab1');
        const tab2 = document.getElementById('tabs__tab2');
        const tab3 = document.getElementById('tabs__tab3');
        const tab4 = document.getElementById('tabs__tab4');
        const tab5 = document.getElementById('tabs__tab5');
        const tab6 = document.getElementById('tabs__tab6');
        const badge1 = document.getElementById('tab-badge1');
        const badge2 = document.getElementById('tab-badge2');
        const badge3 = document.getElementById('tab-badge3');
        const badge4 = document.getElementById('tab-badge4');
        const badge5 = document.getElementById('tab-badge5');
        tab2.style.color = '';
        tab3.style.color = '';
        tab1.style.color = '';
        tab4.style.color = '';
        tab5.style.color = 'red';
        tab6.style.color = '';
        tab1.style.fontFamily = 'Helvetica';
        tab2.style.fontFamily = 'Helvetica';
        tab3.style.fontFamily = 'Helvetica';
        tab4.style.fontFamily = 'Helvetica';
        badge1.style.color = '#999';
        badge2.style.color = '#999';
        badge3.style.color = '#999';
        badge4.style.color = 'red';
        badge5.style.color = '#999';
        setCheckStatus('Delivered');
    };

    const handlerClickAllCancelOrder = () => {
        const tab1 = document.getElementById('tabs__tab1');
        const tab2 = document.getElementById('tabs__tab2');
        const tab3 = document.getElementById('tabs__tab3');
        const tab4 = document.getElementById('tabs__tab4');
        const tab5 = document.getElementById('tabs__tab5');
        const tab6 = document.getElementById('tabs__tab6');
        const badge1 = document.getElementById('tab-badge1');
        const badge2 = document.getElementById('tab-badge2');
        const badge3 = document.getElementById('tab-badge3');
        const badge4 = document.getElementById('tab-badge4');
        const badge5 = document.getElementById('tab-badge5');
        tab2.style.color = '';
        tab3.style.color = '';
        tab1.style.color = '';
        tab4.style.color = '';
        tab5.style.color = '';
        tab6.style.color = 'red';
        tab1.style.fontFamily = 'Helvetica';
        tab2.style.fontFamily = 'Helvetica';
        tab3.style.fontFamily = 'Helvetica';
        tab4.style.fontFamily = 'Helvetica';
        badge1.style.color = '#999';
        badge2.style.color = '#999';
        badge3.style.color = '#999';
        badge4.style.color = '#999';
        badge5.style.color = 'red';
        setCheckStatus('CancelOrder');
        setCheckProduct('destroy_product');
    };

    const handleSearch = () => {
        axios
            .get(
                `${process.env.REACT_APP_URL_NODEJS}/sellerbill/bill/search/id?NB_id=${
                    JSON.parse(GetCookie('seller')).ND_id
                }&DH_id=${searchValue || ''}`,
            )
            .then((res) => {
                console.log('image ', res.data.result);
                setBill(res.data.result);
                // setStatusConfirm(res.data.statusconfirm[0].statusconfirm);
                // setStatusDelivered(res.data.statusdelivered[0].statusdelivered);
                // setStatusCancelOrder(res.data.statuscancelOrder[0].statuscancelOrder);
                // setNumber(res.data.number[0].number);
            })
            .catch(() => {
                console.log('loi khong the show bill');
            });
    };

    const handleDateNow = (e) => {
        const date = new Date();
        const dayValue = new Date();
        const year = date.getFullYear();
        if (Number(e) === 7) {
            const additionOfDays = 7;
            date.setDate(date.getDate() - additionOfDays); // For subtract use minus (-)
            // console.log('New Date:', dayValue, date.getDate(), takeDateNow(date));
            console.log('value e', typeof e);
            const formDate = document.getElementById('chart-date1');
            const toDate = document.getElementById('chart-date2');

            formDate.value = takeDateNow(date);
            toDate.value = takeDateNow(dayValue);
            setDateValue2(takeDateNow(dayValue));
            setDateValue1(takeDateNow(date));
            setCheckStatistical('statistical');
            setActiveTurnover(
                `${process.env.REACT_APP_URL_NODEJS}/sellerbill/bill/show/all?NB_id=${
                    JSON.parse(GetCookie('seller')).ND_id
                }&DH_trangthai=${checkStatus}&tungay=${takeDateNow(date)}&denngay=${takeDateNow(dayValue)}`,
            );
        } else if (Number(e) === 1) {
            let dateFrom = `${year.toString()}-01-01`;
            let dateTo = `${year.toString()}-03-31`;

            const formDate = document.getElementById('chart-date1');
            const toDate = document.getElementById('chart-date2');

            formDate.value = dateFrom;
            toDate.value = dateTo;
            setDateValue1(dateFrom);
            setDateValue2(dateTo);
            setCheckStatistical('statistical');
            setActiveTurnover(
                `${process.env.REACT_APP_URL_NODEJS}/sellerbill/bill/show/all?NB_id=${
                    JSON.parse(GetCookie('seller')).ND_id
                }&DH_trangthai=${checkStatus}&tungay=${dateFrom}&denngay=${dateTo}`,
            );
        } else if (Number(e) === 2) {
            let dateFrom = `${year.toString()}-04-01`;
            let dateTo = `${year.toString()}-06-30`;

            const formDate = document.getElementById('chart-date1');
            const toDate = document.getElementById('chart-date2');

            formDate.value = dateFrom;
            toDate.value = dateTo;
            setDateValue1(dateFrom);
            setDateValue2(dateTo);
            setCheckStatistical('statistical');
            setActiveTurnover(
                `${process.env.REACT_APP_URL_NODEJS}/sellerbill/bill/show/all?NB_id=${
                    JSON.parse(GetCookie('seller')).ND_id
                }&DH_trangthai=${checkStatus}&tungay=${dateFrom}&denngay=${dateTo}`,
            );
        } else if (Number(e) === 3) {
            let dateFrom = `${year.toString()}-07-01`;
            let dateTo = `${year.toString()}-09-30`;

            const formDate = document.getElementById('chart-date1');
            const toDate = document.getElementById('chart-date2');

            formDate.value = dateFrom;
            toDate.value = dateTo;
            setDateValue1(dateFrom);
            setDateValue2(dateTo);
            setCheckStatistical('statistical');
            setActiveTurnover(
                `${process.env.REACT_APP_URL_NODEJS}/sellerbill/bill/show/all?NB_id=${
                    JSON.parse(GetCookie('seller')).ND_id
                }&DH_trangthai=${checkStatus}&tungay=${dateFrom}&denngay=${dateTo}`,
            );
        } else if (Number(e) === 4) {
            let dateFrom = `${year.toString()}-10-01`;
            let dateTo = `${year.toString()}-12-31`;

            const formDate = document.getElementById('chart-date1');
            const toDate = document.getElementById('chart-date2');

            formDate.value = dateFrom;
            toDate.value = dateTo;
            setDateValue1(dateFrom);
            setDateValue2(dateTo);
            setCheckStatistical('statistical');
            setActiveTurnover(
                `${process.env.REACT_APP_URL_NODEJS}/sellerbill/bill/show/all?NB_id=${
                    JSON.parse(GetCookie('seller')).ND_id
                }&DH_trangthai=${checkStatus}&tungay=${dateFrom}&denngay=${dateTo}`,
            );
        } else if (Number(e) === 365) {
            const additionOfDays = 365;
            date.setDate(date.getDate() - additionOfDays); // For subtract use minus (-)
            // console.log('New Date:', dayValue, date.getDate(), takeDateNow(date));
            console.log('value e', typeof e);

            const formDate = document.getElementById('chart-date1');
            const toDate = document.getElementById('chart-date2');

            formDate.value = takeDateNow(date);
            toDate.value = takeDateNow(dayValue);
            setDateValue2(takeDateNow(dayValue));
            setDateValue1(takeDateNow(date));
            setCheckStatistical('statistical');
            setActiveTurnover(
                `${process.env.REACT_APP_URL_NODEJS}/sellerbill/bill/show/all?NB_id=${
                    JSON.parse(GetCookie('seller')).ND_id
                }&DH_trangthai=${checkStatus}&tungay=${takeDateNow(date)}&denngay=${takeDateNow(dayValue)}`,
            );
        } else if (e === '') {
            const formDate = document.getElementById('chart-date1');
            const toDate = document.getElementById('chart-date2');

            formDate.value = '';
            toDate.value = '';
            setDateValue2('');
            setDateValue1('');
            setCheckStatistical('');
            setActiveTurnover(
                `${process.env.REACT_APP_URL_NODEJS}/sellerbill/bill/show/all?NB_id=${
                    JSON.parse(GetCookie('seller')).ND_id
                }&DH_trangthai=${checkStatus}&tungay=${''}&denngay=${''}`,
            );
        }
    };

    // function takeDate() {
    //     const dateValue = new Date();
    //     let day = dateValue.getDate();
    //     let month = dateValue.getMonth() + 1;
    //     let year = dateValue.getFullYear();

    //     if (month < 10 && day >= 10) {
    //         return year + '-0' + month + '-' + day;
    //     } else if (month < 10 && day < 10) {
    //         return year + '-0' + month + '-0' + day;
    //     } else if (month >= 10 && day < 10) {
    //         return year + '-' + month + '-0' + day;
    //     } else if (month >= 10 && day >= 10) {
    //         return year + '-' + month + '-' + day;
    //     } else {
    //         return year + '-' + month + '-' + day;
    //     }
    // }

    function takeDateNow(date) {
        const dateValue = new Date(date);
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

    function handleTestDate(fromValue, toValue) {
        let datefrom = new Date(fromValue);
        let dateto = new Date(toValue);
        if (datefrom <= dateto) {
            return true;
        } else {
            return false;
        }
        // console.log('date1', date1);
    }

    const handleStatistic = (dateValue1, dateValue2) => {
        if (dateValue1 === '' && dateValue2 !== '') {
            toast.warning('Ngày bắt đầu không được bỏ trống!', {
                position: toast.POSITION.TOP_CENTER,
                className: `${cx('toast-message')}`,
            });
        } else if (dateValue1 !== '' && dateValue2 === '') {
            toast.warning('Ngày kết thúc không được bỏ trống!', {
                position: toast.POSITION.TOP_CENTER,
                className: `${cx('toast-message')}`,
            });
        } else if (dateValue1 !== '' && dateValue2 !== '' && !handleTestDate(dateValue1, dateValue2)) {
            toast.warning('Ngày bắt đầu và ngày kết thúc chưa hợp lệ!', {
                position: toast.POSITION.TOP_CENTER,
                className: `${cx('toast-message')}`,
            });
        } else {
            setCheckStatistical('statistical');
            setActiveTurnover(
                `${process.env.REACT_APP_URL_NODEJS}/sellerbill/bill/show/all?NB_id=${
                    JSON.parse(GetCookie('seller')).ND_id
                }&DH_trangthai=${checkStatus}&tungay=${dateValue1}&denngay=${takeDateNow(dateValue2)}`,
            );
        }
    };

    const handleDateValue1 = (e) => {
        setCheckStatistical('');
        setDateValue1(e);
    };
    const handleDateValue2 = (e) => {
        setCheckStatistical('');
        setDateValue2(e);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('shopee-tabs')}>
                <div className={cx('shopee-tabs__nav')}>
                    {' '}
                    <div className={cx('shopee-tabs__nav-warp')}>
                        <div className={cx('shopee-tabs__nav-tabs')}>
                            <div className={cx('shopee-tabs__nav-tab')}>
                                <Link
                                    to="/seller/bill/@all"
                                    id="tabs__tab1"
                                    className={cx('tabs__tab1')}
                                    onClick={handlerClickAll}
                                >
                                    Tất cả
                                </Link>{' '}
                            </div>
                            <div className={cx('shopee-tabs__nav-tab')}>
                                <Link
                                    to="/seller/bill/@confirm"
                                    id="tabs__tab2"
                                    className={cx('tabs__tab2')}
                                    onClick={handlerClickAllConfirm}
                                >
                                    Chờ xác nhận
                                    <span id="tab-badge1" className={cx('tab-badge1')}>
                                        ( {statusConfirm !== '' ? statusConfirm : '0'} )
                                    </span>
                                </Link>{' '}
                            </div>
                            <div className={cx('shopee-tabs__nav-tab')}>
                                <Link
                                    to="/seller/bill/@confirmed"
                                    id="tabs__tab3"
                                    className={cx('tabs__tab3')}
                                    onClick={handlerClickAllConfirmed}
                                >
                                    Chờ lấy hàng
                                    <span id="tab-badge2" className={cx('tab-badge2')}>
                                        ( {statusConfirmed !== '' ? statusConfirmed : '0'} )
                                    </span>
                                </Link>{' '}
                            </div>
                            <div className={cx('shopee-tabs__nav-tab')}>
                                <Link
                                    to="/seller/bill/@transport"
                                    id="tabs__tab4"
                                    className={cx('tabs__tab4')}
                                    onClick={handlerClickAllTransport}
                                >
                                    Đang giao
                                    <span id="tab-badge3" className={cx('tab-badge3')}>
                                        ( {statusTransport !== '' ? statusTransport : '0'} )
                                    </span>
                                </Link>{' '}
                            </div>
                            <div className={cx('shopee-tabs__nav-tab')}>
                                <Link
                                    to="/seller/bill/@delivered"
                                    id="tabs__tab5"
                                    className={cx('tabs__tab5')}
                                    onClick={handlerClickAllDelivered}
                                >
                                    Đã giao
                                    <span id="tab-badge4" className={cx('tab-badge4')}>
                                        {' '}
                                        ( {statusDelivered !== '' ? statusDelivered : '0'} )
                                    </span>
                                </Link>{' '}
                            </div>
                            <div className={cx('shopee-tabs__nav-tab')}>
                                <Link
                                    to="/seller/bill/@canceloder"
                                    id="tabs__tab6"
                                    className={cx('tabs__tab6')}
                                    onClick={handlerClickAllCancelOrder}
                                >
                                    Đơn hủy
                                    <span id="tab-badge5" className={cx('tab-badge5')}>
                                        {' '}
                                        ( {statusCancelOrder !== '' ? statusCancelOrder : '0'} )
                                    </span>
                                </Link>{' '}
                            </div>
                        </div>{' '}
                        <div className={cx('shopee-tabs__ink-bar')}></div>
                    </div>{' '}
                </div>{' '}
            </div>
            <div className={cx('product-grid')}>
                <div className={cx('grid')}>
                    <div data-v-3cbfdb84="" className={cx('grid-left')}>
                        <div data-v-3cbfdb84="" className={cx('title-box')}>
                            <div data-v-3cbfdb84="" className={cx('page-title-box')}>
                                <div data-v-3cbfdb84="" className={cx('page-title')}>
                                    {number} Đơn hàng
                                </div>{' '}
                            </div>
                        </div>
                    </div>
                    <div className={cx('input-group-search')}>
                        <span className={cx('search-input-group__append')}>
                            <div className={cx('order-search-input')}>
                                <div className={cx('search-warpper')}>
                                    <div className={cx('input-order-search-btn')}>
                                        <div className={cx('input__inner--normal')}>
                                            <input
                                                type="text"
                                                placeholder="Nhập Mã đơn hàng"
                                                clearable="true"
                                                resize="vertical"
                                                rows="2"
                                                minrows="2"
                                                restrictiontype="input"
                                                max="Infinity"
                                                min="-Infinity"
                                                className={cx('shopee-input__input')}
                                                onChange={(e) => setSearchValue(e.target.value)}
                                            />
                                            <div className={cx('shopee-input__suffix')}>
                                                <div className={cx('input__clear-btn')}>
                                                    <i className={cx('shopee-input__clear-btn')}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M8,2 C11.3137085,2 14,4.6862915 14,8 C14,11.3137085 11.3137085,14 8,14 C4.6862915,14 2,11.3137085 2,8 C2,4.6862915 4.6862915,2 8,2 Z M10.5924919,5.27303573 C10.4094355,5.1521972 10.1606887,5.17236516 9.99956233,5.33352414 L9.99956233,5.33352414 L8.00023568,7.33325477 L6.00047136,5.33349045 C5.81628967,5.14930876 5.51767215,5.14930876 5.33349045,5.33349045 L5.33349045,5.33349045 L5.27301564,5.40754038 C5.1522078,5.59059052 5.17239885,5.83931011 5.33355782,6.00040399 L5.33355782,6.00040399 L7.33372614,7.99976432 L5.33352414,9.99956232 L5.33352414,9.99956232 L5.27306194,10.0735738 C5.15220491,10.2566181 5.17234775,10.5053668 5.33349045,10.6665095 L5.33349045,10.6665095 L5.40750807,10.7269643 C5.5905645,10.8478028 5.83931125,10.8276348 6.00043768,10.6664759 L6.00043768,10.6664759 L8.00023568,8.66627386 L9.99959601,10.6664422 L9.99959601,10.6664422 L10.0736337,10.726932 C10.2566595,10.8477768 10.5053831,10.827636 10.6665095,10.6665095 C10.8506912,10.4823279 10.8506912,10.1837103 10.6665095,9.99952864 L10.6665095,9.99952864 L8.66674523,7.99976432 L10.6664759,6.00043767 L10.6664759,6.00043767 L10.7269381,5.92642616 C10.8477951,5.74338194 10.8276522,5.49463316 10.6665095,5.33349045 L10.6665095,5.33349045 Z"
                                                            ></path>
                                                        </svg>
                                                    </i>
                                                </div>
                                                <div className={cx('input__suffix-icon')} onClick={handleSearch}>
                                                    <i className={cx('shopee-input__suffix-icon')}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                            <path d="M6.99383468,0.993751221 C10.3075432,0.993751221 12.9938347,3.68004272 12.9938347,6.99375122 C12.9938347,8.46891634 12.4614742,9.81974201 11.5783922,10.8645893 L14.8572322,14.1431825 C15.0524943,14.3384447 15.0524943,14.6550272 14.8572322,14.8502893 C14.6836658,15.0238557 14.4142414,15.0431408 14.2193733,14.9081448 L14.1501254,14.8502893 L10.8716694,11.5723862 C9.82585916,12.45901 8.47229467,12.9937512 6.99383468,12.9937512 C3.68012618,12.9937512 0.993834675,10.3074597 0.993834675,6.99375122 C0.993834675,3.68004272 3.68012618,0.993751221 6.99383468,0.993751221 Z M6.99383468,1.99375122 C4.23241093,1.99375122 1.99383468,4.23232747 1.99383468,6.99375122 C1.99383468,9.75517497 4.23241093,11.9937512 6.99383468,11.9937512 C9.75525842,11.9937512 11.9938347,9.75517497 11.9938347,6.99375122 C11.9938347,4.23232747 9.75525842,1.99375122 6.99383468,1.99375122 Z"></path>
                                                        </svg>
                                                    </i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </span>
                    </div>
                </div>
            </div>
            {/* <ProductSeller data={product} /> */}
            <div className={cx('chart-demo')}>
                <div className={cx('chart-date')}>
                    <div className={cx('chart-date-input')}>
                        <input
                            type="date"
                            id="chart-date1"
                            className={cx('chart-date1')}
                            defaultValue={dateValue1}
                            onChange={(e) => handleDateValue1(e.target.value)}
                        />
                        <span className={cx('chart-')}>-</span>
                        <input
                            type="date"
                            id="chart-date2"
                            className={cx('chart-date2')}
                            defaultValue={dateValue2}
                            onChange={(e) => handleDateValue2(e.target.value)}
                        />
                    </div>
                    <button className={cx('chart-btn')} onClick={() => handleStatistic(dateValue1, dateValue2)}>
                        Thống kê
                    </button>
                    <div className={cx('chart-quarter')}>
                        <select className={cx('chart-btn-select')} onChange={(e) => handleDateNow(e.target.value)}>
                            <option className={cx('order-btn-option')} value="">
                                ...
                            </option>
                            <option className={cx('order-btn-option')} value="7">
                                Tuần
                            </option>
                            <option className={cx('order-btn-option')} value="1">
                                Quý 1 (1-3)
                            </option>
                            <option className={cx('order-btn-option')} value="2">
                                Quý 2 (4-6)
                            </option>
                            <option className={cx('order-btn-option')} value="3">
                                Quý 3 (7-9)
                            </option>
                            <option className={cx('order-btn-option')} value="4">
                                Quý 4 (10-12)
                            </option>
                            <option className={cx('order-btn-option')} value="365">
                                Năm
                            </option>
                        </select>
                    </div>
                </div>
                {/* <Line className={cx('chart-demo')} option={chartOptions} data={chartData} /> */}
            </div>
            <div className={cx('order-list-pannel')}>
                <div className={cx('order-list-section')}>
                    <div className={cx('shopee-fixed-top-card')}>
                        <div className={cx('fixed-container')}>
                            <div className={cx('order-list-header')}>
                                <span className={cx('item-product')}>Sản phẩm</span>
                                <span className={cx('item-total')}>Tổng Đơn hàng</span>{' '}
                                <span className={cx('item-status')}>Trạng thái</span>{' '}
                                <span className={cx('item-channel')}>Vận Chuyển</span>
                                <span className={cx('item-action')}>Thao tác</span>
                            </div>
                        </div>{' '}
                        <div data-v-dff31658="" className={cx('fixed-placeholder')}></div>
                    </div>
                    <SellerBillPage data={bill} />
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default SellerBill;
