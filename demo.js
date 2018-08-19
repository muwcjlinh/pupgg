const puppeteer = require('puppeteer');
const clipboardy = require('clipboardy');
const fs = require('fs');
var accounts = require('./data/accounts.json');

(async() => {
    var gottenAPI = {
        inf: []
    }
    var i = 0;
    for (let account of accounts.acc) {
        console.log(gottenAPI)
        i++;
        // Mở trình duyệt mới và tới trang của kenh14
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto('http://mail.google.com');

        await page.mouse.click(345, 254);
        await page.keyboard.type(account.id);
        await page.waitFor(2000);
        await page.keyboard.press('Enter');

        await page.waitFor(5000);
        await page.mouse.click(324, 272);
        await page.keyboard.type(account.pass);
        await page.waitFor(2000);
        await page.keyboard.press('Enter');

        await page.waitForNavigation();
        const page2 = await browser.newPage();
        await page2.goto('https://console.developers.google.com');
        await page2.waitForNavigation({waitUntil: 'domcontentloaded'});
        // click tab api
        await page2.mouse.click(100, 195);
        await page2.waitFor(20000);
        // create api
        await page2.mouse.click(333, 170);
        await page2.waitFor(5000);
        await page2.mouse.click(333, 205);
        await page2.waitFor(20000);
        //copy api
        await page2.mouse.click(623, 294);

        let api = clipboardy.readSync();
        let data = {
            stt: i,
            email: account.id,
            password: account.pass,
            api: api
        }
        console.log(data);
        console.log(clipboardy.readSync());

        gottenAPI.inf.push(data);

        dataSave = JSON.stringify(gottenAPI);

        fs.writeFile('./data/api.json', dataSave, 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }

            console.log('save file done!');
        });

        await browser.close();
        console.log('done');
    }
})();