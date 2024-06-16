import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";

const host = `${API_SERVER_HOST}/api/products`;

export const postAdd = async (product) => {
  /**
   axios는 기본적으로 Content-Type을 application/json으로 사용한다.
   파일을 업로드 할 때는 multipart/form-data 헤더 설정을 추가해 주어야 한다.
   */
  const header = { headers: { "Content-Type": "multipart/form-data" } };

  const res = await axios.post(`${host}/`, product, header); //   경로 뒤 '/' 주의
  return res.data;
};
