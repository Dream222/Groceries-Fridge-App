
import Vue from 'vue';
import { APIENDPOINT , getHeader } from '../../app.config';
import axios from 'axios';
export default {


    login(value, cb) {
        return new Promise(function (resolve, reject) {
              axios.post(APIENDPOINT + '/auth/login', value)
            .then(function (res) {
                resolve(res.data);
            })
            .catch(function (err) {
                reject(err.response.data)
            })
        });
      

    },

    register(groceries) {
        return new Promise(function (resolve, reject) {
            axios.post(APIENDPOINT + '/groceriesRegister', groceries)
            .then(function (res) {
                resolve(res.data);
            })
            .catch(function (err) {
                reject(err.response.data)
            })
        });
    },

    getGroceries() {
        return new Promise(function (resolve,reject) {
            axios.post(APIENDPOINT + '/getGroceries', '')
            .then(function (res) {
                resolve(res.data);
            })
            .catch(function (err) {
                reject(err.response.data)
            })
        })
    },

    movedSave(data) {
        return new Promise(function (resolve,reject) {
            axios.post(APIENDPOINT + '/movedSave', data)
            .then(function (res) {
                resolve(res.data);
            })
            .catch(function (err) {
                reject(err.response.data)
            })
        })
    }




}