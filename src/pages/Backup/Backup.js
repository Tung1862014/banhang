import classNames from 'classnames/bind';
// import { Link } from 'react-router-dom';
import styles from './Backup.module.scss';
import { saveAs } from 'file-saver';

const cx = classNames.bind(styles);

const handleSaveAS = () => {
    var result = ['Item 1', 'Item 3'];
    const myJsonString = JSON.stringify(result);
    var blob = new Blob([myJsonString], { type: 'text/plain;charset=utf-8' });
    saveAs.saveAs(blob, 'backup.xlsx');
};

function Backup() {
    return (
        <div className={cx('wrapper')}>
            <button id="btn" onClick={handleSaveAS}>
                {' '}
                Save Test
            </button>
        </div>
    );
}

export default Backup;
