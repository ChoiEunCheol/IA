const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require("fs"); // 파일 시스템 모듈을 가져옵니다.

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

router.post("/submit-data", (req, res) => {
  const inputData = req.body.data;
  // 이전 코드에서 데이터 처리 로직을 작성합니다.

  // 사용자 정보를 읽어와 클라이언트로 전송
  const userInfo = readUserInfo(); // 사용자 정보를 읽어오는 함수

  res.json({ message: `서버에서 받은 데이터: ${inputData}, ${userInfo.name}`});
});

function readUserInfo() {
  try {
    // data.json 파일을 읽어 사용자 정보를 반환
    const dataPath = path.join(__dirname, "data.json");
    const data = fs.readFileSync(dataPath, "utf8");
    const jsonData = JSON.parse(data);
    console.log(jsonData.mainContent.userInfo);
    return jsonData.mainContent.userInfo;
  } catch (error) {
    console.error("사용자 정보를 읽어오는 동안 오류 발생:", error);
    return {};
  }
}

module.exports = router;
