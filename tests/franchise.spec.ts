import { assert } from "console";
import { test, expect } from "playwright-test-coverage";

test("franchise page", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await page
    .getByLabel("Global")
    .getByRole("link", { name: "Franchise" })
    .click();
  await expect(page.getByRole("main")).toContainText(
    "So you want a piece of the pie?"
  );
  await expect(page.getByRole("list")).toContainText("franchise-dashboard");
});

test("franchise dashboard", async ({ page }) => {
  await page.route("*/**/api/auth", async (route) => {
    const loginReq = { email: "f@jwt.com", password: "franchisee" };
    const loginRes = {
      user: {
        id: 3,
        name: "pizza franchisee",
        email: "f@jwt.com",
        roles: [{ role: "franchisee" }],
      },
      token: "abcdef",
    };
    expect(route.request().method()).toBe("PUT");
    expect(route.request().postDataJSON()).toMatchObject(loginReq);
    await route.fulfill({ json: loginRes });
  });

  await page.goto("http://localhost:5173/");
  await page.getByRole("link", { name: "Login" }).click();
  await page.getByRole("textbox", { name: "Email address" }).fill("f@jwt.com");
  await page.getByRole("textbox", { name: "Password" }).fill("franchisee");
  await page.getByRole("button", { name: "Login" }).click();
  await page
    .getByLabel("Global")
    .getByRole("link", { name: "Franchise" })
    .click();
  await page
    .getByLabel("Global")
    .getByRole("link", { name: "Franchise" })
    .click();
  await expect(page.getByRole("list")).toContainText("franchise-dashboard");
});

// test("create store", async ({ page }) => {
//   await page.goto("http://localhost:5173/");
//   await page.getByRole("link", { name: "Login" }).click();
//   await page.getByRole("textbox", { name: "Email address" }).fill("f@jwt.com");
//   await page.getByRole("textbox", { name: "Password" }).fill("franchisee");
//   await page.getByRole("button", { name: "Login" }).click();
//   await page
//     .getByLabel("Global")
//     .getByRole("link", { name: "Franchise" })
//     .click();
//   await page
//     .getByLabel("Global")
//     .getByRole("link", { name: "Franchise" })
//     .click();

//   await page.getByRole("button", { name: "Create store" }).click();
//   await page.getByRole("textbox", { name: "store name" }).click();
//   await page.getByRole("textbox", { name: "store name" }).fill("test store");
//   await page.getByRole("button", { name: "Create" }).click();
//   await expect(page.locator("tbody")).toContainText("test store");
// });

// test("close store", async ({ page }) => {
//   await page.goto("http://localhost:5173/");
//   await page.getByRole("link", { name: "Login" }).click();
//   await page.getByRole("textbox", { name: "Email address" }).fill("f@jwt.com");
//   await page.getByRole("textbox", { name: "Password" }).fill("franchisee");
//   await page.getByRole("button", { name: "Login" }).click();
//   await page
//     .getByLabel("Global")
//     .getByRole("link", { name: "Franchise" })
//     .click();
//   await page
//     .getByLabel("Global")
//     .getByRole("link", { name: "Franchise" })
//     .click();

//   await page.getByRole("button", { name: "Create store" }).click();
//   await page.getByRole("textbox", { name: "store name" }).click();
//   await page.getByRole("textbox", { name: "store name" }).fill("test store");
//   await page.getByRole("button", { name: "Create" }).click();
//   await page.getByRole("button", { name: "Close" }).nth(3).click();
//   await expect(page.getByRole("heading")).toContainText("Sorry to see you go");
//   await page.getByRole("button", { name: "Close" }).click();
// });
