const fs = require("fs");

// 비동기 파일 읽기
fs.readFileSync("example.txt", "utf8", (err, data) => {
  if (err) {
    console.error("파일 읽기 오류:", err);
    return;
  }
  console.log("파일 읽기 완료:", data);
});

console.log("다음 작업을 계속합니다."); // 비동기 작업이 완료되기 전에 실행됩니다.
