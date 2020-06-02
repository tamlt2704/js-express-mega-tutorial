1. Hello world

1.0 prerequires
    node installed
    node --version # v12.8.0

1.1 Init project
    # init node project
    npm init -y

    # create .gitgnore file for node project
    npx gitignore node

    # install express
    npm install --save express
    
    # add first code in index.js

        const express = require('express')
        const app = express()
        const port = 5000

        app.get('/', (req, res) => res.send('Hello world'))

        app.listen(port, () => console.log(`Example app running at http://localhost:${port}`))

    # start server
    node index.js

    # check if the code is working
    curl localhost:5000         # or paste this link to browser

