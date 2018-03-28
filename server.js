const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

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

// app.use((request, response, next) => {
//     response.render('maintenance.hbs', {
//         pageTitle: 'Maintenance'
//     })
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (request, response) => {
    response.render('home.hbs', {
        pageTitle: 'Home page',
        pageBody: 'The nice page body'
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

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
