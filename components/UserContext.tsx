import {
  useReducer,
  useContext,
  createContext,
  Dispatch,
} from 'react';
// 상태를 위한 타입
type State = {
  locale: string;
};

// 모든 액션들을 위한 타입
type Action = { type: 'SET_LOCALE'; locale: string };

// 디스패치를 위한 타입 (Dispatch 를 리액트에서 불러올 수 있음), 액션들의 타입을 Dispatch 의 Generics로 설정
type SampleDispatch = Dispatch<Action>;

// Context 만들기
const StateContext = createContext<State>({ locale: 'ko' });
const DispatchContext = createContext<SampleDispatch>(() => null);

// 리듀서
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_LOCALE':
      return {
        ...state,
        locale: action.locale,
      };
    default:
      throw new Error('Unhandled action');
  }
}

// SampleProvider 에서 useReduer를 사용하고
// StateContext.Provider 와 DispatchContext.Provider 로 children 을 감싸서 반환합니다.
export function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, {
    locale: 'ko',
  });

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

// state 와 dispatch 를 쉽게 사용하기 위한 커스텀 Hooks
export function useUserState(): State {
  const state = useContext(StateContext);
  return state;
}

export function useUserDispatch(): SampleDispatch {
  const dispatch = useContext(DispatchContext);
  return dispatch;
}
