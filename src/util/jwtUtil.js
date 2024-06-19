import axios from 'axios';
import { getCookie } from './cookieUtil';



const jwtAxios = axios.create();

// before request: 역할은 request가 보내기 전에 처리하는 것
const beforeReq = (config) => {
    console.log("beforeReq ........");

    const memberInfo = getCookie("member");
    if(!memberInfo) {
        console.log("Member info NOT FOUND");
        return Promise.reject({response: {data: {error: "REQUIRE_LOGIN"}}})
    }

    const {accessToken} = memberInfo

    // Authorization 헤더 처리
    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
}

// fail request: 역할은 request가 실패했을 때 처리하는 것
const requestFail = (error) => {
    console.log("request error ........");
    
    return Promise.reject(error);
}

// before return response: 역할은 response가 오기 전에 처리하는 것
const beforeRes = (response) => {
    console.log("before return response ........");
    return response;
}

// fail response: 역할은 response가 실패했을 때 처리하는 것
const responseFail = (error) => {
    console.log("response fail error ........");
    return Promise.reject(error);
}

// request interceptor: 요청을 보내기 전에 가로챔
jwtAxios.interceptors.request.use(beforeReq, requestFail);

// response interceptor: 응답을 받기 전에 가로챔
jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;