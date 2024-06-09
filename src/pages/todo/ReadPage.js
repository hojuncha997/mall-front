import { useCallback } from "react";
import {
  useNavigate,
  useParams,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";

const ReadPage = () => {
  const { tno } = useParams();
  const navigate = useNavigate();

  const [queryParams] = useSearchParams();

  const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1;
  const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10;

  // 쿼리스트링 생성
  const queryStr = createSearchParams({ page, size }).toString();

  //   개별 상세화면에서 수정 페이지로 쿼리스트링을 유지하면서 이동
  const moveToModify = useCallback(
    (tno) => {
      // navigate의 search 프로퍼티의 값으로 queryStr을 넘김
      navigate({ pathname: `/todo/modify/${tno}`, search: queryStr });
    },
    [tno]
  );

  //   상세화면에서 리스트로 쿼리스트링을 유지하면서 이동
  const moveToList = useCallback(() => {
    navigate({ pathname: `/todo/list`, search: queryStr });
  }, [page, size]);

  return (
    <>
      <div className="text-3xl font-extrabold">
        Todo Read Page Component {tno}
        <div>
          <button onClick={() => moveToModify(33)}> Test Modify</button>
          <button onClick={() => moveToList()}> Test List</button>
        </div>
      </div>
    </>
  );
};

export default ReadPage;
