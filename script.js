const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".mathOperation");
const equalButton = document.querySelector(".operationEquals");
const resetButton = document.querySelector(".operationReset");
const displayDiv = document.querySelector(".displayValue");

let firstNumber = "";
let secondNumber = "";
let operator = "";
let displayValue = "";

const operate = (operator, firstNumber, secondNumber) => {
	switch (operator) {
		case "+":
			return add(firstNumber, secondNumber);
		case "-":
			return substract(firstNumber, secondNumber);
		case "*":
			return multiply(firstNumber, secondNumber);
		case "/":
			return divide(firstNumber, secondNumber);
	}
};

const add = (a, b) => {
	return +a + +b;
};

const substract = (a, b) => {
	return +a - +b;
};

const multiply = (a, b) => {
	return +a * +b;
};

const divide = (a, b) => {
	return +a / +b;
};

const numberButtonClick = () => {
	numberButtons.forEach((button) => {
		const value = button.textContent;

		button.addEventListener("click", () => {
			displayValue = displayValue + value;
			firstNumber = displayValue;
			showCurrentValue();
		});
	});
};

const operationButtonClick = () => {
	operationButtons.forEach((button) => {
		const operatorValue = button.textContent;

		button.addEventListener("click", () => {
			operator = operatorValue;
			secondNumber = firstNumber;
			firstNumber = "";
			displayValue = "";
			console.log(firstNumber, secondNumber, displayValue, operator);
		});
	});
};

const equalsButtonClick = () => {
	equalButton.addEventListener("click", () => {
		secondNumber = displayValue;
		displayValue = operate(operator, firstNumber, secondNumber);
		showCurrentValue();
	});
};

const resetButtonClick = () => {
	resetButton.addEventListener("click", () => {
		displayValue = 0;
		firstNumber = "";
		secondNumber = "";
		showCurrentValue();
	});
};

const showCurrentValue = () => {
	displayDiv.textContent = displayValue;
};

numberButtonClick();
operationButtonClick();
equalsButtonClick();
resetButtonClick();
