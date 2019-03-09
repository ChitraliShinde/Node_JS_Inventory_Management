var database = require("../config/database.js");
var database = new database();
var conn = database.con();
var Config = require('../config/config.js');
var Config_URL = new Config();

var Dashboard = require('../models/Dashboard');
var mysql = require("mysql");

var fs = require('fs');
var uniqid = require('uniqid');

exports.dashboard = function(req, res){
    try {
        Dashboard.view(function(err, rows, fields) {

            if (Config_URL.isDataEmpty(rows) && Config_URL.isLoginCheck(req)) {
                res.render('../views/dashboard',{data:rows});
            }
            else {
                req.flash('error',"Please Login First")
                res.redirect('/login');
            }
        });
    }catch (ex){

    }
};

exports.view = function(req, res){
    try {
        Dashboard.view(function(err, rows, fields) {

            if (Config_URL.isDataEmpty(rows) && Config_URL.isLoginCheck(req)) {
                res.render('../views/view_products',{data:rows});
            }
            else {
                req.flash('error',"Please Login First")
                res.redirect('/login');
            }
        });
    }catch (ex){

    }
};

exports.productDetail = function(req, res){
    var id = req.params.id;

    Dashboard.findById(id, function(err, rows, fields) {
        if (Config_URL.isDataEmpty(rows) && Config_URL.isLoginCheck(req)) {
            res.render('../views/product_detail',{data:rows});
        } else {
            req.flash('error',"Please Login First")
            res.redirect('/login');
        };
    });
};

exports.add = function(req, res){
    var id = req.params.id;

    Dashboard.findById(id, function(err, rows, fields) {

        if (Config_URL.isLoginCheck(req)){

            if (Config_URL.isDataEmpty(rows)) {
                res.render('../views/edit_product',{data:rows});
            } else {
                res.render('../views/add_product');
            }
        }
        else {
            req.flash('error',"Please Login First")
            res.redirect('login');
        }
    });
};

exports.save = function(req, res){
    //console.log(req.files);
    if (!req.files) {
        return res.status(400).send("No files were uploaded.");
    }

    try {
        var data = req.body;
        var uploadedFile=req.files.image;
        var fileExtension;
        var image_name;

        fileExtension = uploadedFile.mimetype.split('/')[1];
        image_name = uniqid() + '.' + fileExtension;

        var datass = {
            title: data.title,
            description: data.description,
            quantity: data.productQuantity,
            image:image_name,

        };

        // check the filetype before uploading it
        if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
            // upload the file to the /public/assets/img directory
            uploadedFile.mv(`public/assets/img/${image_name}`,
                (err ) => {
                    if (err) {
                        return res.status(500).send(err);
                    }

                    Dashboard.save(datass, function (err, info) {

                        req.flash('success', 'Product saved Successfully');
                        res.redirect('viewproducts');
                    });

                });
        } else {
            message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
            res.render('../views/add_product');
        }

    }catch (ex){

    }
};

exports.update = function(req, res){
    try{
        var data = req.body;
        var id = req.params.id;

        var datass = {
            id: id,
            title: data.title,
            description: data.description,
            quantity: data.productQuantity
        };
        Dashboard.update(datass, function(err, info) {
            req.flash('success', 'Product updated Successfully');
            res.redirect('/viewproducts');
        });
    }catch (ex){

    }
};

exports.delete = function(req, res){
    try {
        var id = req.params.id;

        data = {
            id: id
        };
        Dashboard.delete(data, function(err, info) {
            req.flash('success', 'Product deleted successfully');
            res.redirect('/viewproducts');
        });
    }catch (ex){

    }
};