const UserRouter = require('./UserRouter')

const routes = (app) => {
    // app.use('/api/user', (req,res) => {
    //     res.send('User Page')
    // })
    app.use('/api/user', UserRouter)
}

module.exports = routes;