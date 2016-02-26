#!/usr/bin/env bash

start_dir=${PWD}
npm install

cd ./server
npm install

cd ${start_dir}
