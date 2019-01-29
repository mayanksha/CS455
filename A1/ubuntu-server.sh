#!/bin/bash
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bkp
sudo sed -i 's/in.archive.ubuntu.com/mirror.cse.iitk.ac.in/g' /etc/apt/sources.list
sudo apt -y update
sudo apt -y upgrade
#sudo apt-get install -y vim-gnome
sudo apt install -y curl 
curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get install -y aptitude
sudo aptitude install -y nodejs npm


sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation

#------------------Fix npm Permissions (change global dir)------------------


curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get install -y aptitude
sudo aptitude install -y nodejs npm

mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo "PATH=~/.npm-global/bin:$PATH" >> ~/.bashrc
source ~/.bashrc
aptitude install -y node-typescript
npm i -g @angular/cli
npm i -g ts-node 


#------------------Install nginx (change global dir)------------------
#sudo apt update
#sudo aptitude install -y nginx
#if [ $? -ne 0 ]; then
	#exit -1;
#fi
#sudo ufw app list
#sudo ufw allow 'Nginx Full'
#sudo systemctl start nginx
#sudo systemctl status nginx

#sudo apt-get install -y git
#git config --global user.name "Mayank Sharma"
#git config --global user.email "msharma@iitk.ac.in"
#git config --global core.editor vim -w
#sudo npm update -g npm
##sudo npm install @angular/cli express typescript @angular/common @angular/core

#git clone https://github.com/mayanksha/vimrc.git
#cd vimrc
#git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim
#mkdir -p ~/.vim/colors && cp -r ./colors/* ~/.vim/colors
#cp ./.vimrc ~/.vimrc
#vim +PluginInstall +qall
#cd ..
#rm -rf vimrc
#cp ./.bashrc ~/.bashrc

##------------------YouCompleteMe------------------

#curr_dir=($(pwd))
#cd ~/.vim/bundle/YouCompleteMe
#sudo apt-get install build-essential cmake python-dev python3-dev
#./install.py --tern-completer
#cd $curr_dir

##------------------Terminator Installation------------------
#sudo add-apt-repository ppa:gnome-terminator
#sudo apt-get update
#sudo apt-get install terminator

#if [ -d "~/.config/terminator" ] then
	#cp ./terminator/config ~/.config/terminator
#else
	#mkdir ~/.config/terminator
	#cp ./terminator/config ~/.config/terminator
#fi

##-------------------------- Nginx Installation------------------
#apt-get install -y nginx
#sudo ufw allow 'Nginx Full'
#sudo ufw allow 'OpenSSH'


##-------------------------- MySQL Installation------------------
#sudo apt-get install mysql-server
##------------------Gnome Settings Installation------------------
#bash ./gnome_settings.sh

##------------------Extensions Installation------------------
#git clone https://github.com/gTile/gTile.git ~/.local/share/gnome-shell/extensions/gTile@vibou
##Pixel Saver, system-monitor, mmod-Panel, alternate tab, panelSettings
##apt-get install -y nginx
#sudo mysql_secure_installation
