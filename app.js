var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

var data = [
    {firstName: 'Ridwan', lastName: 'Raji'}
]

app.get('/', function(req, res){
    res.render('landing');
});

app.get('/myresume', function(req, res){
   

    res.render('myresume', {data: data });
});

app.post('/myresume', function(req, res){
    //get data from form and add to data array
    var firstName = req.body.nameOne
    var lastName = req.body.nameTwo
    var user =  {firstName: firstName, lastName: lastName}
    data.push(user);
    res.redirect('/myresume')
});

app.get('/myresume/new', function(req, res){
    res.render('new.ejs');
});

app.listen(3000, function(){
    console.log('resume-builder server has started!');
});