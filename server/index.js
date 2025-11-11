const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Server } = require('socket.io'); 
const http = require('http');
const puppeteer = require('puppeteer-extra');
const puppeteerExtraPluginStealth = require('puppeteer-extra-plugin-stealth');
puppeteer.use(puppeteerExtraPluginStealth());
const { executablePath } = require('puppeteer-core');
const { resolve } = require('path');
const { setTimeout } = require('timers');
// const fs = require('fs');
require('dotenv').config();



process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Optionally restart the server if critical
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
  // Optionally handle the rejection
});



const app = express();
const PORT = 5000;

// Middleware
 
app.use(express.json()); // Parse JSON bodies

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173', 'https://altissia.mooo.com'], // Allow both local and production
        methods: ['GET', 'POST'],       // Allowed HTTP methods
        credentials: true,              // Allow credentials
    },
});


let browser  ;
    
 const connecting  = async (socket,{email,password}) => {
  
  while(true){
    console.log('connecting');
     
       socket.browser = await puppeteer.launch({
            headless: false,
            //executablePath: '/usr/bin/google-chrome',
            //executablePath: '/usr/bin/chromium-browser',
            executablePath: '/usr/bin/chromium',  // Updated for Arch Linux
            //executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', 
            args: [
              '--no-sandbox',
              '--disable-setuid-sandbox',
              '--disable-blink-features=AutomationControlled',
              '--disable-infobars',
              '--window-size=1300,700',
              '--disable-extensions',
              '--disable-dev-shm-usage',
              '--disable-accelerated-2d-canvas',
              '--no-first-run',
              '--no-zygote',
              '--disable-gpu'
            ],
            defaultViewport: null
        });

  socket.page = await socket.browser.newPage();
  
  await socket.page.setDefaultNavigationTimeout(10 * 60 * 5000); // 10 minutes
  await socket.page.setDefaultTimeout(10 * 60 * 5000); // 10 minutes

  const cookies = await socket.page.cookies();  
  for (let cookie of cookies) {
      await socket.page.deleteCookie(cookie);  
  }

  await socket.page.goto('https://app.ofppt-langues.ma/gw/api/saml/init?idp=https://sts.windows.net/dae54ad7-43df-47b7-ae86-4ac13ae567af/', { waitUntil: 'domcontentloaded' });
  await new Promise((resolve)=>setTimeout(resolve,1000));
  await socket.page.waitForSelector('.form-control.ltr_override.input.ext-input.text-box.ext-text-box',{timeout:5000000});
  await socket.page.type('.form-control.ltr_override.input.ext-input.text-box.ext-text-box', email);
  await socket.page.click('.win-button.button_primary.button.ext-button.primary.ext-primary');
  await new Promise((resolve)=>setTimeout(resolve,1000));
  const userErrElement = await socket.page.$('#usernameError'); // Check if the element exists
  if (userErrElement) {
    console.log('userErr0');
    const userErr = await socket.page.evaluate((el) => el.innerHTML, userErrElement);
    if (userErr) {
      console.log('usererr1');
      socket.emit('loginStatus', { status: 'errUsername', end: false });
      socket.connn = 'false';
      break;
    }
  }

  socket.emit('loginStatus', { status: 'accessing ', end : false });

  await socket.page.waitForSelector('.form-control.input.ext-input.text-box.ext-text-box#i0118',{timeout:500000})
  await socket.page.type('.form-control.input.ext-input.text-box.ext-text-box#i0118', password);
  await socket.page.click('.win-button.button_primary.button.ext-button.primary.ext-primary');
  await new Promise((resolve)=>setTimeout(resolve,1000));

  const pwdErrElement = await socket.page.$('#passwordError'); // Check if the element exists
  if (pwdErrElement) {
    console.log('pwdErr0');
  const pwdErr = await socket.page.evaluate((el) => el.innerHTML, pwdErrElement);
  if (pwdErr) {
    console.log('pwdErr');
    socket.emit('loginStatus', { status: 'errPwd', end : false });
    socket.connn = 'false';
    break;
  }
  }


  socket.emit('loginStatus', { status: 'analysing ', end : false });
  
   await Promise.race([
      socket.page.waitForSelector('.sign-in-box.ext-sign-in-box.fade-in-lightbox', { timeout: 50000 }),  
  ]);

  socket.page.on('dialog', async (dialog) => {
    await dialog.accept(); 
  });



  // Wait for the input button to appear, with a longer timeout if needed
  const buttonSelector = "input.button.primary";
  await socket.page.waitForSelector(buttonSelector, { timeout: 100000 }); // Wait up to 100 seconds or more if needed

 
  // Check if the next input exists
  await socket.page.waitForSelector('#idSIButton9',{timeout:50000  });
  const inputButton = await socket.page.$("input#idSIButton9");
 
 await  new Promise((resolve)=>setTimeout(resolve,1000));
  if (inputButton) {
  
    // If the input exists, wait for the button and click it
    await socket.page.click("input#idSIButton9");
    await socket.page.waitForSelector('.c-bQzyIt-kiVRfz-gap-20', { timeout: 125000 });
    
    socket.connn = 'true';
    break;
  } else {
    // If the input doesn't exist, log an error and handle the failure
   
   // socket.emit('loginStatus', { status: 'errNoInput', end: false });
    socket.connn = 'true';
   
    break;
  }
 }
}

 const entering = async (socket,{email,password}) => {
  console.log('enteringg');
  if (!socket.page){     await connecting(socket,{email,password}) }
 
  if (socket.connn == 'true' ){
     
      let process ={};
      new Promise((resolve)=>setTimeout(resolve,500));
      socket.page.waitForSelector('.c-UUIxu span:nth-of-type(1)', { timeout: 500000 });
      const actualLang = await socket.page.$eval('.c-UUIxu span:nth-of-type(1)' ,(elem) => elem.innerHTML );
    
        
        process = {
          'lang': actualLang,
          'courses': [
            { 'level': 'A1-', 'purcentage': 0, 'Actv': [] },
            { 'level': 'A1', 'purcentage': 0, 'Actv': [] },
            { 'level': 'A2', 'purcentage': 0, 'Actv': [] },
            { 'level': 'B1', 'purcentage': 0, 'Actv': [] },
            { 'level': 'B2', 'purcentage': 0, 'Actv': [] },
            { 'level': 'C1', 'purcentage': 0, 'Actv': [] }
          ]
        };
          
     
        await  socket.page.waitForSelector('.c-kRsDtu', { timeout: 500000 });
     

      const typeT = await socket.page.$eval('.c-fkeHKJ:nth-of-type(2) p.c-UUIxu', (levell) => {
        // Get the text content of the <p> element excluding the <a> tag text
        const typeT = levell.textContent.replace(levell.querySelector('a').textContent, '').trim();
        // Returning typeT and typeStatus from the browser context
        return { typeT, typeStatus: true };
      });

    
  if (typeT.typeStatus){
    
    if (typeT.typeT !== 'Programme complet') {
    
      await socket.page.$eval('.c-fkeHKJ:nth-of-type(2) p.c-UUIxu a ',(aC)=>{
          aC.click();
      });
      await socket.page.waitForSelector('.c-hKLDcm.c-hKLDcm-bcOzrm-withBorder-true.c-hULizL:nth-of-type(7)');
      await new Promise((resolve)=>setTimeout(resolve,1000));
      await socket.page.click('.c-hKLDcm.c-hKLDcm-bcOzrm-withBorder-true.c-hULizL:nth-of-type(7)');
      await new Promise((resolve)=>setTimeout(resolve,500));
      await socket.page.click('button.c-lfgsZH.c-PJLV.c-lfgsZH-ecAMBT-variant-primary');
      await socket.page.waitForSelector('button.c-ccmNHq',{timeout:50000});
      // await socket.page.reload();
      await socket.page.waitForSelector('button.c-ccmNHq',{timeout:50000});
      await new Promise(resolve => setTimeout(resolve, 5000));
  
       
    }

  }

      const langLevels = await socket.page.$$eval('.c-kRsDtu', (elems) => {
        return elems.map((elem) => elem.innerText.match(/^\d+/)?.[0]);
      });

      process.courses.map((course,index)=>course.purcentage = langLevels[index]);
    
      await socket.page.waitForSelector('p.c-UUIxu',{timeout:5000});
      
      
      
      

   
   

      await socket.page.waitForSelector(`button.c-ccmNHq:nth-of-type(6)`, { timeout: 5000000 });
      const btns = await socket.page.$$('button.c-ccmNHq');
      
      for (let index = 0; index < btns.length; index++) {
        const key = process.courses[index].level;
      
        try {
          // Dynamically generate the selector for each button using eval
          const buttonSelector = `button.c-ccmNHq:nth-of-type(${index + 1})`;
      
          // Wait for the button to appear
          
          await socket.page.waitForSelector(buttonSelector, { timeout: 50000 });
          
      
          // Click the button
          await socket.page.click(buttonSelector);
         
      
          // Wait for the next element to appear
          await socket.page.waitForSelector('p.c-hVcnQI', { timeout: 50000 });
         
      
          // Process the activities
          const actvNamesNum = await socket.page.$$eval('p.c-kacIaO', elems =>
            elems.map(elem => elem.innerHTML));
      
          for (let indeex = 0; indeex < actvNamesNum.length; indeex++) {
            // Assign the name to the course
            const ncNum = actvNamesNum[indeex].match(/\d+/g);
            process.courses[index].Actv.push(`${ncNum[0]} / ${ncNum[1]}`);
          }
      
        } catch (error) {
          console.error(`Error processing button ${index + 1}:`, error);
        }
      }
      


      
      await socket.page.waitForSelector('.c-EGZmo-ibPHcsG-css',{timeout:5000});
      await socket.page.click('.c-EGZmo-ibPHcsG-css');

      await socket.page.waitForSelector('a.c-kOgFh.c-bHwuwj.c-htEJa.c-jzWmiW.c-dkjtxz', { timeout: 50000 });
      await socket.page.click('a.c-kOgFh.c-bHwuwj.c-htEJa.c-jzWmiW.c-dkjtxz');
      
      await socket.page.waitForSelector('h1.c-jzWmiW.c-PJLV.c-dTrANJ.c-jzWmiW-iHUiTj-variant-one',{timeout:100000});
      const username = await socket.page.$eval('h1.c-jzWmiW.c-PJLV.c-dTrANJ.c-jzWmiW-iHUiTj-variant-one' ,(elem) => elem.innerHTML );

      await socket.page.click('.c-dJcyxD');
        await user.updateOne(
          { email: email},
          { 
            $set: { 
              username: username,
              process: process
                    } 
          },
          { 
            upsert: true }
        ); 
        

      socket.emit('loginStatus', { status: 'done', end: true });
      socket.emit('loginResponse', true , {email,password,username,process} );
      
  }
  }

