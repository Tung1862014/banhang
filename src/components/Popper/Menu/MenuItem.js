import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import RemoveCookie from '~/components/Layout/components/Header/Hook/RemoveCookies';

const cx = classNames.bind(styles);

function MenuItem({ data, onClick }) {
    const classes = cx('menu-item', {
        separate: data.separate,
    });
    const logout = () => {
        RemoveCookie('logout');
        window.open('http://localhost:5000/auth/logout', '_self');
    };
    return (
        <>
            {data.onclick ? (
                <Button className={classes} leftIcon={data.icon} href={data.href} onClick={data.onclick}>
                    {data.title}
                </Button>
            ) : data.logoutuse ? (
                <button className={cx('menu-logout')} onClick={logout}>
                    <span className={cx('icon')}>{data.icon}</span>
                    <span className={cx('menu-title')}>Logout</span>
                </button>
            ) : (
                <Button className={classes} leftIcon={data.icon} to={data.to} onClick={onClick}>
                    {data.title}
                </Button>
            )}
        </>
    );
}

export default MenuItem;
