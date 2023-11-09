document.addEventListener("DOMContentLoaded", function () {
  let userInfo; // userInfo를 전역 변수로 정의
  let logoInfo; // logoInfo를 전역 변수로 정의

  const inputField = document.getElementById("inputField");
  const submitButton = document.getElementById("submitButton");

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
  
        const newDiv = createResponseDiv(`서버 응답: ${response.message}`);
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
      }
    };
  
    const dataToSend = JSON.stringify({ data: inputData });
    xhr.send(dataToSend);
  }
  
  function displayInputRecords(inputRecords) {
    const inputRecordsDiv = document.getElementById("responseContainer");
    inputRecordsDiv.innerHTML = '';
  
    inputRecords.forEach(record => {
      const recordDiv = createResponseDiv(`Type: ${record.type}, Message: ${record.message}, Timestamp: ${record.timestamp}`);
      inputRecordsDiv.appendChild(recordDiv);
    });
  }

  function displayUserInfo(userInfo) {
    const userInfoDiv = document.getElementById("userInfo");
    userInfoDiv.innerHTML = `이름: ${userInfo.name}, 상태: ${userInfo.status}, 아바타: ${userInfo.avatar}`;
  }

  // logoInfo를 설정하는 함수
  function setLogo(logoInfo) {
    const smileyIcon = document.getElementById("smiley");
    smileyIcon.textContent = logoInfo;
  }

  function createResponseDiv(content) {
    const newDiv = document.createElement('div');
    newDiv.textContent = content;
    return newDiv;
  }

  // 서버로부터 전송된 logoInfo 사용
  if (logoInfo) {
    setLogo(logoInfo.logo);
  }
});