import classNames from 'classnames/bind';
//import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import styles from './Backup.module.scss';
//import { saveAs } from 'file-saver';
//import { useCallback } from 'react';
//import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
//var XLSX = require('xlsx');

// const data = [
//     { id: 1, name: 'ca loc 1', price: '120000', weight: '1000' },
//     { id: 2, name: 'ca loc 2', price: '130000', weight: '1500' },
//     { id: 3, name: 'ca loc 3', price: '140000', weight: '2000' },
//     { id: 4, name: 'ca loc 4', price: '150000', weight: '3000' },
// ];

// const handleSaveAS = () => {
//     // var result = ['Item 1', 'Item 3'];
//     // const myJsonString = JSON.stringify(result);
//     // var blob = new Blob([myJsonString], { type: 'text/plain;charset=utf-8' });
//     // saveAs.saveAs(blob, 'backup.xlsx');

//     console.log('data', data);
//     var XLSX = require('xlsx');
//     let wb = XLSX.utils.book_new(),
//         ws = XLSX.utils.json_to_sheet(data);

//     XLSX.utils.book_append_sheet(wb, ws, 'MySheet1');

//     XLSX.writeFile(wb, 'MyExcel.xlsx');
// };

// const headers = [
//     'NGUOIDUNG',
//     'PRODUCT',
//     'HINHANH',
//     'KHUYENMAI',
//     'MOTASHOP',
//     'GIOHANG',
//     'DONHANG',
//     'THONGTINDONHANG',
//     'KHACHHANG',
//     'DIACHIGIAOHANG',
//     'CHUGIANGHANG',
//     'ADMIN',
//     'QUANGBA',
//     'LINK',
// ];

// var wscols = [
//     { wch: 15 },
//     { wch: 20 },
//     { wch: 20 },
//     { wch: 20 },
//     { wch: 20 },
//     { wch: 20 },
//     { wch: 20 },
//     { wch: 20 },
//     { wch: 20 },
//     { wch: 15 },
//     { wch: 15 },
// ];

