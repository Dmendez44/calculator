let firstNum = "0";
let operand;
let secondNum;
let runningTotal;
let clickedButtons = []

const display = document.querySelector('.display');
const currentOp = document.querySelector('.currentOperation');
const lastOp = document.querySelector('.lastOperation');
const buttons = document.querySelectorAll('.btn');

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (e.target.id === "clear") {
            currentOp.textContent = 0;
            firstNum = "0"
            lastOp.textContent = "";
            clickedButtons = [];
        } else if (clickedButtons.length === 2) {
            if (!(e.target.classList.contains('operand'))) {
                secondNum = e.target.value
                currentOp.textContent = secondNum;
            } else if (e.target.value === "=" ||e.target.value === "+" || e.target.value === "x" ||e.target.value === "*" || e.target.value === "/"){
                if (e.target.value === "=") {
                    clickedButtons.push(secondNum);
                    runningTotal = operate(clickedButtons[1], +clickedButtons[0], +clickedButtons[2]);
                    currentOp.textContent = runningTotal;
                    console.log(clickedButtons);
                    lastOp.textContent = `${clickedButtons[0]} ${clickedButtons[1]} ${clickedButtons[2]} =`
                } else {
                clickedButtons.push(secondNum);
                runningTotal = operate(e.target.value, +clickedButtons[0], +clickedButtons[2]);
                currentOp.textContent = runningTotal;
                }
            } else if (secondNum !== undefined) {
                secondNum += e.target.value
                currentOp.textContent = secondNum;
            }
        } else if (!(e.target.classList.contains('operand'))) {
            if (firstNum === "0") {
                firstNum = e.target.value;
                currentOp.textContent = firstNum;
            } else {
                firstNum += e.target.value;
                currentOp.textContent = firstNum;
            }
        }  else if (e.target.classList.contains('operand')){
            clickedButtons.push(firstNum)
            operand = e.target.value
            clickedButtons.push(operand)
            lastOp.textContent = `${clickedButtons[0]} ${clickedButtons[1]}`
        }
    })
})

function add(a, b) {
    return a+b;
}

function subtract(a,b) {
    return a-b;

}

function multiply(a,b) {
    return a*b;

}

function divide(a, b) {
    return a/b;

}

function operate(operand, num1, num2) {
    switch (operand) {
        case "+":
            return add(num1, num2)
        case "-":
            return subtract(num1, num2)
        case "x":
            return multiply(num1, num2)
        case "/":
            return divide(num1, num2)
        default:
            break;
    }
}

function updateDisplay() {

}

