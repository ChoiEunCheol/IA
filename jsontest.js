const fs = require('fs');
const filePath = 'test.json';

// 1. 파일 읽기
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('파일 읽기 오류:', err);
    return 
  }

  // 2. JSON 데이터 파싱
  const jsonData = JSON.parse(data);
  console.log(jsonData);
  
  // 3. 데이터 수정
  jsonData.userInfo.name = '새로운 이름';
  jsonData.userInfo.status = '오프라인';

  // 4. 수정된 데이터를 JSON 문자열로 변환
  const updatedData = JSON.stringify(jsonData, null, 2);

  // 5. 파일 쓰기
  fs.writeFile(filePath, updatedData, (err) => {
    if (err) {
      console.error('파일 쓰기 오류:', err);
      return;
    }

    console.log('파일이 업데이트되었습니다.');
  });
});
