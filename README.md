# Express Demo

This is another demo express application. How would I (Jarrett Meyer) build an Express application from scratch? The sample application in question is a simple document sharing database. Users can create and upload documents. Documents that are published are publicly visible.

## Vagrant Up

The application runs inside of a Vagrant VM. After you clone the project, run `vagrant up` from you command line to build the virtual machine.

### What's inside the VM?

The VM contains everything you need to build and run the application.

* Postgres 9.5.1
* NodeJS 5.7.0
* All necessary global npm packages required by the command line.

## Starting the application

From inside the VM...

```
$ cd /vagrant
$ npm start
```

Or, if you would like to make changes and see the changes without restarts, use [nodemon](https://www.npmjs.com/package/nodemon). This will run your `start` script automatically for you.

```
$ nodemon
```

### Available endpoints

#### GET /api/documents

Get all documents that are visible to the user. This will include all of the user's documents and all documents from other users that have been flagged as published.

#### POST /api/documents

Create a new document.

#### POST /api/documents/:id/file

Attach a file to a document. A document can have exactly one file associated with it. A user can only attach a file if a user owns the document.

#### GET /api/users

Get a list of all users in the application. This is only allowed if the user is an administrator.

## Running tests

```
$ npm test
```
