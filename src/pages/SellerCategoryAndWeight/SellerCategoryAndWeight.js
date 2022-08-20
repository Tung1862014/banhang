import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import GetCookie from '~/components/Hook/GetCookies';
import styles from './SellerCategoryAndWeight.moudule.scss';

const cx = classNames.bind(styles);

function SellerCategoryAndWeight() {
    const [takeCategory, setTakeCategory] = useState('');
    const [takeWeight, setTakeWeight] = useState('');
    const [checkWeight, setCheckWeight] = useState('');
    const [checkCategory, setCheckCategory] = useState('');

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
                    setTakeWeight(res.data.result);
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
                    setTakeCategory(res.data.result);
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

    return (
        <div className={cx('wrapper')}>
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
                            //onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="" disabled hidden className={cx('input-type-weight')}>
                                Vui lòng chọn
                            </option>
                        </select>
                    </div>
                    <div className={cx('grid-detail-category')}>
                        <div className={cx('btn-add-category')}>
                            <button type="button" className={cx('')}>
                                Thêm
                            </button>
                        </div>
                        <div className={cx('btn-add-category')}>
                            <button type="button" className={cx('')}>
                                Cập nhật
                            </button>
                        </div>
                        <div className={cx('btn-add-category')}>
                            <button type="button" className={cx('')}>
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
                </div>
            </div>
            <div className={cx('product-edit__section')}>
                <h2>Trọng lượng sản phẩm</h2>
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
                            //onChange={(e) => setWeight(e.target.value)}
                        >
                            <option value="" disabled hidden className={cx('input-type-weight')}>
                                Vui lòng chọn
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
                </div>
                <div className={cx('grid-table-container')}>
                    <table className={cx('table__header')}>
                        <thead>
                            <tr className={cx('table__header-tr')}>
                                <td className={cx('td_table-name')}>Mã trọng lượng</td>
                                <td className={cx('td_table-name')}>Trọng lượng</td>
                            </tr>

                            {takeWeight !== ''
                                ? takeWeight.map((pro, index) => (
                                      <tr key={index} className={cx('table__header-conten')}>
                                          <td className={cx('td_table-name')}>{pro.TL_id}</td>
                                          <td className={cx('td_table-name')}>{pro.TL_trongluong}</td>
                                      </tr>
                                  ))
                                : ''}
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default SellerCategoryAndWeight;
