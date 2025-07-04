// Global Variables
let display = document.getElementById("display");
let historyDisplay = document.getElementById("historyDisplay");
let historyList = document.getElementById("historyList");
let historyPanel = document.getElementById("historyPanel");
let memoryIndicator = document.getElementById("memoryIndicator");

let currentExpression = "0";
let previousExpression = "";
let memory = 0;
let history = [];
let angleMode = "deg"; // 'deg' or 'rad'
let shouldResetDisplay = false;

// Constants
const PI = Math.PI;
const E = Math.E;

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  updateDisplay();
  loadHistory();

  // Mode toggle event listeners
  document
    .getElementById("degBtn")
    .addEventListener("click", () => setAngleMode("deg"));
  document
    .getElementById("radBtn")
    .addEventListener("click", () => setAngleMode("rad"));

  // Keyboard support
  document.addEventListener("keydown", handleKeyPress);

  // Create overlay for history panel
  createHistoryOverlay();
});

// Display Functions
function updateDisplay() {
  display.value = currentExpression;

  // Auto-scroll to the right for long expressions
  display.scrollLeft = display.scrollWidth;
}

function updateHistoryDisplay(expression) {
  historyDisplay.textContent = expression || "";
}

// Number and Operator Functions
function appendNumber(num) {
  if (shouldResetDisplay || currentExpression === "0") {
    currentExpression = num;
    shouldResetDisplay = false;
  } else {
    currentExpression += num;
  }
  updateDisplay();
}

function appendOperator(operator) {
  if (shouldResetDisplay) {
    shouldResetDisplay = false;
  }

  // Prevent multiple operators in a row
  const lastChar = currentExpression.slice(-1);
  if (["+", "-", "*", "/", "^"].includes(lastChar) && operator !== "-") {
    currentExpression = currentExpression.slice(0, -1);
  }

  currentExpression += operator;
  updateDisplay();
}

function appendDecimal() {
  // Check if current number already has a decimal
  const parts = currentExpression.split(/[\+\-\*\/\^\(\)]/);
  const currentNumber = parts[parts.length - 1];

  if (!currentNumber.includes(".")) {
    if (currentNumber === "" || shouldResetDisplay) {
      currentExpression = shouldResetDisplay ? "0." : currentExpression + "0.";
      shouldResetDisplay = false;
    } else {
      currentExpression += ".";
    }
    updateDisplay();
  }
}

function appendFunction(func) {
  if (shouldResetDisplay) {
    currentExpression = func;
    shouldResetDisplay = false;
  } else if (currentExpression === "0") {
    currentExpression = func;
  } else {
    currentExpression += func;
  }
  updateDisplay();
}

function appendConstant(constant) {
  let value;
  switch (constant) {
    case "π":
      value = PI.toString();
      break;
    case "e":
      value = E.toString();
      break;
    default:
      value = constant;
  }

  if (shouldResetDisplay || currentExpression === "0") {
    currentExpression = value;
    shouldResetDisplay = false;
  } else {
    currentExpression += value;
  }
  updateDisplay();
}

// Clear Functions
function clearAll() {
  currentExpression = "0";
  previousExpression = "";
  updateDisplay();
  updateHistoryDisplay("");
}

function clearEntry() {
  currentExpression = "0";
  updateDisplay();
}

function backspace() {
  if (currentExpression.length > 1) {
    currentExpression = currentExpression.slice(0, -1);
  } else {
    currentExpression = "0";
  }
  updateDisplay();
}

// Calculation Functions
function calculate() {
  try {
    // Store original expression for history
    const originalExpression = currentExpression;

    // Prepare expression for evaluation
    let expression = prepareExpression(currentExpression);

    // Evaluate the expression
    let result = evaluateExpression(expression);

    // Format the result
    result = formatResult(result);

    // Add to history
    addToHistory(originalExpression, result);

    // Update displays
    updateHistoryDisplay(originalExpression + " =");
    currentExpression = result.toString();
    shouldResetDisplay = true;
    updateDisplay();
  } catch (error) {
    display.classList.add("error");
    currentExpression = "Error";
    updateDisplay();
    setTimeout(() => {
      display.classList.remove("error");
      currentExpression = "0";
      updateDisplay();
    }, 2000);
  }
}

