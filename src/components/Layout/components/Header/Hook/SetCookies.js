import Cookie from 'js-cookie';

const SetcCookie = (cookieName, userVaule) => {
    Cookie.set(cookieName, userVaule, { expires: 1, secure: true, sameSite: 'strict', path: '/' });
};

export default SetcCookie;
