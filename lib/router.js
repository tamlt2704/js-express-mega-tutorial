var passport = require('passport')

exports.home = (req, res) => {
    const quote = 'life is for learning';
    console.log(req.session)
    const currentUser = req.session.passport ? (
        req.session.passport.user || 'Guest'
    ) : 'Guest';

    res.render('home', {
        layout: 'main',
        title: 'home',
        user: currentUser,
        flash: res.locals.flash,
        fortune_quote: quote,
    })
}

exports.about = (req, res) => {
    res.render('about')
}

exports.logout = (req, res, next) => {
    req.logout()
    res.redirect('/')
}

exports.login = (req, res, next) => {
    if (req.method === 'POST') {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return next(err)
            }

            if (!user) {
                return res.redirect('/login?info='+info)
            }
            
            req.logIn(user, (err) => {
                if (err) {
                    return next(err)
                }
                req.session.flash = {
                    greet_message: `Hello ${user.username}`,
                }

                return res.redirect('/')
            })
        })(req, res, next)
    } else {
        res.render('login', {
            csrf: req.csrfToken(),
        })
    }
    /*
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

            req.session.flash = {
                greet_message: `Hello ${req.body.username}`,
            }
            req.session.username = req.body.username
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
    */
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

exports.flashMiddleware = (req, res, next) => {
    res.locals.flash = req.session.flash
    delete req.session.flash
    next()
}
