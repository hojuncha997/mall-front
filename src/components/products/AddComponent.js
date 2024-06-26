// /pages/products/AddPage 에서 사용

import { useRef, useState } from "react";
import { postAdd } from "../../api/productsApi";
import FetchingModal from "../common/FetchingModal";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";
// 리액트 쿼리 사용
import { useMutation, useQueryClient } from "@tanstack/react-query";

const initState = {
  pname: "",
  pdesc: "",
  price: 0,
  files: [],
};

const AddComponent = () => {
  // 기본적으로 필요
  const [product, setProduct] = useState({ ...initState });
  const uploadRef = useRef();
  const { moveToList } = useCustomMove(); //   이동을 위한 함수

  const queryClient = useQueryClient();

  // 리액트 쿼리 사용으로 인해 주석 처리
  // const [fetching, setFetching] = useState(false);
  // const [result, setResult] = useState(null);

  // 입력값 처리
  const handleChangeProduct = (event) => {
    product[event.target.name] = event.target.value;
    setProduct({ ...product });
  };

  /*
  // 리액트 쿼리 사용
  const addMutation = useMutation((product) => {
    alert("addMutation - postAdd(product) 실행");
    return  postAdd(product)
  });
  */

  //  리액트 쿼리가 5버전으로 업그레이드 되면서 useMutation() 함수의 사용법이 변경되었다.
  // 파라미터로 객체를 받아서 사용하게 되었다.
  // 객체는 mutationFn, onError, onSuccess 등을 속성으로 가진다.
  const addMutation = useMutation({
    mutationFn: (product) => {
      alert("addMutation - postAdd(product) 실행");
      return postAdd(product);
    },
    onError: (error) => {
      console.error("Mutation failed: ", error);
    },
    onSuccess: (data) => {
      console.log("Mutation succeeded: ", data);
      // 이동 처리나 다른 후속 작업
      // moveToList({ page: 1 });
    },
  });

  const handleClickAdd = (event) => {
    const files = uploadRef.current.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    formData.append("pname", product.pname);
    formData.append("pdesc", product.pdesc);
    formData.append("price", product.price);

    console.log("Form Data: ", formData);
    addMutation.mutate(formData);
  };

  /*
  리액트 쿼리 사용 전

const handleClickAdd = (event) => {
    const files = uploadRef.current.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    //  other data
    formData.append("pname", product.pname);
    formData.append("pdesc", product.pdesc);
    formData.append("price", product.price);

    console.log(formData);
    setFetching(true);
    // API 전송
    postAdd(formData).then((data) => {
      setFetching(false);
      setResult(data.result);
    });
  };

  */

  const closeModal = () => {
    // setResult(null); // 리액트 쿼리 사용으로 미사용

    // 등록 후 목록으로 갔을 때 캐싱된 데이터를 무효화 하고 목록을 갱신하여 새로운 데이터를 가져오기 위해 invalidateQueries()를 호출한다.
    queryClient.invalidateQueries("products/list"); // 목록화면 갱신
    moveToList({ page: 1 }); // 모달이 닫히면 이동
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {/* // 모달창들 잠시 주석처리 */}

      {addMutation.isLoading ? <FetchingModal /> : <></>}
      {addMutation.isSuccess ? (
        <ResultModal
          title={"Product Add Result"}
          content={`Add Success ${addMutation.data.result}`}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Product Name</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="pname"
            type={"text"}
            value={product.pname}
            onChange={handleChangeProduct}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Desc</div>
          <textarea
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
            name="pdesc"
            rows="4"
            onChange={handleChangeProduct}
            value={product.pdesc}
          >
            {product.pdesc}
          </textarea>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Price</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="price"
            type={"number"}
            value={product.price}
            onChange={handleChangeProduct}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Files</div>
          <input
            ref={uploadRef} // useRef 사용
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="files"
            type={"file"}
            multiple={true}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
          <button
            type="button"
            className="rounded p-4 w-36 bg-blue-500 text-xl text-white"
            onClick={handleClickAdd}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddComponent;

/**
    useRef()는 기존 JS에서 document.getElementById()와 유사한 역할을 한다.
    리액트 컴포넌트는 id속성을 활용하면 나중에 동일한 컴포넌트를 여러 번 사용해서 화면에 문제가 생길 수 있기 때문에
    useRef를 이용해 처리한다.

 */

/**
  ADD 버튼을 눌렀을 때 첨부파일에 선택된 정보를 읽어내서 첨부파일의 정보를 확인하고 이를 Ajax 전송에 사용하는 FormData 객체로 구성해야 한다.
   FormData 타입으로 처리된 모든 내용은 Axios를 이용해서 서버 호출 시 사용하게 된다.
 */
/**
    useRef를 이용할 때는 current라는 속성을 활용해서 현재 DOM 객체를 참조한다.
    Ajax를 전송할 때는 FormData 객체를 통해서 모든 내용을 담아서 전송한다.
 */

/*

    리액트 쿼리

    리액트 쿼리에서 가장 중요한 기능은 useQuery()와 useMutation()이다.
    SQL로 비유하자면 useQuery()는 SELECT문에 해당하고 useMutation()은 INSERT, UPDATE, DELETE문에 해당한다.
    useMutation()은 useQuery()와 달리 데이터를 변경하는 작업을 수행한다.
    useMutation()은 서버를 호출하는 함수를 파라미터로 받는다. 그리고 mutate()를 사용해서 처리 결과에 대한 다양한 정보를 얻을 수 있다.

  */

/*
  등록 후 처리

  목록화면에서 사용하는 useQuery()의 staleTime이 짧은 경우에는 문제가 되지 않겠지만 staleTime이 긴 경우에는
  새로운 상품을 등록해도 목록으로 이동한 경우에 서버를 호출하지 않기 때문에 기존 페이지가 그대로 유지되는 현상이 생길 수 있다.

  이를 해결하기 위해서는 AddComponent에서 모달창을 닫을 때 invalidateQueries()를 호출하여 목록화면을 갱신해야 한다.

*/
