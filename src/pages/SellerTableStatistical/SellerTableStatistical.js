import axios from 'axios';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import GetCookie from '~/components/Hook/GetCookies';
import styles from './SellerTableStatistical.module.scss';
import './Seller.css';
import { toast, ToastContainer } from 'react-toastify';

const cx = classNames.bind(styles);

function SellerTableStatistical() {
    function takeDate() {
        const dateValue = new Date();
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

    console.log('date', takeDate());

    const [dateValue1, setDateValue1] = useState(takeDate());
    const [dateValue2, setDateValue2] = useState(takeDate());
    const [activeTurnover, setActiveTurnover] = useState(
        `${process.env.REACT_APP_URL_NODEJS}/chart/table/statistical?ngdi=${dateValue1}&ngde=${dateValue2}&NB_id=${
            JSON.parse(GetCookie('seller')).ND_id
        }&type=${'tuan'}`,
    );
    const [chartListData, setChartListData] = useState([]);
    const [chartListNumber, setChartListNumber] = useState([]);
    const [chartListTurnover, setChartListTurnover] = useState([]);
    const [quartersValue, setQuarterValue] = useState([]);

    const [yearValue, setYearValue] = useState('');
    const [sumTurnoverValue, setSumTurnoverValue] = useState('');
    const [sumNumberValue, setsumNumberValue] = useState('');
    //const [monthValue, setMonthValue] = useState('');

    //const listChart = useDebounce(chartListData, 500);
    const handleChart = (listDate, listNumber, listTurnover) => {
        setChartListData(() => [...listDate]);
        setChartListNumber(() => [...listNumber]);
        setChartListTurnover(() => [...listTurnover]);

        console.log('listNumber:  ', listNumber);
        console.log('listTurnover:  ', listTurnover);
        let sumTurnover = 0;
        let sumNumber = 0;
        for (let i = 0; i < listTurnover.length; i++) {
            sumTurnover += listTurnover[i];
            sumNumber += listNumber[i];

            if (i === listTurnover.length - 1) {
                setSumTurnoverValue(sumTurnover);
                setsumNumberValue(sumNumber);
            }
        }
    };

    console.log('dateValue1', dateValue1);
    console.log('dateValue2', dateValue2);

    useEffect(() => {
        const pathId = window.location.pathname.toString();
        const resultId = pathId.slice(7);

        const handleDateNowSmall = (e) => {
            const date = new Date();
            const dayValue = new Date();
            const yearNow = dayValue.getFullYear();
            if (Number(e) === 7) {
                const additionOfDays = 7;
                date.setDate(date.getDate() - additionOfDays); // For subtract use minus (-)
                // console.log('New Date:', dayValue, date.getDate(), takeDateNow(date));
                console.log('value e', typeof e);
                const formDate = document.getElementById('chart-date1');
                const toDate = document.getElementById('chart-date2');
                const chartDate = document.getElementById('chart-date-date');
                const chartYear = document.getElementById('chart-quarter-year');
                const chartMonth = document.getElementById('chart-quarter-month');
                const btnstatistic = document.getElementById('chart-button-tk');
                const print = document.getElementById('chart-chart-quarter-print');

                formDate.value = takeDateNow(date);
                toDate.value = takeDateNow(dayValue);
                chartDate.style.display = 'flex';
                chartYear.style.display = 'none';
                chartMonth.style.display = 'none';
                btnstatistic.style.display = 'none';
                print.href = `${
                    process.env.REACT_APP_URL_FRONTEND
                }/seller/bill/table/statistical/print/ngdi=${takeDateNow(date)}/ngde=${takeDateNow(
                    dayValue,
                )}/nam=${yearNow}/name=2/type=tuan`;

                setDateValue2(takeDateNow(dayValue));
                setDateValue1(takeDateNow(date));
                setQuarterValue('tuan');

                setActiveTurnover(
                    `${process.env.REACT_APP_URL_NODEJS}/chart/table/statistical?ngdi=${takeDateNow(
                        date,
                    )}&ngde=${takeDateNow(dayValue)}&NB_id=${JSON.parse(GetCookie('seller')).ND_id}&type=${'tuan'}`,
                );
            }
        };
        console.log('resultId: ', resultId);
        if (resultId === '/table/statistical') {
            const chartQuarter = document.getElementById('chart-quarter-select-op');
            chartQuarter.value = '7';
            handleDateNowSmall(7);
        }
    }, []);

    useEffect(() => {
        axios
            .get(`${activeTurnover}`)
            .then((res) => {
                // console.log('chart', res.data.results);
                console.log('chart', res.data);
                let chartListDate = [];
                for (let i = 0; i < res.data.arr.length; i++) {
                    const datevalue = new Date(res.data.arr[i]);
                    let day = datevalue.getDate();
                    let month = datevalue.getMonth() + 1;
                    let year = datevalue.getFullYear();
                    let DMY;
                    if (month < 10 && day >= 10) {
                        DMY = day + '-0' + month + '-' + year;
                    } else if (month < 10 && day < 10) {
                        DMY = '0' + day + '-0' + month + '-' + year;
                    } else if (month >= 10 && day < 10) {
                        DMY = '0' + day + '-' + month + '-' + year;
                    } else if (month >= 10 && day >= 10) {
                        DMY = day + '-' + month + '-' + year;
                    } else {
                        DMY = day + '-' + month + '-' + year;
                    }
                    chartListDate = [...chartListDate, DMY];
                }
                let chartListNumber = res.data.numbers;
                let chartListTurnover = res.data.turnovers;
                // for (let i = 0; i < res.data.length; i++) {
                //     let DateChart = new Date(res.data[i].TK_ngay);
                //     let day = DateChart.getDate();
                //     let month = DateChart.getMonth() + 1;
                //     let year = DateChart.getFullYear();
                //     chartListDate = [...chartListDate, day + '-' + month + '-' + year];
                //     chartListNumber = [...chartListNumber, res.data[i].TK_soluong];
                //     chartListTurnover = [...chartListTurnover, res.data[i].TK_doanhthu];
                // }

                handleChart(chartListDate, chartListNumber, chartListTurnover);
                //setChartListData(() => [...chartListDate]);
                // console.log(res.data);
            })
            .catch(() => {
                console.log('loi chart');
            });
    }, [activeTurnover]);

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
            const dayValue = new Date();
            const yearNow = dayValue.getFullYear();
            const print = document.getElementById('chart-chart-quarter-print');
            print.href = `${process.env.REACT_APP_URL_FRONTEND}/seller/bill/table/statistical/print/ngdi=${dateValue1}/ngde=${dateValue2}/nam=${yearNow}/name=1/type=tuan`;
            setQuarterValue('statistical');
            setActiveTurnover(
                `${
                    process.env.REACT_APP_URL_NODEJS
                }/chart/table/statistical?ngdi=${dateValue1}&ngde=${dateValue2}&NB_id=${
                    JSON.parse(GetCookie('seller')).ND_id
                }&type=${'tuan'}`,
            );
        }
    };

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
    const handleDateNow = (e, yearvalue, monthvalue, yearvl) => {
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
            const chartDate = document.getElementById('chart-date-date');
            const chartYear = document.getElementById('chart-quarter-year');
            const chartMonth = document.getElementById('chart-quarter-month');
            const btnstatistic = document.getElementById('chart-button-tk');
            const print = document.getElementById('chart-chart-quarter-print');

            formDate.value = takeDateNow(date);
            toDate.value = takeDateNow(dayValue);
            chartDate.style.display = 'flex';
            chartYear.style.display = 'none';
            chartMonth.style.display = 'none';
            btnstatistic.style.display = 'none';

            print.href = `${process.env.REACT_APP_URL_FRONTEND}/seller/bill/table/statistical/print/ngdi=${takeDateNow(
                date,
            )}/ngde=${takeDateNow(dayValue)}/nam=${year}/name=2/type=tuan`;

            setDateValue2(takeDateNow(dayValue));
            setDateValue1(takeDateNow(date));
            setQuarterValue('tuan');

            setActiveTurnover(
                `${process.env.REACT_APP_URL_NODEJS}/chart/table/statistical?ngdi=${takeDateNow(
                    date,
                )}&ngde=${takeDateNow(dayValue)}&NB_id=${JSON.parse(GetCookie('seller')).ND_id}&type=${'tuan'}`,
            );
        } else if (Number(e) === 1) {
            let dateFrom = `${year.toString()}-01-01`;
            let dateTo = `${year.toString()}-03-31`;

            const formDate = document.getElementById('chart-date1');
            const toDate = document.getElementById('chart-date2');
            const chartDate = document.getElementById('chart-date-date');
            const chartYear = document.getElementById('chart-quarter-year');
            const chartMonth = document.getElementById('chart-quarter-month');
            const btnstatistic = document.getElementById('chart-button-tk');
            const print = document.getElementById('chart-chart-quarter-print');

            formDate.value = dateFrom;
            toDate.value = dateTo;
            chartDate.style.display = 'flex';
            chartYear.style.display = 'none';
            chartMonth.style.display = 'none';
            btnstatistic.style.display = 'none';

            print.href = `${process.env.REACT_APP_URL_FRONTEND}/seller/bill/table/statistical/print/ngdi=${dateFrom}/ngde=${dateTo}/nam=${year}/name=4/type=quy1`;

            setDateValue1(dateFrom);
            setDateValue2(dateTo);
            setQuarterValue('quy1');

            setActiveTurnover(
                `${process.env.REACT_APP_URL_NODEJS}/chart/table/statistical?ngdi=${dateFrom}&ngde=${dateTo}&NB_id=${
                    JSON.parse(GetCookie('seller')).ND_id
                }&type=${'quy1'}`,
            );
        } else if (Number(e) === 2) {
            let dateFrom = `${year.toString()}-04-01`;
            let dateTo = `${year.toString()}-06-30`;

            const formDate = document.getElementById('chart-date1');
            const toDate = document.getElementById('chart-date2');
            const chartDate = document.getElementById('chart-date-date');
            const chartYear = document.getElementById('chart-quarter-year');
            const chartMonth = document.getElementById('chart-quarter-month');
            const btnstatistic = document.getElementById('chart-button-tk');
            const print = document.getElementById('chart-chart-quarter-print');

            formDate.value = dateFrom;
            toDate.value = dateTo;
            chartDate.style.display = 'flex';
            chartYear.style.display = 'none';
            chartMonth.style.display = 'none';
            btnstatistic.style.display = 'none';

            print.href = `${process.env.REACT_APP_URL_FRONTEND}/seller/bill/table/statistical/print/ngdi=${dateFrom}/ngde=${dateTo}/nam=${year}/name=5/type=quy2`;

            setDateValue1(dateFrom);
            setDateValue2(dateTo);
            setQuarterValue('quy2');

            setActiveTurnover(
                `${process.env.REACT_APP_URL_NODEJS}/chart/table/statistical?ngdi=${dateFrom}&ngde=${dateTo}&NB_id=${
                    JSON.parse(GetCookie('seller')).ND_id
                }&type=${'quy2'}`,
            );
        } else if (Number(e) === 3) {
            let dateFrom = `${year.toString()}-07-01`;
            let dateTo = `${year.toString()}-09-30`;

            const formDate = document.getElementById('chart-date1');
            const toDate = document.getElementById('chart-date2');
            const chartDate = document.getElementById('chart-date-date');
            const chartYear = document.getElementById('chart-quarter-year');
            const chartMonth = document.getElementById('chart-quarter-month');
            const btnstatistic = document.getElementById('chart-button-tk');
            const print = document.getElementById('chart-chart-quarter-print');

            formDate.value = dateFrom;
            toDate.value = dateTo;
            chartDate.style.display = 'flex';
            chartYear.style.display = 'none';
            chartMonth.style.display = 'none';
            btnstatistic.style.display = 'none';

            print.href = `${process.env.REACT_APP_URL_FRONTEND}/seller/bill/table/statistical/print/ngdi=${dateFrom}/ngde=${dateTo}/nam=${year}/name=6/type=quy3`;

            setDateValue1(dateFrom);
            setDateValue2(dateTo);
            setQuarterValue('quy3');

            setActiveTurnover(
                `${process.env.REACT_APP_URL_NODEJS}/chart/table/statistical?ngdi=${dateFrom}&ngde=${dateTo}&NB_id=${
                    JSON.parse(GetCookie('seller')).ND_id
                }&type=${'quy3'}`,
            );
        } else if (Number(e) === 4) {
            let dateFrom = `${year.toString()}-10-01`;
            let dateTo = `${year.toString()}-12-31`;

            const formDate = document.getElementById('chart-date1');
            const toDate = document.getElementById('chart-date2');
            const chartDate = document.getElementById('chart-date-date');
            const chartYear = document.getElementById('chart-quarter-year');
            const chartMonth = document.getElementById('chart-quarter-month');
            const btnstatistic = document.getElementById('chart-button-tk');
            const print = document.getElementById('chart-chart-quarter-print');

            formDate.value = dateFrom;
            toDate.value = dateTo;
            chartDate.style.display = 'flex';
            chartYear.style.display = 'none';
            chartMonth.style.display = 'none';
            btnstatistic.style.display = 'none';

            print.href = `${process.env.REACT_APP_URL_FRONTEND}/seller/bill/table/statistical/print/ngdi=${dateFrom}/ngde=${dateTo}/nam=${year}/name=7/type=quy4`;

            setDateValue1(dateFrom);
            setDateValue2(dateTo);
            setQuarterValue('quy4');

            setActiveTurnover(
                `${process.env.REACT_APP_URL_NODEJS}/chart/table/statistical?ngdi=${dateFrom}&ngde=${dateTo}&NB_id=${
                    JSON.parse(GetCookie('seller')).ND_id
                }&type=${'quy4'}`,
            );
        } else if (Number(e) === 365) {
            let dateFrom = `${year.toString()}-01-01`;
            let dateTo = `${year.toString()}-12-31`;
            // console.log('New Date:', dayValue, date.getDate(), takeDateNow(date));
            console.log('value e', typeof e);
            const formDate = document.getElementById('chart-date1');
            const toDate = document.getElementById('chart-date2');
            const chartDate = document.getElementById('chart-date-date');
            const chartYear = document.getElementById('chart-quarter-year');
            const chartMonth = document.getElementById('chart-quarter-month');
            const chartSelect = document.getElementById('chart-quarter-select');
            const btnstatistic = document.getElementById('chart-button-tk');
            const print = document.getElementById('chart-chart-quarter-print');

            formDate.value = takeDateNow(dateFrom);
            toDate.value = takeDateNow(dateTo);
            chartDate.style.display = 'none';
            chartYear.style.display = 'flex';
            chartMonth.style.display = 'flex';
            chartSelect.value = '';
            btnstatistic.style.display = 'none';

            print.href = `${process.env.REACT_APP_URL_FRONTEND}/seller/bill/table/statistical/print/ngdi=${takeDateNow(
                dateFrom,
            )}/ngde=${takeDateNow(dateTo)}/nam=${year.toString()}/name=8/type=nam`;

            setDateValue2(takeDateNow(dateTo));
            setDateValue1(takeDateNow(dateFrom));
            setYearValue(year.toString());
            setQuarterValue('nam');

            setActiveTurnover(
                `${process.env.REACT_APP_URL_NODEJS}/chart/table/statistical?ngdi=${takeDateNow(
                    dateFrom,
                )}&ngde=${takeDateNow(dateTo)}&NB_id=${
                    JSON.parse(GetCookie('seller')).ND_id
                }&type=${'nam'}&nam=${year.toString()}`,
            );
        } else if (yearvalue === 'year' && monthvalue !== 'month') {
            console.log('year yyy: ', e);
            let dateFrom = `${e.toString()}-01-01`;
            let dateTo = `${e.toString()}-12-31`;

            // console.log('New Date:', dayValue, date.getDate(), takeDateNow(date));
            console.log('value e', typeof e);
            const formDate = document.getElementById('chart-date1');
            const toDate = document.getElementById('chart-date2');
            const chartDate = document.getElementById('chart-date-date');
            const chartYear = document.getElementById('chart-quarter-year');
            const chartMonth = document.getElementById('chart-quarter-month');
            const chartSelect = document.getElementById('chart-quarter-select');
            const btnstatistic = document.getElementById('chart-button-tk');
            const print = document.getElementById('chart-chart-quarter-print');

            formDate.value = takeDateNow(dateFrom);
            toDate.value = takeDateNow(dateTo);
            chartDate.style.display = 'none';
            chartYear.style.display = 'flex';
            chartMonth.style.display = 'flex';
            chartSelect.value = '';
            btnstatistic.style.display = 'none';

            print.href = `${process.env.REACT_APP_URL_FRONTEND}/seller/bill/table/statistical/print/ngdi=${takeDateNow(
                dateFrom,
            )}/ngde=${takeDateNow(dateTo)}/nam=${e}/name=8/type=nam`;

            setDateValue2(takeDateNow(dateTo));
            setDateValue1(takeDateNow(dateFrom));
            setYearValue(e);
            setQuarterValue('nam');

            setActiveTurnover(
                `${process.env.REACT_APP_URL_NODEJS}/chart/table/statistical?ngdi=${takeDateNow(
                    dateFrom,
                )}&ngde=${takeDateNow(dateTo)}&NB_id=${JSON.parse(GetCookie('seller')).ND_id}&type=${'nam'}&nam=${e}`,
            );
        }
        if (yearvalue === 'year' && monthvalue === 'month') {
            console.log('yearvl yyy: ', yearvl);
            console.log('month mmm:', e);
            let dateFrom = '';
            let dateTo = '';
            if (
                e === '01' ||
                e === '03' ||
                e === '05' ||
                e === '07' ||
                e === '07' ||
                e === '08' ||
                e === '10' ||
                e === '12'
            ) {
                dateFrom = `${yearvl.toString()}-${e.toString()}-01`;
                dateTo = `${yearvl.toString()}-${e.toString()}-31`;
            } else if (e === '02') {
                dateFrom = `${yearvl.toString()}-${e.toString()}-01`;
                dateTo = `${yearvl.toString()}-${e.toString()}-28`;
            } else {
                dateFrom = `${yearvl.toString()}-${e.toString()}-01`;
                dateTo = `${yearvl.toString()}-${e.toString()}-30`;
            }

            // console.log('New Date:', dayValue, date.getDate(), takeDateNow(date));
            console.log('value e', typeof e);
            const formDate = document.getElementById('chart-date1');
            const toDate = document.getElementById('chart-date2');
            const chartDate = document.getElementById('chart-date-date');
            const chartYear = document.getElementById('chart-quarter-year');
            const chartMonth = document.getElementById('chart-quarter-month');
            const btnstatistic = document.getElementById('chart-button-tk');
            const print = document.getElementById('chart-chart-quarter-print');

            formDate.value = takeDateNow(dateFrom);
            toDate.value = takeDateNow(dateTo);
            chartDate.style.display = 'none';
            chartYear.style.display = 'flex';
            chartMonth.style.display = 'flex';
            btnstatistic.style.display = 'none';

            print.href = `${process.env.REACT_APP_URL_FRONTEND}/seller/bill/table/statistical/print/ngdi=${takeDateNow(
                dateFrom,
            )}/ngde=${takeDateNow(dateTo)}/nam=${year}/name=3/type=tuan`;

            setDateValue2(takeDateNow(dateTo));
            setDateValue1(takeDateNow(dateFrom));
            setQuarterValue('month');

            setActiveTurnover(
                `${process.env.REACT_APP_URL_NODEJS}/chart/table/statistical?ngdi=${takeDateNow(
                    dateFrom,
                )}&ngde=${takeDateNow(dateTo)}&NB_id=${JSON.parse(GetCookie('seller')).ND_id}&type=${'tuan'}`,
            );
        } else if (e === 'day') {
            const date = takeDate();

            const formDate = document.getElementById('chart-date1');
            const toDate = document.getElementById('chart-date2');
            const chartDate = document.getElementById('chart-date-date');
            const chartYear = document.getElementById('chart-quarter-year');
            const chartMonth = document.getElementById('chart-quarter-month');
            const btnstatistic = document.getElementById('chart-button-tk');
            const print = document.getElementById('chart-chart-quarter-print');

            formDate.value = takeDateNow(date);
            toDate.value = takeDateNow(date);
            chartDate.style.display = 'flex';
            chartYear.style.display = 'none';
            chartMonth.style.display = 'none';
            btnstatistic.style.display = 'flex';

            print.href = `${process.env.REACT_APP_URL_FRONTEND}/seller/bill/table/statistical/print/ngdi=${date}/ngde=${date}/nam=${year}/name=1/type=tuan`;

            setDateValue2(takeDateNow(dayValue));
            setDateValue1(takeDateNow(date));
            setQuarterValue('tuan');

            setActiveTurnover(
                `${process.env.REACT_APP_URL_NODEJS}/chart/table/statistical?ngdi=${date}&ngde=${date}&NB_id=${
                    JSON.parse(GetCookie('seller')).ND_id
                }&type=${'tuan'}`,
            );
        } else if (e === '') {
            const date = takeDate();
            const formDate = document.getElementById('chart-date1');
            const toDate = document.getElementById('chart-date2');

            formDate.value = '';
            toDate.value = '';
            setDateValue2('');
            setDateValue1('');

            setActiveTurnover(
                `${process.env.REACT_APP_URL_NODEJS}/chart/table/statistical?ngdi=${date}&ngde=${date}&NB_id=${
                    JSON.parse(GetCookie('seller')).ND_id
                }&type=${'tuan'}`,
            );
        }
    };

    const handleTestColor = (color) => {
        if (color % 2 === 0) {
            return true;
        } else {
            return false;
        }
    };

    const quarters1 = ['Tháng 1', 'Tháng 2', 'Tháng 3'];
    const quarters2 = ['Tháng 4', 'Tháng 5', 'Tháng 6'];
    const quarters3 = ['Tháng 7', 'Tháng 8', 'Tháng 9'];
    const quarters4 = ['Tháng 10', 'Tháng 11', 'Tháng 12'];
    const statisticsByYear = [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
    ];

    return (
        <div className={cx('wrapper')}>
            <div>
                <div className={cx('')}>Tổng doanh thu: {sumTurnoverValue}</div>
                <div className={cx('')}>Tổng đơn: {sumNumberValue}</div>
            </div>
            <div className={cx('chart-demo')}>
                <div className={cx('chart-date')}>
                    <div id="chart-date-date" className={cx('chart-date-input')}>
                        <input
                            type="date"
                            id="chart-date1"
                            className={cx('chart-date1')}
                            placeholder="dd-mm-yyyy"
                            defaultValue={takeDate()}
                            onChange={(e) => setDateValue1(e.target.value)}
                        />
                        <span className={cx('chart-')}>-</span>
                        <input
                            type="date"
                            id="chart-date2"
                            className={cx('chart-date2')}
                            placeholder="dd-mm-yyyy"
                            defaultValue={takeDate()}
                            onChange={(e) => setDateValue2(e.target.value)}
                        />
                    </div>
                    <button
                        id="chart-button-tk"
                        className={cx('chart-btn')}
                        onClick={() => handleStatistic(dateValue1, dateValue2)}
                    >
                        Thống kê
                    </button>
                    <div id="chart-quarter-year" className={cx('chart-quarter-year')}>
                        <div>Năm</div>
                        <select
                            className={cx('chart-btn-select')}
                            onChange={(e) => handleDateNow(e.target.value, 'year')}
                        >
                            <option value="2022">Năm 2022</option>
                            <option value="2021">Năm 2021</option>
                            <option value="2020">Năm 2020</option>
                            <option value="2019">Năm 2019</option>
                            <option value="2018">Năm 2018</option>
                            <option value="2017">Năm 2017</option>
                            <option value="2016">Năm 2016</option>
                            <option value="2015">Năm 2015</option>
                            <option value="2014">Năm 2014</option>
                            <option value="2013">Năm 2013</option>
                            <option value="2012">Năm 2012</option>
                            <option value="2012">Năm 2012</option>
                        </select>
                    </div>
                    <div id="chart-quarter-month" className={cx('chart-quarter-month')}>
                        <select
                            id="chart-quarter-select"
                            className={cx('chart-btn-select')}
                            onChange={(e) => handleDateNow(e.target.value, 'year', 'month', yearValue)}
                        >
                            <option value="">...</option>
                            <option value="01">Tháng 1</option>
                            <option value="02">Tháng 2</option>
                            <option value="03">Tháng 3</option>
                            <option value="04">Tháng 4</option>
                            <option value="05">Tháng 5</option>
                            <option value="06">Tháng 6</option>
                            <option value="07">Tháng 7</option>
                            <option value="08">Tháng 8</option>
                            <option value="09">Tháng 9</option>
                            <option value="10">Tháng 10</option>
                            <option value="11">Tháng 11</option>
                            <option value="12">Tháng 12</option>
                        </select>
                    </div>
                    <div className={cx('chart-quarter')}>
                        <a
                            id="chart-chart-quarter-print"
                            href={`${process.env.REACT_APP_URL_FRONTEND}/seller/bill/table/statistical/print/ngdi=2022-11-20/ngde=2022-11-27/nam=null/name=2/type=tuan`}
                            target={'_blank'}
                            rel="noreferrer"
                            className={cx('chart-quarter-print')}
                        >
                            {' '}
                            In Thống kê
                        </a>
                    </div>
                    <div className={cx('chart-quarter')}>
                        <select
                            id="chart-quarter-select-op"
                            className={cx('chart-btn-select')}
                            onChange={(e) => handleDateNow(e.target.value)}
                        >
                            <option value="">...</option>
                            <option value="day">Ngày</option>
                            <option value="7">Tuần</option>
                            <option value="1">Quý 1 (1-3)</option>
                            <option value="2">Quý 2 (4-6)</option>
                            <option value="3">Quý 3 (7-9)</option>
                            <option value="4">Quý 4 (10-12)</option>
                            <option value="365">Năm</option>
                        </select>
                    </div>
                </div>
                {/* <Line className={cx('chart-demo')} option={chartOptions} data={chartData} /> */}
            </div>
            <table className={cx('table__header')}>
                <thead>
                    <tr className={cx('table__header-tr')}>
                        <td className={cx('td_table-name_link')}>
                            {quartersValue === 'tuan'
                                ? 'Ngày'
                                : quartersValue === 'statistical'
                                ? 'Ngày'
                                : quartersValue === 'month'
                                ? 'Ngày'
                                : 'Tháng'}
                        </td>
                        <td className={cx('td_table-name_link')}>Tổng doanh thu</td>
                        <td className={cx('td_table-name_link')}>Tổng đơn hàng</td>
                    </tr>

                    {quartersValue === 'tuan' &&
                    chartListData !== '' &&
                    chartListData !== undefined &&
                    chartListData.length > 0 ? (
                        chartListData.map((pro, index) => (
                            <tr
                                key={index}
                                className={cx(
                                    handleTestColor(index) ? 'table__header-conten-color' : 'table__header-conten',
                                )}
                            >
                                <td className={cx('td_table-name_link')}>{pro}</td>
                                <td className={cx('td_table-name_link')}>{chartListTurnover[index]}</td>
                                <td className={cx('td_table-name_link')}>{chartListNumber[index]}</td>
                            </tr>
                        ))
                    ) : quartersValue === 'quy1' ? (
                        quarters1.map((pro, index) => (
                            <tr
                                key={index}
                                className={cx(
                                    handleTestColor(index) ? 'table__header-conten-color' : 'table__header-conten',
                                )}
                            >
                                <td className={cx('td_table-name_link')}>{pro}</td>
                                <td className={cx('td_table-name_link')}>{chartListTurnover[index]}</td>
                                <td className={cx('td_table-name_link')}>{chartListNumber[index]}</td>
                            </tr>
                        ))
                    ) : quartersValue === 'quy2' ? (
                        quarters2.map((pro, index) => (
                            <tr
                                key={index}
                                className={cx(
                                    handleTestColor(index) ? 'table__header-conten-color' : 'table__header-conten',
                                )}
                            >
                                <td className={cx('td_table-name_link')}>{pro}</td>
                                <td className={cx('td_table-name_link')}>{chartListTurnover[index]}</td>
                                <td className={cx('td_table-name_link')}>{chartListNumber[index]}</td>
                            </tr>
                        ))
                    ) : quartersValue === 'quy3' ? (
                        quarters3.map((pro, index) => (
                            <tr
                                key={index}
                                className={cx(
                                    handleTestColor(index) ? 'table__header-conten-color' : 'table__header-conten',
                                )}
                            >
                                <td className={cx('td_table-name_link')}>{pro}</td>
                                <td className={cx('td_table-name_link')}>{chartListTurnover[index]}</td>
                                <td className={cx('td_table-name_link')}>{chartListNumber[index]}</td>
                            </tr>
                        ))
                    ) : quartersValue === 'quy4' ? (
                        quarters4.map((pro, index) => (
                            <tr
                                key={index}
                                className={cx(
                                    handleTestColor(index) ? 'table__header-conten-color' : 'table__header-conten',
                                )}
                            >
                                <td className={cx('td_table-name_link')}>{pro}</td>
                                <td className={cx('td_table-name_link')}>{chartListTurnover[index]}</td>
                                <td className={cx('td_table-name_link')}>{chartListNumber[index]}</td>
                            </tr>
                        ))
                    ) : quartersValue === 'nam' ? (
                        statisticsByYear.map((pro, index) => (
                            <tr
                                key={index}
                                className={cx(
                                    handleTestColor(index) ? 'table__header-conten-color' : 'table__header-conten',
                                )}
                            >
                                <td className={cx('td_table-name_link')}>{pro}</td>
                                <td className={cx('td_table-name_link')}>{chartListTurnover[index]}</td>
                                <td className={cx('td_table-name_link')}>{chartListNumber[index]}</td>
                            </tr>
                        ))
                    ) : quartersValue === 'statistical' ? (
                        chartListData.map((pro, index) => (
                            <tr
                                key={index}
                                className={cx(
                                    handleTestColor(index) ? 'table__header-conten-color' : 'table__header-conten',
                                )}
                            >
                                <td className={cx('td_table-name_link')}>{pro}</td>
                                <td className={cx('td_table-name_link')}>{chartListTurnover[index]}</td>
                                <td className={cx('td_table-name_link')}>{chartListNumber[index]}</td>
                            </tr>
                        ))
                    ) : quartersValue === 'month' ? (
                        chartListData.map((pro, index) => (
                            <tr
                                key={index}
                                className={cx(
                                    handleTestColor(index) ? 'table__header-conten-color' : 'table__header-conten',
                                )}
                            >
                                <td className={cx('td_table-name_link')}>{pro}</td>
                                <td className={cx('td_table-name_link')}>{chartListTurnover[index]}</td>
                                <td className={cx('td_table-name_link')}>{chartListNumber[index]}</td>
                            </tr>
                        ))
                    ) : (
                        <tr className={cx('td_table-name_no_link')}>
                            <td>Không có link nào.</td>
                        </tr>
                    )}
                </thead>
            </table>

            <ToastContainer />
        </div>
    );
}

export default SellerTableStatistical;
