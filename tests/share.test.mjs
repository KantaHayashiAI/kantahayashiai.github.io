import test from 'node:test';
import assert from 'node:assert/strict';
import { shareLinks } from '../src/lib/share.mjs';

test('four static share links preserve encoded title, URL and safety attributes', () => {
  const title = '日本語 & "title" / 83% #test';
  const url = 'https://example.com/posts/test/?a=1&b=日本語#section';
  const html = shareLinks(title, url);
  const links = [...html.matchAll(/href="([^"]+)"/g)].map(m => new URL(m[1].replaceAll('&amp;', '&')));
  assert.equal(links.length, 4);
  assert.equal(links[0].origin + links[0].pathname, 'https://x.com/intent/post');
  assert.deepEqual([...links[0].searchParams], [['text', title], ['url', url], ['via', 'KantaHayashiAI']]);
  assert.deepEqual([...links[1].searchParams], [['url', url]]);
  assert.equal(links[1].href.split('?')[0], 'https://www.linkedin.com/sharing/share-offsite/');
  assert.equal(links[2].searchParams.get('text'), title + '\n' + url);
  assert.equal(links[2].origin + links[2].pathname, 'https://bsky.app/intent/compose');
  assert.equal(links[3].protocol, 'mailto:');
  assert.deepEqual([...links[3].searchParams], [['subject', title], ['body', url]]);
  assert.equal((html.match(/target="_blank" rel="noopener noreferrer"/g) || []).length, 4);
  assert.equal((html.match(/class="sr-only"/g) || []).length, 4);
  assert.equal((html.match(/aria-hidden="true"/g) || []).length, 4);
  assert.ok(!html.includes('<script'));
  assert.ok(shareLinks(title, url, 'ja').includes('メールで記事を共有'));
});
