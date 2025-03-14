# VisualCalculator

This is a visual aid calculator for students, targeted at grades 1-5.
The fully functional calculator comes with added visual support for younger students.
Elementary grade level appropriate equations are animated using common visual representations of operations.

# Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Stack](#stack)
- [Sprite Sheets](#sprite_sheets)
- [Installation](#installation)
- [Usage](#usage)
- [Contact](#contact)

## Introduction

Our Visual Calculator was designed by two certified teacher programmers who wanted to create a method for students in grades 1-5 to visualize the math processes that they are exploring. Using our personal expertise and established curriculum guidelines, we chose representations of the four main operations - addition, subtraction, multiplication, and division - that will be familiar to students. Addition and subtraction are represented by animated movement along the number line. Multiplication and division are represented by repeated addition or subtraction of dots into corresponding groupings. This takes calculator use from an abstract tool to something more concrete that reinforces common math models.

## Features

- Addition, subtraction, multiplication, and division operations
- Clear and intuitive user interface
- The design is responsive for larger screens, but mobile optimization is still in progress

## Stack

This project is developed using only HTML, CSS, and JavaScript. It is a showcase of the serviceability of vanilla JavaScript.

Because the animations are dynamic, the DOM elements are created in JavaScript functions based on the input from the calculator. The functions create, design, adjust, and place divs to illustrate the operations using vanilla JavaScript - no animation expertise here! Just two teachers using the skills they have to help students!

## Sprite Sheets

The animated arrows used to demonstrate addition and subtraction were created using a sprite sheet. Each individual arrow frame was drawn in Inkscape, a vector graphics software. Then the frames were combined into a single sprite sheet using Texture Packer, a tool that arranges multiple images into a single file. The sprite sheet was then imported into the program, where we referenced different regions depending on the arrow that was needed. The animation itself is drawn on an **HTML `<canvas>` element**, where the number line and corresponding number are also drawn. When a student performs an addition or subtraction, the program selects and displays the correct arrow frames in sequence. The function loops through the "rightArrow" frames of the image for the purple addition arrow and the "leftArrow" frames for the pink subtraction arrow. This process works similarly to traditional cartoon animation, where flipping through the frames quickly creates the effect of motion.

## Installation

To use the Visual Calculator, follow these steps:

1. **Download or Clone the Repository**

   - Download the ZIP file from GitHub and extract it, or
   - Clone the repository using Git:
     ```bash
     git clone https://github.com/MariBeth2024/visualCalcProject.git
     ```

2. **Open the Project**
   - Navigate to the project folder.
   - Open the `index.html` file in a web browser.

## Usage

Once the application is running, you can use the calculator by clicking on the buttons with your mouse or through touchscreen. Click the 'Clear' button before starting a new operation to reset the visual elements.

## Contact

For any questions or suggestions, please contact us through LinkedIn at https://www.linkedin.com/in/marianne-anderson13/ or http://www.linkedin.com/in/bethqualls.

Thank you for checking out our Visual Aid Calculator!
