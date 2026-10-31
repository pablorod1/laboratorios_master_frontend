import { expect, test } from '@playwright/test';

test.describe('login scene', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/login');
  });

  test('should show required validation messages', async ({ page }) => {
    // Act
    await page.getByRole('button', { name: 'Login' }).click();

    // Assert
    await expect(page.getByText('Debe informar el campo').first()).toBeVisible();
    await expect(page.locator('input[name="user"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
  });

  test('should navigate to submodule list when login is valid', async ({
    page,
  }) => {
    // Act
    await page.locator('input[name="user"]').fill('admin');
    await page.locator('input[name="password"]').fill('test');
    await page.getByRole('button', { name: 'Login' }).click();

    // Assert
    await expect(page).toHaveURL(/#\/submodule-list$/);
    await expect(page.getByText('Proyectos')).toBeVisible();
    await expect(page.getByText('Empleados')).toBeVisible();
  });
});
