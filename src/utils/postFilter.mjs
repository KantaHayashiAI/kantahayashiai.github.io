/**
 * Adapted from AstroPaper's postFilter (Sat Naing, MIT).
 * Upstream blob: a2e4682cbb3c7c5480e8f1bcf646b5ae4b3a5b06.
 * This edition additionally hides sample posts in live mode, and hides future
 * posts even in preview. Preview mode is not a private/authenticated route.
 */
export function postFilter({ data }, { stage = 'preview', now = Date.now() } = {}) {
  const isPublishTimePassed = now >= new Date(data.pubDatetime).getTime();
  return !data.draft && isPublishTimePassed && (stage === 'preview' || !data.sample);
}
