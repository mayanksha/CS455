#!/bin/bash

#echo ">>> Trying to Install node.js v10, alongwith aptitude"
#curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
#sudo bash nodesource_setup.sh
#sudo apt-get install -y aptitude
#if [ $? -ne 0 ];then
	#echo "Failed Installing aptitude"
	#exit -1
#fi
#sudo aptitude install -y nodejs npm
#if [ $? -ne 0 ];then
	#echo "Failed Installing nodejs/npm"
	#exit -1
#fi


#echo ">>> Fixing the global NPM Directory"
#mkdir ~/.npm-global
#npm config set prefix '~/.npm-global'
#echo "PATH=~/.npm-global/bin:$PATH" >> ~/.bashrc

#echo ">>> Sourcing new .bashrc"
#source ~/.bashrc

#echo ">>> Trying to Install node-typescript, to transpile Typescript to Javascript"
#aptitude install -y node-typescript
#if [ $? -ne 0 ];then
	#echo "Failed Installing node-typescript"
	#exit -1
#fi

echo ">>> Now building Front-End Part"
cd ./client
npm i -g @angular/cli
command -v ng 2>&1 >/dev/null
if [ $? -ne 0 ]; then
	echo "Angular CLI (ng) wasn't installed properly, please retry manually"	
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
fi
npm install
if [ $? -ne 0 ]; then
	echo ">>> Failed building local npm modules (server)."	
fi
echo ">>> Done building Back-end. You may start the back-end server using \"npm start\" inside the server folder (PORT given by SERVER_PORT env variable or 9000 default)"	

