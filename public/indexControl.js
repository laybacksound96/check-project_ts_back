const form = document.getElementById("form");
const result = document.getElementById("textarea");
const statusSpan = document.getElementById("status");
const submitBtn = document.getElementById("submitBtn");
const copyBtn = document.getElementById("copyBtn");
const subject = document.getElementById("subject");
const keyword = document.getElementById("keyword");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  copyBtn.innerText = "복사하기";
  submitBtn.disabled = true;
  statusSpan.innerText = "요청중입니다. 잠시만 기다려주세요.";
  await fetch("/getText", {
    method: "POST",
    body: JSON.stringify({ subject: subject.value, keyword: keyword.value }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      result.value = data;
      submitBtn.disabled = false;
      statusSpan.innerText = "완료!";
    });
});

copyBtn.addEventListener("click", () => {
  result.select();
  document.execCommand("copy");
  copyBtn.innerText = "복사 완료됨";
});
