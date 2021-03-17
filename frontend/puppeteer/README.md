# Puppeteer Automation

> Puppeteer is a Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol.

This is **not** part of the logic for the frontend or the backend, but rather, it eases the work for debugging as it enables the frontend to quickly to get to the state where a fault may have occurred. This is especially useful as this version of Mafia requires 6 players to start. 

* Note this lite version of puppeteer has only been tested for Windows, it may or may not work for Mac OS

## How to run
* Run `npm install` in **this folder**
* Run `npm start` to start the browser test
* If the application doesn't start, ensure that you have chrome installed and `executablePath` in `launchPlayers.js` is set to the correct location. 