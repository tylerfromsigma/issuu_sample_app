	const express = require('express');
	const app = express();

	app.get('/', function(req, res) {
		res.sendFile(__dirname + '/index.html');
	});

	app.use(express.json());

	app.post('/api/foo', foo)

	function foo(req, res) {
    	console.log(req.body)

    	const crypto = require('crypto');
		const nonce = crypto.randomUUID();

		// const EMBED_PATH = 'https://app.sigmacomputing.com/embed/1gfxtc0pKxjd58xClcgVvC/workbook/5PJpzughMUzYDtKo6atnhy/edit';	
		const EMBED_PATH = 'https://app.sigmacomputing.com/embed/1-kYaxNjnvbmHZ95bKjfbyl'
		const EMBED_SECRET = '9afd4d244d85e0234c5129d02eff5197683d804e381aaff946f61aecc86ba3e2cc19d3db00b206e8840a6e05d9a26fca30e7e6cdd56e6e3ff36b7d01a16439be';
		let searchParams = '?:client_id=dda3d5e0df47a709274fc973f903e57d90ab1a3ab53b32d9ef55bbf84a87e1c0';
	    	searchParams += '&:nonce=' + nonce;
	   	searchParams += '&:email=' + req.body.email;
	   	searchParams += '&:external_user_id=' + req.body.email;
	    	searchParams += '&:account_type=' + req.body.type;
	    	searchParams += '&:external_user_team=' + req.body.team;
		searchParams += '&:mode=userbacked';
	    	searchParams += '&:session_length=3600';
	    	searchParams += '&:time=' + Math.floor(new Date().getTime() / 1000);
	
		const URL_WITH_SEARCH_PARAMS = EMBED_PATH + searchParams;
	
		const SIGNATURE = crypto
			.createHmac('sha256', Buffer.from(EMBED_SECRET, 'utf8'))
			.update(Buffer.from(URL_WITH_SEARCH_PARAMS, 'utf8'))
			.digest('hex');
	
		const URL_TO_SEND = `${URL_WITH_SEARCH_PARAMS}&:signature=${SIGNATURE}`;

		res.status(200).send({url:URL_TO_SEND});
	};

app.listen(3000);

