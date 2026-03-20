const express = require('express');

const router = express.Router();

const { getAllPostsByID } = require('../controllers/postController');
router.get('/posts/:id', getAllPostsByID)



module.exports = router;