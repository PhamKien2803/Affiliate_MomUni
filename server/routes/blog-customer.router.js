const express = require('express');
const router = express.Router();
const controller = require('../controller/Customer/blogs.controller');

router.get('/:id', controller.getBlogById)
router.get('/', controller.getAllBlogs)

module.exports = router;