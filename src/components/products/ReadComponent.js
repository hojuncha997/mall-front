import { useEffect, useState } from "react";
import { getOne } from "../../api/productsApi";
import { API_SERVER_HOST } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import useCustomCart from "../../hooks/useCustomCart";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useQuery } from "@tanstack/react-query";

const initState = {
  pno: 0,
  pname: "",
  pdesc: "",
  price: 0,
  uploadFileNames: [],
};

const host = API_SERVER_HOST;

const ReadComponent = ({ pno }) => {
  // reactQuery를 사용하였기 때문에 useState()를 사용하지 않아도 된다.
  // const [product, setProduct] = useState(initState);

  console.log("pno from readComponent: ", pno);

  //   화면 이동용 함수
  const { moveToList, moveToModify } = useCustomMove();

  /* 리액트 쿼리 버전 5의 문법이 아니다.

  //   useQuery()를 이용한 데이터 조회
  //   useQuery()는 특정 데이터를 조회하고 통신 상태나 결과 혹은 에러 데이터 등을 한 번에 처리할 수 있게 도와준다.
  //   useQuery()를 이용하기 전에는 useEffect()를 이용해 서버에서 데이터를 가져온 후에 상태(state)를 변경해 주어야 했다.
  //  하지만 useQuery()를 이용하면 통신 중이거나 통신 완료된 상태를 표현하는 일을 리액트 쿼리로 변환해 볼 수 있다.
  // isFetching: 서버와 비동기 통진 중인 여부를 확인할 때 사용. 즉 데이터를 가져오는 중인지 여부를 나타내는 상태
  // data: 데이터를 가져온 결과를 나타내는 상태. 데이터를 가져오는 데 성공하면 이 상태에 데이터가 저장된다.
  // 이 외에도 error나 isError, isSuccess, isIdle 등 여러 상태를 가지고 있다.

  const { isFetching, data } = useQuery(
    // "products"이라는 문자열은 쿼리 함수를 구분하는 쿼리키이다.
    //  pno는 쿼리 함수의 파라미터로 사용된다.
    //  getOne() 함수는 데이터를 가져오는 함수이다.
  
    ["products", pno],
    () => getOne(pno),
    {
      // staleTime: 캐시된 데이터가 만료되기 전까지 사용할 수 있는 시간을 나타낸다.
      staleTime: 1000 * 10,
  
      // retry: 데이터를 가져오는 데 실패했을 때 재시도 횟수를 나타낸다.
      retry: 1,
    }
  );
*/

  /**
   * eact Query 버전 5에서는 useQuery와 같은 함수에 인자를 전달하는 방식에 대한 요구사항이 엄격해졌다
   * v5로 이행하면서, 모든 쿼리 관련 함수 호출에는 인자를 오브젝트 형태로만 전달해야 한다.
   * 또한 option설정(staleTime 등)을 options 객체로 감싸지 않고 직접 파라미터로 넘긴다.
   *  아래 코드를 통해 돌아오는 값은 isFetching, data, error 등이다.
   
  // 이 코드 역시 options 객체를 사용해서 넘겼으므로 리액트 쿼리 5의 문법에는 맞지 않는다.
  const { isFetching, data } = useQuery({
    queryKey: ["products", pno],
    queryFn: () => getOne(pno),
    options: {
      staleTime: 1000 * 10,
      retry: 1,
    },
  });
*/
  const { isFetching, data } = useQuery({
    queryKey: ["products", pno],
    queryFn: () => getOne(pno),
    staleTime: 1000 * 10 * 60,  // 10분
    retry: 1,
  });


  //   fetching: 리액트 쿠리 사용으로 인해 사용하지 않는다.
  // const [fetching, setFetching] = useState(false);

  //   장바구니 기능
  const { changeCart, cartItems } = useCustomCart();

  // 로그인 정보
  //  리코일 사용으로 인해 사용하지 않는다.
  // const { isLogin, loginState } = useCustomLogin();
  const { loginState } = useCustomLogin();

  // 장바구니 추가 버튼 클릭시
  const handleClickAddCart = () => {
    let qty = 1;

    //
    const addedItem = cartItems.filter((item) => item.pno === parseInt(pno))[0];

    if (addedItem) {
      if (
        window.confirm("이미 추가된 상품입니다. 추가하시겠습니까?") === false
      ) {
        return;
      }
      qty = addedItem.qty + 1;
    }
    changeCart({ email: loginState.email, pno: pno, qty: qty });
  };

  const product = data || initState;

  /*
  // reactQuery를 사용하였기 때문에 useEffect()를 사용하지 않아도 된다. 왜냐하면 useQuery()가 대신해주기 때문이다.
  useEffect(() => {
    setFetching(true);

    getOne(pno).then((data) => {
      setProduct(data);
      setFetching(false);
    });
  }, [pno]);
  */

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {/* {fetching ? <FetchingModal /> : <></>} */}
      {isFetching ? <FetchingModal /> : <></>}

      <div className="flex justify-center mt-10">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">PNO</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {product.pno}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">PNAME</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {product.pname}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">PRICE</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {product.price}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">PDESC</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {product.pdesc}
          </div>
        </div>
      </div>

      <div className="w-full justify-center flex flex-col m-auto items-center">
        {product.uploadFileNames.map((imgFile, i) => (
          <img
            alt="product"
            key={i}
            className="p-4 w-1/2"
            src={`${host}/api/products/view/${imgFile}`}
          />
        ))}
      </div>

      <div className="flex justify-end p-4">
        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-green-500"
          onClick={handleClickAddCart}
        >
          Add Cart
        </button>

        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
          onClick={() => moveToModify(pno)}
        >
          Modify
        </button>
        <button
          type="button"
          className=" rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={() => moveToList()}
        >
          List
        </button>
      </div>
    </div>
  );
};

