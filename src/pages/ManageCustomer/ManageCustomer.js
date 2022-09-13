import classNames from 'classnames/bind';
import styles from './ManageCustomer.module.scss';

const cx = classNames.bind(styles);

function ManageCustomer() {
    return <div className={cx('wrapper')}>ManageCustomer</div>;
}

export default ManageCustomer;
