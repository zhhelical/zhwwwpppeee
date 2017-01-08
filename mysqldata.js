//mysqldata.js
"use strict"
var mysql = require('mysql')
    , co = require('co')
    , mydb = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '635401',
            database: 'helicaldb'
        })
    , dbconn = false

module.exports = {
    private_sql: dbconn,
    connectDb: function() {
        dbconn = true
        mydb.connect(this.dealShutDown)
        mydb.on('error', this.dealShutDown)
    },
    newComerTest:function(strs, cb){
        mydb.query("SELECT user FROM people WHERE user LIKE '%"+strs+"%'", function(err, results) {
            if (err) cb(err)
            if(results.length) cb(results[0].user)
            else cb([])
        })
    },
    text_exec: function(strs) {
        return new Promise(function (resolve, reject){
            mydb.query("SELECT value FROM people WHERE user LIKE '%"+strs+"%'", function(err, results, feilds) {
                if (err) reject(err)
                if(results.length) resolve(results[0].value)
                else resolve([])
            })
        })
    },
    insert_exec: function(strs1, strs2) {
        return new Promise(function (resolve, reject) {
            mydb.query("INSERT INTO people (user, value) VALUES(" + "'" + strs1 + "'" + ", " + "'" + strs2 + "'" + ")", function (err, results) {
                if (err) reject(err)
                resolve(results)
            })
        })
    },
    update_exec: function(strs1, strs2) {
        return new Promise(function (resolve, reject) {
            mydb.query("UPDATE people SET value='" + strs2 + "' WHERE user='" + strs1 + "'", function (err, results) {
                if (err) reject(err)
                resolve(results)
            })
        })
    },
    valueByAddr:function(addr){
        return new Promise(function (resolve, reject){
            mydb.query("SELECT value FROM people WHERE value LIKE '%"+addr+"%'", function(err, results, feilds) {
                if (err) reject(err)
                if(results.length) resolve(results)
                else resolve([])
            })
        })
    },
    selectImageRow:function(row_keys){
        return new Promise(function (resolve, reject){
            mydb.query("SELECT * FROM pictures WHERE img_time='"+row_keys.time+"' AND img_key='"+row_keys.key+"'"+" AND img_where='"+row_keys.pos+"'", function(err, results, feilds) {
                if (err) reject(err)
                if(results.length) resolve(results)
                else resolve([])
            })
        })
    },
    dealShutDown: function(err) {// 如果是连接断开，自动重新连接,如果是数据库问题用系统shell重启mariadb
        if(err){
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                mydb.connect()
            } else
                console.error(err.stack || err)
        }
    }
}