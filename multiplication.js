    //function to create circles/dots/numberline
function createMultCircles() {

    for (let i = 1; i <= numA; i++ ) {
    const circleAndCount = document.createElement("div");
    circleAndCount.classList.add("circleAndCount");
    const circle = document.createElement("div");
    circle.classList.add("circle");
    circle.id = "circle" + i;
    const countDisplay = document.createElement("div");
    countDisplay.classList.add("countDisplay");

    circleAndCount.appendChild(circle);
    circleAndCount.appendChild(countDisplay);
    pictureVisual.appendChild(circleAndCount);
    }
}
window.createMultCircles = createMultCircles;

function createMultDots(numB) {
const circles = document.querySelectorAll(".circle");
const countDisplays = document.querySelectorAll(".countDisplay");

function appendDotGroup(index) {
    if (index >= circles.length) return; // Stop if we've processed all circles

    const cir = circles[index];
    const dotGroup = document.createElement("div");
    dotGroup.classList.add("dotGroup");

    //creates numB dots in each group
    for (let i = 1; i <= numB; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (numB > 16) {
            dot.style.margin= "2px";
        }
        dotGroup.appendChild(dot);
    }
    //puts group of numB dots into circle
    cir.appendChild(dotGroup);

    //display skip counting
    const countDisplay = countDisplays[index];
    countDisplay.innerHTML= numB * (index + 1);


    // Call the next group after a delay
    setTimeout(() => appendDotGroup(index + 1), 500);
}

// Start the recursive function with the first circle
appendDotGroup(0);
}
window.createMultDots = createMultDots;