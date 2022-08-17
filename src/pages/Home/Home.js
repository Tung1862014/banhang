// import styles from './home.module.scss';
// import classNames from 'classnames/bind';
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Filler,
//     Legend,
// } from 'chart.js';
// //import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Legend, Title, Tooltip } from 'chart.js';
// import { Line } from 'react-chartjs-2';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// //import { useDebounce } from '~/hooks';
// const cx = classNames.bind(styles);
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);
// //ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Title, Tooltip);

// function Home() {
//     const [chartData, setChartData] = useState({
//         datasets: [],
//     });
//     const [chartOptions, setChartOptions] = useState({});

//     const [dateValue1, setDateValue1] = useState('2022-01-13');
//     const [dateValue2, setDateValue2] = useState('2022-05-18');
//     const [activeTurnover, setActiveTurnover] = useState(
//         `http://localhost:5000/chart?ngdi=${dateValue1}&ngde=${dateValue2}`,
//     );
//     const [chartListData, setChartListData] = useState([]);
//     const [chartListNumber, setChartListNumber] = useState([]);
//     const [chartListTurnover, setChartListTurnover] = useState([]);

//     //const listChart = useDebounce(chartListData, 500);
//     const handleChart = (listDate, listNumber, listTurnover) => {
//         setChartListData(() => [...listDate]);
//         setChartListNumber(() => [...listNumber]);
//         setChartListTurnover(() => [...listTurnover]);
//     };

//     useEffect(() => {
//         axios
//             .get(`${activeTurnover}`)
//             .then((res) => {
//                 // console.log(res.data.length);
//                 let chartListDate = [];
//                 let chartListNumber = [];
//                 let chartListTurnover = [];
//                 for (let i = 0; i < res.data.length; i++) {
//                     let DateChart = new Date(res.data[i].ngaygiaohang);
//                     let day = DateChart.getDate();
//                     let month = DateChart.getMonth() + 1;
//                     let year = DateChart.getFullYear();
//                     chartListDate = [...chartListDate, day + '-' + month + '-' + year];
//                     chartListNumber = [...chartListNumber, res.data[i].soluongban];
//                     chartListTurnover = [...chartListTurnover, res.data[i].doanhthu];
//                 }
//                 handleChart(chartListDate, chartListNumber, chartListTurnover);
//                 //setChartListData(() => [...chartListDate]);
//                 console.log(res.data);
//             })
//             .catch(() => {
//                 console.log('loi chart');
//             });
//     }, [activeTurnover]);

//     useEffect(() => {
//         console.log('List Data: ' + chartListData);
//         setChartData({
//             labels: chartListData,
//             datasets: [
//                 {
//                     label: 'Tổng số lượng bán',
//                     data: chartListNumber,
//                     borderColor: 'rgb(255, 99, 132)',
//                     backgroundColor: 'rgba(255, 99, 132, 0.5)',
//                 },
//                 {
//                     label: 'Doanh thu',
//                     data: chartListTurnover,
//                     borderColor: 'rgb(53, 162, 235)',
//                     backgroundColor: 'rgba(53, 162, 235, 0.5)',
//                 },
//             ],
//         });

//         setChartOptions({
//             responsive: true,
//             plugins: {
//                 legend: {
//                     position: 'top',
//                 },
//                 title: {
//                     display: true,
//                     text: "Whom'st let the dogs out",
//                 },
//             },
//         });
//     }, [chartListData, chartListNumber, chartListTurnover]);

//     const handleStatistic = () => {
//         setActiveTurnover(`http://localhost:5000/chart?ngdi=${dateValue1}&ngde=${dateValue2}`);
//     };

//     return (
//         <div className={cx('chart-demo')}>
//             <div className={cx('chart-date')}>
//                 <input type="date" className={cx('chart-date1')} onChange={(e) => setDateValue1(e.target.value)} />
//                 <input type="date" className={cx('chart-date2')} onChange={(e) => setDateValue2(e.target.value)} />
//                 <button className={cx('chart-btn')} onClick={handleStatistic}>
//                     Liệt kê
//                 </button>
//             </div>
//             <Line className={cx('chart-demo')} option={chartOptions} data={chartData} />
//         </div>
//     );
// }

//export default Home;

import styles from './home.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('title')}>
                    <h3>Gợi Ý Hôm Nay</h3>
                </div>
                <div className={cx('product')}></div>
            </div>
        </div>
    );
}

export default Home;
