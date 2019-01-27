import Sequelize = require('sequelize');
import express = require('express');
import bodyParser = require('body-parser');
import cors = require('cors');
import assert = require('assert');

import { Request, Response, NextFunction } from 'express';
import { CustomerFeedbackAttributes, CustomerFeedbackFactory, CustomerFeedbackInstance} from './models/CustomerFeedback';
import { createModels } from './models';

const sequelizeConfig = require('./config/sequelizeConfig.json');
const env_PORT: number = Number.parseInt(process.env.SERVER_PORT || "3000");
const MAX_TEXT_LEN = 500;

const db = createModels(sequelizeConfig);
db.sequelize.sync().then((vars) => {
	console.log("Successfully connected to Database!");
})
	.catch((err) => {
		throw err;	
	});

const app: express.Application = express();

app.use('*', cors({
	origin: "http://localhost:4200" 
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
	res.send("SLKDJFVSLKDJVLK");
	res.status(200);
	res.end();
})

app.post("/createFeedback", (req: Request, res: Response, next: NextFunction) => { 
	assert(req.body.response1 != undefined && typeof Number.isInteger(req.body.response1));
	assert(req.body.response1 != undefined && typeof Number.isInteger(req.body.response2));
	assert(req.body.response1 != undefined && typeof Number.isInteger(req.body.response3));
	assert(req.body.response1 != undefined && typeof Number.isInteger(req.body.response4));
	if (req.body.textMessage != undefined){
		assert(typeof req.body.textMessage === 'string' && req.body.textMessage.length <= MAX_TEXT_LEN)
	}
	let feedback : CustomerFeedbackAttributes = {
		response1: req.body.response1,
		response2: req.body.response2,
		response3: req.body.response3,
		response4: req.body.response4,
		textMessage: req.body.textMessage 
	};
	db.Feedback.create(feedback).then((response) => {
		res.send(response);
		res.status(200);
		res.end(200);
	})
	.catch((err) => {
		throw err;
	})
})
app.get("/getFeedbacks", (req: Request, res: Response, next: NextFunction) => { 
	db.Feedback.findAll()
		.then((responses: CustomerFeedbackInstance[]) => {
			if (responses.length == 0){
				res.end();
				return;
			}
			let sendObj : {
				response1_avg: number,
				response2_avg: number,
				response3_avg: number,
				response4_avg: number,
				textMessages: string[]
			} = {
				response1_avg: 0,
				response2_avg: 0,
				response3_avg: 0,
				response4_avg: 0,
				textMessages: [] 
			};
			for(let i = 0; i < responses.length; i++){
				sendObj.response1_avg += responses[i].response1;
				sendObj.response2_avg += responses[i].response2;
				sendObj.response3_avg += responses[i].response3;
				sendObj.response4_avg += responses[i].response4;
				if ((responses[i].textMessage as any).length != 0)
					sendObj.textMessages.push((responses[i].textMessage as any));
			}
			sendObj.response1_avg /= responses.length;
			sendObj.response2_avg /= responses.length;
			sendObj.response3_avg /= responses.length;
			sendObj.response4_avg /= responses.length;
			res.send(sendObj);
			res.end();
			})
		.catch((err) => {
			throw err;
		})
	})
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
	console.log("Server listening on " + env_PORT);
})

/*const sequelize = new Sequelize('CS455_A1', null, null, {
 *  host: 'localhost',
 *  dialect: 'sqlite',
 *  operatorsAliases: false,
 *
 *  pool: {
 *    max: 5,
 *    min: 0,
 *    acquire: 30000,
 *    idle: 10000
 *  },
 *  // Necessary, otherwise each time you sync, the table will be dropped
 *  sync: {
 *    force: false
 *  },
 *  // SQLite only
 *  storage: '../database/CS455_A1.db'
 *});*/
/*const Feedback = sequelize.define('feedback', {
 *  // Useless because Sequelize by default adds createdAt and updatedAt columns 
 *  date: {
 *    type: Sequelize.DATE,
 *    defaultValue: Sequelize.NOW,
 *    allowNull: false
 *  },
 *  response1: {
 *    type: Sequelize.INTEGER,
 *    allowNull: false
 *  },
 *  response2: {
 *    type: Sequelize.INTEGER,
 *    allowNull: false
 *  },
 *  response3: {
 *    type: Sequelize.INTEGER,
 *    allowNull: false
 *  },
 *  response4: {
 *    type: Sequelize.INTEGER,
 *    allowNull: false
 *  },
 *  textMessage: {
 *    type: Sequelize.STRING(500),
 *    allowNull: true
 *  }
 *})*/
/*sequelize.authenticate()
 *  .then(() => {
 *    console.log('Success!');
 *  })
 *  .catch(err => {
 *    console.error(err);
 *  });*/
