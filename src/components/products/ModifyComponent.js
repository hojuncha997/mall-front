import { useEffect, useState, useRef } from "react";
import { getOne, putOne, deleteOne } from "../../api/productsApi";
import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import ResultModal from "../common/ResultModal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


const initState = {
  pno: 0,
  pname: "",
  pdesc: "",
  price: 0,
  delFlag: false,
  uploadFileNames: [],
};

const host = API_SERVER_HOST;

const ModifyComponent = ({ pno }) => {
  const [product, setProduct] = useState(initState);
  const [fetching, setFetching] = useState(false);
  const [result, setResult] = useState(null);

  const uploadRef = useRef();
  const { moveToRead, moveToList } = useCustomMove();

  // 쿼리키를 파라미터로 받아서 invalidateQueries()를 이용해서 데이터를 무효화 하고, 쿼리를 다시 조회하도록 하기 위해 사용
  const queryClient = useQueryClient();

  // 리액트 쿼리를 사용해서 상품을 삭제하기 위해 사용
  const delMutation = useMutation({
    mutationFn: (pno) => deleteOne(pno),
  })

  // 리액트 쿼리를 사용해서 상품을 수정하기 위해 사용
  const modMutation = useMutation({mutationFn: (product) => putOne(pno, product)})


  // 리액트 쿼리 사용
  const query = useQuery({
    queryKey: ["products", pno],
    queryFn: () => getOne(pno),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (query.isSuccess) {
      setProduct(query.data);
    }
  },
  // pno가 포함된 이유는 pno가 변경될 때마다 다시 조회해야 하기 때문이다. 
  [pno, query.data, query.isSuccess]);

  /*
  useQuery()가 성공했을 경우 setProduct()를 하기 위해서 과거에는 onSuccess를 옵션으로 지정할 수 있었다.
  이 방식은 deprecated 됐으므로 상태를 이용해서 처리해야 한다.
  때문에 useQuery()의 결과를 직접 setProduct()로 지정해야 하는데 이 경우 무한히 컴포넌트의 상태가 변경되었기 때문에
  무한반복에 빠지는 코드가 된다.

  // ****절대 실행하면 안되는 무한 반복
  if(query.isSuccess){
    setProduct(query.data);
  }

  이 문제를 해결하기 위해서는 useEffect()를 이용해서 온전히 데이터가 존재하고 성공했을 경우에만
  setProduct()를 호출하도록 조정한다. 또한 조회와 달리 수정 중간에 다시 API 서버를 호출하지 않도록 staleTime을 infinity로 설정한다.
  
  /*

  // 리액트 쿼리 사용으로 인해 주석 처리

  useEffect(() => {
    setFetching(true);
    getOne(pno).then((data) => {
      setProduct(data);
      setFetching(false);
    });
  }, [pno]);

  */

  const handleChangeProduct = (event) => {
    product[event.target.name] = event.target.value;
    setProduct({ ...product });
  };

  const deleteOldImages = (imageName) => {
    const resultFileNames = product.uploadFileNames.filter(
      (fileName) => fileName !== imageName
    );

    product.uploadFileNames = resultFileNames;
    setProduct({ ...product });
  };

  const handleClickModify = () => {
    const files = uploadRef.current.files;

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    // other data

    formData.append("pname", product.pname);
    formData.append("pdesc", product.pdesc);
    formData.append("price", product.price);
    formData.append("delFlag", product.delFlag);

    for (let i = 0; i < product.uploadFileNames.length; i++) {
      formData.append("uploadFileNames", product.uploadFileNames[i]);
    }

    // 리액트 쿼리 사용으로 인해 주석 처리
    // setFetching(true);
    // putOne(pno, formData).then((data) => {
    //   setResult("Modified");
    //   setFetching(false);
    // });

    // 리액트 쿼리 사용
    modMutation.mutate(formData);

  };

  const handleClickDelete = () => {

    delMutation.mutate(pno);

    // 리액트 쿼리 사용으로 인해 주석 처리
    // setFetching(true);
    // deleteOne(pno).then((data) => {
    //   setResult("Deleted");
    //   setFetching(false);
    // });
  };

  const closeModal = () => {

    if(delMutation.isSuccess){
      queryClient.invalidateQueries(["products", pno]);
      queryClient.invalidateQueries(["products/list"]);
      moveToList();
      // 여기서 return을 쓰는 이유는 아래의 코드가 실행되지 않도록 하기 위해서이다.
      return;
    }

    if(modMutation.isSuccess){
      queryClient.invalidateQueries(["products", pno]);
      queryClient.invalidateQueries(["products/list"]);
      moveToRead(pno);
    }

    // 리액트 쿼리 사용으로 인해 주석 처리
    // if (result === "Modified") {
    //   moveToRead(pno);
    // } else if (result === "Deleted") {
    //   moveToList({ page: 1 });
    // }
    // setResult(null);
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {/* 
      // 리액트 쿼리 사용으로 인해 주석 처리
      
      {fetching ? <FetchingModal /> : <></>}

      {result ? (
        <ResultModal
          title={`${result}`}
          content={"정상적으로 처리되었습니다"}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )} */}

      {query.isFetching || delMutation.isLoading || modMutation.isSuccess ? <FetchingModal /> : <></>}
      
      {delMutation.isSuccess || modMutation.isSuccess ? (
        <ResultModal
          title={`처리결과`}
          content={"정상적으로 처리되었습니다"}
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
            rows={"4"}
            type={"text"}
            value={product.pdesc}
            onChange={handleChangeProduct}
          >
            {product.pdesc}
          </textarea>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Price</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
            name="price"
            type={"number"}
            value={product.price}
            onChange={handleChangeProduct}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">DELETE</div>
          <select
            name="delFlag"
            value={product.delFlag}
            onChange={handleChangeProduct}
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
          >
            <option value={false}>사용</option>
            <option value={true}>삭제</option>
          </select>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Files</div>
          <input
            ref={uploadRef}
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            type={"file"}
            multiple={true}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Images</div>
          <div className="w-4/5 justify-center flex flex-wrap items-start">
            {product.uploadFileNames.map((imgFile, i) => (
              <div
                className="flex justify-center flex-col w-1/3 m-1 align-baseline"
                key={i}
              >
                <button
                  className="bg-blue-500 text-3xl text-white"
                  onClick={() => deleteOldImages(imgFile)}
                >
                  DELETE
                </button>
                <img alt="img" src={`${host}/api/products/view/s_${imgFile}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end p-4">
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
          onClick={handleClickDelete}
        >
          Delete
        </button>
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-orange-500"
          onClick={handleClickModify}
        >
          Modify
        </button>
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={moveToList}
        >
          List
        </button>
      </div>
    </div>
  );
};
export default ModifyComponent;

/*

수정 작업은 등록과 마찬가지로 첨부파일이 존재하기 때문에 'multipart/form-data' 헤더를 설정해서 전송처리를 해야 한다.

*/


/*
  리액트 쿼리 사용

  상품 수정은 조회와 등록 기능이 같이 존재하기 때문에 useQuery()와 useMutation()을 이용해서 사용해야 한다.
  상품 수정 처리는 기본적으로 아래의 흐름을 따라서 처리된다.

  - useQuery()를 이용해서 상품 데이터를 가져온 후 컴포넌트의 상태 값으로 지정한다.
  - <input>을 이용해서 컴포넌트의 상태로 유지되는 데이터를 수정한다.
  - 수정이나 삭제를 처리한 후 화면을 이동하게 한다.
*/