#!/usr/bin/env bash

# db-migrate reset --env test
db-migrate up --env test
NODE_ENV=test node scripts/purge-database
NODE_ENV=test node scripts/insert-fixtures
NODE_ENV=test DEBUG=server mocha "server/tests/**/*.js"
