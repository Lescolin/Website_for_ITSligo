const express = require('express');
const app = express();
const port = 3000;
const home = require('./routes/home');
const staff = require('./routes/staff');
const cookieParser = require('cookie-parser');
const getNewsData = () => [
    {
      heading: 'Covid is Cured',
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      Auther: 'Hector Colin'
    },
    {
        heading: 'Covid is still here',
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        Auther: 'Hector Colin',

    }  
]
const newsMiddleware = (req, res, next) => {
    if(!res.locals.partials) res.locals.partials = {}
    res.locals.partials.newsContext = getNewsData()
    next()
}

app.use(express.urlencoded({ extended: true })) 
app.use(newsMiddleware)
app.use(express.static('public'));
app.use(cookieParser('Hector le fort'));

// set up handlebars view engine
var handlebars = require('express-handlebars')
.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use('/', home);
app.use('/staff', staff);

app.get('/technoblade',  (req, res) => {
    res.type('text/plain');
    res.send('Subscribe to Technoblade and donate to research against cancer');
});

// // 404 catch-all handler (middleware)
app.use(function (req, res, next) {
    res.status(404);
    res.render('404');
});
// // 500 error handler (middleware)
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
