const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => res.send('Hello world'))

app.listen(PORT, () => console.log(`Example app running at http://localhost:${PORT}`))
