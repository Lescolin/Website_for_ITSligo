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