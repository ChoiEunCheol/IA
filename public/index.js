document.addEventListener("DOMContentLoaded", function () {
  let userInfo; // userInfo를 전역 변수로 정의
  let logoInfo; // logoInfo를 전역 변수로 정의

  const inputField = document.getElementById("inputField");
  const submitButton = document.getElementById("submitButton");
  const smileyIcon = document.getElementById("smiley");
  const menuButton = document.querySelectorAll(".menu");
  const menuContainer = document.querySelector(".menu-container");
  const responseContainer = document.getElementById('responseContainer');

  function toggleMenu() {
    menuContainer.classList.toggle("menu-open");
  }

  menuButton.forEach(button => {
    button.addEventListener("click", toggleMenu);
  });

  submitButton.addEventListener("click", handleSubmit);

  function handleSubmit() {
    const inputData = inputField.value;
    const xhr = new XMLHttpRequest();

    xhr.open("POST", "/submit-data", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);

        const newDiv = createResponseDiv(`서버 응답: ${response.message}`, "response");
        responseContainer.prepend(newDiv);

        // userInfo를 설정하고 displayUserInfo를 호출
        userInfo = response.userInfo;
        displayUserInfo(userInfo);

        // logoInfo를 설정하고 setLogo를 호출
        logoInfo = response.logoInfo;
        setLogo(logoInfo.logo);

        // inputRecords 업데이트
        const inputRecords = response.inputRecords;
        displayInputRecords(inputRecords);

        // 서버 응답 후 스크롤을 가장 아래로 조절
        scrollToBottom();
      }
    };

    const dataToSend = JSON.stringify({ data: inputData });
    xhr.send(dataToSend);
  }

  function displayInputRecords(inputRecords) {
    const inputRecordsDiv = document.getElementById("responseContainer");
    inputRecordsDiv.innerHTML = '';

    inputRecords.forEach(record => {
      const responseDiv = createResponseDiv("","response");
      const messageDiv = createResponseDiv(`${record.message}`,"message");
      const infoDiv = createResponseDiv("","info");
      const typeDiv = createResponseDiv(`Type: ${record.type}`,"type");
      const timestampDiv = createResponseDiv(`Timestamp: ${record.timestamp}`,"timestamp");

      inputRecordsDiv.appendChild(responseDiv);
      responseDiv.appendChild(messageDiv);
      inputRecordsDiv.appendChild(infoDiv);
      infoDiv.appendChild(typeDiv);
      infoDiv.appendChild(timestampDiv);
    });
  }

  function displayUserInfo(userInfo) {
    const userInfoDiv = document.getElementById("userInfo");
    userInfoDiv.innerHTML = `이름: ${userInfo.name}, 상태: ${userInfo.status}, 아바타: ${userInfo.avatar}`;
  }

  // logoInfo를 설정하는 함수
  function setLogo(logoInfo) {
    smileyIcon.textContent = logoInfo;
  }

  function createResponseDiv(content, className) {
    const newDiv = document.createElement('div');
    newDiv.textContent = content;
    newDiv.classList = className;
    return newDiv;
  }

  // 클라이언트 측에서 모든 inputRecords를 삭제하는 함수
  function deleteAllInputRecords() {
    fetch('http://localhost:3000/delete-records', {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message); // 성공적인 삭제 메시지 출력
        responseContainer.innerHTML = ''; // 삭제 후 렌더링된 메시지 초기화
      })
      .catch(error => {
        console.error('Error deleting records:', error);
      });
  }

  // 예를 들어, 버튼 클릭 시 모든 inputRecords 삭제 기능을 실행
  smileyIcon.addEventListener("click", deleteAllInputRecords);

  // 스크롤을 가장 아래로 조절하는 함수
  function scrollToBottom() {
    responseContainer.scrollTop = responseContainer.scrollHeight;
  }
});
