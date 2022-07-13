import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem({ toLink, data, onClick }) {
    return (
        <>
            {toLink === false ? (
                <Link to={`search?q=${data.tensp}`} className={cx('wrapper')}>
                    <div className={cx('info')} onClick={onClick}>
                        <h4 className={cx('name')}>{data.tensp}</h4>
                    </div>
                </Link>
            ) : (
                <>
                    <Link to={`?q=${data.tensp}`} className={cx('wrapper')}>
                        <div className={cx('info')} onClick={onClick}>
                            <h4 className={cx('name')}>{data.tensp}</h4>
                        </div>
                    </Link>
                </>
            )}
        </>
    );
}

export default AccountItem;
