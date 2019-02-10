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

const env_PORT = Number.parseInt(process.env.SERVER_PORT || "8000");

class WebServer {
	private sendObj = {};
	private VM_Config = {
		vm1_IP: null,
		vm2_IP: null,
		timeInterval: 1
	};

	constructor(config){
		this.sendObj = {
			config: config
		};
		console.log(this.sendObj);
		this.VM_Config.vm1_IP = config[0].IP;
		this.VM_Config.vm2_IP = config[1].IP;
		app.use(cors());
		app.use(httpLogger('dev'));
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended : false }));
		app.get('/getIP', this.getIPHandler);
		app.use('/*', this.ErrorHandler);
		io.on('connection', socket => {
			/*socket.emit('pingICMP', {
			 *  msg: 'Started Pinging the Virtual Machines'
			 *});*/
			let pingProcess_vm1;
			let pingProcess_vm2;
			socket.on('getPing', (data) => {
				console.log(data);
				this.VM_Config.timeInterval = data.interval;
				// Ping requires minimum 0.2 seconds spacing between two attempts
				pingProcess_vm1 = this.pinger(socket, this.VM_Config.vm1_IP);
				pingProcess_vm2 = this.pinger(socket, this.VM_Config.vm2_IP); 
			});

			socket.on('stopPing', () => {
				console.log('stopPing emitted!');
				if (typeof pingProcess_vm1 !== 'undefined')
					pingProcess_vm1.kill();
				if (typeof pingProcess_vm2 !== 'undefined')
				pingProcess_vm2.kill();
			})
			socket.on('disconnect', () => {
				if (typeof pingProcess_vm1 !== 'undefined')
					pingProcess_vm1.kill();
				if (typeof pingProcess_vm2 !== 'undefined')
				pingProcess_vm2.kill();
			});
		});
	}
	private pinger = (socket, IP) => {
		if(this.VM_Config.timeInterval < 0.2) return;
		if(typeof IP !== 'string') return;
		if(typeof this.VM_Config === 'undefined') return;
		let pingProcess = cp.spawn('ping', 
			['-i', 
				this.VM_Config.timeInterval.toString(),
				'-W',
				'1',
				IP
		]);
		pingProcess.stdout.on('data', (data) => {
			let str = data.toString();
			console.log(`stdout: ${str}`);
			socket.emit('pingICMP', str);
		});
		pingProcess.stderr.on('data', (data) => {
			let str = data.toString();
			console.error(`stdout: ${str}`);
			socket.emit('pingICMP', str);
		});
		pingProcess.on('exit', (code, signal) => {
			console.log(`child process exited with code ${code}, signal = ${signal}`);
		});
		return pingProcess;
	}
	public getIPHandler = (req, res, next) => {
		console.log(this.sendObj);
		res.send(this.sendObj);
		res.end();
	}
	private ErrorHandler = (err, req, res, next) => {
		console.error(err);
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
}

process.nextTick(() => {
	const vm1_name = 'vm1_c';
	const vm2_name = 'vm2_c';
	const expressApp = new WebServer([{
		Name: '/vm1_c',
		IP: '172.20.0.2'
	},
		{
		Name: '/vm2_c',
		IP: '172.20.0.3'
		}])
	/*const docker_inspect = exec(`docker inspect ${vm1_name} ${vm2_name}`);
	 *docker_inspect.then((data) => {
	 *  let config = JSON.parse(data.stdout);
	 *  config = config.map((VM) => {
	 *    return {
	 *      Name: VM.Name,
	 *      IP: VM.NetworkSettings.Networks.bridge.IPAddress
	 *    };
	 *  });
	 *  const expressApp = new WebServer(config);
	 *})
	 *  .catch((err) => {
	 *    throw err;
	 *  });*/
});

server.listen(env_PORT, (err) => { 
	if (err) {
		throw err;
	}
	console.log("Server listening on " + env_PORT);
});
