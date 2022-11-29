import classNames from 'classnames/bind';
import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import styles from './Backup.module.scss';
//import { saveAs } from 'file-saver';
import { useCallback } from 'react';

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
function Backup() {
    useEffect(() => {}, []);
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
        XLSX.utils.sheet_add_aoa(ws, [[headers[3]]], { origin: -1 });

        create_gap_rows(ws, 1);
        XLSX.utils.sheet_add_dom(ws, document.getElementById('table5'), { origin: -1 });
        create_gap_rows(ws, 3); // two rows gap after second table

        /* six table */
        XLSX.utils.sheet_add_aoa(ws, [[headers[3]]], { origin: -1 });

        create_gap_rows(ws, 1);
        XLSX.utils.sheet_add_dom(ws, document.getElementById('table6'), { origin: -1 });
        create_gap_rows(ws, 3); // two rows gap after second table

        /* seven table */
        XLSX.utils.sheet_add_aoa(ws, [[headers[3]]], { origin: -1 });
        create_gap_rows(ws, 1);
        XLSX.utils.sheet_add_dom(ws, document.getElementById('table7'), { origin: -1 });
        create_gap_rows(ws, 3); // two rows gap after second table

        /* eight table */
        XLSX.utils.sheet_add_aoa(ws, [[headers[3]]], { origin: -1 });
        create_gap_rows(ws, 1);
        XLSX.utils.sheet_add_dom(ws, document.getElementById('table8'), { origin: -1 });
        create_gap_rows(ws, 3); // two rows gap after second table

        /* nine table */
        XLSX.utils.sheet_add_aoa(ws, [[headers[3]]], { origin: -1 });
        create_gap_rows(ws, 1);
        XLSX.utils.sheet_add_dom(ws, document.getElementById('table9'), { origin: -1 });
        create_gap_rows(ws, 3); // two rows gap after second table

        /* ten table */
        XLSX.utils.sheet_add_aoa(ws, [[headers[3]]], { origin: -1 });
        create_gap_rows(ws, 1);
        XLSX.utils.sheet_add_dom(ws, document.getElementById('table10'), { origin: -1 });
        create_gap_rows(ws, 3); // two rows gap after second table

        /* eleven table */
        XLSX.utils.sheet_add_aoa(ws, [[headers[3]]], { origin: -1 });
        create_gap_rows(ws, 1);
        XLSX.utils.sheet_add_dom(ws, document.getElementById('table11'), { origin: -1 });
        create_gap_rows(ws, 3); // two rows gap after second table

        /* twelve table */
        XLSX.utils.sheet_add_aoa(ws, [[headers[3]]], { origin: -1 });
        create_gap_rows(ws, 1);
        XLSX.utils.sheet_add_dom(ws, document.getElementById('table12'), { origin: -1 });
        create_gap_rows(ws, 3); // two rows gap after second table

        /* thirteen table */
        XLSX.utils.sheet_add_aoa(ws, [[headers[3]]], { origin: -1 });
        create_gap_rows(ws, 1);
        XLSX.utils.sheet_add_dom(ws, document.getElementById('table13'), { origin: -1 });
        create_gap_rows(ws, 3); // two rows gap after second table

        /* fourteen table */
        XLSX.utils.sheet_add_aoa(ws, [[headers[3]]], { origin: -1 });
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
            <button onClick={xport}>
                <b>Export XLSX!</b>
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
                <tr>
                    <td>1</td>
                    <td>Thanh tung</td>
                    <td>thanh123</td>
                    <td>http://localhost:5000/customers/1665906167736-Admin.png</td>
                    <td>tunha1234@gmail.com</td>
                    <td>Can tho</td>
                    <td>2022-09-17</td>
                    <td>918814027</td>
                    <td>0</td>
                    <td>1</td>
                    <td></td>
                </tr>
            </table>

            <table className={cx('table1')} id="table2">
                <tr>
                    <td>SP_id</td>
                    <td>NB_id</td>
                    <td>SP_ten</td>
                    <td>SP_soluong</td>
                    <td>SP_soluonban</td>
                    <td>SP_gia</td>
                    <td>SP_image</td>
                    <td>SP_trongluong</td>
                    <td>SP_mota</td>
                    <td>SP_trangthai</td>
                    <td>DM_id</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>1kg Khô cá lóc loại lớn 2 nắng [Đặc sản An Giang]</td>
                    <td>16</td>
                    <td>16</td>
                    <td>190000</td>
                    <td>http://localhost:5000/product/1664955059541-c1bdc019c8ed46883f548360a7da5f0c.jfif</td>
                    <td>1000</td>
                    <td>
                        <p>
                            Khô cá lóc là một trong những loại đặc sản nổi tiếng thơm ngon, mạng đậm hương vị quê hương
                            của miền Tây nói chung và An Giang nói riêng. Khô được chế biến từ cá lóc sống, phơi thủ
                            công, ướp vị mặn vừa ăn.&nbsp;
                        </p>
                        <p>Sản phẩm thích hợp làm quà biếu, tiếp đãi khách hoặc dùng trong bữa cơm hằng ngày.</p>
                        <p>* Các món được chế biến từ khô cá lóc:&nbsp;</p>
                        <p>- Khô cá lóc trộn gỏi xoài</p>
                        <p>- Khô cá lóc chiên bơ tỏi&nbsp;</p>
                        <p>- Khô cá lóc chiên giấm đường&nbsp;</p>
                        <p>- Khô cá lóc nướng&nbsp;</p>
                        <p>
                            - Khô cá lóc chiên truyền thống Kết hợp chấm khô với nước mắm me, nước mắm tỏi ớt,…thêm chén
                            cơm trắng hít hà vị quê.
                        </p>
                    </td>
                    <td>0</td>
                    <td>1</td>
                </tr>
            </table>

            <table className={cx('table1')} id="table3">
                <tr>
                    <td>HA_id</td>
                    <td>SP_id</td>
                    <td>HA_image</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>1</td>
                    <td>http://localhost:5000/product/1664955059550-bc5c814e9587d312ccfa4488e81bfb93.jfif</td>
                </tr>
            </table>

            <table className={cx('table1')} id="table4">
                <tr>
                    <td>KM_id</td>
                    <td>SP_id</td>
                    <td>KM_tungay</td>
                    <td>KM_denngay</td>
                    <td>KM_phantram</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>1</td>
                    <td>2022-10-28</td>
                    <td>2022-11-06</td>
                    <td>10</td>
                </tr>
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
                <tr>
                    <td>119227</td>
                    <td>2</td>
                    <td>http://localhost:5000/shop/1668134741787-KhoChuBay.png</td>
                    <td>KhoChuBay</td>
                    <td>http://localhost:5000/shop/1668934066032-8e22b4c4237459be829b8f315a3efa44.jfif</td>
                    <td>Xã Long Kiến,Huyện Chợ Mới,An Giang</td>
                    <td>234. Ấp Long Thạnh 2</td>
                    <td>Ae9pDuj562DAY1aNt0PoQo2QKPqOaImPizoS8zwmvkEcjhUmtMUulchzjwnKVv5kxvnKGM-9VK2Xwom4</td>
                </tr>
            </table>

            {/* table 6 */}
            <table className={cx('table1')} id="table6">
                <tr>
                    <td>SP_id</td>
                    <td>ND_id</td>
                    <td>TTGH_soluong</td>
                </tr>
                <tr>
                    <td>64</td>
                    <td>7</td>
                    <td>1</td>
                </tr>
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
                <tr>
                    <td>DHSPMP0</td>
                    <td>7</td>
                    <td>6</td>
                    <td>140000</td>
                    <td>1</td>
                    <td>1</td>
                    <td>Hồ Chí Minh,Quận 10,Phường 13</td>
                    <td>40000</td>
                    <td>2022-11-08</td>
                    <td>Giao nhớ gợi trước 15 phút.</td>
                    <td></td>
                </tr>
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
                <tr>
                    <td>1</td>
                    <td>7</td>
                    <td>LLG799</td>
                    <td>2</td>
                    <td>100000</td>
                    <td>0</td>
                </tr>
            </table>

            {/* table 9 */}
            <table className={cx('table1')} id="table9">
                <tr>
                    <td>ND_id</td>
                    <td>ND_NG_id</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>7</td>
                </tr>
            </table>

            {/* table 10 */}
            <table className={cx('table1')} id="table10">
                <tr>
                    <td>DC_id</td>
                    <td>ND_id</td>
                    <td>DC_diachiGH</td>
                    <td>DC_chitiet</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>7</td>
                    <td>Hồ Chí Minh,Quận 11,Phường 14</td>
                    <td>123/234 hẻm 3456</td>
                </tr>
            </table>

            {/* table 11 */}
            <table className={cx('table1')} id="table11">
                <tr>
                    <td>NB_id</td>
                    <td>ND_id</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>2</td>
                </tr>
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
                <tr>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                </tr>
            </table>

            {/* table 14 */}
            <table className={cx('table1')} id="table14">
                <tr>
                    <td>LI_id</td>
                    <td>QB_id</td>
                    <td>LI_tieude</td>
                    <td>LI_link</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                </tr>
            </table>
        </>
    );
}

export default Backup;
