import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./todoApi";

const host = `${API_SERVER_HOST}/api/cart`;

// 장바구니 목록을 가져오는 API
export const getCartItems = async () => {
  const res = await jwtAxios.get(`${host}/items`);
  return res.data;
};

// 장바구니에 상품을 추가/수량변경 하는 API
export const postChageCart = async (cartItem) => {
  const res = await jwtAxios.post(`${host}/change`, cartItem);
  return res.data;
};

/*
    cartApi.js 에서는 현재 사용자의 로그인 정보를 이용하기 때문에 jwtAxios를 이용해서 API 서버를 호출해야 한다.
    
*/
