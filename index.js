const fs = require('fs');
const inquirer = require('inquirer');
const { Triangle, Circle, Square } = require('./lib/shapes');

async function generateLogo() {
  const { text, textColor, shape, shapeColor } = await inquirer.prompt([
    { type: 'input', name: 'text', message: 'Enter up to three characters for the logo:', validate: input => input.length <= 3 ? true : 'Text must be up to 3 characters long' },
    { type: 'input', name: 'textColor', message: 'Enter the text color (keyword or hex):' },
    { type: 'list', name: 'shape', message: 'Choose a shape:', choices: ['circle', 'triangle', 'square'] },
    { type: 'input', name: 'shapeColor', message: 'Enter the shape color (keyword or hex):' }
  ]);

  let shapeInstance;

  switch (shape) {
    case 'circle':
      shapeInstance = new Circle();
      break;
    case 'triangle':
      shapeInstance = new Triangle();
      break;
    case 'square':
      shapeInstance = new Square();
      break;
  }

  shapeInstance.setColor(shapeColor);

  const svg = `
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      ${shapeInstance.render()}
      <text x="150" y="100" font-size="48" text-anchor="middle" fill="${textColor}">${text}</text>
    </svg>
  `;

  fs.writeFileSync('logo.svg', svg);
  console.log('Generated logo.svg');
}

generateLogo();