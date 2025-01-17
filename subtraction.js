function createSubtractionLine() {
    const pictureVisualDiv = document.getElementById("pictureVisual");

    //create numberline of entire container length
    const subtractionContainer = document.createElement("div");
        subtractionContainer.id = "subtractionContainer";
        const subArrowContainer = document.createElement("div");
        subArrowContainer.id= "subArrowContainer";
        const subNumberLineDiv = document.createElement("div");
        subNumberLineDiv.id = "subNumberLineDiv";        
        const subHorizontalLine = document.createElement("div");
        subHorizontalLine.id = "subHorizontalLine";
        subNumberLineDiv.appendChild(subHorizontalLine);
        subtractionContainer.appendChild(subArrowContainer);
        subtractionContainer.appendChild(subNumberLineDiv);
        pictureVisualDiv.appendChild(subtractionContainer);

        //place numA at end of numberline
        const endVerticalContainer = document.createElement("div");
        endVerticalContainer.classList.add("endVerticalContainer");
        const endVerticalLine = document.createElement("div");
        endVerticalLine.classList.add("verticalLine");
        const endNumber = document.createElement("div")
        endNumber.classList.add("countDisplay");
        endNumber.innerHTML= numA;
        endVerticalContainer.appendChild(endVerticalLine);
        endVerticalContainer.appendChild(endNumber);
        subHorizontalLine.appendChild(endVerticalContainer);
}
window.createSubtractionLine = createSubtractionLine;

