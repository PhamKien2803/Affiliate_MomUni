const blogsRoute = require('./blogs.router')


module.exports = (app) => {
    const api = "/api";
    app.use(api + '/blog', blogsRoute)
}