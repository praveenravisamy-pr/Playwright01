import{test,expect} from '@playwright/test';

test('ShadowDom',async ({browser})=>{
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://books-pwakit.appspot.com/");
    await page.waitForLoadState('networkidle');
    await page.locator('#input').fill('Playwright Automation');
    await page.keyboard.press('Enter');
    await page.waitForSelector('h2');
    const heading= await page.locator('h2.title').all();
    console.log(heading.length)
    expect(heading.length).toBe(20);
})