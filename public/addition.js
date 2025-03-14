function initializeCanvas() {
    const pictureVisualDiv = document.getElementById("pictureVisual"); 
    const canvas = document.createElement("canvas");
    canvas.id = "canvas";
    pictureVisualDiv.appendChild(canvas);
    const rect = canvas.getBoundingClientRect();

    //Set canvas dimensions to match CSS-rendered size
    canvas.width = rect.width;
    canvas.height = rect.height;
}

function createAddLine(numA) {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const lineLocation = canvasHeight*(3/4);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, lineLocation, canvasWidth, 3);  //creates number line
    ctx.fillRect(20, lineLocation - 7, 3, 15);  //creates first dash on number line

    ctx.font = '20px Helvetica';
    const textWidth = ctx.measureText(numA).width;
    const centeredText = 20 - textWidth / 2;
    ctx.fillText(numA, centeredText, lineLocation + 30);  //puts numA on the number line
}

function animateAddition(numA, numB) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const lineLocation = canvasHeight*(3/4);

    let frameY = 0;
    let arrowState = 'rightArrow'
    const arrowImage = new Image();
    arrowImage.src = 'arrowSprites.png';
    const spriteWidth = 190;
    const spriteHeight = 130;

    let gameFrame = 0;
    const staggerFrames = 10;  //a lower number gives a higher speed to the animation

    let locationDash = 20;  //starting x px value of the initial dash on number line
    let currentNum = parseFloat(numA); //keeps track of current number on number line

    let hundreds = Math.floor(numB/100) * 100;
    let tens = Math.floor((numB - hundreds)/10) * 10;
    let ones = numB - hundreds - tens
    let units = (canvasWidth - 40) / ((hundreds*4/100)+(tens*2/10)+ones);
    if (hundreds === 0 && units > 200) {
        units = 200;
    } else if (hundreds > 0 && units > 100) {
        units = 100;
    }

    const hundredsScale = 4;
    const tensScale = 2;

    // measures and then centers the text above the arrows +1, +10, +100
    const textWidth100 = ctx.measureText("+100").width;
    const centeredText100 = (units*hundredsScale)/2 - textWidth100/2;
    const textWidth10 = ctx.measureText("+10").width;
    const centeredText10 = (units*tensScale)/2 - textWidth10/2;
    const textWidth1 = ctx.measureText("+1").width;
    const centeredText1 = (units)/2 - textWidth1/2;

    const arrowScale = 127;     //width of arrow in px, equivalent to one unit on canvas
    const leftMarginPX = 25;    //left margin on sprite
    const topMarginAndArrowPX = 106;   //top margin + height of arrow on sprite
    const leftMargin = (leftMarginPX/arrowScale)*units;     //left margin scaled in terms of units
    const topMarginAndArrow = (topMarginAndArrowPX/arrowScale)*units;  //top margin & arrow scaled in terms of units
    const arrowWidth = (spriteWidth/arrowScale)*units;      //arrowWidth scaled in terms of units
    const arrowHeight = (spriteHeight/arrowScale)*units;        //arrowHeight scaled in terms of units

    const starImage = new Image();
    starImage.src = 'starV1.png';
    const starPXWidth = 405;
    const starPXHeight = 388;
    const starWidth = units/3;      // creates a star that is 1/3 as wide as the arrow
    const starHeight = (starPXHeight/starPXWidth)*units/3;  // scales down the height to align with the scale of the width

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

    // Created an array to store all pieces of image to be drawn each time animate is called
    const animationArray = [];

    function animate() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        createAddLine(numA);

        animationArray.forEach((drawFunction) => drawFunction());

        let totalFrames = spriteAnimations[arrowState].loc.length;
        let position = Math.floor(gameFrame/staggerFrames) % totalFrames;

        if(!(hundreds === 0 && tens === 0 && ones === 0)) {
            frameY = spriteAnimations[arrowState].loc[position].y;
            if(hundreds != 0) {
                ctx.drawImage(arrowImage,
                    0,      // X location to pull from source file
                    frameY,   // Y location to pull from source file & also current frame
                    spriteWidth,    
                    spriteHeight, 
                    locationDash - leftMargin*hundredsScale,        // canvas placement of arrow in X direction
                    lineLocation - topMarginAndArrow*hundredsScale,     // canvas placement of arrow in Y direction
                    arrowWidth*hundredsScale,       // canvas size of arrow width
                    arrowHeight*hundredsScale)      // canvas size of arrow height
                ctx.drawImage(starImage,
                    locationDash + units*hundredsScale/2 - starWidth*hundredsScale/2,        // canvas placement of arrow in X direction
                    lineLocation - topMarginAndArrow*hundredsScale - starHeight*hundredsScale/2,     // canvas placement of arrow in Y direction
                    starWidth*hundredsScale,       // canvas size of star width
                    starHeight*hundredsScale)      // canvas size of star height
                ctx.fillText("+100", locationDash + centeredText100, lineLocation - topMarginAndArrow*hundredsScale + 10);
                if((staggerFrames*totalFrames-1) === gameFrame%(staggerFrames*totalFrames)) {
                    animationArray.push(((frame, dashX) => () => 
                        ctx.drawImage(arrowImage, 0, frame, spriteWidth, spriteHeight, 
                            dashX - leftMargin*hundredsScale,        
                            lineLocation - topMarginAndArrow*hundredsScale,       
                            arrowWidth*hundredsScale,                             
                            arrowHeight*hundredsScale))                      
                            (frameY, locationDash)) ;
                    animationArray.push(((dashX) => () => {
                        ctx.fillText("+100", dashX + centeredText100, lineLocation - topMarginAndArrow*hundredsScale + 10);
                    })(locationDash));                    
                    locationDash += units*hundredsScale;
                    currentNum += 100;
                    animationArray.push(((dashX) => () => ctx.fillRect(dashX, lineLocation - 7, 3, 15))(locationDash));
                    animationArray.push(((current, dashX) => () => {
                        const textWidth = ctx.measureText(current).width;
                        const centeredText = dashX - textWidth / 2;
                        ctx.fillText(current, centeredText, lineLocation + 30)
                    })(currentNum, locationDash));
                    hundreds -= 100;
                }
            } else if(tens != 0) {
                ctx.drawImage(arrowImage, 0, frameY, spriteWidth, spriteHeight, 
                    locationDash - leftMargin*tensScale,      
                    lineLocation - topMarginAndArrow*tensScale,     
                    arrowWidth*tensScale,      
                    arrowHeight*tensScale) 
                ctx.drawImage(starImage,  
                    locationDash + units*tensScale/2 - starWidth*tensScale/2,       
                    lineLocation - topMarginAndArrow*tensScale - starHeight*tensScale/2,   
                    starWidth*tensScale,      
                    starHeight*tensScale)    
                ctx.fillText("+10", locationDash + centeredText10, lineLocation - topMarginAndArrow*tensScale + 10);     
                if((staggerFrames*totalFrames-1) === gameFrame%(staggerFrames*totalFrames)) {
                    animationArray.push(((frame, dashX) => () => 
                        ctx.drawImage(arrowImage, 0, frame, spriteWidth, spriteHeight, 
                            dashX - leftMargin*tensScale,        
                            lineLocation - topMarginAndArrow*tensScale,       
                            arrowWidth*tensScale,                             
                            arrowHeight*tensScale))                      
                            (frameY, locationDash))  
                    animationArray.push(((dashX) => () => {
                        ctx.fillText("+10", dashX + centeredText10, lineLocation - topMarginAndArrow*tensScale + 10);
                    })(locationDash)); 
                    locationDash += units*tensScale;
                    currentNum += 10;
                    animationArray.push(((dashX) => () => ctx.fillRect(dashX, lineLocation - 7, 3, 15))(locationDash));
                    animationArray.push(((current, dashX) => () => {
                        const textWidth = ctx.measureText(current).width;
                        const centeredText = dashX - textWidth / 2;
                        ctx.fillText(current, centeredText, lineLocation + 30)
                    })(currentNum, locationDash));
                    tens -= 10;
                }
            } else if(ones != 0) {
                ctx.drawImage(arrowImage, 0, frameY, spriteWidth, spriteHeight, 
                    locationDash - leftMargin,      
                    lineLocation - topMarginAndArrow,     
                    arrowWidth,      
                    arrowHeight)  
                ctx.drawImage(starImage, 
                    locationDash + units/2 - starWidth/2,    
                    lineLocation - topMarginAndArrow - starHeight/2, 
                    starWidth,   
                    starHeight)   
                ctx.fillText("+1", locationDash + centeredText1, lineLocation - topMarginAndArrow + 10); 
                if((staggerFrames*totalFrames-1) === gameFrame%(staggerFrames*totalFrames)) {
                    animationArray.push(((frame, dashX) => () => 
                        ctx.drawImage(arrowImage, 0, frame, spriteWidth, spriteHeight, 
                            dashX - leftMargin,        
                            lineLocation - topMarginAndArrow,       
                            arrowWidth,                             
                            arrowHeight))                      
                            (frameY, locationDash))    
                    animationArray.push(((dashX) => () => {
                        ctx.fillText("+1", dashX + centeredText1, lineLocation - topMarginAndArrow + 10);
                    })(locationDash));                 
                    locationDash += units;
                    currentNum += 1;
                    animationArray.push(((dashX) => () => ctx.fillRect(dashX, lineLocation - 7, 3, 15))(locationDash));
                    animationArray.push(((current, dashX) => () => {
                        const textWidth = ctx.measureText(current).width;
                        const centeredText = dashX - textWidth / 2;
                        ctx.fillText(current, centeredText, lineLocation + 30)
                    })(currentNum, locationDash));
                    ones--;
                }
            };
            gameFrame++;
            requestAnimationFrame(animate);

        }

        
    }
    animate(); 

}


//Attach to global scope
window.initializeCanvas = initializeCanvas;
window.createAddLine = createAddLine;
window.animateAddition = animateAddition;