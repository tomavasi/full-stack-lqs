import { test, expect } from '@playwright/test';

test.describe("Lqs", () => {
    test("Open front page", async ({ page }) => {
        test.setTimeout(60000);
        await page.goto('/');
        await page.waitForLoadState('load');
        // Wait for the 'About Us' link to be visible and clickable
        const aboutUsLink = page.getByRole('link', { name: 'About Us' });
        await expect(aboutUsLink).toBeVisible();
        await aboutUsLink.click();

        // Wait for the 'Welcome to LQS project' text to be visible
        const welcomeText = page.getByText('Welcome to LQS project');
        await expect(welcomeText).toBeVisible();
    });
});
