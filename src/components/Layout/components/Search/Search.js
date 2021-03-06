import classNames from 'classnames/bind';
import { useEffect, useState, useRef } from 'react';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useDebounce } from '~/hooks';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import styles from './Search.module.scss';
import { SearchIcon, VoiceActiveIcon, VoiceIcon } from '~/components/Icons';
import VoiceSearchBox from './VoiceSearchBox';
//import { useReactMediaRecorder } from 'react-media-recorder';

const cx = classNames.bind(styles);

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = 'vi';

function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [toLink, setToLink] = useState(false);

    //const { startRecording, mediaBlobUrl } = useReactMediaRecorder({ audio: true });

    useEffect(() => {
        if (isListening) {
            mic.start();
            mic.onend = () => {
                console.log('continue..');
                mic.start();
            };
        } else {
            mic.stop();
            mic.onend = () => {
                console.log('Stopped Mic on Click');
            };
        }
        mic.onstart = () => {
            console.log('Mics on');
        };

        mic.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map((result) => result[0])
                .map((result) => result.transcript)
                .join('');
            console.log(transcript);

            setSearchValue(transcript);
            mic.onerror = (event) => {
                console.log(event.error);
            };
        };
    }, [isListening]);

    const debounced = useDebounce(searchValue, 500);

    const inputRef = useRef();

    useEffect(() => {
        if (!debounced && !debounced) {
            setSearchResult([]);
            return;
        }

        setLoading(true);

        setIsListening((prev) => {
            if (prev === true) {
                return !prev;
            } else {
                return prev;
            }
        });
        setShowResult(true);

        axios
            .get(`http://localhost:5000/home?q=${debounced}`)
            .then((res) => {
                // handle success
                setSearchResult(res.data);
                console.log(res.data);
                setLoading(false);
            })
            .catch(() => {
                // handle error
                setLoading(false);
            });
    }, [debounced]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleImage = (e) => {
        setSearchValue(e.target.value);
    };

    const handleClickProduct = (e) => {
        setSearchValue(e);
        setToLink(true);
    };

    const handleClearVoiceSearch = () => {
        setShowResult(true);
        setIsListening((prevState) => !prevState);
    };

    return (
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>K???t qu???</h4>
                            {searchResult.map((result, index) => (
                                <AccountItem
                                    key={index}
                                    toLink={() => toLink}
                                    data={result}
                                    onClick={() => handleClickProduct(result.tensp)}
                                />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="T??m ki???m ...."
                        multiple={'multiple'}
                        onChange={(e) => handleImage(e)}
                        onFocus={() => setShowResult(true)}
                    />

                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {isListening && (
                        <button
                            className={cx('voice')}
                            onClick={() => {
                                setIsListening((prevState) => !prevState);
                            }}
                        >
                            <VoiceActiveIcon />
                        </button>
                    )}
                    {!isListening && (
                        <button
                            className={cx('voice')}
                            onClick={() => {
                                //startRecording();
                                setShowResult(false);
                                setIsListening((prevState) => !prevState);
                            }}
                        >
                            <VoiceIcon className={cx('voiceIcon')} />
                        </button>
                    )}
                    {/* <audio hidden src={mediaBlobUrl} controls autoPlay></audio> */}
                    {isListening && (
                        <VoiceSearchBox textVoice={searchValue} clearVoiceSearch={handleClearVoiceSearch} />
                    )}

                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                    <button className={cx('search-btn')}>
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;

// import React from 'react';
// import axios from 'axios';

// const Search = () => {
//     // a local state to store the currently selected file.
//     const [selectedFile, setSelectedFile] = React.useState({});

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const formData = new FormData();
//         console.log(selectedFile);
//         for (let i = 0; i < selectedFile.length; i++) {
//             formData.append('image', selectedFile[i]);
//         }

//         axios({
//             method: 'POST',
//             url: 'http://localhost:3001/product/insert',
//             data: formData,
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         })
//             .then((res) => {
//                 // handle success

//                 console.log(res.data);
//             })
//             .catch(() => {
//                 // handle error
//                 console.log('loi');
//             });
//     };

//     const handleFileSelect = (event) => {
//         setSelectedFile(event.target.files);
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input type="file" onChange={handleFileSelect} multiple />
//             <input type="submit" value="Upload File" />
//         </form>
//     );
// };

// export default Search;
