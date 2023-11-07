const express = require('express');
const router = express.Router();

// GET 요청에 대한 라우팅
router.get('/users', (req, res) => {
  // 이 부분에 사용자 목록을 반환하는 코드를 작성합니다.
  // 예를 들어, 데이터베이스에서 사용자 정보를 가져와서 클라이언트에게 반환할 수 있습니다.
  // 여기에서는 간단한 응답을 보내는 예제를 제공하겠습니다.
  res.send('사용자 목록을 가져옵니다.');
});

module.exports = router;