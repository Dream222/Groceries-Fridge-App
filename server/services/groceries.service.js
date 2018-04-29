var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('groceries');

var service = {};

service.getAllMessage = getAllMessage;
service.saveMessage = saveMessage;
service.saveGroceries = saveGroceries;
service.getAllGroceries = getAllGroceries;
service.saveMovedData = saveMovedData;
// service.update = update;
// service.delete = _delete;

module.exports = service;


function saveGroceries(grocereis) {
    var deferred = Q.defer();

    db.groceries.findOne(
        { name: grocereis.name ,category: grocereis.category },
        function (err, data) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (data) {
                db.groceries.update(
                    { name:  grocereis.name, category: grocereis.category},
                    {
                       name: grocereis.name,
                       quantity: data.quantity + 1,
                       category: grocereis.category
                    },
                    { upsert: true }
                 )
            } else {
                registerGroceries();
            }
        });

    

    function registerGroceries() {
       
            db.groceries.insert(
                grocereis,
                function (err, doc) {
                    if (err) deferred.reject(err.name + ': ' + err.message);
    
                    deferred.resolve();
                });
        
    }

    return deferred.promise;
}

function saveMovedData(changedData) {
    var deferred = Q.defer();
    console.log(changedData)
    db.groceries.remove()
    registerGroceries();
    
    function registerGroceries() {
       
            db.groceries.insert(
                changedData,
                function (err, doc) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    deferred.resolve();
                });
        
    }
    return deferred.promise;
}

function getAllGroceries() {
    var deferred = Q.defer();

    db.groceries.find().toArray(function (err, messages) {
        if (err) deferred.reject(err.name + ': ' + err.message);


        deferred.resolve(messages);
    });

    return deferred.promise; 
}

// -------- //
function getAllMessage() {
    var deferred = Q.defer();

    db.chat.find().toArray(function (err, messages) {
        if (err) deferred.reject(err.name + ': ' + err.message);


        deferred.resolve(messages);
    });

    return deferred.promise;
}


function saveMessage(message) {
    var deferred = Q.defer();

    createUser();

    function createUser() {
        
        db.chat.insert(
            message,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

