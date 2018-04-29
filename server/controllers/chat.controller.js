var config = require('config.json');
var express = require('express');
var router = express.Router();
var chatService = require('services/chat.service');

// routes
// router.post('/authenticate', authenticate);
// router.post('/register', register);
router.post('/', getAllMessage);
// router.get('/current', getCurrent);
// router.put('/:_id', update);
// router.delete('/:_id', _delete);
// //chat
router.post('/sendmessage', saveMessage);

module.exports = router;


function saveMessage(req, res) { console.log(req.body)
    chatService.saveMessage(req.body)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}



function getAllMessage(req, res) {
    chatService.getAllMessage()
        .then(function (messages) {
            res.send(messages);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}


