import axios from 'axios';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import GetCookie from '~/components/Hook/GetCookies';
import styles from './Seller.module.scss';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
//import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Legend, Title, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
//import { useDebounce } from '~/hooks';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);
//ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Title, Tooltip);

const cx = classNames.bind(styles);

function Seller() {
    // const [title, setTitle] = useState('');
    // const [image, setImage] = useState('');
    const [statusConfirm, setStatusConfirm] = useState('');
    const [statusDelivered, setStatusDelivered] = useState('');
    const [statusCancelOrder, setStatusCancelOrder] = useState('');
    const [statusoutOfStock, setStatusoutOfStock] = useState('');

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_URL_NODEJS}/seller/statistical/show/all?NB_id=${
                    JSON.parse(GetCookie('seller')).ND_id
                }`,
            )

            .then((res) => {
                console.log(res.data);
                //setBill(res.data.result);
                setStatusConfirm(res.data.statusconfirm[0].statusconfirm);
                setStatusDelivered(res.data.statusdelivered[0].statusdelivered);
                setStatusCancelOrder(res.data.statuscancelOrder[0].statuscancelOrder);
                setStatusoutOfStock(res.data.statusoutOfStock[0].statusoutOfStock);
                //setNumber(res.data.number[0].number);
            })
            .catch(() => {
                console.log('loi khong the show bill');
            });
    }, []);

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

    const [chartData, setChartData] = useState({
        datasets: [],
    });
    const [chartOptions, setChartOptions] = useState({});

    const [dateValue1, setDateValue1] = useState(takeDate());
    const [dateValue2, setDateValue2] = useState(takeDate());
    const [activeTurnover, setActiveTurnover] = useState(
        `${process.env.REACT_APP_URL_NODEJS}/chart?ngdi=${dateValue1}&ngde=${dateValue2}&NB_id=${
            JSON.parse(GetCookie('seller')).ND_id
        }`,
    );
    const [chartListData, setChartListData] = useState([]);
    const [chartListNumber, setChartListNumber] = useState([]);
    const [chartListTurnover, setChartListTurnover] = useState([]);

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

    useEffect(() => {
        console.log('List Data: ' + chartListData);
        setChartData({
            labels: chartListData,
            datasets: [
                {
                    label: 'Tổng số lượng đơn hàng',
                    data: chartListNumber,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                    label: 'Doanh thu',
                    data: chartListTurnover,
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
            ],
        });

        setChartOptions({
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: "Whom'st let the dogs out",
                },
            },
        });
    }, [chartListData, chartListNumber, chartListTurnover]);

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
                `${process.env.REACT_APP_URL_NODEJS}/chart?ngdi=${dateValue1}&ngde=${dateValue2}&NB_id=${
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

            setActiveTurnover(
                `${process.env.REACT_APP_URL_NODEJS}/chart?ngdi=${takeDateNow(date)}&ngde=${takeDateNow(
                    dayValue,
                )}&NB_id=${JSON.parse(GetCookie('seller')).ND_id}`,
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

            setActiveTurnover(
                `${process.env.REACT_APP_URL_NODEJS}/chart?ngdi=${dateFrom}&ngde=${dateTo}&NB_id=${
                    JSON.parse(GetCookie('seller')).ND_id
                }`,
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

            setActiveTurnover(
                `${process.env.REACT_APP_URL_NODEJS}/chart?ngdi=${dateFrom}&ngde=${dateTo}&NB_id=${
                    JSON.parse(GetCookie('seller')).ND_id
                }`,
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

            setActiveTurnover(
                `${process.env.REACT_APP_URL_NODEJS}/chart?ngdi=${dateFrom}&ngde=${dateTo}&NB_id=${
                    JSON.parse(GetCookie('seller')).ND_id
                }`,
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

            setActiveTurnover(
                `${process.env.REACT_APP_URL_NODEJS}/chart?ngdi=${dateFrom}&ngde=${dateTo}&NB_id=${
                    JSON.parse(GetCookie('seller')).ND_id
                }`,
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

            setActiveTurnover(
                `${process.env.REACT_APP_URL_NODEJS}/chart?ngdi=${takeDateNow(date)}&ngde=${takeDateNow(
                    dayValue,
                )}&NB_id=${JSON.parse(GetCookie('seller')).ND_id}`,
            );
        } else if (e === '') {
            const formDate = document.getElementById('chart-date1');
            const toDate = document.getElementById('chart-date2');

            formDate.value = '';
            toDate.value = '';
            setDateValue2('');
            setDateValue1('');

            setActiveTurnover(
                `${process.env.REACT_APP_URL_NODEJS}/chart?ngdi=${''}&ngde=${''}&NB_id=${
                    JSON.parse(GetCookie('seller')).ND_id
                }`,
            );
        }
    };

    return (
        <div className={cx('wrapper')}>
            {/* <div className={cx('inner')}>
                <div className={cx('establish')}>
                    <div className={cx('image')}>
                        <img
                            src={image || process.env.REACT_APP_URL_NODEJS_IMAGE + '/default-ui-image.webp'}
                            alt=""
                            className={cx('establish-image')}
                        />
                    </div>
                    <div className={cx('establish-name-shop')}>{title}</div>
                </div>
                <div className={cx('establish-product')}></div>
            </div> */}

            <div className={cx('card-offset')}>
                <div className={cx('title')}>
                    Danh sách cần làm
                    <p className={cx('card-tips')}>Những việc bạn sẽ phải làm</p>
                </div>
                <div className={cx('async-data-wrapper')}>
                    <div className={cx('status')}>
                        <div className={cx('to-do-box')}>
                            <Link to="/seller/bill/@confirm" className={cx('to-do-box-aitem')}>
                                <p className={cx('item-title')}>{statusConfirm !== '' ? statusConfirm : 0}</p>{' '}
                                <p className={cx('item-desc')}>Chờ Xác Nhận</p>
                            </Link>
                            <Link to="/seller/bill/@delivered" className={cx('to-do-box-aitem')}>
                                <p className={cx('item-title')}>{statusDelivered !== '' ? statusDelivered : 0}</p>
                                <p className={cx('item-desc')}>Đã Giao Hàng</p>
                            </Link>

                            <Link to="/seller/bill/@canceloder" className={cx('to-do-box-aitem')}>
                                <p className={cx('item-title')}>{statusCancelOrder !== '' ? statusCancelOrder : 0}</p>{' '}
                                <p className={cx('item-desc')}>Đơn Hủy</p>
                            </Link>
                            <Link to="/seller/product/@OutOfStock" className={cx('to-do-box-aitem')}>
                                <p className={cx('item-title')}>{statusoutOfStock !== '' ? statusoutOfStock : 0}</p>{' '}
                                <p className={cx('item-desc')}>Sản Phẩm Hêt Hàng</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('chart-demo')}>
                <div className={cx('chart-date')}>
                    <div className={cx('chart-date-input')}>
                        <input
                            type="date"
                            id="chart-date1"
                            className={cx('chart-date1')}
                            defaultValue={takeDate()}
                            onChange={(e) => setDateValue1(e.target.value)}
                        />
                        <span className={cx('chart-')}>-</span>
                        <input
                            type="date"
                            id="chart-date2"
                            className={cx('chart-date2')}
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
                <Line className={cx('chart-demo')} option={chartOptions} data={chartData} />
            </div>
            <ToastContainer />
        </div>
    );
}

export default Seller;
