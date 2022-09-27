import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem({ toLink, data, onClick }) {
    return (
        <>
            {toLink === false ? (
                <a href={`${process.env.REACT_APP_URL_FRONTEND}/sanpham/@${data.idSP}`} className={cx('wrapper')}>
                    <div className={cx('info')} onClick={onClick}>
                        <h4 className={cx('name')}>{data.SP_ten}</h4>
                    </div>
                </a>
            ) : (
                <Link to={`sanpham/@${data.idSP}`} className={cx('wrapper')}>
                    <div className={cx('info')} onClick={onClick}>
                        <h4 className={cx('name')}>{data.SP_ten}</h4>
                    </div>
                </Link>
            )}
        </>
    );
}

export default AccountItem;
