import classNames from 'classnames/bind';
// import { Link } from 'react-router-dom';
import styles from './Backup.module.scss';
import { saveAs } from 'file-saver';

const cx = classNames.bind(styles);

const handleSaveAS = () => {
    var blob = new Blob(['Hello, world!'], { type: 'text/plain;charset=utf-8' });
    saveAs.saveAs(blob, 'backup.doc');
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
