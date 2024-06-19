import axios from 'axios';
import { getCookie, setCookie } from './cookieUtil';
import { API_SERVER_HOST } from '../api/todoApi';



const jwtAxios = axios.create();


// Access Token과 Refresh Token을 이용해서 새로운 Access Token을 발급받는 함수
const refreshJWT = async (accessToken, refreshToken) => {
    
    const host = API_SERVER_HOST;

    const header = {headers: {'Authorization': `Bearer ${accessToken}`}};

    const res = await axios.get(`${host}/api/member/refresh?refreshToken=${refreshToken}`, header);

    console.log("-------------------------------")
    console.log(res.data)

    return res.data;

    /* 
        beforeRes()에서 응답 데이터가 "ERROR_ACCESS_TOKEN"과 같이 
        Access Token 관련 메시지인 경우 Refresh Token을 활용해서 다시 호출한다
    */

}





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

// before return response: 역할은 response가 호출 함수에 도달하기 전에 가로채서 처리하는 것
// 응답 내용이 "ERROR_ACCESS_TOKEN"인 경우 Refresh Token을 이용해서 새로운 Access Token을 발급받는다
const beforeRes = async (response) => {
    console.log("before return response ........");

    console.log(response);
    const data = response.data;

    // 만약 응답 데이터가 "ERROR_ACCESS_TOKEN"이면
    if(data && data.error === "ERROR_ACCESS_TOKEN") {
        // 쿠키에서 Member 정보를 가져온다 그리고
        const memberCookieValue = getCookie("member");

        // 액세스 토큰을 서버에 재발급 요청하는 함수를 호출한다. (액세스 토큰과 리프레시 토큰이 파라미터로 전달됨)
        const result = await refreshJWT(memberCookieValue.accessToken, memberCookieValue.refreshToken);

        console.log("refresh RESULT: ", result);

        // 새로운 Access Token과 Refresh Token을 쿠키에 저장한다
        memberCookieValue.accessToken = result.accessToken;
        memberCookieValue.refreshToken = result.refreshToken;

        // 새로운 토큰을 쿠키에 저장한다. 유효기간은 1일로 설정
        setCookie("member", JSON.stringify(memberCookieValue), 1);

        // 원래의 호출: 요청 객체를 가져온다. 
        const originalRequest = response.config;

        // 새로운 Access Token을 Authorization 헤더에 설정한다
        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;

        // 새로운 Access Token을 이용해서 다시 호출한다. 원래 호출하려던 API서버 경로로 호출한다.
        return await axios(originalRequest)

    }

    // "ERROR_ACCESS_TOKEN"이 아닌 경우, 원래의 응답을 반환한다
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