# Yelp Camp

## Requirements

For development, you will need Node.js and MongoDB installed on your environment.

### Node

To install Node, follow the official instructions for your OS [here](https://nodejs.org/en/download/).
You can also use a package manager if you prefer not to perform manual installation,
instructions can be found [here](https://nodejs.org/en/download/package-manager/#windows).

After installation, you should be able to run the commands below:

    $ node --version
    8.11.1
    
    $ npm --version
    5.6.0

### MongoDB

MongoDB has easy to follow [instructions](https://docs.mongodb.com/manual/administration/install-community/) for installation on your OS.
Just like Node, you should be able to run this command after installation:

    $ mongo --version
    MongoDB shell version v3.6.4
    git version: d0181a711f7e7f39e60b5aeb1dc7097bf6ae5856
    OpenSSL version: OpenSSL 1.0.2o  27 Mar 2018
    allocator: system
    modules: none
    build environment:
        distarch: x86_64
        target_arch: x86_64

---

## Install

Clone the repo and run `npm install` on the directory to download all Node dependencies:

    $ git clone https://github.com/YuanchengWu/yelp-camp.git
    $ cd <PROJECT DIRECTORY>
    $ npm install

## Start & watch

Simply have Mongo Daemon running then start Node on app.js:

Open a terminal to run Mongo Daemon on project directory:

    $ mongod

In another terminal session, run:

    $ node app.js

Go to `localhost:3000` in your browser to view the web app. 

---

## Languages & tools

### HTML

- [EJS](http://ejs.co/) for some templating.

### JavaScript

- [Bootstrap 4](https://getbootstrap.com/) is used for UI.

### CSS

- Just plain CSS

### Database

- [MongoDB](https://docs.mongodb.com/) for account and content creation/management.

### Routing

- [Express](https://expressjs.com/) framework for routing and middleware.

### Notable Node/Express packages

- [body-parser](https://github.com/expressjs/body-parser) for incoming request handling/parsing.
- [mongoose](http://mongoosejs.com/) for simplifying MongoDB development.
- [flash](https://github.com/expressjs/flash) to flash messages on pages.
- [passport](passportjs.org) for user authentication.