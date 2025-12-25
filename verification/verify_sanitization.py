from playwright.sync_api import sync_playwright

def verify_sanitization(page):
    # Navigate to the local server
    page.goto("http://localhost:8080")

    # Wait for the loader to appear/disappear or just wait a bit
    page.wait_for_timeout(5000)

    # Press escape to skip intro
    page.keyboard.press("Escape")
    page.wait_for_timeout(2000)

    # Take screenshot
    page.screenshot(path="verification/app_load.png")
    print("Screenshot taken.")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_sanitization(page)
        finally:
            browser.close()
