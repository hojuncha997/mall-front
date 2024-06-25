import { useEffect, useState } from "react";
import { getList } from "../../api/productsApi";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import PageComponent from "../common/PageComponent";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useQuery , useQueryClient} from "@tanstack/react-query";

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
  queryKey: ['products/list', {page, size, refresh}],  // -------------------------------- refresh 추가
  queryFn: () => getList({page, size}),

  // options
  staleTime: 1000 * 5, // --------------------------------------------------------------- staleTime 추가
});

// refresh를 사용하면 invalidateQueries()를 사용하지 않아도 된다.
// const queryClient = useQueryClient(); // 리액트 쿼리 초기화를 위한 현재 객체

const handleClickPage = (pageParam) => {

  /*
  // refresh를 사용하면 invalidateQueries()를 사용하지 않아도 된다.
    if(pageParam.page === parseInt(page)) {
      // 현재 페이지를 클릭한 경우에는 쿼리 클라이언트를 이용해서 데이터를 무효화한다. 따라서 서버에 재요청한다.
      queryClient.invalidateQueries('products/list');
    }
  */
  moveToList(pageParam);
}





// 에러가 발생했을 때 처리: 리액트 쿼리의 isError 속성을 이용한다.
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
      {/* <PageComponent serverData={serverData} movePage={moveToList} /> */}
      <PageComponent serverData={serverData} movePage={handleClickPage} />
    </div>
  );
};

export default ListComponent;



/*

staleTime을 지정하지 않으면 서버에서 가져온 데이터를 사용한 후에 바로 stale한 상태가 된다.
따라서 잠시 브라우저를 벗어나서 다른 프로그램을 클릭하거나 이용한 후 다시 브라우저를 
활성화하면 서버를 재호출한다.

- 동일한 queryKey를 사용하는 경우 호출하지 않는 문제

  -invalidateQueries() 사용

    조회 페이지와 달리 상품 목록 페이지는 아래 쪽에 페이지 번호를 클릭할 수 있다.
    이 때 현재 페이지와 클릭하는 페이지의 번호가 다르면 리액트 쿼리가 서버에 데이터를 요청한다.
    useQuery()가 이용하는 쿼리 key값이 달라지기 때문이다.

    그러나 동일한 페이지를 클릭하는 경우에는 서버에 요청하지 않는다.
    쿼리 key값에 변동이 없었기 때문이다.

    동일한 query key가 반복적으로 호출될 때 문제를 해결하는 가장 간단한 방법은 리액트 쿼리가 보관하는 데이터를 무효화(invalidate)하는 것이다.

    리액트 쿼리는 해당 쿼리 키 값의 데이터가 무효화 되면 다시 서버를 호출해서 데이터를 조회한다.

        handleClickpage()는 동일한 페이지를 클릭한 경우에만 invalidateQueries()를 호출한다.
        invalidateQueries()는 해당 키로 시작하는 결과를 모두 무효화 한다.

  - refresh의 사용

    invalidateQueries()를 이용하는 방식의 단점은 사용자가 짧은 시간 동안 동일한 페이지를 클릭하는 경우,
    매 번 서버에 요청을 보내므로 서버 호출이 증가한다는 점이다.

    이런 상황을 피하고 싶다면 매번 변경되는 refresh값과 staleTime을 함께 사용하면 된다.
    staleTime을 이용해서 약간의 시간 동안 반복적인 서버 호출을 막고,
    refresh를 이용해서 동일한 페이지에 대한 queryKey를 변경하는 것이다.

    이를 적용했다면, 동일한 페이지를 계속해서 클릭하더라도 지정된 시간(staleTime)이 지나기 전까지는 서버 호출을 허용하지 않는다.

    동일 페이지의 호출은 useQuery() 결과 중 refetch를 이용할 수도 있지만,
    이 경우 다른 쿼리 스트링을 변경하는 등의 처리는 어렵기 때문에 컴포넌트의 상태(state)를 이용하는 것이 좋다.







const {isFetching, data, error, isError} = useQuery({
  queryKey: ['products/list', {page, size, refresh}],  // -------------------------------- refresh 추가
  queryFn: () => getList({page, size}),
    
  options: {
    staleTime: 1000 * 5,
    retry: 1,
    refetchOnWindowFocus: true,

  }
});

*/

