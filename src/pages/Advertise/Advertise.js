import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Advertise.module.scss';

const cx = classNames.bind(styles);

function Advertise() {
    const [advertiseValue, setAdvertiseValue] = useState('');
    const [NumberAdvertiseValue, setNumberAdvertiseValue] = useState('');

    console.log('setAdvertiseValue', advertiseValue);
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_URL_NODEJS}/admin/show/advertise`)
            .then((res) => {
                console.log('Advertise', res.data.numbers);
                setAdvertiseValue(res.data.advertise);
                setNumberAdvertiseValue(res.data.numbers.numbers);
            })
            .catch(() => {
                console.log('loi khong the show product');
            });
    }, []);

    useEffect(() => {
        const pathId = window.location.pathname.toString();
        const resultId = pathId.slice(24);
        console.log('resultId', resultId);
        if (resultId === 'all') {
            handlerClickAll();
        }
    }, []);

    const handlerClickAll = () => {
        const tab1 = document.getElementById('tabs__tab1');
        const badge1 = document.getElementById('tab-badge1');

        tab1.style.color = 'red';
        tab1.style.fontFamily = 'Helvetica';
        badge1.style.color = 'red';
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('shopee-tabs')}>
                <div className={cx('shopee-tabs__nav')}>
                    {' '}
                    <div className={cx('shopee-tabs__nav-warp')}>
                        <div className={cx('shopee-tabs__nav-tabs')}>
                            <div className={cx('shopee-tabs__nav-tab')}>
                                <Link
                                    to="/admin/advertise/seller=all"
                                    id="tabs__tab1"
                                    className={cx('tabs__tab1')}
                                    // onClick={handlerClickAll}
                                >
                                    Tất cả
                                    <span id="tab-badge1" className={cx('tab-badge1')}>
                                        {/* ( {number !== '' ? number : '0'} ) */}
                                    </span>
                                </Link>{' '}
                            </div>
                        </div>{' '}
                        <div className={cx('shopee-tabs__ink-bar')}></div>
                    </div>{' '}
                </div>{' '}
            </div>
            <div className={cx('product-grid')}>
                <div className={cx('grid')}>
                    <div data-v-3cbfdb84="" className={cx('grid-left')}>
                        <div data-v-3cbfdb84="" className={cx('title-box')}>
                            <div data-v-3cbfdb84="" className={cx('page-title-box')}>
                                <div data-v-3cbfdb84="" className={cx('page-title')}>
                                    {NumberAdvertiseValue !== '' ? NumberAdvertiseValue : '0'} Thông tin
                                </div>{' '}
                            </div>
                        </div>
                    </div>
                    <div className={cx('grid-right')}>
                        <Link
                            to={'/seller/product/insert'}
                            className={cx('add-action')}
                            //onClick={() => handleAddProduct()}
                        >
                            <i className={cx('shopee-icon')}>
                                <svg viewBox="0 0 32 32">
                                    <path d="M17.5 2.5h-3v12h-12v3h12v12h3v-12h12v-3h-12v-12z"></path>
                                </svg>
                            </i>
                            <span className={cx('shopee-add-title')}>Thêm 1 thông tin vùng</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={cx('product-list-container')}>
                <div className={cx('product-list-table')}>
                    <div className={cx('shopee-table__header-container')}>
                        <table className={cx('shopee-table__header')}>
                            <thead>
                                <tr className={cx('table__header')}>
                                    <td width="30">
                                        <input
                                            type="checkbox"
                                            name="check"
                                            id="checkAll"
                                            className="checkbox"
                                            // onChange={() => handleCheckAll()}
                                        />
                                    </td>
                                    <td className={cx('td_table-name')}>Thông tin</td>
                                    <td className={cx('td_table-name-number')}>Mô tả</td>
                                    <td className={cx('td_table-name-note')}>Hoạt động</td>
                                </tr>
                                {advertiseValue !== ''
                                    ? advertiseValue.map((info, index) => (
                                          <tr key={index} className={cx('table__header-conten')}>
                                              <td>
                                                  <input
                                                      type="checkbox"
                                                      name="id[]"
                                                      id={`checkId`}
                                                      className={cx('checkbox')}
                                                      value="<?=$bien['idsp']?>"
                                                      //   onChange={() => handleChecked(pro.ND_id)}
                                                  />
                                              </td>
                                              <td className={cx('td_table-name-sp')}>
                                                  <img src={info.QB_imge} alt="" width="50" height="50" />
                                                  <span className={cx('name-product-sp')}>
                                                      {
                                                          'Áo khoác nỉ hoodie nam nữ form rộng,Áo khoác Sheeryan form rộng nỉ dày có mũ unisex ulzzang hàn quốc hot mới nhất 2022'
                                                      }
                                                  </span>
                                              </td>
                                              <td className={cx('td_table-name-sp')}>
                                                  <span className={cx('name-product-sp')}>
                                                      {
                                                          'Áo khoác nỉ hoodie nam nữ form rộng,Áo khoác Sheeryan form rộng nỉ dày có mũ unisex ulzzang hàn quốc hot mới nhất 2022'
                                                      }
                                                  </span>
                                              </td>

                                              <td className={cx('td_table-name-note')}>
                                                  <span
                                                      className={cx('td_table-name-note-button')}
                                                      //   onClick={() => handleNote(pro.ND_id, pro.ND_ghichu)}
                                                  >
                                                      Cập nhật
                                                  </span>
                                              </td>
                                          </tr>
                                      ))
                                    : ''}
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Advertise;
