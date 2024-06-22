import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";
import jwtAxios from "../util/jwtUtil";

const host = `${API_SERVER_HOST}/api/member`;

export const loginPost = async (loginParam) => {
  // const header = {headers: {'Content-Type': 'application/json'}};  헤더 타입이 다르면 에러 발생함.

  const header = { headers: { "Content-Type": "x-www-form-urlencoded" } };

  const form = new FormData();
  form.append("username", loginParam.email);
  form.append("password", loginParam.pw);

  const res = await axios.post(`${host}/login`, form, header);

  return res.data;
};

export const modifyMember = async (member) => {
  const res = await jwtAxios.put(`${host}/modify`, member);
  return res.data;
};

/*


에러가 발생하는 이유는 formLogin 설정에서 스프링 시큐리티가 기본적으로 폼 데이터를 사용하는 로그인 방식을 기대하고 있기 때문이다.
이 방식은 application/x-www-form-urlencoded 콘텐츠 타입을 사용하여 데이터를 전송한다.

구체적으로, 다음 이유들로 인해 application/json으로 로그인 요청을 보내면 에러가 발생한다:

기본 로그인 방식: 스프링 시큐리티의 기본 로그인 처리 방식은 폼 데이터를 기반으로 동작한다.
    이는 username과 password 필드를 application/x-www-form-urlencoded 타입으로 처리하도록 설계되어 있다.

시큐리티 필터 처리: UsernamePasswordAuthenticationFilter 필터는 폼 데이터로 전달된 username과 password를 처리하도록 되어 있다.
    따라서, application/json으로 데이터를 전송하면 이 필터가 이를 처리할 수 없기 때문에 로그인 요청이 실패한다.

요청 파라미터 파싱: application/json으로 데이터를 보내면 요청 파라미터가 JSON 형식으로 전송되기 때문에,
    스프링 시큐리티의 기본 파라미터 파서가 이를 올바르게 해석하지 못한다.


따라서 헤더 타입을 application/x-www-form-urlencoded로 사용하거나, 
스프링 시큐리티 설정을 변경하여 application/json 타입의 요청을 처리할 수 있도록 설정해야 한다.

*/
