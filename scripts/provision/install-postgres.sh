#!/usr/bin/env bash

export GOSU_VERSION=1.7
export PG_MAJOR=9.5
export PG_VERSION=9.5.1-1.pgdg14.04+1
export PGDATA=/var/lib/postgresql/data

# Create the group and user for postgres.
groupadd -r postgres
useradd -r -g postgres postgres

mkdir -p /var/run/postgresql
chown -R postgres /var/run/postgresql

# Install postgres.
sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ trusty-pgdg main" >> /etc/apt/sources.list.d/postgresql.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
apt-get -y update
apt-get -y install postgresql-${PG_MAJOR}=${PG_VERSION} \
                   postgresql-client-${PG_MAJOR}=${PG_VERSION} \
                   postgresql-contrib-${PG_MAJOR}=${PG_VERSION}
apt-get -y autoremove

# Create a vagrant user, for sanity.
gosu postgres createuser -s vagrant
gosu postgres createdb vagrant

# You should now be able to connect to PG, from inside the Vagrant VM with the
# psql command.
#
# $ psql
#
