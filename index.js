if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000

const routers = require('./lib/router.js');
const expressHandlebars = require('express-handlebars')
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

app.get('/', routers.home)
app.get('/about', routers.about)
app.use(routers.pagenotfound)
app.use(routers.servererror)


app.listen(PORT, () => console.log(`Example app running at http://localhost:${PORT}`))
