#!/usr/bin/env bash

output=$(curl -s -X GET http://localhost:3000/api/status)
status=$(echo $output | jq -r '.status')
echo $status
echo

output=$(curl -s -X POST http://localhost:3000/api/login \
    -H 'Content-type: application/json' \
    -d '{"email":"admin@example.com","password":"test"}')
token=$(echo $output | jq -r '.token')
echo $token
echo

output=$(curl -s -X GET http://localhost:3000/api/documents \
    -H "Content-type: application/json" \
    -H "Authorization: token $token")
titles=$(echo $output | jq -r '.documents | .[].title')
echo $titles
echo
