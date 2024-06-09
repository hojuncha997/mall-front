import { useCallback } from "react";
import {
  useNavigate,
  useParams,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";

import ReadComponent from "../../components/todo/ReadComponent";

const ReadPage = () => {
  const { tno } = useParams();
  //   쿼리스트링과 useNavigate를 사용하던 로직을 useCustomMove에 이관
  return (
    <div className="font-extrabold w-full bg-white mt-6">
      <div className="text-2xl">Todo Read Page Component {tno}</div>
      <ReadComponent tno={tno} />
    </div>
  );
};

export default ReadPage;