function prepareExpression(expr) {
  // Replace display symbols with JavaScript operators
  expr = expr.replace(/×/g, "*");
  expr = expr.replace(/÷/g, "/");
  expr = expr.replace(/−/g, "-");
  expr = expr.replace(/π/g, PI);
  expr = expr.replace(/e/g, E);
  expr = expr.replace(/\^/g, "**");

  // Replace functions
  expr = expr.replace(/sin\(/g, "Math.sin(");
  expr = expr.replace(/cos\(/g, "Math.cos(");
  expr = expr.replace(/tan\(/g, "Math.tan(");
  expr = expr.replace(/asin\(/g, "Math.asin(");
  expr = expr.replace(/acos\(/g, "Math.acos(");
  expr = expr.replace(/atan\(/g, "Math.atan(");
  expr = expr.replace(/sinh\(/g, "Math.sinh(");
  expr = expr.replace(/cosh\(/g, "Math.cosh(");
  expr = expr.replace(/tanh\(/g, "Math.tanh(");
  expr = expr.replace(/log\(/g, "Math.log10(");
  expr = expr.replace(/ln\(/g, "Math.log(");
  expr = expr.replace(/√\(/g, "Math.sqrt(");
  expr = expr.replace(/∛\(/g, "Math.cbrt(");
  expr = expr.replace(/abs\(/g, "Math.abs(");

  // Handle percentage
  expr = expr.replace(/(\d+)%/g, "($1/100)");

  // Convert angles if in degree mode
  if (angleMode === "deg") {
    // Convert degree input to radians for trig functions
    expr = expr.replace(
      /Math\.sin\(([\d\.\+\-\*\/\(\)]+)\)/g,
      (match, angle) => {
        return `Math.sin((${angle}) * ${PI / 180})`;
      }
    );
    expr = expr.replace(
      /Math\.cos\(([\d\.\+\-\*\/\(\)]+)\)/g,
      (match, angle) => {
        return `Math.cos((${angle}) * ${PI / 180})`;
      }
    );
    expr = expr.replace(
      /Math\.tan\(([\d\.\+\-\*\/\(\)]+)\)/g,
      (match, angle) => {
        return `Math.tan((${angle}) * ${PI / 180})`;
      }
    );

    // Convert radians output to degrees for inverse trig functions
    expr = expr.replace(
      /Math\.asin\(([\d\.\+\-\*\/\(\)]+)\)/g,
      (match, value) => {
        return `(Math.asin(${value}) * ${180 / PI})`;
      }
    );
    expr = expr.replace(
      /Math\.acos\(([\d\.\+\-\*\/\(\)]+)\)/g,
      (match, value) => {
        return `(Math.acos(${value}) * ${180 / PI})`;
      }
    );
    expr = expr.replace(
      /Math\.atan\(([\d\.\+\-\*\/\(\)]+)\)/g,
      (match, value) => {
        return `(Math.atan(${value}) * ${180 / PI})`;
      }
    );
  }

  return expr;
}

function evaluateExpression(expr) {
  // Create a safe evaluation function
  const func = new Function("Math", "return " + expr);
  return func(Math);
}

function formatResult(result) {
  // Check if result is a number
  if (typeof result !== "number" || isNaN(result)) {
    throw new Error("Invalid result");
  }

  // Handle very large or very small numbers
  if (Math.abs(result) > 1e10 || (Math.abs(result) < 1e-10 && result !== 0)) {
    return result.toExponential(6);
  }

  // Round to avoid floating point errors
  return Math.round(result * 1e10) / 1e10;
}

// Special Functions
function toggleSign() {
  if (currentExpression !== "0") {
    if (currentExpression.startsWith("-")) {
      currentExpression = currentExpression.substring(1);
    } else {
      currentExpression = "-" + currentExpression;
    }
    updateDisplay();
  }
}

function reciprocal() {
  try {
    const value = evaluateExpression(prepareExpression(currentExpression));
    currentExpression = (1 / value).toString();
    updateDisplay();
  } catch (error) {
    currentExpression = "Error";
    updateDisplay();
  }
}

function square() {
  currentExpression = `(${currentExpression})^2`;
  updateDisplay();
}

function cube() {
  currentExpression = `(${currentExpression})^3`;
  updateDisplay();
}

function factorial() {
  try {
    const value = evaluateExpression(prepareExpression(currentExpression));
    if (value < 0 || value % 1 !== 0) {
      throw new Error("Invalid input for factorial");
    }
    let result = 1;
    for (let i = 2; i <= value; i++) {
      result *= i;
    }
    currentExpression = result.toString();
    updateDisplay();
  } catch (error) {
    currentExpression = "Error";
    updateDisplay();
  }
}

// Memory Functions
function memoryClear() {
  memory = 0;
  memoryIndicator.classList.remove("active");
}

function memoryRecall() {
  currentExpression = memory.toString();
  updateDisplay();
}

function memoryAdd() {
  try {
    const value = evaluateExpression(prepareExpression(currentExpression));
    memory += value;
    memoryIndicator.classList.add("active");
  } catch (error) {
    // Handle error silently
  }
}

function memorySubtract() {
  try {
    const value = evaluateExpression(prepareExpression(currentExpression));
    memory -= value;
    memoryIndicator.classList.add("active");
  } catch (error) {
    // Handle error silently
  }
}

function memoryStore() {
  try {
    memory = evaluateExpression(prepareExpression(currentExpression));
    memoryIndicator.classList.add("active");
  } catch (error) {
    // Handle error silently
  }
}

// Angle Mode Functions
function setAngleMode(mode) {
  angleMode = mode;
  document.getElementById("degBtn").classList.toggle("active", mode === "deg");
  document.getElementById("radBtn").classList.toggle("active", mode === "rad");
}

// History Functions
function addToHistory(expression, result) {
  const historyItem = {
    expression: expression,
    result: result,
    timestamp: new Date().toISOString(),
  };

  history.unshift(historyItem);

  // Limit history to 50 items
  if (history.length > 50) {
    history.pop();
  }

  saveHistory();
  updateHistoryDisplay();
}

function updateHistoryDisplay() {
  historyList.innerHTML = "";

  history.forEach((item, index) => {
    const historyElement = document.createElement("div");
    historyElement.className = "history-item";
    historyElement.innerHTML = `
            <div class="history-expression">${item.expression}</div>
            <div class="history-result">= ${item.result}</div>
        `;
    historyElement.onclick = () => loadFromHistory(item);
    historyList.appendChild(historyElement);
  });
}

function loadFromHistory(item) {
  currentExpression = item.result.toString();
  updateDisplay();
  toggleHistory();
}

function clearHistory() {
  history = [];
  saveHistory();
  updateHistoryDisplay();
}

function saveHistory() {
  localStorage.setItem("calculatorHistory", JSON.stringify(history));
}

function loadHistory() {
  const saved = localStorage.getItem("calculatorHistory");
  if (saved) {
    history = JSON.parse(saved);
    updateHistoryDisplay();
  }
}

function toggleHistory() {
  historyPanel.classList.toggle("active");
  document.getElementById("historyOverlay").classList.toggle("active");
}

function createHistoryOverlay() {
  const overlay = document.createElement("div");
  overlay.id = "historyOverlay";
  overlay.className = "history-overlay";
  overlay.onclick = toggleHistory;
  document.body.appendChild(overlay);
}

// Keyboard Support
function handleKeyPress(event) {
  const key = event.key;

  // Prevent default behavior for certain keys
  if (["Enter", "Escape", "Backspace"].includes(key)) {
    event.preventDefault();
  }

  // Number keys
  if (key >= "0" && key <= "9") {
    appendNumber(key);
  }
  // Operators
  else if (key === "+") appendOperator("+");
  else if (key === "-") appendOperator("-");
  else if (key === "*") appendOperator("*");
  else if (key === "/") appendOperator("/");
  else if (key === "^") appendOperator("^");
  else if (key === "%") appendOperator("%");
  // Special keys
  else if (key === ".") appendDecimal();
  else if (key === "(") appendOperator("(");
  else if (key === ")") appendOperator(")");
  else if (key === "Enter" || key === "=") calculate();
  else if (key === "Escape") clearAll();
  else if (key === "Backspace") backspace();
  else if (key === "Delete") clearEntry();
}

// Error Handling
window.addEventListener("error", function (event) {
  console.error("Calculator error:", event.error);
  currentExpression = "0";
  updateDisplay();
});
