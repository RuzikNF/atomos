# atomOS Desktop Environment
[![Github All Releases](https://img.shields.io/github/downloads/ruslang02/atomos/total.svg)]() [![npm](https://img.shields.io/npm/dt/atomos.svg)]() [![npm](https://img.shields.io/npm/v/atomos.svg)]() [![node](https://img.shields.io/node/v/atomos.svg)]() [![David](https://img.shields.io/david/ruslang02/atomos.svg)]()
![alt text](https://raw.githubusercontent.com/ruslang02/atomos/master/PREVIEW.png) 

Latest version: 0.5.1 (build 131). [Download .iso](https://github.com/ruslang02/atomos/releases).

Fully web-based X11 Desktop Environment on Linux, working in Electron.
Contains web-based applications with absolute Node.JS access.
There is also an operating system available based on this.

## Installation (for Linux)

Download this repository and unpack it to `/atomos` or run this command:
```
sudo git clone https://github.com/ruslang02/atomos.git /atomos
```

Firstly, you should have Node.JS and NPM installed:
```
sudo apt-get install -y nodejs npm
```
Then you need Electron to work:
```
sudo npm install -g electron --unsafe-perm=true --allow-root
```
Install the libraries:
```
npm update
```
And, finally, to run this monster:
```
electron /atomos
```

## Changelog

Changelog is available [here](https://github.com/ruslang02/atomos/blob/master/CHANGELOG.md).

## Hacking
You can edit your desktop envionment in real-time, adding features and modifying the look and feel.
