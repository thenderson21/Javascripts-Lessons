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

var siteTitle = 'JavaScript for Designers';

var Errors = {
		404: "Error: 404 Can't find that page." 
}

//Set up Jade as 
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.logger('dev'));
app.use(stylus.middleware({ 
  	src: __dirname + '/public',
  	compile: compile
  })
);

//Set webroot.
app.use(express.static(__dirname + '/public'));

//Set The default location to the favicon.
app.use(express.favicon(__dirname + '/public/favicon.ico'));

// App url directives
app.get('/', function (req, res) {
  res.render('index',{
		title : siteTitle
	});
});

app.get('/:page', function (req, res){
	res.render(req.params.page,{
		//debug: true,
		title : siteTitle
	}/*,
 function (err, html) {
		console.log(html);
		res.status(404).render('error', {
			title : siteTitle,
			error : err,
		});
	}
*/);		
});


//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
  res.status(404).render('error', {
			title : siteTitle,
			error : Errors[404],
		});
});

app.listen(3000);
