const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

// 서버에 정적 파일 제공
app.use(express.static(path.join(__dirname, "public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.post("/submit-data", (req, res) => {
  const inputData = req.body.data;

  // 사용자 정보 및 로고 정보를 읽어와 클라이언트로 전송
  const userInfo = readUserInfo();
  //   console.log(userInfo);

  const logoInfo = readLogoInfo();
  console.log(`logoInfo : `, logoInfo.logo);

  res.json({
    message: `서버에서 받은 데이터: ${inputData}`,
    userInfo,
    logoInfo,
  }); // logoInfo를 서버 응답에 추가
});

app.get("/jsonfile", (req, res) => {
  const dataPath = path.join(__dirname, "data.json");
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
  const dataPath = path.join(__dirname, "data.json");
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
  const dataPath = path.join(__dirname, "data.json");
  try {
    const data = fs.readFileSync(dataPath, "utf8");
    const jsonData = JSON.parse(data);
    return jsonData.header;
  } catch (error) {
    console.error("로고 정보를 읽어오는 동안 오류 발생:", error);
    return {};
  }
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
