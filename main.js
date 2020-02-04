const keypad = document.querySelector('#keypad');

//make the operator buttons
const add = document.createElement('button');
add.innerHTML = '+';
add.setAttribute("id", "addition");
keypad.appendChild(add).className = 'operator';

const subtract = document.createElement('button');
subtract.innerHTML = '-';
subtract.setAttribute("id", "subtraction");
keypad.appendChild(subtract).className = 'operator';

const multiply = document.createElement('button');
multiply.innerHTML = '*';
multiply.setAttribute("id", "multiplication")
keypad.appendChild(multiply).className = 'operator';

const divide = document.createElement('button');
divide.innerHTML = '/';
divide.setAttribute("id", "division")
keypad.appendChild(divide).className = 'operator';

const sign = document.createElement('button');
sign.innerHTML = '+/-';
keypad.appendChild(sign).className = 'pos-neg';

const equal = document.createElement('button');
equal.innerHTML = '=';
keypad.appendChild(equal).className = 'calculate';

const decimal = document.createElement('button');
decimal.innerHTML = '.';
keypad.appendChild(decimal).className = 'decimal';

const clear = document.createElement('button');
clear.innerHTML = 'C';
keypad.appendChild(clear).className = 'wipe';

function makeKeypad () {

  const height = 5;
  const width = 4;

  for (let i = 0; i < 10; i++) {
    const button = document.createElement('button');
    button.id = 'number' + i;
    button.innerHTML = i;
    keypad.appendChild(button).className = 'numeric';
  }
}

makeKeypad();

let equation = [];

//map the buttons to the display
const para = document.querySelector(".display");
const tally = document.querySelector("#running-tally");
const buttons = document.querySelectorAll(".numeric");
const operators = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".wipe");
const signButton = document.querySelector('.pos-neg');
const decimalPoint = document.querySelector('.decimal');
const equalButton = document.querySelector('.calculate');

buttons.forEach(button => {
  button.addEventListener("click", function () {
    para.innerHTML = '';
    para.innerHTML += Number(button.innerHTML);
    equation.push(button.innerHTML);
    tally.innerHTML += Number(equation[equation.length-1]);
    errorMessage();
  });
});

operators.forEach(operator => {
  operator.addEventListener("click", function () {
    tally.innerHTML += ' ' + operator.innerHTML + ' ';
    equation.push(operator.innerHTML);
  });
});

equalButton.addEventListener("click", function () {
  operate();
});

clearButton.addEventListener("click", function () {
  para.innerHTML = '';
  tally.innerHTML = '';
  equation = [];
});

signButton.addEventListener("click", function () {
  para.innerHTML = (+para.innerHTML)*-1;
  tally[tally.length-1] = tally[tally.length-1] * -1;
  tally.innerHTML = (+tally[tally.length-1]);
  equation[equation.length-1] = equation[equation.length-1] * -1;
});

decimalPoint.addEventListener("click", function () {
  para.innerHTML += '.';
  tally.innerHTML += '.';
  equation.push(decimalPoint.innerHTML);
});

function errorMessage () {
  const errorBox = document.querySelector('.errorBox');
  if (equation[0] === '+' || equation[0] === '-' || equation[0] === '*' || equation[0] === '/') {
    errorBox.innerHTML = "You'll give me an existential crisis, telling me to operate on nothing like that!"
  }
}

//refactor these, they're 99% identical
function multiplication (equation) {
  for (let i = 0; i < equation.length-1; i++) {
    if (equation[i] === '*') {
      equation[i-1] = equation[i-1] * equation[i+1];
      equation.splice(i, 2);
      if (equation.length > 1) {
        i = 0;
      }
    }
  }
}

function division (equation) {
  for (let i = 0; i < equation.length-1; i++) {
    if (equation[i] === '/') {
      equation[i-1] = equation[i-1] / equation[i+1];
      equation.splice(i, 2);
      if (equation.length > 1) {
        i = 0;
      }
    }
  }
}

function addition (equation) {
  for (let i = 0; i < equation.length-1; i++) {
    if (equation[i] === '+') {
      equation[i-1] = equation[i-1] + equation[i+1];
      equation.splice(i, 2);
      if (equation.length > 1) {
        i = 0;
      }
    }
  }
}

function subtraction (equation) {
  for (let i = 0; i < equation.length-1; i++) {
    if (equation[i] === '-') {
      equation[i-1] = equation[i-1] - equation[i+1];
      equation.splice(i, 2);
      if (equation.length > 1) {
        i = 0;
      }
    }
  }
}

function operate (equation) {
  multiplication(); //hardcode the order of operations
  division();
  addition();
  subtraction();
  let result = Math.round(equation);
  para.innerHTML = result;
}
