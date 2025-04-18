import puppeteer, { Page } from 'puppeteer';
import { config } from 'dotenv';
import {random_number, wait} from './function.js';
import fs from 'fs';
import moment from 'moment-timezone';
config({path: '../.env'})


const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
});

const page = await browser.newPage();
console.clear()


async function run() {
    try {
        let first_run = []
        let post_1 = []
        let post_2 = []
        
        const read_cookies = fs.readFileSync('../cookies.json', 'utf-8')
        const cookies =  JSON.parse(read_cookies)
        await browser.setCookie(...cookies) // set cookies to browser
        await console.log(`[${moment().tz("Asia/Bangkok").format('MMMM Do YYYY, h:mm:ss a')}] use Cookies`)

        await page.goto('https://www.facebook.com/', {waitUntil: 'networkidle2'}); // go to facebook

        const email_selection = await page.waitForSelector('input[id="email"]',{timeout: 5000}).catch(() => null)

        if(email_selection) {
            console.log('login facebook wait...')
            await page.waitForSelector('input[id="pass"]')
            await page.type('input[id="email"]', process.env.email, {delay: random_number(20, 40)}) // login facebook with email and password
            await page.type('input[id="pass"]', process.env.password, {delay: random_number(10, 40)})
            await page.click('button[type="submit"]')
        }else {
            const get_cookies = await browser.cookies()
            fs.writeFileSync('../cookies.json', JSON.stringify(get_cookies, null, 2)); // save cookies to file
            console.log(`[${moment().tz("Asia/Bangkok").format('MMMM Do YYYY, h:mm:ss a')}] cookies saved`)
            //console.log(get_cookies)
        }

        await page.goto(process.env.facebook_page_url, {waitUntil: 'networkidle2'}); // go to facebook page
        await page.waitForSelector('div[data-pagelet="ProfileTimeline"]')

        try{         
            await page.waitForSelector('div[data-pagelet="ProfileTimeline"]')
            const a = await page.$$eval('div[data-pagelet="ProfileTimeline"] a[href*="/posts/"]', elements =>elements.map(e => e.href)                
            );
            if (!a.length) throw new Error("No post link found");

            try {
                first_run.push(a[0].split('?')[0])
            }catch{
                first_run.push(a[0])
            }

        }catch{
            await page.waitForSelector('div[data-pagelet="ProfileTimeline"]')
            const a = await page.$$eval('div[data-pagelet="ProfileTimeline"] a[href*="/videos/"]',elements => elements.map(e => e.href)
            );
            try {
                first_run.push(a[0].split('?')[0])
            }catch{
                first_run.push(a[0])
            }
        }

        console.log('This First :', first_run[0])
    
        await page.goto(first_run[0], {waitUntil: 'networkidle2'});
        await page.waitForSelector('div[aria-label="เขียนความคิดเห็น…"]')
        await page.type('div[aria-label="เขียนความคิดเห็น…"]', process.env.comment_post, {delay: random_number(10, 40)})
        await page.click('div[id="focused-state-composer-submit"]')

            while(true){
                

                try {
                    await page.goto('https://www.facebook.com/', {waitUntil: 'networkidle2'}); // go to facebook
                    await page.goto(process.env.facebook_page_url, {waitUntil: 'networkidle2'}); // go to facebook page]
                    await page.waitForSelector('div[data-pagelet="ProfileTimeline"]') // wait for post to load
                    const a = await page.$$eval('div[data-pagelet="ProfileTimeline"] a[href*="/posts/"]',  elements => elements.map(e => e.href))
                    if (!a.length) throw new Error("No post link found");

                    try {
                        await post_1.push(a[0].split('?')[0]) // remove query string from url
                    }catch{
                        await post_1.push(a[0])

                    }
                }catch{
        
                    await page.waitForSelector('div[data-pagelet="ProfileTimeline"]') // wait for post to load
                    const a = await page.$$eval('div[data-pagelet="ProfileTimeline"] a[href*="/videos/"]',  elements => elements.map(e => e.href))
                    
                    try {
                        await post_1.push(a[0].split('?')[0]) // remove query string from url
        
                    }catch{
                        await post_1.push(a[0])
                    }    
                }

                const random_wait = await random_number(1200000, 2000000)
                await console.log(`[${moment().tz("Asia/Bangkok").format('MMMM Do YYYY, h:mm:ss a')}] ${random_wait}`)
                await wait(random_wait)

                try {
                    await page.goto('https://www.facebook.com/', {waitUntil: 'networkidle2'}); // go to facebook
                    await page.goto(process.env.facebook_page_url, {waitUntil: 'networkidle2'}); // go to facebook page]
                    await page.waitForSelector('div[data-pagelet="ProfileTimeline"]') // wait for post to load
                    const a = await page.$$eval('div[data-pagelet="ProfileTimeline"] a[href*="/posts/"]',  elements => elements.map(e => e.href))
                    if (!a.length) throw new Error("No post link found");

                    try {
                        await post_2.push(a[0].split('?')[0]) // remove query string from url
                    }catch{
                        await post_2.push(a[0])
                    }

                }catch{
        
                    await page.waitForSelector('div[data-pagelet="ProfileTimeline"]') // wait for post to load
                    const a = await page.$$eval('div[data-pagelet="ProfileTimeline"] a[href*="/videos/"]',  elements => elements.map(e => e.href))
                    
                    try {
                        await post_2.push(a[0].split('?')[0]) // remove query string from url
                    }catch{
                        await post_2.push(a[0])
                    }        
                }

                if(post_1[0].split('?')[0] === post_2[0].split('?')[0]) {
                    console.log(`[${moment().tz("Asia/Bangkok").format('MMMM Do YYYY, h:mm:ss a')}] Post is the same`)
                    post_1.length = 0 
                    post_2.length = 0 

                }else {
                    await page.goto(process.env.facebook_page_url, {waitUntil: 'networkidle2'})
                    await page.goto(post_2[0].split('?')[0], {waitUntil: 'networkidle2'});
                    await page.waitForSelector('div[aria-label="เขียนความคิดเห็น…"]')
                    await page.type('div[aria-label="เขียนความคิดเห็น…"]', process.env.comment_post, {delay: random_number(10, 40)})
                    await page.click('div[id="focused-state-composer-submit"]')
            
                    await page.goto('https://www.facebook.com/', {waitUntil: 'networkidle2'}); // go to facebook
                    await page.goto(process.env.facebook_page_url, {waitUntil: 'networkidle2'}); // go to facebook page]

                    console.log(`[${moment().tz("Asia/Bangkok").format('MMMM Do YYYY, h:mm:ss a')}] Post is different`)
                    post_1.length = 0 // clear array
                    post_2.length = 0 // clear array
                }
            }
        
    }catch(error){
        console.error(error)}
}
run()