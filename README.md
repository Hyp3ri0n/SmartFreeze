# SmartFreeze

## Description

This is a little repository that bring you a development environment to create a project with [Angular](https://angular.io/) that let you create either an web application, a desktop application or a phone application. You can generate them thanks to [Cordova](https://cordova.apache.org/) or [Electron](https://electron.atom.io/).

## Infos

* [Bootstrap](http://getbootstrap.com/) : For the fron-end there is Bootstrap (style and grid).
* [Font-Awesome](http://fontawesome.io/) : To incorporate some icons there is font-awesome.
* [Roboto](https://fonts.google.com/specimen/Roboto) : The font for the text is Roboto.

## Architecture

|-- dist&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Folder that contains the build of the app (will be generated | same structure as "./src")  
|-- node_modules&nbsp;&nbsp;&nbsp;&nbsp;// Folder that contains all the modules (will be generated)  
|-- src&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Folder that contains all the sources (development environment)  
|-- resources&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Folder that contains all the resources for Cordova and Electron  
|&nbsp;&nbsp;&nbsp;&nbsp;|-- app  
|&nbsp;&nbsp;&nbsp;&nbsp;|-- assets  
|&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|-- fonts  
|&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|-- images  
|&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|-- styles  
|&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|-- vendors  
|&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--libs  
|&nbsp;&nbsp;&nbsp;&nbsp;|--main.js  
|&nbsp;&nbsp;&nbsp;&nbsp;|--index.html  
|&nbsp;&nbsp;&nbsp;&nbsp;|--package.json&nbsp;// This file is needed by electron  
|-- bs-config.json&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Config for the lite-server  
|-- gulpfile.js&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Gulpfile which contains tasks  
|-- package.json&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Config for npm dependencies, etc...  
|-- readme.md&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Me :)  
|-- tsconfig.json&nbsp;&nbsp;&nbsp;&nbsp;// Config for the compiler  
|-- tslint.json&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Config for tslint module (the format of ".ts" files)  

------------------

## 1 - Software needed

Before anything, you need to download and install [NodeJS](https://nodejs.org/en/) with is npm package system.

## 2 - Modules npm

You will also need some modules from npm. Here is a list with their command to install them :

* Gulp :
> npm install -g gulp

* Cordova :
> npm install -g cordova

## 3 - Dependencies

So now, you have to install all modules present in the file "package.json" by simply write this command line from the root folder :
> npm install

## 4 - Start your project (developpement time) 

You have to launch the watchers to build and "watch" your project on a console :
> npm run app:watch-web

And finally, on another console, you can launch the lite-server and start coding :
> npm run ltserver:start  

## 5 - Commands

To clean your project :
> npm run app:clean-web  
> npm run app:clean-electron  
> npm run app:clean-cordova  
> npm run app:clean-all  

To build your project :
> npm run app:build-web  
> npm run app:build-electron  
> npm run app:build-cordova  

To launch watchers on sources :
> npm run app:watch-web

To start lite-server :
> npm run ltserver:start

To start Electron to debug project :
> npm run electron:start

To start Cordova to debug project :
> npm run cordova:android-start

To generate your project on Electron :
> npm run electron:pack-win64

------------------

## Special thanks

A big thanks to [@kolorobot](https://github.com/kolorobot) for his great [repo](https://github.com/kolorobot/angular2-typescript-gulp) that helped me a lot to understand all of this.

## License

None, take it and make whatever you want. :)
