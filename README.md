## BL Primo Customisation

A small project that allows you to run a local development environment for primo frontend customisation

`npm install`

`npm run start` - this is the development build, this will run webpack dev server with script injection into proxy for the Primo instance - this is specific for styling and JS

`npm run static` - this gets us the HTML output with styling and JS

`npm run build` - this is the production build, this will output the custom styling/js/html for Primo as a ZIP

# Next steps:
1. Speak to Jamie and get a copy of the live code
    a. As part of this tell them not to make any code changes for around 1 week to facilitate us doing the work
2. Fork the primo customisation build into another repo 
    a. We want a vanilla build we can open source for others to use
    b. We want our specific use case build for production primo customisation which is not open sourced 
3. Convert the CSS to SCSS
4. Make the JS Modular
5. Ensure HTML output
6. Fork the static header/footer projects and make the Primo specific changes
7. Publish header/footer primo forks to NPM
8. Import header/footer primo package into this project
9. Ensure output Zip matches provided Zip
10. CELEBRATE!

# Futher todos

1. Add "release" concept from github to project
2. Add semantic versioning
3. Add changelog
4. Add issues format to github
5. Open source the project
