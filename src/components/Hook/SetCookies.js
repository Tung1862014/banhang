import Cookie from 'js-cookie';

const SetCookie = (cookieName, userVaule) => {
    Cookie.set(cookieName, userVaule, { expires: 1, secure: true, sameSite: 'strict', path: '/' });
};

export default SetCookie;
