// 서버에서 결과를 가져오는 작업이 완료되기 전에 보여주는 모달(로딩창)

const FetchingModal = () => {
  return (
    <div
      className={`fixed top-0 left-0 z-[1055] flex h-full w-full place-items-center justify-center bg-black bg-opacity-20`}
    >
      <div className="bg-white rounded-3xl opacity-100 min-w-min h-1/4 min-w-[600px] flex justify-center items-center">
        <div className="text-4xl font-extrabold text-orange-400 m-20">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default FetchingModal;
