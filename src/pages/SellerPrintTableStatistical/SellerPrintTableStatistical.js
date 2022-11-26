import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import GetCookie from '~/components/Hook/GetCookies';
import styles from './SellerPrintTableStatistical.module.scss';
const cx = classNames.bind(styles);

function SellerPrintTableStatistical() {
    const [chartListData, setChartListData] = useState([]);
    const [chartListNumber, setChartListNumber] = useState([]);
    const [chartListTurnover, setChartListTurnover] = useState([]);
    const [quartersValue, setQuarterValue] = useState('');
    const [sumTurnoverValue, setSumTurnoverValue] = useState('');
    const [sumNumberValue, setsumNumberValue] = useState('');

    function formatCash(str) {
        return str
            .toString()
            .split('')
            .reverse()
            .reduce((prev, next, index) => {
                return (index % 3 ? next : next + '.') + prev;
            });
    }

    function handlePrintShow() {
        setTimeout(() => {
            return window.print();
        }, 800);
    }

    /////////////////////////////////////////////////////

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

    useEffect(() => {
        const pathId = window.location.pathname.toString();
        console.log('Ngày đi', pathId.slice(42, 52));
        console.log('Ngày đến', pathId.slice(58, 68));
        console.log('yearNow', pathId.slice(73, 77));
        console.log('nameDate', pathId.slice(83, 84));
        console.log('type', pathId.slice(90));

        let datefrom = pathId.slice(42, 52);
        let dateto = pathId.slice(58, 68);
        let yearNow = pathId.slice(73, 77);

        let typeDate = pathId.slice(90);
        setQuarterValue(typeDate);

        let url = `${process.env.REACT_APP_URL_NODEJS}/chart/table/statistical?ngdi=${datefrom}&ngde=${dateto}&NB_id=${
            JSON.parse(GetCookie('seller')).ND_id
        }&type=${typeDate}&nam=${yearNow}`;
        axios
            .get(url)
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
    }, []);

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

    const handleTakeNameDate = () => {
        const pathId = window.location.pathname.toString();
        let nameDate = pathId.slice(83, 84);
        let yearNow = pathId.slice(73, 77);
        let date = new Date(pathId.slice(42, 52));
        let monthNow = date.getMonth() + 1;

        if (nameDate === '1') {
            return 'Theo Ngày';
        } else if (nameDate === '2') {
            return 'Theo Tuần';
        } else if (nameDate === '3') {
            return `Theo Tháng ${monthNow}`;
        } else if (nameDate === '4') {
            return 'Theo Quý 1';
        } else if (nameDate === '5') {
            return 'Theo Quý 2';
        } else if (nameDate === '6') {
            return 'Theo Quý 3';
        } else if (nameDate === '7') {
            return 'Theo Quý 4';
        } else if (nameDate === '8') {
            return `Theo Năm ${yearNow}`;
        }

        return 'theo ngày';
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('print-title')}>
                    <h3 className={cx('name-title')}>Bảng hống kê doanh thu và đơn hàng {handleTakeNameDate()}</h3>
                    <div>
                        <div className={cx('sum_turnover_value')}>
                            Tổng doanh thu: {formatCash(Number(sumTurnoverValue))} ₫
                        </div>
                        <div className={cx('sum_number_value')}>Tổng đơn: {sumNumberValue}</div>
                    </div>
                </div>
                <table className={cx('table__header')}>
                    <thead>
                        <tr className={cx('table__header-tr')}>
                            <td className={cx('td_table-name_link-title')}>
                                {quartersValue === 'tuan'
                                    ? 'Ngày'
                                    : quartersValue === 'statistical'
                                    ? 'Ngày'
                                    : quartersValue === 'month'
                                    ? 'Ngày'
                                    : 'Tháng'}
                            </td>
                            <td className={cx('td_table-name-title')}>Tổng doanh thu (₫)</td>
                            <td className={cx('td_table-name-title-right')}>Tổng đơn hàng</td>
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
                                    <td className={cx('td_table-name')}>
                                        {formatCash(Number(chartListTurnover[index]))}
                                    </td>
                                    <td className={cx('td_table-name-right')}>{chartListNumber[index]}</td>
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
                                    <td className={cx('td_table-name')}>
                                        {formatCash(Number(chartListTurnover[index]))}
                                    </td>
                                    <td className={cx('td_table-name-right')}>{chartListNumber[index]}</td>
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
                                    <td className={cx('td_table-name')}>
                                        {formatCash(Number(chartListTurnover[index]))} ₫
                                    </td>
                                    <td className={cx('td_table-name-right')}>{chartListNumber[index]}</td>
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
                                    <td className={cx('td_table-name')}>
                                        {formatCash(Number(chartListTurnover[index]))} ₫
                                    </td>
                                    <td className={cx('td_table-name-right')}>{chartListNumber[index]}</td>
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
                                    <td className={cx('td_table-name')}>
                                        {formatCash(Number(chartListTurnover[index]))}
                                    </td>
                                    <td className={cx('td_table-name-right')}>{chartListNumber[index]}</td>
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
                                    <td className={cx('td_table-name')}>
                                        {formatCash(Number(chartListTurnover[index]))}
                                    </td>
                                    <td className={cx('td_table-name-right')}>{chartListNumber[index]}</td>
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
                                    <td className={cx('td_table-name')}>
                                        {formatCash(Number(chartListTurnover[index]))}
                                    </td>
                                    <td className={cx('td_table-name-right')}>{chartListNumber[index]}</td>
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
                                    <td className={cx('td_table-name')}>
                                        {formatCash(Number(chartListTurnover[index]))}
                                    </td>
                                    <td className={cx('td_table-name-right')}>{chartListNumber[index]}</td>
                                </tr>
                            ))
                        ) : (
                            <tr className={cx('td_table-name_no_link')}>
                                <td>Không có link nào.</td>
                            </tr>
                        )}
                    </thead>
                </table>

                <div onLoad={handlePrintShow()}></div>
            </div>
        </>
    );
}

export default SellerPrintTableStatistical;
