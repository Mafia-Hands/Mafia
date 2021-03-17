const puppeteer = require('puppeteer-core');

(async () => {
    const browser = await puppeteer.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', 
    headless:false,
    args: [`--window-size=1080,1920`] });  
    let pages = [];
    
    // Chrome launches with a default page, set that as page one.
    // pages.push(await browser.pages()[0]);

    // for (let i = 0; i < 6; i++){
    //     await pages.push(await browser.newPage());
    // }
    // for (let i = 0; i < 6; i++){
    //     pages[i].goto('https://mafia-hands-frontend-cd.herokuapp.com/');
    // }
    
    await pages.push(await browser.newPage());
    await pages[0].goto('https://mafia-hands-frontend-cd.herokuapp.com/');
    let host = pages[0];
    // let inputs = await host.evaluate(() => Array.from(document.querySelectorAll("input"), element => element.textContent));
    await enterNickname(host, "Test")
    await clickJoin(host);

    await host.waitForSelector('h3.LobbySettings_gameCode__3PHQc', {
        visible: true,
    });

    var GameCodeString = "empty";
    GameCodeString = await host.evaluate(() => {
        GameCodeString = document.querySelector("h3.LobbySettings_gameCode__3PHQc").innerText;
        GameCodeString = GameCodeString.substr(GameCodeString.lastIndexOf(" ") + 1)
        return GameCodeString
    })
    console.log(GameCodeString)

})();

async function enterNickname(page, nickname){
    await page.evaluate(({nickname}) => {
        let inputs = document.querySelectorAll("input");
        inputs[0].value = nickname
    }, {nickname});
}

async function enterRoomCode(page, roomCode){
    await page.evaluate(({roomCode}) => {
        let inputs = document.querySelectorAll("input");
        inputs[1].value = roomCode
    }, {roomCode});
}

async function clickJoin(page){
    await page.evaluate(() => {
        let buttons = document.querySelectorAll("button");
        let join = buttons[0]
        join.click()
    });
}

async function clickCreateLobby(page){
    await page.evaluate(() => {
        let buttons = document.querySelectorAll("button");
        let createLobby = buttons[1]
        createLobby.click()
    });
}