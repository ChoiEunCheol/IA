const fs = require("fs");
const util = require("util");
const readFileAsync = util.promisify(fs.readFileSync);

async function readFile() {
  try {
    const data = await readFileAsync("example.txt", "utf8");
    console.log("파일 읽기 완료:", data);
  } catch (err) {
    console.error("파일 읽기 오류:", err);
  }
}

readFile();
console.log("다음 작업을 계속합니다.");
