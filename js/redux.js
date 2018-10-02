//ref.Velopert blog : 리덕스(Redux)를 왜 쓸까? 1편(https://velopert.com/3528)

const elNumber = document.getElementById('number');
const btnIncrement = document.getElementById('increment');
const btnDecrement = document.getElementById('decrement');

/* action type 정의 */
//자신이 속한 부서의 상태(state)를 변하게 하는 클라이언트의 요청(action) 정의
//action과 (현재)state를 redux store에 전달하면 reducer가
//액션타입에 따라 업테이트 로직을 정의, 새로운 state객체를 만들어 반환한다.
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

/* action object를 만들어 주는 action 생성함수 정의 */
//자신이 속한 부서의 상태(state)변화를 redux store에 알리기 위해 store.dispatch(action())에서 사용
const increment = (diff) => ({ type: INCREMENT, diff: diff });
const decrement = () => ({ type: DECREMENT });

// state 초기화
const initState = {
  number: 0
};

/* redux store의 reducer 직원 채용 */
// 1. state와 action을 parameter로 받아옴
// 2. parameter를 참고하여 action에 따라 다음 상태(state)를 정의한 후
//    subscribe 요청한 부서에 state oject 반환. state 불변성 유지는 필수!
const counter = (state = initState, action) => {
  console.log(action);
  switch(action.type) {
    case INCREMENT:
      return {
        number: state.number + action.diff
      };
    case DECREMENT:
      return {
        number: state.number - 1
      };
    default:
      return state;
  }
}

/* redux store 부서 오픈(a.k.a. 'Component Tree 회사(이하 CT회사)' 상태관리전담부서) */
//redux store 정의: createStore에 reducer 함수를 넣어서 호출
//createStore( 'store의 초기상태 or 미들웨어' 넣을 수 있음)
const { createStore } = Redux;//redux store 부서 만들기
const store = createStore(counter);//redux 부서의 직원으로 reducer를 채용

/* redux store의 CT회사 상태변화 알리미 업무서비스인 'listener' 준비 */
//listener 정의: redux store 부서에서 CT회사 하위 각 부서의 상태변화를 인지하면
//subscribe 신청한 Component 개별부서에게 listener 업무서비스를 통해 변화를 알리고
//변화한 Component 부서의 새로운 상태를 보내줌
const render = () => { //listener 업무서비스
  elNumber.innerText = store.getState().number;
  console.log('listener 실행!')
}

/* Component 부서G가 redux store 부서에 subscrbe 업무서비스 신청 */
//subscribe 정의: Component 부서G가 redux store에 subscribe 신청을 하면
//redux store 부서로부터 listener 업무서비스를 받을 수 있다.
store.subscribe(render);

/* redux store의 부서G에 대한 listener 업무서비스 개시 */
render();

/* Component 부서B가 dispatch에 action을 담아 redux store 부서에 부서B의 상태업데이트 요청  */
//Component 부서B에 고객(Client)이 물건거래요청(action)을 보내오면 Component 부서B는
//redux store 부서에 요청건을 알려( dispatch(action) )부서B의 상태를 업데이트 한다.
//그러면 부서B와 협업하는 부서G는(부서G는 업무상 이미 listener 서비스 신청을 했어야 한다)
//subscribe 서비스를 통해 부서B의 상태변화(고객 물건거래요청)를 인지할 수 있다.
//이하 부서B의 고객요청 button event 정의
btnIncrement.addEventListener('click', () => {
  store.dispatch(increment(25));//dispatch에 increment action을 담아 redux store에 변화를 일으킴
})

btnDecrement.addEventListener('click', () => {
  store.dispatch(decrement());//dispatch에 decrement action을 담아 redux store에 변화를 일으킴
})
