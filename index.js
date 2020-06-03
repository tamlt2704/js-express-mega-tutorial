if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const routers = require('./lib/router.js');
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const form = require('express-form')
const csurf = require('csurf')
const cookieParser = require('cookie-parser')
const blogmodel = require('./models/blogmodel')
const passport = require('passport')
const connectEnsureLogin = require('connect-ensure-login')


app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({extended:true}))

//csrf
const csrfMiddleware = csurf({
    cookie: true
})
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(csrfMiddleware)

app.use(require('express-session')({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET
}))
app.use(routers.flashMiddleware)

app.use(passport.initialize())
app.use(passport.session())
passport.use(blogmodel.User.createStrategy())
passport.serializeUser(blogmodel.User.serializeUser())
passport.deserializeUser(blogmodel.User.deserializeUser())

app.get('/', routers.home)
app.get('/about', 
    connectEnsureLogin.ensureLoggedIn(),
    routers.about)
app.get('/login', csrfMiddleware, routers.login)
app.post(
    '/login', 
    csrfMiddleware,
    form(
        form.field("username").trim().required().is(/^[a-z]+$/),
        form.field("password").trim().required().is(/^[a-z]+$/),
    ),
    routers.login)
app.get('/logout', routers.logout)
app.use(routers.pagenotfound)
app.use(routers.servererror)


app.listen(PORT, () => console.log(`Example app running at http://localhost:${PORT}`))
