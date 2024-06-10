import { useEffect, useState } from "react";

import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const getNum = (param, defaultValue) => {
  if (!param) {
    return defaultValue;
  }
  return parseInt(param);
};

const useCustomMove = () => {
  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(false); // 동일한 페이지를 호출할 때 새로고침을 위한 상태 추가

  const [queryParams] = useSearchParams();

  const page = getNum(queryParams.get("page"), 1);
  const size = getNum(queryParams.get("size"), 10);

  const queryDefault = createSearchParams({ page, size }).toString(); // 추가

  //   리스트로 이동
  const moveToList = (pageParam) => {
    let queryStr = "";

    if (pageParam) {
      const pageNum = getNum(pageParam.page, 1);
      const sizeNum = getNum(pageParam.size, 10);

      queryStr = createSearchParams({
        page: pageNum,
        size: sizeNum,
      }).toString();
    } else {
      queryStr = queryDefault;
    }
    setRefresh(!refresh); // 페이지 이동 시 새로고침을 위한 상태 변경
    navigate({ pathname: `../list`, search: queryStr });
  };

  //   개별 목록 수정페이지로 이동
  const moveToModify = (num) => {
    console.log(queryDefault);

    navigate({
      pathname: `../modify/${num}`,
      search: queryDefault, // 수정 시 기존 쿼리 스트링 유지 목적
    });
  };

  useEffect(() => {
    console.log("refresh:", refresh);
  });

  return { moveToList, moveToModify, page, size, refresh };
};

export default useCustomMove;

/*
useCustomMove()의 내부에서 useNavigate()와 useSearchParams()를 이용해서
원하는 기능을 moveToList()로 만들고 이를 page, size와 함께 반환한다.
외부에서 useCustomMove()를 이용하면 간단히 useNavigate()를 이용하게 되고 반환된 데이터들 중에 필요한 데이터만 선별해 사용할 수 있다.
*/
