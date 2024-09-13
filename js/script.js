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

document.addEventListener("DOMContentLoaded", () => {
	numberButtonClick();
	operationButtonClick();
	equalsButtonClick();
	resetButtonClick();
	decimalSignButtonClick();
	backspaceButtonClick();
	changeSignButtonClick();
	keyboardButtonClick();
});

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

function keyboardButtonClick() {
	addEventListener("keydown", (event) => {
		console.log(event);

		if (48 <= event.key.charCodeAt() && event.key.charCodeAt() <= 57) {
			numberInput(event.key);
		}
		if (
			event.key.charCodeAt() === 42 ||
			event.key.charCodeAt() === 43 ||
			event.key.charCodeAt() === 45 ||
			event.key.charCodeAt() === 47
		) {
			operatorInput(event.key);
		}

		if (event.key.charCodeAt() === 69) {
			equalsInput();
		}

		if (event.key.charCodeAt() === 66 || event.key.charCodeAt() === 68) {
			backspaceInput();
		}

		if (
			event.key.charCodeAt() === 44 ||
			event.key.charCodeAt() === 188 ||
			event.key.charCodeAt() === 190
		) {
			decimalInput();
		}
	});
}

function numberButtonClick() {
	numberButtons.forEach((button) => {
		const value = button.textContent;

		button.addEventListener("click", () => {
			numberInput(value);
		});
	});
}

const numberInput = (value) => {
	displayValue = displayValue + value;
	firstNumber = displayValue;
	showCurrentValue();
};

function operationButtonClick() {
	operationButtons.forEach((button) => {
		const operatorValue = button.textContent;

		button.addEventListener("click", () => {
			operatorInput(operatorValue);
		});
	});
}

const operatorInput = (operatorValue) => {
	operator = operatorValue;
	secondNumber = firstNumber;
	firstNumber = "";
	displayValue = "";
};

function equalsButtonClick() {
	equalButton.addEventListener("click", () => {
		equalsInput();
	});
}

const equalsInput = () => {
	if (operator === "" || firstNumber === "" || secondNumber === "") {
		return;
	}

	displayValue = operate(operator, firstNumber, secondNumber);
	showCurrentValue();
};

function resetButtonClick() {
	resetButton.addEventListener("click", () => {
		displayValue = "";
		firstNumber = "";
		secondNumber = "";
		displayDiv.textContent = 0;
	});
}

function decimalSignButtonClick() {
	decimalSignButton.addEventListener("click", () => {
		decimalInput();
	});
}

const decimalInput = () => {
	if (displayValue.toString().includes(".")) {
		return;
	}
	displayValue = displayValue + ".";
	firstNumber = displayValue;
	showCurrentValue();
};

function backspaceButtonClick() {
	operationBackspace.addEventListener("click", () => {
		backspaceInput();
	});
}

const backspaceInput = () => {
	const currentDisplayLength = displayValue.toString().length;

	if (currentDisplayLength <= 1) {
		displayValue = "";
		displayDiv.textContent = 0;
	} else {
		displayValue = displayValue.toString().slice(0, currentDisplayLength - 1);
		showCurrentValue();
	}
};

function changeSignButtonClick() {
	operationChangeSign.addEventListener("click", () => {
		displayValue = +displayValue * -1;
		firstNumber = displayValue;
		showCurrentValue();
	});
}

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

//todo dwie operacje pod rzad bez znaku równania
