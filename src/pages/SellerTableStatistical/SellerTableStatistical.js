import axios from 'axios';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import GetCookie from '~/components/Hook/GetCookies';
import styles from './SellerTableStatistical.module.scss';
import './Seller.css';
import { toast, ToastContainer } from 'react-toastify';

const cx = classNames.bind(styles);

function SellerTableStatistical() {
    // const [statusConfirm, setStatusConfirm] = useState('');
    // const [statusDelivered, setStatusDelivered] = useState('');
    // const [statusCancelOrder, setStatusCancelOrder] = useState('');
    // const [statusoutOfStock, setStatusoutOfStock] = useState('');

    // useEffect(() => {
    //     axios
    //         .get(
    //             `${process.env.REACT_APP_URL_NODEJS}/seller/statistical/show/all?NB_id=${
    //                 JSON.parse(GetCookie('seller')).ND_id
    //             }`,
    //         )

    //         .then((res) => {
    //             console.log(res.data);
    //             //setBill(res.data.result);
    //             setStatusConfirm(res.data.statusconfirm[0].statusconfirm);
    //             setStatusDelivered(res.data.statusdelivered[0].statusdelivered);
    //             setStatusCancelOrder(res.data.statuscancelOrder[0].statuscancelOrder);
    //             setStatusoutOfStock(res.data.statusoutOfStock[0].statusoutOfStock);
    //             //setNumber(res.data.number[0].number);
    //         })
    //         .catch(() => {
    //             console.log('loi khong the show bill');
    //         });
    // }, []);

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

    // const [chartData, setChartData] = useState({
    //     datasets: [],
    // });
    // const [chartOptions, setChartOptions] = useState({});

    const [dateValue1, setDateValue1] = useState(takeDate());
    const [dateValue2, setDateValue2] = useState(takeDate());
    const [activeTurnover, setActiveTurnover] = useState(
        `${process.env.REACT_APP_URL_NODEJS}/chart/table/statistical?ngdi=${dateValue1}&ngde=${dateValue2}&NB_id=${
            JSON.parse(GetCookie('seller')).ND_id
        }`,
    );
    const [chartListData, setChartListData] = useState([]);
    const [chartListNumber, setChartListNumber] = useState([]);
    const [chartListTurnover, setChartListTurnover] = useState([]);
    const [quartersValue, setQuarterValue] = useState([]);

    //const listChart = useDebounce(chartListData, 500);
    const handleChart = (listDate, listNumber, listTurnover) => {
        setChartListData(() => [...listDate]);
        setChartListNumber(() => [...listNumber]);
        setChartListTurnover(() => [...listTurnover]);
    };

    console.log('dateValue1', dateValue1);
    console.log('dateValue2', dateValue2);

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
                        DMY = '0' + day + '-0' + month + year;
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
            setActiveTurnover(
                `${
                    process.env.REACT_APP_URL_NODEJS
                }/chart/table/statistical?ngdi=${dateValue1}&ngde=${dateValue2}&NB_id=${
                    JSON.parse(GetCookie('seller')).ND_id
                }`,
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

            formDate.value = dateFrom;
            toDate.value = dateTo;
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

            formDate.value = dateFrom;
            toDate.value = dateTo;
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

            formDate.value = dateFrom;
            toDate.value = dateTo;
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

            formDate.value = dateFrom;
            toDate.value = dateTo;
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

            formDate.value = takeDateNow(dateFrom);
            toDate.value = takeDateNow(dateTo);
            setDateValue2(takeDateNow(dateTo));
            setDateValue1(takeDateNow(dateFrom));
            setQuarterValue('nam');

            setActiveTurnover(
                `${process.env.REACT_APP_URL_NODEJS}/chart/table/statistical?ngdi=${takeDateNow(
                    dateFrom,
                )}&ngde=${takeDateNow(dateTo)}&NB_id=${JSON.parse(GetCookie('seller')).ND_id}&type=${'nam'}`,
            );
        } else if (e === '') {
            const formDate = document.getElementById('chart-date1');
            const toDate = document.getElementById('chart-date2');

            formDate.value = '';
            toDate.value = '';
            setDateValue2('');
            setDateValue1('');

            setActiveTurnover(
                `${process.env.REACT_APP_URL_NODEJS}/chart/table/statistical?ngdi=${''}&ngde=${''}&NB_id=${
                    JSON.parse(GetCookie('seller')).ND_id
                }`,
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
            <div className={cx('chart-demo')}>
                <div className={cx('chart-date')}>
                    <div className={cx('chart-date-input')}>
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
                    <button className={cx('chart-btn')} onClick={() => handleStatistic(dateValue1, dateValue2)}>
                        Thống kê
                    </button>
                    <div className={cx('chart-quarter')}>
                        <select className={cx('chart-btn-select')} onChange={(e) => handleDateNow(e.target.value)}>
                            <option value="">...</option>
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
                        <td className={cx('td_table-name_link')}>{quartersValue === 'tuan' ? 'Ngày' : 'Tháng'}</td>
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
