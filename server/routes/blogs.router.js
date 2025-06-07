const express = require('express');
const router = express.Router();
const controller = require('../controller/Admin/blogs.controller');
const { upload } = require('../middleware/upload.middleware');

// /admin/blog
router.post('/create', upload.fields([
    { name: 'newImages', maxCount: 10 },
    { name: 'newVideo', maxCount: 1 }
]), controller.createBlog)
router.get('/:id', controller.getBlogById);
router.put('/update/:id', upload.fields([
    { name: 'newImages', maxCount: 10 },
    { name: 'newVideo', maxCount: 1 }
]), controller.updateBlog)
router.delete('/delete/:id', controller.deleteBlog)
router.get('/', controller.getBlog)
router.put('/update-status/:id', controller.updateBlogStatus)
router.post('/upload-images', upload.array('images', 10), controller.uploaderBlogImagesToCloud);

module.exports = router;