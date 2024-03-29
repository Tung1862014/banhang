import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import classNames from 'classnames/bind';
import styles from './SellerCategory.module.scss';
import Detail from './Detail';

const cx = classNames.bind(styles);

function SellerCategoryPage(props) {
    const { data } = props;
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
        console.log('data user page', data.slice(itemOffset, endOffset));
    }, [itemOffset, itemsPerPage, data]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('info-product')}>
                <Detail product={currentItems} />
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="Trang kế >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={1}
                    pageCount={pageCount}
                    previousLabel="< Trang trước"
                    renderOnZeroPageCount={null}
                    containerClassName={cx('pagination')}
                    pageLinkClassName={cx('page-num')}
                    previousLinkClassName={cx('page-num-fisrt')}
                    nextLinkClassName={cx('page-num-last')}
                    activeLinkClassName={cx('active')}
                />
            </div>
        </div>
    );
}

export default SellerCategoryPage;
