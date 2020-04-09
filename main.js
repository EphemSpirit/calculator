//THINGS TO ADD
//positive/negative button
//percent converter

let equalsPressed = false;

function clearCalc() {
  lowerOutputText.innerText = '';
  upperOutputText.innerText = '';
  equalsPressed = false;
}

function deleteLast() {
  if (equalsPressed) return; //stop people from taking numbers out of the result
  lowerOutputText.innerText = lowerOutputText.innerText.toString().slice(0, -1);
}

function displayNumber(number) {
  if ((number === '.') && (lowerOutputText.innerText.includes('.'))) return; //only one decimal per number
  lowerOutputText.innerText += number;
}

function takeOperator(operator) {
  if (!lowerOutputText.innerText) return; //don't select an operator before a number
  if (operator) {
    upperOutputText.innerText = calculate() + `${operator}`;
  }
  upperOutputText.innerText = lowerOutputText.innerText + `${operator}`;
  lowerOutputText.innerText = '';
}

function calculate(a, operator, b) {
  let result;

  a = Number(upperOutputText.innerText.toString().slice(0, -1));
  operator = upperOutputText.innerText.toString().slice(-1);
  b = Number(lowerOutputText.innerText);

  if (!operator) return; //do nothing if equals is pressed before an operator
  switch (operator) {
    case '+':
      result = parseFloat(a + b);
      break;

    case '-':
      result = parseFloat(a - b);
      break;

    case '*':
      result = parseFloat(a * b);
      break;

    case '/':
      if (b === 0) {
        result = 'Zero Division Error';
      } else {
        result = parseFloat(a / b);
      }
      break;

    default:
      return;
  }
  upperOutputText.innerText = '';
  lowerOutputText.innerText = parseFloat(result.toFixed(7));
}

//element selectors
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".backspace");
const equals = document.querySelector(".equals");
const upperOutputText = document.querySelector(".upper-output");
const lowerOutputText = document.querySelector(".lower-output");

//wire the buttons
clearButton.addEventListener("click", clearCalc);

deleteButton.addEventListener("click", deleteLast);

numbers.forEach(button => {
  button.addEventListener("click", () => {
    displayNumber(button.innerText);
  });
});

operators.forEach(button => {
  button.addEventListener("click", () => {
    takeOperator(button.innerText);
  });
});

equals.addEventListener("click", () => {
  calculate();
  equalsPressed = true;
});
