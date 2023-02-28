const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clearBtn");

// Object to calculate first and second values depending on operator
const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
};

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

const sendNumberValue = (number) => {
  // Replace current display value if firstValue is entered
  // innerHTML or innerText can be used instead of textContent: https://builtin.com/software-engineering-perspectives/innerhtml-vs-innertext
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    //   if current display value is 0, replace it, if not, add number
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
};

const addDecimal = () => {
  // if an operator is pressed, don't add decimal (done with early return)
  if (awaitingNextValue) return;
  // if no decimal, add one
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
};

const useOperator = (operator) => {
  // Convert to number
  const currentValue = Number(calculatorDisplay.textContent);

  //   Prevent multiple operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  // Assign firstValue if no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    // Must be in this order to allow for calculations
    const calculation = calculate[operatorValue](firstValue, currentValue);
    // Adds calculation to the screen
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }

  //   Ready for next value, store operator
  awaitingNextValue = true;
  operatorValue = operator;
};

// Reset all values, display
const resetAll = () => {
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
  calculatorDisplay.textContent = "0";
};

// Add Event Listeners for numbers, operators and decimal buttons
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.contains("numbers")) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal());
  }
});

// Event Listener
clearBtn.addEventListener("click", resetAll);