function Backup() {
    //     const [users, setUsers] = useState('');
    //     const [products, setProducts] = useState('');
    //     const [images, setImages] = useState('');
    //     const [promotions, setPromotions] = useState('');
    //     const [shops, setShops] = useState('');
    //     const [carts, setCarts] = useState('');
    //     const [orders, setOrders] = useState('');
    //     const [infoorders, setInfoorders] = useState('');
    //     const [customers, setCustomers] = useState('');
    //     const [deliveryAddress, setDeliveryAddress] = useState('');
    //     const [sellers, setSellers] = useState('');
    //     const [advertises, setAdvertises] = useState('');
    //     const [links, setLinks] = useState('');

    //     useEffect(() => {
    //         axios
    //             .get(`${process.env.REACT_APP_URL_NODEJS}/admin/backup/show/user`)
    //             .then((res) => {})
    //             .catch((err) => {
    //                 console.log('error :');
    //             });
    //     }, []);

    // const xport = useCallback(async () => {
    //     /* This function creates gap rows */
    //     function create_gap_rows(ws, nrows) {
    //         var ref = XLSX.utils.decode_range(ws['!ref']); // get original range
    //         ref.e.r += nrows; // add to ending row
    //         ws['!ref'] = XLSX.utils.encode_range(ref); // reassign row
    //     }

    //     /* first table */
    //     const ws = XLSX.utils.aoa_to_sheet([[headers[0]]]);
    //     ws['!cols'] = wscols;
    //     create_gap_rows(ws, 1);
    //     XLSX.utils.sheet_add_dom(ws, document.getElementById('table1'), { origin: -1 });
    //     create_gap_rows(ws, 3); // two row gap after first table

    //     /* second table */
    //     XLSX.utils.sheet_add_aoa(ws, [[headers[1]]], { origin: -1 });

    //     create_gap_rows(ws, 1);
    //     XLSX.utils.sheet_add_dom(ws, document.getElementById('table2'), { origin: -1 });
    //     create_gap_rows(ws, 3); // two rows gap after second table

    //     /* third table */
    //     XLSX.utils.sheet_add_aoa(ws, [[headers[2]]], { origin: -1 });

    //     create_gap_rows(ws, 1);
    //     XLSX.utils.sheet_add_dom(ws, document.getElementById('table3'), { origin: -1 });
    //     create_gap_rows(ws, 3); // two rows gap after second table

    //     /* four table */
    //     XLSX.utils.sheet_add_aoa(ws, [[headers[3]]], { origin: -1 });

    //     create_gap_rows(ws, 1);
    //     XLSX.utils.sheet_add_dom(ws, document.getElementById('table4'), { origin: -1 });
    //     create_gap_rows(ws, 3); // two rows gap after second table

    //     /* five table */
    //     XLSX.utils.sheet_add_aoa(ws, [[headers[4]]], { origin: -1 });

    //     create_gap_rows(ws, 1);
    //     XLSX.utils.sheet_add_dom(ws, document.getElementById('table5'), { origin: -1 });
    //     create_gap_rows(ws, 3); // two rows gap after second table

    //     /* six table */
    //     XLSX.utils.sheet_add_aoa(ws, [[headers[5]]], { origin: -1 });

    //     create_gap_rows(ws, 1);
    //     XLSX.utils.sheet_add_dom(ws, document.getElementById('table6'), { origin: -1 });
    //     create_gap_rows(ws, 3); // two rows gap after second table

    //     /* seven table */
    //     XLSX.utils.sheet_add_aoa(ws, [[headers[6]]], { origin: -1 });
    //     create_gap_rows(ws, 1);
    //     XLSX.utils.sheet_add_dom(ws, document.getElementById('table7'), { origin: -1 });
    //     create_gap_rows(ws, 3); // two rows gap after second table

    //     /* eight table */
    //     XLSX.utils.sheet_add_aoa(ws, [[headers[7]]], { origin: -1 });
    //     create_gap_rows(ws, 1);
    //     XLSX.utils.sheet_add_dom(ws, document.getElementById('table8'), { origin: -1 });
    //     create_gap_rows(ws, 3); // two rows gap after second table

    //     /* nine table */
    //     XLSX.utils.sheet_add_aoa(ws, [[headers[8]]], { origin: -1 });
    //     create_gap_rows(ws, 1);
    //     XLSX.utils.sheet_add_dom(ws, document.getElementById('table9'), { origin: -1 });
    //     create_gap_rows(ws, 3); // two rows gap after second table

    //     /* ten table */
    //     XLSX.utils.sheet_add_aoa(ws, [[headers[9]]], { origin: -1 });
    //     create_gap_rows(ws, 1);
    //     XLSX.utils.sheet_add_dom(ws, document.getElementById('table10'), { origin: -1 });
    //     create_gap_rows(ws, 3); // two rows gap after second table

    //     /* eleven table */
    //     XLSX.utils.sheet_add_aoa(ws, [[headers[10]]], { origin: -1 });
    //     create_gap_rows(ws, 1);
    //     XLSX.utils.sheet_add_dom(ws, document.getElementById('table11'), { origin: -1 });
    //     create_gap_rows(ws, 3); // two rows gap after second table

    //     /* twelve table */
    //     XLSX.utils.sheet_add_aoa(ws, [[headers[11]]], { origin: -1 });
    //     create_gap_rows(ws, 1);
    //     XLSX.utils.sheet_add_dom(ws, document.getElementById('table12'), { origin: -1 });
    //     create_gap_rows(ws, 3); // two rows gap after second table

    //     /* thirteen table */
    //     XLSX.utils.sheet_add_aoa(ws, [[headers[12]]], { origin: -1 });
    //     create_gap_rows(ws, 1);
    //     XLSX.utils.sheet_add_dom(ws, document.getElementById('table13'), { origin: -1 });
    //     create_gap_rows(ws, 3); // two rows gap after second table

    //     /* fourteen table */
    //     XLSX.utils.sheet_add_aoa(ws, [[headers[13]]], { origin: -1 });
    //     create_gap_rows(ws, 1);
    //     XLSX.utils.sheet_add_dom(ws, document.getElementById('table14'), { origin: -1 });
    //     create_gap_rows(ws, 3); // two rows gap after second table

    //     /* create workbook and export */
    //     const wb = XLSX.utils.book_new();

    //     XLSX.utils.book_append_sheet(wb, ws, 'Export');
    //     XLSX.writeFile(wb, 'SheetJSMultiTablexport.xlsx');
    // }, []);
    function handleOpen() {
        window.open(`${process.env.REACT_APP_URL_NODEJS}/dump.sql`);
    }
    return (
        <>
            <button className={cx('button-82-pushable')} onClick={handleOpen}>
                Sao Lưu Dữ Liệu <FontAwesomeIcon icon={faFileExcel} />
            </button>
        </>
    );
}

export default Backup;
