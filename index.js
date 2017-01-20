var express = require('express');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var fs = require('fs');
var app = express();

app.use(express.static('public'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

app.post('/save', function (req, res) {
	var img = req.body.data;
	var buf = new Buffer(img, 'base64');
	var d = new Date();
	var t = d.getTime();
	var name = 'image_' + t;
	fs.writeFile('public/temp/' + name + '.png', buf, function(err) {
		if(err) {
			return res.send(err);
		} else {
			res.setHeader('Content-Type', 'image/png');
			res.setHeader('Content-disposition', 'attachment; filename=' + name + ".png");
			res.download('public/temp/' + name + '.png', null, function(err) {
				if(err) {
					return res.send(err);
				} else {
					fs.unlinkSync('public/temp/' + name + '.png')
				}
			});
		}
	});
});

var port = process.env.PORT || '3000';
app.set('port', port);

app.listen(port, function () {
  console.log('drawing listening on port ' + port);
});
