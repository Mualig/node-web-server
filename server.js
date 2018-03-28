const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//
// Express middleware
//
app.use((request, response, next) => {
    let now = new Date().toString();
    let log = `${now}: ${request.method} ${request.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (error) => {
        if (error) {
            console.log('Unable to append to server.log');
        }
    });

    next();
});

// Maintenance mode
// app.use((request, response, next) => {
//     response.render('maintenance.hbs', {
//         pageTitle: 'Maintenance'
//     })
// });

// Static pages
app.use(express.static(__dirname + '/public'));

//
// Express helpers
//
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

//
// Routes
//
app.get('/', (request, response) => {
    response.render('home.hbs', {
        pageTitle: 'Home page',
        pageBody: 'The nice page body'
    });
});

app.get('/projects', (request, response) => {
    response.render('projects.hbs', {
        pageTitle: 'Projects page',
        pageBody: 'The nice page body for the projects'
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About page'
    });
});

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'Error handling request'
    });
});

// Start Express
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
