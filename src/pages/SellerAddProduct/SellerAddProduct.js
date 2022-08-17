import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './SellerAddProduct.module.scss';
import { CKEditor } from 'ckeditor4-react';

const cx = classNames.bind(styles);

function SellerAddProduct() {
    function ChooseImg(e) {
        const chooseFile = document.getElementById('choose-file');
        const imgPreview = document.getElementById('img-preview-setting-show');
        const files = chooseFile.files[0];
        if (files) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(files);
            fileReader.addEventListener('load', function () {
                console.log('image: ' + this.result);
                imgPreview.style.display = 'flex';
                imgPreview.innerHTML =
                    '<img src="' +
                    this.result +
                    '" style =" width: 80px; height: 80px; display: flex;  justify-content: center;  align-items: center;"/>';
            });
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
                                    className={cx('shopee-input__input')}
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
                        <div id="img-preview-setting-show" className={cx('img-preview-setting-show')}></div>
                        <label htmlFor="choose-file" className={cx('shopee-image-manager__upload__content')}>
                            <FontAwesomeIcon icon={faCirclePlus} />
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
                            initData={
                                <textarea
                                    type="textarea"
                                    resize="none"
                                    rows="2"
                                    minrows="9"
                                    maxrows="26"
                                    autosize="true"
                                    restrictiontype="input"
                                    max="Infinity"
                                    min="-Infinity"
                                    className={cx('shopee-input__inner_textarea')}
                                ></textarea>
                            }
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
                                <select name="weight" className={cx('input-Weight')}>
                                    <option value="" className={cx('input-type-weight')}></option>
                                    <option value="500" className={cx('input-type-weight')}>
                                        500g
                                    </option>
                                    <option value="1" className={cx('input-type-weight')}>
                                        1kg
                                    </option>
                                    <option value="1.5" className={cx('input-type-weight')}>
                                        1.5kg
                                    </option>
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
                                            className={cx('shopee-input__input')}
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
                                        />
                                        {/* <div className={cx('shopee-input__suffix')}>
                                    <span className={cx('shopee-input__suffix-split')}></span>69/120
                                </div> */}
                                    </div>
                                </div>
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
                                    multiple
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SellerAddProduct;
