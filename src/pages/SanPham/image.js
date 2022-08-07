import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import classNames from 'classnames/bind';
import styles from './sampham.module.scss';
import Detail from './detail';

const cx = classNames.bind(styles);

function Image(props) {
    const { data } = props;
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItemsProduct, setCurrentItemsProduct] = useState([]);
    const [pageCountProduct, setPageCountProduct] = useState(0);
    const [itemOffsetProduct, setItemOffsetProduct] = useState(0);
    const itemsPerPage = 4;
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, data]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
    };

    useEffect(() => {
        const endOffset = itemOffsetProduct + itemsPerPage;
        console.log(`Loading items from ${itemOffsetProduct} to ${endOffset}`);
        setCurrentItemsProduct(data.slice(itemOffsetProduct, endOffset));
        setPageCountProduct(Math.ceil(data.length / itemsPerPage));
    }, [itemOffsetProduct, itemsPerPage, data]);

    const handlePageClickProduct = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffsetProduct(newOffset);
    };

    return (
        <div className={cx('wapper')}>
            <div className={cx('info-product')}>
                <strong>
                    <h3>Danh Sách Nổi Bật</h3>
                </strong>
                <Detail currentItems={currentItems} />
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
            <div className={cx('info')}>
                <strong>
                    <h3>Xu hướng mua sắm</h3>
                </strong>
                <Detail currentItems={currentItemsProduct} />
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="Trang kế >"
                    onPageChange={handlePageClickProduct}
                    pageRangeDisplayed={1}
                    pageCount={pageCountProduct}
                    previousLabel="< Trang trước"
                    renderOnZeroPageCount={null}
                    containerClassName={cx('pagination')}
                    pageLinkClassName={cx('page-num')}
                    previousLinkClassName={cx('page-num-first')}
                    nextLinkClassName={cx('page-num-last')}
                    activeLinkClassName={cx('active')}
                />
            </div>
        </div>
    );
}

export default Image;
