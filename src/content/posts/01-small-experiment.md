---
title: "A small experiment, carefully reported"
slug: "a-small-experiment"
description: "A specimen for equations, evidence, tables, and the space between an observation and a claim."
pubDatetime: "2026-09-18T08:58:00Z"
lang: "en"
kind: "research"
tags: ["evaluation", "data", "math"]
sample: true
draft: false
featured: true
---

A research note should make it easy to see what was asked, what was measured, and what remains unknown. This specimen puts those pieces on the same page. **All values below are invented layout fixtures**, not model results.

## Start with the question

Suppose we are comparing three ways to construct a tiny training mixture. Before choosing the most attractive number, we want to make the comparison legible: the same token budget, an explicit metric, and a place to record uncertainty.

> A useful experiment leaves a trail that another person can inspect—not just a conclusion they are asked to accept.

This is also a typography test. A reader should be able to distinguish the main argument from a caveat without needing a rainbow of boxes.

## Define the quantity

For a predicted distribution $q$ and observed class $y$, an illustrative squared-error score is

$$
S(q,y)=\sum_{k=1}^{K}\left(q_k-\mathbf{1}[k=y]\right)^2.
$$

The notation is here to exercise inline and display mathematics. It is **not** evidence that any particular model is calibrated.

### Keep denominators visible

If $N$ is the number of examples, write the average explicitly:

$$
\overline{S}=\frac{1}{N}\sum_{i=1}^{N}S\left(q^{(i)},y_i\right).
$$

Do not quietly change the denominator when moving from a table to a figure.[^denominator]

## Put the comparison on the page

| Illustrative mixture | Web | Books | Code | Toy score |
|:--|--:|--:|--:|--:|
| A | 50% | 30% | 20% | 0.24 |
| B | 35% | 40% | 25% | 0.21 |
| C | 25% | 35% | 40% | 0.23 |

**Lower is better for this fictional score.** The difference is deliberately small; this page makes no claim that B is a better training recipe.

<figure>
  <img src="/images/mixture-study.svg" alt="Three illustrative scores: A is 0.24, B is 0.21, and C is 0.23. These are invented values." width="1080" height="540" loading="lazy" />
  <figcaption>Figure 1. Invented scores for checking labels, captions, and image enlargement. Tap the image to inspect it.</figcaption>
</figure>

## Preserve the trail

A minimal record can be plain JSON. It should be easy to copy, compare, and store alongside the code.

```json
{
  "experiment": "layout-fixture",
  "synthetic": true,
  "seed": 42,
  "mixture": { "web": 0.35, "books": 0.40, "code": 0.25 },
  "toy_score": 0.21
}
```

The fixture above is intentionally small. More detail belongs in a repository when it helps reproduction, rather than in an increasingly long sidebar.

<details>
<summary>What this page is testing</summary>
<p>Two levels of headings, inline and display math, a numeric table, a figure with a caption, a JSON block, a collapsible note, and footnotes. None of these values come from a real training run.</p>
</details>

## Leave the right question open

An attractive result is the start of an explanation, not a substitute for one. A full write-up would need the actual data, uncertainty estimates, repeated runs, and alternative explanations.

Here the useful next step is smaller: read this page on a phone, switch to dark mode, and make sure the equation and the table can scroll **without moving the whole page**. The [interactive mixture](/posts/a-data-mixture-you-can-move/) checks the same quantities in a different form.

[^denominator]: This footnote is a navigation fixture. Its return link should take you back to the reference in the paragraph. It contains no additional empirical result.
