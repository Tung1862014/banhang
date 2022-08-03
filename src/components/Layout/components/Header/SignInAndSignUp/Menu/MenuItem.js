import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({
    className1,
    className2,
    className3,
    className4,
    className5,
    inputRef,
    title,
    name,
    type,
    accept,
    placeholder,
    onChange,
    onBlur,
    onFocus,
    hidden,
    multiple,
    value,
    valueImage,
    image,
    check,
    test1,
    test2,
    test3,
    titleError,
}) {
    return (
        <>
            <div className={cx(className1)}>
                <label htmlFor={name} className={cx(className2)}>
                    {title} <font color=" red"> *</font>
                </label>
                <input
                    ref={inputRef}
                    id={name}
                    name={name}
                    type={type}
                    accept={accept}
                    placeholder={placeholder}
                    className={cx(className3)}
                    onChange={onChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    hidden={hidden}
                    multiple={multiple}
                    value={value}
                />
                {name === 'choose-file' && !check && <div id={className5} className={cx(className5)}></div>}
                {name === 'email' && test1 && test2 && test3 && <span className={cx(className4)}>{titleError}</span>}
                {name !== 'email' && test1 && test2 && <span className={cx(className4)}>{titleError}</span>}
            </div>
            {name === 'choose-file' && check && <div id={className5} className={cx(className5)}></div>}
            {!valueImage && name === 'choose-file' && check && (
                <div className={cx('img-preview-setting')}>
                    <img src={image} alt="" className={cx('show-image')} />
                </div>
            )}
        </>
    );
}

export default MenuItem;
