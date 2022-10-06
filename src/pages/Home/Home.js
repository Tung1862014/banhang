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
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
//import GetCookie from '~/components/Hook/GetCookies';
//import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Home() {
    const [product, setProduct] = useState('');
    const [clickSuggestions, setClickSuggestions] = useState('');
    //console.log(product.length);
    //const [orderValue, setOrderValue] = useState('');
    //const [billId, setBillId] = useState('');

    // const siginList = useSelector((state) => state.numberProduct.list);
    //console.log('billId: ', billId);
    // useEffect(() => {
    //     axios
    //         .get(
    //             `${process.env.REACT_APP_URL_NODEJS}/historybill/cart/show/all?ND_id=${
    //                 JSON.parse(GetCookie('usrin')).ND_id
    //             }&DH_trangthai=all`,
    //         )
    //         .then((res) => {
    //             console.log('data', res.data);
    //             setOrderValue(res.data.results);
    //         })
    //         .catch((err) => {
    //             console.log('loi');
    //         });
    // }, []);

    // useEffect(() => {
    //     let sellerArr = [];
    //     let billIdValue = [];

    //     for (let i = 0; i < orderValue.length; i++) {
    //         if (!sellerArr.includes(orderValue[i].NB_id)) {
    //             sellerArr.push(orderValue[i].NB_id);
    //             billIdValue.push(orderValue[i].DH_id);
    //         }
    //     }

    //     if (sellerArr.length > 0) {
    //         setBillId((prev) => {
    //             const newSeller = [...prev, billIdValue];
    //             return newSeller[0];
    //         });
    //     }
    // }, [orderValue]);
    // //take status bill do update
    // useEffect(() => {
    //     if (billId !== '') {
    //         for (let i = 0; i < billId.length; i++) {
    //             console.log('id bill', billId[i]);
    //             axios
    //                 .get(
    //                     `https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/detail?order_code=${billId[i]}`,
    //                     {
    //                         headers: {
    //                             Token: '9c10964d-37ca-11ed-b608-8a2909007fb0',
    //                         },
    //                     },
    //                 )
    //                 .then((res) => {
    //                     console.log('data status', res.data.data.status);

    //                     if (res.data.data.status === 'picked') {
    //                         let status = '3';
    //                         console.log('id bill', billId[i]);
    //                         axios
    //                             .put(`${process.env.REACT_APP_URL_NODEJS}/historybill/update/auto/bill`, {
    //                                 NB_id: JSON.parse(GetCookie('seller')).ND_id,
    //                                 DH_id: billId[i],
    //                                 DH_trangthai: status,
    //                             })

    //                             .then((res) => {
    //                                 console.log(res.data);
    //                             })
    //                             .catch(() => {
    //                                 console.log('loi khong the show bill');
    //                             });
    //                     } else if (res.data.data.status === 'delivered') {
    //                         let status = '4';
    //                         console.log('id bill', billId[i]);
    //                         axios
    //                             .put(`${process.env.REACT_APP_URL_NODEJS}/historybill/update/auto/bill`, {
    //                                 NB_id: JSON.parse(GetCookie('seller')).ND_id,
    //                                 DH_id: billId[i],
    //                                 DH_trangthai: status,
    //                             })

    //                             .then((res) => {
    //                                 console.log(res.data);
    //                             })
    //                             .catch(() => {
    //                                 console.log('loi khong the show bill');
    //                             });
    //                     }
    //                 })
    //                 .catch((err) => {
    //                     console.log('loi status');
    //                 });
    //         }
    //     }
    // }, [billId]);

    useEffect(() => {
        let url;
        if (clickSuggestions === 'suggestions' || clickSuggestions === '') {
            url = `${process.env.REACT_APP_URL_NODEJS}/product/show/suggestions/all`;
        } else if (clickSuggestions === 'promotion') {
            url = `${process.env.REACT_APP_URL_NODEJS}/product/show/promotion/all`;
        }
        axios
            .get(url)
            .then((res) => {
                console.log(res.data.results);
                setProduct(res.data.results);
            })
            .catch((err) => {
                console.log('loi');
            });
    }, [clickSuggestions]);

    function handleClickSuggestions() {
        const suggestions = document.getElementById('FA284N-N-5qHu-suggestions');
        const promotion = document.getElementById('FA284N-N-5qHu-promotion');

        suggestions.style.display = 'block';
        promotion.style.display = 'none';

        setClickSuggestions('suggestions');
    }

    function handleClickPromotion() {
        const suggestions = document.getElementById('FA284N-N-5qHu-suggestions');
        const promotion = document.getElementById('FA284N-N-5qHu-promotion');

        suggestions.style.display = 'none';
        promotion.style.display = 'block';
        setClickSuggestions('promotion');
    }

    function formatCash(str) {
        return str
            .toString()
            .split('')
            .reverse()
            .reduce((prev, next, index) => {
                return (index % 3 ? next : next + '.') + prev;
            });
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('stardust-tabs-header-wrapper')}>
                <ul className={cx('stardust-tabs-header')}>
                    <li className={cx('stardust-tabs-header__tab-active')} onClick={handleClickSuggestions}>
                        <div id="FA284N-N-5qHu-suggestions" className={cx('FA284N-N-5qHu-suggestions')}></div>
                        <div className={cx('FJibgJ-suggestions')}>
                            <span>GỢI Ý HÔM NAY</span>
                        </div>
                    </li>
                    <li className={cx('stardust-tabs-header__tab-active')} onClick={handleClickPromotion}>
                        <div id="FA284N-N-5qHu-promotion" className={cx('FA284N-N-5qHu-promotion')}></div>
                        <div className={cx('FJibgJ-promotion')}>
                            <span>SẢN PHẨM KHUYẾN MÃI</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div className={cx('stardust-tabs-panels')}>
                <div className={cx('stardust-tabs-panels__panel')}>
                    <div className={cx('_6wTCb6')}>
                        {product !== '' &&
                            product.map((prod, index) => (
                                <div key={index} className={cx('_4beVMw')}>
                                    <Link to={`/detail/product/nameid${prod.SP_id}`}>
                                        <div className={cx('yZLQT4')}>
                                            <div className={cx('uA1waf_4QQ4Ir')}>
                                                <div className={cx('UB2waf')}>
                                                    <div className={cx('n-CE6j-iRsxV')}>
                                                        <img
                                                            width="invalid-value"
                                                            height="invalid-value"
                                                            alt="Kệ để màn hình máy tính - laptop để bàn bằng gỗ trơn kiểu dáng đơn giản tiện dụng giá rẻ HDS-NTK04"
                                                            className={cx('Vz6gJ3-edy5hG')}
                                                            src={
                                                                prod.SP_image ||
                                                                'https://cf.shopee.vn/file/0e06d428fbc48666580e0f535a208637_tn'
                                                            }
                                                        />
                                                        {prod.SP_khuyenmai !== 0 ? (
                                                            <div className={cx('vmaKHl')}>
                                                                <div className={cx('C2-vN-dCT7bq-Od5TJM')}>
                                                                    <span className={cx('percent')}>
                                                                        {prod.SP_khuyenmai}%
                                                                    </span>
                                                                    <span className={cx('mXP-A3')}>giảm</span>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            ''
                                                        )}
                                                    </div>
                                                </div>
                                                <div className={cx('W3bJfG')}>
                                                    <div className={cx('qUEEG4')}>
                                                        <div className={cx('hPc1Pf')}>
                                                            <div className={cx('vc0PvV-AxYdVM')}>{prod.SP_ten}</div>
                                                        </div>
                                                    </div>
                                                    <div className={cx('imdVqB_2fuFWg')}>
                                                        <div className={cx('WSVId4-fepoRf')}>
                                                            <span className={cx('Fea6JM')}>₫</span>
                                                            <span className={cx('j0vBz2')}>
                                                                {formatCash(
                                                                    prod.SP_gia * ((100 - prod.SP_khuyenmai) / 100),
                                                                )}
                                                            </span>
                                                        </div>
                                                        <div className={cx('upl8wJ _82UoSS')}>
                                                            Đã bán {prod.SP_soluongban}
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className={cx('shopee-item-card__hover-footer _1X2yZq')}>
                                                Tìm sản phẩm tương tự
                                            </div> */}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
