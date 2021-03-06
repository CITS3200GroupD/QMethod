# QMd v2

[![CodeFactor](https://www.codefactor.io/repository/github/CITS3200GroupD/QMethod/badge)](https://www.codefactor.io/repository/github/CITS3200GroupD/QMethod)
[![Docs Status](https://img.shields.io/badge/docs-ready-orange.svg)](https://qmethod.gitbook.io/project/)
[![Build Status](https://travis-ci.org/CITS3200GroupD/QMethod.svg?branch=master)](https://travis-ci.org/CITS3200GroupD/QMethod)
[![GitHub forks](https://img.shields.io/github/forks/CITS3200GroupD/QMethod.svg?style=social&label=Fork)](https://github.com/CITS3200GroupD/QMethod)

QMd Survey - MEAN Stack Powered Q-Sort Methodology Survey Application
Version 2.1

## What is QMd?

QMd is a user friendly MEAN stack powered web data collection application originally developed by a team at the University of Western Australia (UWA) to aid in Q-Sorts to aid in Q-methodology research in the field of social sciences and psychology.

QMd offers a range of features, tailored to suit the needs of the UWA social sciences department, that existing solutions currently do not provide:

* Dynamic adjustment of the display grid (both in terms of Horizontal-X axis scaling as well as adjustment of kurtosis) as well as statements.Drag and drop functionality for sorting statement cards into the Q-sort grid.
* Handling of multiple Q-sort surveys running simultaneously, with separate personal links (routing) for different surveys.Encrypted cloud-based storage of all data with:Support for Mongo DBaaS (Database as as cloud) cloud database storage providers (Mongo Atlas, mLab, etc.)
* The ability to view, edit and delete survey data through the application
* The ability to view, export (screenshot) and delete user data through the application
* A follow-up questionnaire for participants

For a more detailed explanation of the full feature set of QMd please read our breakdown [here](https://qmethod.gitbook.io/project/about/features).

## Deployment

Please read the following for either [a basic](https://qmethod.gitbook.io/project/installation/basic-deploy) or [advanced](https://qmethod.gitbook.io/project/installation/advanced-deploy) guide to deploying this MEAN stack powered application to the Heroku Cloud.

[![Video Guide](https://i.imgur.com/jG5lEUu.png)](https://streamable.com/k1ztc)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/evanhwk/QMethod/tree/master)

### Supported Browsers

* Chrome 36+
* Firefox 51+
* Edge 12+
* Safari 9+
* Opera 30+
* iOS 9+
* Android 4.4+

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.3.

# For Developers

## Development server

If you have not installed nodemon as a global npm dependecy, do so by running `npm i -g nodemon`.

Run `npm install` to update your dependencies.

Run `nodemon server` and `ng serve` for a dev server. Shell scripts are provided for this in `test.bat` and `test.sh`.

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `node.js server & jasmine-node-karma spec/routes_spec.js --autotest` to execute tests for the express server.

## Running end-to-end tests

Run `node.js server & ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Credit/Dependencies

This application uses Open Source components. You can find the source code of these open source projects along with their respective license information below.

* [Angular 6.1.0](https://github.com/angular/angular)
* [Express 4.16.3](https://github.com/expressjs/express)
* [body-parser 1.18.3](https://github.com/expressjs/body-parser)
* [Mongoose 5.2.12](https://github.com/Automattic/mongoose)
* [Bootstrap 4.1.3](https://github.com/twbs/bootstrap/tree/master)
* [fontawesome 5.3.1](https://github.com/FortAwesome/Font-Awesome)
* [ngbootstrap 3.2.0](https://github.com/ng-bootstrap/ng-bootstrap)
* [Bootstrap 4.1.3](https://github.com/twbs/bootstrap/tree/master)
* [ng-drag-drop 5.0.0](https://github.com/ObaidUrRehman/ng-drag-drop)
* [ng2-pagination 2.0.2](https://github.com/michaelbromley/ngx-pagination)
* [ng2-slim-loading-bar 4.0.0](https://github.com/akserg/ng2-slim-loading-bar)
* [rxjs 6.0.0](https://github.com/Reactive-Extensions/RxJS)
* [rxjs-compat 6.3.1](https://github.com/ReactiveX/rxjs/tree/master/compat)
* [zone.js 0.8.26](https://github.com/angular/zone.js/)
* [cookie-parser 1.4.3](https://github.com/expressjs/cookie-parser)
* [core-js 2.5.4](https://github.com/zloirock/core-js)
* [cors 2.8.4](https://github.com/expressjs/cors)
* [jsonwebtoken 8.3.0](https://github.com/auth0/node-jsonwebtoken)
* [forever-monitor 1.7.2](https://github.com/foreverjs/forever-monitor)
