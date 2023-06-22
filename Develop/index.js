const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');

// array of questions for user
const promptUser = () => {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Enter a description of your project.'
      },
      {
        type: 'confirm',
        name: 'table',
        message: 'Would you like to include a table of contents?',
        default: true
      },
      {
        type: 'input',
        name: 'installation',
        message: 'Enter installation information.'
      },
      {
        type: 'input',
        name: 'usage',
        message: 'Enter usage information.'
      },
      {
        type: 'list',
        name: 'licenses',
        message: 'Which license is your project covered under?',
        choices: ['Apache', 'Eclipse', 'GNU', 'IBM', 'MIT', 'Mozilla'],
      },
      {
        type: 'input',
        name: 'contribution',
        message: 'Enter information on how someone can contribute to your project.'
      },
      {
        type: 'input',
        name: 'tests',
        message: 'Enter any tests that are relevant to your project.'
      },
      {
        type: 'input',
        name: 'email',
        message: 'Enter your email address.'
      },
      {
        type: 'input',
        name: 'username',
        message: 'Enter your github username.'
      }
    ]);
  };
    promptUser()
      .then(portfolioData => {

        const readMeInfo = generateMarkdown(portfolioData);
        fs.writeFile('./readMe.md', readMeInfo, err => {
           if (err) throw new Error(err);
    
           console.log('Page created! Check out readMe.md in this directory to see it!');
         });
      });