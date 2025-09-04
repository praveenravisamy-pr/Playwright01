import { test, expect, chromium } from '@playwright/test'

test('CalendarAutomation', async () => {
    const Browser = await chromium.launch({ headless: false })
    const context = await Browser.newContext();
    const page = await context.newPage();
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.waitForLoadState('networkidle');
    await page.locator('//input[@id="datepicker"]').click();
    await page.waitForTimeout(5000);
    await page.waitForSelector('table');
    await expect(page.locator('//table[@class="ui-datepicker-calendar"]')).toBeVisible({ timeout: 3000 });
    const NumberofPages = context.pages();
    console.log("Number of instance created by playwright:", NumberofPages)
    let targetDate: string = '20'
    let TargetMonth: string = 'May'
    let TargetYear: string = '2000'
    let futureDate: boolean = true; // true for future date, false for past date
    while (true) {
        const month = await page.locator('//span[@class="ui-datepicker-month"]').textContent();
        const Year = await page.locator("//span[@class='ui-datepicker-year']").textContent();
        if (month === TargetMonth && Year === TargetYear) {
            break;
        }

        if (!futureDate) {
            await page.locator('.ui-datepicker-next').click();
        }

        else {
            await page.locator('.ui-datepicker-prev').click();
        }

    }
})