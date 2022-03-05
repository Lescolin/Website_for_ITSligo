const express = require('express');
const router = express.Router();
var data = {"foil" : { "name": "foil",
        "dob": "01/01/1998",
        "imageurl": "/images/foilimage1.png",
        "hobbies": ["Jokes", "Gags", "Stand up", "Watch himself in a mirror and laugh", "Take care of Moustache"]},

    "david" : { "name": "david",
        "dob": "01/01/-100",
        "imageurl": "/images/david.png",
        "hobbies": ["Bully Goliath", "Take a shot"]},

    "goliath" : { "name": "goliath",
        "imageurl": "/images/goliath.png",
        "hobbies": ["Eat", "Try to be scary"]
}};


router.get('/', (req,res) =>
    res.render('listing', { listing: data }
));

router.get('/account', (req, res) =>
{
    res.render('personform')
}
)

router.post('/account', (req, res) =>
{
    console.log("Data sent via post")
    var fname = req.body.firstname;
    var sname = req.body.surname;
    console.log('Date entered ' + fname + ' ' + sname)
    console.table(req.body)
    res.redirect(303, 'personadded')
}
)

router.get('/personadded', (req, res) => res.render('personadded'))

router.get('/:name', (req, res) => {
    var name = req.params.name;
    if (name in data)
    {
        res.render('person', { person: data[name] })
    }
    else
    {
        res.status(404)
        res.render('404')
    }
});

module.exports = router;