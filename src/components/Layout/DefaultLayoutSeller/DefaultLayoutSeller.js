import classNames from 'classnames/bind';
import Header from '~/components/Layout/components/Header';
import styles from './DefaultLayoutSeller.module.scss';
import SidebarSeller from '../components/SidebarSeller';
// import Navbar from '~/components/Layout/components/HeaderNav';
import Footer from '~/components/Layout/components/Footer';

const cx = classNames.bind(styles);

function DefaultLayoutSeller({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
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
