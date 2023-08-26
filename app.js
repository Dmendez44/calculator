
let firstNum = "";
let operand = "";
let secondNum = "";
let total;
let normalExpression = [];
let clickedEquals = false;

const display = document.querySelector('.display');
const currentOp = document.querySelector('.currentOperation');
const previousOp = document.querySelector('.previousOperation')
const buttons = document.querySelectorAll('.btn');
const numButtons = document.querySelectorAll('.num')

function roundNumber(number) {
  const numAsStr = "" + number
  if (numAsStr.length > 13) {
    // round num to 13 decimals places
    const roundedNumber = Number(number.toFixed(10))
    return roundedNumber;
  } else {
    return number
  }
}

function clearCalc() {
  firstNum = "";
  operand = "";
  secondNum = "";
  total = undefined;
  normalExpression = [];
  clickedEquals = false;
  currentOp.textContent = 0
  previousOp.textContent = "";
}

function deleteNum(){
  if ((normalExpression.length !== 2 && normalExpression.length !== 1) && currentOp.textContent !== "0") {
    if (currentOp.textContent !== "0") {
      if (currentOp.textContent.length > 1) {
        // remove last appended 
        currentOp.textContent = currentOp.textContent.slice(0, -1)
      } else if (currentOp.textContent.length === 1) {
        currentOp.textContent = "0"
      }
    }
  }
}

function handleNumberClick(clickedValue) {
    if (clickedValue !== "." && currentOp.textContent === "0"|| normalExpression.length === 2) {
        currentOp.textContent = clickedValue;
    } else if (clickedValue === ".") {
        if (!currentOp.textContent.includes(".")) {
            currentOp.textContent += "."
        }
    } else if (clickedEquals && operand === ''){
      console.log('TRIGGERED');
      currentOp.textContent = clickedValue
      clickedEquals = false;
      previousOp.textContent = "";
      normalExpression = [];
    }
    else {
        currentOp.textContent += clickedValue;
    }

}

function handleOperandClick(clickedValue) {
    if (normalExpression.length === 0) {
        // then array is empty and we are storing firstNum
        firstNum = currentOp.textContent;
        operand = clickedValue;
        normalExpression[0] = operand;
        normalExpression[1] = firstNum;
        // here we also want to update previous OP
        previousOp.textContent = `${normalExpression[1]} ${normalExpression[0]}`
        let str = `${normalExpression[1]} ${normalExpression[0]}`.length;
        console.log(str);
    } else if (normalExpression.length === 1) {
        firstNum = currentOp.textContent;
        operand = clickedValue;
        normalExpression[0] = operand;
        normalExpression[1] = firstNum
        previousOp.textContent = `${normalExpression[1]} ${normalExpression[0]}`
        let str = `${normalExpression[1]} ${normalExpression[0]}`.length;
        console.log(str);
    }
}

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const clickedValue = e.target.value;
    if (!isNaN(clickedValue) || clickedValue === ".") {
        // then we must have clicked on a number
        handleNumberClick(clickedValue);
    } else if (['+', '-', 'x', '/'].includes(clickedValue) && secondNum === "") {
        handleOperandClick(clickedValue);
        console.log("we clicked operator for the first time");
        numButtons.forEach((num) => {
            num.addEventListener('click', (e) => {
              if (normalExpression.length >= 2) {
                  const clickedNum = e.target.value;
                  secondNum = currentOp.textContent;
                  normalExpression[2] = secondNum
                  console.log('here');
              }
            });
        })
    } else if (clickedValue === "=") {
        console.log(normalExpression);
        result = operate(normalExpression[0], normalExpression[1], normalExpression[2]);
        currentOp.textContent = result;
        previousOp.textContent = `${normalExpression[1]} ${normalExpression[0]} ${normalExpression[2]} =`;
        let str = `${normalExpression[1]} ${normalExpression[0]}`.length;
        console.log(str);
        normalExpression = [];
        normalExpression[0] = result;
        firstNum = result;
        secondNum = "";
        operand = "";
        total = result;
        clickedEquals = true
        // now array [0] is is firstNum
        // setting secondNum to be = ""; is causing 2nd else if to repeat
    } else if (['+', '-', 'x', '/'].includes(clickedValue) && normalExpression.length === 3) {
        console.log(normalExpression);
        result = operate(normalExpression[0], normalExpression[1], normalExpression[2]);
        currentOp.textContent = result;
        previousOp.textContent = `${result} ${clickedValue}`;
        normalExpression = [];
        normalExpression[1] = result;
        normalExpression[0] = clickedValue;
        firstNum = result;
        secondNum = "";
        operand = clickedValue;
        total = result;
    } else if (clickedValue === "CLEAR") {
      clearCalc();
    } else if (clickedValue === "DELETE") {
      deleteNum();
    }
  });
});

function add(a, b) {
  return +a + +b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Error";
  }
  let operationResult = a / b;
  console.log("this is the result", operationResult);
  let numRounded = roundNumber(operationResult);
  return numRounded
}

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "x":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      break;
  }
}