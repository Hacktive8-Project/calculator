// Ambil elemen-elemen DOM
const previousOperandElement = document.querySelector(".previous-operand");
const currentOperandElement = document.querySelector(".current-operand");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.getElementById("equals");
const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const percentageButton = document.getElementById("percentage");

// State kalkulator
let currentOperand = "0";
let previousOperand = "";
let operation = null;
let shouldResetScreen = false;

// Fungsi untuk update display
function updateDisplay() {
  currentOperandElement.textContent = formatNumber(currentOperand);

  if (operation !== null) {
    previousOperandElement.textContent = `${formatNumber(
      previousOperand
    )} ${operation}`;
  } else {
    previousOperandElement.textContent = "";
  }
}

// Format angka dengan pemisah ribuan
function formatNumber(number) {
  const stringNumber = number.toString();
  const integerDigits = parseFloat(stringNumber.split(".")[0]);
  const decimalDigits = stringNumber.split(".")[1];
  let integerDisplay;

  if (isNaN(integerDigits)) {
    integerDisplay = "";
  } else {
    integerDisplay = integerDigits.toLocaleString("id-ID", {
      maximumFractionDigits: 0,
    });
  }

  if (decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`;
  } else {
    return integerDisplay;
  }
}

// Fungsi untuk menambah angka
function appendNumber(number) {
  if (shouldResetScreen) {
    currentOperand = "";
    shouldResetScreen = false;
  }

  // Cegah multiple zeros di awal
  if (number === "0" && currentOperand === "0") return;

  // Cegah multiple decimal points
  if (number === "." && currentOperand.includes(".")) return;

  // Jika current operand adalah 0, ganti dengan angka baru (kecuali decimal)
  if (currentOperand === "0" && number !== ".") {
    currentOperand = number;
  } else {
    currentOperand += number;
  }

  updateDisplay();
}

// Fungsi untuk memilih operator
function selectOperator(operator) {
  if (currentOperand === "") return;

  if (previousOperand !== "" && !shouldResetScreen) {
    calculate();
  }

  operation = operator;
  previousOperand = currentOperand;
  currentOperand = "";
  shouldResetScreen = false;

  // Highlight operator button yang aktif
  operatorButtons.forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");

  updateDisplay();
}

// Fungsi untuk kalkulasi
function calculate() {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "×":
      computation = prev * current;
      break;
    case "÷":
      if (current === 0) {
        alert("Error: Pembagian dengan 0!");
        clear();
        return;
      }
      computation = prev / current;
      break;
    default:
      return;
  }

  currentOperand = computation.toString();
  operation = null;
  previousOperand = "";
  shouldResetScreen = true;

  // Remove active class dari semua operator
  operatorButtons.forEach((btn) => btn.classList.remove("active"));

  updateDisplay();
}

// Fungsi clear
function clear() {
  currentOperand = "0";
  previousOperand = "";
  operation = null;
  shouldResetScreen = false;
  operatorButtons.forEach((btn) => btn.classList.remove("active"));
  updateDisplay();
}

// Fungsi delete
function deleteNumber() {
  if (shouldResetScreen) {
    currentOperand = "0";
    shouldResetScreen = false;
  } else if (currentOperand.length === 1) {
    currentOperand = "0";
  } else {
    currentOperand = currentOperand.slice(0, -1);
  }
  updateDisplay();
}

// Fungsi percentage
function percentage() {
  const current = parseFloat(currentOperand);
  if (isNaN(current)) return;

  currentOperand = (current / 100).toString();
  shouldResetScreen = true;
  updateDisplay();
}

// Event listeners untuk number buttons
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.add("pressed");
    setTimeout(() => button.classList.remove("pressed"), 200);
    appendNumber(button.dataset.number);
  });
});

// Event listeners untuk operator buttons
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectOperator(button.dataset.operator);
  });
});

// Event listener untuk equals button
equalsButton.addEventListener("click", () => {
  equalsButton.classList.add("pressed");
  setTimeout(() => equalsButton.classList.remove("pressed"), 200);
  calculate();
});

// Event listener untuk clear button
clearButton.addEventListener("click", () => {
  clearButton.classList.add("pressed");
  setTimeout(() => clearButton.classList.remove("pressed"), 200);
  clear();
});

// Event listener untuk delete button
deleteButton.addEventListener("click", () => {
  deleteButton.classList.add("pressed");
  setTimeout(() => deleteButton.classList.remove("pressed"), 200);
  deleteNumber();
});

// Event listener untuk percentage button
percentageButton.addEventListener("click", () => {
  percentageButton.classList.add("pressed");
  setTimeout(() => percentageButton.classList.remove("pressed"), 200);
  percentage();
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") {
    appendNumber(e.key);
  } else if (e.key === ".") {
    appendNumber(".");
  } else if (e.key === "+" || e.key === "-") {
    selectOperator(e.key);
  } else if (e.key === "*") {
    selectOperator("×");
  } else if (e.key === "/") {
    e.preventDefault();
    selectOperator("÷");
  } else if (e.key === "Enter" || e.key === "=") {
    calculate();
  } else if (e.key === "Escape") {
    clear();
  } else if (e.key === "Backspace") {
    deleteNumber();
  } else if (e.key === "%") {
    percentage();
  }
});

// Initialize display
updateDisplay();
