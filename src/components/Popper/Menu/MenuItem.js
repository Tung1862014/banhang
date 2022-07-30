import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import RemoveCookie from '~/components/Hook/RemoveCookies';
import SetCookie from '~/components/Hook/SetCookies';
const cx = classNames.bind(styles);

function MenuItem({ data, onClick }) {
    const classes = cx('menu-item', {
        separate: data.separate,
    });
    const logout = () => {
        RemoveCookie('logout');
        SetCookie('err', JSON.stringify('loi'));
        window.open(`${process.env.REACT_APP_URL_NODEJS}/auth/logout`, '_self');
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
