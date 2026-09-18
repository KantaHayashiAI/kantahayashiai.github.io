# Kanta Hayashi

[English](README.md) | 日本語

`kantahayashiai.github.io` 用の、英語を中心とする個人ブログです。AstroPaperの記事管理・公開構成をもとに、[Sy Brandのサイト](https://tartanllama.xyz/)を参考にした文字中心の表示部分を作っています。

**初期状態はテスト版です。** 表示用の記事8本（英語7本・日本語1本）と非表示の下書きが入り、Jevの記事は含めていません。プレビュー中は `noindex` とし、テスト記事はRSS・サイトマップには載せません。

## 起動

Node.js 24を使い、このフォルダの中で実行します。

```sh
npm install
npm run dev
```

`http://localhost:4321` を開きます。初回インストールで作られる `package-lock.json` もGitに追加してください。次回からは `npm ci` で同じ依存関係を使えます。

```sh
npm run verify
npm run preview
```

`verify` はテスト、メタデータ検査、OG画像生成、Astroの型検査・ビルド、Pagefindの検索索引、出力検査を実行します。

**確認範囲：** 作成環境からnpmに接続できず、Astro本体のビルドは未確認です。ソーステストと、本番と共通のHTML/CSS/JavaScriptを使うブラウザー用フィクスチャの確認は実施しました。[検証記録](docs/VERIFICATION.md)で区別しています。

## 入っているもの

- Markdown / MDX、数式、コードの構文強調とコピー、脚注、開閉できる目次。
- 英語と日本語のページ、翻訳版リンク、ライト／ダークモード、画像拡大。
- Pagefind検索とJSONフォールバック、RSS、サイトマップ、canonical、OG画像。
- テスト記事／下書きの公開制御。アクセス解析、広告、コメント、LLM APIはありません。

## 編集する場所

| ファイル | 内容 |
| --- | --- |
| `src/config/site.mjs` | サイト名、URL、プレビュー／本番の切り替え |
| `src/content/posts/` | 記事 |
| `public/site.css` | 色、フォント、余白、モバイル表示 |
| `src/lib/ui.mjs` | トップページや自己紹介の文章 |
| `.github/workflows/` | GitHub Pagesへの公開手順 |

```sh
npm run new -- --title "新しいノート" --slug a-new-note --lang ja --kind notes
```

新しい記事は下書きです。本文、description、公開日などを確認し、`draft: false` で公開します。日本語記事にはOG画像用の短い英語タイトル `socialTitle` を設定してください。[執筆ガイド](docs/WRITING.md)も参照できます。

## GitHub Pagesへ公開

1. `KantaHayashiAI/kantahayashiai.github.io` リポジトリを作成します。
2. このフォルダの**中身**をリポジトリの直下に入れます。`.github/` などの隠しファイルも必要です。
3. **Settings → Pages → Source → GitHub Actions** を選びます。
4. `main` へpushすると、検査・ビルド・公開が走ります。

本番の記事を公開するときは、実際の記事を1本以上追加してから、`src/config/site.mjs` の `stage: "preview"` を `stage: "live"` へ変更します。`sample: true` の記事はページ、一覧、検索からまとめて外れます。

**プレビューや下書きはアクセス制限ではありません。** 公開リポジトリに書いた文章はソースから読めます。`.env`、APIキー、非公開資料は入れないでください。

[公開手順](docs/PUBLISHING.md) / [デザイン](docs/DESIGN.md) / [AstroPaperとの関係](UPSTREAM.md)

## ライセンス

[MIT](LICENSE)。AstroPaperの著作権表示を保持しています。フォント本体は同梱しておらず、npmで導入します。
