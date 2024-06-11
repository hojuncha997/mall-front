const ResultModal = ({ title, content, callbackFn }) => {
  return (
    <>
      {/* 모달의 반투명한검은 배경 */}
      <div
        className={`fixed top-0 left-0 z-[1055] flex h-full w-full justify-center bg-black bg-opacity-20`}
        onClick={() => {
          if (callbackFn) callbackFn();
        }}
      >
        {/* 모달 본체 */}
        <div className="absolute bg-white shadow dark:bg-gray-700 opacity-100 w-1/4 rounded mt-10 mb-10 px-6 min-w-[600px]">
          {title}
          <div className="pt-4 pb-4 text-4xl border-b-4 border-orange-400">
            {content}
          </div>
          <div className="flex justify-end">
            <button
              className="px-6 pt-4 pb-4 mt-4 mb-4 text-lg text-white bg-blue-500 rounded"
              onClick={() => {
                if (callbackFn) callbackFn();
              }}
            >
              Close Modal
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultModal;
