const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const fs = require('fs');
const app = express();

let oneWeek = 604800000;
app.use(express.static('public', { maxAge: oneWeek }));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

app.post('/save', (req, res) => {
	let img = req.body.data;
	let buf = new Buffer(img, 'base64');
	let d = new Date();
	let t = d.getTime();
	let name = 'drawing_' + t;
	fs.writeFile('public/temp/' + name + '.png', buf, (err) => {
		if(err) {
			return res.send(err);
		} else {
			res.setHeader('Content-Type', 'image/png');
			res.setHeader('Content-disposition', 'attachment; filename=' + name + ".png");
			res.download('public/temp/' + name + '.png', null, (err) => {
				if(err) {
					return res.send(err);
				} else {
					fs.unlinkSync('public/temp/' + name + '.png')
				}
			});
		}
	});
});

let port = process.env.PORT || '3000';
app.set('port', port);

app.listen(port, () => {
  console.log('drawing listening on port ' + port);
});