function fillInSubtractionNumberLine(numB) {
    //run when enter is pressed
    //fill in numberline
    //calculate lines- every 100, 10, and 1 for numB
    let hundreds;
    let tens;
    let ones;
    const horizontalLine = document.getElementById("subHorizontalLine");
    const arrowContainer = document.getElementById("subArrowContainer");

    let total = parseInt(numA);
    
    const numBArray = numB.split("")
    
     if (numBArray.length === 3) {
      hundreds = parseInt(numBArray[0]);
      tens = parseInt(numBArray[1]);
      ones = parseInt(numBArray[2]);
     } else if (numBArray.length === 2) {
      hundreds = 0;
      tens = parseInt(numBArray[0]);
      ones = parseInt(numBArray[1]);
     } else if (numBArray.length === 1) {
      hundreds = 0;
      tens = 0;
      ones = parseInt(numBArray[0]);
     }
     //calculate numberline 
     let units = (horizontalLine.offsetWidth-45)/((hundreds*4)+(tens*2)+ones);
     if (units > 100) {
        units = 100;
     }
    
    //arrow animation setup
    const spriteWidth = 172;
    const spriteHeight = 130;
    const spriteAnimations = [];
    const animationStates = [
        {
            name: 'leftArrow',
            frames: 6,
        },
        {
            name: 'rightArrow',
            frames: 6,
        },
    ]
    
    let accumulator = 0;
    animationStates.forEach((state, index) => {
        let frames = {
            loc: [],
        }
        for (let j = 0; j < state.frames; j++) {
            let positionSpriteFrame = j * spriteHeight;
            let positionSpriteNum = accumulator * spriteHeight;
            frames.loc.push({x: 0, y: positionSpriteNum + positionSpriteFrame});        
        }
        accumulator += state.frames;
        spriteAnimations[state.name] = frames;
    });
    
    function createArrows(width, increment) {
        //arrow
        const arrowDiv = document.createElement("div");
        arrowDiv.classList.add("arrowDiv");
        const arrowCanvas = document.createElement("canvas");
        const ctx = arrowCanvas.getContext("2d");
        arrowCanvas.classList.add("arrowCanvas");
        //set div widths
            arrowCanvas.width = width;
            //height needs to match the width 190/1.46=130 -- keeps ratio the same
            arrowCanvas.height = (width/1.46);
            arrowCanvas.style.width = `${width}px`;
            arrowCanvas.style.height = `${width / 1.46}px`;       
        arrowDiv.appendChild(arrowCanvas);
        arrowContainer.appendChild(arrowDiv);
        
        // Animation
    const arrowImage = new Image();
    arrowImage.src = 'arrowSprites.png';
    
    const staggerFrames = 15; // The bigger the number, the slower the animation
    const totalFrames = spriteAnimations['leftArrow'].loc.length;
    let gameFrame = 0;
    let frameY;
    
    arrowImage.onload = () => {
        function animate() {
            ctx.clearRect(0, 0, arrowCanvas.width, arrowCanvas.height); // Clear canvas
            let position = Math.floor(gameFrame/staggerFrames);
            // const position = Math.floor(gameFrame / staggerFrames) % totalFrames; // Loop frames
            // const frameY = spriteAnimations['rightArrow'].loc[position].y;
            if(position < totalFrames) {
                if (gameFrame === 0) {
                    const starContainer = document.createElement("div");
                    starContainer.classList.add("starContainer");
                    starContainer.style.width= `${arrowCanvas.width/2}px`;
                    starContainer.style.height = `${arrowCanvas.width/2}px`;
    
                    const star = document.createElement("div");
                    star.classList.add("fivePointedStar");
                    star.style.fontSize = `${arrowCanvas.width/4}px`;
    
                    const starNumber = document.createElement("div");
                    starNumber.classList.add("starNumber");
                    starNumber.innerHTML = `-${increment}`; // Add your number here
    
                    // Append star and number to the container
                    starContainer.appendChild(star);
                    starContainer.appendChild(starNumber);
    
                    // Append the container to the arrow div
                    arrowDiv.appendChild(starContainer);
                }
                // Remove the star when the animation is done
                const star = arrowDiv.querySelector(".fivePointedStar");
                if (gameFrame > 60 && star) {
                    star.remove();
                }

            frameY = spriteAnimations['leftArrow'].loc[position].y;
            ctx.drawImage(
                arrowImage,
                0, frameY, spriteWidth, spriteHeight, // Source rectangle
                -8, 0, arrowCanvas.width-1, arrowCanvas.height // Destination rectangle
            );
            gameFrame++;
            requestAnimationFrame(animate); // Continue animation
        } else {
            frameY = spriteAnimations['leftArrow'].loc[5].y;
            ctx.drawImage(
                arrowImage,
                0, frameY, spriteWidth, spriteHeight, // Source rectangle
                -8, 0, arrowCanvas.width-1, arrowCanvas.height// Destination rectangle
            );
            }
        }
        animate(); // Start animation
    }
    
    }
    
    function createCountingDivs(width, increment) {
    
            //counting lines and numbers
            const countingContainer = document.createElement("div");
            countingContainer.classList.add("subCountingContainer");
            countingContainer.style.width= `${width}px`;
            const countingLine = document.createElement("div");
            countingLine.classList.add("verticalLine");
            const countNumber = document.createElement("div");
            countNumber.classList.add("countDisplay");
            countNumber.innerHTML= total-=increment;
            if (width <= 45) {
                countNumber.style.fontSize= "15px";
            }
            if (width <= 30) {
                countNumber.classList.add("stack");
            }
            countingContainer.appendChild(countingLine);
            countingContainer.appendChild(countNumber);  
            horizontalLine.appendChild(countingContainer);
    
    }
    
    if (hundreds > 0) { 
        for (let i = 0; i < hundreds; i++) {
            createCountingDivs(units * 4, 100);
    
            // Delay each arrow creation by 1 second per iteration
            setTimeout(() => createArrows(units * 4, 100), i * 1200);
        }
    }
    
    if (tens > 0) {
        for (let i = 0; i < tens; i++) {
            createCountingDivs(units * 2, 10);
    
            // Delay by total time spent on hundreds plus 1 second per iteration
            setTimeout(() => createArrows(units * 2, 10), (1200 * hundreds) + (i * 1200));
        }
    }
    
    if (ones > 0) {
        for (let i = 0; i < ones; i++) {
            createCountingDivs(units, 1);
    
            // Delay by total time spent on hundreds and tens plus 1 second per iteration
            setTimeout(() => createArrows(units, 1), (1200 * (hundreds + tens)) + (i * 1200));
        }
    }
    }
    window.fillInSubtractionNumberLine = fillInSubtractionNumberLine;