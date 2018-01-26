var express	   = require('express'),
	mongoose   = require('mongoose'),
	bodyParser = require('body-parser'),
	random 	   = require('random-key');

mongoose.connect("mongodb://localhost/url_shortener");

var app = express();
app.set('port', (process.env.PORT || 3000));
app.set('view engine','ejs');	
app.set('views',__dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Schema Setup
var urlSchema = new mongoose.Schema({
	shortUrl: String,
	longUrl: String
});
var Url = mongoose.model("Url",urlSchema);

// Home Page
app.get('/',function(req,res){
	res.render('index');
});

// Shorten link
app.post('/shorten',function(req,res){
	var urlInput = req.body.long;
	var key = random.generate(5);
	var newurl = {
		shortUrl: key,
	 	longUrl: urlInput
	}
	Url.create(newurl,function(err,url){
		if(err)
			console.log(err);
		else{
			console.log("URL added in database");
			res.send(req.headers.origin + "/" + key);
		}
	});
});

// Redirect to longURL
app.get('/:key',function(req,res){
	Url.find({'shortUrl': req.params.key},function(err,url){
		if(err)
			console.log(err);
		else{
			var long = url[0]['longUrl'];
			res.redirect(long);
		}
	});
});

app.listen(app.get('port'), function () {
	console.log('listening on port ' + app.get('port'));
});
// app.listen(3000,function(){
// 	console.log("Server started on port 3000");
// });