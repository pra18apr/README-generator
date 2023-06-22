const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');

// array of questions for user
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is your project title?',
        validate: input => {
            if (input) {
                return true;
            } else {
                console.log('Please enter your project name!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Describe your project in a few sentences.',
        validate: input => {
            if (input) {
                return true;
            } else {
                console.log('Please enter your project description!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Describe the installation instructions for your application.',
        validate: input => {
            if (input) {
                return true;
            } else {
                console.log('Please enter installation instructions for your application!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Describe how a user will use your application.',
        validate: input => {
            if (input) {
                return true;
            } else {
                console.log('Please enter usage instructions for your application!');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'licenseConfirm',
        message: 'Does your project repository already have a license assigned?',
    }, {
        when: function (response) {
            if (response.licenseConfirm === false) {return true;}
            else {return false}
        },
        type: 'list',
        name: 'license',
        message: 'What license are you using with your project?  (Select one)',
        choices: ['MIT', 'GNU GPLv3', 'Apache 2.0', 'other']        
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Describe how another developer can contribute to the project.',
        validate: input => {
            if (input) {
                return true;
            } else {
                console.log('Please enter instructions for contributing to your project!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Provide test instructions for your application.',
        validate: input => {
            if (input) {
                return true;
            } else {
                console.log('Please enter test instructions!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: 'Provide your GitHub username.',
        validate: input => {
            if (input) {
                return true;
            } else {
                console.log('Please enter your GitHub username!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'githubRepo',
        message: 'Provide the GitHub repository name for your project.',
        validate: input => {
            if (input) {
                return true;
            } else {
                console.log('Please enter your GitHub repository name!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'Provide an email for users to contact you with questions.',
        validate: input => {
            if (input) {
                return true;
            } else {
                console.log('Please enter your contact email!');
                return false;
            }
        }
    }
];

// function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, generateMarkdown(data), err => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log('README.md file created!')
        }
    })
};

// function to initialize program
function init() {
    return inquirer
        .prompt(questions)
        .then(readmeData => {
            return writeToFile('./dist/README.md',readmeData)
        })
        .catch(err => {
            console.log(err);
        })
};

// function call to initialize program
init();