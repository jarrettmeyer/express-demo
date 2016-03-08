#!/usr/bin/env bash

/vagrant/scripts/provision/install-gosu.sh
/vagrant/scripts/provision/install-postgres.sh
/vagrant/scripts/provision/setup-database.sh
/vagrant/scripts/provision/install-nodejs.sh

/vagrant/scripts/build.sh
