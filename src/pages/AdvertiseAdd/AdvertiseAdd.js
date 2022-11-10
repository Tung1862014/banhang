import axios from 'axios';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
// import { Link } from 'react-router-dom';
import styles from './AdvertiseAdd.module.scss';

const cx = classNames.bind(styles);

function AdvertiseAdd() {
    const [nameAdvertise, setNameAdvertise] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [describeAdverties, setDescribeAdvertise] = useState('');

    console.log('infomation', nameAdvertise, coverImage, describeAdverties);
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

    const handleSubmitAddAdverties = (nameAdvertise, coverImage, describeAdverties) => {
        if (nameAdvertise === '') {
            toast.warning('Tiêu đề không được bỏ trống!', {
                position: toast.POSITION.TOP_CENTER,
                className: `${cx('toast-message')}`,
            });
        } else if (coverImage === '') {
            toast.warning('Ảnh bìa không được bỏ trông!', {
                position: toast.POSITION.TOP_CENTER,
                className: `${cx('toast-message')}`,
            });
        } else if (describeAdverties === '') {
            toast.warning('Mô tả không được bỏ trông!', {
                position: toast.POSITION.TOP_CENTER,
                className: `${cx('toast-message')}`,
            });
        } else {
            const formData = new FormData();
            formData.append('image', coverImage[0]);
            formData.append('QB_tieude', nameAdvertise);
            formData.append('QB_mota', describeAdverties);
            axios({
                method: 'POST',
                url: `${process.env.REACT_APP_URL_NODEJS}/admin/add/advertise`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((res) => {
                    console.log(res.data);
                })
                .catch((err) => {});
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('product-edit__section')}>
                <h2>Thông tin</h2>
                <div className={cx('grid')}>
                    <div className={cx('edit-label')} data-education-trigger-key="name">
                        <div className={cx('mandatory')}>
                            <span className={cx('mandatory-icon')}>*</span>
                        </div>{' '}
                        <span>Tiêu đề</span>
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
                                    onChange={(e) => setNameAdvertise(e.target.value)}
                                />
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
                    <span>Mô tả chi tiết</span>
                </div>
                <div className={cx('product-edit-form-item-content')}>
                    <div className={cx('shopee-input shopee-input__area')}>
                        <CKEditor
                            editor={ClassicEditor}
                            data=""
                            config={{
                                // plugins: [ Essentials ],
                                ckfinder: {
                                    // The URL that the images are uploaded to.
                                    uploadUrl: 'http://localhost:5000/uploads',

                                    // Enable the XMLHttpRequest.withCredentials property.
                                    withCredentials: true,

                                    // Headers sent along with the XMLHttpRequest to the upload server.
                                    headers: {
                                        'X-CSRF-TOKEN': 'CSFR-Token',
                                        Authorization: 'Bearer <JSON Web Token>',
                                    },
                                },
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setDescribeAdvertise(data);
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className={cx('btn-save-product')}>
                <div
                    className={cx('btn-save')}
                    onClick={() => handleSubmitAddAdverties(nameAdvertise, coverImage, describeAdverties)}
                >
                    <div className={cx('btn-save-text')}>Lưu</div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default AdvertiseAdd;
