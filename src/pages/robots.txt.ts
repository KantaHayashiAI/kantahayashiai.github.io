import site from "../config/site.mjs";
export function GET() {
 // Let crawlers see noindex; robots.txt is not access control.
 return new Response(`User-agent: *\nAllow: /\n${site.stage==="live"?`Sitemap: ${new URL("sitemap.xml",site.url).href}\n`:""}`,{headers:{"Content-Type":"text/plain; charset=utf-8"}});
}
