import classNames from 'classnames/bind';

import styles from './AdvertiseLink.module.scss';

const cx = classNames.bind(styles);

function Detail({ takeLink }) {
    const handleTestColor = (color) => {
        if (color % 2 === 0) {
            return true;
        } else {
            return false;
        }
    };

    console.log('takeLink   :', takeLink);
    return (
        <table className={cx('table__header')}>
            <thead>
                <tr className={cx('table__header-tr')}>
                    <td className={cx('td_table-name')}>Tiêu đề</td>
                    <td className={cx('td_table-name_link')}>Link</td>
                </tr>

                {takeLink !== '' && takeLink !== undefined && takeLink.length > 0 ? (
                    takeLink.map((pro, index) => (
                        <tr
                            key={index}
                            className={cx(
                                handleTestColor(index) ? 'table__header-conten-color' : 'table__header-conten',
                            )}
                        >
                            <td className={cx('td_table-name')}>{pro.LI_tieude}</td>
                            <td className={cx('td_table-name_link')}>{pro.LI_link}</td>
                        </tr>
                    ))
                ) : (
                    <tr className={cx('td_table-name_no_link')}>
                        <td>Không có link nào.</td>
                    </tr>
                )}
            </thead>
        </table>
    );
}

export default Detail;
