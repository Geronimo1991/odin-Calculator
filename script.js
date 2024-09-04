const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".mathOperation");
const equalButton = document.querySelector(".operationEquals");
const resetButton = document.querySelector(".operationReset");
const topLineDiv = document.querySelector(".topLine");
const bottomLineDiv = document.querySelector(".bottomLine");

let firstNumber;
let secondNumber;
let operator;
let bottomLine = "";
let topLine = "";

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
			bottomLine = bottomLine + value;
			showCurrentBottomLine();
		});
	});
};

const operationButtonClick = () => {
	operationButtons.forEach((button) => {
		const operatorValue = button.textContent;

		button.addEventListener("click", () => {
			firstNumber = bottomLine;
			operator = operatorValue;
			topLine = bottomLine + operatorValue;
			showCurrentTopLine();
			clearBottomLine();
		});
	});
};

const equalsButtonClick = () => {
	equalButton.addEventListener("click", () => {
		secondNumber = bottomLine;
		clearTopLine();
		topLine = operate(operator, firstNumber, secondNumber);
		showCurrentTopLine();
		clearBottomLine();
	});
};

const resetButtonClick = () => {
	resetButton.addEventListener("click", () => {
		clearTopLine();
		clearBottomLine();
	});
};

const showCurrentBottomLine = () => {
	bottomLineDiv.textContent = bottomLine;
};

const clearBottomLine = () => {
	bottomLine = "";
	showCurrentBottomLine();
};

const showCurrentTopLine = () => {
	topLineDiv.textContent = topLine;
};

const clearTopLine = () => {
	topLine = "";
	showCurrentTopLine();
};

numberButtonClick();
operationButtonClick();
equalsButtonClick();
resetButtonClick();
