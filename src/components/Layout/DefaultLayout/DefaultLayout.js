import classNames from 'classnames/bind';
import Header from '~/components/Layout/components/Header';
import styles from './DefaultLayout.module.scss';
import Sidebar from '../components/Sidebar';
import Navbar from '~/components/Layout/components/HeaderNav';
import Footer from '~/components/Layout/components/Footer';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            {/* <Navbar /> */}
            {/* <div className={cx('container')}>
                <div className={cx('content')}>
                    <Sidebar />
                    {children}
                </div>
            </div> */}
            <div className={cx('container1')}>
                <Sidebar />

                <div className={cx('content')}>{children}</div>
            </div>
            <div className={cx('footer')}>
                <Footer />
            </div>
        </div>
    );
}
export default DefaultLayout;
