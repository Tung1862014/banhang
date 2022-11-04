import axios from 'axios';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
// import { Link } from 'react-router-dom';
import styles from './AdvertiseUpdate.module.scss';

const cx = classNames.bind(styles);

function AdvertiseUpdate() {
    const [advertiseValue, setAdvertiseValue] = useState('');
    const [nameAdvertise, setNameAdvertise] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [describeAdverties, setDescribeAdvertise] = useState('');

    console.log('advertiesValue', advertiseValue);

    useEffect(() => {
        const pathId = window.location.pathname.toString();
        const result = pathId.slice(24);
        axios
            .get(`${process.env.REACT_APP_URL_NODEJS}/admin/show/all/advertise?QB_id=${result}`)
            .then((res) => {
                setAdvertiseValue(res.data.advertise[0]);
                setNameAdvertise(res.data.advertise[0].QB_tieude);
                setDescribeAdvertise(res.data.advertise[0].QB_mota);
            })
            .catch(() => {
                console.log('loi');
            });
    }, []);

    console.log('infomation', nameAdvertise, coverImage, describeAdverties);
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

    const handleSubmitUpdateAdverties = (nameAdvertise, coverImage, describeAdverties) => {
        const pathId = window.location.pathname.toString();
        const result = pathId.slice(24);
        if (nameAdvertise === '') {
            toast.warning('Tiêu đề không được bỏ trống!', {
                position: toast.POSITION.TOP_CENTER,
                className: `${cx('toast-message')}`,
            });
        } else if (describeAdverties === '') {
            toast.warning('Mô tả không được bỏ trông!', {
                position: toast.POSITION.TOP_CENTER,
                className: `${cx('toast-message')}`,
            });
        } else {
            if (coverImage !== '') {
                const formData = new FormData();
                formData.append('image', coverImage[0]);
                formData.append('QB_id', result);
                formData.append('QB_tieude', nameAdvertise);
                formData.append('QB_mota', describeAdverties);
                axios({
                    method: 'PUT',
                    url: `${process.env.REACT_APP_URL_NODEJS}/admin/update/advertise/image`,
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                    .then((res) => {
                        console.log(res.data);
                    })
                    .catch((err) => {});
            } else {
                axios
                    .put(`${process.env.REACT_APP_URL_NODEJS}/admin/update/advertise`, {
                        QB_id: result,
                        QB_tieude: nameAdvertise,
                        QB_mota: describeAdverties,
                    })
                    .then((res) => {
                        console.log(res.data.update);
                        if (res.data.update) {
                            toast.success('Cập nhật thành công', {
                                position: toast.POSITION.TOP_CENTER,
                                className: `${cx('toast-message')}`,
                            });
                        } else {
                            toast.error('Cập nhật thất bại', {
                                position: toast.POSITION.TOP_CENTER,
                                className: `${cx('toast-message')}`,
                            });
                        }
                    })
                    .catch(() => {
                        console.log('loi');
                    });
            }
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
                                    defaultValue={nameAdvertise !== '' ? nameAdvertise : ''}
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
                            <div id="img-preview-setting-show" className={cx('img-preview-setting-show')}>
                                <img
                                    src={advertiseValue !== '' ? advertiseValue.QB_image : '#' || '#'}
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
                    <span>Mô tả chi tiết</span>
                </div>
                <div className={cx('product-edit-form-item-content')}>
                    <div className={cx('shopee-input shopee-input__area')}>
                        <CKEditor
                            editor={ClassicEditor}
                            data={`${describeAdverties !== '' ? describeAdverties : ''}`}
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
                    onClick={() => handleSubmitUpdateAdverties(nameAdvertise, coverImage, describeAdverties)}
                >
                    <div className={cx('btn-save-text')}>Cập nhật</div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default AdvertiseUpdate;
