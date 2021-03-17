const puppeteer = require('puppeteer-core');

(async () => {
    const browser = await puppeteer.launch({ 
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', 
        headless:false
    });  

    let pages = [];
    
    // Chrome launches with a default page, set that as page one.
    const url = "http://localhost:3000/"
    let defaultPage = await browser.pages(); 
    await pages.push(defaultPage[0]);
    await pages[0].goto(url);
    let host = pages[0];

    await enterNickname(host, "Test")
    await clickCreateLobby(host);

    await host.waitForSelector('h3#room-code', {
        visible: true,
    });

    var GameCodeString;
    GameCodeString = await host.evaluate(() => {
        GameCodeString = document.querySelector("h3#room-code").innerText;
        GameCodeString = GameCodeString.substr(GameCodeString.lastIndexOf(" ") + 1)
        return GameCodeString
    })
    console.log(GameCodeString)

    for (let i = 1; i < 6; i++){
        await pages.push(await browser.newPage());
    }

    for (let i = 1; i < 6; i++){
        await pages[i].goto(url);
        await enterNickname(pages[i], (i+1).toString())
        await enterRoomCode(pages[i], GameCodeString)
        await clickJoin(pages[i]);
    }

    await host.bringToFront();
    busyWait(2);

    await host.evaluate(() => {document.querySelector("button#start-game").click()});
})();

async function enterNickname(page, nickname){
    await page.type('#nickname', nickname)
}

async function enterRoomCode(page, roomCode){
    await page.type('input#room-code', roomCode)
}

async function clickJoin(page){
    await page.evaluate(() => {document.querySelector("button#join-lobby").click()});
}

async function clickCreateLobby(page){
    await page.evaluate(() => {document.querySelector("button#create-lobby").click()});
}

function busyWait(seconds) {
    var until = new Date(new Date().getTime() + seconds * 1000);
    while(until > new Date())
    {
    }
}