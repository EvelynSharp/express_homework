var express = require('express');
var fs = require('fs');
var ejs = require('ejs');
var app = express();
var partials = require('express-partials');
var expressLayouts = require('express-ejs-layouts');

app.use(express.static(__dirname + '/materialize/css'));
app.use(express.static(__dirname + '/materialize/js'));
app.use(express.static(__dirname + '/style'));
app.use(express.static(__dirname + '/images'));

app.set('view engine', 'ejs');
app.use(partials());

app.get('/', function(request, response) {
  // response.sendFile(__dirname + '/index.html');
  response.render('index.html.ejs',{ title: 'ES Online School' , layout: "layout.ejs"});

});

app.get('/contact', function(request, response) {
  // response.sendFile(__dirname + '/contact.html');
  response.render('contact.html.ejs',{ title: 'Contact' , layout: "layout.ejs"});
});




app.get('/courses', function(request, response) {
 fs.readFile('courses.json', 'utf8', function(err, data) {
 var courses = JSON.parse(data);
 response.locals = { courses: courses };
 response.render('courses.ejs',{ title: 'Courses' , layout: "layout.ejs"});
 });
});




app.get('/courses/:id', function(request, response) {
  fs.readFile('courses.json', 'utf8', function(err, data) {
    var coursesParsed = JSON.parse(data);
    var course = coursesParsed.filter( function(obj) {
      return obj.id === parseInt(request.params.id);
    })[0];

    response.locals = { course: course };
    response.render('course.ejs',{ title: course.name , layout: "layout.ejs"});
 });
});


app.get('/courses/:id/reviews', function(request, response) {
  fs.readFile('reviews.json', 'utf8', function(err, data) {
    var reviewsParsed = JSON.parse(data);
    var reviews = reviewsParsed.filter( function(obj) {
      return obj.id === parseInt(request.params.id);
    })[0];

    response.locals = { reviews: reviews };
    response.render('reviews.ejs',{ title: 'Reviews' , layout: "layout.ejs"});
 });
});


// app.post('/contact', function(req, res) {
//   var firstName = req.body.firstName;
//   var lastName = req.body.lastName;
//   var emailAdd = req.body.emailAdd;
//   var contactMessage = req.body.contactMessage;
//   var userInfo = {
//     firstName:firstName;
//     lastName:lastName;
//     emailAdd:emailAdd;
//     contactMessage:contactMessage;
//   };
//   var userInfoStr = JSON.stringify(userInfo);
//   fs.writeFile('userinfo.json', userInfoStr , 'utf-8');
//   console.log(userInfoStr);
// });

app.listen(8000);
console.log('running in http://localhost:8000')
