const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://egov.uscis.gov/cris/processTimesDisplayInit.do');
  await page.select('#serviceCenter', '992'); // Nebraska Service Center
  await page.click('input[name="displaySCProcTimes"]');
  await page.waitForSelector('#posted');

  const lastUpdated = await page.$eval('#posted', el => el.innerHTML);
  console.log(lastUpdated);

  // Looking for I-485
  let i485 = await page.$eval(
    'tbody[title="I-485"] tr:first-of-type th',
    el => el.innerText
  );
  i485 +=
    '  ' +
    (await page.$eval(
      'tbody[title="I-485"] tr:first-of-type td:last-of-type',
      el => el.innerText
    ));
  console.log(i485);

  // Looking for I-756
  let i756 = await page.$eval(
    'tbody[title="I-765"] tr:nth-of-type(3) th',
    el => el.innerText
  );
  i756 +=
    '  ' +
    (await page.$eval(
      'tbody[title="I-765"] tr:nth-of-type(3) td:last-of-type',
      el => el.innerText
    ));
  console.log(i756);

  // Looking for I-131
  let i131 = await page.$eval(
    'tbody[title="I-131"] tr:nth-of-type(5) th',
    el => el.innerText
  );
  i131 +=
    '  ' +
    (await page.$eval(
      'tbody[title="I-131"] tr:nth-of-type(5) td:last-of-type',
      el => el.innerText
    ));
  console.log(i131);

  await browser.close();
})();
