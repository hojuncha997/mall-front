import axios from "axios";
import jwtAxios from "../util/jwtUtil";

export const API_SERVER_HOST = "http://localhost:8080";

const prefix = `${API_SERVER_HOST}/api/todo`;

// 개별 조회
export const getOne = async (tno) => {
  // const res = await axios.get(`${prefix}/${tno}`);
  const res = await jwtAxios.get(`${prefix}/${tno}`);
  return res.data;
};

// 목록
export const getList = async (pageParam) => {
  const { page, size } = pageParam;
  // const res = await axios.get(`${prefix}/list`, {
    const res = await jwtAxios.get(`${prefix}/list`, {
    params: { page: page, size: size },
  });

  return res.data;
};

// 등록
export const postAdd = async (todoObj) => {
  // const res = await axios.post(`${prefix}/`, todoObj);
  const res = await jwtAxios.post(`${prefix}/`, todoObj);
  return res.data;
};

// 삭제
export const deleteOne = async (tno) => {
  // const res = await axios.delete(`${prefix}/${tno}`);
  const res = await jwtAxios.delete(`${prefix}/${tno}`);
  return res.data;
};

// 수정
export const putOne = async (todo) => {
  // const res = await axios.put(`${prefix}/${todo.tno}`, todo);
  const res = await jwtAxios.put(`${prefix}/${todo.tno}`, todo);
  return res.data;
};
