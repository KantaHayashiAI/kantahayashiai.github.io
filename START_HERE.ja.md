# 最初に開くファイル

このフォルダはGitHub Pagesに公開する**ソースコード**です。Jevの記事はまだ入っていません。

## まず見る

別添の `kanta-blog-preview.html` をダウンロードしてブラウザーで開くと、レイアウトと記事の移動を試せます。これは表示確認用のHTMLプレビューで、Astroからビルドされたものではありません。スクリーンショットも共有する表示コードのプレビューです。

## Astroとして動かす

Node.js 24を用意し、このフォルダで実行します。

```sh
npm install
npm run dev
```

`http://localhost:4321` を開きます。本番ビルドは `npm run verify`、確認用サーバーは `npm run preview` です。

作成環境ではnpmへの接続ができず、依存パッケージの導入とAstroビルドは未確認です。`package-lock.json` は初回の `npm install` で生成されます。架空のlockfileや成功ログは付けていません。

## GitHubへ

- リポジトリ名：`kantahayashiai.github.io`
- このフォルダの**中身**をリポジトリ直下に入れます。
- `.github/` などの隠しファイルも必要です。MacのFinderでは `⌘ + Shift + .` で表示できます。
- **Settings → Pages → Source → GitHub Actions** を選びます。

最初はテスト記事入りのプレビューです。実記事を入れたら、`src/config/site.mjs` の `stage: "preview"` を `stage: "live"` に変更します。テスト記事は本番のページ・一覧・検索から外れます。

説明は [README.ja.md](README.ja.md)、公開手順は [docs/PUBLISHING.md](docs/PUBLISHING.md) にあります。
