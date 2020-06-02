exports.home = (req, res) => {
    const quote = 'life is for learning';
    res.render('home', {
        layout: 'main',
        title: 'home',
        user: 'Express',
        fortune_quote: quote,
    })
}

exports.about = (req, res) => {
    res.render('about')
}

exports.pagenotfound = (req, res) => {
    res.type('text/plain')
    res.status(404)
    res.send('404 - Not Found')
}

exports.servererror = (err, req, res, next) => {
    res.type('text/plain')
    res.status(500)
    res.send('500 - Server Error')
}
