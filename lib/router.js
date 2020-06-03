
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

exports.login = (req, res) => {
    const form_errors = {}
    if (req.method === "POST") {
        if (!req.form.isValid) {
            console.log(req.form.errors)
            for (let field of ['username', 'password']) {
                form_errors[field] = req.form.getErrors(field)
            }
        } else {
            console.log('form is valid')
            console.log(req.body._csrf)
            console.log(req.body.username)
            console.log(req.body.password)
            console.log(req.body.rememberme)
            res.redirect(303, '/')  // it does not stop here. must return
            // otherwise, code after this will be executed
            return  
        }
    }
    console.log(form_errors)
    res.render('login', {
        form_errors: form_errors,
        csrf: req.csrfToken(),
    })
}

exports.pagenotfound = (req, res) => {
    res.type('text/plain')
    res.status(404)
    res.send('404 - Not Found')
}

exports.servererror = (err, req, res, next) => {
    console.log(err)
    res.type('text/plain')
    res.status(500)
    res.send('500 - Server Error')
}
