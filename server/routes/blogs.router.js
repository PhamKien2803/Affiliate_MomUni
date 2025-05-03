const express = require('express');
const router = express.Router();
const controller = require('../controller/Admin/blogs.controller');
router.post('/create', controller.createBlog)
router.put('/update/:id', controller.updateBlog)
router.delete('/delete/:id', controller.deleteBlog)
router.get('/', controller.getBlog)

module.exports = router;