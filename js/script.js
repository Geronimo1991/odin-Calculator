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
	if (b === 0) {
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
		button.addEventListener("click", () => {
			numberInput(button.textContent);
		});
	});
}

function operationButtonClick() {
	operationButtons.forEach((button) => {
		button.addEventListener("click", () => {
			operatorInput(button.textContent);
		});
	});
}

function equalsButtonClick() {
	equalButton.addEventListener("click", () => {
		equalsInput();
	});
}

function resetButtonClick() {
	resetButton.addEventListener("click", () => {
		operator = "";
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

function backspaceButtonClick() {
	operationBackspace.addEventListener("click", () => {
		backspaceInput();
	});
}

function changeSignButtonClick() {
	operationChangeSign.addEventListener("click", () => {
		console.log(
			"początek",
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
		firstNumber = displayValue;
		showCurrentValue();

		console.log(
			"koniec",
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
	displayValue = displayValue + value;
	showCurrentValue();
};

const operatorInput = (operatorValue) => {
	if (operator !== "") {
		secondNumber = displayValue;
		displayValue = operate(operator, firstNumber, secondNumber);
		showCurrentValue();
		operator = operatorValue;
		firstNumber = displayValue;
		secondNumber = "";
		displayValue = "";
	} else {
		operator = operatorValue;
		firstNumber = displayValue;
		displayValue = "";
	}
};

const equalsInput = () => {
	if (operator === "" || firstNumber === "") {
		return;
	}

	secondNumber = displayValue;
	displayValue = operate(operator, firstNumber, secondNumber);
	operator = "";
	showCurrentValue();
};

const decimalInput = () => {
	if (displayValue.toString().includes(".")) {
		return;
	}
	displayValue = displayValue + ".";
	firstNumber = displayValue;
	showCurrentValue();
};

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

//refactor dwie operacje pod rzad bez znaku równania i równa sie
//fix zmiany znaku
