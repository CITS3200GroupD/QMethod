#!/bin/bash
nodemon server &
jasmine-node-karma spec/all_spec.js --autotest