// /pages/products/AddPage 에서 사용

import { useRef, useState } from "react";
import { postAdd } from "../../api/productsApi";
import FetchingModal from "../common/fetchingModal";

const initState = {
  pname: "",
  pdesc: "",
  price: 0,
  files: [],
};

const AddComponent = () => {
  const [product, setProduct] = useState({ ...initState });

  const uploadRef = useRef();

  const [fetching, setFetching] = useState(false);

  const handleChangeProduct = (event) => {
    product[event.target.name] = event.target.value;
    setProduct({ ...product });
  };

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
    });
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {fetching ? <FetchingModal /> : <></>}

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
            name="price"
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
