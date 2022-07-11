import { test, expect } from '@playwright/test';

test.describe('Book stores page', () => {
    test('should load the page', async ({ page }) => {
        const URL = 'http://localhost:3030/';

        await page.goto(URL);
        await expect(page).toHaveURL(URL);
    });
});
