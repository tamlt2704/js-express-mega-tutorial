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

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({extended:true}))

//csrf
const csrfMiddleware = csurf({
    cookie: true
})
app.use(cookieParser())
app.use(csrfMiddleware)

app.get('/', routers.home)
app.get('/about', routers.about)
app.get('/login', routers.login)
app.post(
    '/login', 
    form(
        form.field("username").trim().required().is(/^[a-z]+$/),
        form.field("password").trim().required().is(/^[a-z]+$/),
    ),
    routers.login)
app.use(routers.pagenotfound)
app.use(routers.servererror)


app.listen(PORT, () => console.log(`Example app running at http://localhost:${PORT}`))
