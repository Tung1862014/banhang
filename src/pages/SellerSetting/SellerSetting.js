import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Button from '~/components/Button';
import GetCookie from '~/components/Hook/GetCookies';
import styles from './SellerSetting.module.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function SellerSetting() {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [imageLogo, setImageLogo] = useState('');
    // const [field, setField] = useState('');
    const [address, setAddress] = useState('');
    const [establish, setEstablished] = useState('');
    const [dateValue, setDateValue] = useState('');
    //const [checkLogo, setCheckLogo] = useState(false);

    //const [sumNumber, setSumNumber] = useState('');
    //const [price, setPrice] = useState('');
    const [userVaule, setUserVaule] = useState('');
    const [ctyVaule, setCtyVaule] = useState('');
    //const [addressVaule, setAddressVaule] = useState('');
    //const [sumNumber, setSumNumber] = useState('');
    const [cityValue, setCityValue] = useState('');
    const [districtValue, setDistrictValue] = useState('');
    const [wardValue, setWardValue] = useState('');

    ////////////////////////////////////////////////////
    const [provinceID, setProvinceID] = useState('');
    const [districtID, setDistrictID] = useState('');
    const [wardID, setWardID] = useState('');
    ////////////////////////////////////////////////////
    // const [serviceFee, setServiceFee] = useState('');

    // const dateValue = new Date(JSON.parse(GetCookie('seller')).ND_ngay);
    // let day = dateValue.getDate();
    // let month = dateValue.getMonth() + 1;
    // let year = dateValue.getFullYear();
    // let DMY = '';
    // if (month < 10) {
    //     DMY = day + '-0' + month + '-' + year;
    // } else if (day < 10) {
    //     DMY = day + '-' + month + '-0' + year;
    // } else {
    //     DMY = day + '-' + month + '-' + year;
    // }

    //show user
    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_URL_NODEJS}/sellersettingshop/establish/show/all/shop?NB_id=${
                    JSON.parse(GetCookie('seller')).ND_id
                }`,
            )
            .then((res) => {
                console.log('data', res.data.results);
                setUserVaule(res.data.results);
            })
            .catch((err) => {
                console.log('loi nha');
            });
    }, []);

    function takeDate(date) {
        const datevalue = new Date(date);
        let day = datevalue.getDate();
        let month = datevalue.getMonth() + 1;
        let year = datevalue.getFullYear();

        if (month < 10 && day >= 10) {
            return day + '-0' + month + '-' + year;
        } else if (month < 10 && day < 10) {
            return '0' + day + '-0' + month + year;
        } else if (month > 10 && day < 10) {
            return '0' + day + '-' + month + year;
        } else if (month > 10 && day >= 10) {
            return day + '-' + month + year;
        } else {
            return day + '-' + month + '-' + year;
        }
    }

    // console.log('Date: ' + DMY);
    useEffect(() => {
        axios
            .post(`${process.env.REACT_APP_URL_NODEJS}/sellersettingshop/establish/show`, {
                NB_id: JSON.parse(GetCookie('seller')).ND_id,
            })

            .then((res) => {
                console.log('result', res.data);
                setEstablished(res.data.result);
                setDateValue(res.data.user);
            })
            .catch(() => {
                console.log('loi khong the show anh');
            });
    }, []);

    const handleSubmitSaveShop = () => {
        console.log('image', image[0]);
        if (establish === undefined) {
            console.log('districtID', districtID);
            console.log('wardID', wardID);
            console.log('ctyVaule', ctyVaule);
            console.log('title', title);
            console.log('phone', '0' + dateValue.ND_sdt.toString());
            // axios
            //     .post(
            //         `https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shop/update`,

            //         {
            //             district_id: districtID,
            //             ward_code: wardID,
            //             name: title,
            //             phone: dateValue !== '' ? '0' + dateValue.ND_sdt.toString() : '091882456',
            //             address: ctyVaule,
            //         },
            //         {
            //             headers: {
            //                 Token: '9c10964d-37ca-11ed-b608-8a2909007fb0',
            //                 ShopId: 119407,
            //             },
            //         },
            //     )
            //     .then((res) => {
            //         console.log('DV', res.data);
            //         // setServiceFee((prev) => {
            //         //     const newSeller = [...prev, res.data.data.service_fee];
            //         //     return newSeller;
            //         // });
            //     })
            //     .catch((err) => {
            //         console.log('loi Dv nha');
            //     });
            axios
                .post(
                    `https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shop/register`,

                    {
                        district_id: districtID,
                        ward_code: wardID,
                        name: title,
                        phone: dateValue !== '' ? '0' + dateValue.ND_sdt.toString() : '091882456',
                        address: ctyVaule,
                    },
                    {
                        headers: {
                            Token: '9c10964d-37ca-11ed-b608-8a2909007fb0',
                        },
                    },
                )
                .then((res) => {
                    console.log('DV', res.data);
                    // setServiceFee((prev) => {
                    //     const newSeller = [...prev, res.data.data.service_fee];
                    //     return newSeller;
                    // });
                })
                .catch((err) => {
                    console.log('loi Dv nha');
                });
            // const formData = new FormData();
            // formData.append('image', image[0]);
            // formData.append('NB_id', JSON.parse(GetCookie('seller')).ND_id);
            // formData.append('MTS_ten', title);
            // formData.append('MTS_diachi', ctyVaule);
            // formData.append('MTS_chitiet', address);
            // axios({
            //     method: 'POST',
            //     url: `${process.env.REACT_APP_URL_NODEJS}/sellersettingshop/establish/save/insert`,
            //     data: formData,
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //     },
            // })
            //     .then((res) => {
            //         console.log(res.data);
            //         const formDataLogo = new FormData();
            //         formDataLogo.append('image', imageLogo[0]);
            //         formDataLogo.append('NB_id', JSON.parse(GetCookie('seller')).ND_id);
            //         axios({
            //             method: 'POST',
            //             url: `${process.env.REACT_APP_URL_NODEJS}/sellersettingshop/establish/logo`,
            //             data: formDataLogo,
            //             headers: {
            //                 'Content-Type': 'multipart/form-data',
            //             },
            //         })
            //             .then((res) => {
            //                 console.log(res.data);
            //             })
            //             .catch((err) => {
            //                 console.log('loi nha');
            //             });
            //     })
            //     .catch((err) => {
            //         console.log('loi');
            //     });
        } else if (image[0] !== undefined) {
            const formData = new FormData();
            formData.append('image', image[0]);
            formData.append('NB_id', JSON.parse(GetCookie('seller')).ND_id);
            formData.append('MTS_chitiet', address);
            axios({
                method: 'PUT',
                url: `${process.env.REACT_APP_URL_NODEJS}/sellersettingshop/establish/update/image`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((res) => {
                    console.log(res.data);
                    if (imageLogo !== undefined) {
                        const formDataLogo = new FormData();
                        formDataLogo.append('image', imageLogo[0]);
                        formDataLogo.append('NB_id', JSON.parse(GetCookie('seller')).ND_id);
                        formDataLogo.append('MTS_diachi', '');
                        axios({
                            method: 'PUT',
                            url: `${process.env.REACT_APP_URL_NODEJS}/sellersettingshop/establish/update/image/logo`,
                            data: formDataLogo,
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        })
                            .then((res) => {
                                console.log(res.data);
                            })
                            .catch((err) => {
                                console.log('loi nha');
                            });
                    }
                })
                .catch((err) => {
                    console.log('loi');
                });
        } else if (imageLogo[0] !== undefined) {
            const formDataLogo = new FormData();
            formDataLogo.append('image', imageLogo[0]);
            formDataLogo.append('NB_id', JSON.parse(GetCookie('seller')).ND_id);
            formDataLogo.append('MTS_chitiet', address);
            axios({
                method: 'PUT',
                url: `${process.env.REACT_APP_URL_NODEJS}/sellersettingshop/establish/update/image/logo`,
                data: formDataLogo,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((res) => {
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log('loi nha');
                });
        } else if (address !== '') {
            axios
                .put(`${process.env.REACT_APP_URL_NODEJS}/sellersettingshop/establish/update/address`, {
                    NB_id: JSON.parse(GetCookie('seller')).ND_id,
                    MTS_chitiet: address,
                })
                .then((res) => {
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log('loi nha');
                });
        }
    };

    function ChooseImg(e) {
        const chooseFile = document.getElementById('choose-file');
        const imgPreview = document.getElementById('img-preview');
        const files = chooseFile.files[0];
        if (files) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(files);
            fileReader.addEventListener('load', function () {
                imgPreview.src = this.result;
                // imgPreview.innerHTML =
                //     '<img src="' +
                //     this.result +
                //     '" style ="width:55px; height:45px; display: flex;  justify-content: center;  align-items: center;"/>';
            });
            setImage(e.target.files);
        }
    }
    function ChooseImgLogo(e) {
        const chooseFile = document.getElementById('avatar-edit');
        const imgPreview = document.getElementById('img-preview-logo');
        const files = chooseFile.files[0];
        if (files) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(files);
            fileReader.addEventListener('load', function () {
                imgPreview.src = this.result;
                // imgPreview.innerHTML =
                //     '<img src="' +
                //     this.result +
                //     '" style ="width:55px; height:45px; display: flex;  justify-content: center;  align-items: center;"/>';
            });
            setImageLogo(e.target.files);
        }
    }

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
                if (userVaule !== '' && userVaule.MTS_diachi !== undefined) {
                    let arrValue = userVaule.MTS_diachi.split(',');
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
                    console.log('huyen', res.data.data);
                    setDistrictValue(res.data.data);
                    //setDistrictID(res.data.data.DistrictID);
                    let arrValue = userVaule.MTS_diachi.split(',');
                    console.log('arrValue', arrValue);

                    for (let i = 0; i < res.data.data.length; i++) {
                        if (res.data.data[i].DistrictName === arrValue[1]) {
                            //console.log('huyen', res.data.data);
                            setDistrictID(res.data.data[i].DistrictID);
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
                    console.log('xa', res.data.data);
                    setWardValue(res.data.data);
                    //setWardID(res.data.data.WardCode);
                    let arrValue = userVaule.MTS_diachi.split(',');
                    //console.log('arrValue', arrValue);

                    for (let i = 0; i < res.data.data.length; i++) {
                        if (res.data.data[i].WardName === arrValue[2]) {
                            //console.log('xa', res.data.data[i].WardCode);
                            setWardID(res.data.data[i].WardCode);
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
        if (userVaule !== undefined && userVaule.MTS_diachi !== undefined) {
            const inputValue = document.getElementById('ChI2Nx_92k3pl');

            inputValue.defaultValue = ctyVaule;
        }
    };

    const handleCloseFormIcon = (WardID, pxValue) => {
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
            setWardID(WardID);
        } else {
            const iconDown = document.getElementById('Izrgn0');
            const iconUp = document.getElementById('Izrgn1');
            const formAddress = document.getElementById('H8sVZh');

            iconDown.style.display = 'flex';
            iconUp.style.display = 'none';
            formAddress.style.display = 'none';

            if (ctyVaule === '' && userVaule !== undefined) {
                const inputValue = document.getElementById('ChI2Nx_92k3pl');

                inputValue.defaultValue =
                    ctyVaule === '' && userVaule !== '' && userVaule.MTS_diachi !== undefined
                        ? userVaule.MTS_diachi
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
    return (
        <div className={cx('wrapper')}>
            <div className={cx('file-shop')}>
                <h3>Hồ sơ shop</h3>
            </div>
            <div className={cx('setting-shop')}>
                <div className={cx('image-setting-shop')}>
                    <img
                        src={
                            establish !== undefined
                                ? establish.MTS_image
                                : process.env.REACT_APP_URL_NODEJS_IMAGE + '/default-ui-image.webp'
                        }
                        alt=""
                        id="img-preview"
                        className={cx('image-shop-input')}
                    />
                    <div className={cx('avatar-user-establish')}>
                        <div className={cx('avatar')}>
                            <img
                                src={
                                    establish !== undefined
                                        ? establish.MTS_logo
                                        : process.env.REACT_APP_URL_NODEJS_IMAGE + '/default-ui-image.webp'
                                }
                                alt=""
                                id="img-preview-logo"
                                className={cx('avata-logo')}
                            />
                            <input type="file" id="avatar-edit" onChange={(e) => ChooseImgLogo(e)} hidden />
                            <label htmlFor="avatar-edit" className={cx('avatar-edit-label')}>
                                Sửa
                            </label>
                        </div>
                        <div data-v-455a73b3="" className={cx('user')}>
                            <div data-v-455a73b3="" className={cx('name')}>
                                {establish !== undefined ? establish.MTS_ten : ''}
                            </div>{' '}
                            <div data-v-455a73b3="" className={cx('join-time')}>
                                Đã tham gia {takeDate(dateValue !== '' ? dateValue.ND_ngay : '')}
                            </div>{' '}
                        </div>
                    </div>
                </div>
                <div className={cx('info')}>
                    {establish === undefined ? (
                        <div className={cx('name-shop')}>
                            <label htmlFor="nameShop">Tên shop</label>
                            <input type="text" placeholder="vi du" onChange={(e) => setTitle(e.target.value)} />
                        </div>
                    ) : (
                        ''
                    )}
                    <div className={cx('image-shop')}>
                        <label htmlFor="choose-file" className={cx('image-shop-label')}>
                            Hình ảnh shop
                        </label>
                        <input type="file" id="choose-file" onChange={(e) => ChooseImg(e)} hidden />
                    </div>
                    {/* <div className={cx('type-product')}>
                        <label htmlFor="type-product-label" className={cx('type-product-label')}>
                            Lĩnh vực kinh doanh
                        </label>
                        <select
                            name="type-sp"
                            className={cx('type-product-select')}
                            onChange={(e) => setField(e.target.value)}
                        >
                            <option className={cx('type-sp-choose')} value="1">
                                Thực Phẩm
                            </option>
                            <option className={cx('type-sp-choose')} value="2">
                                Thủ Công Mỹ Nghệ
                            </option>
                        </select>
                    </div> */}

                    <div className={cx('form-section')}>
                        <div className={cx('form-title')}>Địa chỉ cụ thể</div>{' '}
                        <div className={cx('form-content')}>
                            <div className={cx('description-form-item')}>
                                <label htmlFor="description" className={cx('shopee-form-item__label')}>
                                    {' '}
                                </label>{' '}
                                <div className={cx('shopee-form-item__control')}>
                                    <div className={cx('shopee-form-item__content')}>
                                        <div className={cx('shopee-input__area-desc-input')}>
                                            <textarea
                                                type="textarea"
                                                placeholder="Nhập mô tả hoặc thông tin về Shop của bạn tại đây"
                                                resize="vertical"
                                                rows="2"
                                                minrows="5"
                                                restrictiontype="input"
                                                showwordlimit="true"
                                                max="Infinity"
                                                min="-Infinity"
                                                className={cx('shopee-input__inner--normal')}
                                                defaultValue={establish !== undefined ? establish.MTS_chitiet : ''}
                                                onChange={(e) => setAddress(e.target.value)}
                                            ></textarea>
                                        </div>
                                    </div>{' '}
                                </div>
                            </div>
                        </div>
                    </div>
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
                                                    ctyVaule === '' && userVaule !== '' && userVaule !== undefined
                                                        ? userVaule.MTS_diachi
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
                                                              handleClickDistrict(city.ProvinceID, city.ProvinceName)
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
                                                          onClick={() =>
                                                              handleCloseFormIcon(ward.WardCode, ward.WardName)
                                                          }
                                                      >
                                                          {ward.WardName}
                                                      </div>
                                                  ))
                                                : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className={cx('_0fHnjY')}>
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
                                        </div> */}
                        </div>

                        {/* / */}
                        {/* <div className={cx('GixP1t')}>
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
                                    </div> */}
                    </div>
                </div>
            </div>
            <div className={cx('btn-submit-update')} onClick={handleSubmitSaveShop}>
                <Button primary>Lưu</Button>
            </div>
            <ToastContainer />
        </div>

        // onClick={() => saveFileSeller(title, image, imageLogo, address)}
    );
}

export default SellerSetting;
