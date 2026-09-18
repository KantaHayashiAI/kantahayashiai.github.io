"""Optional smoke test against a REAL dev/preview server, not the offline fixtures.
Install: python -m pip install playwright && python -m playwright install chromium
Run after npm run build and npm run preview:
  python qa/browser-smoke.py --url http://localhost:4321
This script was prepared but not run against Astro in the authoring environment.
"""
from pathlib import Path
from urllib.request import urlopen
from urllib.parse import urljoin
import argparse, json
from playwright.sync_api import sync_playwright

def main():
    ap=argparse.ArgumentParser();ap.add_argument('--url',default='http://localhost:4321');ap.add_argument('--out',default='output/browser-checks');ap.add_argument('--chromium');args=ap.parse_args()
    base=args.url.rstrip('/')+'/';out=Path(args.out);out.mkdir(parents=True,exist_ok=True)
    with urlopen(urljoin(base,'search-index.json'),timeout=15) as res: posts=json.load(res)
    routes=['/','/writing/','/about/','/search/','/ja/']+[p['url'] for p in posts]
    checks=[];errors=[]
    with sync_playwright() as p:
        opts={'headless':True}
        if args.chromium:opts['executable_path']=args.chromium
        browser=p.chromium.launch(**opts)
        for width in [320,390,768,1440]:
            context=browser.new_context(viewport={'width':width,'height':960},color_scheme='light')
            page=context.new_page();page.on('pageerror',lambda err:errors.append(str(err)))
            for route in routes:
                response=page.goto(urljoin(base,route.lstrip('/')),wait_until='networkidle')
                assert response and response.ok,f'{route} did not load'
                assert page.locator('main').count()==1 and page.locator('h1').count()==1,route
                assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'),f'{width}px: {route} overflows'
                checks.append(f'{width}px {route}')
            page.goto(base,wait_until='networkidle')
            page.screenshot(path=str(out/f'home-{width}.png'),full_page=True)
            if width==1440:
                page.locator('.theme-toggle').click();page.screenshot(path=str(out/'home-dark.png'),full_page=True)
            context.close()
        context=browser.new_context();page=context.new_page()
        page.goto(urljoin(base,'search/'),wait_until='networkidle');page.locator('#search-input').fill('data');page.wait_for_timeout(700)
        assert 'could not load' not in page.locator('#search-status').inner_text().lower()
        checks.append('Search engine response')
        context.close();browser.close()
    assert not errors,'JavaScript errors: '+repr(errors)
    (out/'results.json').write_text(json.dumps({'checked':checks,'page_errors':errors},indent=2))
    print(f'{len(checks)} checks passed; screenshots written to {out}')
if __name__=='__main__':main()
