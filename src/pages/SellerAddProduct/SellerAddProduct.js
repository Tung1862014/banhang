import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './SellerAddProduct.module.scss';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import GetCookie from '~/components/Hook/GetCookies';

const cx = classNames.bind(styles);

function SellerAddProduct() {
    const [nameProduct, setNameProduct] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [describeProduct, setDescribeProduct] = useState('');
    const [weight, setWeight] = useState('');
    const [number, setNumber] = useState('');
    const [price, setPrice] = useState('');
    const [promotion, setPromotion] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [imageTwo, setImageTwo] = useState('');
    const [imageThree, setImageThree] = useState('');
    // const [takeWeight, setTakeWeight] = useState('');
    //const [checkWeight, setCheckWeight] = useState('');
    const [checkCategory, setCheckCategory] = useState('');

    // if (takeWeight !== '') {
    //     //  console.log(takeWeight.length);
    //     if (checkWeight) {
    //         handleWeight(takeWeight);
    //     }
    // }

    // useEffect(() => {
    //     // setCheckWeight(false);
    //     axios
    //         .get(
    //             `${process.env.REACT_APP_URL_NODEJS}/sellerproduct/product/show/weight?seller=${
    //                 JSON.parse(GetCookie('seller')).NB_id
    //             }`,
    //         )
    //         .then((res) => {
    //             //console.log(res.data.result);
    //             if (checkWeight === '') {
    //                 handleWeight(res.data.result);
    //                 setCheckWeight('weight');
    //             }
    //         })
    //         .catch((err) => {
    //             console.log('loi');
    //         });
    // }, [checkWeight]);

    useEffect(() => {
        // setCheckWeight(false);
        axios
            .get(
                `${process.env.REACT_APP_URL_NODEJS}/sellerproduct/product/show/category?seller=${
                    JSON.parse(GetCookie('seller')).ND_id
                }`,
            )
            .then((res) => {
                //console.log(res.data.result);
                if (checkCategory === '') {
                    handleCategory(res.data.result);
                    setCheckCategory('category');
                }
            })
            .catch((err) => {
                console.log('loi');
            });
    }, [checkCategory]);

    // function handleWeight(takeWeight) {
    //     const selectValue = document.getElementById('input-weight-select');

    //     for (let i = 0; i < takeWeight.length; i++) {
    //         const optionValue = document.createElement('option');
    //         console.log(takeWeight[i].TL_id);
    //         optionValue.value = takeWeight[i].TL_id;
    //         optionValue.textContent = takeWeight[i].TL_trongluong;
    //         selectValue.appendChild(optionValue);
    //     }
    // }

    function handleCategory(takeWeight) {
        const selectValue = document.getElementById('input-category-select');

        for (let i = 0; i < takeWeight.length; i++) {
            const optionValue = document.createElement('option');
            console.log(takeWeight[i].DM_id);
            optionValue.value = takeWeight[i].DM_id;
            optionValue.textContent = takeWeight[i].DM_danhmuc;
            selectValue.appendChild(optionValue);
        }
    }

    function ChooseImg(e) {
        const chooseFile = document.getElementById('choose-file');
        const imgPreview = document.getElementById('img-preview-setting-show');
        const labelImage = document.getElementById('shopee-image-manager__upload__content');
        const iconImage = document.getElementById('shopee__icon');
        const files = chooseFile.files[0];
        if (files) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(files);
            fileReader.addEventListener('load', function () {
                console.log('image: ' + this.result);
                labelImage.style.padding = '0px';
                iconImage.style.display = 'none';
                imgPreview.style.display = 'flex';
                imgPreview.innerHTML =
                    '<img src="' +
                    this.result +
                    '" style =" width: 80px; height: 80px; display: flex;  justify-content: center;  align-items: center;"/>';
            });
            setCoverImage(e.target.files);
        }
    }

    function ChooseImgDetails(e) {
        const chooseFile = document.getElementById('choose-file-details');
        const imgPreview = document.getElementById('img-preview-setting-show-details');
        const labelImage = document.getElementById('shopee-image-manager__upload__content-details');
        const iconImage = document.getElementById('shopee-close-icon');
        const files = chooseFile.files[0];
        if (files) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(files);
            fileReader.addEventListener('load', function () {
                console.log('imageString: ' + typeof this.result);
                labelImage.style.padding = '0px';
                iconImage.style.display = 'none';
                imgPreview.style.display = 'flex';
                imgPreview.innerHTML =
                    '<img src="' +
                    this.result +
                    '" style =" width: 80px; height: 80px; display: flex;  justify-content: center;  align-items: center;"/>';
            });
            setImage(e.target.files);
        }
    }

    function ChooseImgDetailsTwo(e) {
        const chooseFile = document.getElementById('choose-file-details-two');
        const imgPreview = document.getElementById('img-preview-setting-show-details-two');
        const labelImage = document.getElementById('shopee-image-manager__upload__content-details-two');
        const iconImage = document.getElementById('shopee-close-icon-two');
        const files = chooseFile.files[0];
        if (files) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(files);
            fileReader.addEventListener('load', function () {
                console.log('imageString: ' + typeof this.result);
                labelImage.style.padding = '0px';
                iconImage.style.display = 'none';
                imgPreview.style.display = 'flex';
                imgPreview.innerHTML =
                    '<img src="' +
                    this.result +
                    '" style =" width: 80px; height: 80px; display: flex;  justify-content: center;  align-items: center;"/>';
            });
            setImageTwo(e.target.files);
        }
    }

    function ChooseImgDetailsThree(e) {
        const chooseFile = document.getElementById('choose-file-details-three');
        const imgPreview = document.getElementById('img-preview-setting-show-details-three');
        const labelImage = document.getElementById('shopee-image-manager__upload__content-details-three');
        const iconImage = document.getElementById('shopee-close-icon-three');
        const files = chooseFile.files[0];
        if (files) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(files);
            fileReader.addEventListener('load', function () {
                console.log('imageString: ' + typeof this.result);
                labelImage.style.padding = '0px';
                iconImage.style.display = 'none';
                imgPreview.style.display = 'flex';
                imgPreview.innerHTML =
                    '<img src="' +
                    this.result +
                    '" style =" width: 80px; height: 80px; display: flex;  justify-content: center;  align-items: center;"/>';
            });
            setImageThree(e.target.files);
        }
    }

    function handleSubmitAddProduct(
        nameProduct,
        coverImage,
        describeProduct,
        weight,
        number,
        price,
        promotion,
        category,
        image,
        imageTwo,
        imageThree,
    ) {
        console.log(describeProduct);

        if (nameProduct === '') {
            toast.error('Tên sản phẩm không được bỏ trống!', {
                position: toast.POSITION.TOP_CENTER,
                className: `${cx('toast-message')}`,
            });
        } else if (coverImage === '') {
            toast.error('Ảnh bìa không được bỏ trông!', {
                position: toast.POSITION.TOP_CENTER,
                className: `${cx('toast-message')}`,
            });
        } else if (describeProduct === '') {
            toast.error('Mô tả không được bỏ trông!', {
                position: toast.POSITION.TOP_CENTER,
                className: `${cx('toast-message')}`,
            });
        } else if (number === '') {
            toast.error('Số lượng không được bỏ trông!', {
                position: toast.POSITION.TOP_CENTER,
                className: `${cx('toast-message')}`,
            });
        } else if (price === '') {
            toast.error('Giá không được bỏ trông!', {
                position: toast.POSITION.TOP_CENTER,
                className: `${cx('toast-message')}`,
            });
        } else if (category === '') {
            toast.error('Danh mục không được bỏ trông!', {
                position: toast.POSITION.TOP_CENTER,
                className: `${cx('toast-message')}`,
            });
        } else if (image === '' || imageTwo === '' || imageThree === '') {
            toast.error('Hình ảnh không được bỏ trông!', {
                position: toast.POSITION.TOP_CENTER,
                className: `${cx('toast-message')}`,
            });
        } else {
            const formData = new FormData();
            formData.append('image', coverImage[0]);
            formData.append('NB_id', JSON.parse(GetCookie('seller')).ND_id);
            formData.append('SP_ten', nameProduct);
            formData.append('SP_soluong', number);
            formData.append('SP_gia', price);
            formData.append('SP_khuyenmai', promotion);
            formData.append('DM_id', category);
            formData.append('SP_trongluong', weight);
            formData.append('SP_mota', describeProduct);
            axios({
                method: 'POST',
                url: `${process.env.REACT_APP_URL_NODEJS}/sellerproduct/product/add`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((res) => {
                    console.log(res.data);
                })
                .catch((err) => {});
            // handleDescribeProduct(describeProduct, weight);
            setTimeout(() => handleImageProduct(image), 900);
            setTimeout(() => handleImageProductTwo(imageTwo), 1200);
            setTimeout(() => handleImageProductThree(imageThree), 1400);

            setTimeout(
                () => window.open(`${process.env.REACT_APP_URL_FRONTEND}/seller/product/@all`, '_self', 1),
                5000,
            );
        }
    }

    // function handleDescribeProduct(describeProduct, weight) {
    //     axios
    //         .post(`${process.env.REACT_APP_URL_NODEJS}/sellerproduct/product/add/describe`, {
    //             NB_id: JSON.parse(GetCookie('seller')).NB_id,
    //             MTSP_noidung: describeProduct,
    //             TL_trongluong: weight,
    //         })
    //         .then((res) => {})
    //         .catch((err) => {});
    // }

    function handleImageProduct(image) {
        const formData = new FormData();
        formData.append('image', image[0]);
        formData.append('NB_id', JSON.parse(GetCookie('seller')).ND_id);
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_URL_NODEJS}/sellerproduct/product/add/image`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((res) => {})
            .catch((err) => {});
    }
    function handleImageProductTwo(imageTwo) {
        const formData = new FormData();
        formData.append('image', imageTwo[0]);
        formData.append('NB_id', JSON.parse(GetCookie('seller')).ND_id);
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_URL_NODEJS}/sellerproduct/product/add/image`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((res) => {})
            .catch((err) => {});
    }
    function handleImageProductThree(imageThree) {
        const formData = new FormData();
        formData.append('image', imageThree[0]);
        formData.append('NB_id', JSON.parse(GetCookie('seller')).ND_id);
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_URL_NODEJS}/sellerproduct/product/add/image`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((res) => {
                toast.success('Lưu sản phẩm thành công', {
                    position: toast.POSITION.TOP_CENTER,
                    className: `${cx('toast-message')}`,
                });
            })
            .catch((err) => {});
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('product-edit__section')}>
                <h2 data-v-a50a20d0="">Thông tin cơ bản</h2>
                <div className={cx('grid')}>
                    <div className={cx('edit-label')} data-education-trigger-key="name">
                        <div className={cx('mandatory')}>
                            <span className={cx('mandatory-icon')}>*</span>
                        </div>{' '}
                        <span>Tên sản phẩm</span>
                    </div>
                    <div className={cx('edit-input')}>
                        <div className={cx('shopee-input')}>
                            <div className={cx('shopee-input__inner')}>
                                <input
                                    type="text"
                                    placeholder="Nhập vào"
                                    size="large"
                                    resize="none"
                                    rows="2"
                                    minrows="2"
                                    restrictiontype="input"
                                    max="Infinity"
                                    min="-Infinity"
                                    className={cx('shopee-input__input')}
                                    onChange={(e) => setNameProduct(e.target.value)}
                                />
                                {/* <div className={cx('shopee-input__suffix')}>
                                    <span className={cx('shopee-input__suffix-split')}></span>69/120
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('edit-label')}>
                    <div className={cx('mandatory')}>
                        <span className={cx('mandatory-icon')}>*</span>
                    </div>
                    <span>Ảnh bìa</span>
                </div>
                <div className={cx('shopee-upload-wrapper')}>
                    <input
                        type="file"
                        // name="file"
                        // accept="image/*"
                        // multiple="multiple"
                        //aspect="1"
                        id="choose-file"
                        className={cx('shopee-upload__input')}
                        onChange={(e) => ChooseImg(e)}
                    />
                    <div className={cx('shopee-upload_image')}>
                        <label
                            htmlFor="choose-file"
                            id="shopee-image-manager__upload__content"
                            className={cx('shopee-image-manager__upload__content')}
                        >
                            <FontAwesomeIcon id="shopee__icon" icon={faCirclePlus} />
                            <div id="img-preview-setting-show" className={cx('img-preview-setting-show')}></div>
                        </label>
                    </div>
                </div>
                <div className={cx('edit-label')}>
                    <div className={cx('mandatory')}>
                        <span className={cx('mandatory-icon')}>*</span>
                    </div>
                    <span>Mô tả sản phẩm</span>
                </div>
                <div className={cx('product-edit-form-item-content')}>
                    <div className={cx('shopee-input shopee-input__area')}>
                        <CKEditor
                            editor={ClassicEditor}
                            data=""
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setDescribeProduct(data);
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className={cx('product-edit__section')}>
                <h2 data-v-a50a20d0="">Thông tin chi tiết</h2>
                <div className={cx('attribute-select-container')}>
                    <div className={cx('attribute-select-list')}>
                        <div className={cx('grid-detail')}>
                            <div className={cx('edit-label-detail')} data-education-trigger-key="name">
                                <div className={cx('mandatory')}>
                                    <span className={cx('mandatory-icon')}>*</span>
                                </div>{' '}
                                <span>Trọng lượng</span>
                            </div>
                            <div className={cx('edit-input-detail-money-promotion')}>
                                <div className={cx('shopee-input')}>
                                    <div className={cx('shopee-input__inner')}>
                                        <div className={cx('shopee-input__prefix')}>
                                            gam<span className={cx('shopee-input__prefix-split')}></span>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Nhập vào"
                                            size="large"
                                            resize="none"
                                            rows="2"
                                            minrows="2"
                                            restrictiontype="input"
                                            max="Infinity"
                                            min="-Infinity"
                                            className={cx('shopee-input__input')}
                                            onChange={(e) => setWeight(e.target.value)}
                                        />
                                        {/* <div className={cx('shopee-input__suffix')}>
                                    <span className={cx('shopee-input__suffix-split')}></span>69/120
                                </div> */}
                                    </div>
                                </div>
                            </div>

                            <div className={cx('edit-label-detail')} data-education-trigger-key="name">
                                <div className={cx('mandatory')}>
                                    <span className={cx('mandatory-icon')}>*</span>
                                </div>{' '}
                                <span>Số lượng</span>
                            </div>
                            <div className={cx('edit-input-detail')}>
                                <div className={cx('shopee-input')}>
                                    <div className={cx('shopee-input__inner')}>
                                        <input
                                            type="text"
                                            placeholder="Nhập vào"
                                            size="large"
                                            resize="none"
                                            rows="2"
                                            minrows="2"
                                            restrictiontype="input"
                                            max="Infinity"
                                            min="-Infinity"
                                            className={cx('shopee-input__input')}
                                            onChange={(e) => setNumber(e.target.value)}
                                        />
                                        {/* <div className={cx('shopee-input__suffix')}>
                                    <span className={cx('shopee-input__suffix-split')}></span>69/120
                                </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('grid-detail')}>
                            <div className={cx('edit-label-detail')} data-education-trigger-key="name">
                                <div className={cx('mandatory')}>
                                    <span className={cx('mandatory-icon')}>*</span>
                                </div>{' '}
                                <span>Giá</span>
                            </div>
                            <div className={cx('edit-input-detail-money-promotion')}>
                                <div className={cx('shopee-input')}>
                                    <div className={cx('shopee-input__inner')}>
                                        <div className={cx('shopee-input__prefix')}>
                                            ₫<span className={cx('shopee-input__prefix-split')}></span>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Nhập vào"
                                            size="large"
                                            resize="none"
                                            rows="2"
                                            minrows="2"
                                            restrictiontype="input"
                                            max="Infinity"
                                            min="-Infinity"
                                            className={cx('shopee-input__input')}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                        {/* <div className={cx('shopee-input__suffix')}>
                                    <span className={cx('shopee-input__suffix-split')}></span>69/120
                                </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className={cx('edit-label-detail')} data-education-trigger-key="name">
                                <span>Khuyến mãi</span>
                            </div>
                            <div className={cx('edit-input-detail-money-promotion')}>
                                <div className={cx('shopee-input')}>
                                    <div className={cx('shopee-input__inner')}>
                                        <div className={cx('shopee-input__prefix')}>
                                            %<span className={cx('shopee-input__prefix-split')}></span>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Nhập vào"
                                            size="large"
                                            resize="none"
                                            rows="2"
                                            minrows="2"
                                            restrictiontype="input"
                                            max="Infinity"
                                            min="-Infinity"
                                            className={cx('shopee-input__input')}
                                            onChange={(e) => setPromotion(e.target.value)}
                                        />
                                        {/* <div className={cx('shopee-input__suffix')}>
                                    <span className={cx('shopee-input__suffix-split')}></span>69/120
                                </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('grid-detail')}>
                            <div className={cx('edit-label')} data-education-trigger-key="name">
                                <div className={cx('mandatory')}>
                                    <span className={cx('mandatory-icon')}>*</span>
                                </div>{' '}
                                <span>Danh mục</span>
                            </div>
                            <div className="edit-input">
                                <select
                                    name="weight"
                                    id="input-category-select"
                                    className={cx('input-Weight')}
                                    defaultValue={''}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="" disabled hidden className={cx('input-type-weight')}>
                                        Vui lòng chọn
                                    </option>
                                    {/* <option value="" className={cx('input-type-weight')}></option>
                                    <option value="1" className={cx('input-type-weight')}>
                                        Khô cá lóc
                                    </option>
                                    <option value="2" className={cx('input-type-weight')}>
                                        Khô cá sặc
                                    </option>
                                    <option value="3" className={cx('input-type-weight')}>
                                        Khô cá Basa
                                    </option> */}
                                </select>
                            </div>
                        </div>
                        <div className={cx('grid-detail')}>
                            <div className={cx('edit-label')}>
                                <div className={cx('mandatory')}>
                                    <span className={cx('mandatory-icon')}>*</span>
                                </div>
                                <span>Hình ảnh</span>
                            </div>
                            <div className={cx('shopee-upload-wrapper')}>
                                <input
                                    type="file"
                                    // name="file"
                                    // accept="image/*"
                                    // multiple="multiple"
                                    //aspect="1"
                                    id="choose-file-details"
                                    className={cx('shopee-upload__input')}
                                    onChange={(e) => ChooseImgDetails(e)}
                                />
                                <div className={cx('shopee-upload_image')}>
                                    {/* <div
                                        id="img-preview-setting-show-details"
                                        className={cx('img-preview-setting-show-details')}
                                    ></div> */}
                                    <label
                                        htmlFor="choose-file-details"
                                        id="shopee-image-manager__upload__content-details"
                                        className={cx('shopee-image-manager__upload__content-details')}
                                    >
                                        <FontAwesomeIcon
                                            icon={faCirclePlus}
                                            id="shopee-close-icon"
                                            className={cx('shopee-close-icon')}
                                        />
                                        <div
                                            id="img-preview-setting-show-details"
                                            className={cx('img-preview-setting-show-details')}
                                        ></div>
                                    </label>
                                </div>
                            </div>
                            <div className={cx('shopee-upload-wrapper')}>
                                <input
                                    type="file"
                                    // name="file"
                                    // accept="image/*"
                                    // multiple="multiple"
                                    //aspect="1"
                                    id="choose-file-details-two"
                                    className={cx('shopee-upload__input')}
                                    onChange={(e) => ChooseImgDetailsTwo(e)}
                                />
                                <div className={cx('shopee-upload_image')}>
                                    {/* <div
                                        id="img-preview-setting-show-details"
                                        className={cx('img-preview-setting-show-details')}
                                    ></div> */}
                                    <label
                                        htmlFor="choose-file-details-two"
                                        id="shopee-image-manager__upload__content-details-two"
                                        className={cx('shopee-image-manager__upload__content-details-two')}
                                    >
                                        <FontAwesomeIcon
                                            icon={faCirclePlus}
                                            id="shopee-close-icon-two"
                                            className={cx('shopee-close-icon-two')}
                                        />
                                        <div
                                            id="img-preview-setting-show-details-two"
                                            className={cx('img-preview-setting-show-details-two')}
                                        ></div>
                                    </label>
                                </div>
                            </div>
                            <div className={cx('shopee-upload-wrapper')}>
                                <input
                                    type="file"
                                    // name="file"
                                    // accept="image/*"
                                    // multiple="multiple"
                                    //aspect="1"
                                    id="choose-file-details-three"
                                    className={cx('shopee-upload__input')}
                                    onChange={(e) => ChooseImgDetailsThree(e)}
                                />
                                <div className={cx('shopee-upload_image')}>
                                    {/* <div
                                        id="img-preview-setting-show-details"
                                        className={cx('img-preview-setting-show-details')}
                                    ></div> */}
                                    <label
                                        htmlFor="choose-file-details-three"
                                        id="shopee-image-manager__upload__content-details-three"
                                        className={cx('shopee-image-manager__upload__content-details-three')}
                                    >
                                        <FontAwesomeIcon
                                            icon={faCirclePlus}
                                            id="shopee-close-icon-three"
                                            className={cx('shopee-close-icon-three')}
                                        />
                                        <div
                                            id="img-preview-setting-show-details-three"
                                            className={cx('img-preview-setting-show-details-three')}
                                        ></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('btn-save-product')}>
                <div
                    className={cx('btn-save')}
                    onClick={() =>
                        handleSubmitAddProduct(
                            nameProduct,
                            coverImage,
                            describeProduct,
                            weight,
                            number,
                            price,
                            promotion,
                            category,
                            image,
                            imageTwo,
                            imageThree,
                        )
                    }
                >
                    <div className={cx('btn-save-text')}>Lưu</div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default SellerAddProduct;
