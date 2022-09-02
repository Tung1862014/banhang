import { faCartPlus, faMinus, faPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Detail.module.scss';
import StarDetailPage from './StarDetailPage';
import { useDispatch } from 'react-redux';
import { addNumberProduct } from '~/actions/NumberProduct';
const cx = classNames.bind(styles);

function Detail() {
    const [product, setProduct] = useState('');
    const [evaluation, setEvaluation] = useState('');
    const [evaluationNum, setEvaluationNum] = useState('');
    const [evaluationStar, setEvaluationStar] = useState('');
    const [productValue, setProductValue] = useState('');
    //
    const [numberValue, setNumberValue] = useState(1);
    const [imageValue, setImageValue] = useState('');
    const [checkAddOfCart, setCheckAddOfCart] = useState(false);
    //console.log(numberValue);

    //const numberProduct = useSelector((state) => state.numberProduct.list);
    const dispatchNumberProduct = useDispatch();

    // if (localStorage.getItem('product') !== '') {
    //     console.log('local: ', JSON.parse(localStorage.getItem('product')));
    // }

    useEffect(() => {
        const pathId = window.location.pathname.toString();
        const resultId = pathId.slice(22);
        axios
            .get(`${process.env.REACT_APP_URL_NODEJS}/productdetail/detail/product?SP_id=${resultId}`)
            .then((res) => {
                console.log(res.data);
                setProduct(res.data.results[0]);
                setEvaluation(res.data.evaluation);
                setEvaluationNum(res.data.evaluationNum);
                setEvaluationStar(res.data.evaluationStar);
            })
            .catch((error) => {
                console.log('loi');
            });
    }, []);

    useEffect(() => {
        if (product !== '') {
            axios
                .get(`${process.env.REACT_APP_URL_NODEJS}/productdetail/product/show/all?NB_id=${product.NB_id}`)
                .then((res) => {
                    console.log(res.data.results);
                    setProductValue(res.data.results);
                })
                .catch((error) => {
                    console.log('loi');
                });
        }
    }, [product]);

    function formatCash(str) {
        return str
            .toString()
            .split('')
            .reverse()
            .reduce((prev, next, index) => {
                return (index % 3 ? next : next + '.') + prev;
            });
    }

    const center = cx('center-slider');

    var settings = {
        className: center,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
    };

    const handlePlusNumber = () => {
        if (numberValue < product.SP_soluong - product.SP_soluongban) {
            setNumberValue(numberValue + 1);
        }
    };

    const handleMinusNumber = () => {
        if (numberValue > 1) {
            setNumberValue(numberValue - 1);
        }
    };

    const handleMouseOverImage = (index) => {
        const imageMain = document.getElementById('_3uzKon_2PWsS4-img');
        const image = document.getElementById(`X2N8Bt_2PWsS4-img-${index}`);

        setImageValue(imageMain.src);

        imageMain.src = image.src;
        //console.log(image.src);
    };

    const handleMouseOutImage = (index) => {
        const imageMain = document.getElementById('_3uzKon_2PWsS4-img');

        imageMain.src = imageValue;
    };

    const handleClickImage = (index) => {
        const imageMain = document.getElementById('_3uzKon_2PWsS4-img');
        const image = document.getElementById(`X2N8Bt_2PWsS4-img-${index}`);
        setImageValue(image.src);
        imageMain.src = image.src;
    };

    //mua hang
    function handleAddToCart() {
        setCheckAddOfCart(true);
        const pathId = window.location.pathname.toString();
        const resultId = pathId.slice(22);
        const cart = [{ id: resultId, soluong: numberValue }];
        const action = addNumberProduct(cart);
        dispatchNumberProduct(action);

        setTimeout(() => setCheckAddOfCart(false), 3000);
    }
    return (
        <div className={cx('wrapper')}>
            {checkAddOfCart && (
                <div className={cx('action-toast')}>
                    <div className={cx('toast')}>
                        <div className={cx('toast__container')}>
                            <div className={cx('toast__icon')}>
                                <div className={cx('action-toast__icon')}>
                                    <svg
                                        enable-background="new 0 0 12 12"
                                        viewBox="0 0 12 12"
                                        x="0"
                                        y="0"
                                        className={cx('icon-tick-bold')}
                                    >
                                        <g>
                                            <path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            <div className={cx('toast__text')}>Sản phẩm đã được thêm vào Giỏ hàng</div>
                        </div>
                    </div>
                </div>
            )}
            <div className={cx('product-briefing_2qM0Iy')}>
                <div className={cx('jexb7x')}>
                    <div className={cx('flex-column')}>
                        <div className={cx('_1KdnTb')}>
                            <div className={cx('_2fbO7Q')}>
                                <div className={cx('_1OPdfl')}>
                                    <div className={cx('_3uzKon_2PWsS4')}>
                                        <img
                                            id="_3uzKon_2PWsS4-img"
                                            className={cx('_3uzKon_2PWsS4-img')}
                                            src={product.SP_image}
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('xK9doz')}>
                            {product !== ''
                                ? product.image.map((image, index) => (
                                      <div key={index} className={cx('jgvTec')}>
                                          <div className={cx('k1LVKF')}>
                                              <div className={cx('_1OPdfl')}>
                                                  <div className={cx('X2N8Bt_2PWsS4')}>
                                                      <img
                                                          id={`X2N8Bt_2PWsS4-img-${index}`}
                                                          className={cx('X2N8Bt_2PWsS4-img')}
                                                          src={image.HA_image}
                                                          alt=""
                                                          onMouseOver={() => handleMouseOverImage(index)}
                                                          onMouseOut={() => handleMouseOutImage(index)}
                                                          onClick={() => handleClickImage(index)}
                                                      />
                                                  </div>
                                              </div>
                                              <div className=""></div>
                                          </div>
                                      </div>
                                  ))
                                : ''}
                        </div>
                    </div>
                </div>
                <div className={cx('flex-auto-eTjGTe')}>
                    <div className={cx('flex-auto-flex-column_1Kkkb')}>
                        <div className={cx('_2rQP1z')}>
                            <span>{product.SP_ten}</span>
                        </div>
                        <div className={cx('flex_3tkSsu')}>
                            <div className={cx('flex_3T9OoL')}>
                                <div className={cx('_3y5XOB_14izon')}>{evaluationStar || 0}</div>
                                <div className={cx('_1HyS82')}>
                                    <div className={cx('shopee-rating-stars')}>
                                        <div className={cx('shopee-rating-stars__stars')}>
                                            <div className={cx('shopee-rating-stars__star-wrapper')}>
                                                <div className={cx('shopee-rating-stars__lit')}>
                                                    <FontAwesomeIcon
                                                        className={cx(
                                                            evaluationStar === 5 ||
                                                                evaluationStar === 4 ||
                                                                evaluationStar === 3 ||
                                                                evaluationStar === 2 ||
                                                                evaluationStar === 1
                                                                ? 'shopee-svg-icon'
                                                                : '',
                                                        )}
                                                        icon={faStar}
                                                    />
                                                </div>
                                            </div>
                                            <div className={cx('shopee-rating-stars__star-wrapper')}>
                                                <div className={cx('shopee-rating-stars__lit')}>
                                                    <FontAwesomeIcon
                                                        className={cx(
                                                            evaluationStar === 5 ||
                                                                evaluationStar === 4 ||
                                                                evaluationStar === 3 ||
                                                                evaluationStar === 2
                                                                ? 'shopee-svg-icon'
                                                                : '',
                                                        )}
                                                        icon={faStar}
                                                    />
                                                </div>
                                            </div>
                                            <div className={cx('shopee-rating-stars__star-wrapper')}>
                                                <div className={cx('shopee-rating-stars__lit')}>
                                                    <FontAwesomeIcon
                                                        className={cx(
                                                            evaluationStar === 5 ||
                                                                evaluationStar === 4 ||
                                                                evaluationStar === 3
                                                                ? 'shopee-svg-icon'
                                                                : '',
                                                        )}
                                                        icon={faStar}
                                                    />
                                                </div>
                                            </div>
                                            <div className={cx('shopee-rating-stars__star-wrapper')}>
                                                <div className={cx('shopee-rating-stars__lit')}>
                                                    <FontAwesomeIcon
                                                        className={cx(
                                                            evaluationStar === 5 || evaluationStar === 4
                                                                ? 'shopee-svg-icon'
                                                                : '',
                                                        )}
                                                        icon={faStar}
                                                    />
                                                </div>
                                            </div>
                                            <div className={cx('shopee-rating-stars__star-wrapper')}>
                                                <div className={cx('shopee-rating-stars__lit')}>
                                                    <FontAwesomeIcon
                                                        className={cx(evaluationStar === 5 ? 'shopee-svg-icon' : '')}
                                                        icon={faStar}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('flex_3T9OoL')}>
                                <div className={cx('_3y5XOB')}>{evaluationNum || 0}</div>
                                <div className={cx('_1HyS82')}>đánh giá</div>
                            </div>
                            <div className={cx('flex_3EOMd6')}>
                                <div className={cx('HmRxgn')}>{product.SP_soluongban || 0}</div>
                                <div className={cx('qBnNRR')}>đã bán</div>
                            </div>
                        </div>
                        <div className={cx('flex-column-price')}>
                            <div className={cx('flex-column_38g6so')}>
                                <div className={cx('items-center-price')}>
                                    <div className={cx('items-center-price_34BHKe')}>
                                        <div className={cx('_2yjfFH')}>
                                            ₫{product !== '' && formatCash(product.SP_gia)}
                                        </div>
                                        <div className={cx('items-center-price')}>
                                            <div className={cx('_2Shl1j')}>
                                                ₫{formatCash(product.SP_gia * ((100 - product.SP_khuyenmai) / 100))}
                                            </div>
                                            <div className={cx('_3PlIlX')}>{product.SP_khuyenmai}% giảm</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('flex_VrhRS0_1RCFQu')}>
                            <div className={cx('flex-column-number')}>
                                <div className={cx('flex-column-number_283ldj')}>
                                    <div className={cx('_34CHXV')}>Số lượng</div>
                                    <div className={cx('flex-column-number')}>
                                        <div>
                                            <div className={cx('_1RTqoK-input-quantity')}>
                                                <button className={cx('_1MGNbJ')} onClick={handleMinusNumber}>
                                                    <FontAwesomeIcon icon={faMinus} />
                                                </button>
                                                <input
                                                    className={cx('_1MGNbJ_1eS5m1')}
                                                    type="text"
                                                    value={numberValue}
                                                    onChange={(e) => setNumberValue(e.target.value)}
                                                />
                                                <button className={cx('_1MGNbJ')} onClick={handlePlusNumber}>
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            {product !== '' && product.SP_soluong - product.SP_soluongban} sản phẩm có
                                            sẵn
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={cx('_3pcTIL')}>
                                <div className={cx('_37uIr4')}>
                                    <button className={cx('btn-tinted_3f7_YI_1TpzVc')} onClick={handleAddToCart}>
                                        <FontAwesomeIcon
                                            className={cx('shopee-svg-icon_1FtIAE-icon-add-to-cart')}
                                            icon={faCartPlus}
                                        />
                                        <span>Thêm vào giỏ hàng</span>
                                    </button>
                                    <button type="button" className={cx('btn-solid-primary_3f7_YI')}>
                                        Mua ngay
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={cx('_1YY3XU')}>
                            <a className={cx('_2O_CHG')} href="/haisanmekong?categoryId=100629&amp;itemId=10515661050">
                                <div className={cx('avatar_3q1-OA')}>
                                    <img
                                        className={cx('avatar__img')}
                                        alt=""
                                        src={
                                            product !== ''
                                                ? product.shop[0].MTS_image
                                                : process.env.REACT_APP_URL_NODEJS_IMAGE + '/default-ui-image.webp'
                                        }
                                    />
                                </div>
                            </a>
                            <div className={cx('zYQ1eS')}>
                                <div className={cx('_3LoNDM')}>
                                    {product !== '' ? product.shop[0].MTS_ten : 'Tên Cửa Hàng'}
                                </div>
                                <div className={cx('_2xDNx7')}>
                                    <a
                                        className={cx('btn-light--link_1CglVM')}
                                        href={product !== '' ? `/shop/name=${product.shop[0].MTS_ten}` : ''}
                                    >
                                        <svg
                                            enableBackground="new 0 0 15 15"
                                            viewBox="0 0 15 15"
                                            x="0"
                                            y="0"
                                            strokeWidth="0"
                                            className={cx('svg-icon_1rcInn')}
                                        >
                                            <path d="m13 1.9c-.2-.5-.8-1-1.4-1h-8.4c-.6.1-1.2.5-1.4 1l-1.4 4.3c0 .8.3 1.6.9 2.1v4.8c0 .6.5 1 1.1 1h10.2c.6 0 1.1-.5 1.1-1v-4.6c.6-.4.9-1.2.9-2.3zm-11.4 3.4 1-3c .1-.2.4-.4.6-.4h8.3c.3 0 .5.2.6.4l1 3zm .6 3.5h.4c.7 0 1.4-.3 1.8-.8.4.5.9.8 1.5.8.7 0 1.3-.5 1.5-.8.2.3.8.8 1.5.8.6 0 1.1-.3 1.5-.8.4.5 1.1.8 1.7.8h.4v3.9c0 .1 0 .2-.1.3s-.2.1-.3.1h-9.5c-.1 0-.2 0-.3-.1s-.1-.2-.1-.3zm8.8-1.7h-1v .1s0 .3-.2.6c-.2.1-.5.2-.9.2-.3 0-.6-.1-.8-.3-.2-.3-.2-.6-.2-.6v-.1h-1v .1s0 .3-.2.5c-.2.3-.5.4-.8.4-1 0-1-.8-1-.8h-1c0 .8-.7.8-1.3.8s-1.1-1-1.2-1.7h12.1c0 .2-.1.9-.5 1.4-.2.2-.5.3-.8.3-1.2 0-1.2-.8-1.2-.9z"></path>
                                        </svg>
                                        xem Cửa Hàng
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('page-product__content')}>
                <div className={cx('page-product__content--left')}>
                    <div className={cx('page-product__detail')}>
                        <div className={cx('_3ICPhk')}>
                            <div className={cx('_2N2_VN')}>MÔ TẢ SẢN PHẨM</div>
                            <div className={cx('_2jz573')}>
                                <div className={cx('_1MqcWX')}>
                                    <p className={cx('_2jrvqA')}>{product !== '' ? product.MTSP_noidung : ''}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={cx('product-ratings')}>
                            <div className={cx('product-ratings__header')}>ĐÁNH GIÁ SẢN PHẨM</div>
                            <div className={cx('product-ratings__list')}>
                                {evaluation !== '' ? <StarDetailPage data={evaluation} /> : ''}
                            </div>
                        </div>
                    </div>
                    <div className={cx('recommendation-by-carousel')}>
                        <div>
                            <div className={cx('detail-header-section_2Pk9pv--simple')}>
                                <div className={cx('detail-header-section__header')}>
                                    <div className={cx('detail-header-section__header__title')}>
                                        <div>Các sản phẩm khác của Shop</div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('image-carousel_DBnDYq')}>
                                <div className={cx('image-carousel__item-list-wrapper')}>
                                    <ul className={cx('image-carousel__item-list')}>
                                        <Slider {...settings}>
                                            {productValue !== ''
                                                ? productValue.map((prodvalue, index) => (
                                                      <li key={index} className={cx('image-carousel__item')}>
                                                          <div className={cx('product-recommend-items__item-wrapper')}>
                                                              <a
                                                                  data-sqe="link"
                                                                  href={`/detail/product/nameid${prodvalue.SP_id}`}
                                                              >
                                                                  <div className={cx('_3tGY4K')}>
                                                                      <div className={cx('_27gjnh')}>
                                                                          <div>
                                                                              <div className={cx('_1OPdfl_34Bbgp')}>
                                                                                  <img
                                                                                      width="invalid-value"
                                                                                      height="invalid-value"
                                                                                      alt="Khô cá lóc Đồng Tháp đủ 3 nắng tự nhiên, ít mặn, dai thơm  ,đảm bảo vệ sinh Không dử dụng chất bảo quản"
                                                                                      className={cx('_3DRMhT_2PWsS4')}
                                                                                      src={prodvalue.SP_image || ''}
                                                                                  />

                                                                                  <div className={cx('_23y7qS')}>
                                                                                      <div
                                                                                          className={cx(
                                                                                              'VPfNgf_3Vf-cm_pKWQzh',
                                                                                          )}
                                                                                      >
                                                                                          <span
                                                                                              className={cx('percent')}
                                                                                          >
                                                                                              {prodvalue.SP_khuyenmai}%
                                                                                          </span>
                                                                                          <span
                                                                                              className={cx('_1dKOej')}
                                                                                          >
                                                                                              giảm
                                                                                          </span>
                                                                                      </div>
                                                                                  </div>
                                                                              </div>
                                                                          </div>
                                                                          <div className={cx('weFbbG')}>
                                                                              <div className={cx('_3Xp1Jg')}>
                                                                                  <div className={cx('_17eONp')}>
                                                                                      <div
                                                                                          className={cx(
                                                                                              '_3KpaoK_2UGSVV',
                                                                                          )}
                                                                                      >
                                                                                          {prodvalue.SP_ten}
                                                                                      </div>
                                                                                  </div>
                                                                              </div>
                                                                              <div className={cx('vMfGQW_2NzYpj')}>
                                                                                  <div className={cx('_3NkBUm_rMbdeO')}>
                                                                                      <span className={cx('_181cfk')}>
                                                                                          ₫
                                                                                      </span>
                                                                                      <span className={cx('_2igTXp')}>
                                                                                          {formatCash(
                                                                                              prodvalue.SP_gia *
                                                                                                  ((100 -
                                                                                                      prodvalue.SP_khuyenmai) /
                                                                                                      100),
                                                                                          )}
                                                                                      </span>
                                                                                  </div>
                                                                                  <div className={cx('_2J8hZZ_2For-u')}>
                                                                                      Đã bán {prodvalue.SP_soluongban}
                                                                                  </div>
                                                                              </div>
                                                                          </div>
                                                                      </div>
                                                                  </div>
                                                              </a>
                                                          </div>
                                                      </li>
                                                  ))
                                                : ''}
                                        </Slider>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* / */}
                </div>
            </div>
        </div>
    );
}

export default Detail;
