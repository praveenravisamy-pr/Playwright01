import { test, expect, chromium, Page } from '@playwright/test';
test.describe('JQueryCalendarEx', () => {
   async function calendar(page: Page, date: string, month: string, year: string, isFuture: boolean) {
    await page.click("//input[@id='datepicker']");
    while (true) {
        const currentYear = await page.locator("//span[@class='ui-datepicker-year']").textContent();
        const currentMonth = await page.locator("//span[@class='ui-datepicker-month']").textContent();

        if (currentYear?.trim() === year && currentMonth?.trim() === month) {
            break;
        }
        if (isFuture) {
            await page.click("//span[@class='ui-icon ui-icon-circle-triangle-e']");
        } else {
            await page.click("//span[@class='ui-icon ui-icon-circle-triangle-w']");
        }
        await page.waitForTimeout(200);
    }
    const calendarDates = await page.locator("//tbody/tr/td/a").all();
    for (let i = 0; i < calendarDates.length; i++) {
        const text = await calendarDates[i].innerText();
        if (text === date) {
            await calendarDates[i].click();
            break;
        }
    }
}
    test('CalendarAutomation', async () => {
        const browser = await chromium.launch({ headless: false });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://testautomationpractice.blogspot.com/');
        await calendar(page, '20', 'May', '2026', true);
    })
}
);
