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
let displayValue = 0;

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
	if (b == 0) {
		return "ERROR!";
	}
	return +a / +b;
};

function keyboardButtonClick() {
	addEventListener("keydown", (event) => {
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
		button.addEventListener("mousedown", () => {
			numberInput(button.textContent);
		});
	});
}

function operationButtonClick() {
	operationButtons.forEach((button) => {
		button.addEventListener("mousedown", () => {
			operatorInput(button.textContent);
		});
	});
}

function equalsButtonClick() {
	equalButton.addEventListener("mousedown", () => {
		equalsInput();
	});
}

function resetButtonClick() {
	resetButton.addEventListener("mousedown", () => {
		resetInput();
	});
}

function decimalSignButtonClick() {
	decimalSignButton.addEventListener("mousedown", () => {
		decimalInput();
	});
}

function backspaceButtonClick() {
	operationBackspace.addEventListener("mousedown", () => {
		backspaceInput();
	});
}

function changeSignButtonClick() {
	operationChangeSign.addEventListener("mousedown", () => {
		console.log(
			"początek znaku",
			"first:",
			firstNumber,
			"second:",
			secondNumber,
			"operator:",
			operator,
			"displayValue:",
			displayValue
		);

		displayValue = +displayValue * -1;
		showCurrentValue();

		console.log(
			"koniec znaku",
			"first:",
			firstNumber,
			"second:",
			secondNumber,
			"operator:",
			operator,
			"displayValue:",
			displayValue
		);
	});
}

const numberInput = (value) => {
	if (displayValue == 0) {
		displayValue = value;
	} else {
		displayValue = displayValue + value;
	}
	showCurrentValue();
};

const operatorInput = (operatorValue) => {
	if (firstNumber !== "") {
		equalsInput();
	}

	operator = operatorValue;
	firstNumber = displayValue;
	displayValue = 0;
};

const equalsInput = () => {
	if (firstNumber === "" && secondNumber === "" && operator === "") {
		return;
	}

	secondNumber = displayValue;
	displayValue = operate(operator, firstNumber, secondNumber);
	showCurrentValue();
	operator = "";
	firstNumber = "";
	secondNumber = "";
};

const decimalInput = () => {
	if (displayValue.toString().includes(".")) {
		return;
	}
	displayValue = displayValue + ".";
	showCurrentValue();
};

const resetInput = () => {
	operator = "";
	firstNumber = "";
	secondNumber = "";
	displayValue = 0;
	showCurrentValue();
};

const backspaceInput = () => {
	const currentDisplayLength = displayValue.toString().length;

	if (currentDisplayLength <= 1) {
		displayValue = 0;
	} else {
		displayValue = displayValue.toString().slice(0, currentDisplayLength - 1);
	}
	showCurrentValue();
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
