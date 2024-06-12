import { useState } from "react";
import { postAdd } from "../../api/todoApi";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
  title: "",
  writer: "",
  dueDate: "",
};

const AddComponent = () => {
  const [todo, setTodo] = useState({ ...initState });

  // 결과 데이터가 있는 경우 ResultModal을 보여준다.
  const [result, setResult] = useState(null);

  const { moveToList } = useCustomMove(); // useCustomMove() 훅 사용

  const handleChangeTodo = (event) => {
    todo[event.target.name] = event.target.value;
    setTodo({ ...todo });
  };

  const handleClickAdd = () => {
    // console.log(todo);
    postAdd(todo)
      .then((result) => {
        setResult(result.TNO); // 결과 데이터 변경
        setTodo({ ...initState });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const closeModal = () => {
    setResult(null);
    moveToList(); // moveToList() 함수 호출 -> 목록으로 이동
  };

  return (
    <div className="p-4 m-2 mt-10 border-2 border-sky-200">
      {/* 모달 처리 */}
      {result ? (
        <ResultModal
          title="Add Result"
          content={`New ${result} Added`}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}

      <div className="flex justify-center">
        <div className="relative flex flex-wrap items-stretch w-full mb-4">
          <div className="w-1/5 p-6 font-bold text-right">TITLE</div>
          <input
            className="w-4/5 p-6 border border-solid rounded-r shadow-md border-neutral-500"
            name="title"
            type={"text"}
            value={todo.title}
            onChange={handleChangeTodo}
          ></input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative flex flex-wrap items-stretch w-full mb-4">
          <div className="w-1/5 p-6 font-bold text-right ">WRITER</div>
          <input
            className="w-4/5 p-6 border border-solid rounded-r shadow-md border-neutral-500"
            name="writer"
            type={"text"}
            value={todo.writer}
            onChange={handleChangeTodo}
          ></input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative flex flex-wrap items-stretch w-full mb-4">
          <div className="w-1/5 p-6 font-bold text-right ">DUEDATE</div>
          <input
            className="w-4/5 p-6 border border-solid rounded-r shadow-md border-neutral-500"
            name="dueDate"
            type={"text"}
            value={todo.dueDate}
            onChange={handleChangeTodo}
          ></input>
        </div>
      </div>

      <div className="flex justify-end">
        <div className="relative flex flex-wrap items-stretch p-4 mb-4">
          <button
            type="button"
            className="p-4 text-xl text-white bg-blue-500 rounded w-36"
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
