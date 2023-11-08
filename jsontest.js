const fs = require('fs');
const filePath = 'test.json';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('파일 읽기 오류:', err);
    return;
  }

  // JSON 데이터 파싱
  const jsonData = JSON.parse(data);

  // 새로운 키와 값을 추가
  jsonData.newKey = '제이슨';

  // JSON 데이터를 다시 문자열로 변환
  const updatedData = JSON.stringify(jsonData, null, 2);

  // 파일 쓰기
  fs.writeFile(filePath, updatedData, (err) => {
    if (err) {
      console.error('파일 쓰기 오류:', err);
      return;
    }

    console.log('새로운 키와 값이 JSON 파일에 추가되었습니다.');
  });
});
