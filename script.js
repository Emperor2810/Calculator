document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
    const buttons = document.getElementById("calculatorButtons");

    buttons.addEventListener("click", function (event) {
        if (event.target.tagName === "BUTTON") {
            handleButtonClick(event.target.innerText);
        }
    });

    function handleButtonClick(value) {
        if (isNumber(value) || value === ".") {
            handleNumber(value);
        } else if (isOperator(value)) {
            handleOperator(value);
        } else {
            handleSpecialButton(value);
        }
    }

    function isNumber(value) {
        return !isNaN(parseFloat(value)) && isFinite(value) || value === '(' || value === ')';
    }

    function isOperator(value) {
        return ["+", "-", "*", "/"].includes(value);
    }

    function handleNumber(value) {
        const currentValue = display.innerText;
        display.innerText = (currentValue === "0" ? "" : currentValue) + value;
    }

    function handleOperator(value) {
        const currentValue = display.innerText;
        display.innerText = isOperator(currentValue.slice(-1)) ? currentValue.slice(0, -1) + value : currentValue + value;
    }

    function handleSpecialButton(value) {
        switch (value) {
            case "=":
                calculateResult();
                break;
            case "C":
                clearDisplay();
                break;
            case "⌫":
                backspace();
                break;
            case "√":
                calculateSquareRoot();
                break;
            case "%":
                modulo();
                break;
        }
    }

    function clearDisplay() {
        display.innerText = "0";
    }

    function backspace() {
        const currentValue = display.innerText;
        display.innerText = currentValue.length > 1 ? currentValue.slice(0, -1) : "0";
    }

    function calculateResult() {
        const expression = display.innerText;
        try {
            const result = evaluateExpression(expression);
            display.innerText = result;
        } catch (error) {
            display.innerText = "Error";
        }
    }

    function evaluateExpression(expression) {
        const operators = /[+\-*/]/g;
        const numbers = expression.split(operators).map(Number);
        const operator = expression.match(operators);

        if (numbers.length < 2 || !operator) {
            throw new Error("Invalid expression");
        }

        switch (operator[0]) {
            case "+":
                return numbers[0] + numbers[1];
            case "-":
                return numbers[0] - numbers[1];
            case "*":
                return numbers[0] * numbers[1];
            case "/":
                if (numbers[1] === 0) {
                    throw new Error("Division by zero");
                }
                return numbers[0] / numbers[1];
            default:
                throw new Error("Invalid operator"); 
        }
    }

    function calculateSquareRoot() {
        const currentValue = parseFloat(display.innerText);
        display.innerText = (!isNaN(currentValue) && currentValue >= 0) ? Math.sqrt(currentValue) : "Error";
    }

    function modulo() {
        const currentValue = parseFloat(display.innerText);
        display.innerText = (!isNaN(currentValue)) ? currentValue / 100 : "Error";
    }
});
