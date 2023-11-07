document.addEventListener('DOMContentLoaded', function () {
    const inputField = document.getElementById('inputField');
    const submitButton = document.getElementById('submitButton');
    const responseDiv = document.getElementById('response');

    submitButton.addEventListener('click', function () {
        const inputData = inputField.value;

        // AJAX 요청을 사용하여 서버에 데이터를 전송
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/submit-data', true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                responseDiv.innerHTML = `서버 응답: ${response.message}`;

                // 유저 정보를 출력
                displayUserInfo(response.userInfo);
            }
        };

        const dataToSend = JSON.stringify({ data: inputData });
        xhr.send(dataToSend);
    });

    // 유저 정보 출력 함수
    function displayUserInfo(userInfo) {
        const userInfoDiv = document.getElementById('userInfo');
        userInfoDiv.innerHTML = `이름: ${userInfo.name}, 상태: ${userInfo.status}, 아바타: ${userInfo.avatar}`;
    }
});
