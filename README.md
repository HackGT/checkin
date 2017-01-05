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

### Tools

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

## Development and Deployment

The application code is in `app/`. Gulp is used to build the CSS and
Javascript. During development, `gulp watch` is preferred over `gulp build`
because it will continually build on file change (the markup draws directly
from the "built" CSS and Javascript so a build step is always needed).

If there are issues with the minified/uglified files, `gulp clean` will remove
anything created by `gulp build` (note: this isn't magic, if you change the
behavior of `build`, please update `clean` accordingly).

Because this site is entirely static, it can be hosted on Github Pages.
`push-to-ghpages.sh` is a script that automates the building and pushing
to Github Pages. `gulp deploy` will run that script. The target repo and branch
is specified in the script.
