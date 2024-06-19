import { Cookies } from "react-cookie";

//쿠키를 사용하기 위해 react-cookie를 사용한다.
const cookie = new Cookies();

export const setCookie = (name, value, days) => {

    const expires = new Date();
    expires.setUTCDate(expires.getUTCDate() + days);    //  보관기한

    return cookie.set(name, value, {path:'/', expires: expires});
}

export const getCookie = (name) => {
    return cookie.get(name);
}

export const removeCookie = (name, path="/") => {
    return cookie.remove(name, {path});
}