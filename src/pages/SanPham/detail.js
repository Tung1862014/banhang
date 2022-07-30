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

    return (
        <div className={cx('images')}>
            {currentItems.map((image) => {
                return (
                    <div key={image.idSP} className={cx('card')}>
                        <Link to={`@${image.idSP}`} onClick={() => handleDetail(image.idSP)}>
                            <img
                                className={cx('card-img')}
                                src={`${process.env.REACT_APP_URL_NODEJS}/images/${image.image}`}
                                alt={image.nameProduct}
                            />
                        </Link>
                        <div className={cx('card-body')}>
                            <h5 className={cx('card-title')}>{image.nameProduct}</h5>
                            <p className={cx('card-text')}>{image.detail}</p>
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
