import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import GetCookie from '~/components/Hook/GetCookies';
import styles from './SellerUpdateProduct.module.scss';

const cx = classNames.bind(styles);

function SellerUpdateProduct() {
    const [productUpdate, setProductUpdate] = useState('');
    const [describeUpdate, setDescribeUpdate] = useState('');
    const [describeWeightUpdate, setDescribeWeightUpdate] = useState('');
    const [productCategoryUpdate, setProductCategoryUpdate] = useState('');
    const [imageUpdate, setImageUpdate] = useState('');
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

    const [checkWeight, setCheckWeight] = useState('');
    const [checkCategory, setCheckCategory] = useState('');

    console.log(describeWeightUpdate);
    ///take data product
    useEffect(() => {
        const pathId = window.location.pathname.toString();
        const result = pathId.slice(24);
        // console.log('Page path is:  ' + result);
        axios
            .post(`${process.env.REACT_APP_URL_NODEJS}/sellerupdateproduct/product/show`, {
                NB_id: JSON.parse(GetCookie('seller')).NB_id,
                SP_id: result,
            })
            .then((res) => {
                // console.log(res.data.result[0]);
                if (productUpdate === '') {
                    setProductUpdate(res.data.result[0]);
                    setProductCategoryUpdate(res.data.category[0]);
                }
            })
            .catch((err) => {});
    }, [productUpdate]);

    //Take motasanpham
    useEffect(() => {
        const pathId = window.location.pathname.toString();
        const result = pathId.slice(24);
        // console.log('Page path is:  ' + result);
        axios
            .post(`${process.env.REACT_APP_URL_NODEJS}/sellerupdateproduct/product/show/describe`, {
                NB_id: JSON.parse(GetCookie('seller')).NB_id,
                SP_id: result,
            })
            .then((res) => {
                // console.log(res.data.result[0]);
                if (productUpdate === '') {
                    setDescribeUpdate(res.data.result[0]);
                    setDescribeWeightUpdate(res.data.weight[0]);
                }
            })
            .catch((err) => {});
    }, [productUpdate]);
    //console.log('Page path is ' + window.location.pathname.length);

    useEffect(() => {
        // setCheckWeight(false);
        axios
            .get(
                `${process.env.REACT_APP_URL_NODEJS}/sellerproduct/product/show/weight?seller=${
                    JSON.parse(GetCookie('seller')).NB_id
                }`,
            )
            .then((res) => {
                //console.log(res.data.result);
                if (checkWeight === '') {
                    handleWeight(res.data.result);
                    setCheckWeight('weight');
                }
            })
            .catch((err) => {
                console.log('loi');
            });
    }, [checkWeight]);

    useEffect(() => {
        // setCheckWeight(false);
        axios
            .get(
                `${process.env.REACT_APP_URL_NODEJS}/sellerproduct/product/show/category?seller=${
                    JSON.parse(GetCookie('seller')).NB_id
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

    function handleWeight(takeWeight) {
        const selectValue = document.getElementById('input-weight-select');

        for (let i = 0; i < takeWeight.length; i++) {
            const optionValue = document.createElement('option');
            console.log(takeWeight[i].TL_id);
            optionValue.value = takeWeight[i].TL_id;
            optionValue.textContent = takeWeight[i].TL_trongluong;
            selectValue.appendChild(optionValue);
        }
    }
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
        const closeImage = document.getElementById('img-preview-setting-show__image');
        const files = chooseFile.files[0];
        if (files) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(files);
            fileReader.addEventListener('load', function () {
                console.log('image: ' + this.result);
                imgPreview.style.display = 'flex';
                closeImage.style.display = 'none';
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
                                    defaultValue={productUpdate.SP_ten}
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
                            <div id="img-preview-setting-show" className={cx('img-preview-setting-show')}>
                                <img
                                    src={productUpdate.SP_image || '#'}
                                    alt=""
                                    id="img-preview-setting-show__image"
                                    className={cx('img-preview-setting-show__image')}
                                />
                            </div>
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
                            data={describeUpdate.MTSP_noidung || ''}
                            defaultValue={describeUpdate.MTSP_noidung || ''}
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
                            <div className={cx('edit-label')} data-education-trigger-key="name">
                                <span>Trọng lượng</span>
                            </div>
                            <div className="edit-input">
                                <select
                                    name="weight"
                                    id="input-weight-select"
                                    defaultValue={''}
                                    className={cx('input-Weight')}
                                    onChange={(e) => setWeight(e.target.value)}
                                >
                                    <option
                                        value={describeWeightUpdate.TL_id || ''}
                                        disabled
                                        hidden
                                        className={cx('input-type-weight')}
                                    >
                                        {describeWeightUpdate.TL_trongluong}
                                    </option>
                                    {/* <option value="" className={cx('input-type-weight')}></option> */}
                                    {/* {takeWeight !== ''
                                        ? takeWeight.map((valueWith, index) => (
                                              <option key={index} value={valueWith} className={cx('input-type-weight')}>
                                                  {valueWith}
                                              </option>
                                          ))
                                        : ''} */}
                                    {/* <option value="1" className={cx('input-type-weight')}>
                                        500g
                                    </option>
                                    <option value="2" className={cx('input-type-weight')}>
                                        1kg
                                    </option>
                                    <option value="3" className={cx('input-type-weight')}>
                                        1.5kg
                                    </option> */}
                                </select>
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
                                            defaultValue={productUpdate.SP_soluong}
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
                                            defaultValue={productUpdate.SP_gia}
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
                                            defaultValue={productUpdate.SP_khuyenmai}
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
                                    <option
                                        value={productCategoryUpdate.DM_id}
                                        disabled
                                        hidden
                                        className={cx('input-type-weight')}
                                    >
                                        {productCategoryUpdate.DM_danhmuc}
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
                    // onClick={() =>
                    //     handleSubmitAddProduct(
                    //         nameProduct,
                    //         coverImage,
                    //         describeProduct,
                    //         weight,
                    //         number,
                    //         price,
                    //         promotion,
                    //         category,
                    //         image,
                    //         imageTwo,
                    //         imageThree,
                    //     )
                    // }
                >
                    <div className={cx('btn-save-text')}>Lưu</div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default SellerUpdateProduct;
