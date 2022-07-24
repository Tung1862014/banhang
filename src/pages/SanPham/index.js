import axios from 'axios';
import { useEffect, useState } from 'react';
import Images from './image';

function SanPham() {
    const [images, setImages] = useState([]);
    useEffect(() => {
        axios
            .get(`https://api-store-backend-nodejs.herokuapp.com/product`)
            .then((res) => setImages(res.data))
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return <Images data={images} />;
}

export default SanPham;
