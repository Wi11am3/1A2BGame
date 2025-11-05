function generateAnswer() {
  const digits = [];
  while (digits.length < 4) {
    const num = Math.floor(Math.random() * 10);
    if (!digits.includes(num)) {
      digits.push(num);
    }
  }
  return digits.join("");
}

// 檢查猜測結果
function checkGuess(answer, guess) {
  let a = 0;
  let b = 0;

  for (let i = 0; i < answer.length; i++) {
    if (guess[i] === answer[i]) {
      a++;
    } else if (answer.includes(guess[i])) {
      b++;
    }
  }

  const result = `${a}A${b}B`;
  return result;
}

// 驗證輸入
function confirmValidInput(guess) {
  if (!guess || guess.length !== 4) {
    return "請輸入 4 位數字！";
  }

  if (!/^\d{4}$/.test(guess)) {
    return "請只輸入數字！";
  }

  const noRepeatNumber = new Set(guess);
  if (noRepeatNumber.size !== 4) {
    return "數字不能重複！";
  }

  return null;
}

// 遊戲狀態變數
let answer = generateAnswer();
let attempts = 0;
let gameOver = false;

function makeGuess() {
  if (gameOver) {
    return;
  }

  const guessInput = document.getElementById("guessInput");
  const guess = guessInput.value; //取得猜數字的值
  const errorMessage = document.getElementById("errorMessage");

  const error = confirmValidInput(guess);

  if (error) {
    errorMessage.innerHTML = `<strong>${error}</strong>`;
    return;
  }

  errorMessage.textContent = "";
  attempts++;
  document.getElementById("attemptCount").textContent = attempts;

  const result = checkGuess(answer, guess);

  const historyList = document.getElementById("historyList");
  const historyItem = document.createElement("div");
  historyItem.classList.add("history-item"); //等同於這個 historyItem.className = "history-item";

  let badgeClass = "text-bg-secondary";
  if (result === "4A0B") {
    badgeClass = "text-bg-success";
  } else if (result.startsWith("3A") || result.startsWith("2A")) {
    badgeClass = "text-bg-warning";
  } else if (result.startsWith("1A")) {
    badgeClass = "text-bg-info";
  }

  historyItem.innerHTML = `
        <span>第 ${attempts} 次：<strong>${guess}</strong></span>
        <span class="badge ${badgeClass} result-badge">${result}</span>`;
  historyList.insertBefore(historyItem, historyList.firstChild);

  if (result === "4A0B") {
    gameOver = true;
    const winMessage = document.getElementById("winMessage");
    winMessage.className = "alert alert-success";
    winMessage.innerHTML = `恭喜!你用<strong>${attempts}</strong>次猜對了! 答案是<strong>${answer}</strong>`;

    guessInput.disabled = true;
  }
}
function resetGame() {
  answer = generateAnswer();
  attempts = 0;
  gameOver = false;
  document.getElementById("attemptCount").textContent = "0";
  document.getElementById("historyList").textContent = "";
  document.getElementById("errorMessage").textContent = "";
  document.getElementById("winMessage").textContent = "";
  const guessInput = document.getElementById("guessInput");
  guessInput.disabled = false;
  guessInput.value = "";
  //   guessInput.focus();
}

function peekAnswer() {
  alert(`答案是:${answer}`);
}

document
  .getElementById("guessInput")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      makeGuess();
    }
  });

document.getElementById(guessInput).focus();
