document.addEventListener("DOMContentLoaded", function () {
  let userInfo; // userInfo를 전역 변수로 정의
  let logoInfo; // logoInfo를 전역 변수로 정의
  console.log(logoInfo);

  const inputField = document.getElementById("inputField");
  const submitButton = document.getElementById("submitButton");
  const responseDiv = document.getElementById("response");

  const menuButton = document.getElementsByClassName("menu");
  const menuContainer = document.querySelector(".menu-container");

  function toggleMenu() {
    if (menuContainer.classList.contains("menu-open")) {
      menuContainer.classList.remove("menu-open");
    } else {
      menuContainer.classList.add("menu-open");
    }
  }

  menuButton[0].addEventListener("click", function () {
    // 메뉴 버튼을 클릭했을 때 메뉴가 나타나도록 토글
    if (menuContainer.style.display === "block") {
      menuContainer.style.display = "none";
    } else {
      menuContainer.style.display = "block";
    }
  });

  menuButton[1].addEventListener("click", function () {
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

        // userInfo를 설정하고 displayUserInfo를 호출
        userInfo = response.userInfo;
        displayUserInfo(userInfo);

        // logoInfo를 설정하고 setLogo를 호출
        logoInfo = response.logoInfo;
        setLogo(logoInfo.logo);
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
  // 서버로부터 전송된 logoInfo 사용
  if (logoInfo) {
    setLogo(logoInfo.logo);
  }

  const h1 = document.getElementsByTagName("h1");
  h1[0].addEventListener("click", () => {
    console.log(userInfo, logoInfo);
  });
});
