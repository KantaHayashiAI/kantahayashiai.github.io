---
title: "Give the equations some room"
slug: "give-the-equations-some-room"
description: "A math specimen: inline symbols, matrices, aligned equations, and one deliberately wide expression."
pubDatetime: "2026-09-18T08:48:00Z"
lang: "en"
kind: "research"
tags: ["math", "typography"]
sample: true
draft: false
featured: false
---

This is a **typesetting test**, not a research result. It checks whether the page can carry a mathematical explanation without making the surrounding prose difficult to read.

## Inline notation should feel like part of a sentence

Let $x\in\mathbb{R}^{d}$ and let $W\in\mathbb{R}^{m\times d}$. A linear map sends $x$ to $Wx$. The symbols should sit on the baseline, and the sentence should keep its rhythm.

For a categorical distribution, $p_k\geq 0$ and $\sum_{k=1}^{K}p_k=1$. Here the subscript, superscript, and Greek symbols $\alpha,\beta,\theta$ exercise different glyphs.

## Several lines, one argument

A stable way to write a normalized exponential is

$$
\begin{aligned}
m &= \max_j z_j,\\
\log Z &= m + \log\sum_j\exp(z_j-m),\\
p_i &= \exp(z_i-\log Z).
\end{aligned}
$$

The layout should preserve alignment and give the display a little space. Its background should not turn white when the rest of the page switches to dark mode.

### A matrix and a piecewise expression

$$
A=\begin{bmatrix}
1 & 0 & -1\\
0 & 2 & 0\\
-1 & 0 & 1
\end{bmatrix},\qquad
f(x)=\begin{cases}
x^2,&x\geq 0,\\
0,&x<0.
\end{cases}
$$

This tests delimiter sizing and negative signs. It makes no statement about a trained model.

## A deliberately wide equation

The following display is intentionally too wide for a phone. Only the equation should scroll; the whole page should not.

$$
\mathcal{L}_{\mathrm{illustrative}}(\theta)
=\underbrace{\frac{1}{N}\sum_{i=1}^{N}-\log p_{\theta}(y_i\mid x_i)}_{\text{example data term}}
+\underbrace{\lambda_1\lVert\theta\rVert_2^2}_{\text{example regularizer}}
+\underbrace{\lambda_2\sum_{j=1}^{d}\left(\theta_j-\overline{\theta}\right)^2}_{\text{another illustrative term}}
+\underbrace{\lambda_3\sum_{k=1}^{K}\left(q_k-\frac{1}{K}\right)^2}_{\text{deliberately long final term}}.
$$

This expression exists only to test overflow. It is not a proposed loss function or a recommendation.

## Back to the prose

The paragraph after the equation should return to the same measure and font size. On a small screen, scroll the display sideways, then continue reading. On a desktop, enlarge the page to 200% and check that the title, table of contents, and formulas still fit.

The [research specimen](/posts/a-small-experiment/) mixes prose, equations, and data. The [Japanese specimen](/ja/posts/typography-and-language-ja/) checks a different rhythm.
