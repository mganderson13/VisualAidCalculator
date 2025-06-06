
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
    } else {
        return "huh?";
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
            initializeCanvas();
            createAddLine(numA);
        } else if(operator === "-" && numA < 1000) {
            initializeCanvas();
            createSubtractionLine(numA);
        } else if(operator === "*" && numA <= 20) {
            createMultCircles();
        } else if (operator === "/" && numA <= 100) {
            createStartDivDots();
        }
    }
}

function readEnter() {
    let answer = doOperation(parseFloat(numA), parseFloat(numB), operator);
    if(typeof(answer) === "number") {
        if (operator === "+") {
            if (numA < 1000 && numB < 1000) {
                animateAddition(numA, numB);
            }else {
                largeNumbers();
            }
            currentDisplay.innerHTML = Number(Math.round(answer + 'e' + 7) + "e-" + 7);
            equationVisual.innerHTML = numA + " " + operator + " " + numB + " " + "=" + " " + Number(Math.round(answer + 'e' + 7) + "e-" + 7);
        } else if (operator === "-") {
            if (numA < 1000 && numB < 1000) {
                animateSubtraction(numA, numB);
            }else {
                largeNumbers();
            }
            currentDisplay.innerHTML = Number(Math.round(answer + 'e' + 7) + "e-" + 7);
            equationVisual.innerHTML = numA + " " + operator + " " + numB + " " + "=" + " " + Number(Math.round(answer + 'e' + 7) + "e-" + 7);
        } else if (operator === "*"){
            if (numA <= 20 && numB <= 20) {
                createMultDots(numB);
            }else {
                largeNumbers();
            }
            currentDisplay.innerHTML = Number(Math.round(answer + 'e' + 7) + "e-" + 7);
            equationVisual.innerHTML = numA + " " + operator + " " + numB + " " + "=" + " " + Number(Math.round(answer + 'e' + 7) + "e-" + 7);
        } else if(operator === "/") {
            let answerRounded = Math.floor(answer);
            let remainder = numA % numB;
            if (numB <= 20 && (numA/numB) <= 25) {
            createDivCircles();
            createEndDivDots(answerRounded, numB, numA);
            }else {
                largeNumbers();
            }
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
    //reset values in function and run with setTimeout so dont mess up display
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

function largeNumbers() {
    pictureVisual.style.fontSize = "40px";
    pictureVisual.style.padding = "50px";
    pictureVisual.style.paddingTop = "100px";
    pictureVisual.innerHTML = "Too big for a visual! Try smaller numbers. 😁";
}