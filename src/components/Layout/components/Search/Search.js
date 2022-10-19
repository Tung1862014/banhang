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
import { SearchIcon } from '~/components/Icons';
// import VoiceSearchBox from './VoiceSearchBox';
import SetCookie from '~/components/Hook/SetCookies';
import RemoveCookie from '~/components/Hook/RemoveCookies';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SearchProduct } from '~/actions/SearchProduct';
//import { useReactMediaRecorder } from 'react-media-recorder';

const cx = classNames.bind(styles);

// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// const mic = new SpeechRecognition();

// mic.continuous = true;
// mic.interimResults = true;
// mic.lang = 'vi';

function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);
    //const [isListening, setIsListening] = useState(false);
    //const [toLink, setToLink] = useState(false);
    const [check, setCheck] = useState(false);

    //const { startRecording, mediaBlobUrl } = useReactMediaRecorder({ audio: true });

    // useEffect(() => {
    //     if (isListening) {
    //         mic.start();
    //         mic.onend = () => {
    //             console.log('continue..');
    //             mic.start();
    //         };
    //     } else {
    //         mic.stop();
    //         mic.onend = () => {
    //             console.log('Stopped Mic on Click');
    //         };
    //     }
    //     mic.onstart = () => {
    //         console.log('Mics on');
    //     };

    //     mic.onresult = (event) => {
    //         const transcript = Array.from(event.results)
    //             .map((result) => result[0])
    //             .map((result) => result.transcript)
    //             .join('');
    //         console.log(transcript);

    //         setSearchValue(transcript);
    //         mic.onerror = (event) => {
    //             console.log(event.error);
    //         };
    //     };
    // }, [isListening]);
    const dispatchSignIn = useDispatch();

    const debounced = useDebounce(searchValue, 500);

    const inputRef = useRef();

    useEffect(() => {
        if (!debounced && !debounced) {
            setSearchResult([]);
            return;
        }

        setLoading(true);

        // setIsListening((prev) => {
        //     if (prev === true) {
        //         return !prev;
        //     } else {
        //         return prev;
        //     }
        // });

        if (!check) {
            setShowResult(true);
        }

        axios
            .get(`${process.env.REACT_APP_URL_NODEJS}/home?keyword=${debounced}`)
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
    }, [debounced, check]);

    const pathId = window.location.pathname.toString();
    const resultId = decodeURIComponent(pathId.slice(16));
    const searchValueReducer = useSelector((state) => state.searchProduct.list);
    useEffect(() => {
        const pathName = window.location.pathname;
        if (pathName.slice(0, 16) === '/search/keyword=') {
            setSearchValue(resultId);
        } else {
            setSearchValue('');
        }
    }, [resultId, searchValueReducer]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    // const handleImage = (e) => {

    // };

    const handleClickProduct = (e) => {
        RemoveCookie('detail');
        SetCookie('detail', JSON.stringify(e.idSP));
        setSearchValue(e.nameProduct);

        setCheck(true);
    };

    // const handleClearVoiceSearch = () => {
    //     setShowResult(true);
    //     setIsListening((prevState) => !prevState);
    // };

    const handleButtonSearch = () => {
        console.log('value: ' + JSON.stringify(searchValue));
        setShowResult(false);
        const action = SearchProduct(searchValue);
        dispatchSignIn(action);
        // RemoveCookie('search');
        // SetCookie('search', JSON.stringify(searchValue));
        // if (searchValue !== '') {
        //     window.open(`${process.env.REACT_APP_URL_FRONTEND}/search/keyword=${searchValue}`, '_self', 1);
        // }
    };

    return (
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Kết quả</h4>
                            {!check &&
                                searchResult.map((result, index) => (
                                    <AccountItem
                                        key={index}
                                        toLink={false}
                                        data={result}
                                        onClick={() => handleClickProduct(result)}
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
                        placeholder="Tìm kiếm ...."
                        multiple={'multiple'}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onFocus={() => {
                            setShowResult(true);
                            setCheck(false);
                            //setToLink(false);
                        }}
                    />

                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon className={cx('clearing')} icon={faCircleXmark} />
                        </button>
                    )}
                    {/* {isListening && (
                        <button
                            className={cx('voice')}
                            onClick={() => {
                                setIsListening(false);
                            }}
                        >
                            <VoiceActiveIcon />
                        </button>
                    )} */}
                    {/* {!isListening && (
                        <button
                            className={cx('voice')}
                            onClick={() => {
                                //startRecording();
                                setShowResult(false);
                                setIsListening(true);
                            }}
                        >
                            <VoiceIcon className={cx('voiceIcon')} />
                        </button>
                    )} */}
                    {/* <audio hidden src={mediaBlobUrl} controls autoPlay></audio> */}
                    {/* {isListening && (
                        <VoiceSearchBox textVoice={searchValue} clearVoiceSearch={handleClearVoiceSearch} />
                    )} */}

                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                    <Link
                        to={searchValue !== '' ? `/search/keyword=${searchValue}` : ''}
                        className={cx('search-btn')}
                        onClick={handleButtonSearch}
                    >
                        <SearchIcon className={cx('search-icon')} />
                    </Link>
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
