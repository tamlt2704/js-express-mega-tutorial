require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000


app.get('/', (req, res) => res.send(`Hello world. App name: ${process.env.APP_NAME}`))

app.listen(PORT, () => console.log(`Example app running at http://localhost:${PORT}`))
