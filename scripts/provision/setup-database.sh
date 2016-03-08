#!/usr/bin/env bash

export OWNER=express_demo
export DEV_DB=express_demo_development
export TEST_DB=express_demo_test

gosu postgres psql -c "CREATE USER ${OWNER} WITH PASSWORD '${OWNER}';"
gosu postgres createdb -O ${OWNER} ${DEV_DB}
gosu postgres createdb -O ${OWNER} ${TEST_DB}
