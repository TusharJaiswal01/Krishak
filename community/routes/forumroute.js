
const router = require('express').Router();
const { SendData, getData } = require('../controllers/forumcontroller');

router.post('/forum/send', SendData);
router.get('/forum/get', getData);

module.exports = router;
