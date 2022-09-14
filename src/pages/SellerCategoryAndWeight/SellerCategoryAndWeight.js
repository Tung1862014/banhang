import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import GetCookie from '~/components/Hook/GetCookies';
import styles from './SellerCategoryAndWeight.moudule.scss';

const cx = classNames.bind(styles);

function SellerCategoryAndWeight() {
    const [takeCategory, setTakeCategory] = useState('');
    //const [takeWeight, setTakeWeight] = useState('');
    //const [checkWeight, setCheckWeight] = useState('');
    const [checkCategory, setCheckCategory] = useState('');
    const [category, setCategory] = useState('');
    //const [weight, setWeight] = useState('');
    const [categoryValue, setCategoryValue] = useState('');
    //const [weightValue, setWeightValue] = useState('');
    //const [categoryValueContent, setCategoryValueContent] = useState('');

    console.log(category);

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
    //                 //setTakeWeight(res.data.result);
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
                    setTakeCategory(res.data.result);
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

    const handleAddCategory = () => {
        const clickAdd = document.getElementById('grid-category-container');
        const clickUpdate = document.getElementById('grid-category-container-update');
        clickAdd.style.display = 'flex';
        clickUpdate.style.display = 'none';
    };

    const handleUpdateCategory = () => {
        if (category !== '') {
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
        setCategory(e.target.value);
        let valueCategory = e.target.value;
        handleTakeCategoryValue(valueCategory);
    }

    function handleTakeCategoryValue(valueCategory) {
        if (valueCategory !== '') {
            for (let i = 0; i < takeCategory.length; i++) {
                //console.log(typeof takeCategory[i].DM_id);
                if (valueCategory === takeCategory[i].DM_id.toString()) {
                    //console.log(takeCategory[i].DM_danhmuc);
                    setCategoryValue(takeCategory[i].DM_danhmuc);
                }
            }
        }
    }

    function handleAddCategoryDatabase() {
        axios
            .post(`${process.env.REACT_APP_URL_NODEJS}/sellercategoryandweight/category/add`, {
                NB_id: JSON.parse(GetCookie('seller')).ND_id,
                DM_danhmuc: category,
            })
            .then((res) => {
                console.log(res.data);
                window.open(`${process.env.REACT_APP_URL_FRONTEND}/seller/categoryandweight`, '_self', 1);
            })
            .catch((err) => {
                console.log('loi');
            });
    }

    function handleUpdateCategoryDatabase() {
        axios
            .put(`${process.env.REACT_APP_URL_NODEJS}/sellercategoryandweight/category/update`, {
                NB_id: JSON.parse(GetCookie('seller')).ND_id,
                DM_id: category,
                DM_danhmuc: categoryValue,
            })
            .then((res) => {
                console.log(res.data);
                window.open(`${process.env.REACT_APP_URL_FRONTEND}/seller/categoryandweight`, '_self', 1);
            })
            .catch((err) => {
                console.log('loi');
            });
    }

    function handleDeleteCategory() {
        if (category !== '') {
            const clicShowForm = document.getElementById('delete-modal__container');
            clicShowForm.style.display = 'flex';
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
        handleDeleteCategoryDatabase();
    }

    function handleDeleteCategoryDatabase() {
        axios
            .delete(`${process.env.REACT_APP_URL_NODEJS}/sellercategoryandweight/category/delete`, {
                data: {
                    NB_id: JSON.parse(GetCookie('seller')).ND_id,
                    DM_id: category,
                },
            })
            .then((res) => {
                console.log(res.data);
                window.open(`${process.env.REACT_APP_URL_FRONTEND}/seller/categoryandweight`, '_self', 1);
            })
            .catch((err) => {
                console.log('loi');
            });
    }

    ///Weight
    // function handleAddWeight() {
    //     const clickAdd = document.getElementById('grid-weight-container');
    //     const clickUpdate = document.getElementById('grid-weight-container-update');
    //     clickAdd.style.display = 'flex';
    //     clickUpdate.style.display = 'none';
    // }

    // function handleUpdateWeight() {
    //     if (weight !== '') {
    //         const clickAdd = document.getElementById('grid-weight-container');
    //         const clickUpdate = document.getElementById('grid-weight-container-update');
    //         clickAdd.style.display = 'none';
    //         clickUpdate.style.display = 'flex';
    //     } else {
    //         toast.error('Bạn cần chọn trọng lượng!', {
    //             position: toast.POSITION.TOP_CENTER,
    //             className: `${cx('toast-message')}`,
    //         });
    //     }
    // }

    // function handleTakeWeight(e) {
    //     setWeight(e.target.value);
    //     let valueCategory = e.target.value;
    //     handleTakeWeightValue(valueCategory);
    // }

    // function handleTakeWeightValue(valueCategory) {
    //     if (valueCategory !== '') {
    //         for (let i = 0; i < takeWeight.length; i++) {
    //             //console.log(typeof takeCategory[i].DM_id);
    //             if (valueCategory === takeWeight[i].TL_id.toString()) {
    //                 //console.log(takeCategory[i].DM_danhmuc);
    //                 setWeightValue(takeWeight[i].TL_trongluong);
    //             }
    //         }
    //     }
    // }

    // function handleAddWeightDatabase() {
    //     axios
    //         .post(`${process.env.REACT_APP_URL_NODEJS}/sellercategoryandweight/weight/add`, {
    //             NB_id: JSON.parse(GetCookie('seller')).NB_id,
    //             TL_trongluong: weight,
    //         })
    //         .then((res) => {
    //             console.log(res.data);
    //             window.open(`${process.env.REACT_APP_URL_FRONTEND}/seller/categoryandweight`, '_self', 1);
    //         })
    //         .catch((err) => {
    //             console.log('loi');
    //         });
    // }

    // function handleUpdateWeightDatabase() {
    //     axios
    //         .put(`${process.env.REACT_APP_URL_NODEJS}/sellercategoryandweight/weight/update`, {
    //             NB_id: JSON.parse(GetCookie('seller')).NB_id,
    //             TL_id: weight,
    //             TL_trongluong: weightValue,
    //         })
    //         .then((res) => {
    //             console.log(res.data);
    //             window.open(`${process.env.REACT_APP_URL_FRONTEND}/seller/categoryandweight`, '_self', 1);
    //         })
    //         .catch((err) => {
    //             console.log('loi');
    //         });
    // }
    // function handleDeleteWeight() {
    //     if (weight !== '') {
    //         const clicShowForm = document.getElementById('delete-weight-modal__container');
    //         clicShowForm.style.display = 'flex';
    //     } else {
    //         toast.error('Bạn cần chọn một trọng lượng!', {
    //             position: toast.POSITION.TOP_CENTER,
    //             className: `${cx('toast-message')}`,
    //         });
    //     }
    // }

    // function handleDeleteHuyWeight() {
    //     const clicShowForm = document.getElementById('delete-weight-modal__container');
    //     clicShowForm.style.display = 'none';
    // }

    // function handleDeleteAgreeWeight() {
    //     const clicShowForm = document.getElementById('delete-weight-modal__container');
    //     clicShowForm.style.display = 'none';
    //     handleDeleteWeightDatabase();
    // }

    // function handleDeleteWeightDatabase() {
    //     axios
    //         .delete(`${process.env.REACT_APP_URL_NODEJS}/sellercategoryandweight/weight/delete`, {
    //             data: {
    //                 NB_id: JSON.parse(GetCookie('seller')).NB_id,
    //                 TL_id: weight,
    //             },
    //         })
    //         .then((res) => {
    //             console.log(res.data);
    //             window.open(`${process.env.REACT_APP_URL_FRONTEND}/seller/categoryandweight`, '_self', 1);
    //         })
    //         .catch((err) => {
    //             console.log('loi');
    //         });
    // }

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
            {/* <div id="delete-weight-modal__container" className={cx('delete-weight-modal__container')}>
                <div id="delete-modal__box" className={cx('delete-modal__box')}>
                    <div className={cx('delete-modal__content')}>
                        <div className={cx('delete-modal__header')}>
                            <div className={cx('delete-modal__header-inner-confirm')}>
                                <div className={cx('delete-modal__title')}>Xác nhận</div>
                            </div>
                            <div className={cx('delete-modal__header-inner-title')}>
                                <div className={cx('delete-modal__title')}>Bạn có muốn xóa trọng lượng?</div>
                            </div>
                        </div>
                        <div className={cx('delete-modal__footer')}>
                            <div className={cx('delete-modal__footer-buttons')}>
                                <button
                                    type="button"
                                    className={cx('delete-button--normal')}
                                    onClick={handleDeleteHuyWeight}
                                >
                                    <span>Hủy</span>
                                </button>
                                <button
                                    type="button"
                                    className={cx('delete-button--primary')}
                                    onClick={handleDeleteAgreeWeight}
                                >
                                    <span>Đồng ý</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className={cx('product-edit__section')}>
                <h2>Danh mục sản phẩm</h2>
                <div className={cx('grid-detail')}>
                    <div className={cx('edit-label')} data-education-trigger-key="name">
                        <span>Danh mục</span>
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
                    <div className={cx('grid-detail-category')}>
                        <div className={cx('btn-add-category')}>
                            <button type="button" className={cx('delete-button')} onClick={handleAddCategory}>
                                Thêm
                            </button>
                        </div>
                        <div className={cx('btn-add-category')}>
                            <button type="button" className={cx('delete-button')} onClick={handleUpdateCategory}>
                                Cập nhật
                            </button>
                        </div>
                        <div className={cx('btn-add-category')}>
                            <button type="button" className={cx('delete-button')} onClick={handleDeleteCategory}>
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
                <div className={cx('grid-table-container')}>
                    <table className={cx('table__header')}>
                        <thead>
                            <tr className={cx('table__header-tr')}>
                                <td className={cx('td_table-name')}>Mã danh mục</td>
                                <td className={cx('td_table-name')}>Tên danh mục</td>
                            </tr>

                            {takeCategory !== ''
                                ? takeCategory.map((pro, index) => (
                                      <tr key={index} className={cx('table__header-conten')}>
                                          <td className={cx('td_table-name')}>{pro.DM_id}</td>
                                          <td className={cx('td_table-name')}>{pro.DM_danhmuc}</td>
                                      </tr>
                                  ))
                                : ''}
                        </thead>
                    </table>
                    <div id="grid-category-container" className={cx('grid-category-container')}>
                        <div className={cx('grid-category-center')}>
                            <div className={cx('edit-label-detail')} data-education-trigger-key="name">
                                <span>Danh mục</span>
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
                                            onChange={(e) => setCategory(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('btn-add-category-perform')}>
                            <button
                                type="button"
                                className={cx('delete-button')}
                                onClick={() => handleAddCategoryDatabase()}
                            >
                                Thêm
                            </button>
                        </div>
                    </div>
                    <div id="grid-category-container-update" className={cx('grid-category-container-update')}>
                        <div className={cx('grid-category-center')}>
                            <div className={cx('edit-label-detail')} data-education-trigger-key="name">
                                <span>Danh mục</span>
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
                                            //defaultValue={categoryValue || ''}
                                            value={categoryValue || ''}
                                            className={cx('shopee-input__input')}
                                            onChange={(e) => setCategoryValue(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('btn-add-category-perform')}>
                            <button
                                type="button"
                                className={cx('delete-button')}
                                onClick={() => handleUpdateCategoryDatabase()}
                            >
                                Cập nhật
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
}

export default SellerCategoryAndWeight;
