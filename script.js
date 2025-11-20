document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    const buttons = document.querySelectorAll('button');

    let currentInput = '0';
    let previousInput = '';
    let operator = null;
    let shouldResetDisplay = false;

    function updateDisplay() {
        display.textContent = currentInput;
    }

    function clear() {
        currentInput = '0';
        shouldResetDisplay = false;
    }

    function allClear() {
        currentInput = '0';
        previousInput = '';
        operator = null;
        shouldResetDisplay = false;
    }

    function appendNumber(number) {
        if (currentInput === '0' || shouldResetDisplay) {
            currentInput = number;
            shouldResetDisplay = false;
        } else {
            currentInput += number;
        }
    }

    function chooseOperator(selectedOperator) {
        if (operator !== null) {
            calculate();
        }
        previousInput = currentInput;
        operator = selectedOperator;
        shouldResetDisplay = true;
    }

    function calculate() {
        if (operator === null || shouldResetDisplay) return;
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '×':
                result = prev * current;
                break;
            case '÷':
                result = prev / current;
                break;
            default:
                return;
        }

        currentInput = result.toString();
        operator = null;
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (value >= '0' && value <= '9') {
                appendNumber(value);
            } else if (value === '.') {
                if (!currentInput.includes('.')) {
                    currentInput += '.';
                }
            } else if (value === 'C') {
                clear();
            } else if (value === 'AC') {
                allClear();
            } else if (value === '=') {
                calculate();
                shouldResetDisplay = true;
            } else if (value === '%') {
                currentInput = (parseFloat(currentInput) / 100).toString();
            } else if (value === '+ / -') {
                currentInput = (parseFloat(currentInput) * -1).toString();
            } else {
                chooseOperator(value);
            }
            updateDisplay();
        });
    });
});
