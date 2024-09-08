const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".mathOperation");
const equalButton = document.querySelector(".operationEquals");
const resetButton = document.querySelector(".operationReset");
const decimalSignButton = document.querySelector(".decimalSign");
const operationBackspace = document.querySelector(".operationBackspace");
const operationChangeSign = document.querySelector(".operationChangeSign");
const displayDiv = document.querySelector(".displayValue");

const maximumValueDisplay = 9999999999;

let firstNumber = "";
let secondNumber = "";
let operator = "";
let displayValue = "";

const operate = (operator, firstNumber, secondNumber) => {
	switch (operator) {
		case "+":
			return add(secondNumber, firstNumber);
		case "-":
			return substract(secondNumber, firstNumber);
		case "*":
			return multiply(secondNumber, firstNumber);
		case "/":
			return divide(secondNumber, firstNumber);
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
	if (b === 0) {
		return "ERROR!";
	}
	return +a / +b;
};

const numberButtonClick = () => {
	numberButtons.forEach((button) => {
		const value = button.textContent;

		button.addEventListener("click", () => {
			displayValue = displayValue + value;
			firstNumber = displayValue;
			showCurrentValue();
			console.log(firstNumber, secondNumber, displayValue, operator);
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
		if (operator === "" || firstNumber === "" || secondNumber === "") {
			return;
		}
		console.log(firstNumber, secondNumber, displayValue, operator);

		displayValue = operate(operator, firstNumber, secondNumber);
		showCurrentValue();
	});
};

const resetButtonClick = () => {
	resetButton.addEventListener("click", () => {
		displayValue = "";
		firstNumber = "";
		secondNumber = "";
		displayDiv.textContent = 0;
	});
};

const decimalSignButtonClick = () => {
	decimalSignButton.addEventListener("click", () => {
		if (displayValue.toString().includes(".")) {
			return;
		}
		displayValue = displayValue + ".";
		firstNumber = displayValue;
		showCurrentValue();
	});
};

const backspaceButtonClick = () => {
	operationBackspace.addEventListener("click", () => {
		const currentDisplayLength = displayValue.toString().length;

		if (currentDisplayLength <= 1) {
			displayValue = "";
			displayDiv.textContent = 0;
		} else {
			displayValue = displayValue.toString().slice(0, currentDisplayLength - 1);
			showCurrentValue();
		}
	});
};

const changeSignButtonClick = () => {
	operationChangeSign.addEventListener("click", () => {
		displayValue = +displayValue * -1;
		firstNumber = displayValue;
		showCurrentValue();
	});
};

const showCurrentValue = () => {
	if (displayValue > maximumValueDisplay) {
		displayDiv.textContent = "ERROR!";
	} else if (
		displayValue.toString().length > maximumValueDisplay.toString().length &&
		displayValue.toString().includes(".")
	) {
		displayDiv.textContent = round(displayValue);
	} else {
		displayDiv.textContent = displayValue;
	}
};

function round(num) {
	const decimalPlaces =
		maximumValueDisplay.toString().length - num.toString().lastIndexOf(".");
	const p = Math.pow(10, decimalPlaces);
	const n = num * p * (1 + Number.EPSILON);
	return Math.round(n) / p;
}

numberButtonClick();
operationButtonClick();
equalsButtonClick();
resetButtonClick();
decimalSignButtonClick();
backspaceButtonClick();
changeSignButtonClick();

//todo dwie operacje pod rzad bez znaku równania
//todo obsługa klawiatury
//todo dodaj cssy dla przycisków - dla hover i dla click
