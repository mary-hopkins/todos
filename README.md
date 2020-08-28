# ReadMe
A ToDo List app for The Odin Project. Includes Webpack, Babel and Jest for the test suite. 

* Install
    I will be using npm instead of yarn for most of these installs.  
    You will need the following programs: Webpack, Jest, Babel
    
    Jest
        > npm install --save-dev jest
    
    Webpack
        >npm init -y
        >npm install webpack webpack-cli --save-dev
        >npm install --save-dev webpack-dev-server
    
    babel-loader
        >npm install -D babel-loader @babel/core @babel/preset-env webpack

* Launch
    Using webpack dev server, which is configured in package.json file.
    > npm start

* Known Issues
    preventDefault in eventListeners file.  