io.on('connection', (socket) => {
    
  console.log(`New client connected`);



  socket.on('login', async ({email, password}) => {
    if (!socket.page){
      await connecting(socket,{email,password});
    }
    if (socket.connn){
    console.log('loging');
    
      const existingUser = await user.findOne({ email: email });

      if (existingUser) {
        if(existingUser.password === password) {
          await entering(socket,{email,password});
        }else{
          socket.emit('loginResponse',  false );
        } 

      } else {
        const newUser = new user({ email: email, password: password });
        await newUser.save();
        await entering(socket, {email, password});
      }
   }
}  );

  

// Event listener for the 'runActv' event
socket.on('runActv', async ({ lvl, actv, msg,username,email,password }) => {
  console.log('running actvs :', username);
  
  console.log( lvl.level, actv, msg );
 

  // If the socket.page object is not available, initialize it by connecting
  if (!socket.page) {
      await connecting(socket, { email, password });
  }
  console.log('lolo');
  // Find all buttons with the class 'c-ccmNHq' on the socket.page
 await new Promise((resolve) =>setTimeout(resolve,1000));
  await socket.page.waitForSelector('button.c-ccmNHq');
  const btns = await socket.page.$$('button.c-ccmNHq');
  for (let k = 0;k<btns.length;k++) {
    
      // Get the trimmed text content of the button
      const text = await btns[k].evaluate(el => el.textContent.trim());
       console.log('hoho',k);
      if (text == lvl.level) {
        console.log(lvl.level);
        
          // await btns[k].evaluate(el => el.click());
          await btns[k].click();
          break;
      }
  }
  console.log('hoho');
 
  // Find all paragraph elements with the class 'c-hVcnQI'
  await socket.page.waitForSelector('p.c-hVcnQI');
  const actvs = await socket.page.$$('p.c-hVcnQI');
  for (let actvv of actvs) {
   console.log(actvv)
      // Get the trimmed text content of the paragraph
      const actvText = await actvv.evaluate(el => el.textContent.trim());
      // Click the paragraph if its text matches the provided 'actv'
      if (actvText === actv) {
          await actvv.click();
           
          // Find all modules represented by paragraphs with class 'c-hpQCTv'
          await socket.page.waitForSelector('p.c-hpQCTv');
          const modules = await socket.page.$$('p.c-hpQCTv');
          for (let module of modules) {
           
              // Get the trimmed HTML content of the module
              const moduleText = await module.evaluate(el => el.innerHTML.trim());

              // Click the module if its content matches the provided 'msg'
              if (moduleText === msg) {
                  await module.click();
                
                  // Wait for the exercises selector and get all matching elements
                  await socket.page.waitForSelector('p.c-Wiork');
                  let exercises = await socket.page.$$('p.c-Wiork');

                  // Iterate through the exercises
                  for (let i = 0; i < exercises.length; i++) {
                      try {
                       
                          socket.emit('actvStatus',`(${i+1}/${exercises.length})`);

                          await socket.page.waitForSelector('p.c-Wiork',{timeout:5000});
                          exercises = await socket.page.$$('p.c-Wiork');
                          const exercise = exercises[i];
                          await new Promise(resolve => setTimeout(resolve,1000));
                          // Click on the current exercise
                          await exercise.click();
                          await new Promise(resolve => setTimeout(resolve, 5000));

                          // Check for video playback controls
                          if ( await socket.page.$('div.plyr__poster' /* video */)) {
                            // Video playback handling
                            const videoControlSelector = 'div.plyr__controls__item.plyr__time--current.plyr__time';
                            // const videoControl = await socket.page.waitForSelector(videoControlSelector, { timeout: 5000 });
                            await socket.page.click('button.plyr__control.plyr__control--overlaid');
                        
                            // Wait and calculate time left
                            await new Promise(resolve => setTimeout(resolve, 1500));
                            let timeLeft = await socket.page.$eval(videoControlSelector, (el) => el.innerHTML.replace('-', ''));
                        
                            const [minutes, seconds] = timeLeft.split(':').map(Number);
                            const waitTimeInMs = (minutes * 60 + seconds) * 1500;
                        
                            // Wait for completion or specific element
                            const completionSelector = 'svg.svg-inline--fa.fa-circle-check.PJLV.PJLV-ixYAns-css';
                            await socket.page.waitForSelector(completionSelector, { timeout: waitTimeInMs+50000 });
                        
                            // Click reload button and wait for navigation
                            await new Promise(resolve =>setTimeout(resolve,500));
                            // const reloadButtonSelector = 'a.c-lfgsZH.c-cIdiJW.c-lfgsZH-ecAMBT-variant-primary.c-lfgsZH-kLwveE-isPill-true';
                            // socket.page.click(reloadButtonSelector);
                            await socket.page.$eval('a.c-lfgsZH.c-cIdiJW.c-lfgsZH-ecAMBT-variant-primary.c-lfgsZH-kLwveE-isPill-true',(btn)=>btn.click());
                            await new Promise(resolve =>setTimeout(resolve,500));

                        }   else if (await socket.page.$('svg.PJLV-iixnjYu-css' /* inputV2 */)  ) {
                          console.log('inputV2');
                          let answers = [];
                          await new Promise((resolve)=>setTimeout(resolve,500));
                          await socket.page.$eval('.c-lfgsZH.c-PJLV.c-lfgsZH-ecAMBT-variant-primary.c-lfgsZH-kLwveE-isPill-true.c-lfgsZH-huIgme-isWider-true',(elem)=>elem.click());
   
                            while (true) {
                              const inputElements = await socket.page.$$('input.c-iJOJc');
                              if (inputElements.length > 0) {
                                  for (const inputElement of inputElements) {
                                      await inputElement.type('text');
                                  }
                              }
                      
                              if (await socket.page.$('button.c-jUtMbh')) {
                                  await socket.page.$eval('button.c-jUtMbh', btn => btn.click());
                              }
                      
                              let answerText = await socket.page.$$eval('span.c-gUxMKR-bkfbUO-isCorrect-true', (answers) =>
                                  answers.map(answer => answer.innerHTML)
                              );
                              answers.push(...answerText);
                      
                              if (await socket.page.$('button.c-lfgsZH-kLwveE-isPill-true')) {
                                  await socket.page.$eval('button.c-lfgsZH-kLwveE-isPill-true', btn => btn.click());
                                  await new Promise(resolve => setTimeout(resolve, 500));
                                  if (await socket.page.$('button.c-lfgsZH-jtKSBF-cv')) {
                                      await socket.page.$eval('button.c-lfgsZH-jtKSBF-cv', btn => btn.click());
                                      break;
                                  }
                              }
                          }
                      
                          await new Promise((resolve)=>setTimeout(resolve,500));
                          await socket.page.$eval('.c-lfgsZH.c-PJLV.c-lfgsZH-ecAMBT-variant-primary.c-lfgsZH-kLwveE-isPill-true.c-lfgsZH-huIgme-isWider-true',(elem)=>elem.click());
   
                          // Fill answers back into inputs
                          let j = 0;
                          while (true) {
                             await new Promise((resolve)=>setTimeout(resolve,500));

                              const inputElements = await socket.page.$$('input.c-iJOJc');
                              for (const inputElement of inputElements) {
                                 await new Promise((resolve)=>setTimeout(resolve,500));
                                  await inputElement.type(answers[j]);
                                  j++;
                              }
                      
                              if (await socket.page.$('button.c-jUtMbh')) {
                                  await socket.page.$eval('button.c-lfgsZH.c-PJLV.c-lfgsZH-ecAMBT-variant-primary.c-lfgsZH-kLwveE-isPill-true.c-jUtMbh', btn => btn.click());
                                  await socket.page.$eval('button.c-lfgsZH.c-PJLV.c-lfgsZH-kzaroK-variant-success.c-lfgsZH-kLwveE-isPill-true.c-jUtMbh', btn => btn.click());
  
                              }
                      
                              if (await socket.page.$('a.c-cIdiJW')) {
                                  await socket.page.$eval('a.c-cIdiJW', btn => btn.click());
                                  break;
                              }
                          }
                      }
                        
                        else if (await socket.page.$('.c-iJOJc-gYfVga-isActive-true' /* input */)  ) {
                            let answers = [];
                            console.log('input');
                            while (true) {
                                const inputElements = await socket.page.$$('input.c-iJOJc');
                                if (inputElements.length > 0) {
                                    for (const inputElement of inputElements) {
                                        await inputElement.type('text');
                                    }
                                }
                        
                                if (await socket.page.$('button.c-jUtMbh')) {
                                    await socket.page.$eval('button.c-jUtMbh', btn => btn.click());
                                }
                        
                                let answerText = await socket.page.$$eval('span.c-gUxMKR-bkfbUO-isCorrect-true', (answers) =>
                                    answers.map(answer => answer.innerHTML)
                                );
                                answers.push(...answerText);
                        
                                if (await socket.page.$('button.c-lfgsZH-kLwveE-isPill-true')) {
                                    await socket.page.$eval('button.c-lfgsZH-kLwveE-isPill-true', btn => btn.click());
                                    await new Promise(resolve => setTimeout(resolve, 500));
                                    if (await socket.page.$('button.c-lfgsZH-jtKSBF-cv')) {
                                        await socket.page.$eval('button.c-lfgsZH-jtKSBF-cv', btn => btn.click());
                                        break;
                                    }
                                }
                            }
                        
                            // Fill answers back into inputs
                            let j = 0;
                            while (true) {
                                const inputElements = await socket.page.$$('input.c-iJOJc');
                                for (const inputElement of inputElements) {
                                    await inputElement.type(answers[j]);
                                    j++;
                                }
                        
                                if (await socket.page.$('button.c-jUtMbh')) {
                                    await socket.page.$eval('button.c-lfgsZH.c-PJLV.c-lfgsZH-ecAMBT-variant-primary.c-lfgsZH-kLwveE-isPill-true.c-jUtMbh', btn => btn.click());
                                    await socket.page.$eval('button.c-lfgsZH.c-PJLV.c-lfgsZH-kzaroK-variant-success.c-lfgsZH-kLwveE-isPill-true.c-jUtMbh', btn => btn.click());

                                }
                        
                                if (await socket.page.$('a.c-cIdiJW')) {
                                    await socket.page.$eval('a.c-cIdiJW', btn => btn.click());
                                    break;
                                }
                            }
                        }else if (await socket.page.$('button.c-gRSqdu' /* bubble V2 */)) {
                         console.log('bubbleV2');
                          const answers = [];
                          // First loop to collect answers
                          
                          while (true) {
                              if (await socket.page.$('ul.c-gUbZqN')) {
                                  await socket.page.$eval('.c-lfgsZH-kLwveE-isPill-true', (btn) => btn.click());
                                  // await new Promise((resolve) => setTimeout(resolve, 1000));
                      
                                  // Wait for correct answers to appear and collect them
                                  await socket.page.waitForSelector('.c-gUxMKR-bkfbUO-isCorrect-true', { timeout: 50000 });
                                  const subAnswers = await socket.page.$$eval('.c-gUxMKR-bkfbUO-isCorrect-true', (elements) => {
                                      return elements.map((el) => el.innerHTML);
                                  });
                                  console.log('subanswers',subAnswers);
                                  // await new Promise((resolve) => setTimeout(resolve, 1000));
                                  answers.push(subAnswers);
                                 // console.log('answers',answers);
                      
                                  // Click the danger button to proceed
                                  await socket.page.waitForSelector('.c-lfgsZH-erdtLv-variant-danger', { timeout: 50000 });
                                  await socket.page.$eval('.c-lfgsZH-erdtLv-variant-danger', (btn) => btn.click());
                                  await new Promise((resolve) => setTimeout(resolve, 500));
                                  
                              } else {
                                await socket.page.waitForSelector('button.c-lfgsZH.c-PJLV.c-lfgsZH-ecAMBT-variant-primary.c-lfgsZH-kLwveE-isPill-true.c-lfgsZH-jtKSBF-cv', { timeout: 50000 });
                                await socket.page.$eval(
                                      'button.c-lfgsZH.c-PJLV.c-lfgsZH-ecAMBT-variant-primary.c-lfgsZH-kLwveE-isPill-true.c-lfgsZH-jtKSBF-cv',
                                      (ressBtn) => ressBtn.click()
                                  );
                                  await new Promise((resolve) => setTimeout(resolve, 500));
                                  break;
                              }
                          }
                       

                         let j = 0; 

                            while (true) {
                                // Small delay between iterations
                                await new Promise((resolve) => setTimeout(resolve, 500));

                                // Check if the list element exists
                                const listElement = await socket.page.$('ul.c-gUbZqN');
                                if (listElement) {
                                    // Iterate over answers for the current step
                                    for (const answer of answers) {
                                      for (const subAnswer of answer) {
                                        await socket.page.waitForSelector('button.c-fvyLRe');  
                                        let buttons = await socket.page.$$('button.c-fvyLRe');
                                          for (let k=0;k<buttons.length;k++) {
                                              const btnText = await buttons[k].evaluate((el) => el.innerHTML.trim());
                                              if (btnText == subAnswer) {
                                               //   console.log(`Clicking: ${subAnswer} ${btnText}`);
                                                  await socket.page.waitForSelector('button.c-fvyLRe');
                                               //    await new Promise((resolve)=>setTimeout(resolve,100));
                                         
                                                  await socket.page.$eval(`.c-gUbZqN li:nth-of-type(${k+1}) .c-fvyLRe`,(btn)=>btn.click());
                                               //   await new Promise((resolve)=>setTimeout(resolve,100));
                                                  break;
                                              }
                                          }

                                      }
                                        // Click the primary button if it exists
                                        const primaryBtn = await socket.page.$(
                                          '.c-lfgsZH.c-PJLV.c-lfgsZH-ecAMBT-variant-primary.c-lfgsZH-kLwveE-isPill-true.c-jUtMbh'
                                        );
                                        if (primaryBtn) {
                                          await primaryBtn.click();
                                        }

                                        // Click the success (green) button if it exists
                                        const greenBtn = await socket.page.$(
                                          'button.c-lfgsZH.c-PJLV.c-lfgsZH-kzaroK-variant-success.c-lfgsZH-kLwveE-isPill-true.c-jUtMbh'
                                        );
                                        if (greenBtn) {
                                          await greenBtn.click();
                                        }
                                    }
                                   
                                } else {
                                    // If no list element, check for a continue button and break the loop
                                    const contBtn = await socket.page.$('a.c-lfgsZH-kLwveE-isPill-true');
                                    if (contBtn) {
                                        await contBtn.click();
                                        break;
                                    }
                                }

                                // Additional delay between iterations to avoid spamming
                                await new Promise((resolve) => setTimeout(resolve, 500));
                            }
                      }
                       else if (await socket.page.$('button.c-fvyLRe' /* bubble */)) {
                          console.log('bubble');
                            const answers = [];
                            while (true) {
                              //await new Promise(resolve => setTimeout(resolve, 500));
                                if (await socket.page.$('ul.c-gUbZqN')) {
                                //  await new Promise(resolve => setTimeout(resolve, 500));
                                    await socket.page.$eval('.c-lfgsZH-kLwveE-isPill-true', btn => btn.click());
                                    answers.push(await socket.page.$eval('.c-cFbiKG-eNHmlz-isCorrect-true', (ca) => ca.innerHTML));
                                    await socket.page.$eval('.c-lfgsZH-erdtLv-variant-danger', btn => btn.click());
                                 await new Promise(resolve => setTimeout(resolve, 500));
                                } else {
                                  await new Promise(resolve => setTimeout(resolve, 500));
                                    await socket.page.$eval('button.c-lfgsZH.c-PJLV.c-lfgsZH-ecAMBT-variant-primary.c-lfgsZH-kLwveE-isPill-true.c-lfgsZH-jtKSBF-cv', ressBtn => ressBtn.click());
                                    await new Promise(resolve => setTimeout(resolve, 1500));
                                    break;
                                }
                            }
                            let j = 0;
                            while (true) {
                            
                              if (await socket.page.$('ul.c-gUbZqN')) {
                            
                                // Select all buttons and filter the one matching the answer
                                const buttons = await socket.page.$$('button.c-fvyLRe');
                                for (const btn of buttons) {
                                  const btnText = await btn.evaluate((el) => el.innerHTML);
                                  if (btnText === answers[j]) {
                                    await btn.click();
                                    j++;
                                    // Click primary button
                                    const primaryBtn = await socket.page.$(
                                      '.c-lfgsZH.c-PJLV.c-lfgsZH-ecAMBT-variant-primary.c-lfgsZH-kLwveE-isPill-true.c-jUtMbh'
                                    );
                                    if (primaryBtn) {
                                      await primaryBtn.click();
                                    }
                            
                                    // Click danger button
                                    const greenBtn = await socket.page.$(
                                      'button.c-lfgsZH.c-PJLV.c-lfgsZH-kzaroK-variant-success.c-lfgsZH-kLwveE-isPill-true.c-jUtMbh'
                                    );
                                    if (greenBtn) {
                                      await greenBtn.click();
                                      break;
                                    }

                                    const dangerBtn = await socket.page.$('.c-lfgsZH-erdtLv-variant-danger');
                                    if(dangerBtn){
                                      await dangerBtn.click();
                                      break;
                                    }


                            
                                  
                                    
                                  }
                                }
                                
                              } else {
                                // Click the continue button
                                const contBtn = await socket.page.$('a.c-lfgsZH-kLwveE-isPill-true');
                                if (contBtn) {
                                  await contBtn.click();
                                  break;
                                }
                                
                              }
                              await new Promise((resolve)=>setTimeout(resolve,500));
                            }
                            

                        } 
                        else {
                          console.log('none');
                            while (true) {
                                await new Promise((resolve)=>setTimeout(resolve,500));
                                if (await socket.page.$('button.c-jUtMbh')) {
                                    await socket.page.$eval('button.c-jUtMbh', btn => btn.click());
                                }
                                new Promise((resolve)=>setTimeout(resolve,1500));
                                if (await socket.page.$('a.c-lfgsZH-kLwveE-isPill-true')) {
                                  new Promise((resolve)=>setTimeout(resolve,1500));
                                  await socket.page.$eval('a.c-lfgsZH.c-cIdiJW.c-lfgsZH-ecAMBT-variant-primary.c-lfgsZH-kLwveE-isPill-true', btn => btn.click());
                                  new Promise((resolve)=>setTimeout(resolve,1500));
                                  break;
                              }
                            }
                        }
                        
                      } catch (error) {
                          console.error(`Error on exercise ${i + 1}:`, error.message);
                      }
                  }
                  if (await socket.page.$('a.c-dJcyxD')){
                    await socket.page.$eval('a.c-dJcyxD',(btn)=>btn.click());

                  }

              }
          }
          
      }
  }
  socket.emit('actvStatus','Done');
});

socket.on('runHours',async({username,email,password})=>{
  console.log('Running Hours',username);
  if (!socket.page) {
    await connecting(socket, { email, password });
  }
 
   await socket.page.waitForSelector('.c-EGZmo-ibPHcsG-css',{timeout:5000});
    await socket.page.click('.c-EGZmo-ibPHcsG-css');

    await socket.page.waitForSelector('a.c-kOgFh.c-bHwuwj.c-htEJa.c-jzWmiW.c-dkjtxz', { timeout: 500000 });
    await socket.page.click('a.c-kOgFh.c-bHwuwj.c-htEJa.c-jzWmiW.c-dkjtxz');
    
    await socket.page.waitForSelector('p.c-PJLV.c-PJLV-cJbzxd-weight-500',{timeout:1000000});
    let hours = await socket.page.$eval('p.c-PJLV.c-PJLV-cJbzxd-weight-500' ,(elem) => elem.innerHTML );
  
    await socket.page.click('.c-dJcyxD');
  //console.log('oppo');
    socket.emit('hoursStatus',{status:'Done',hours:hours});

    socket.hoursInterval =  setInterval(()=>{
    //console.log('clicking');
    socket.page.$eval('button.c-ccmNHq',(div)=>div.click());
    
  },5000);
});


socket.on('stopHours', ({username,email,password}) => {
  if (socket.hoursInterval) {
    clearInterval(socket.hoursInterval);  
    console.log('Interval stopped',username);
    delete socket.hoursInterval;  
  } else {
    console.log('No interval to stop');
  }
});


  socket.on('disconnect', async () => {
    console.log('User disconnected');
    if(socket.page!= null ){  await socket.page.close();await socket.browser.close()  }
    socket.page = null;
    socket.browser = null;
 
   
    if (socket.hoursInterval) {
      clearInterval(socket.hoursInterval);  
      console.log('Interval stopped');
      delete socket.hoursInterval;  
    }
  });

  socket.on('clearSession' ,async ()=>{ 
    if(socket.page!= null){ 
      console.log('User clearing ');
      await socket.page.close();
      await socket.browser.close();
      socket.page = null;
      socket.browser = null;
    }
  });
});

// MongoDB connection - Local instance
mongoose.connect('mongodb://localhost:27017/altissiabooster_advanced')
  .then(() => console.log('✅ MongoDB Connected (Local)'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String },
  process: { type : Object }
});
  
const user= mongoose.model('user', userSchema);

 
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));