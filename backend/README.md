# Mafia 💎🖐 
This folder holds the backend server which is mainly composed of NodeJS, Express and Socket.Io. The purpose of the backend is to 
* Allow multiple clients to join a real time game of Mafia 
* Host the game logic of Mafia

## How to run
* Use the terminal to navigate to the backend folder
* To install dependency, run the following command in the terminal
    *  `npm install`
* To start the server, run the following command in the terminal
    * `npm start`
* For the ease of development, instead of manually restart the server everything a change is made, you could use the following command to "watch" for changes and restart the server automatically
    * `npm run live`

## How to debug the backend application in VSC
See documentation [here](https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_auto-attach)

* Press Control + Shift + P and look for Auto Attach and set it to `Always`
* Restart your terminal, This can be done by clicking the ⚠ icon in the top right of the terminal, or just creating a new one.
* Set breakpoints in VSC and start the app as usual: `npm start` / `npm run live`