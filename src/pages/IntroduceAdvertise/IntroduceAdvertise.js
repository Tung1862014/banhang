import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './IntroduceAdvertise.module.scss';
import './IntroduceAdvertise.css';

const cx = classNames.bind(styles);

function IntroduceAdvertise() {
    const [advertiseValue, setAdvertiseValue] = useState('');

    console.log('advertiseValue', advertiseValue);

    useEffect(() => {
        const pathId = window.location.pathname.toString();
        const result = pathId.slice(21);
        axios
            .get(`${process.env.REACT_APP_URL_NODEJS}/admin/show/all/advertise?QB_id=${result}`)
            .then((res) => {
                setAdvertiseValue(res.data.advertise[0]);
            })
            .catch(() => {
                console.log('loi');
            });
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('into-body')}>
                <div className={cx('title-container')}>
                    <h1> {advertiseValue !== '' ? advertiseValue.QB_tieude : ''}</h1>
                </div>
                <div className={cx('title-image')}>
                    <img
                        className={cx('title-image-img')}
                        src={advertiseValue !== '' ? advertiseValue.QB_image : ''}
                        alt=""
                        with="500"
                    />
                </div>
                <div className={cx('title-')}>
                    <CKEditor
                        editor={ClassicEditor}
                        data={`${advertiseValue !== '' ? advertiseValue.QB_mota : ''}`}
                        disabled
                        config={{
                            toolbar: [''],
                        }}
                        onChange={(event, editor) => {
                            // const data = editor.getData();
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default IntroduceAdvertise;
