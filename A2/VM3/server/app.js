const express = require( 'express' );
const cors = require( 'cors' );
const httpLogger = require( 'morgan' );
const bodyParser = require( 'body-parser' );
const assert = require( 'assert' );
const os = require( 'os' );
const os_utils = require( 'os-utils' );
const cp = require( 'child_process' );
const util = require('util');
const exec =  util.promisify(require('child_process').exec);

const app = express();
const server = require('http').Server(app);
const io = require( 'socket.io' )(server);

app.use(cors());
app.use(httpLogger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));

let sendObj = null;
let VM_Config = {
	vm1_IP: null,
	vm2_IP: null,
	timeInterval: null
};

process.nextTick(() => {
	const vm1_name = 'vm1_c';
	const vm2_name = 'vm2_c';
	const docker_inspect = exec(`docker inspect ${vm1_name} ${vm2_name}`);
	docker_inspect.then((data) => {
		let config = JSON.parse(data.stdout);
		config = config.map((VM) => {
			return {
				Name: VM.Name,
				IP: VM.NetworkSettings.Networks.bridge.IPAddress
			};
		});
		VM_Config.vm1_IP = config[0].IP;
		VM_Config.vm2_IP = config[1].IP;
		sendObj = {
			config: config
		};
	})
		.catch((err) => {
			throw err;
		});
});
const env_PORT = Number.parseInt(process.env.SERVER_PORT || "8000");
app.get('/getIP', IPHandler);
app.use('/*', ErrorHandler);

function pinger(socket, IP) {
		if(VM_Config.timeInterval < 0.2) return;
		if(typeof IP !== 'string') return;
		let pingProcess = cp.spawn('ping', ['-i', 
			VM_Config.timeInterval.toString(),
			IP
		]);
		pingProcess.stdout.on('data', (data) => {
			let str = data.toString();
			console.log(str);
			socket.emit('pingICMP', str);
		});
		pingProcess.stderr.on('data', (data) => {
			console.log(`stderr: ${data}`);
		});
		pingProcess.on('exit', (code, signal) => {
			console.log(`child process exited with code ${code}, signal = ${signal}`);
		});
	return pingProcess;
}
io.on('connection', socket => {
	socket.emit('pingICMP', {
		msg: 'Started Pinging the Virtual Machines'
	});
	let pingProcess_vm1;
	let pingProcess_vm2;
	socket.on('getPing', function (data) {
		console.log(data);
		VM_Config.timeInterval = data.interval;
		pingProcess_vm1 = pinger(socket, VM_Config.vm1_IP);
		pingProcess_vm2 = pinger(socket, VM_Config.vm2_IP);
		// Ping requires minimum 0.2 seconds spacing between two attempts
	});

	socket.on('disconnect', () => {
		pingProcess_vm1.kill();
		pingProcess_vm2.kill();
	});
});
	function randomGenerator(req, res, next) {
		const rand = Math.floor((Math.random() * 20) + 1);
		res.status(200);
		res.send({
			randVal: rand
		});
		res.end();
	}

	function IPHandler(req, res, next) {
		res.send(sendObj);
	}
	function ErrorHandler(err, req, res, next) {
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
	}
	server.listen(env_PORT, (err) => { 
		if (err) {
			throw err;
		}
		console.log("Server listening on " + env_PORT);
	});
