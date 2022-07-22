import pw, { test } from '@playwright/test';
import { BOOK_STORES_MOCK } from './book-stores.mock';

/**
    Helper function to wrap values for playwright assertions
 */
const textVal = (value: string): string => `'${value}'`;

/**
 * This is my first time using Playwright tests. There is definitely room for improvement:
 *  - Used weird 'pw' alias as a work around, to avoid failing eslint jest rules (conflicting with unit tests setup).
 *  - All assertions crammed into single test.
 *  It could be split into separate tests, if we beforeEach performance is acceptable.
 *  - Attempt to test rating value exposed a11y issues within Rating component.
 */
pw.describe('Book stores page', () => {
    const URL = 'http://localhost:3030/';
    pw.beforeEach(async ({ page }) => {
        await page.route('http://localhost:3000/stores', (route): unknown =>
            route.fulfill({
                status: 200,
                body: JSON.stringify(BOOK_STORES_MOCK),
            }),
        );
        await page.goto(URL);
    });

    test('should load page', async ({ page }) => {
        const store = BOOK_STORES_MOCK.data[0].attributes;

        // correct page loaded
        pw.expect(page.url()).toBe(URL);

        // list contains cards for all stores
        pw.expect(await page.locator('li').count()).toEqual(
            BOOK_STORES_MOCK.data.length,
        );

        // select first card and assert its elements
        const card = page.locator('li').first();
        await card.waitFor();
        // store name
        await card.locator(textVal(store.name)).waitFor();
        // formatted date
        await card.locator(textVal('09.02.1995')).waitFor();
        // website url
        await card.locator(textVal(store.website)).waitFor();
        // rating: todo: fix Rating component a11y, and assert current value
        const ratingEl = card.locator('div[aria-label=rating]').first();
        await ratingEl.waitFor();
        pw.expect(await ratingEl.locator('div[role="button"]').count()).toBe(5);
        await Promise.all([
            ratingEl.locator('div[aria-label="1 star"]').click(),
            page.waitForRequest('http://localhost:3000/stores/1'),
        ]);
        await Promise.all([
            ratingEl.locator('div[aria-label="5 stars"]').click(),
            page.waitForRequest('http://localhost:3000/stores/1'),
        ]);
        // best sellers
        await card.locator(textVal('JavaScript: The Good Parts')).waitFor();
        await card.locator(textVal('Douglas Crockford')).waitFor();

        // store image
        await card.locator(`img[src="${store.storeImage}"]`).waitFor();

        // external website
        await Promise.all([
            page.waitForEvent('popup'),
            page.locator(textVal(store.website)).click(),
        ]);

        // country flag
        await card.locator('img[alt="Country flag"]').waitFor();
        await card
            .locator('img[src="https://flagcdn.com/24x18/au.png"]')
            .waitFor();

        // last store does not have any books listed
        const cardLast = page.locator('li').last();
        await cardLast.locator(textVal('No data available')).waitFor();
    });
});
