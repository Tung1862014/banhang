import classNames from 'classnames/bind';
import styles from './SellerPrintBill.module.scss';

const cx = classNames.bind(styles);

// const pathId = window.location.pathname.toString();
//         const resultId = pathId.slice(26);

function SellerPrintBill() {
    return (
        <div className={cx('wrapper')} onLoad={window.print()}>
            SellerPrintBill
        </div>
    );
}

export default SellerPrintBill;
