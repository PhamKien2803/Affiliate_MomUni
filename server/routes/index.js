const blogsRoute = require('./blogs.router')
const usersRoute = require("./users.router")

module.exports = (app) => {
    const api = "/api";
    app.use(api + '/blog', blogsRoute)
    app.use(api + '/auth', usersRoute)
}