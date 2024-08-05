// DOM Elements
const numbers = document.querySelectorAll('[data-type="number"]');
const operations = document.querySelectorAll('[data-type="operation"]');
const del = document.querySelector('[data-value="Backspace"]');
const equal = document.querySelector('[data-value="Enter"]');
const reset = document.querySelector('[data-value="c"]');
const toggle = document.querySelector('.themes__toggle');
const screenNum = document.querySelector('.calc__result');

// Calculator State
let screenVar = '';
let firstNum = '';
let operation = '';

// Toggle dark/light theme
toggle.addEventListener('click', () => {
    toggle.classList.toggle('themes__toggle--isActive');
});

/**
 * Handle number input
 * @param {Event} event - The event triggered by clicking a number button
 */
const checkNum = (event) => {
    let value = event.currentTarget.getAttribute('data-value');
    if (value >= '1' && value <= '9') {
        if (screenVar !== '0') {
            screenVar += value;
        } else {
            screenVar = value;
        }
    } else if (value === ".") {
        if (screenVar === "" || !screenVar.includes('.')) {
            screenVar = screenVar || '0'; // If empty, start with '0'
            screenVar += value;
        }
    } else if (value === '0') {
        if (screenVar !== '0') { // Prevent leading zeros
            screenVar += value;
        }
    }
    screenNum.innerText = screenVar;
};

/**
 * Delete the last digit
 * @param {string} number - The current number displayed on the screen
 * @returns {string} - The updated number after deletion
 */
const deleteNum = (number) => {
    if (number.length === 1) {
        return '0';
    } else {
        return number.slice(0, -1);
    }
};

/**
 * Set the operation and prepare for the next number input
 * @param {Event} event - The event triggered by clicking an operation button
 */
const operationFun = (event) => {
    if (screenVar !== '') {
        firstNum = screenVar;
        screenVar = '';
    }
    operation = event.currentTarget.getAttribute('data-value');
};

/**
 * Calculate the result based on the selected operation
 */
const equalFun = () => {
    if (firstNum !== '' && screenVar !== '') {
        const num1 = parseFloat(firstNum);
        const num2 = parseFloat(screenVar);
        let result;

        switch (operation) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num1 / num2;
                break;
            default:
                return;
        }

        screenNum.innerText = result;
        firstNum = result.toString();
        screenVar = '';
        operation = '';
    }
};

/**
 * Reset the calculator state and display
 */
const resetFun = () => {
    firstNum = '';
    screenVar = '';
    operation = '';
    screenNum.innerText = '0';
};

// Event Listeners
numbers.forEach(key => key.addEventListener('click', checkNum));
del.addEventListener('click', () => {
    firstNum = deleteNum(firstNum.toString());
    screenNum.innerText = firstNum;
});
equal.addEventListener('click', equalFun);
operations.forEach(op => op.addEventListener('click', operationFun));
reset.addEventListener('click', resetFun);
