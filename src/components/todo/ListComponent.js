import { useEffect, useState } from "react";
import { getList } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const ListComponent = () => {
  const { page, size } = useCustomMove();

  const [serverData, setServerData] = useState(initState);

  useEffect(() => {
    getList({ page, size }).then((data) => {
      console.log(data);
      setServerData(data);
    });
    // .catch(err => {
    //     console.log(err);
    // });
  }, [page, size]);

  return (
    <div className="mt-10 ml-2 mr-2 border-2 border-blue-100">
      <div className="flex flex-wrap justify-center p-6 mx-auto">
        {serverData.dtoList.map((todo) => (
          <div
            key={todo.tno}
            className="w-full min-w-[400px] p-2 m-2 rounded shadow-md"
          >
            <div className="flex">
              <div className="w-1/12 p-2 text-2xl font-extrabold">
                {todo.tno}
              </div>
              <div className="w-8/12 p-2 m-1 font-extrabold text-1xl">
                {todo.title}
              </div>
              <div className="p-2 m-1 font-medium w-2/10 text-1xl">
                {todo.dueDate}
              </div>
            </div>
          </div>
        ))}
        Todo List Component
      </div>
    </div>
  );
};

export default ListComponent;
