import classNames from 'classnames/bind';
import styles from './Introduce.module.scss';

const cx = classNames.bind(styles);

function Introduce() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('into-body')}>
                <div className={cx('title-container')}>
                    <h1> Nghề làm khô cá lóc ở An Giang</h1>
                </div>
                <div className={cx('title-body')}>
                    <h2>1. Giới Thiệu</h2>

                    <p>
                        Giữa tháng 10 âm lịch, là thời điểm nhộn nhịp nhất của nghề làm khô ở Chợ Mới, Thoại Sơn -An
                        Giang. Trước đây, chỉ có một vài hộ làm khô cá lóc bán lẻ ngay tại chợ, thì nay món đặc sản này
                        có mặt ở khắp nơi, kể cả trong siêu thị. Nghề làm khô cá lóc bây giờ có gần chục cơ sở lớn, nhỏ
                        giải quyết việc làm cho hàng trăm lao động ở địa phương. Những cơ sở này được tập hợp lại thành
                        tổ hợp tác để cùng xây dựng thương hiệu khô cá lóc An Giang. Gần tết là thời điểm nhộn nhịp nhất
                        của làng nghề để cung cấp hàng phục vụ cho thị trường.
                    </p>

                    <p>
                        “Vùng đất An Giang từ xưa đến nay con cá lóc rất nhiều, đặc biệt là trong mùa nước nổi. Những
                        lúc dội chợ, cá tươi ăn không hết nên nông dân xẻ khô trữ lại. Từ đó, nghề làm khô cá lóc cũng
                        ra đời. Tuy nhiên, thời gian gần đây, mới phát triển lên cơ sở và sản phẩm làm ra nhiều hơn
                        trước”. Sản phẩm khô cá lóc ở đây có hương vị đặc trưng rất riêng nhờ vào bàn tay khéo léo của
                        người phụ nữ. Bà Phạm Thị Mây cho biết thêm: “Để có miếng khô ngon, phải qua rất nhiều công đoạn
                        như: làm sạch, loại bỏ xương, ướp gia vị và đem phơi nắng. Trong đó, ướp gia vị rất quan trọng
                        để tạo ra hương vị riêng của từng cơ sở và đây cũng là bí quyết gia truyền…”. Hầu hết những sản
                        phẩm khô cá lóc ở An Giang đều được làm thủ công và phơi dưới ánh nắng mặt trời. Ngày nay, ngoài
                        khô lóc, nhiều khách hàng ở Sài Gòn, Đồng Nai, Bình Dương… đều thích ăn khô cá lóc phơi một
                        nắng. Bởi, cá khô phơi một nắng giữ được nhiều vị của cá tươi, thơm ngon mà lại dễ dàng vận
                        chuyển. Tuy nhiên, cách làm khô một nắng khó hơn, vì phải bảo quản tốt nếu không rất dễ bị hư.
                    </p>
                    <h2>2. Nguyên Liệu Và Cách Chế Biến Khô Cá Lóc</h2>
                    <p></p>
                    <div className={cx('small-title')}>
                        <h5>a. Nguyên liệu làm món khô cá lóc</h5>
                    </div>
                    <br />
                    <ul className={cx('ul-small-title')}>
                        <li>
                            - Khô Cá Lóc, thịt ba chỉ, thơm, sả, hành khô, tỏi, hành lám ngò rí, nước dừa tươi, ớt sừng,
                            hạt nêm, bột ngọt, đường, nước mắm, tiêu, dầu ăn.
                        </li>
                    </ul>
                    <br />
                    <div className={cx('small-title')}>
                        <h5>b. Cách chế biến thành cá khô</h5>
                        <br />
                        <ul className={cx('ul-small-title')}>
                            <li>
                                - Cá lóc làm sạch bụng, cạo vảy, lấy muối trắng chà đi chà lại cho hết nhớt, sau đó rửa
                                lại bằng nước lạnh.
                            </li>
                            <li>
                                - Giã nhỏ ớt chín, cho ớt vào một cá chậu lớn, cho thêm tiêu, bột ngọt, muối trắng vào
                                trộn đều.
                            </li>
                            <li>
                                - Xẻ thịt cá lóc, cho vào hỗn hợp gia vị trên ướt ít nhất 45 phút cho cá ngấm gia vị.
                            </li>
                            <li>
                                - Mang ra phơi dưới nhiệt độ cao từ 3 cho tới 4 nắng để cá lóc khô hoàn toàn và không bị
                                hư.
                            </li>
                        </ul>
                        <br />
                    </div>
                    <div className={cx('small-title')}>
                        <h5>c. Các món có chế biến</h5>
                        <br />
                        <ul className={cx('ul-small-title')}>
                            <li>- Khô cá lóc nướng chấm mắm me.</li>
                            <li>- Khô cá lóc sốt me.</li>
                            <li>- Khô cá lóc chiên giấm đường.</li>
                            <li>- Khô cá lóc rang tỏi.</li>
                            <li>- Đặc sản gỏi khô cá lóc một nắng.</li>
                            <li>- Gỏi dưa leo khô cá lóc giòn, mát.</li>
                            <li>- Gỏi xoài khô cá lóc đơn giản mà ngon.</li>
                            <li>- Canh chua khô cá lóc giải nhiệt ngày nắng.</li>
                            <li>- vv......</li>
                        </ul>
                        <br />
                    </div>
                    <h2>3. Bảo Quản</h2>
                    <br />
                    <ul style={{ listStyle: 'none', textIndent: '50px' }}>
                        <li>- Khô cá để nơi thoáng mát, khô ráo</li>
                        <li>- Khô treo lên cao hoặc cho vào bịch và bỏ vào tủ lạnh. Bảo quản ở nhiệt độ mát.</li>
                    </ul>
                    <br />
                </div>
            </div>
        </div>
    );
}

export default Introduce;
