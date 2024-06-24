import { useEffect, useState } from "react";
import { getList } from "../../api/productsApi";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import PageComponent from "../common/PageComponent";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useQuery } from "@tanstack/react-query";

// API서버에서 가져온 목록 데이터는 이미지 파일의 이름이 포함돼 있으므로 이를 화면에 출력해줄 때 서버의 경로를 시용해야 한다. 따라서 임포트
import { API_SERVER_HOST } from "../../api/todoApi";
const host = API_SERVER_HOST;

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalpage: 0,
  current: 0,
};

const ListComponent = () => {

  // const {exceptionHandle} = useCustomLogin();
  const {moveToLoginReturn} = useCustomLogin();

  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();


/*

  // 리액트 쿼리 사용으로 인해 아래 코드는 주석 처리

  const [serverData, setServerData] = useState(initState);

  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);

    getList({ page, size }).then((data) => {
      console.log(data);
      setServerData(data);
      setFetching(false);
    }).catch(err => exceptionHandle(err));
  }, [page, size, refresh]);

  */


  // reactQuery를 사용하였기 때문에 useState()를 사용하지 않아도 된다.
  // 파라미터를 전달하고 받은 응답은 isFetching, data, error 등으로 구조분해할당하여 사용한다.
const {isFetching, data, error, isError} = useQuery({
  queryKey: ['products/list', {page, size}], 
  queryFn: () => getList({page, size})}
);

// 에러가 발생했을 때 처리
if(isError) {
  console.log(error);
  
  return moveToLoginReturn();
}

const serverData = data || initState;



  return (
    <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
      {/* {fetching ? <FetchingModal /> : <></>} */}
      {isFetching ? <FetchingModal /> : <></>}

      <div className="flex flex-wrap mx-auto p-6">
        {serverData.dtoList.map((product) => (
          <div
            key={product.pno}
            className="w-1/2 p-1 rounded shadow-md border-2"
            onClick={() => moveToRead(product.pno)}
          >
            <div className="flex flex-col h-full">
              <div className="font-extrabold text-2xl p-2 w-full">
                {product.pno}
              </div>

              <div className="text-1xl m-1 p-2 w-full flex flex-col">
                {/* 썸네일 이미지 보여주기 */}
                <div className="w-full overflow-hidden">
                  <img
                    alt="product"
                    className="m-auto rounded-md w-60"
                    src={`${host}/api/products/view/s_${product.uploadFileNames[0]}`}
                  />
                </div>

                <div className="bottom-0 font-extrabold bg-white">
                  <div className="text-center p-1">이름: {product.name}</div>
                  <div className="text-center p-1">가격: {product.price}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <PageComponent serverData={serverData} movePage={moveToList} />
    </div>
  );
};

export default ListComponent;
