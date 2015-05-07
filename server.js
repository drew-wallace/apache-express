var express = require('express');
var fs = require('fs');
var https = require('https');

function createApp(dirPath) {
    var app = express();
    app.set('views', dirPath);
    app.engine('php', phpExpress.engine);
    app.set('view engine', 'php');

    // routing all .php file to php-express
    app.all(/.+\.php$/, phpExpress.router);
    /*app.get("*", function(req, res, next) {
	var err = new Error();
	err.status = 404;
	err.message = "Couldn't find that page..."
	next(err);
    });*/
    app.use(function(err, req, res, next) {
	if(!err) {
	    return next();
	}
	res.send("Well, apparently I " + err.message + "<br>So I think that makes this a 404 error.");
    });

    return app;
}

var options = {
  key: fs.readFileSync('../../server.key'),
  cert: fs.readFileSync('../../server.crt')
};

// must specify options hash even if no options provided!
var phpExpress = require('php-express')({

  // assumes php is in your PATH
  binPath: 'php'
});

var nossl = createApp('/var/www/html');
var ssl = createApp('/var/www/ssl-html');

var server1 = https.createServer(options, ssl).listen(3001, function () {
  var host = server1.address().address;
  var port = server1.address().port;
  console.log('apache-express app listening at https://%s:%s', host, port);
});


var server2 = nossl.listen(3000, function () {
  var host = server2.address().address;
  var port = server2.address().port;
  console.log('apache-express app listening at http://%s:%s', host, port);
});
