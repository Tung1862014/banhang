// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import GetCookie from '~/components/Hook/GetCookies';
// import Images from './image';

// function Search() {
//     const [images, setImages] = useState([]);
//     useEffect(() => {
//         axios
//             .get(`${process.env.REACT_APP_URL_NODEJS}/home/search?q=${JSON.parse(GetCookie('search'))}`)
//             .then((res) => setImages(res.data))
//             .catch((err) => {
//                 console.log(err);
//             });
//     }, []);

//     return <Images data={images} />;
// }

// export default Search;

export { default } from './Search';
