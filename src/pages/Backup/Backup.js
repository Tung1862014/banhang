import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import styles from './Backup.module.scss';
//import { saveAs } from 'file-saver';
import { useCallback } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
var XLSX = require('xlsx');

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

const headers = [
    'NGUOIDUNG',
    'PRODUCT',
    'HINHANH',
    'KHUYENMAI',
    'MOTASHOP',
    'GIOHANG',
    'DONHANG',
    'THONGTINDONHANG',
    'KHACHHANG',
    'DIACHIGIAOHANG',
    'CHUGIANGHANG',
    'ADMIN',
    'QUANGBA',
    'LINK',
];

var wscols = [
    { wch: 15 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
    { wch: 15 },
    { wch: 15 },
];

function Backup() {
    const [users, setUsers] = useState('');
    const [products, setProducts] = useState('');
    const [images, setImages] = useState('');
    const [promotions, setPromotions] = useState('');
    const [shops, setShops] = useState('');
    const [carts, setCarts] = useState('');
    const [orders, setOrders] = useState('');
    const [infoorders, setInfoorders] = useState('');
    const [customers, setCustomers] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [sellers, setSellers] = useState('');
    const [advertises, setAdvertises] = useState('');
    const [links, setLinks] = useState('');

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_URL_NODEJS}/admin/backup/show/user`)
            .then((res) => {
                console.log('data  :', res.data);
                setUsers(res.data.users);
                setProducts(res.data.products);
                setImages(res.data.images);
                setPromotions(res.data.promotions);
                setShops(res.data.shops);
                setCarts(res.data.carts);
                setOrders(res.data.orders);
                setInfoorders(res.data.infoorders);
                setCustomers(res.data.customers);
                setDeliveryAddress(res.data.delivery);
                setSellers(res.data.sellers);
                setAdvertises(res.data.advertises);
                setLinks(res.data.links);
            })
            .catch((err) => {
                console.log('error :');
            });
    }, []);

    const xport = useCallback(async () => {
        /* This function creates gap rows */
        function create_gap_rows(ws, nrows) {
            var ref = XLSX.utils.decode_range(ws['!ref']); // get original range
            ref.e.r += nrows; // add to ending row
            ws['!ref'] = XLSX.utils.encode_range(ref); // reassign row
        }

        /* first table */
        const ws = XLSX.utils.aoa_to_sheet([[headers[0]]]);
        ws['!cols'] = wscols;
        create_gap_rows(ws, 1);
        XLSX.utils.sheet_add_dom(ws, document.getElementById('table1'), { origin: -1 });
        create_gap_rows(ws, 3); // two row gap after first table

        /* second table */
        XLSX.utils.sheet_add_aoa(ws, [[headers[1]]], { origin: -1 });

        create_gap_rows(ws, 1);
        XLSX.utils.sheet_add_dom(ws, document.getElementById('table2'), { origin: -1 });
        create_gap_rows(ws, 3); // two rows gap after second table

        /* third table */
        XLSX.utils.sheet_add_aoa(ws, [[headers[2]]], { origin: -1 });

        create_gap_rows(ws, 1);
        XLSX.utils.sheet_add_dom(ws, document.getElementById('table3'), { origin: -1 });
        create_gap_rows(ws, 3); // two rows gap after second table

        /* four table */
        XLSX.utils.sheet_add_aoa(ws, [[headers[3]]], { origin: -1 });

        create_gap_rows(ws, 1);
        XLSX.utils.sheet_add_dom(ws, document.getElementById('table4'), { origin: -1 });
        create_gap_rows(ws, 3); // two rows gap after second table

        /* five table */
        XLSX.utils.sheet_add_aoa(ws, [[headers[4]]], { origin: -1 });

        create_gap_rows(ws, 1);
        XLSX.utils.sheet_add_dom(ws, document.getElementById('table5'), { origin: -1 });
        create_gap_rows(ws, 3); // two rows gap after second table

        /* six table */
        XLSX.utils.sheet_add_aoa(ws, [[headers[5]]], { origin: -1 });

        create_gap_rows(ws, 1);
        XLSX.utils.sheet_add_dom(ws, document.getElementById('table6'), { origin: -1 });
        create_gap_rows(ws, 3); // two rows gap after second table

        /* seven table */
        XLSX.utils.sheet_add_aoa(ws, [[headers[6]]], { origin: -1 });
        create_gap_rows(ws, 1);
        XLSX.utils.sheet_add_dom(ws, document.getElementById('table7'), { origin: -1 });
        create_gap_rows(ws, 3); // two rows gap after second table

        /* eight table */
        XLSX.utils.sheet_add_aoa(ws, [[headers[7]]], { origin: -1 });
        create_gap_rows(ws, 1);
        XLSX.utils.sheet_add_dom(ws, document.getElementById('table8'), { origin: -1 });
        create_gap_rows(ws, 3); // two rows gap after second table

        /* nine table */
        XLSX.utils.sheet_add_aoa(ws, [[headers[8]]], { origin: -1 });
        create_gap_rows(ws, 1);
        XLSX.utils.sheet_add_dom(ws, document.getElementById('table9'), { origin: -1 });
        create_gap_rows(ws, 3); // two rows gap after second table

        /* ten table */
        XLSX.utils.sheet_add_aoa(ws, [[headers[9]]], { origin: -1 });
        create_gap_rows(ws, 1);
        XLSX.utils.sheet_add_dom(ws, document.getElementById('table10'), { origin: -1 });
        create_gap_rows(ws, 3); // two rows gap after second table

        /* eleven table */
        XLSX.utils.sheet_add_aoa(ws, [[headers[10]]], { origin: -1 });
        create_gap_rows(ws, 1);
        XLSX.utils.sheet_add_dom(ws, document.getElementById('table11'), { origin: -1 });
        create_gap_rows(ws, 3); // two rows gap after second table

        /* twelve table */
        XLSX.utils.sheet_add_aoa(ws, [[headers[11]]], { origin: -1 });
        create_gap_rows(ws, 1);
        XLSX.utils.sheet_add_dom(ws, document.getElementById('table12'), { origin: -1 });
        create_gap_rows(ws, 3); // two rows gap after second table

        /* thirteen table */
        XLSX.utils.sheet_add_aoa(ws, [[headers[12]]], { origin: -1 });
        create_gap_rows(ws, 1);
        XLSX.utils.sheet_add_dom(ws, document.getElementById('table13'), { origin: -1 });
        create_gap_rows(ws, 3); // two rows gap after second table

        /* fourteen table */
        XLSX.utils.sheet_add_aoa(ws, [[headers[13]]], { origin: -1 });
        create_gap_rows(ws, 1);
        XLSX.utils.sheet_add_dom(ws, document.getElementById('table14'), { origin: -1 });
        create_gap_rows(ws, 3); // two rows gap after second table

        /* create workbook and export */
        const wb = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(wb, ws, 'Export');
        XLSX.writeFile(wb, 'SheetJSMultiTablexport.xlsx');
    }, []);
    return (
        // <div className={cx('wrapper')}>
        //     <button id="btn" onClick={handleSaveAS}>
        //         {' '}
        //         Save Test
        //     </button>
        // </div>
        <>
            <button className={cx('button-82-pushable')} onClick={xport}>
                Xuất file EXcel <FontAwesomeIcon icon={faFileExcel} />
            </button>

            <table className={cx('table1')} id="table1">
                <tr>
                    <td>ND_id</td>
                    <td>ND_hoten</td>
                    <td>ND_username</td>
                    <td>ND_image</td>
                    <td>ND_email</td>
                    <td>ND_diachi</td>
                    <td>ND_ngayDK</td>
                    <td>ND_sdt</td>
                    <td>ND_quyen</td>
                    <td>ND_trangthai</td>
                    <td>ND_ghichu</td>
                </tr>
                {users !== '' && users !== undefined
                    ? users.map((user, index) => (
                          <tr key={index}>
                              <td>{user.ND_id}</td>
                              <td>{user.ND_hoten}</td>
                              <td>{user.ND_username}</td>
                              <td>{user.ND_image}</td>
                              <td>{user.ND_email}</td>
                              <td>{user.ND_diachi}</td>
                              <td>{user.ND_ngayDK}</td>
                              <td>{user.ND_sdt}</td>
                              <td>{user.ND_quyen}</td>
                              <td>{user.ND_trangthai}</td>
                              <td>{user.ND_ghichu}</td>
                          </tr>
                      ))
                    : ''}
            </table>
            {/* table 2 */}
            <table className={cx('table1')} id="table2">
                <tr>
                    <td>SP_id</td>
                    <td>NB_id</td>
                    <td>SP_ten</td>
                    <td>SP_soluong</td>
                    <td>SP_soluongban</td>
                    <td>SP_gia</td>
                    <td>SP_image</td>
                    <td>SP_trongluong</td>
                    <td>SP_mota</td>
                    <td>SP_trangthai</td>
                    <td>DM_id</td>
                </tr>

                {products !== '' && products !== undefined
                    ? products.map((pro, index) => (
                          <tr key={index}>
                              <td>{pro.SP_id}</td>
                              <td>{pro.NB_id}</td>
                              <td>{pro.SP_ten}</td>
                              <td>{pro.SP_soluong}</td>
                              <td>{pro.SP_soluongban}</td>
                              <td>{pro.SP_gia}</td>
                              <td>{pro.SP_image}</td>
                              <td>{pro.SP_trongluong}</td>
                              <td>{pro.SP_mota}</td>
                              <td>{pro.SP_trangthai}</td>
                              <td>{pro.DM_id}</td>
                          </tr>
                      ))
                    : ''}
            </table>

            <table className={cx('table1')} id="table3">
                <tr>
                    <td>HA_id</td>
                    <td>SP_id</td>
                    <td>HA_image</td>
                </tr>
                {images !== '' && images !== undefined
                    ? images.map((img, index) => (
                          <tr key={index}>
                              <td>{img.HA_id}</td>
                              <td>{img.SP_id}</td>
                              <td>{img.HA_image}</td>
                          </tr>
                      ))
                    : ''}
            </table>

            <table className={cx('table1')} id="table4">
                <tr>
                    <td>KM_id</td>
                    <td>SP_id</td>
                    <td>KM_tungay</td>
                    <td>KM_denngay</td>
                    <td>KM_phantram</td>
                </tr>

                {promotions !== '' && promotions !== undefined
                    ? promotions.map((promo, index) => (
                          <tr key={index}>
                              <td>{promo.KM_id}</td>
                              <td>{promo.SP_id}</td>
                              <td>{promo.KM_tungay}</td>
                              <td>{promo.KM_denngay}</td>
                              <td>{promo.KM_phantram}</td>
                          </tr>
                      ))
                    : ''}
            </table>
            {/* table 5 */}
            <table className={cx('table1')} id="table5">
                <tr>
                    <td>MTS_id</td>
                    <td>NB_id</td>
                    <td>MTS_logo</td>
                    <td>MTS_ten</td>
                    <td>MTS_image</td>
                    <td>MTS_diachi</td>
                    <td>MTS_chitiet</td>
                    <td>MTS_clientId</td>
                </tr>

                {shops !== '' && shops !== undefined
                    ? shops.map((shop, index) => (
                          <tr key={index}>
                              <td>{shop.MTS_id}</td>
                              <td>{shop.NB_id}</td>
                              <td>{shop.MTS_logo}</td>
                              <td>{shop.MTS_ten}</td>
                              <td>{shop.MTS_image}</td>
                              <td>{shop.MTS_diachi}</td>
                              <td>{shop.MTS_chitiet}</td>
                              <td>{shop.MTS_clientId}</td>
                          </tr>
                      ))
                    : ''}
            </table>

            {/* table 6 */}
            <table className={cx('table1')} id="table6">
                <tr>
                    <td>SP_id</td>
                    <td>ND_id</td>
                    <td>TTGH_soluong</td>
                </tr>
                {carts !== undefined && carts !== ''
                    ? carts.map((cart, index) => (
                          <tr key={index}>
                              <td>{cart.SP_id}</td>
                              <td>{cart.ND_id}</td>
                              <td>{cart.TTGH_soluong}</td>
                          </tr>
                      ))
                    : ''}
            </table>

            {/* table 7 */}
            <table className={cx('table1')} id="table7">
                <tr>
                    <td>DH_id</td>
                    <td>ND_id</td>
                    <td>NB_id</td>
                    <td>DH_tongtien</td>
                    <td>DH_trangthai</td>
                    <td>DH_loaithanhtoan</td>
                    <td>DH_diachi</td>
                    <td>DH_phivanchuyen</td>
                    <td>DH_ngay</td>
                    <td>DH_trangthaiTT</td>
                    <td>DH_ghichu</td>
                    <td>DH_ghichuhuy</td>
                </tr>
                {orders !== undefined && orders !== ''
                    ? orders.map((order, index) => (
                          <tr key={index}>
                              <td>{order.DH_id}</td>
                              <td>{order.ND_id}</td>
                              <td>{order.NB_id}</td>
                              <td>{order.DH_tongtien}</td>
                              <td>{order.DH_trangthai}</td>
                              <td>{order.DH_loaithanhtoan}</td>
                              <td>{order.DH_diachi}</td>
                              <td>{order.DH_phivanchuyen}</td>
                              <td>{order.DH_ngay}</td>
                              <td>{order.DH_ghichu}</td>
                              <td>{order.DH_ghichuhuy}</td>
                          </tr>
                      ))
                    : ''}
            </table>

            {/* table 8 */}
            <table className={cx('table1')} id="table8">
                <tr>
                    <td>TTDH_id</td>
                    <td>SP_id</td>
                    <td>DH_id</td>
                    <td>TTDH_soluong</td>
                    <td>TTDH_gia</td>
                    <td>TTDH_phantram</td>
                </tr>
                {infoorders !== undefined && infoorders !== ''
                    ? infoorders.map((info, index) => (
                          <tr key={index}>
                              <td>{info.TTDH_id}</td>
                              <td>{info.SP_id}</td>
                              <td>{info.DH_id}</td>
                              <td>{info.TTDH_soluong}</td>
                              <td>{info.TTDH_gia}</td>
                              <td>{info.TTDH_phantram}</td>
                          </tr>
                      ))
                    : ''}
            </table>

            {/* table 9 */}
            <table className={cx('table1')} id="table9">
                <tr>
                    <td>ND_id</td>
                    <td>ND_NG_id</td>
                </tr>
                {customers !== '' && customers !== undefined
                    ? customers.map((customer, index) => (
                          <tr key={index}>
                              <td>{customer.ND_id}</td>
                              <td>{customer.ND_NG_id}</td>
                          </tr>
                      ))
                    : ''}
            </table>

            {/* table 10 */}
            <table className={cx('table1')} id="table10">
                <tr>
                    <td>DC_id</td>
                    <td>ND_id</td>
                    <td>DC_diachiGH</td>
                    <td>DC_chitiet</td>
                </tr>
                {deliveryAddress !== '' && deliveryAddress !== undefined
                    ? deliveryAddress.map((deliveryaddress, index) => (
                          <tr key={index}>
                              <td>{deliveryaddress.DC_id}</td>
                              <td>{deliveryaddress.ND_id}</td>
                              <td>{deliveryaddress.DC_diachiGH}</td>
                              <td>{deliveryaddress.DC_chitiet}</td>
                          </tr>
                      ))
                    : ''}
            </table>

            {/* table 11 */}
            <table className={cx('table1')} id="table11">
                <tr>
                    <td>NB_id</td>
                    <td>ND_id</td>
                </tr>
                {sellers !== '' && sellers !== undefined
                    ? sellers.map((seller, index) => (
                          <tr key={index}>
                              <td>{seller.NB_id}</td>
                              <td>{seller.ND_id}</td>
                          </tr>
                      ))
                    : ''}
            </table>

            {/* table 12 */}
            <table className={cx('table1')} id="table12">
                <tr>
                    <td>AD_id</td>
                    <td>ND_id</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>1</td>
                </tr>
            </table>

            {/* table 13 */}
            <table className={cx('table1')} id="table13">
                <tr>
                    <td>QB_id</td>
                    <td>QB_tieude</td>
                    <td>QB_mota</td>
                    <td>QB_image</td>
                </tr>
                {advertises !== undefined && advertises !== ''
                    ? advertises.map((advert, index) => (
                          <tr key={index}>
                              <td>{advert.QB_id}</td>
                              <td>{advert.QB_tieude}</td>
                              <td>{advert.QB_mota}</td>
                              <td>{advert.QB_image}</td>
                          </tr>
                      ))
                    : ''}
            </table>

            {/* table 14 */}
            <table className={cx('table1')} id="table14">
                <tr>
                    <td>LI_id</td>
                    <td>QB_id</td>
                    <td>LI_tieude</td>
                    <td>LI_link</td>
                </tr>
                {links !== undefined && links !== ''
                    ? links.map((link, index) => (
                          <tr key={index}>
                              <td>{link.LI_id}</td>
                              <td>{link.QB_id}</td>
                              <td>{link.LI_tieude}</td>
                              <td>{link.LI_link}</td>
                          </tr>
                      ))
                    : ''}
            </table>
        </>
    );
}

export default Backup;
