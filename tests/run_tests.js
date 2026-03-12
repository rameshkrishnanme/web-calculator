const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const testCasesPath = path.join(__dirname, 'test_cases.json');
const testCases = JSON.parse(fs.readFileSync(testCasesPath, 'utf8'));

(async () => {
  console.log('Starting automated tests using Puppeteer...\n');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  let passedCount = 0;

  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    console.log('✅ Loaded calculator app at http://localhost:3000\n');

    const clickButton = async (text) => {
      const elements = await page.$$('button');
      for (let el of elements) {
        const btnText = await page.evaluate(e => e.innerText, el);
        if (btnText === text) {
          await el.click();
          return;
        }
      }
      throw new Error(`Button with text "${text}" not found`);
    };

    for (const test of testCases) {
      process.stdout.write(`Running: ${test.name}... `);
      
      try {
        for (const step of test.steps) {
          if (step.startsWith('Click ')) {
            const btnText = step.replace('Click ', '');
            await clickButton(btnText);
          }
        }

        const currentOperand = await page.$eval('.current-operand', el => el.innerText);
        
        if (currentOperand === test.expected_result) {
          console.log(`✅ Passed (Result: ${currentOperand})`);
          passedCount++;
        } else {
          console.log(`❌ Failed (Expected: ${test.expected_result}, Got: ${currentOperand})`);
        }
      } catch (err) {
         console.log(`❌ Failed with error: ${err.message}`);
      }
    }
  } catch (error) {
    console.error('❌ Test execution failed: Could not load the app. Make sure the server is running (npm start).', error.message);
  } finally {
    await browser.close();
    console.log(`\n========================================`);
    console.log(`Tests Completed: ${passedCount}/${testCases.length} passed.`);
    console.log(`========================================\n`);
    
    if (passedCount !== testCases.length) {
      process.exit(1);
    }
  }
})();
