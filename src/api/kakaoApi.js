import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";

const rest_api_key = `ec922083d15a70f8304f17b2e289e21e`; // REST 키 값
const redirect_uri = `http://localhost:3000/member/kakao`;

const auth_code_path = `https://kauth.kakao.com/oauth/authorize`;

const access_token_url = `https://kauth.kakao.com/oauth/token`; // 추가

export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  return kakaoURL;
};

export const getAcccessToken = async (authCode) => {
  const header = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const params = {
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode,
  };

  const res = await axios.post(access_token_url, params, header);

  const accessToken = res.data.access_token;

  return accessToken;
};

// 아래 함수는 카카오 로그인 결과로 전달되는 accessToken을 이용하여 사용자 정보를 가져오는 함수이다.
export const getMemberWithAccessToken = async (accessToken) => {
  const res = await axios.get(
    `${API_SERVER_HOST}/api/member/kakao?accessToken=${accessToken}`
  );
  return res.data;
};

/*
  카카오 로그인 결과로 전달되는 인가코드는 Access Token을 받기 위한 사전작업이다.
  Access Token을 받기 위해서는 인가코드를 사용하여 카카오 서버에 요청을 보내야 한다.
  주소는 https://kauth.kakao.com/oauth/token 이고 파라미터는 다음과 같다.

  grant_type(고정값): authorization_code,
  client_id(REST API 키),
  redirect_uri(리다이렉트 URI), - 인가코드가 리다이렉트 된 URI
  code(인가코드) - 인가 코드 받기 요청으로 얻은 인가 코드

  client_secret: 토큰 발급 시 보안강화를 위해 추가 확인하는 코드(여기서는 사용하지 않음.)



*/
