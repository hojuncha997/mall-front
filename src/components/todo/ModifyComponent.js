import { useEffect, useState } from "react";
import { getOne, putOne, deleteOne } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import ResultModal from "../common/ResultModal";

const initState = {
  tno: 0,
  title: "",
  writer: "",
  dueDate: "null",
  complete: false,
};

const ModifyComponent = ({ tno }) => {
  const [todo, setTodo] = useState({ ...initState });

  // 모달창을 위한 상태
  const [result, setResult] = useState(null);
  // 이동을 위한 기능
  const { moveToList, moveToRead } = useCustomMove();

  useEffect(() => {
    getOne(tno).then((data) => setTodo(data));
  }, [tno]);

  const handleChangeTodo = (event) => {
    todo[event.target.name] = event.target.value;
    setTodo({ ...todo });
  };

  const handleChangeTodoComplete = (event) => {
    const value = event.target.value;
    todo.complete = value === "Y";
    setTodo({ ...todo });
  };

  //   수정버튼 클릭 시
  const handleClickModify = () => {
    putOne(todo).then((data) => {
      // console.log("modify result: " + data);
      setResult("Modified");
    });
  };

  //   삭제버튼 클릭 시
  const handleClickDelete = () => {
    deleteOne(tno).then((data) => {
      // console.log("delete result: " + data);
      setResult("Deleted");
    });
  };

  // 모달 창이 close될 때
  const closeModal = () => {
    if (result === "Deleted") {
      moveToList();
    } else {
      // 수정된 내용을 다시 읽어오기
      moveToRead(tno);
    }
  };

  return (
    <div className="p-4 m-2 mt-10 border-2 border-sky-200">
      {result ? (
        <ResultModal
          title={`처리결과`}
          content={result}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}
      <div className="flex justify-center mt-10">
        <div className="relative flex flex-wrap items-stretch w-full mb-4">
          <div className="w-1/5 p-6 font-bold text-right">TNO</div>
          <div className="w-4/5 p-6 bg-gray-100 border border-solid rounded-r shadow-md">
            {todo.tno}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative flex flex-wrap items-stretch w-full mb-4">
          <div className="w-1/5 p-6 font-bold text-right">WRITER</div>
          <div className="w-4/5 p-6 bg-gray-100 border border-solid rounded-r shadow-md">
            {todo.writer}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative flex flex-wrap items-stretch w-full mb-4">
          <div className="w-1/5 p-6 font-bold text-right">TITLE</div>
          <input
            className="w-4/5 p-6 border border-solid rounded-r shadow-md border-neutral-300"
            name="title"
            type={"text"}
            value={todo.title}
            onChange={handleChangeTodo}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative flex flex-wrap items-stretch w-full mb-4">
          <div className="w-1/5 p-6 font-bold text-right">DUEDATE</div>
          <input
            className="w-4/5 p-6 border border-solid rounded-r shadow-md border-neutral-300"
            name="dueDate"
            type={"date"}
            value={todo.dueDate}
            onChange={handleChangeTodo}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative flex flex-wrap items-stretch w-full mb-4">
          <div className="w-1/5 p-6 font-bold text-right">COMPLETE</div>
          <select
            name="status"
            className="p-2 m-1 border-2 border-solid rounded"
            onChange={handleChangeTodoComplete}
            value={todo.complete ? "Y" : "N"}
          >
            <option value="Y">Completed</option>
            <option value="N">Not Yet</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end p-4">
        <button
          type="button"
          className="w-32 p-4 m-2 text-xl text-white bg-red-500 rounded"
          onClick={handleClickDelete}
        >
          Delete
        </button>
        <button
          type="button"
          className="w-32 p-4 m-2 text-xl text-white bg-blue-500 rounded"
          onClick={handleClickModify}
        >
          Modify
        </button>
      </div>
    </div>
  );
};
export default ModifyComponent;
