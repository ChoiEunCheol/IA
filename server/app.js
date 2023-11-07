const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes'); // routes.js 파일을 포함

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/', routes); // 라우터를 애플리케이션에 연결

// 정적 파일을 서비스하기 위해 express.static 미들웨어를 사용합니다.
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
  // index.html 파일을 루트 경로('/')에서 반환합니다.
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});