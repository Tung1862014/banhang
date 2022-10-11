import { faLocationDot, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import GetCookie from '~/components/Hook/GetCookies';
import RemoveCookie from '~/components/Hook/RemoveCookies';
import SetCookie from '~/components/Hook/SetCookies';
import styles from './Order.module.scss';

const cx = classNames.bind(styles);

function Order() {
    const [sellerValue, setSellerValue] = useState('');
    const [sellerName, setSellerName] = useState('');
    const [orderValue, setOrderValue] = useState('');
    const [sellerClientId, setSellerClientId] = useState(''); //id client paypal
    //const [sumNumber, setSumNumber] = useState('');
    const [price, setPrice] = useState('');
    const [userVaule, setUserVaule] = useState('');
    const [ctyVaule, setCtyVaule] = useState('');
    const [addressVaule, setAddressVaule] = useState('');
    //const [sumNumber, setSumNumber] = useState('');
    const [cityValue, setCityValue] = useState('');
    const [districtValue, setDistrictValue] = useState('');
    const [wardValue, setWardValue] = useState('');

    ////////////////////////////////////////////////////
    const [provinceID, setProvinceID] = useState(''); //id thành phố/ tỉnh
    const [districtID, setDistrictID] = useState(''); // id quận/huyên
    const [wardID, setWardID] = useState(''); //id phường/xã
    ////////////////////////////////////////////////////
    const [serviceIdValue, setServiceIdValue] = useState(''); //goi dich vu
    const [serviceIdUser, setServiceIdUser] = useState(''); //id service user chose
    const [serviceFee, setServiceFee] = useState(''); //phivan chuyen
    //const [namePaypal, setNamePaypal] = useState(''); //Tên Paypal
    const [checkPaypal, setCheckPaypal] = useState(false);

    console.log('serviceIdValue', serviceIdValue);
    console.log('serviceIdUser', serviceIdUser);
    console.log('serviceFee', serviceFee);
    //show user
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_URL_NODEJS}/order/user/show?ND_id=${JSON.parse(GetCookie('usrin')).ND_id}`)
            .then((res) => {
                //console.log('data', res.data);
                setUserVaule(res.data.results);
            })
            .catch((err) => {
                console.log('loi');
            });
    }, []);

    //show order
    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_URL_NODEJS}/cartcustomer/cart/show/all?ND_id=${
                    JSON.parse(GetCookie('usrin')).ND_id
                }`,
            )
            .then((res) => {
                console.log('data', res.data);

                let sellerArr = [];
                let sellerName = [];
                let ClientId = [];

                //let sumnumber = 0;
                let price = 0;

                for (let i = 0; i < res.data.results.length; i++) {
                    if (!sellerArr.includes(res.data.results[i].NB_id)) {
                        ClientId.push(res.data.results[i].seller.MTS_clientId);
                        sellerArr.push(res.data.results[i].NB_id);
                        sellerName.push(res.data.results[i].seller.MTS_ten);
                    }

                    //sumnumber += 1;
                    price +=
                        res.data.results[i].product.SP_gia *
                        res.data.results[i].TTDH_soluong *
                        ((100 - res.data.results[i].product.SP_khuyenmai) / 100);
                }
                //console.log('sellerArr', sellerArr);
                if (sellerArr.length > 0) {
                    setSellerClientId((prev) => {
                        const newSeller = [...prev, ClientId];
                        return newSeller[0];
                    });
                    setSellerValue((prev) => {
                        const newSeller = [...prev, sellerArr];
                        return newSeller[0];
                    });
                    setSellerName((prev) => {
                        const newSeller = [...prev, sellerName];
                        return newSeller[0];
                    });
                    setOrderValue(res.data.results);
                }

                //setSumNumber(sumnumber);
                setPrice(price);
            })
            .catch((err) => {
                console.log('loi');
            });
    }, []);

    // useEffect(() => {
    //     let sellerArr = [];
    //     let sellerName = [];
    //     let ClientId = [];
    //     let namepay = [];
    //     //let sumnumber = 0;
    //     let price = 0;

    //     for (let i = 0; i < orderValue.length; i++) {
    //         if (!sellerArr.includes(orderValue[i].NB_id)) {
    //             ClientId.push(orderValue[i].seller.MTS_clientId);
    //             sellerArr.push(orderValue[i].NB_id);
    //             sellerName.push(orderValue[i].seller.MTS_ten);
    //             namepay.push('Pay' + i);
    //         }

    //         //sumnumber += 1;
    //         price +=
    //             orderValue[i].product.SP_gia *
    //             orderValue[i].TTDH_soluong *
    //             ((100 - orderValue[i].product.SP_khuyenmai) / 100);
    //     }
    //     //console.log('sellerArr', sellerArr);
    //     if (sellerArr.length > 0) {
    //         setSellerClientId((prev) => {
    //             const newSeller = [...prev, ClientId];
    //             return newSeller[0];
    //         });
    //         setSellerValue((prev) => {
    //             const newSeller = [...prev, sellerArr];
    //             return newSeller[0];
    //         });
    //         setSellerName((prev) => {
    //             const newSeller = [...prev, sellerName];
    //             return newSeller[0];
    //         });
    //         setNamePaypal((prev) => {
    //             const newSeller = [...prev, namepay];
    //             return newSeller[0];
    //         });
    //     }

    //     //setSumNumber(sumnumber);
    //     setPrice(price);
    // }, [orderValue]);

    function formatCash(str) {
        return str
            .toString()
            .split('')
            .reverse()
            .reduce((prev, next, index) => {
                return (index % 3 ? next : next + '.') + prev;
            });
    }
    function ChangeAddress(addrValue) {
        const newAddress = addrValue.split(',');
        return newAddress.reverse().join();
    }

    const handleSumProduct = (sell) => {
        let numbers = 0;
        //console.log('sell', sell);
        for (let i = 0; i < orderValue.length; i++) {
            if (sell === orderValue[i].NB_id) {
                numbers += 1;
            }
        }
        //console.log('index', numbers);
        return numbers;
    };

    //tong tien
    const handlePriceSeller = (sell, index) => {
        let price = 0;
        //console.log('sell', sell);
        for (let i = 0; i < orderValue.length; i++) {
            if (sell === orderValue[i].NB_id) {
                price +=
                    orderValue[i].product.SP_gia *
                    orderValue[i].TTDH_soluong *
                    ((100 - orderValue[i].product.SP_khuyenmai) / 100);
            }
            if (i === orderValue.length - 1) {
                let sumValue;
                if (price.toString().length > 6) {
                    sumValue = price + serviceFee[index];
                } else {
                    sumValue = Number(Math.round(formatCash(price)).toFixed(3).replace('.', '')) + serviceFee[index];
                }
                return sumValue;
            }
        }
        //console.log('index', price);
    };

    //tong tien khong phi van chuyen
    const handlePriceSellerNoTransport = (sell, index) => {
        let price = 0;
        //console.log('sell', sell);
        for (let i = 0; i < orderValue.length; i++) {
            if (sell === orderValue[i].NB_id) {
                price +=
                    orderValue[i].product.SP_gia *
                    orderValue[i].TTDH_soluong *
                    ((100 - orderValue[i].product.SP_khuyenmai) / 100);
            }
            if (i === orderValue.length - 1) {
                let sumValue;
                if (price.toString().length > 6) {
                    sumValue = price;
                } else {
                    sumValue = Number(Math.round(formatCash(price)).toFixed(3).replace('.', ''));
                }
                return sumValue;
            }
        }
        //console.log('index', price);
    };

    const handleShowFormAddress = (index) => {
        const address = document.getElementById('ReDGyJ');
        if (index === 'back') {
            address.style.display = 'none';
        } else {
            address.style.display = 'flex';
        }
    };

    const handleSubmitFormAddress = () => {
        //console.log('cty', ctyVaule);
        //console.log('address', addressVaule);
        if (ctyVaule === '' && addressVaule === '') {
        } else {
            axios
                .put(`${process.env.REACT_APP_URL_NODEJS}/order/update/address`, {
                    ND_id: JSON.parse(GetCookie('usrin')).ND_id,
                    ND_diachiGH: ctyVaule,
                    ND_chitiet: addressVaule,
                })
                .then((res) => {
                    if (res.data.update) {
                        const address = document.getElementById('ReDGyJ');
                        address.style.display = 'none';
                    }
                })
                .catch((err) => {
                    console.log('loi');
                });
        }
    };

    const handleClickPay = (pay) => {
        const buttonTick1 = document.getElementById('product-variation--selected');
        const buttonTick2 = document.getElementById('product-variation--selected_pay');
        const iconTick1 = document.getElementById('icon-tick-bold-1');
        const iconTick2 = document.getElementById('icon-tick-bold-2');
        const payID = document.getElementById('_3hU2wO');
        const orderId = document.getElementById('KqH1Px');

        if (pay === 'pay') {
            buttonTick1.style.color = '#222';
            buttonTick1.style.border = '1px solid #222';
            iconTick1.style.display = 'none';

            buttonTick2.style.color = '#ee4d2d';
            buttonTick2.style.border = '1px solid #ee4d2d';
            iconTick2.style.display = 'inline-block';
            payID.style.display = 'none';
            orderId.style.display = 'none';
            // for (let i = 0; i < sellerValue.length; i++) {
            //     console.log('sellerValue[i]', sellerValue[i]);
            setCheckPaypal(true);
            // }
        } else {
            buttonTick2.style.color = '#222';
            buttonTick2.style.border = '1px solid #222';
            iconTick2.style.display = 'none';
            const orderId = document.getElementById('KqH1Px');

            buttonTick1.style.color = '#ee4d2d';
            buttonTick1.style.border = '1px solid #ee4d2d';
            iconTick1.style.display = 'inline-block';
            payID.style.display = 'flex';
            orderId.style.display = 'grid';
            setCheckPaypal(false);
        }
    };

    const handleCountWeight = (prodValue) => {
        let weight = 0;
        //let phone = 0;
        for (let i = 0; i < orderValue.length; i++) {
            if (orderValue[i].NB_id === prodValue) {
                //console.log('weight', orderValue[i].product.SP_trongluong);
                //console.log('number', orderValue[i].TTDH_soluong);
                weight += orderValue[i].product.SP_trongluong * orderValue[i].TTDH_soluong;
                //phone = orderValue[i].seller.ND_sdt;
            }
        }
        //console.log('weight', weight);
        //console.log('phone', phone);
        return weight;
    };

    const handleTakePhone = (prodValue) => {
        let phone = 0;
        for (let i = 0; i < orderValue.length; i++) {
            if (orderValue[i].NB_id === prodValue) {
                //console.log('weight', orderValue[i].product.SP_trongluong);
                //console.log('number', orderValue[i].TTDH_soluong);

                phone += orderValue[i].seller.ND_sdt;
            }
        }

        //console.log('phone', phone);
        return phone;
    };

    const handleTakeAddressSeller = (prodValue) => {
        let addr = 0;
        for (let i = 0; i < orderValue.length; i++) {
            if (orderValue[i].NB_id === prodValue) {
                //console.log('weight', orderValue[i].product.SP_trongluong);
                //console.log('number', orderValue[i].TTDH_soluong);

                addr = orderValue[i].seller.MTS_diachi;
            }
        }

        //console.log('addr', addr);
        return addr;
    };

    const handleInfoProoduct = (prodValue) => {
        //console.log('prodValue', prodValue);
        let arr = [];
        for (let i = 0; i < orderValue.length; i++) {
            if (orderValue[i].NB_id === prodValue) {
                //console.log('orderValue', orderValue[i].product.SP_ten);
                // console.log('prodValue', prodValue);
                // if (arr === undefined) {
                //     arr = {
                //         name: orderValue[i].product.SP_ten.toString(),
                //         code: orderValue[i].product.SP_id.toString(),
                //         quantity: orderValue[i].TTDH_soluong,
                //         price: 200000,
                //         length: 12,
                //         width: 12,
                //         height: 12,
                //     };
                // } else {
                //     arr =
                //         arr +
                //         ',' +
                //         {
                //             name: orderValue[i].product.SP_ten.toString(),
                //             code: orderValue[i].product.SP_id.toString(),
                //             quantity: orderValue[i].TTDH_soluong,
                //             price: 200000,
                //             length: 12,
                //             width: 12,
                //             height: 12,
                //         };
                // }
                arr = [
                    ...arr,
                    {
                        name: orderValue[i].product.SP_ten.toString(),
                        code: orderValue[i].product.SP_id.toString(),
                        quantity: orderValue[i].TTDH_soluong,
                        price: orderValue[i].product.SP_gia,
                        length: 12,
                        width: 12,
                        height: 12,
                    },
                ];
            }
        }
        return arr;
    };

    const handleOrderCustomer = () => {
        axios
            .post(
                `https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shop/all`,

                { offset: 0, limit: 50, client_phone: '' },
                {
                    headers: {
                        token: '9c10964d-37ca-11ed-b608-8a2909007fb0',
                    },
                },
            )
            .then((res) => {
                // console.log('res', res.data.data.shops);
                // console.log('huyen xa', districtID, wardID);
                let lenghtShop = res.data.data.shops.length - 1;
                for (let i = 0; i < res.data.data.shops.length; i++) {
                    for (let j = 0; j < sellerName.length; j++) {
                        // if (res.data.data.shops[i].name === sellerName[j]) {
                        //     console.log(handleInfoProoduct(sellerValue[j]));
                        //     //console.log('arr', arr);
                        //     // console.log(handleCountWeight(sellerValue[j]));
                        //     // console.log(handleTakePhone(sellerValue[j]));
                        // }

                        if (res.data.data.shops[i].name === sellerName[j]) {
                            console.log('res', res.data.data.shops[i]._id);
                            console.log([handleInfoProoduct(sellerValue[j])]);
                            console.log('sellerValue[k]', sellerValue[j]);
                            console.log('districtID, wardID', districtID, wardID);
                            console.log('res', res.data.data.shops[i]._id);
                            console.log('handleInfoProoduct', handleInfoProoduct(sellerValue[j]));
                            console.log('sellerValue[k]', sellerValue[j], sellerName[j]);
                            console.log('handleTakePhone', handleTakePhone(sellerValue[j]).toString());
                            console.log('handleTakeAddressSeller', handleTakeAddressSeller(sellerValue[j]).toString());
                            console.log('submitserviceIdUser', serviceIdUser);
                            axios
                                .post(
                                    `https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create`,
                                    {
                                        payment_type_id: 2,

                                        required_note: 'KHONGCHOXEMHANG',
                                        return_phone: `${handleTakePhone(sellerValue[j]).toString()}`,
                                        return_address: `${handleTakeAddressSeller(sellerValue[j]).toString()}`,
                                        return_district_id: null,
                                        return_ward_code: '',
                                        client_order_code: '',
                                        to_name: `${userVaule !== '' ? userVaule.ND_hoten : 'TinTest124'}`,
                                        to_phone: `${userVaule !== '' ? userVaule.ND_sdt.toString() : '0987654321'}`,
                                        to_address: `${
                                            ctyVaule === '' && userVaule !== '' && userVaule.ND_diachiGH !== undefined
                                                ? userVaule.ND_diachiGH
                                                : ctyVaule
                                        }`,
                                        to_district_id: districtID !== '' ? districtID : districtID,
                                        to_ward_code: wardID !== '' ? wardID : wardID,
                                        cod_amount: handlePriceSellerNoTransport(sellerValue[j], j),
                                        content: null,
                                        weight: handleCountWeight(sellerValue[j]),
                                        length: 19,
                                        width: 14,
                                        height: 10,
                                        pick_station_id: null,
                                        insurance_value: 0,
                                        service_id: serviceIdUser !== '' ? Number(serviceIdUser) : 53321,
                                        service_type_id: null,
                                        coupon: null,
                                        pick_shift: [2],
                                        items: handleInfoProoduct(sellerValue[j]),
                                    },
                                    {
                                        headers: {
                                            Token: '9c10964d-37ca-11ed-b608-8a2909007fb0',
                                            ShopId: res.data.data.shops[i]._id,
                                        },
                                    },
                                )
                                .then((res) => {
                                    console.log('DH', res.data.data);
                                    if (res.data.data.order_code !== undefined) {
                                        axios
                                            .post(`${process.env.REACT_APP_URL_NODEJS}/order/add/orderproduct`, {
                                                DH_id: res.data.data.order_code,
                                                ND_id: `${JSON.parse(GetCookie('usrin')).ND_id}`,
                                                NB_id: sellerValue[j],
                                                DH_tongtien: handlePriceSellerNoTransport(sellerValue[j], j),
                                                DH_loaithanhtoan: 1,
                                                DH_diachi:
                                                    ctyVaule === '' &&
                                                    userVaule !== '' &&
                                                    userVaule.ND_diachiGH !== undefined
                                                        ? userVaule.ND_diachiGH
                                                        : ctyVaule,
                                                DH_phivanchuyen: serviceFee !== '' ? serviceFee[j] : '0',
                                                DH_trangthaiTT: 1,
                                            })
                                            .then((res) => {
                                                console.log('', res.data);
                                                if (i === lenghtShop) {
                                                    window.open('/cart/order?', '_self', 1);
                                                }
                                            })
                                            .catch((err) => {
                                                console.log('loi add');
                                            });
                                    }
                                })
                                .catch((err) => {
                                    console.log('loi DH');
                                });
                        }
                    }
                }
            })
            .catch((err) => {
                console.log('loi');
            });

        // if (sellerValue !== undefined && sellerValue !== '') {
        //     for (let k = 0; k < sellerValue.length; k++) {
        //         console.log('sellerValue', sellerValue[k]);
        //         axios
        //             .post(`${process.env.REACT_APP_URL_NODEJS}/order/add/orderproduct`, {
        //                 DH_id: `LLGLUN${k}`,
        //                 ND_id: `${JSON.parse(GetCookie('usrin')).ND_id}`,
        //                 NB_id: sellerValue[k],
        //                 DH_tongtien: handlePriceSeller(sellerValue[k], k),
        //                 DH_loaithanhtoan: 1,
        //                 DH_diachi:
        //                     ctyVaule === '' && userVaule !== '' && userVaule.ND_diachiGH !== undefined
        //                         ? userVaule.ND_diachiGH
        //                         : ctyVaule,
        //                 DH_phivanchuyen: serviceFee !== '' ? serviceFee[k] : '0',
        //                 DH_trangthaiTT: 1,
        //             })
        //             .then((res) => {
        //                 console.log('', res.data);
        //             })
        //             .catch((err) => {
        //                 console.log('loi add');
        //             });
        //     }
        // }
    };

    //paypal
    function handleOrderCustomerPaypal(index, districtID, wardID) {
        //console.log('handleOrderCustomerPaypal', status, sellerName[index]);
        axios
            .post(
                `https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shop/all`,

                { offset: 0, limit: 50, client_phone: '' },
                {
                    headers: {
                        token: '9c10964d-37ca-11ed-b608-8a2909007fb0',
                    },
                },
            )
            .then((res) => {
                // console.log('res', res.data.data.shops);
                // console.log('huyen xa', districtID, wardID);
                for (let i = 0; i < res.data.data.shops.length; i++) {
                    //for (let j = 0; j < sellerName.length; j++) {
                    // if (res.data.data.shops[i].name === sellerName[j]) {
                    //     console.log(handleInfoProoduct(sellerValue[j]));
                    //     //console.log('arr', arr);
                    //     // console.log(handleCountWeight(sellerValue[j]));
                    //     // console.log(handleTakePhone(sellerValue[j]));
                    // }

                    if (res.data.data.shops[i].name === sellerName[index]) {
                        // console.log('res', res.data.data.shops[i]._id);
                        // console.log('handleInfoProoduct', handleInfoProoduct(sellerValue[index]));
                        // console.log('sellerValue[k]', sellerValue[index], sellerName[index]);
                        // console.log('handleTakePhone', handleTakePhone(sellerValue[index]).toString());
                        // console.log('handleTakeAddressSeller', handleTakeAddressSeller(sellerValue[index]).toString());
                        // console.log(
                        //     'handlePriceSellerNoTransport',
                        //     handlePriceSellerNoTransport(sellerValue[index], index),
                        // );
                        // console.log('handleCountWeight', handleCountWeight(sellerValue[index]));
                        console.log('districtID', JSON.parse(GetCookie('district')));
                        console.log('wardID', JSON.parse(GetCookie('ward')));

                        const resultPhone = `${handleTakePhone(sellerValue[index]).toString()}`;
                        const resultAdress = `${handleTakeAddressSeller(sellerValue[index]).toString()}`;
                        const resultWeight = handleCountWeight(sellerValue[index]);
                        const resultItems = handleInfoProoduct(sellerValue[index]);
                        axios
                            .post(
                                `https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create`,
                                {
                                    payment_type_id: 1,

                                    required_note: 'KHONGCHOXEMHANG',
                                    return_phone: resultPhone,
                                    return_address: resultAdress,
                                    return_district_id: null,
                                    return_ward_code: '',
                                    client_order_code: '',
                                    to_name: `${userVaule !== '' ? userVaule.ND_hoten.toString() : 'TinTest124'}`,
                                    to_phone: `${userVaule !== '' ? userVaule.ND_sdt.toString() : '0987654321'}`,
                                    to_address: `${
                                        ctyVaule === '' &&
                                        userVaule !== '' &&
                                        userVaule.ND_diachiGH.toString() !== undefined
                                            ? userVaule.ND_diachiGH
                                            : ctyVaule
                                    }`,
                                    to_district_id:
                                        GetCookie('ward') !== undefined
                                            ? JSON.parse(GetCookie('district'))
                                            : districtID,
                                    to_ward_code:
                                        GetCookie('ward') !== undefined ? JSON.parse(GetCookie('ward')) : wardID,

                                    content: null,
                                    weight: resultWeight,
                                    length: 19,
                                    width: 14,
                                    height: 10,
                                    pick_station_id: null,
                                    insurance_value: 0,
                                    service_id: serviceIdUser !== '' ? Number(serviceIdUser) : 53321,
                                    service_type_id: 2,
                                    coupon: null,
                                    pick_shift: [2],
                                    items: resultItems,
                                },
                                {
                                    headers: {
                                        Token: '9c10964d-37ca-11ed-b608-8a2909007fb0',
                                        ShopId: res.data.data.shops[i]._id,
                                    },
                                },
                            )
                            .then((res) => {
                                console.log('DH', res.data.data.order_code);
                                if (res.data.data.order_code !== undefined) {
                                    axios
                                        .post(`${process.env.REACT_APP_URL_NODEJS}/order/add/orderproduct`, {
                                            DH_id: res.data.data.order_code,
                                            ND_id: `${JSON.parse(GetCookie('usrin')).ND_id}`,
                                            NB_id: sellerValue[index],
                                            DH_tongtien: handlePriceSellerNoTransport(sellerValue[index], index),
                                            DH_loaithanhtoan: 2,
                                            DH_diachi:
                                                ctyVaule === '' &&
                                                userVaule !== '' &&
                                                userVaule.ND_diachiGH !== undefined
                                                    ? userVaule.ND_diachiGH
                                                    : ctyVaule,
                                            DH_phivanchuyen:
                                                GetCookie('servicefee') !== undefined
                                                    ? JSON.parse(GetCookie('servicefee'))
                                                    : '0',
                                            DH_trangthaiTT: 1,
                                        })
                                        .then((res) => {
                                            console.log('', res.data);
                                            window.open(`${process.env.REACT_APP_URL_FRONTEND}/cart/order`, '_self', 1);
                                        })
                                        .catch((err) => {
                                            console.log('loi add');
                                        });
                                }
                            })
                            .catch((err) => {
                                console.log('loi DH');
                            });
                    }
                }
            })
            .catch((err) => {
                console.log('loi');
            });
    }

    //Take package DV
    useEffect(() => {
        if (districtID !== '' && wardID !== '') {
            axios
                .post(
                    `https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shop/all`,

                    { offset: 0, limit: 50, client_phone: '' },
                    {
                        headers: {
                            token: '9c10964d-37ca-11ed-b608-8a2909007fb0',
                        },
                    },
                )
                .then((res) => {
                    console.log('shop', res.data.data.shops);
                    //console.log('huyen xa', districtID, wardID);
                    for (let i = 0; i < res.data.data.shops.length; i++) {
                        for (let j = 0; j < sellerName.length; j++) {
                            if (res.data.data.shops[i].name === sellerName[j]) {
                                axios
                                    .post(
                                        `https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services`,
                                        {
                                            shop_id: res.data.data.shops[i]._id,
                                            from_district: res.data.data.shops[i].district_id,
                                            to_district: districtID !== '' ? districtID : districtID,
                                        },
                                        {
                                            headers: {
                                                token: '9c10964d-37ca-11ed-b608-8a2909007fb0',
                                                ShopId: res.data.data.shops[i]._id,
                                            },
                                        },
                                    )
                                    .then((res) => {
                                        console.log('goi dv', res.data.data);
                                        let idservice = [];
                                        for (let i = 0; i < res.data.data.length; i++) {
                                            if (
                                                res.data.data[i].short_name !== '' &&
                                                res.data.data[i].service_type_id !== 0
                                            ) {
                                                if (!idservice.includes(res.data.data[i].service_id)) {
                                                    idservice.push(res.data.data[i]);
                                                }
                                            }
                                            if (i === res.data.data.length - 1) {
                                                setServiceIdValue(idservice);
                                                setServiceIdUser(idservice[0].service_id);
                                            }
                                        }
                                    })
                                    .catch((err) => {
                                        console.log('loi goi dv');
                                    });
                            }
                        }
                    }
                })
                .catch((err) => {
                    console.log('loi');
                });
        }
    }, [sellerName, districtID, wardID]);

    //Tinh phi van chuyen
    useEffect(() => {
        const handleCountWeightt = (prodValue) => {
            let weight = 0;
            //let phone = 0;
            for (let i = 0; i < orderValue.length; i++) {
                if (orderValue[i].NB_id === prodValue) {
                    console.log('SP_trongluong', orderValue[i]);
                    //console.log('weight', orderValue[i].product.SP_trongluong);
                    //console.log('number', orderValue[i].TTDH_soluong);
                    weight += orderValue[i].product.SP_trongluong * orderValue[i].TTDH_soluong;
                    //phone = orderValue[i].seller.ND_sdt;
                }
            }
            //console.log('weightt', weight);
            //console.log('phone', phone);
            return weight;
        };

        const handlePriceSellerNoTransport = (sell, index) => {
            let price = 0;
            //console.log('sell', sell);
            for (let i = 0; i < orderValue.length; i++) {
                if (sell === orderValue[i].NB_id) {
                    price +=
                        orderValue[i].product.SP_gia *
                        orderValue[i].TTDH_soluong *
                        ((100 - orderValue[i].product.SP_khuyenmai) / 100);
                }
                if (i === orderValue.length - 1) {
                    let sumValue;
                    if (price.toString().length > 6) {
                        sumValue = price;
                    } else {
                        sumValue = Number(Math.round(formatCash(price)).toFixed(3).replace('.', ''));
                    }
                    return sumValue;
                }
            }
            //console.log('index', price);
        };

        if (districtID !== '' && wardID !== '') {
            axios
                .post(
                    `https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shop/all`,

                    { offset: 0, limit: 50, client_phone: '' },
                    {
                        headers: {
                            token: '9c10964d-37ca-11ed-b608-8a2909007fb0',
                        },
                    },
                )
                .then((res) => {
                    console.log('sellerName', sellerName);
                    //console.log('huyen xa', districtID, wardID);
                    for (let i = 0; i < res.data.data.shops.length; i++) {
                        for (let j = 0; j < sellerName.length; j++) {
                            if (res.data.data.shops[i].name === sellerName[j]) {
                                // console.log('district_id', res.data.data.shops[i]);
                                // console.log('huyen xa', districtID, wardID);
                                // console.log('weight', handleCountWeightt(sellerValue[j]));

                                axios
                                    .post(
                                        `https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee`,

                                        {
                                            from_district_id: res.data.data.shops[i].district_id,
                                            service_id: serviceIdUser !== '' ? Number(serviceIdUser) : '',
                                            service_type_id: null,
                                            to_district_id: districtID !== '' ? districtID : districtID,
                                            to_ward_code: wardID !== '' ? wardID : wardID,
                                            weight: handleCountWeightt(sellerValue[j]),
                                            length: 19,
                                            width: 14,
                                            height: 10,
                                            insurance_value: handlePriceSellerNoTransport(sellerValue[j], j),
                                            coupon: null,
                                        },
                                        {
                                            headers: {
                                                token: '9c10964d-37ca-11ed-b608-8a2909007fb0',
                                                ShopId: res.data.data.shops[i]._id,
                                            },
                                        },
                                    )
                                    .then((res) => {
                                        console.log('DV res.data.data', res.data.data);
                                        RemoveCookie('servicefee');
                                        SetCookie('servicefee', JSON.stringify(res.data.data.service_fee));
                                        // let arr = [];
                                        // arr.push(res.data.data.service_fee);
                                        //setServiceFee()
                                        // if (sellerName.length === serviceFee.length) {
                                        //     setServiceFee((prev) => {
                                        //         const newSeller = [res.data.data.service_fee];
                                        //         return newSeller;
                                        //     });
                                        // } else {
                                        setServiceFee((prev) => {
                                            const newSeller = [...prev, res.data.data.service_fee];
                                            return newSeller;
                                        });
                                        // }
                                    })
                                    .catch((err) => {
                                        console.log('loi Dv nha');
                                    });
                            }
                        }
                    }
                })
                .catch((err) => {
                    console.log('loi');
                });
        }
    }, [sellerName, districtID, wardID, sellerValue, orderValue, serviceIdUser]);

    const handleSumService = (dataValue) => {
        let service = 0;
        for (let i = 0; i < dataValue.length; i++) {
            service = service + dataValue[i];
        }
        return service;
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //take data City
    useEffect(() => {
        axios
            .get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province`, {
                method: 'get',
                headers: {
                    token: '9c10964d-37ca-11ed-b608-8a2909007fb0',
                },
            })
            .then((res) => {
                //console.log('res', res.data.data);
                setCityValue(res.data.data);
                if (userVaule !== '' && userVaule.ND_diachiGH !== undefined) {
                    let arrValue = userVaule.ND_diachiGH.split(',');
                    //console.log('arrValue', arrValue);

                    for (let i = 0; i < res.data.data.length; i++) {
                        if (res.data.data[i].ProvinceName === arrValue[0]) {
                            //console.log('tinh', res.data.data);
                            setProvinceID(res.data.data[i].ProvinceID);
                        }
                    }
                }
            })
            .catch((err) => {
                console.log('loi');
            });
    }, [userVaule]);

    //take data district
    useEffect(() => {
        if (provinceID !== '') {
            axios
                .get(
                    `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${provinceID}`,
                    {
                        method: 'get',
                        headers: {
                            token: '9c10964d-37ca-11ed-b608-8a2909007fb0',
                        },
                    },
                )
                .then((res) => {
                    //console.log('huyen', res.data.data);
                    setDistrictValue(res.data.data);
                    let arrValue = userVaule.ND_diachiGH.split(',');
                    console.log('arrValue', arrValue);

                    for (let i = 0; i < res.data.data.length; i++) {
                        if (res.data.data[i].DistrictName === arrValue[1]) {
                            //console.log('huyen', res.data.data);
                            setDistrictID(res.data.data[i].DistrictID);
                            RemoveCookie('district');
                            SetCookie('district', JSON.stringify(res.data.data[i].DistrictID));
                        }
                    }
                })
                .catch((err) => {
                    console.log('loi');
                });
        }
    }, [provinceID, userVaule]);

    //take data ward
    useEffect(() => {
        if (districtID !== '') {
            axios
                .get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtID}`, {
                    method: 'get',
                    headers: {
                        token: '9c10964d-37ca-11ed-b608-8a2909007fb0',
                    },
                })
                .then((res) => {
                    //console.log('xa', res.data.data);
                    setWardValue(res.data.data);
                    let arrValue = userVaule.ND_diachiGH.split(',');
                    //console.log('arrValue', arrValue);

                    for (let i = 0; i < res.data.data.length; i++) {
                        if (res.data.data[i].WardName === arrValue[2]) {
                            //console.log('xa', res.data.data[i].WardCode);
                            setWardID(res.data.data[i].WardCode);
                            RemoveCookie('ward');
                            SetCookie('ward', JSON.stringify(res.data.data[i].WardCode));
                        }
                    }
                })
                .catch((err) => {
                    console.log('loi');
                });
        }
    }, [districtID, userVaule]);

    //open/close form

    const handleOpenFormIcon = () => {
        const iconDown = document.getElementById('Izrgn0');
        const iconUp = document.getElementById('Izrgn1');
        const formAddress = document.getElementById('H8sVZh');

        iconDown.style.display = 'none';
        iconUp.style.display = 'flex';
        formAddress.style.display = 'flex';
        if (userVaule !== undefined && userVaule.ND_diachiGH !== undefined) {
            const inputValue = document.getElementById('ChI2Nx_92k3pl');

            inputValue.defaultValue = ctyVaule;
        }
    };

    const handleCloseFormIcon = (pxValue) => {
        if (pxValue !== undefined) {
            const iconDown = document.getElementById('Izrgn0');
            const iconUp = document.getElementById('Izrgn1');
            const formAddress = document.getElementById('H8sVZh');

            iconDown.style.display = 'flex';
            iconUp.style.display = 'none';
            formAddress.style.display = 'none';
            if (ctyVaule.split(',')[1] === undefined) {
                setCtyVaule(ctyVaule + ',' + pxValue);
            } else {
                let arr = ctyVaule.split(',');
                arr[2] = pxValue;
                setCtyVaule(arr.join(','));
            }
        } else {
            const iconDown = document.getElementById('Izrgn0');
            const iconUp = document.getElementById('Izrgn1');
            const formAddress = document.getElementById('H8sVZh');

            iconDown.style.display = 'flex';
            iconUp.style.display = 'none';
            formAddress.style.display = 'none';

            if (ctyVaule === '' && userVaule.ND_diachiGH !== undefined) {
                const inputValue = document.getElementById('ChI2Nx_92k3pl');

                inputValue.defaultValue =
                    ctyVaule === '' && userVaule !== '' && userVaule.ND_diachiGH !== undefined
                        ? userVaule.ND_diachiGH
                        : ctyVaule;
            }
        }
    };

    //form click city
    const handleClickCity = () => {
        const inputCity = document.getElementById('_1E8NDO1');
        const inputDistrict = document.getElementById('_1E8NDO2');
        const inputWard = document.getElementById('_1E8NDO3');
        const cityValue = document.getElementById('aox-Gc1');
        const districtValue = document.getElementById('aox-Gc2');
        const wardValue = document.getElementById('aox-Gc3');

        const destinationBrick = document.getElementById('_0Eu0W2_LqeTPG');

        inputCity.style.color = '#ee4d2d';
        inputDistrict.style.color = '#161823';
        inputWard.style.color = '#161823';

        destinationBrick.style.transform = 'translate(0%, 0px)';
        cityValue.style.display = 'inline-block';
        districtValue.style.display = 'none';
        wardValue.style.display = 'none';
    };
    //form click district
    const handleClickDistrict = (ProvinceID, ctValue) => {
        if (ProvinceID !== undefined) {
            const inputCity = document.getElementById('_1E8NDO1');
            const inputDistrict = document.getElementById('_1E8NDO2');
            const inputWard = document.getElementById('_1E8NDO3');
            const cityValue = document.getElementById('aox-Gc1');
            const districtValue = document.getElementById('aox-Gc2');
            const wardValue = document.getElementById('aox-Gc3');

            const destinationBrick = document.getElementById('_0Eu0W2_LqeTPG');

            inputCity.style.color = '#161823';
            inputDistrict.style.color = '#ee4d2d';
            inputWard.style.color = '#161823';

            destinationBrick.style.transform = 'translate(100%, 0px)';
            cityValue.style.display = 'none';
            districtValue.style.display = 'inline-block';
            wardValue.style.display = 'none';
            setProvinceID(ProvinceID);
            setCtyVaule(ctValue);
        } else {
            const inputCity = document.getElementById('_1E8NDO1');
            const inputDistrict = document.getElementById('_1E8NDO2');
            const inputWard = document.getElementById('_1E8NDO3');
            const cityValue = document.getElementById('aox-Gc1');
            const districtValue = document.getElementById('aox-Gc2');
            const wardValue = document.getElementById('aox-Gc3');

            const destinationBrick = document.getElementById('_0Eu0W2_LqeTPG');

            inputCity.style.color = '#161823';
            inputDistrict.style.color = '#ee4d2d';
            inputWard.style.color = '#161823';

            destinationBrick.style.transform = 'translate(100%, 0px)';
            cityValue.style.display = 'none';
            districtValue.style.display = 'inline-block';
            wardValue.style.display = 'none';
        }
    };
    //form click ward
    const handleClickWard = (DistrictID, qhValue) => {
        if (DistrictID !== undefined && ctyVaule !== '') {
            const inputCity = document.getElementById('_1E8NDO1');
            const inputDistrict = document.getElementById('_1E8NDO2');
            const inputWard = document.getElementById('_1E8NDO3');
            const cityValue = document.getElementById('aox-Gc1');
            const districtValue = document.getElementById('aox-Gc2');
            const wardValue = document.getElementById('aox-Gc3');

            const destinationBrick = document.getElementById('_0Eu0W2_LqeTPG');

            inputCity.style.color = '#161823';
            inputDistrict.style.color = '#161823';
            inputWard.style.color = '#ee4d2d';

            destinationBrick.style.transform = 'translate(200%, 0px)';
            cityValue.style.display = 'none';
            districtValue.style.display = 'none';
            wardValue.style.display = 'inline-block';
            setDistrictID(DistrictID);

            if (ctyVaule !== '' && ctyVaule.split(',')[1] === undefined) {
                setCtyVaule(ctyVaule + ',' + qhValue);
            } else if (ctyVaule !== '') {
                let arr = ctyVaule.split(',');
                arr[1] = qhValue;
                setCtyVaule(arr.join(','));
            }
        } else if (ctyVaule !== '') {
            const inputCity = document.getElementById('_1E8NDO1');
            const inputDistrict = document.getElementById('_1E8NDO2');
            const inputWard = document.getElementById('_1E8NDO3');
            const cityValue = document.getElementById('aox-Gc1');
            const districtValue = document.getElementById('aox-Gc2');
            const wardValue = document.getElementById('aox-Gc3');

            const destinationBrick = document.getElementById('_0Eu0W2_LqeTPG');

            inputCity.style.color = '#161823';
            inputDistrict.style.color = '#161823';
            inputWard.style.color = '#ee4d2d';

            destinationBrick.style.transform = 'translate(200%, 0px)';
            cityValue.style.display = 'none';
            districtValue.style.display = 'none';
            wardValue.style.display = 'inline-block';
        }
    };

    ///take client id paypal
    // function takeClientId(index) {
    //     let ClientId = [];

    //     for (let i = 0; i < orderValue.length; i++) {
    //         if (orderValue[i].NB_id === index) {
    //             return ClientId.push(orderValue[i].seller.MTS_clientId);
    //         }
    //     }
    // }

    //change đơn vị vận chuyển
    function handleChangeShipping(e) {
        setServiceFee('');
        setServiceIdUser(e);
    }

    return (
        <div className={cx('wrapper')}>
            <div id="ReDGyJ" className={cx('ReDGyJ')}>
                <div className={cx('_68lNMv')}>
                    <div className={cx('nwCEcV')}>
                        <div className={cx('w2EqJ')}>
                            <div className={cx('_84tOMz')}>Cập nhật địa chỉ</div>
                            <form>
                                <div className={cx('lHCVqO')}>
                                    <div className={cx('iWBSHn')}>
                                        <div className={cx('_0fHnjY')}>
                                            <div className={cx('XjHkd3')}>
                                                <div className={cx('T1souv')}>
                                                    <div className={cx('u1wAmL')}>
                                                        <div className={cx('vEFwLK_6DXlE9')}>
                                                            Phường/Xã, Quận/Huyện,Tỉnh/ Thành phố
                                                        </div>
                                                        <input
                                                            id="ChI2Nx_92k3pl"
                                                            className={cx('ChI2Nx_92k3pl')}
                                                            type="text"
                                                            placeholder="Xã An Hóa, Huyện Châu Thành, Bến Tre  "
                                                            defaultValue={
                                                                ctyVaule === '' &&
                                                                userVaule !== '' &&
                                                                userVaule.ND_diachiGH !== undefined
                                                                    ? userVaule.ND_diachiGH
                                                                    : ctyVaule
                                                            }
                                                            onChange={(e) => setCtyVaule(e.target.value)}
                                                            onFocus={() => handleOpenFormIcon()}
                                                        />
                                                        <FontAwesomeIcon
                                                            id="Izrgn0"
                                                            className={cx('Izrgn0')}
                                                            icon={faSortDown}
                                                            onClick={() => handleOpenFormIcon()}
                                                        />
                                                        <FontAwesomeIcon
                                                            id="Izrgn1"
                                                            className={cx('Izrgn1')}
                                                            icon={faSortUp}
                                                            onClick={() => handleCloseFormIcon()}
                                                        />
                                                    </div>
                                                </div>
                                                <div id="H8sVZh" className={cx('H8sVZh')}>
                                                    <div className={cx('qtcuwq')}>
                                                        <div
                                                            id="_1E8NDO1"
                                                            className={cx('_1E8NDO1')}
                                                            onClick={() => handleClickCity()}
                                                        >
                                                            Tỉnh/Thành phố
                                                        </div>
                                                        <div
                                                            id="_1E8NDO2"
                                                            className={cx('_1E8NDO2')}
                                                            onClick={() => ctyVaule !== '' && handleClickDistrict()}
                                                        >
                                                            Quận/Huyện
                                                        </div>
                                                        <div
                                                            id="_1E8NDO3"
                                                            className={cx('_1E8NDO3')}
                                                            onClick={() =>
                                                                ctyVaule !== '' &&
                                                                ctyVaule.split(',')[1] !== undefined &&
                                                                handleClickWard()
                                                            }
                                                        >
                                                            Phường/ Xã
                                                        </div>
                                                    </div>
                                                    <div id="_0Eu0W2_LqeTPG" className={cx('_0Eu0W2_LqeTPG')}></div>
                                                    <div id="aox-Gc1" className={cx('aox-Gc1')}>
                                                        {cityValue !== ''
                                                            ? cityValue.map((city, index) => (
                                                                  <div
                                                                      key={index}
                                                                      className={cx('Pcd7He')}
                                                                      onClick={() =>
                                                                          handleClickDistrict(
                                                                              city.ProvinceID,
                                                                              city.ProvinceName,
                                                                          )
                                                                      }
                                                                  >
                                                                      {city.ProvinceName}
                                                                  </div>
                                                              ))
                                                            : ''}
                                                    </div>
                                                    <div id="aox-Gc2" className={cx('aox-Gc2')}>
                                                        {districtValue !== ''
                                                            ? districtValue.map((district, index) => (
                                                                  <div
                                                                      key={index}
                                                                      className={cx('Pcd7He')}
                                                                      onClick={() =>
                                                                          handleClickWard(
                                                                              district.DistrictID,
                                                                              district.DistrictName,
                                                                          )
                                                                      }
                                                                  >
                                                                      {district.DistrictName}
                                                                  </div>
                                                              ))
                                                            : ''}
                                                    </div>
                                                    <div id="aox-Gc3" className={cx('aox-Gc3')}>
                                                        {wardValue !== ''
                                                            ? wardValue.map((ward, index) => (
                                                                  <div
                                                                      key={index}
                                                                      className={cx('Pcd7He')}
                                                                      onClick={() => handleCloseFormIcon(ward.WardName)}
                                                                  >
                                                                      {ward.WardName}
                                                                  </div>
                                                              ))
                                                            : ''}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('_0fHnjY')}>
                                            <div className={cx('SnzDoF')}>
                                                <div className={cx('QbqEj_tyikTg_RYXN7V')}>
                                                    <div className={cx('M9JCAS')}>
                                                        <div className={cx('oaCSZH_bG1pWU')}>Địa chỉ cụ thể</div>
                                                        <textarea
                                                            className={cx('gRsrLD')}
                                                            placeholder="Địa chỉ cụ thể"
                                                            defaultValue={
                                                                userVaule !== '' && userVaule.ND_chitiet !== ''
                                                                    ? userVaule.ND_chitiet
                                                                    : ''
                                                            }
                                                            onChange={(e) => setAddressVaule(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* / */}
                                    <div className={cx('GixP1t')}>
                                        <button
                                            className={cx('HtW4DS_x4AEET')}
                                            onClick={() => handleShowFormAddress('back')}
                                        >
                                            Trở Lại
                                        </button>
                                        <button
                                            className={cx('HtW4DS_IJ1jvV')}
                                            onClick={() => handleSubmitFormAddress()}
                                        >
                                            Hoàn thành
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className={cx('ZrE0do')}>
                    <div className={cx('w6riq3')}>
                        <div className={cx('-JzzK5')}>
                            <div className={cx('HTDM2R_OiE33Y')}>
                                <div className={cx('HTDM2R_wXtDZ')}>Sản phẩm</div>
                            </div>

                            <div className={cx('HTDM2R')}>Đơn giá</div>
                            <div className={cx('HTDM2R')}>Số lượng</div>
                            <div className={cx('HTDM2R_eiM3n1')}>Thành tiền</div>
                        </div>
                    </div>
                    {/* / */}
                    {sellerValue !== ''
                        ? sellerValue.map((sell, index) => (
                              <div key={index}>
                                  <div className={cx('dwwHJ-')}>
                                      <div>
                                          <div className={cx('nF6yNn')}>
                                              <div className={cx('yknSi4')}>
                                                  <div className={cx('WJIXj0')}>{sellerName[index]}</div>
                                              </div>
                                              {orderValue !== ''
                                                  ? orderValue.map((order, index) =>
                                                        sell === order.NB_id ? (
                                                            <div key={index} className={cx('CZ6uu2')}>
                                                                <div className={cx('_6kMvNg_ka6CzP')}>
                                                                    <div className={cx('_4MGXB1_c7N4lb')}>
                                                                        <img
                                                                            className={cx('GCGEKm')}
                                                                            alt=""
                                                                            src={
                                                                                order.product.SP_image ||
                                                                                process.env.REACT_APP_URL_NODEJS_IMAGE +
                                                                                    '/default-ui-image.webp'
                                                                            }
                                                                            width="40"
                                                                            height="40"
                                                                        />
                                                                        <span className={cx('F8X-cZ')}>
                                                                            <span className={cx('tPzkNt')}>
                                                                                {order.product.SP_ten}
                                                                            </span>
                                                                        </span>
                                                                    </div>
                                                                    <div className={cx('_4MGXB1')}>
                                                                        ₫
                                                                        {order.product.SP_gia !== undefined &&
                                                                        order.product.SP_gia.toString().length > 6
                                                                            ? formatCash(
                                                                                  order.product.SP_gia *
                                                                                      ((100 -
                                                                                          order.product.SP_khuyenmai) /
                                                                                          100),
                                                                              )
                                                                            : Math.round(
                                                                                  formatCash(
                                                                                      order.product.SP_gia *
                                                                                          ((100 -
                                                                                              order.product
                                                                                                  .SP_khuyenmai) /
                                                                                              100),
                                                                                  ),
                                                                              ).toFixed(3)}
                                                                    </div>
                                                                    <div className={cx('_4MGXB1')}>
                                                                        {order.TTDH_soluong}
                                                                    </div>
                                                                    <div className={cx('_4MGXB1_8fgmps')}>
                                                                        ₫
                                                                        {order.product.SP_gia !== undefined &&
                                                                        order.product.SP_gia.toString().length > 6
                                                                            ? formatCash(
                                                                                  order.product.SP_gia *
                                                                                      ((100 -
                                                                                          order.product.SP_khuyenmai) /
                                                                                          100) *
                                                                                      order.TTDH_soluong,
                                                                              )
                                                                            : formatCash(
                                                                                  Number(
                                                                                      Math.round(
                                                                                          formatCash(
                                                                                              order.product.SP_gia *
                                                                                                  ((100 -
                                                                                                      order.product
                                                                                                          .SP_khuyenmai) /
                                                                                                      100),
                                                                                          ),
                                                                                      )
                                                                                          .toFixed(3)
                                                                                          .replace('.', ''),
                                                                                  ) * order.TTDH_soluong,
                                                                              )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            ''
                                                        ),
                                                    )
                                                  : ''}
                                          </div>
                                      </div>
                                      {/* / */}
                                      <div className={cx('kfKL6K')}>
                                          <div className={cx('wWp9Rn_GoSC7d')}>
                                              <span className={cx('TrbqGd')}>Phí vận chuyển</span>
                                              <div className={cx('uneQgd')}>
                                                  ₫
                                                  {formatCash(
                                                      serviceFee !== '' && serviceFee[index] !== undefined
                                                          ? serviceFee[index]
                                                          : '0',
                                                  )}
                                              </div>
                                          </div>
                                      </div>
                                      <div className={cx('BbOmi')}>
                                          <div className={cx('lYtB1r')}>
                                              <div className={cx('_4nelpz')}>
                                                  Tổng số tiền ({handleSumProduct(sell)} sản phẩm):
                                              </div>
                                              <span className={cx('_31ayp3')}>₫</span>
                                              <span id={`_31ayp3${index}`} className={cx('_31ayp33')}>
                                                  {formatCash(handlePriceSeller(sell, index))}
                                              </span>
                                          </div>
                                      </div>

                                      <div className={cx(checkPaypal ? 'paypal-btn' : 'payment-btn-none')}>
                                          {sellerClientId !== ''
                                              ? sellerClientId.map((clientId, inde) =>
                                                    sellerClientId[index] === clientId ? (
                                                        <span key={inde}>
                                                            <PayPalScriptProvider
                                                                options={{
                                                                    'client-id': clientId,
                                                                }}
                                                            >
                                                                <PayPalButtons
                                                                    createOrder={(data, actions) => {
                                                                        const iddc = document.getElementById(
                                                                            `_31ayp3${index}`,
                                                                        );
                                                                        const usd = (
                                                                            iddc.innerHTML.replace('.', '') / 23865
                                                                        ).toFixed(2);
                                                                        //console.log('iddc', iddc.innerHTML.replace('.', ''));
                                                                        return actions.order.create({
                                                                            purchase_units: [
                                                                                {
                                                                                    amount: {
                                                                                        value: usd,
                                                                                    },
                                                                                },
                                                                            ],
                                                                        });
                                                                    }}
                                                                    onApprove={async (data, actions) => {
                                                                        const details = await actions.order.capture();
                                                                        //const name = details.payer.name.given_name;
                                                                        console.log('details', details);
                                                                        if (details.status === 'COMPLETED') {
                                                                            handleOrderCustomerPaypal(
                                                                                inde,
                                                                                districtID,
                                                                                wardID,
                                                                            );
                                                                        }
                                                                        //   alert('Transaction completed by ' + name);
                                                                    }}
                                                                />
                                                            </PayPalScriptProvider>
                                                        </span>
                                                    ) : (
                                                        ''
                                                    ),
                                                )
                                              : ''}
                                      </div>
                                  </div>
                              </div>
                          ))
                        : ''}
                </div>
                <div className={cx('kfKL6K')}>
                    <div className={cx('wWp9Rn_GoSC7d')}>
                        <div className={cx('sYTSo9')}>Đơn vị vận chuyển</div>
                        <div className={cx('TrbqGd')}>
                            <div>
                                <img src={'https://api.ghn.vn/themes/angulr/img/logo-ghn-new.png'} alt="" />{' '}
                            </div>
                        </div>
                        <div className={cx('uneQgd')}>
                            <select
                                className={cx('uneQgd-select')}
                                onChange={(e) => handleChangeShipping(e.target.value)}
                            >
                                {serviceIdValue !== ''
                                    ? serviceIdValue.map((service, index) => (
                                          <option key={index} className={cx('option-dvttj')} value={service.service_id}>
                                              {service.short_name}
                                          </option>
                                      ))
                                    : ''}
                            </select>
                        </div>
                    </div>
                </div>
                <div className={cx('KbJ00X')}>
                    <div className={cx('EQBEfe')}>
                        <div className={cx('_7ZP-sx')}>
                            <div className={cx('Kh34EJ')}>
                                <div className={cx('_9VHkyQ')}>
                                    <FontAwesomeIcon className={cx('icon-location-marker')} icon={faLocationDot} />
                                </div>
                                <span>Địa chỉ nhận hàng</span>
                            </div>
                        </div>
                        <div className={cx('fnands')}>
                            <div>
                                <div className={cx('Y3QA5S')}>
                                    <div className={cx('_3yvPt8')}>
                                        {userVaule !== '' ? userVaule.ND_hoten : ''} (+84){' '}
                                        {userVaule !== '' ? userVaule.ND_sdt : ''}
                                    </div>
                                    <div className={cx('iXqine')}>
                                        {userVaule !== ''
                                            ? userVaule.ND_diachiGH !== ''
                                                ? userVaule.ND_chitiet + ',' + ChangeAddress(userVaule.ND_diachiGH)
                                                : handleShowFormAddress()
                                            : ''}
                                    </div>
                                </div>
                            </div>
                            <div className={cx('g3BSHI')} onClick={handleShowFormAddress}>
                                {userVaule !== '' && userVaule.ND_diachigiaohang !== '' ? 'Thay đổi' : 'Xác định'}
                            </div>
                        </div>
                    </div>
                </div>
                {/* / */}
                <div className={cx('kRed1l')}>
                    <div className={cx('HgQ4yt')}>
                        <div>
                            <div className={cx('checkout-payment-method-view__current')}>
                                <div className={cx('checkout-payment-method-view__current-title')}>
                                    Phương thức thanh toán
                                </div>
                                <div className={cx('checkout-payment-setting__payment-methods-tab')}>
                                    <span tabIndex="0">
                                        <button
                                            id="product-variation--selected"
                                            className={cx('product-variation--selected')}
                                            onClick={() => handleClickPay()}
                                        >
                                            Thanh toán khi nhận hàng
                                            <div className={cx('product-variation__tick')}>
                                                <svg
                                                    enableBackground="new 0 0 12 12"
                                                    viewBox="0 0 12 12"
                                                    x="0"
                                                    y="0"
                                                    id="icon-tick-bold-1"
                                                    className={cx('icon-tick-bold-1')}
                                                >
                                                    <g>
                                                        <path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path>
                                                    </g>
                                                </svg>
                                            </div>
                                        </button>
                                    </span>
                                    <span tabIndex="0">
                                        <button
                                            id="product-variation--selected_pay"
                                            className={cx('product-variation--selected_pay')}
                                            aria-label="Ví ShopeePay"
                                            aria-disabled="false"
                                            onClick={() => handleClickPay('pay')}
                                        >
                                            Ví Pay
                                            <div className={cx('product-variation__tick_pay')}>
                                                <svg
                                                    enableBackground="new 0 0 12 12"
                                                    viewBox="0 0 12 12"
                                                    x="0"
                                                    y="0"
                                                    id="icon-tick-bold-2"
                                                    className={cx('icon-tick-bold-2')}
                                                >
                                                    <g>
                                                        <path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path>
                                                    </g>
                                                </svg>
                                            </div>
                                        </button>
                                    </span>
                                    {/* <span>
                                        <Paypal
                                            data={
                                                'AZY_gbaNy42bD9QJXm68vc8CzQWEITTe851DAwfZiBxXE__nO12kTTnnAPx9vaTxgxGV4NCcCDLQrvKZ'
                                            }
                                        />
                                    </span> */}
                                </div>
                            </div>
                            <div id="_3hU2wO" className={cx('_3hU2wO')}>
                                <div className={cx('hVo8me')}>
                                    <div className={cx('WHQQMV')}>Thanh toán khi nhận hàng</div>
                                    <div className={cx('g5caBa')}>
                                        <div className={cx('cOrEtX')}>
                                            Phí thu hộ: ₫
                                            {price !== '' && price.toString().length > 6
                                                ? formatCash(price + handleSumService(serviceFee))
                                                : formatCash(
                                                      Number(
                                                          Math.round(formatCash(Number(price)))
                                                              .toFixed(3)
                                                              .replace('.', ''),
                                                      ) + handleSumService(serviceFee),
                                                  )}{' '}
                                            VNĐ.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="KqH1Px" className={cx('KqH1Px')}>
                        <div className={cx('lhwDvd_Exv9ow_c5Dezq')}>Tổng tiền hàng</div>
                        <div className={cx('lhwDvd_Uu2y3K_c5Dezq')}>
                            ₫
                            {price !== '' && price.toString().length > 6
                                ? formatCash(Number(price))
                                : Math.round(formatCash(Number(price))).toFixed(3)}
                        </div>
                        <div className={cx('lhwDvd_Exv9ow_B6k-vE')}>Phí vận chuyển</div>
                        <div className={cx('lhwDvd_Uu2y3K_B6k-vE')}>₫{formatCash(handleSumService(serviceFee))}</div>
                        <div className={cx('lhwDvd_Exv9ow_A4gPS6')}>Tổng thanh toán:</div>
                        <div className={cx('lhwDvd_0tdvp_Uu2y3K_A4gPS6')}>
                            ₫
                            {price !== '' && price.toString().length > 6
                                ? formatCash(price + handleSumService(serviceFee))
                                : formatCash(
                                      Number(
                                          Math.round(formatCash(Number(price)))
                                              .toFixed(3)
                                              .replace('.', ''),
                                      ) + handleSumService(serviceFee),
                                  )}
                        </div>
                        <div className={cx('Ql2fz0')}>
                            <button className={cx('stardust-button--large_gG-FcK')} onClick={handleOrderCustomer}>
                                Đặt hàng
                            </button>
                        </div>
                    </div>
                </div>
                {/* / */}
            </div>
        </div>
    );
}

export default Order;
