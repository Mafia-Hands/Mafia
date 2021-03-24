const puppeteer = require('puppeteer-core');

async function enterNickname(page, nickname) {
    await page.type('input#nickname', nickname);
}

async function enterRoomCode(page, roomCode) {
    await page.type('input#room-code', roomCode);
}

async function clickJoin(page) {
    await page.evaluate(() => {
        document.querySelector('button#join-lobby').click();
    });
}

async function clickCreateLobby(page) {
    await page.evaluate(() => {
        document.querySelector('button#create-lobby').click();
    });
}

async function getChromeLocation() {
    let chromeLocation;
    if (process.platform === 'win32') {
        chromeLocation = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    } else if (process.platform === 'darwin') {
        chromeLocation = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
    } else {
        throw new Error(
            'Unsupport OS, please manually enter the chrome location as an argument, e.g. npm start "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"'
        );
    }
    return chromeLocation;
}

function busyWait(seconds) {
    const until = new Date(new Date().getTime() + seconds * 1000);
    while (until > new Date()) {}
}

(async () => {
    // Automatically find chrome or open chrome via the location that the user specifies
    let chromeLocation;
    if (process.argv[2] === undefined) {
        chromeLocation = await getChromeLocation();
    } else {
        chromeLocation = process.argv[2];
    }

    // Change the url here to open different sites
    const url = 'http://localhost:3000/';

    let browser;
    try {
        browser = await puppeteer.launch({
            executablePath: chromeLocation,
            headless: false,
            defaultViewport: null,
        });
    } catch {
        // eslint-disable-next-line no-console
        console.log(
            'Chrome cannot be found, please check you have chrome installed or you have enter the correct location for chrome, for more information, please read the README.md'
        );
    }

    const pages = [];

    // Chrome launches with a default page, set that as page one.
    const defaultPages = await browser.pages();
    pages.push(defaultPages[0]);

    // Set up for host
    const host = pages[0];
    await host.goto(url);
    await enterNickname(host, 'Test');
    await clickCreateLobby(host);

    // Wait until room code appears
    await host.waitForSelector('h2#room-code', {
        visible: true,
    });

    // Get roomCode generated by the backend
    let roomCode = await host.evaluate(() => {
        roomCode = document.querySelector('h2#room-code').innerText;
        return roomCode.substr(roomCode.lastIndexOf(' ') + 1);
    });

    for (let i = 1; i < 6; i += 1) {
        pages.push(await browser.newPage());
        await pages[i].goto(url);
        await enterNickname(pages[i], (i + 1).toString());
        await enterRoomCode(pages[i], roomCode);
        await clickJoin(pages[i]);
    }

    // Bring the browser focus back to the host page and click the start game button
    await host.bringToFront();
    busyWait(2);
    await host.evaluate(() => {
        document.querySelector('button#start-game').click();
    });
})();
