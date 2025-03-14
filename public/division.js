function createStartDivDots() {
    const startDotGroup = document.createElement("div");
    startDotGroup.classList.add("startDotGroup");
    for (let i = 1; i <= numA; i++ ) {
        const startDot = document.createElement("div");
        startDot.classList.add("dot", "fade-out");
        startDot.id = "startDot" + i;
        startDotGroup.appendChild(startDot);
    }
    pictureVisual.appendChild(startDotGroup);
};
window.createStartDivDots = createStartDivDots;

function createDivCircles() {
    const circleGroup = document.createElement("div");
    circleGroup.id = "circleGroup";

    for (let i = 1; i <= numB; i++ ) {
        const circle = document.createElement("div");
        circle.classList.add("circle");
        circle.id = "circle" + i;
        if (numB > 15) {
            circle.style.width= "120px";
            circle.style.height= "120px";
        }
        const dotGroup = document.createElement("div");
        dotGroup.classList.add("dotGroup");

        circle.appendChild(dotGroup);
        circleGroup.appendChild(circle);
    }

    pictureVisual.appendChild(circleGroup);
}
window.createDivCircles = createDivCircles;

function createEndDivDots(answer, numB, numA) {
    const dotGroups = document.querySelectorAll(".dotGroup");

    // uses the "answer" variable to add hidden dots to the circles
    for (let i = 1; i <= answer; i++) {
        dotGroups.forEach((dotGroup) => {
            const dot = document.createElement("div");
            dot.classList.add("dot", "fade-target");
            dot.dataset.id = i;
            if ((numA/numB) > 16) {
                dot.style.margin= "2px";
            }
            dotGroup.appendChild(dot);
        });
    };

    // fades in the hidden dots making them visible in the circles one at a time
    for (let i = 1; i <= answer; i++) {
        setTimeout(() => {
            const dotsToFadeIn = document.querySelectorAll(`.dot[data-id="${i}"]`);
            dotsToFadeIn.forEach((dot) => {
                dot.classList.add("fade-in");
            });
        }, i * 1000);
    }

    // fades out the startDots in groups of numB
    for (let j = 0; j < answer; j++) {
        setTimeout(() => {
            for (let k = 1; k <= numB; k++) {
                const startDot = document.getElementById(`startDot${j * numB + k}`);
                if (startDot) {
                    startDot.classList.add("hidden"); 
                }
            }
        }, j * 1000 + 500);
    }
    
}
window.createEndDivDots = createEndDivDots;