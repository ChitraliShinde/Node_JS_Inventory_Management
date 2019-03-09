var database = require("../config/database.js");
var database = new database();
var conn = database.con();
var mysql = require("mysql");

module.exports.save = function(data, callback) {
    var sql = "INSERT INTO ?? SET ?";
    var table = ["user", data];
    var queries = mysql.format(sql, table);
    conn.query(queries,callback);
}

module.exports.findById = function(id,callback) {
    var sql = "SELECT * from ?? where id=?";
    var table = ["user", id];
    var queries = mysql.format(sql, table);
    conn.query(queries, callback);
}

module.exports.view = function(callback) {
    var sql = "Select * from ??";
    var value = ["user"];
    conn.query(sql, [value],callback);
}
