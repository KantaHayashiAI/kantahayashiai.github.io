/**
 * Adapted from AstroPaper's getSortedPosts (Sat Naing, MIT).
 * Upstream blob: a716a39d4f77b53ecca11e46c4fec2a6c7dbbd61.
 * Filter options are explicit so publication boundaries can be tested offline.
 */
import { postFilter } from './postFilter.mjs';
export function getSortedPosts(posts, options = {}) {
  return posts.filter(post => postFilter(post, options)).sort((a, b) =>
    Math.floor(new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() / 1000) -
    Math.floor(new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime() / 1000)
  );
}
