# Check-ins!!!

Throwing a hackathon? Have hackers? Want to keep track of who shows up?
Well this is the app for you!

This is a pure front-end Angular.js app that offers an interface geared
entirely for checking in attendees. The backend is entirely separate.
This application uses a HackMIT's (as-of-this-writing still closed source)
hacker application and registration system as a backend.

## Dependencies

### Application

 - Angular 1.5
 - [Semantic UI](http://semantic-ui.com/)
 - Angular UI Router
 - jQuery

### Tooling and Deployment

 - Node.js and npm
 - Gulp - uglify and minify JS and CSS
 - Bower - manage front-end dependencies (see Application above)

## Ready, Set, GO!

### Install all the things!

Assuming `npm` is already available...

```bash
npm install -g gulp-cli bower
npm install
bower install
```

### Config

```bash
cp app/config/config.js.example app/config/config.js
vim app/config/config.js # edit the api url to match your backend url
```

### Launch!

```bash
gulp build
http-server app/
```

Navigate to `http://localhost:8080` (or wherever your basic http server goes)
and enjoy!
