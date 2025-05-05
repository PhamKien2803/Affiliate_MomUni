const blogsRoute = require('./blogs.router')
const usersRoute = require("./users.router")
const expertFormRoute = require("./expertForm.router")
const commentRoute = require("./comment.router")
const ratingRoute = require("./rating.router")
const blogCustomerRoute = require("./blog-customer.router")

module.exports = (app) => {
    const api = "/api";
    app.use(api + '/blog', blogsRoute)
    app.use(api + '/blog-customer', blogCustomerRoute)
    app.use(api + '/auth', usersRoute)
    app.use(api + '/comment', commentRoute)
    app.use(api + '/rating', ratingRoute)
    app.use(api + '/expert-form', expertFormRoute)
}