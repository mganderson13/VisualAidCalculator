
let numA = "";
let onNumA = true;
let numB = "";
let operator = "";
let currentDisplay = document.getElementById("display");
let outerVisual = document.getElementById("outerVisual");
let equationVisual = document.getElementById("equationVisual");
let pictureVisual = document.getElementById("pictureVisual");
let dec = document.getElementById("dec");

function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    if(b == 0) {
        return "uh, no";
    } else {
        return a / b;
    };
};

function doOperation(firstNum, secondNum, operation) {
    if(operation === "+") {
        return add(firstNum, secondNum);
    } else if(operation === "-") {
        return subtract(firstNum, secondNum);
    } else if(operation === "*") {
        return multiply(firstNum, secondNum);
    } else if(operation === "/") {
        return divide(firstNum, secondNum);
    }
}

function readNum(sentNum) {
    if(onNumA === true) {
        numA += sentNum;
        currentDisplay.innerHTML = numA;
        equationVisual.innerHTML = numA;
    } else {
        numB += sentNum;
        currentDisplay.innerHTML = numA + " " + operator + " " + numB;
        equationVisual.innerHTML = numA + " " + operator + " " + numB;
    } 
}

function readOper(sentOper) {
    if(operator) {
        currentDisplay.innerHTML = "ERROR";
        equationVisual.innerHTML = "ERROR";
    } else {
        operator = sentOper;
        onNumA = false;
        currentDisplay.innerHTML = numA + " " + operator;
        equationVisual.innerHTML = numA + " " + operator;
        //create circles/dots/numberline
        if (operator === "+" && numA < 1000) {
            createAddLine();
        } else if(operator === "-" && numA < 1000) {
            createSubtractionLine();
        } else if(operator === "*") {
            createMultCircles();
        } else if (operator === "/") {
            createStartDivDots();
        }
    }
}

function readEnter() {
    let answer = doOperation(parseFloat(numA), parseFloat(numB), operator);
    if(typeof(answer) === "number") {
        if (operator === "+") {
            if (numA < 1000 && numB < 1000) {
            fillInNumberLine(numB);
            }
            currentDisplay.innerHTML = Number(Math.round(answer + 'e' + 7) + "e-" + 7);
            equationVisual.innerHTML = numA + " " + operator + " " + numB + " " + "=" + " " + Number(Math.round(answer + 'e' + 7) + "e-" + 7);
        } else if (operator === "-") {
            if (numA < 1000 && numB < 1000) {
            fillInSubtractionNumberLine(numB);
            }
            currentDisplay.innerHTML = Number(Math.round(answer + 'e' + 7) + "e-" + 7);
            equationVisual.innerHTML = numA + " " + operator + " " + numB + " " + "=" + " " + Number(Math.round(answer + 'e' + 7) + "e-" + 7);
        } else if (operator === "*"){
            createMultDots(numB);
        currentDisplay.innerHTML = Number(Math.round(answer + 'e' + 7) + "e-" + 7);
        equationVisual.innerHTML = numA + " " + operator + " " + numB + " " + "=" + " " + Number(Math.round(answer + 'e' + 7) + "e-" + 7);
        } else if(operator === "/") {
            let answerRounded = Math.floor(answer);
            let remainder = numA % numB;
            createDivCircles();
            createEndDivDots(answerRounded, numB);
            currentDisplay.innerHTML = Number(Math.round(answer + 'e' + 7) + "e-" + 7);
            if(!remainder) {
                equationVisual.innerHTML = numA + " " + operator + " " + numB + " " + "=" + " " + Number(Math.round(answer + 'e' + 7) + "e-" + 7);
            } else {
                    equationVisual.innerHTML = 
                        numA + " " + operator + " " + numB + " " + "=" + " " + Number(Math.round(answerRounded + 'e' + 7) + "e-" + 7) + " with remainder " + remainder
            };
            } 
        } else {
        currentDisplay.innerHTML = "ERROR";
        equationVisual.innerHTML = "ERROR";
        numA = "";
    }  
    //reset values in function
    function resetValues() {
        numA= "";
        onNumA = true;
        numB = "";
        operator = "";
    }
    resetValues();
}

function readClear() {
    numA = "";
    numB = "";
    operator = "";
    currentDisplay.innerHTML = "";
    equationVisual.innerHTML = "";
    pictureVisual.innerHTML = "";
    onNumA = true;
}

function readBackspace() {
    if(onNumA === true) {
        numA = numA.slice(0, -1);
        currentDisplay.innerHTML = numA;
        equationVisual.innerHTML = numA;
    } else {
        numB = numB.slice(0, -1);
        currentDisplay.innerHTML = numA + " " + operator + " " + numB;
        equationVisual.innerHTML = numA + " " + operator + " " + numB;
    }
}