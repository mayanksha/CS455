#!/bin/bash

echo "Now Setting up NPM Configuration"
npm config set prefix '/usr/local'
source ~/.bashrc
apt install -y node-typescript
echo $PATH 
npm i -g @angular/cli
npm i -g ts-node 

echo ">>> Now building Front-End Part"
cd ./client
npm i -g @angular/cli
command -v ng 2>&1 >/dev/null
if [ $? -ne 0 ]; then
	echo "Angular CLI (ng) wasn't installed properly, please retry manually"	
	exit -1
fi
npm install
if [ $? -ne 0 ]; then
	echo ">>> Failed building local npm modules (client)."	
fi
echo ">>> Done building Front-end. You may start the front-end server using \"npm start\" inside the client folder (PORT 4200)"	

cd ../server
echo ">>> Now building Back-End Part"
npm i -g ts-node 
command -v ts-node 2>&1 >/dev/null
if [ $? -ne 0 ]; then
	echo "(ts-node) wasn't installed properly, please retry manually"	
	exit -1
fi
npm install
if [ $? -ne 0 ]; then
	echo ">>> Failed building local npm modules (server)."	
	exit -1
fi
echo ">>> Done building Back-end. You may start the back-end server using \"npm start\" inside the server folder (PORT given by SERVER_PORT env variable or 9000 default)"	


