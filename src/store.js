import { configureStore } from "@reduxjs/toolkit";

/*
    configureStore()의 파라미터에는 설정에 필요한 정보들을 객체로 전달하며,
    reducer라는 속성으로 '리듀서(Reducer)'라고 불리는 함수들을 지정하여 사용하게 된다.

    이렇게 생성한 store로 프로젝트의 index.js 의 내용을 감싸준다.
*/

export default configureStore({
  reducer: {},
});
