import { expect, test } from "@playwright/test";

const APP_URL = "http://localhost:5173";
const API_URL = "http://localhost:3000";

test.beforeEach(async ({ page, request }) => {
  // Clear all todos from the backend before each test
  await request.delete(`${API_URL}/todos`);

  // Go to the app
  await page.goto(APP_URL);

  // Wait for the app to load
  await page.waitForSelector('input[placeholder="What needs to be done?"]');
  await page.waitForTimeout(300);
});

test.describe("Todo App - Basic Functionality", () => {
  test("should add new to-do items", async ({ page }) => {
    const input = page.locator('input[placeholder="What needs to be done?"]');

    // Add first todo
    await input.fill("Buy groceries");
    await input.press("Enter");
    await page.waitForTimeout(200);

    // Verify first todo appears
    const todoItems = page.locator('[data-testid="todo-item"]');
    await expect(todoItems).toHaveCount(1);
    await expect(
      todoItems.first().locator('[data-testid="todo-title"]'),
    ).toHaveText("Buy groceries");

    // Add second todo
    await input.fill("Walk the dog");
    await input.press("Enter");
    await page.waitForTimeout(200);

    // Verify second todo appears
    await expect(todoItems).toHaveCount(2);
    await expect(
      todoItems.nth(1).locator('[data-testid="todo-title"]'),
    ).toHaveText("Walk the dog");
  });

  test("should clear the text input field when an item is added", async ({
    page,
  }) => {
    const input = page.locator('input[placeholder="What needs to be done?"]');

    // Add a todo
    await input.fill("Clean the house");
    await input.press("Enter");
    await page.waitForTimeout(200);

    // Verify input is cleared
    await expect(input).toHaveValue("");

    // Add another todo to verify it works consistently
    await input.fill("Another task");
    await input.press("Enter");
    await page.waitForTimeout(200);
    await expect(input).toHaveValue("");
  });

  test("should append new to-dos to the bottom of the list", async ({
    page,
  }) => {
    const input = page.locator('input[placeholder="What needs to be done?"]');

    // Add first todo
    await input.fill("First task");
    await input.press("Enter");
    await page.waitForTimeout(200);

    // Add second todo
    await input.fill("Second task");
    await input.press("Enter");
    await page.waitForTimeout(200);

    // Add third todo
    await input.fill("Third task");
    await input.press("Enter");
    await page.waitForTimeout(200);

    // Verify order - todos should be in the order they were added
    const todoItems = page.locator('[data-testid="todo-item"]');
    await expect(todoItems).toHaveCount(3);

    const titles = todoItems.locator('[data-testid="todo-title"]');
    await expect(titles.nth(0)).toHaveText("First task");
    await expect(titles.nth(1)).toHaveText("Second task");
    await expect(titles.nth(2)).toHaveText("Third task");
  });
});

test.describe("Todo App - Mark as Complete/Incomplete", () => {
  test("should mark to-do as complete", async ({ page }) => {
    const input = page.locator('input[placeholder="What needs to be done?"]');

    // Add a todo
    await input.fill("Task to complete");
    await input.press("Enter");
    await page.waitForTimeout(200);

    // Get the checkbox for the first todo
    const todoItem = page.locator('[data-testid="todo-item"]').first();
    const checkbox = todoItem.locator('input[type="checkbox"]');

    // Verify checkbox is initially unchecked
    await expect(checkbox).not.toBeChecked();

    // Mark as complete
    await checkbox.click();
    await page.waitForTimeout(200);

    // Verify checkbox is checked
    await expect(checkbox).toBeChecked();

    // Verify line-through style is applied to the title
    const title = todoItem.locator('[data-testid="todo-title"]');
    await expect(title).toHaveClass(/line-through/);
  });

  test("should unmark to-do as complete", async ({ page }) => {
    const input = page.locator('input[placeholder="What needs to be done?"]');

    // Add a todo
    await input.fill("Task to toggle");
    await input.press("Enter");
    await page.waitForTimeout(200);

    const todoItem = page.locator('[data-testid="todo-item"]').first();
    const checkbox = todoItem.locator('input[type="checkbox"]');
    const title = todoItem.locator('[data-testid="todo-title"]');

    // Mark as complete
    await checkbox.click();
    await page.waitForTimeout(200);
    await expect(checkbox).toBeChecked();
    await expect(title).toHaveClass(/line-through/);

    // Unmark as complete
    await checkbox.click();
    await page.waitForTimeout(200);

    // Verify checkbox is unchecked
    await expect(checkbox).not.toBeChecked();

    // Verify line-through style is removed from the title
    await expect(title).not.toHaveClass(/line-through/);
  });

  test("should correctly toggle between complete and incomplete states", async ({
    page,
  }) => {
    const input = page.locator('input[placeholder="What needs to be done?"]');

    // Add a todo
    await input.fill("Toggle test");
    await input.press("Enter");
    await page.waitForTimeout(200);

    const todoItem = page.locator('[data-testid="todo-item"]').first();
    const checkbox = todoItem.locator('input[type="checkbox"]');
    const title = todoItem.locator('[data-testid="todo-title"]');

    // Toggle multiple times
    for (let i = 0; i < 3; i++) {
      // Check
      await checkbox.click();
      await page.waitForTimeout(200);
      await expect(checkbox).toBeChecked();
      await expect(title).toHaveClass(/line-through/);

      // Uncheck
      await checkbox.click();
      await page.waitForTimeout(200);
      await expect(checkbox).not.toBeChecked();
      await expect(title).not.toHaveClass(/line-through/);
    }
  });
});

