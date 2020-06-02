if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000

const routers = require('./lib/router.js');


app.get('/', routers.home)
app.use(routers.pagenotfound)
app.use(routers.servererror)


app.listen(PORT, () => console.log(`Example app running at http://localhost:${PORT}`))
