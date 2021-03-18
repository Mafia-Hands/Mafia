# Puppeteer Automation

> Puppeteer is a Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol.

This is **not** part of the logic for the frontend or the backend, but rather, it eases the work for debugging as it enables the frontend to quickly to get to the state where a fault may have occurred. This is especially useful as this version of Mafia requires 6 players to start. 

* Note this lite version of puppeteer has only been tested for Windows and MacOS, you will need to have chrome installed.

## How to run
* Run `npm install` in **this folder**
* Run `npm start` to start the browser test
* If chrome cannot be detected automatically, please use `npm start "CHROME_LOCATION"` to manually specify your chrome location. 