import axios from 'axios';
import { useEffect, useState } from 'react';
import Images from './image';

function SanPham() {
    const [images, setImages] = useState([]);
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_URL_NODEJS}/product`)
            .then((res) => setImages(res.data))
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return <Images data={images} />;
}

export default SanPham;
