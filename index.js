const puppeteer = require('puppeteer');
const clipboardy = require('clipboardy');
const fs = require('fs');
var accounts = require('./data/accounts.json');

(async() => {
    var gottenAPI = {
        inf: []
    }
    for (let account of accounts.acc) {
        console.log(gottenAPI)
        // Mở trình duyệt mới và tới trang của kenh14
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(60000);
        await page.goto('http://mail.google.com');

        await page.mouse.click(345, 254);
        await page.keyboard.type(account.mail);
        await page.waitFor(2000);
        await page.keyboard.press('Enter');

        await page.waitFor(5000);
        await page.mouse.click(324, 272);
        await page.keyboard.type(account.password);
        // await page.keyboard.type('PerfecTTwo2');
        await page.waitFor(2000);
        await page.keyboard.press('Enter');

        // recovery
        await page.waitFor(2000);
        await page.mouse.click(533, 590);
        await console.log('click 1');

        // // first login
        // await page.waitForNavigation();
        // await page.waitFor(10000);
        // await page.mouse.click(400, 530);
        // await console.log('click 2');
        // await page.waitFor(5000);
        // await page.mouse.click(400, 530);
        // await console.log('click 3');

        // recovery mail
        // await page.waitForNavigation(); //optional
        await page.waitFor(5000);
        await page.goto('https://myaccount.google.com/recovery/email?rapt=AEjHL4OCSAL_ulKLqAu5Y1Cjv-4rkwhtPoy2w10h7lidjBSu_qCSYiC4vVVTCDjDgzbp5txGBtrqPyAD5Rx5HmGa5QYxElfX7A');
        await page.mouse.click(366, 290);
        await console.log('click 4');
        await page.keyboard.type(account.password);
        await page.waitFor(2000);
        await page.keyboard.press('Enter');
        await page.waitForNavigation();
        await page.mouse.click(228, 247);
        await console.log('click 5');
        await page.waitFor(5000);
        await page.mouse.click(380, 288);
        await console.log('click 6');
        await page.keyboard.type(account.recovery);
        await page.waitFor(5000);
        await page.mouse.click(468, 375);
        await console.log('click 7');

        await page.waitForNavigation();

        // google account
        await page.waitFor(10000);
        await page.goto('https://myaccount.google.com/signinoptions/password?rapt=AEjHL4N52IvRABAUhBN3qR6yh1Uh9XYgij-XgoqJObjIxPFPGCg6viQbbiVexV9Ove5VEckwRlNfVStz2iWZ3yTeQjWw12s0EQ');
        await page.mouse.click(366, 290);
        await console.log('click 8');
        await page.keyboard.type(account.password);
        await page.waitFor(2000);
        await page.keyboard.press('Enter');
        // change password
        await page.waitForNavigation();
        await page.waitFor(2000);
        await page.mouse.click(145, 309);
        await console.log('click 9');
        await page.keyboard.type('PerfecTTwo2');
        await page.waitFor(2000);
        await page.mouse.click(196, 495);
        await console.log('click 10');
        await page.waitFor(2000);
        await page.keyboard.type('PerfecTTwo2');
        await page.waitFor(2000);
        await page.mouse.click(158, 584);
        await console.log('click 11');

        await page.waitForNavigation();
        const page2 = await browser.newPage();
        page2.setDefaultNavigationTimeout(60000);
        await page2.goto('https://console.developers.google.com');
        await page.waitFor(10000);

        await page2.mouse.click(176, 316);
        await console.log('click 12');
        await page2.waitFor(2000);
        await page2.mouse.click(176, 387);
        await console.log('click 13')
        await page2.waitFor(2000);
        await page2.mouse.click(609, 464);
        await console.log('click 14')
        await page2.waitFor(2000);
        await page2.mouse.click(720, 222);
        await console.log('click 15')
        await page2.waitFor(5000);
        await page2.mouse.click(371, 392);
        await console.log('click 16')
        await page2.waitFor(5000);
        await page2.mouse.click(59, 393);
        await console.log('click 17')
        await page2.waitFor(40000);

        // click tab api
        await page2.mouse.click(75, 276);
        await console.log('click 18')
        await page2.waitFor(20000);
        // create api
        await page2.mouse.click(414, 525);
        await console.log('click 19');
        await page2.waitFor(5000);
        await page2.mouse.click(485, 333);
        await console.log('click 20');
        await page2.waitFor(20000);
        //copy api
        await page2.mouse.click(623, 300);
        await console.log('click 21');

        let api = clipboardy.readSync();
        let data = {
            stt: account.stt,
            mail: account.mail,
            api: api
        }
        console.log(data);

        gottenAPI.inf.push(data);

        dataSave = JSON.stringify(gottenAPI);

        fs.writeFile('./data/api.json', dataSave, 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }

            console.log('save file done!');
        });

        await browser.close();
        await console.log('done');
    }
})();