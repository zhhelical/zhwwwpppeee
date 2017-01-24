//mysqldata.js
"use strict"
var mysql = require('mysql')
    , co = require('co')
    , mydb = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '635401',
            database: 'helicaldb'
        })

module.exports = {
    newComerTest:function(strs, cb){
        mydb.getConnection(function(err,conn){
            if(err)
                cb(err,null,null)
            else{
                conn.query("SELECT user FROM people WHERE user LIKE '%"+strs+"%'", function(err, results) {
                    conn.release()
                    if (err) cb(err)
                    if(results.length) cb(results[0].user)
                    else cb([])
                })
            }
        })
    },
    text_exec: function(strs) {
        return new Promise(function (resolve, reject){
            mydb.getConnection(function(err,conn){
                if(err)
                    reject(err,null,null)
                else{
                    conn.query("SELECT value FROM people WHERE user LIKE '%"+strs+"%'", function(err, results, feilds) {
                        conn.release()
                        if (err) reject(err)
                        if(results.length) resolve(results[0].value)
                        else resolve([])
                    })
                }
            })
        })
    },
    insert_exec: function(strs1, strs2) {
        return new Promise(function (resolve, reject) {
            mydb.getConnection(function(err,conn){
                if(err)
                    reject(err,null,null)
                else{
                    conn.query("INSERT INTO people (user, value) VALUES(" + "'" + strs1 + "'" + ", " + "'" + strs2 + "'" + ")", function (err, results) {
                        conn.release()
                        if (err) reject(err)
                        resolve(results)
                    })
                }
            })
        })
    },
    insert_pays: function(ins_obj) {
        return new Promise(function (resolve, reject) {
            mydb.getConnection(function(err,conn){
                if(err)
                    reject(err,null,null)
                else{
                    conn.query("INSERT INTO payment (openid, transaction_id, out_trade_no, time_end, total_fee, sign, nonce_str, bank_type) VALUES(" + "'" + ins_obj.openid + "'" + ", " + "'" + ins_obj.transaction_id + "'" + ", " + "'" + ins_obj.out_trade_no + "'" + ", " + "'" + ins_obj.time_end + "'" + ", " + "'" + ins_obj.total_fee + "'" + ", " + "'" + ins_obj.sign + "'" + ", " + "'" + ins_obj.nonce_str + "'" + ", " + "'" + ins_obj.bank_type + "'" + ")", function (err, results) {
                        conn.release()
                        if (err) reject(err)
                        resolve(results)
                    })
                }
            })
        })
    },
    update_exec: function(strs1, strs2) {
        return new Promise(function (resolve, reject) {
            mydb.getConnection(function(err,conn){
                if(err)
                    reject(err,null,null)
                else{
                    conn.query("UPDATE people SET value='" + strs2 + "' WHERE user='" + strs1 + "'", function (err, results) {
                        conn.release()
                        if (err) reject(err)
                        resolve(results)
                    })
                }
            })
        })
    },
    valueByAddr:function(addr){
        return new Promise(function (resolve, reject){
            mydb.getConnection(function(err,conn){
                if(err)
                    reject(err,null,null)
                else{
                    var city = addr.city, gate = addr.gate
                    conn.query("SELECT value FROM people WHERE value LIKE '%"+city+"%' AND value LIKE '%"+gate+"%'", function(err, results, feilds) {
                        conn.release()
                        if (err) reject(err)
                        if(results.length) resolve(results)
                        else resolve([])
                    })
                }
            })
        })
    },
    select_picsprops: function(time, key_value) {
        return new Promise(function (resolve, reject){
            mydb.getConnection(function(err,conn){
                if(err)
                    reject(err,null,null)
                else{
                    if(key_value != '') {
                        conn.query("SELECT * FROM pictures WHERE img_time='" + time + "' AND img_key='" + key_value + "'", function (err, results, feilds) {
                            conn.release()
                            if (err) reject(err)
                            if (results.length) resolve(results)
                            else resolve([])
                        })
                    }
                    else{
                        conn.query("SELECT * FROM pictures WHERE img_time='" + time + "'", function (err, results, feilds) {
                            conn.release()
                            if (err) reject(err)
                            if (results.length) resolve(results)
                            else resolve([])
                        })
                    }
                }
            })
        })
    }
}