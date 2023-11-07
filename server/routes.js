// routes.js
const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

router.post('/submit-data', (req, res) => {
  const inputData = req.body.data;

  // 사용자 정보 및 로고 정보를 읽어와 클라이언트로 전송
  const userInfo = readUserInfo();
  console.log(userInfo);

  const logoInfo = readLogoInfo();
  console.log(logoInfo);


  res.json({ message: `서버에서 받은 데이터: ${inputData}`, userInfo, logoInfo }); // logoInfo를 서버 응답에 추가
});

function readUserInfo() {
  try {
    const dataPath = path.join(__dirname, 'data.json');
    const data = fs.readFileSync(dataPath, 'utf8');
    const jsonData = JSON.parse(data);
    return jsonData.mainContent.userInfo;
  } catch (error) {
    console.error('사용자 정보를 읽어오는 동안 오류 발생:', error);
    return {};
  }
}

function readLogoInfo() {
  try {
    const dataPath = path.join(__dirname, 'data.json');
    const data = fs.readFileSync(dataPath, 'utf8');
    const jsonData = JSON.parse(data);
    return jsonData.header.logo;
  } catch (error) {
    console.error('로고 정보를 읽어오는 동안 오류 발생:', error);
    return {};
  }
}

module.exports = router;
