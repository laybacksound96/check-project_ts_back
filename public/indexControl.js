const form = document.getElementById("form");

const result = document.getElementById("textarea");
const statusSpan = document.getElementById("status");
const submitBtn = document.getElementById("submitBtn");
const copyBtn = document.getElementById("copyBtn");
const subject = document.getElementById("subject");
const keyword = document.getElementById("keyword");

//
const researchForm = document.getElementById("research-form");
const researchResult = document.getElementById("research-textarea");
const researchStatusSpan = document.getElementById("research-status");
const researchSubmitBtn = document.getElementById("research-submitBtn");
const researchCopyBtn = document.getElementById("research-copyBtn");
const researchSelectBox = document.getElementById("research-selectBox");
const researchKeyword = document.getElementById("research-keyword");

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

researchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  researchCopyBtn.innerText = "복사하기";
  submitBtn.disabled = true;
  researchSubmitBtn.disabled = true;
  researchStatusSpan.innerText = "요청중입니다. 잠시만 기다려주세요.";
  await fetch("/getResearch", {
    method: "POST",
    body: JSON.stringify({ subject: researchSelectBox.value, keyword: researchKeyword.value }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      researchResult.value = data;
      submitBtn.disabled = false;
      researchSubmitBtn.disabled = false;
      researchStatusSpan.innerText = "완료!";
    });
});
