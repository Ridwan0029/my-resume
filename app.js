var express = require('express');
var app = express();
var bodyParser = require('body-parser');


const mongoose = require('mongoose')

// const url = `mongodb+srv://ridwan:Adrenalin0029@cluster0.t86kn.mongodb.net/test?retryWrites=true&w=majority`;
const url = `mongodb+srv://ridwan:Adrenalin0029@cluster0.t86kn.mongodb.net/?retryWrites=true&w=majority`;


const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })


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

// app.get('/', function(req, res){
//     res.render('landing');
// });

app.get('/', function(req, res){
    //Get all comments from DB
    Myresume.find({}, function(err, allResume){
        if(err){
            console.log(err);
        } else {
            res.render('myresume', {data: allResume});
        }
    });
});

app.post('/', function(req, res){
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
            res.redirect('/')
        }
    });
    
});

// app.get('/myresume/new', function(req, res){
//     res.render('new.ejs');
// });

app.listen(process.env.PORT || 3000, function(){
    console.log('my-resume server has started!');
});