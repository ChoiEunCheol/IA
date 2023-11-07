document.addEventListener("DOMContentLoaded", function () {
  let userInfo; // userInfo를 전역 변수로 정의
  let logoInfo; // logoInfo를 전역 변수로 정의
  const inputField = document.getElementById("inputField");
  const submitButton = document.getElementById("submitButton");
  const responseDiv = document.getElementById("response");
  const smileyIcon = document.getElementById("smiley");
  const menuButton = document.getElementById("menu");
  const menuContainer = document.querySelector(".menu-container");

  menuButton.addEventListener("click", function () {
    // 메뉴 버튼을 클릭했을 때 메뉴가 나타나도록 토글
    if (menuContainer.style.display === "block") {
      menuContainer.style.display = "none";
    } else {
      menuContainer.style.display = "block";
    }
  });
  submitButton.addEventListener("click", function () {
    const inputData = inputField.value;

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/submit-data", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        responseDiv.innerHTML = `서버 응답: ${response.message}`;

        // userInfo와 logoInfo를 전역 변수에 할당
        userInfo = response.userInfo;
        logoInfo = response.logoInfo;

        displayUserInfo(userInfo);

        // 서버로부터 전송된 logoInfo 사용
        if (logoInfo) {
          setLogo(logoInfo);
        }
      }
    };

    const dataToSend = JSON.stringify({ data: inputData });
    xhr.send(dataToSend);
  });

  function displayUserInfo(userInfo) {
    const userInfoDiv = document.getElementById("userInfo");
    userInfoDiv.innerHTML = `이름: ${userInfo.name}, 상태: ${userInfo.status}, 아바타: ${userInfo.avatar}`;
  }

  // logoInfo를 설정하는 함수
  function setLogo(logoInfo) {
    // smileyIcon을 로고로 설정
    smileyIcon.textContent = logoInfo;
  }

  const h1 = document.getElementsByTagName("h1");
  h1[0].addEventListener("click", () => {
    // 이제 userInfo와 logoInfo를 사용할 수 있습니다.
    console.log(userInfo, logoInfo);
  });
});
