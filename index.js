var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var fs = require('fs');

app.use(express.static('public'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

var name

app.post('/save', function (req, res) {
	var img = req.body.data;
	var buf = new Buffer(img, 'base64');
	var d = new Date();
	var t = d.getTime();
	name = 'image_' + t;
	fs.writeFile('public/temp/' + name + '.png', buf, function(err) {
		if(err) {
			return res.send(err);
		} else {
			res.send('temp/' + name + '.png');
			//res.setHeader('Content-Type', 'image/png');
			//res.setHeader('Content-disposition', 'attachment; filename=' + name + ".png");
			//res.download('public/temp/' + name + '.png', null, function(err) {
				//if(err) {
					//return res.send(err);
				//} else {
					//fs.unlinkSync('public/temp/' + name + '.png')
				//}
			//});
		}
		
	});
	
});

app.get('/download', function (req, res) {
	res.setHeader('Content-Type', 'image/png');
	res.setHeader('Content-disposition', 'attachment; filename=' + name + '.png');
	res.download("public/" + req.query.src, name + ".png", function(err) {
		if(err) {
			console.log(err);
		} else {
			fs.unlinkSync("public/" + req.query.src)
		}
	});
});

app.post('/save2', function (req, res) {
	
	
	fs.writeFile('public/temp/image.png', req.body.data, function(err) {
		if(err) {
			return res.send(err);
		} else {
			res.send('temp/' + name + '.png');
		}
	});
	
});
	


app.listen(3000, function () {
  console.log('drawing listening on port 3000!');
});
