exports.home = (req, res) => res.send('Hello word');

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
