var config = require('config.json');
var express = require('express');
var router = express.Router();
var chatService = require('services/chat.service');
var groceriesService = require('services/groceries.service');


router.post('/groceriesRegister', saveGroceries);
router.post('/getGroceries', getAllGroceries);
router.post('/movedSave', saveMovedData);
// router.get('/current', getCurrent);
// router.put('/:_id', update);
// router.delete('/:_id', _delete);
// //chat
router.post('/sendmessage', saveMessage);

module.exports = router;


function saveGroceries(req, res) {
    groceriesService.saveGroceries(req.body)
    .then(function () {
        res.json('success');
    })
    .catch(function (err) {
        res.status(400).send(err);
    })
}

function getAllGroceries(req, res) {
    groceriesService.getAllGroceries()
        .then(function (groceries) {
            res.send({groceries: groceries});
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function saveMovedData(req,res) {
    groceriesService.saveMovedData(req.body)
    .then(function () {
        res.json('success');
    })
    .catch(function (err) {
        res.status(400).send(err);
    })
}
// ----------  //

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


