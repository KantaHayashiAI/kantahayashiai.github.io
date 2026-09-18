---
title: "A readable log is part of the experiment"
slug: "a-readable-log"
description: "Code, terminal output, and long lines: a small stress test for an engineering write-up."
pubDatetime: "2026-09-18T08:54:00Z"
lang: "en"
kind: "engineering"
tags: ["code", "tooling", "reproducibility"]
sample: true
draft: false
featured: false
---

A log is useful when it lets the next person reconstruct a decision. That next person might be a collaborator—or you, two months from now. The code on this page is a self-contained formatting example, not a record of a production system.

## Keep the boundary small

This Python function validates three mixture weights before normalizing them. It is short enough to inspect without collapsing the code block.

```python
from math import isfinite

def normalize(weights: list[float]) -> list[float]:
    """Normalize finite, non-negative weights with a positive sum."""
    if not weights or any(not isfinite(w) or w < 0 for w in weights):
        raise ValueError("Weights must be finite and non-negative.")
    total = sum(weights)
    if total <= 0:
        raise ValueError("At least one weight must be positive.")
    return [weight / total for weight in weights]

assert normalize([2.0, 3.0, 5.0]) == [0.2, 0.3, 0.5]
```

Try the copy button with a keyboard. Then paste into a plain-text editor: presentation should not add line numbers or hide part of the source.

## Show the change

A diff should be recognizable from both the sign and the background—not from color alone.

```diff
- print(result)
+ print({"result": result, "seed": seed, "config": config})
```

The build also supports Shiki's line annotations:

```typescript
const attempts = 3;
const timeoutMs = 20_000; // [!code highlight]
const run = { attempts, timeoutMs, synthetic: true };
console.log(run);
```

## Let long lines scroll

The next line is intentionally long. It should scroll inside its own code block instead of stretching the article beyond the phone screen.

```bash
python train.py --dataset ./data/illustrative-training-mixture.jsonl --output ./runs/formatting-specimen --seed 42 --total-tokens 1000000 --log-interval 100 --save-configuration-before-start
```

## Make tables navigable

| Run ID | Dataset identifier | Token budget | Seed | Status | Result location |
|:--|:--|--:|--:|:--|:--|
| fixture-a | web-books-code-layout-only | 1,000,000 | 42 | Synthetic | `runs/fixture-a/metrics.json` |
| fixture-b | books-code-web-layout-only | 1,000,000 | 43 | Synthetic | `runs/fixture-b/metrics.json` |

A wide table is a good reason for local horizontal scrolling. It is not a good reason to shrink every word in the article.

## A deliberately ordinary finish

A readable engineering note does not need a different visual treatment for every paragraph. A few headings, good code blocks, and an explicit limitation often do more.

For equations and references, see [a small experiment](/posts/a-small-experiment/). For text rather than implementation, visit [the reading room](/posts/a-reading-room/).
