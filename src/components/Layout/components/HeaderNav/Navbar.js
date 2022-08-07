import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Navber.module.scss';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        title: 'Bánh ngọt',
    },
    {
        title: 'Bánh kem',
    },
    {
        title: 'Bánh kem',
    },
    {
        title: 'Bánh kem',
    },
    {
        title: 'Bánh kem',
    },
    {
        title: 'Bánh kem',
    },
    {
        title: 'Bánh kem',
    },
    {
        title: 'Bánh kem nnnnnnn',
    },
];

function Navbar() {
    const renderItems = (data) => {
        return data.map((item, index) => {
            return (
                <Link to="/" key={index} className={cx('menu-body')}>
                    {item.title}
                </Link>
            );
        });
    };
    return (
        <div className={cx('wapper')}>
            <div className={cx('inner')}>
                <div className={cx('home')}>
                    <Link to="/" className={cx('home')}>
                        Trang chủ
                    </Link>
                </div>
                <div className={cx('home')}>
                    <Link to="/" className={cx('home')}>
                        Giới thiệu
                    </Link>
                </div>

                <Tippy
                    interactive
                    delay={[0, 400]}
                    offset={[12, 8]}
                    placement="bottom"
                    render={(attrs) => (
                        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                            {/* PopperWrapper để Dựng khung menu  */}
                            <div className={cx('menu-popper')}>{renderItems(MENU_ITEMS)}</div>
                        </div>
                    )}
                    //onHide={() => setHistory((prev) => prev.slice(0, 1))}
                >
                    <div className={cx('product')}>
                        Sản phẩm <FontAwesomeIcon icon={faCaretDown} />
                    </div>
                </Tippy>
                <div className={cx('home')}>
                    <Link to="/" className={cx('home')}>
                        Tin Tức
                    </Link>
                </div>
                <div className={cx('home')}>
                    <Link to="/" className={cx('home')}>
                        Liện Hệ
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
