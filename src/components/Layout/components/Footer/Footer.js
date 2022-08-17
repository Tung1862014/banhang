import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('name-project')}>dgjhjhgj</div>

                <div className={cx('policy')}>dfgfdgfd</div>
            </div>
        </div>
    );
}

export default Footer;
