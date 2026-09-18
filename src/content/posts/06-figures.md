---
title: "A figure should survive a small screen"
slug: "figures-on-a-small-screen"
description: "Images, captions, wide tables, and zoom behavior—all checked without pretending to publish a result."
pubDatetime: "2026-09-18T08:40:00Z"
lang: "en"
kind: "engineering"
tags: ["figures", "accessibility"]
sample: true
draft: false
featured: false
---

A figure can be beautiful at full resolution and useless when it is squeezed into a narrow column. This is a fixture for the second case: **the values are invented**, and the point is to see whether they remain legible.

## Use labels that carry meaning

The bars below use short labels and a clear zero baseline. The caption tells a reader what they are looking at before they have to decode the page around it.

<figure>
<img src="/images/mixture-study.svg" alt="Illustrative scores of 0.24, 0.21, and 0.23 for three fictional mixtures. Lower is better for this toy score." width="1080" height="540" loading="lazy" />
<figcaption>Three invented measurements, not empirical model results. The image opens in a larger view; Escape closes it.</figcaption>
</figure>

## Keep data available in text

| Fictional mixture | Value | Interpretation |
|:--|--:|:--|
| A | 0.24 | A layout fixture |
| B | 0.21 | A layout fixture |
| C | 0.23 | A layout fixture |

The table should be readable even when images are unavailable. It should also remain usable with a keyboard.

## A second image with a different shape

<figure>
<img src="/images/paper-sequence.svg" alt="Three schematic squares showing a flat sheet, a diagonal guide, and a triangular fold illustration. Not a validated folding sequence." width="1080" height="360" loading="lazy" />
<figcaption>A schematic paper motif. This is a layout illustration, not a verified origami design or a physics simulation.</figcaption>
</figure>

The second figure tests a much wider aspect ratio. There is no crop and no automatic animation. Its job is to sit comfortably in the reading flow.

## What to check

Resize the window, switch themes, open an image, close it with Escape, and return to the paragraph. An interaction is successful when the explanation remains easy to follow.
