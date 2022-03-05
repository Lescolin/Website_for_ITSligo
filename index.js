const express = require('express');
const app = express();
const port = 3000;
const home = require('./routes/home');
const staff = require('./routes/staff');
const cookieParser = require('cookie-parser');
const getNewsData = () => [
    {
      heading: 'The website is finished',
      body: "Actually no. But there is everything that is required and that my lazyness can provide without dying. This is a big news right ?",
      Auther: 'Hector Colin'
    },
    {
        heading: 'Contest miss Kitty',
        body: "Miss Kitty Ukraine has been elected as Miss Universal Kitty. Her cuteness will bring end to war in a pur.",
        Auther: 'Hector Colin'
    },
    {
        heading: 'The crow',
        body: "Have you seen my crow ? Just in a word, he disapeared, I don't know where he flew. He must be hiding somewhere.",
        Auther: 'Hector Colin'
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
