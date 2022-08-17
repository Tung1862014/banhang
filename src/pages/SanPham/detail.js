import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './sampham.module.scss';
import SetCookie from '~/components/Hook/SetCookies';
import RemoveCookie from '~/components/Hook/RemoveCookies';

const cx = classNames.bind(styles);

function Detail({ currentItems }) {
    const handleDetail = (id) => {
        RemoveCookie('detail');
        SetCookie('detail', JSON.stringify(id));
    };

    const rating = [`&#9733;`, '&#9733;', '&#9733;', '&#9733;', '&#9733;'];
    function formatCash(str) {
        return str
            .toString()
            .split('')
            .reverse()
            .reduce((prev, next, index) => {
                return (index % 3 ? next : next + '.') + prev;
            });
    }
    return (
        <div className={cx('images')}>
            {currentItems.map((image) => {
                return (
                    <div key={image.idSP} className={cx('card')}>
                        <div className={cx('item-label')}>
                            <span className={cx('lb-tragop')}>Trả góp 0%</span>
                        </div>
                        <Link to={`@${image.idSP}`} onClick={() => handleDetail(image.idSP)}>
                            <img
                                className={cx('card-img')}
                                src={`${process.env.REACT_APP_URL_NODEJS}/images/${image.image}`}
                                alt={image.nameProduct}
                            />
                        </Link>

                        <div className={cx('card-body')}>
                            <h3 className={cx('card-title')}>{image.nameProduct}</h3>
                            <strong className={cx('card-text')}>
                                <small className={cx('card-money')}>{formatCash(image.money)}₫ </small>
                                <small>-{image.promotion}%</small>
                            </strong>
                            <strong className={cx('card-text')}>
                                <small>{formatCash(image.money * ((100 - image.promotion) / 100))}₫ </small>
                            </strong>
                            <div className={cx('item-rating')}>
                                {rating.map((rating, i) => {
                                    if (i < 4) {
                                        return <p className={cx('rating-color')}>&#9733;</p>;
                                    } else {
                                        return <p>&#9733;</p>;
                                    }
                                })}
                            </div>
                        </div>
                        {/* <div key={image.id}>
                    <img className={cx('images-url')} src={image.url} alt={image.title} />
                </div> */}
                    </div>
                );
            })}
        </div>
    );
}

export default Detail;
