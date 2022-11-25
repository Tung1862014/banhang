import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './IntroduceAdvertise.module.scss';
import './IntroduceAdvertise.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function IntroduceAdvertise() {
    const [advertiseValue, setAdvertiseValue] = useState('');
    const [takeLink, setTakeLink] = useState('');

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

    useEffect(() => {
        // setCheckWeight(false);
        const pathId = window.location.pathname.toString();
        const resultId = pathId.slice(21);
        axios
            .get(`${process.env.REACT_APP_URL_NODEJS}/admin/show/link/advertise?QB_id=${resultId}`)
            .then((res) => {
                console.log('data', res.data.result);
                setTakeLink(res.data.result);
            })
            .catch((err) => {
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
                    <div className={cx('widget_recent_entries')}>
                        <h4 className={cx('mh-widget-title')}>
                            <span className={cx('mh-widget-title-inner')}>Bài viết liên quan</span>
                        </h4>
                        <ul className={cx('mh-widget-ul')}>
                            {takeLink !== ''
                                ? takeLink.map((takelink, index) => (
                                      <li key={index} className={cx('mh-widget-li')}>
                                          <a className={cx('mh-widget-a')} href={takelink.LI_link}>
                                              <FontAwesomeIcon className={cx('mh-widget_icon')} icon={faChevronRight} />
                                              <span>{takelink.LI_tieude}</span>
                                          </a>
                                      </li>
                                  ))
                                : ''}
                        </ul>
                    </div>
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
