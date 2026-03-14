const express = require('express');
const { getAll, createUser, getAUser, updateAUser, deleteAUser } = require('../controllers/userController');


const router = express.Router();

router.get('/fetch/all', getAll);
router.post('/create', createUser);
router.get('/fetch/:id', getAUser);
router.put('/update/:id', updateAUser);
router.delete('/delete/:id', deleteAUser);



module.exports = router;