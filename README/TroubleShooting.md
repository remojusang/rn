## 트러블 슈팅

1. 

- 상황

	출력하고자 하는 문자에 `textTransform: 'capitalize'`가 css 속성이 적용되어 있어서 테스트 코드의 기대값도 마찬가지로 capitalize 하였으나 테스트가 실패함.

- 원인

	react-native의 테스팅 환경은 생애주기상 `StyleSheet`가 적용되기 전이다. 그래서 `StyleSheet`와 관련된 테스트를 진행할 때에도 `StyleSheet` 자체를 mocking을 해주어야 한다.

2. 

