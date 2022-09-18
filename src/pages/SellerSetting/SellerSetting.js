import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Button from '~/components/Button';
import GetCookie from '~/components/Hook/GetCookies';
import styles from './SellerSetting.module.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            const formData = new FormData();
            formData.append('image', image[0]);
            formData.append('NB_id', JSON.parse(GetCookie('seller')).ND_id);
            formData.append('MTS_ten', title);
            formData.append('MTS_diachi', address);
            axios({
                method: 'POST',
                url: `${process.env.REACT_APP_URL_NODEJS}/sellersettingshop/establish/save/insert`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((res) => {
                    console.log(res.data);
                    const formDataLogo = new FormData();
                    formDataLogo.append('image', imageLogo[0]);
                    formDataLogo.append('NB_id', JSON.parse(GetCookie('seller')).ND_id);
                    axios({
                        method: 'POST',
                        url: `${process.env.REACT_APP_URL_NODEJS}/sellersettingshop/establish/logo`,
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
                })
                .catch((err) => {
                    console.log('loi');
                });
        } else if (image[0] !== undefined) {
            const formData = new FormData();
            formData.append('image', image[0]);
            formData.append('NB_id', JSON.parse(GetCookie('seller')).ND_id);
            formData.append('MTS_diachi', address);
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
            formDataLogo.append('MTS_diachi', address);
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
                    MTS_diachi: address,
                })
                .then((res) => {
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log('loi nha');
                });
        }
    };

    // function saveFileSellerLogo(imageLogo) {
    //     const formDataLogo = new FormData();

    //     formDataLogo.append('image', imageLogo[0]);

    //     formDataLogo.append('NB_id', JSON.parse(GetCookie('seller')).NB_id);
    //     if (title === '' && establish !== '' && establish !== undefined) {
    //         axios({
    //             method: 'POST',
    //             url: `${process.env.REACT_APP_URL_NODEJS}/sellersettingshop/establish/logo`,
    //             data: formDataLogo,
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         })
    //             .then((res) => {
    //                 toast.success('Lưu thành công', {
    //                     position: toast.POSITION.TOP_RIGHT,
    //                     className: `${cx('toast-message')}`,
    //                 });
    //             })
    //             .catch(() => {
    //                 toast.error('Lưu thất bại !', {
    //                     position: toast.POSITION.TOP_RIGHT,
    //                     className: `${cx('toast-message')}`,
    //                 });
    //             });
    //     } else if (title !== '' && establish === undefined) {
    //         axios({
    //             method: 'POST',
    //             url: `${process.env.REACT_APP_URL_NODEJS}/sellersettingshop/establish/logo`,
    //             data: formDataLogo,
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         })
    //             .then((res) => {
    //                 if (checkLogo) {
    //                     toast.success('Lưu thành công nha', {
    //                         position: toast.POSITION.TOP_RIGHT,
    //                         className: `${cx('toast-message')}`,
    //                     });
    //                 }
    //             })
    //             .catch(() => {
    //                 toast.error('Lưu thất bại !', {
    //                     position: toast.POSITION.TOP_RIGHT,
    //                     className: `${cx('toast-message')}`,
    //                 });
    //             });
    //     }
    // }

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
    // function saveFileSeller(title, image, imageLogo, address) {
    //     console.log('thoong tin: ' + title, image, address);
    //     const formData = new FormData();
    //     console.log(image);
    //     if (image !== '') {
    //         formData.append('image', image[0]);
    //         formData.append('NB_id', JSON.parse(GetCookie('seller')).NB_id);
    //         formData.append('MTS_ten', title);
    //         formData.append('MTS_diachi', address);
    //         if (title === '' && establish !== '' && establish !== undefined) {
    //             axios({
    //                 method: 'POST',
    //                 url: `${process.env.REACT_APP_URL_NODEJS}/sellersettingshop/establish/image`,
    //                 data: formData,
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data',
    //                 },
    //             })
    //                 .then((res) => {
    //                     console.log(res.data);
    //                     if (res.data.seller === false) {
    //                         //alert('Tên đăng nhập đã tồn tại!');
    //                         toast.error('Lưu thất bại', {
    //                             position: toast.POSITION.TOP_RIGHT,
    //                             className: `${cx('toast-message')}`,
    //                         });
    //                     } else {
    //                         //alert('Đăng ký thành công');
    //                         if (imageLogo !== '') {
    //                         } else {
    //                             toast.success('Lưu thành công', {
    //                                 position: toast.POSITION.TOP_RIGHT,
    //                                 className: `${cx('toast-message')}`,
    //                             });
    //                         }
    //                     }
    //                 })
    //                 .catch((err) => {
    //                     toast.error('Lưu thất bại !', {
    //                         position: toast.POSITION.TOP_RIGHT,
    //                         className: `${cx('toast-message')}`,
    //                     });
    //                 });
    //         } else if (title !== '' && establish === undefined) {
    //             axios({
    //                 method: 'POST',
    //                 url: `${process.env.REACT_APP_URL_NODEJS}/sellersettingshop/establish/image`,
    //                 data: formData,
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data',
    //                 },
    //             })
    //                 .then((res) => {
    //                     console.log(res.data);
    //                     if (res.data.exist === true) {
    //                         setCheckLogo(false);
    //                         toast.error('Tên Shop đã tồn tại! Vui lòng chọn tên khác.', {
    //                             position: toast.POSITION.TOP_RIGHT,
    //                             className: `${cx('toast-message')}`,
    //                         });
    //                     } else if (res.data.seller === true) {
    //                         //alert('Tên đăng nhập đã tồn tại!');
    //                         toast.error('Lưu thất bại', {
    //                             position: toast.POSITION.TOP_RIGHT,
    //                             className: `${cx('toast-message')}`,
    //                         });
    //                     } else {
    //                         //alert('Đăng ký thành công');

    //                         if (imageLogo !== '') {
    //                         } else {
    //                             toast.success('Lưu thành công', {
    //                                 position: toast.POSITION.TOP_RIGHT,
    //                                 className: `${cx('toast-message')}`,
    //                             });
    //                         }
    //                     }
    //                 })
    //                 .catch((err) => {
    //                     toast.error('Lưu thất bại !', {
    //                         position: toast.POSITION.TOP_RIGHT,
    //                         className: `${cx('toast-message')}`,
    //                     });
    //                 });
    //         } else {
    //             toast.error('Tên Shop Không được bỏ trống !', {
    //                 position: toast.POSITION.TOP_RIGHT,
    //                 className: `${cx('toast-message')}`,
    //             });
    //         }
    //     }
    //     if (imageLogo === '') {
    //         if (title === '' && establish !== '' && establish !== undefined) {
    //             axios
    //                 .post(`${process.env.REACT_APP_URL_NODEJS}/sellersettingshop/establish`, {
    //                     NB_id: JSON.parse(GetCookie('seller')).NB_id,
    //                     MTS_ten: title,
    //                     MTS_diachi: address,
    //                 })
    //                 .then((res) => {
    //                     if (res.data.seller === true) {
    //                         toast.success('Lưu thành công', {
    //                             position: toast.POSITION.TOP_RIGHT,
    //                             className: `${cx('toast-message')}`,
    //                         });
    //                     } else {
    //                         toast.error('Lưu thất bại !', {
    //                             position: toast.POSITION.TOP_RIGHT,
    //                             className: `${cx('toast-message')}`,
    //                         });
    //                     }
    //                 })
    //                 .catch((err) => {
    //                     toast.error('Lưu thất bại !', {
    //                         position: toast.POSITION.TOP_RIGHT,
    //                         className: `${cx('toast-message')}`,
    //                     });
    //                 });
    //         } else if (title !== '' && establish === undefined) {
    //             axios
    //                 .post(`${process.env.REACT_APP_URL_NODEJS}/sellersettingshop/establish`, {
    //                     NB_id: JSON.parse(GetCookie('seller')).NB_id,
    //                     MTS_ten: title,
    //                     MTS_diachi: address,
    //                 })
    //                 .then((res) => {
    //                     if (res.data.exist === true) {
    //                         toast.error('Tên Shop đã tồn tại! Vui lòng chọn tên khác.', {
    //                             position: toast.POSITION.TOP_RIGHT,
    //                             className: `${cx('toast-message')}`,
    //                         });
    //                     } else if (res.data.seller === true) {
    //                         toast.success('Lưu thành công', {
    //                             position: toast.POSITION.TOP_RIGHT,
    //                             className: `${cx('toast-message')}`,
    //                         });
    //                     } else {
    //                         toast.error('Thiết lập thất bại!', {
    //                             position: toast.POSITION.TOP_RIGHT,
    //                             className: `${cx('toast-message')}`,
    //                         });
    //                     }
    //                 })
    //                 .catch((err) => {
    //                     toast.error('Lưu thất bại !', {
    //                         position: toast.POSITION.TOP_RIGHT,
    //                         className: `${cx('toast-message')}`,
    //                     });
    //                 });
    //         } else {
    //             toast.error('Tên Shop Không được bỏ trống !', {
    //                 position: toast.POSITION.TOP_RIGHT,
    //                 className: `${cx('toast-message')}`,
    //             });
    //         }
    //     } else if (imageLogo !== '') {
    //         setCheckLogo(true);
    //         setTimeout(() => saveFileSellerLogo(imageLogo), 500);
    //     }
    // }

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
                        <div className={cx('form-title')}>Mô tả Shop</div>{' '}
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
                                                defaultValue={establish !== undefined ? establish.MTS_diachi : ''}
                                                onChange={(e) => setAddress(e.target.value)}
                                            ></textarea>
                                        </div>
                                    </div>{' '}
                                </div>
                            </div>
                        </div>
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