export default ReadComponent;

/*
  useQuery()는 특정 데이터를 조회하고 통신 상태나 결과 혹은 에러 데이터 등을 한 번에 처리할 수 있게 도와준다.
  useQuery()를 이용하기 전에는 useEffect()를 이용해 서버에서 데이터를 가져온 후에 상태(state)를 변경해 주어야 했다.
  이 과정에서 통신 중이거나 통신 완료된 상태를 표현하는 일을 리액트 쿼리로 변환해 본다.

  useQuery()의 파라미터는 크게 '쿼리 키(key)', '쿼리 함수(queryFn)', '쿼리 옵션(queryOptions)'으로 나뉜다.
  이 중에서 '쿼리 키'는 쿼리 함수를 구분하는 식별자 역할을 하며, '쿼리 함수'는 데이터를 가져오는 함수이다.

*/

/*
  리액트 쿼리의 가장 중요한 점은 데이터를 보관한다는 것이다. 데이터의 상태에 따라 새롭게 데이터를 가져오거나
  보관하고 있는 데이터를 사용할 수 있다. 
  리액트 쿼리 개발툴에서 서버에 데이터를 가져오는 동안에는 'fetching' 상태가 되고, 데이터 처리가 완료되면 'fresh' 상태가 된다.

  staleTime: 캐시된 데이터가 만료되기 전까지 사용할 수 있는 시간을 나타낸다. 만료가 되면 fresh하지 않기 때문에 서버에 데이터를 다시 요청한다.
  신선하지 않게되면 다시 서버에서 최신 데이터를 가져온다는 의미이다.

  fetching -> fresh -> 10초 후 stale

  리액트 쿼리는 기본적으로 다시 현재 화면이 활성화될 때 리액트 쿼리가 이를 체크한다. 

  useQuery()는 기본적으로 현재 브라우저(윈도우)가 활성화 되면 다시 서버를 호출하는(refetch) 옵션이 지정되어 있다(refetchOnWindowFocus: true).
  이 때 stale 상태의 데이터는 이미 오래된 데이터라고 판단되므로 다시 서버를 호출하게 된다.
  만일 staleTime이 길게 지정되면 fresh한 상태가 오래 지속되므로 다시 서버를 호출하지 않게 된다.

*/
