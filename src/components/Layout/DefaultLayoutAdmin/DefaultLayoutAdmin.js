import classNames from 'classnames/bind';
import HeaderAdmin from '~/components/Layout/components/HeaderAdmin';
import styles from './DefaultLayoutAdmin.module.scss';
import SidebarSeller from '../components/SidebarSeller';
// import Navbar from '~/components/Layout/components/HeaderNav';
//import Footer from '~/components/Layout/components/Footer';

const cx = classNames.bind(styles);

function DefaultLayoutAdmin({ children }) {
    return (
        <div className={cx('wrapper')}>
            <HeaderAdmin />
            <div className={cx('container1')}>
                <SidebarSeller />

                <div className={cx('content')}>{children}</div>
            </div>
            {/* <div className={cx('footer')}>
                <Footer />
            </div> */}
        </div>
    );
}
export default DefaultLayoutAdmin;
