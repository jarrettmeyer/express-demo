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
$ nodemon --watch server
```

### Available endpoints

#### GET /api/status

Check to see if the application is up.

```
response body:
{
  status: "server is up",
  timestamp:1457577707037
}
```

#### POST /api/login

Login to the application.

```
POST body:
{
  email: <user_email>,
  password: <user_password>
}

response:
{
  token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3N1ZWQiOjE0NTc1Nzc4NTQwOTksImV4cGlyZXMiOjE0NTk5OTcwNTQwOTl9.dsjbWnQIxvkTFRoXN3pC8euW2HLoPVsHiUdI9Tgjp8s"
}
```

#### GET /api/documents

Get all documents that are visible to the user. This will include all of the user's documents and all documents from other users that have been flagged as published. User must be authenticated.

```
response body:
{
  documents: [{
    id: 1,
    ownerId: 2,
    title: "Fixture document #1",
    abstract: "Fixture document #1",
    type: "text/plain",
    published: true
  }, {
    id":3,
    ownerId: 4,
    title: "Fixture document #4",
    abstract: "Fixture document #4.",
    type: "text/plain",
    published: true
  }, {
    /* snip */
  }]
}
```

#### GET /api/documents/:id

Get a document by id. User must be authenticated. The document must be published, or the document must belong to the current user.

```
response body:
{
  document: {
    id: 1,
    ownerId: 2,
    title: "Fixture document #1",
    abstract: "Fixture document #1",
    type: "text/plain",
    published: true
  }
}
```

#### POST /api/documents

Create a new document.

#### GET /api/documents/:id/file

The the file attachment for a document.

#### POST /api/documents/:id/file

Attach a file to a document. A document can have exactly one file associated with it. A user can only attach a file if a user owns the document.

#### GET /api/owners

Get all owners. User must be authenticated.

```
response body:
{
  owners: [{
    id: 2,
    displayName: "Alice A",
    email: "alice@example.com"
  }, {
    id: 4,
    displayName: "Claire C",
    email: "claire@example.com"
  }, {
    /* snip */
  }]
}
```

#### GET /api/owners/:id

Get an owner by id. User must be authenticated.

```
response body:
{
  owner: {
    id: 4,
    displayName: "Claire C",
    email: "claire@example.com"
  }
}
```

#### GET /api/users

Get a list of all users in the application. This is only allowed if the user is an administrator.

```
response body:
{
  users: [{
    id: 2,
    displayName: "Alice A",
    email: "alice@example.com",
    admin: false,
    tokenIssuedAt: "2016-03-10T11:05:48.532Z"
  }, {
    id: 3,
    displayName: "Betty B",
    email: "betty@example.com",
    admin: false,
    tokenIssuedAt: "2016-02-16T18:43:12.630Z"
  }, {
    /* snip */
  }]
}
```

## Running tests

```
$ npm test
```
