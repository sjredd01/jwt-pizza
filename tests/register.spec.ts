import { assert } from "console";
import { test, expect } from "playwright-test-coverage";

test("register", async ({ page }) => {
  await page.route("*/**/api/auth", async (route) => {
    const registerReq = { name: "Kai Chen", email: "d@jwt.com", password: "a" };
    const registerRes = {
      user: {
        id: 4,
        name: "Kai Chen",
        email: "d@jwt.com",
        roles: [{ role: "diner" }],
      },
      token: "abcdef",
    };
    expect(route.request().method()).toBe("POST");
    expect(route.request().postDataJSON()).toMatchObject(registerReq);
    await route.fulfill({ json: registerRes });
  });
  await page.goto("http://localhost:5173/");
  await page.getByRole("link", { name: "Register" }).click();
  await page.getByRole("textbox", { name: "Full name" }).click();
  await page.getByRole("textbox", { name: "Full name" }).fill("Kai Chen");
  await page.getByRole("textbox", { name: "Email address" }).click();
  await page.getByRole("textbox", { name: "Email address" }).fill("d@jwt.com");
  await page.getByRole("textbox", { name: "Password" }).click();
  await page.getByRole("textbox", { name: "Password" }).fill("a");
  await page.getByRole("button", { name: "Register" }).click();

  await expect(page.locator("#navbar-dark")).toContainText("Logout");
  await expect(page.getByLabel("Global")).toContainText("KC");
});
