/*
 * Module dependencies
 */
var express = require('express'),
	stylus = require('stylus'),
	nib = require('nib');

	
// !Express Server
var app = express();

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
};

//Set up Jade as 
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.logger('dev'));
app.use(stylus.middleware({ 
  	src: __dirname + '/public',
  	compile: compile
  })
);
app.use(express.static(__dirname + '/public'));


// App url directives
app.get('/', function (req, res) {
  res.render('index',{
		title : 'Javascript Lessons'
	});
});

app.get('/:page', function (req, res){
	res.render(req.params.page,{
		debug: true,
		title : 'Javascript Lessons'
	});
});

app.listen(3000);
