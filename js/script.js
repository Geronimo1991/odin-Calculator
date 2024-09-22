const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".mathOperation");
const equalsButton = document.querySelector(".operationEquals");
const resetButton = document.querySelector(".operationReset");
const decimalSignButton = document.querySelector(".decimalSign");
const backspaceButton = document.querySelector(".operationBackspace");
const changeSignButton = document.querySelector(".operationChangeSign");

const displayDiv = document.querySelector(".displayValue");

const DISPLAY_MAX_VALUE = 9999999999;
const DISPLAY_MIN_VALUE = -9999999999;

let firstNumber = "";
let mathOperator = "";
let displayValue = 0;

let afterEqualsOperations = null;

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

function operate(operator, firstNumber, secondNumber) {
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
}

function add(a, b) {
	return +a + +b;
}

function substract(a, b) {
	return +a - +b;
}

function multiply(a, b) {
	return +a * +b;
}

function divide(a, b) {
	if (b == 0) {
		return "ERROR!";
	}
	return +a / +b;
}

function keyboardButtonClick() {
	addEventListener("keydown", (event) => {
		if (48 <= event.key.charCodeAt() && event.key.charCodeAt() <= 57) {
			inputNumber(event.key);
		}

		if (
			event.key.charCodeAt() === 42 ||
			event.key.charCodeAt() === 43 ||
			event.key.charCodeAt() === 45 ||
			event.key.charCodeAt() === 47
		) {
			inputMathOperator(event.key);
		}

		if (event.key.charCodeAt() === 69) {
			inputEqualsOperator();
		}

		if (event.key.charCodeAt() === 66 || event.key.charCodeAt() === 68) {
			inputBackspace();
		}

		if (
			event.key.charCodeAt() === 44 ||
			event.key.charCodeAt() === 188 ||
			event.key.charCodeAt() === 190
		) {
			inputDecimalSign();
		}
	});
}

function numberButtonClick() {
	numberButtons.forEach((button) => {
		button.addEventListener("mousedown", () => {
			inputNumber(button.textContent);
		});
	});
}

function operationButtonClick() {
	operationButtons.forEach((button) => {
		button.addEventListener("mousedown", () => {
			inputMathOperator(button.textContent);
		});
	});
}

function equalsButtonClick() {
	equalsButton.addEventListener("mousedown", () => {
		inputEqualsOperator();
	});
}

function resetButtonClick() {
	resetButton.addEventListener("mousedown", () => {
		inputReset();
	});
}

function decimalSignButtonClick() {
	decimalSignButton.addEventListener("mousedown", () => {
		inputDecimalSign();
	});
}

function backspaceButtonClick() {
	backspaceButton.addEventListener("mousedown", () => {
		inputBackspace();
	});
}

function changeSignButtonClick() {
	changeSignButton.addEventListener("mousedown", () => {
		if (checkForError()) {
			return;
		}

		displayValue = +displayValue * -1;
		showCurrentValue();
	});
}

const inputNumber = (value) => {
	if (checkForError() || afterEqualsOperations) {
		return;
	}

	if ((displayValue + value).toString().length > DISPLAY_MAX_VALUE.toString().length) {
		return;
	} else if (displayValue.toString() === String("0")) {
		displayValue = value;
	} else {
		displayValue = displayValue + value;
	}

	showCurrentValue();
};

const inputMathOperator = (operatorValue) => {
	if (checkForError()) {
		return;
	}

	if (firstNumber !== "") {
		inputEqualsOperator();
	}

	mathOperator = operatorValue;
	firstNumber = displayValue;
	displayValue = 0;
	afterEqualsOperations = false;
};

const inputEqualsOperator = () => {
	if (checkForError() || afterEqualsOperations) {
		return;
	}

	if (firstNumber === "" && displayValue == 0 || mathOperator === "") {
		return;
	}

	displayValue = operate(mathOperator, firstNumber, displayValue);
	showCurrentValue();
	mathOperator = "";
	firstNumber = "";
	afterEqualsOperations = true;
};

const inputDecimalSign = () => {
	if (checkForError() || afterEqualsOperations || displayValue.toString().includes(".")) {
		return;
	}

	displayValue = displayValue + ".";
	showCurrentValue();
};

const inputReset = () => {
	mathOperator = "";
	firstNumber = "";
	displayValue = 0;
	afterEqualsOperations = null;
	showCurrentValue();
};

const inputBackspace = () => {
	if (checkForError() || afterEqualsOperations) {
		return;
	}

	const currentDisplayLength = displayValue.toString().length;

	if (currentDisplayLength <= 1) {
		displayValue = 0;
	} else {
		displayValue = displayValue.toString().slice(0, currentDisplayLength - 1);
	}

	showCurrentValue();
};

const showCurrentValue = () => {
	if (displayValue > DISPLAY_MAX_VALUE || displayValue < DISPLAY_MIN_VALUE) {
		displayValue = "ERROR!";
	} else if (
		displayValue.toString().length > DISPLAY_MAX_VALUE.toString().length &&
		displayValue.toString().includes(".")
	) {
		displayValue = round(displayValue);
	}

	displayDiv.textContent = displayValue;
};

function round(num) {
	const decimalPlaces = DISPLAY_MAX_VALUE.toString().length - num.toString().lastIndexOf(".");
	const p = Math.pow(10, decimalPlaces);
	const n = num * p * (1 + Number.EPSILON);
	return Math.round(n) / p;
}

function checkForError() {
	return displayValue === "ERROR!";
}
