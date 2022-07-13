import React, { useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './VoiceSearchBox.module.scss';
import { VoiceIcon } from '~/components/Icons';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);

const VoiceSearchBox = ({ textVoice, text = 'Xin mời nói...', clearVoiceSearch }) => {
    const voiceText = useDebounce(textVoice, 500);

    useEffect(() => {
        // const voices = window.speechSynthesis.speak.getVoices();
        // const speech = new SpeechSynthesisUtterance(voiceText);
        // speech.voice = voices[5];
        // speech.lang = 'vi-VI';
        // speech.volume = 1;
        // speech.rate = 0.9;
        // speech.pitch = 1;
        // console.log(speech);
        // window.speechSynthesis.speak(speech);
        // //window.speechSynthesis.speak(speech);
    }, [voiceText]);

    return (
        <div className={cx('voice-search')}>
            <div className={cx('modal-dialog')} role="document">
                <div className={cx('modal-content')}>
                    <div className={cx('modal-header')}>
                        <h5 className={cx('modal-title')}>Voice Search</h5>
                        <button type="button" className={cx('close')} onClick={clearVoiceSearch}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className={cx('modal-body')}>
                        <div className={cx('text-body')}>
                            <div className={cx('text-value')}>
                                <p className={cx('text')}>{textVoice || text}</p>
                                <p className={cx('speakingText')}></p>
                            </div>
                            <div className={cx('microphone')}>
                                <VoiceIcon />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoiceSearchBox;
