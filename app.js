var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my-resume');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

//SCHEMA SETUP
var myresumeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
});

var Myresume = mongoose.model('Myresume', myresumeSchema )
// Myresume.create(
//     {
//         firstName: 'Rasheedah',
//         lastName: 'zubayr'
//     }, function(err, resume){
//         if(err){
//             console.log(err);
//         } else {
//             console.log('NEWLY CREATED COMMENT: ')
//             console.log(resume);
//         }
//     }
// );

// var data = [
//     {firstName: 'Ridwan', lastName: 'Raji'}
// ]

app.get('/', function(req, res){
    res.render('landing');
});

app.get('/myresume', function(req, res){
    //Get all comments from DB
    Myresume.find({}, function(err, allResume){
        if(err){
            console.log(err);
        } else {
            res.render('myresume', {data: allResume});
        }
    });
});

app.post('/myresume', function(req, res){
    //get data from form and add to data array
    var firstName = req.body.nameOne
    var lastName = req.body.nameTwo
    var user =  {firstName: firstName, lastName: lastName}
    //Create a new comment and save to DB
    Myresume.create(user, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect('/myresume')
        }
    });
    
});

app.get('/myresume/new', function(req, res){
    res.render('new.ejs');
});

app.listen(3000, function(){
    console.log('resume-builder server has started!');
});