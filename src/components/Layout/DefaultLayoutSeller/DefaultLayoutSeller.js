import classNames from 'classnames/bind';
import HeaderSeller from '~/components/Layout/components/HeaderSeller';
import styles from './DefaultLayoutSeller.module.scss';
import SidebarSeller from '../components/SidebarSeller';
// import Navbar from '~/components/Layout/components/HeaderNav';
import Footer from '~/components/Layout/components/Footer';

const cx = classNames.bind(styles);

function DefaultLayoutSeller({ children }) {
    return (
        <div className={cx('wrapper')}>
            <HeaderSeller />
            <div className={cx('container1')}>
                <SidebarSeller />

                <div className={cx('content')}>{children}</div>
            </div>
            <div className={cx('footer')}>
                <Footer />
            </div>
        </div>
    );
}
export default DefaultLayoutSeller;
