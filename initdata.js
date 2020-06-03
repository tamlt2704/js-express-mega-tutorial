const blogmodel = require('./models/blogmodel')
const passport = require('passport')

blogmodel.User.deleteMany({})

blogmodel.User.find({}, (err, users) => {
    console.log(users)
})

blogmodel.User.register({username: 'foo', useremail: 'foo@gmail.com', activate: false}, 'foo', (err, user) => {
    console.log(err)
})
blogmodel.User.register({username: 'bar', useremail: 'bar@gmail.com', activate: true}, 'bar')
blogmodel.User.find({}, (err, users) => {
    console.log(users)
})
