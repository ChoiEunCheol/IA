* 이름 목록화 *

- id
responseContainer : POST 데이터가 기록 될 div
inputField : input Box

- 변수
responseDiv : [ response ] id를 가진 div태그

---------------------------------------------------
* 추가적으로 해야 될 작업 *
<!-- 1. 상단에 로고 (이모지폰트)와 햄버거 메뉴 표시 -->
<!-- 2. 사용자 프롬프트 입력창 제공 -->
<!-- 3. 사용자의 메시지 입력 및 서버로의 데이터 전송 (POST 요청) -->
4. 서버로부터 받은 응답을 오른쪽 입력 기록창에 추가 (GET 요청)
5. 왼쪽 하단에 사용자 정보 (이름, 상태, 아바타 이미지) 표시
6. 입력 받은 데이터를 임의의 JSON 파일에 데이터 저장
  (이거를 중점으로 해봐야 할 듯)

a. 이름, 상태, 이미지를 직접 정할 수 있는지
b. css로 꾸미기
c. style.json에 있는 서식 사용하기

- **에러 핸들링**
- **데이터 유효성 검사**
- **페이지네이션**
- **리팩토링**

- ## GPT 사용 내역 정리하기

---------------------------------------------------
피드백 내용
1. package.json에 "main" 수정하기
2. readme 넘버링
3. XML, fetch의 장단점 정리
4. sync(동기) 지양 : 자바스크립트의 장점인 비동기처리를 가져갈 것
4-1. 동기와 비동기를 핸들링 가능한 수준까지 가면 최고
5. 에러처리는 try에서 하는 것이 좋음(Develope-25 참고)
6. 객체 접근을 [ ]로 하는 방법
7. 주석처리로 설명하기