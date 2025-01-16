function createStartDivDots() {
    const startDotGroup = document.createElement("div");
    startDotGroup.classList.add("startDotGroup");
    for (let i = 1; i <= numA; i++ ) {
        const startDot = document.createElement("div");
        startDot.classList.add("startDot", "fade-out");
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
        const circleAndCount = document.createElement("div");
        circleAndCount.classList.add("circleAndCount");
        const circle = document.createElement("div");
        circle.classList.add("circle");
        circle.id = "circle" + i;
        const dotGroup = document.createElement("div");
        dotGroup.classList.add("dotGroup");
        const countDisplay = document.createElement("div");
        countDisplay.classList.add("countDisplay");

        circleAndCount.appendChild(circle);
        circle.appendChild(dotGroup);
        circleAndCount.appendChild(countDisplay);
        circleGroup.appendChild(circleAndCount);
    }

    pictureVisual.appendChild(circleGroup);
}
window.createDivCircles = createDivCircles;

function createEndDivDots(answer) {
    const dotGroups = document.querySelectorAll(".dotGroup");
    // const countDisplays = document.querySelectorAll(".countDisplays");

    // uses the "answer" variable to add hidden dots to the circles
    for (let i = 1; i <= answer; i++) {
        dotGroups.forEach((dotGroup) => {
            const dot = document.createElement("div");
            dot.classList.add("dot", "fade-target");
            dot.dataset.id = i;
            dotGroup.appendChild(dot);
        });
    };

    // fades in the hidden dots making them visible in the circles one at a time
    for (let i = 1; i <= answer; i++) {
        setTimeout(() => {
            const dotsToFadeIn = document.querySelectorAll(`.dot[data-id="${i}"]`);
            dotsToFadeIn.forEach((dot) => {
                // dot.classList.remove("fade-out");
                dot.classList.add("fade-in");
            });
        }, i * 1000);
    }

    // fades out the startDots in groups of numB
    for (let j = 0; j < answer; j++) {
        setTimeout(() => {
            for (let k = 1; k <= numB; k++) {
                const startDot = document.querySelector(`#startDot${j * numB + k}`);
                if (startDot) {
                    startDot.classList.add("hidden"); 
                }
            }
        }, j * 1000 + 500);
    }

}
window.createEndDivDots = createEndDivDots;