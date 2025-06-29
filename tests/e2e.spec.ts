import { test, expect } from '@playwright/test';

test.describe('Lernkarten App E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto('/');
    
    // Wait for the app to load
    await page.waitForSelector('h1:has-text("Lernkarten")');
  });

  test.describe('Navigation', () => {
    test('should display all navigation items', async ({ page }) => {
      // Check if all navigation buttons are present
      await expect(page.getByRole('button', { name: 'Lernen' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Quiz' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Statistik' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Karte hinzufügen' })).toBeVisible();
    });

    test('should navigate between pages', async ({ page }) => {
      // Start on Learn page
      await expect(page.getByRole('heading', { name: 'Lernen' })).toBeVisible();

      // Navigate to Quiz page
      await page.getByRole('button', { name: 'Quiz' }).click();
      await expect(page.getByRole('heading', { name: 'Quiz' })).toBeVisible();

      // Navigate to Stats page
      await page.getByRole('button', { name: 'Statistik' }).click();
      await expect(page.getByRole('heading', { name: 'Statistik' })).toBeVisible();

      // Navigate to Add Card page - use force click for mobile compatibility
      await page.getByRole('button', { name: 'Karte hinzufügen' }).click({ force: true });
      await expect(page.getByRole('heading', { name: 'Karte hinzufügen' })).toBeVisible();

      // Navigate back to Learn page
      await page.getByRole('button', { name: 'Lernen' }).click();
      await expect(page.getByRole('heading', { name: 'Lernen' })).toBeVisible();
    });

    test('should highlight active navigation item', async ({ page }) => {
      // Check that Learn is active by default
      await expect(page.getByRole('button', { name: 'Lernen' })).toHaveClass(/bg-blue-700/);

      // Navigate to other pages and check active state
      await page.getByRole('button', { name: 'Karte hinzufügen' }).click({ force: true });
      await expect(page.getByRole('button', { name: 'Karte hinzufügen' })).toHaveClass(/bg-blue-700/);
    });
  });

  test.describe('Learn Page - Flashcard Functionality', () => {
    test('should display flashcard with German word initially', async ({ page }) => {
      // Check that we're on the learn page
      await expect(page.getByRole('heading', { name: 'Lernen' })).toBeVisible();

      // Check that a German word is displayed
      const flashcard = page.locator('.bg-white.rounded-lg.shadow-lg');
      await expect(flashcard).toBeVisible();
      
      // The card should contain German text (not empty)
      const cardText = await flashcard.locator('h2').textContent();
      expect(cardText).toBeTruthy();
      expect(cardText!.length).toBeGreaterThan(0);
    });

    test('should flip card when clicked', async ({ page }) => {
      // Get the initial German word
      const initialText = await page.locator('.bg-white.rounded-lg.shadow-lg h2').textContent();
      
      // Click on the card to flip it
      await page.locator('.bg-white.rounded-lg.shadow-lg').click();
      
      // Wait for the flip animation and check that English translation is shown
      await expect(page.locator('.bg-blue-50.rounded-lg.shadow-lg')).toBeVisible();
      await expect(page.locator('.bg-blue-50.rounded-lg.shadow-lg h3')).toBeVisible();
      
      // Check that answer buttons appear
      await expect(page.getByRole('button', { name: 'Falsch' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Richtig' })).toBeVisible();
    });

    test('should show answer buttons after flipping', async ({ page }) => {
      // Flip the card
      await page.locator('.bg-white.rounded-lg.shadow-lg').click();
      
      // Check that both answer buttons are visible
      const wrongButton = page.getByRole('button', { name: 'Falsch' });
      const correctButton = page.getByRole('button', { name: 'Richtig' });
      
      await expect(wrongButton).toBeVisible();
      await expect(correctButton).toBeVisible();
      
      // Check button styling
      await expect(wrongButton).toHaveClass(/bg-red-500/);
      await expect(correctButton).toHaveClass(/bg-green-500/);
    });

    test('should progress to next card after answering', async ({ page }) => {
      // Get the first card's German word
      const firstCardText = await page.locator('.bg-white.rounded-lg.shadow-lg h2').textContent();
      
      // Flip and answer correctly
      await page.locator('.bg-white.rounded-lg.shadow-lg').click();
      await page.getByRole('button', { name: 'Richtig' }).click();
      
      // Wait for the next card to load
      await page.waitForTimeout(100);
      
      // Check that we have a new card (different text)
      const secondCardText = await page.locator('.bg-white.rounded-lg.shadow-lg h2').textContent();
      expect(secondCardText).not.toBe(firstCardText);
    });

    test('should track incorrect answers for review mode', async ({ page }) => {
      // Answer a few cards incorrectly
      for (let i = 0; i < 3; i++) {
        await page.locator('.bg-white.rounded-lg.shadow-lg').click();
        await page.getByRole('button', { name: 'Falsch' }).click();
        await page.waitForTimeout(100);
      }
      
      // Check that review button appears with correct count
      await expect(page.getByRole('button', { name: /Wiederholung \(3\)/ })).toBeVisible();
    });

    test('should show progress bar', async ({ page }) => {
      // Check that progress bar is visible
      await expect(page.locator('.bg-gray-200.rounded-full')).toBeVisible();
      
      // Check that progress percentage is shown
      await expect(page.locator('text=/[0-9]+%/')).toBeVisible();
    });

    test('should show session info', async ({ page }) => {
      // Check that session info section is visible
      await expect(page.locator('text=Session-Info')).toBeVisible();
      await expect(page.locator('text=Gesamt Karten:')).toBeVisible();
      await expect(page.locator('text=Falsch beantwortet:')).toBeVisible();
    });

    test('should reset session when restart button is clicked', async ({ page }) => {
      // Answer a few cards to create some state
      await page.locator('.bg-white.rounded-lg.shadow-lg').click();
      await page.getByRole('button', { name: 'Falsch' }).click();
      await page.waitForTimeout(100);
      
      // Click restart button
      await page.getByRole('button', { name: 'Neustart' }).click();
      
      // Check that we're back to the first card (progress should be reset)
      await expect(page.locator('text=/Karte 1 von/')).toBeVisible();
    });
  });

  test.describe('Add Card Page', () => {
    test('should display add card form', async ({ page }) => {
      // Navigate to add card page
      await page.getByRole('button', { name: 'Karte hinzufügen' }).click({ force: true });
      
      // Check form elements
      await expect(page.getByLabel('Deutsches Wort')).toBeVisible();
      await expect(page.getByLabel('Englische Übersetzung')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Karte speichern' })).toBeVisible();
    });

    test('should add new custom card', async ({ page }) => {
      // Navigate to add card page
      await page.getByRole('button', { name: 'Karte hinzufügen' }).click({ force: true });
      
      // Fill out the form
      await page.getByLabel('Deutsches Wort').fill('Testwort');
      await page.getByLabel('Englische Übersetzung').fill('test word');
      
      // Submit the form
      await page.getByRole('button', { name: 'Karte speichern' }).click();
      
      // Check success message
      await expect(page.locator('text=Karte erfolgreich hinzugefügt!')).toBeVisible();
      
      // Check that the card appears in the list
      await expect(page.locator('text=Testwort')).toBeVisible();
      await expect(page.locator('text=test word')).toBeVisible();
    });

    test('should show error for empty fields', async ({ page }) => {
      // Navigate to add card page
      await page.getByRole('button', { name: 'Karte hinzufügen' }).click({ force: true });
      
      // Try to submit empty form
      await page.getByRole('button', { name: 'Karte speichern' }).click();
      
      // Check error message
      await expect(page.locator('text=Bitte fülle beide Felder aus.')).toBeVisible();
    });

    test('should delete custom card', async ({ page }) => {
      // Navigate to add card page
      await page.getByRole('button', { name: 'Karte hinzufügen' }).click({ force: true });
      
      // Add a test card first
      await page.getByLabel('Deutsches Wort').fill('DeleteTest');
      await page.getByLabel('Englische Übersetzung').fill('delete test');
      await page.getByRole('button', { name: 'Karte speichern' }).click();
      
      // Wait for success message to clear
      await page.waitForTimeout(3000);
      
      // Delete the card
      await page.getByRole('button', { name: 'Löschen' }).first().click();
      
      // Check deletion message
      await expect(page.locator('text=Karte gelöscht!')).toBeVisible();
      
      // Check that card is no longer in the list
      await expect(page.locator('text=DeleteTest')).not.toBeVisible();
    });

    test('should show empty state when no custom cards', async ({ page }) => {
      // Navigate to add card page
      await page.getByRole('button', { name: 'Karte hinzufügen' }).click({ force: true });
      
      // Check empty state message
      await expect(page.locator('text=Du hast noch keine eigenen Karten erstellt.')).toBeVisible();
    });
  });

  test.describe('Integration Tests', () => {
    test('should use custom cards in learn mode', async ({ page }) => {
      // First add a custom card
      await page.getByRole('button', { name: 'Karte hinzufügen' }).click({ force: true });
      await page.getByLabel('Deutsches Wort').fill('IntegrationTest');
      await page.getByLabel('Englische Übersetzung').fill('integration test');
      await page.getByRole('button', { name: 'Karte speichern' }).click();
      
      // Wait for success message
      await page.waitForTimeout(3000);
      
      // Go back to learn page
      await page.getByRole('button', { name: 'Lernen' }).click();
      
      // Wait for cards to load and reload
      await page.waitForTimeout(1000);
      
      // Check that the total card count has increased (indicating custom cards are loaded)
      const cardCountText = await page.locator('text=/Karte 1 von/').textContent();
      const cardCount = parseInt(cardCountText!.match(/Karte 1 von (\d+)/)![1]);
      
      // Should have more than 250 cards (250 default + custom cards)
      expect(cardCount).toBeGreaterThan(250);
    });

    test('should persist custom cards across page reloads', async ({ page }) => {
      // Add a custom card
      await page.getByRole('button', { name: 'Karte hinzufügen' }).click({ force: true });
      await page.getByLabel('Deutsches Wort').fill('PersistTest');
      await page.getByLabel('Englische Übersetzung').fill('persist test');
      await page.getByRole('button', { name: 'Karte speichern' }).click();
      
      // Wait for success message
      await page.waitForTimeout(3000);
      
      // Reload the page
      await page.reload();
      
      // Navigate back to add card page
      await page.getByRole('button', { name: 'Karte hinzufügen' }).click({ force: true });
      
      // Check that the card is still there
      await expect(page.locator('text=PersistTest')).toBeVisible();
      await expect(page.locator('text=persist test')).toBeVisible();
    });
  });

  test.describe('Responsive Design', () => {
    test('should work on mobile viewport', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Check that navigation is still accessible
      await expect(page.getByRole('button', { name: 'Lernen' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Quiz' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Statistik' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Karte hinzufügen' })).toBeVisible();
      
      // Test flashcard functionality on mobile
      await page.locator('.bg-white.rounded-lg.shadow-lg').click();
      await expect(page.getByRole('button', { name: 'Falsch' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Richtig' })).toBeVisible();
    });
  });
}); 