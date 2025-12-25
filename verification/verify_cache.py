from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.on("console", lambda msg: print(f"Browser console: {msg.text}"))

        page.goto("http://localhost:8080")

        try:
            page.wait_for_selector("#loader-overlay", state="hidden", timeout=10000)
        except:
            page.evaluate("document.getElementById('loader-overlay').style.display = 'none'")
            page.evaluate("document.getElementById('star-wars-intro').style.display = 'none'")

        page.wait_for_timeout(2000)

        print("Entering Planet View...")
        page.evaluate("""
            if (window.skillsPlanets && window.skillsPlanets.length > 0) {
                window.showSkillsDetail(window.skillsPlanets[0]);
            } else {
                console.error("No skillsPlanets found");
            }
        """)

        page.wait_for_timeout(2000)
        page.screenshot(path="verification/planet_view.png")

        stats = page.evaluate("""
            ({
                meshes: window.cachedPlanetMeshes ? window.cachedPlanetMeshes.length : -1
            })
        """)
        print(f"Stats: {stats}")

        if stats['meshes'] > 0:
            print("SUCCESS: Cached meshes populated.")
        else:
            print("FAILURE: Cached meshes empty.")

        browser.close()

if __name__ == "__main__":
    run()
