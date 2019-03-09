var database = require("../config/database.js");
var database = new database();
var conn = database.con();
var Config = require('../config/config.js');
var Config_URL = new Config();
var Registration = require('../models/Registration');
var mysql = require("mysql");

exports.registerview = function(req, res){
    res.render('../views/registration');
};

exports.register = function(req, res){
    try {
        var data = req.body;
        var datas = {
            username: data.username,
            email: data.email,
            password: data.password,
            confirm_password: data.confirm_password,

        };
        Registration.save(datas, function (err, info) {
            if (data) {
                req.flash('success', 'Registered Successfully');
                res.redirect('/login');
            }
            else {
                req.flash('error', 'Failed to Register');
                res.redirect('/registration');
            }

        });

    }catch (ex){

    }
};

exports.loginview = function(req, res){
    res.render('../views/login');
};

exports.logincheck = function(req, res){

    var sess = req.session;
    sess.username = req.body.username;
    sess.password = req.body.password;

    var query1 = "SELECT * FROM ?? where username=? and password=?" ;
    var table1 = ["user",sess.username,sess.password];
    query1 = mysql.format(query1,table1);
    conn.query(query1, function(err1, rows1)
    {
        if (rows1.length==""){
            req.flash('error', 'Username & Password does not Match...');
            res.redirect('/login');
        }
        else {
            res.render('../views/view_products');
        }
    });
};

exports.logout = function(req, res){
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("Logout");
            //res.flash('success',"Logout Successfully...");
            res.redirect('/login');
        }
    })
};
