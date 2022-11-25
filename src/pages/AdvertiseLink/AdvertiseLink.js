import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import styles from './AdvertiseLink.module.scss';
import AdvertiseLinkPage from './AdvertiseLinkPage';

const cx = classNames.bind(styles);

function AdvertiseLink() {
    const [takeCategory, setTakeCategory] = useState('');
    //const [takeWeight, setTakeWeight] = useState('');
    //const [checkWeight, setCheckWeight] = useState('');
    const [checkCategory, setCheckCategory] = useState('');
    const [titleValue, setTitleValue] = useState('');
    const [linkValue, setLinkValue] = useState('');
    const [idLink, setIdLink] = useState('');
    //const [weight, setWeight] = useState('');
    //const [categoryValue, setCategoryValue] = useState('');
    const [titleUpdateValue, setTitleUpdateValue] = useState('');
    const [linkUpdateValue, setLinkUpdateValue] = useState('');
    //const [product, setProduct] = useState([]);
    //const [idCategory, setIdCategory] = useState('');

    useEffect(() => {
        // setCheckWeight(false);
        const pathId = window.location.pathname.toString();
        const resultId = pathId.slice(22);
        axios
            .get(`${process.env.REACT_APP_URL_NODEJS}/admin/show/link/advertise?QB_id=${resultId}`)
            .then((res) => {
                console.log('data', res.data);
                if (checkCategory === '') {
                    handleCategory(res.data.result);
                    setCheckCategory('category');
                    setTakeCategory(res.data.result);
                }
            })
            .catch((err) => {
                console.log('loi');
            });
    }, [checkCategory]);

    function handleCategory(takeLink) {
        const selectValue = document.getElementById('input-category-select');

        for (let i = 0; i < takeLink.length; i++) {
            const optionValue = document.createElement('option');
            console.log(takeLink[i].LI_tieude);
            optionValue.value = takeLink[i].LI_id;
            optionValue.textContent = takeLink[i].LI_tieude;
            selectValue.appendChild(optionValue);
        }
    }

    const handleAddLink = () => {
        const clickAdd = document.getElementById('grid-category-container');
        const clickUpdate = document.getElementById('grid-category-container-update');
        clickAdd.style.display = 'flex';
        clickUpdate.style.display = 'none';
    };

    const handleUpdateLink = () => {
        if (idLink !== '') {
            const clickAdd = document.getElementById('grid-category-container');
            const clickUpdate = document.getElementById('grid-category-container-update');
            clickAdd.style.display = 'none';
            clickUpdate.style.display = 'flex';
        } else {
            toast.error('Bạn cần chọn một danh mục!', {
                position: toast.POSITION.TOP_CENTER,
                className: `${cx('toast-message')}`,
            });
        }
    };

    function handleTakeCategory(e) {
        setIdLink(e.target.value);
        let valueCategory = e.target.value;
        handleTakeCategoryValue(valueCategory);
    }

    function handleTakeCategoryValue(valueCategory) {
        if (valueCategory !== '') {
            for (let i = 0; i < takeCategory.length; i++) {
                //console.log(typeof takeCategory[i].DM_id);
                if (valueCategory === takeCategory[i].LI_id.toString()) {
                    //console.log(takeCategory[i].DM_danhmuc);
                    setTitleUpdateValue(takeCategory[i].LI_tieude);
                    setLinkUpdateValue(takeCategory[i].LI_link);
                }
            }
        }
    }

    function handleAddLinkDatabase() {
        if (titleValue !== '' && linkValue !== '') {
            const pathId = window.location.pathname.toString();
            const resultId = pathId.slice(22);
            axios
                .post(`${process.env.REACT_APP_URL_NODEJS}/admin/add/link/advertise`, {
                    QB_id: resultId,
                    LI_tieude: titleValue,
                    LI_link: linkValue,
                })
                .then((res) => {
                    console.log(res.data.warning);
                    window.open(`${process.env.REACT_APP_URL_FRONTEND}/admin/link/advertise=${resultId}`, '_self', 1);
                })
                .catch((err) => {
                    console.log('loi');
                });
        } else if (titleValue === '') {
            toast.warning('Tiêu đề không được bỏ trống!', {
                position: toast.POSITION.TOP_CENTER,
                className: `${cx('toast-message')}`,
            });
        } else if (linkValue === '') {
            toast.warning('Link không được bỏ trống!', {
                position: toast.POSITION.TOP_CENTER,
                className: `${cx('toast-message')}`,
            });
        }
    }

    function handleUpdateLinkDatabase() {
        const pathId = window.location.pathname.toString();
        const resultId = pathId.slice(22);
        axios
            .put(`${process.env.REACT_APP_URL_NODEJS}/admin/update/link/advertise`, {
                LI_id: idLink,
                LI_tieude: titleUpdateValue,
                LI_link: linkUpdateValue,
            })
            .then((res) => {
                console.log(res.data);
                window.open(`${process.env.REACT_APP_URL_FRONTEND}/admin/link/advertise=${resultId}`, '_self', 1);
            })
            .catch((err) => {
                console.log('loi');
            });
    }

    function handleDeleteLink() {
        if (idLink !== '') {
            const clickShowForm = document.getElementById('delete-modal__container');
            clickShowForm.style.display = 'flex';
        } else {
            toast.error('Bạn cần chọn một danh mục!', {
                position: toast.POSITION.TOP_CENTER,
                className: `${cx('toast-message')}`,
            });
        }
    }

    function handleDeleteHuy() {
        const clicShowForm = document.getElementById('delete-modal__container');
        clicShowForm.style.display = 'none';
    }

    function handleDeleteAgree() {
        const clicShowForm = document.getElementById('delete-modal__container');
        clicShowForm.style.display = 'none';
        handleDeleteLinkDatabase();
    }

    function handleDeleteLinkDatabase() {
        const pathId = window.location.pathname.toString();
        const resultId = pathId.slice(22);
        axios
            .delete(`${process.env.REACT_APP_URL_NODEJS}/admin/delete/link/advertise`, {
                data: {
                    LI_id: idLink,
                },
            })
            .then((res) => {
                console.log(res.data);
                window.open(`${process.env.REACT_APP_URL_FRONTEND}/admin/link/advertise=${resultId}`, '_self', 1);
            })
            .catch((err) => {
                console.log('loi');
            });
    }

    return (
        <div className={cx('wrapper')}>
            <div id="delete-modal__container" className={cx('delete-modal__container')}>
                <div id="delete-modal__box" className={cx('delete-modal__box')}>
                    <div className={cx('delete-modal__content')}>
                        <div className={cx('delete-modal__header')}>
                            <div className={cx('delete-modal__header-inner-confirm')}>
                                <div className={cx('delete-modal__title')}>Xác nhận</div>
                            </div>
                            <div className={cx('delete-modal__header-inner-title')}>
                                <div className={cx('delete-modal__title')}>Bạn có muốn xóa danh mục?</div>
                            </div>
                        </div>
                        <div className={cx('delete-modal__footer')}>
                            <div className={cx('delete-modal__footer-buttons')}>
                                <button type="button" className={cx('delete-button--normal')} onClick={handleDeleteHuy}>
                                    <span>Hủy</span>
                                </button>
                                <button
                                    type="button"
                                    className={cx('delete-button--primary')}
                                    onClick={handleDeleteAgree}
                                >
                                    <span>Đồng ý</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('product-edit__section')}>
                <h2>Danh sách link</h2>
                <div className={cx('grid-detail')}>
                    <div className={cx('edit-label')} data-education-trigger-key="name">
                        <span>Tiêu đề</span>
                    </div>
                    <div className="edit-input">
                        <select
                            name="weight"
                            id="input-category-select"
                            className={cx('input-Weight')}
                            defaultValue={''}
                            onChange={(e) => handleTakeCategory(e)}
                        >
                            <option value="" disabled hidden className={cx('input-type-weight')}>
                                Vui lòng chọn
                            </option>
                        </select>
                    </div>
                </div>
                <div className={cx('grid-detail-category')}>
                    <div className={cx('btn-add-category')}>
                        <button type="button" className={cx('delete-button')} onClick={handleAddLink}>
                            Thêm
                        </button>
                    </div>
                    <div className={cx('btn-add-category')}>
                        <button type="button" className={cx('delete-button')} onClick={handleUpdateLink}>
                            Cập nhật
                        </button>
                    </div>
                    <div className={cx('btn-add-category')}>
                        <button type="button" className={cx('delete-button')} onClick={handleDeleteLink}>
                            Xóa
                        </button>
                    </div>
                </div>
                <div className={cx('grid-table-container')}>
                    <div id="grid-category-container" className={cx('grid-category-container')}>
                        <div className={cx('grid-category-center')}>
                            <div className={cx('edit-label-detail')} data-education-trigger-key="name">
                                <span>Tiêu đề</span>
                            </div>
                            <div className={cx('edit-input-detail')}>
                                <div className={cx('shopee-input')}>
                                    <div className={cx('shopee-input__inner')}>
                                        <textarea
                                            placeholder="Nhập vào"
                                            className={cx('shopee-input__input')}
                                            onChange={(e) => setTitleValue(e.target.value)}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('grid-category-center')}>
                            <div className={cx('edit-label-detail_link')} data-education-trigger-key="name">
                                <span>Link</span>
                            </div>
                            <div className={cx('edit-input-detail')}>
                                <div className={cx('shopee-input')}>
                                    <div className={cx('shopee-input__inner')}>
                                        <textarea
                                            placeholder="Nhập vào"
                                            className={cx('shopee-input__input')}
                                            onChange={(e) => setLinkValue(e.target.value)}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('btn-add-category-perform')}>
                            <button
                                type="button"
                                className={cx('delete-button')}
                                onClick={() => handleAddLinkDatabase()}
                            >
                                Thêm
                            </button>
                        </div>
                    </div>
                    <div id="grid-category-container-update" className={cx('grid-category-container-update')}>
                        <div className={cx('grid-category-center')}>
                            <div className={cx('edit-label-detail')} data-education-trigger-key="name">
                                <span>Tiêu đề</span>
                            </div>
                            <div className={cx('edit-input-detail')}>
                                <div className={cx('shopee-input')}>
                                    <div className={cx('shopee-input__inner')}>
                                        <textarea
                                            placeholder="Nhập vào"
                                            //defaultValue={categoryValue || ''}
                                            value={titleUpdateValue || ''}
                                            className={cx('shopee-input__input')}
                                            onChange={(e) => setTitleUpdateValue(e.target.value)}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('grid-category-center')}>
                            <div className={cx('edit-label-detail_link')} data-education-trigger-key="name">
                                <span>Link</span>
                            </div>
                            <div className={cx('edit-input-detail')}>
                                <div className={cx('shopee-input')}>
                                    <div className={cx('shopee-input__inner')}>
                                        <textarea
                                            placeholder="Nhập vào"
                                            //defaultValue={categoryValue || ''}
                                            value={linkUpdateValue || ''}
                                            className={cx('shopee-input__input')}
                                            onChange={(e) => setLinkUpdateValue(e.target.value)}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('btn-add-category-perform')}>
                            <button
                                type="button"
                                className={cx('delete-button')}
                                onClick={() => handleUpdateLinkDatabase()}
                            >
                                Cập nhật
                            </button>
                        </div>
                    </div>

                    <AdvertiseLinkPage data={takeCategory} />
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default AdvertiseLink;
