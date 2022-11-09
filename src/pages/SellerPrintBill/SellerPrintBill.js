import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import GetCookie from '~/components/Hook/GetCookies';
import styles from './SellerPrintBill.module.scss';

const cx = classNames.bind(styles);

function SellerPrintBill() {
    const [printBill, setPrintBill] = useState('');
    const [sumProduct, setSumProduct] = useState('');
    const [DMY, setDMY] = useState('');

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
        const resultId = pathId.slice(27);
        //console.log(resultId);

        axios
            .post(`${process.env.REACT_APP_URL_NODEJS}/sellerdetailbill/bill/print`, {
                NB_id: JSON.parse(GetCookie('seller')).ND_id,
                DH_id: resultId || '',
            })

            .then((res) => {
                console.log(res.data.result);
                setPrintBill(res.data.result);
                // setBill(res.data.result);
                // setStatusConfirm(res.data.statusconfirm[0].statusconfirm);
                // setStatusDelivered(res.data.statusdelivered[0].statusdelivered);
                // setStatusCancelOrder(res.data.statuscancelOrder[0].statuscancelOrder);
                // setNumber(res.data.number[0].number);
            })
            .catch(() => {
                console.log('loi khong the show print ');
            });
    }, []);

    function handlePrintShow() {
        if (printBill !== '' && sumProduct === '') {
            let sum = 0;
            //console.log(printBill[0].product[1].TTDH_soluong.toString());
            for (let i = 0; i < printBill[0].product.length; i++) {
                sum = sum + printBill[0].product[i].TTDH_soluong;
            }
            const dateValue = new Date(printBill[0].DH_ngay);

            let day = dateValue.getDate();
            let month = dateValue.getMonth() + 1;
            let year = dateValue.getFullYear();

            if (month < 10 && day >= 10) {
                setDMY(day + '-0' + month + '-' + year);
            } else if (month < 10 && day < 10) {
                setDMY('0' + day + '-0' + month + year);
            } else if (month >= 10 && day < 10) {
                setDMY('0' + day + '-' + month + '-' + year);
            } else if (month >= 10 && day >= 10) {
                setDMY(day + '-' + month + '-' + year);
            } else {
                setDMY(day + '-' + month + '-' + year);
            }

            setSumProduct(sum.toString());
            console.log('load');
            setTimeout(() => {
                return window.print();
            }, 800);
        }
    }

    // function ChangeAddress(addrValue) {
    //     if (addrValue !== undefined) {
    //         const newAddress = addrValue.split(',');
    //         return newAddress.reverse().join();
    //     }
    // }
    return (
        <>
            {printBill !== '' && (
                <div className={cx('wrapper')}>
                    {printBill.map((print, index) => (
                        <div key={index} className={cx('inner')}>
                            <div className={cx('bill-print-detail')}>
                                <div className={cx('header-print')}>
                                    <div className={cx('logo-print')}>
                                        <img
                                            className={cx('image-logo')}
                                            src={`http://localhost:5000/logo/logo-1.png`}
                                            alt=""
                                        />
                                    </div>
                                    <div className={cx('id-bill-print')}>
                                        Mã đơn hàng:
                                        <span>{print.DH_id}</span>
                                    </div>
                                </div>
                                <div className={cx('shop-print-infomation')}>
                                    <div className={cx('from-seller')}>
                                        <div className={cx('to-print')}>Từ:</div>
                                        <div className={cx('address')}>
                                            <div className={cx('name-shop')}>{print.shop[0].MTS_ten}</div>
                                            <div className={cx('address-shop')}>
                                                {print.shop[0].MTS_chitiet + ',' + print.shop[0].MTS_diachi}
                                            </div>
                                            <div className={cx('sdt-shop')}>
                                                SĐT: <span>{'0' + print.shop[0].ND_sdt.toString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('from-user')}>
                                        <div className={cx('from-print')}>Đến:</div>
                                        <div className={cx('address')}>
                                            <div className={cx('name-user')}>{print.product[0].ND_hoten}</div>
                                            <div className={cx('address-user')}>{print.DH_diachi}</div>
                                            <div className={cx('sdt-user')}>
                                                SĐT: <span>{print.product[0].ND_sdt}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('conten-product')}>
                                    <div className={cx('content-title')}>
                                        Nội dung hàng(Tổng số lượng sản phẩm: {sumProduct})
                                    </div>
                                    {print.product.map((pro, index) => (
                                        <div key={index} className={cx('content-product-detail')}>
                                            <span className={cx('stt-product')}>{index + 1}.</span>
                                            <div className={cx('name-product')}>{pro.SP_ten}</div>
                                            <span className={cx('number-product')}>,,SL: {pro.TTDH_soluong}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className={cx('regulations-shop')}>
                                    <div className={cx('content-regulations-shop')}>
                                        Kiểm tra tên sản phẩm và đối chiếu mã đơn hàng trước khi nhận hàng
                                    </div>
                                    <div className={cx('date-order')}>
                                        <div className={cx('date')}>Ngày đặt hàng:</div>
                                        <div className={cx('date-content')}>{DMY || ''}</div>
                                    </div>
                                </div>
                                <div className={cx('money-user')}>
                                    <div className={cx('money-user-details')}>
                                        <div className={cx('money-title')}>Tiền thu người nhận</div>
                                        <div className={cx('money-content')}>
                                            {formatCash(print.DH_tongtien + print.DH_phivanchuyen)} VND
                                        </div>
                                    </div>
                                    <div className={cx('signature-user')}>
                                        <div className={cx('signature-title')}>Chữ ký người nhận</div>
                                        <div className={cx('signature-content')}>Xác nhận hàng nguyên vẹn,</div>
                                        <div className={cx('signature-content')}>không móp/méo, bể/vở</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div onLoad={handlePrintShow()}></div>
                </div>
            )}
        </>
    );
}

export default SellerPrintBill;
