//SCSS
import "./style.scss";

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const decimalButton = document.querySelector('[data-decimal]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const currentOperandText = document.querySelector('[data-current-operand]')

let memoryCurrentNumber = 0
let memoryNewNumber = false 
let memoryPendingOperation = ''


for (let i = 0; i < numberButtons.length; i++) {
    let numberBtn = numberButtons[i] 
    numberBtn.addEventListener('click', function(e) {
        numberPress(e.target.textContent)
    })
}

for (let i = 0; i < operationButtons.length; i++) { 
    let operationBtn = operationButtons[i] 
    operationBtn.addEventListener('click', function(e) {
        operationPress(e.target.textContent)
    })
}

decimalButton.addEventListener('click', decimalPress)
allClearButton.addEventListener('click', allClearPress)
deleteButton.addEventListener('click', deletePress)

function numberPress(number) {
    if (memoryNewNumber) {
        currentOperandText.textContent = number
        memoryNewNumber =  false
    } else {
        if (currentOperandText.textContent === '0') {
            currentOperandText.textContent = number
        } else {
            currentOperandText.textContent += number
        }
    }

}
function operationPress(oper) {
    let localOperationMemory = currentOperandText.textContent

    if (memoryNewNumber && memoryPendingOperation !== '=') {
        currentOperandText.textContent = memoryCurrentNumber
    } else {
        memoryNewNumber =  true
        if (memoryPendingOperation === '+') {
            memoryCurrentNumber += parseFloat(localOperationMemory)
        } else if (memoryPendingOperation === '-') {
            memoryCurrentNumber -= parseFloat(localOperationMemory)
        } else if (memoryPendingOperation === '*') {
            memoryCurrentNumber *= parseFloat(localOperationMemory)
        } else if (memoryPendingOperation === '÷') {
            memoryCurrentNumber /= parseFloat(localOperationMemory)
        } else if (memoryPendingOperation === '^') {
            memoryCurrentNumber **= parseFloat(localOperationMemory)
        } else if (memoryPendingOperation === '√') {
            memoryCurrentNumber **= 1 / parseFloat(localOperationMemory)
        } else { 
            memoryCurrentNumber = parseFloat(localOperationMemory)
        }
        currentOperandText.textContent = Math.round(memoryCurrentNumber * 10000000000) / 10000000000

        memoryPendingOperation = oper
    }
}

function decimalPress() {
    let localDecimalMemory = currentOperandText.textContent
    if (memoryNewNumber) {
        localDecimalMemory = '0.'
        memoryNewNumber = false
    } else {
        if (localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.'
        }
    }
    currentOperandText.textContent = localDecimalMemory
}

function allClearPress() {
    currentOperandText.textContent = '0'
    memoryNewNumber = true
    memoryCurrentNumber = 0
    memoryPendingOperation = ''
}

function deletePress() {
    currentOperandText.textContent = '0'
    memoryNewNumber = true
}