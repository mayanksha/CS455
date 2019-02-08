var express = require( 'express' );
var cors = require( 'cors' );
const app = express();

app.use(cors());
const env_PORT = Number.parseInt(process.env.SERVER_PORT || "8000");
function randomGenerator(req, res, next) {
	const rand = Math.floor((Math.random() * 30) + 50);
	res.status(200);
	res.send({
		randVal: rand
	});
	res.end();
}
app.get('/', randomGenerator);

app.use('/*', (err, req, res, next) => {
	// Assertion errors are wrong user inputs
	if(err.name === 'SyntaxError' || 
		err.code === 'ERR_ASSERTION' || 
		err.code === 'ER_DATA_TOO_LONG'){
		// Bad HTTP Request
		res.status(400);
		res.end('400 - BAD REQUEST');
	}
	else if (err.code === 'ER_DUP_ENTRY') {
		// Bad HTTP Request
		res.status(409);
		res.end('409 - BAD REQUEST');
	}
	else {
		// Internal Server Error 
		res.status(500);
		res.end('500 - INTERNAL SERVER ERROR!');
	}
});
app.listen(env_PORT, (err) => { 
	if (err) {
		throw err;
	}
	console.log("Server listening on " + env_PORT);
});
