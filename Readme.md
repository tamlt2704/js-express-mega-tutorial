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

1.2 Code refactor
    1.2.1  Change command to start server
    # edit package.json
    ...... 
    {
        "scripts": {
            "start": "node index.js",                                           <--- Add this line 
            "test": "echo \"Error: no test specified\" && exit 1"
        },
    }
    .......

    # now start server with following command
    npm start
    
    1.2.2 use default port
    Change following in index.js

        const PORT = process.env.PORT || 5000
        .....
        app.listen(PORT, () => console.log(`Example app running at http://localhost:${PORT}`))

    # now start server with following command
    export PORT=9999 && npm start
    
    1.2.3 use dotenv
    # install package
        npm install -save dotenv
    # add following to app
        require('dotenv').config()

    # .env content
        PORT=5000
        APP_NAME='expressjs flask mega tutorial'

    !!! we might see that the app start with port 9999, not port 5000 defined in env. 
    It's because it will skip any variables that already have been set.
    
    1.2.4 restart app with code change
    npm install nodemon
    
    {
        "scripts": {
            "start": "nodemon index.js",                                           <--- Add this line 
            "test": "echo \"Error: no test specified\" && exit 1"
        },
    }
    
    1.2.5 move router to lib/routers.js

        const routers = require('./lib/router.js');
        app.get('/', routers.home)

    1.2.6 add custom page not found and internal server
        app.get('/', routers.home)
        app.use(routers.pagenotfound)
        app.use(routers.servererror)
    
    1.2.7 linting
        npm install -g eslint
        eslint --init           # choose default
        npm run lint
        
    
