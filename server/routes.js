// routes.js
const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require("fs");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.post("/submit-data", (req, res) => {
  const inputData = req.body.data;

  // 사용자 정보 및 로고 정보를 읽어와 클라이언트로 전송
  const userInfo = readUserInfo();
  //   console.log(userInfo);

  const logoInfo = readLogoInfo();
  // console.log(`logoInfo : `, logoInfo.logo);

  // inputRecords에 새로운 데이터 추가
  const newData = {
    type: userInfo.name,
    message: inputData,
    timestamp: 'time1',
  };

  const data = fs.readFileSync(dataPath, "utf8");
  const jsonData = JSON.parse(data);

  jsonData.mainContent.inputRecords.push(newData);

  // JSON 데이터를 다시 문자열로 변환
  // null, 2 는 가독성을 위해 ?
  const updatedData = JSON.stringify(jsonData, null, 2);

  // 파일 쓰기
  fs.writeFile(dataPath, updatedData, (err) => {
    if (err) {
      console.error("파일 쓰기 오류:", err);
      return res.status(500).json({ error: "데이터를 업데이트하지 못했습니다." });
    }

    // 업데이트된 데이터를 클라이언트로 응답
    res.json({
      message: `서버에서 받은 데이터: ${inputData}`,
      userInfo,
      logoInfo,
      inputRecords: jsonData.mainContent.inputRecords,
    });
  });
});

router.get("/stylejson", (req, res) => {
  try {
    const data = fs.readFileSync('../style.json', "utf8");
    const jsonData = JSON.parse(data);
    // 클라이언트에게 JSON 데이터 응답
    res.json(jsonData);
  } catch (error) {
    console.error("데이터를 읽어오는 동안 오류 발생:", error);
    res.status(500).json({ error: "데이터를 불러오지 못했습니다." });
  }
});

const dataPath = path.join(__dirname, "data.json");

router.get("/jsonfile", (req, res) => {
  try {
    const data = fs.readFileSync(dataPath, "utf8");
    const jsonData = JSON.parse(data);

    // 클라이언트에게 JSON 데이터 응답
    res.json(jsonData);
  } catch (error) {
    console.error("데이터를 읽어오는 동안 오류 발생:", error);
    res.status(500).json({ error: "데이터를 불러오지 못했습니다." });
  }
});

function readUserInfo() {
  try {
    const data = fs.readFileSync(dataPath, "utf8");
    const jsonData = JSON.parse(data);
    return jsonData.mainContent.userInfo;
  } catch (error) {
    console.error("사용자 정보를 읽어오는 동안 오류 발생:", error);
    return {};
  }
}

function readLogoInfo() {
  try {
    const data = fs.readFileSync(dataPath, "utf8");
    const jsonData = JSON.parse(data);
    return jsonData.header;
  } catch (error) {
    console.error("로고 정보를 읽어오는 동안 오류 발생:", error);
    return {};
  }
}


module.exports = router;
