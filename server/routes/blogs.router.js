const express = require('express');
const router = express.Router();
const controller = require('../controller/Admin/blogs.controller');
const { upload } = require('../middleware/upload.middleware');

router.post('/create', upload.array('images', 10), controller.createBlog)
router.put('/update/:id', upload.array('images', 10), controller.updateBlog)
router.delete('/delete/:id', controller.deleteBlog)
router.get('/', controller.getBlog)
router.put('/update-status/:id', controller.updateBlogStatus)

module.exports = router;