test.describe("Todo App - Todo Counter", () => {
  test("should view the current number of to-do items", async ({ page }) => {
    const input = page.locator('input[placeholder="What needs to be done?"]');
    const counter = page.locator('[data-testid="todo-count"]');

    // Add first todo
    await input.fill("First");
    await input.press("Enter");
    await page.waitForTimeout(200);
    await expect(counter).toContainText("1 item left");

    // Add second todo
    await input.fill("Second");
    await input.press("Enter");
    await page.waitForTimeout(200);
    await expect(counter).toContainText("2 items left");

    // Add third todo
    await input.fill("Third");
    await input.press("Enter");
    await page.waitForTimeout(200);
    await expect(counter).toContainText("3 items left");
  });

  test("should update counter when marking items as complete", async ({
    page,
  }) => {
    const input = page.locator('input[placeholder="What needs to be done?"]');
    const counter = page.locator('[data-testid="todo-count"]');

    // Add three todos
    await input.fill("Todo 1");
    await input.press("Enter");
    await page.waitForTimeout(200);

    await input.fill("Todo 2");
    await input.press("Enter");
    await page.waitForTimeout(200);

    await input.fill("Todo 3");
    await input.press("Enter");
    await page.waitForTimeout(200);

    await expect(counter).toContainText("3 items left");

    // Mark first as complete
    const checkboxes = page.locator(
      '[data-testid="todo-item"] input[type="checkbox"]',
    );
    await checkboxes.nth(0).click();
    await page.waitForTimeout(200);
    await expect(counter).toContainText("2 items left");

    // Mark second as complete
    await checkboxes.nth(1).click();
    await page.waitForTimeout(200);
    await expect(counter).toContainText("1 item left");

    // Unmark first
    await checkboxes.nth(0).click();
    await page.waitForTimeout(200);
    await expect(counter).toContainText("2 items left");
  });
});

test.describe("Todo App - Clear Completed", () => {
  test('should click "Clear Completed" button to remove completed items', async ({
    page,
  }) => {
    const input = page.locator('input[placeholder="What needs to be done?"]');

    // Add three todos
    await input.fill("Todo 1");
    await input.press("Enter");
    await page.waitForTimeout(200);

    await input.fill("Todo 2");
    await input.press("Enter");
    await page.waitForTimeout(200);

    await input.fill("Todo 3");
    await input.press("Enter");
    await page.waitForTimeout(200);

    // Mark first and third as complete
    const checkboxes = page.locator(
      '[data-testid="todo-item"] input[type="checkbox"]',
    );
    await checkboxes.nth(0).click();
    await page.waitForTimeout(200);
    await checkboxes.nth(2).click();
    await page.waitForTimeout(200);

    // Click clear completed button
    const clearButton = page.locator("button", { hasText: "Clear completed" });
    await clearButton.click();
    await page.waitForTimeout(200);

    // Should have only one todo left (the middle one)
    const todoItems = page.locator('[data-testid="todo-item"]');
    await expect(todoItems).toHaveCount(1);
    await expect(
      todoItems.first().locator('[data-testid="todo-title"]'),
    ).toHaveText("Todo 2");
  });

  test('should hide the "Clear Completed" button when there are no completed items', async ({
    page,
  }) => {
    const clearButton = page.locator("button", { hasText: "Clear completed" });

    // Initially, button should not be visible (no todos)
    await expect(clearButton).not.toBeVisible();

    // Add a todo
    const input = page.locator('input[placeholder="What needs to be done?"]');
    await input.fill("New todo");
    await input.press("Enter");
    await page.waitForTimeout(200);

    // Button should still not be visible (no completed todos)
    await expect(clearButton).not.toBeVisible();

    // Mark todo as complete
    const checkbox = page
      .locator('[data-testid="todo-item"]')
      .first()
      .locator('input[type="checkbox"]');
    await checkbox.click();
    await page.waitForTimeout(200);

    // Button should now be visible
    await expect(clearButton).toBeVisible();

    // Click clear completed
    await clearButton.click();
    await page.waitForTimeout(200);

    // Button should be hidden again (no completed todos)
    await expect(clearButton).not.toBeVisible();
  });

  test('should show "Clear Completed" button only when there are completed items', async ({
    page,
  }) => {
    const input = page.locator('input[placeholder="What needs to be done?"]');
    const clearButton = page.locator("button", { hasText: "Clear completed" });

    // Add two todos
    await input.fill("Task 1");
    await input.press("Enter");
    await page.waitForTimeout(200);

    await input.fill("Task 2");
    await input.press("Enter");
    await page.waitForTimeout(200);

    // Button should not be visible
    await expect(clearButton).not.toBeVisible();

    // Mark first as complete
    const checkboxes = page.locator(
      '[data-testid="todo-item"] input[type="checkbox"]',
    );
    await checkboxes.nth(0).click();
    await page.waitForTimeout(200);

    // Button should be visible
    await expect(clearButton).toBeVisible();

    // Unmark first
    await checkboxes.nth(0).click();
    await page.waitForTimeout(200);

    // Button should be hidden again
    await expect(clearButton).not.toBeVisible();

    // Mark both as complete
    await checkboxes.nth(0).click();
    await page.waitForTimeout(200);
    await checkboxes.nth(1).click();
    await page.waitForTimeout(200);

    // Button should be visible
    await expect(clearButton).toBeVisible();

    // Clear all completed
    await clearButton.click();
    await page.waitForTimeout(200);

    // Button should be hidden (no todos left)
    await expect(clearButton).not.toBeVisible();
  });
});
