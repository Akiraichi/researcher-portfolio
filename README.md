This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## GitHub Pages への公開

本リポジトリは GitHub Pages で公開できるように設定済みです。Next.js を静的書き出し（output: "export"）し、GitHub Actions で out/ ディレクトリを Pages にデプロイします。

### 手順
1. GitHub のリポジトリ設定で Pages の Source を「GitHub Actions」に設定します。
2. デフォルトブランチ（main もしくは master）に push します。
3. 自動で「Deploy to GitHub Pages」ワークフローが走り、ビルドとデプロイが行われます。
4. デプロイ後、Actions の実行ログまたは Settings > Pages から公開 URL を確認できます。

### URL と basePath について
- プロジェクトページ（例: https://github.com/<user>/<repo> → 公開 URL は https://<user>.github.io/<repo>/）の場合、CI 環境では自動で basePath=/<repo> が設定されます。
- ユーザー／組織ページ（リポジトリ名が <user>.github.io の場合）は basePath なし（ルート配信）になります。

### ローカル開発とビルド
- 開発: `npm run dev`
- 静的書き出しビルド: `npm run build`
  - next.config.ts の `output: "export"` により、`next build` 実行で out/ が生成されます。

### 補足
- `_next` ディレクトリ配下のアセットが Jekyll によって無視されないよう、`public/.nojekyll` を配置しています。
- GitHub Actions のワークフローは `.github/workflows/gh-pages.yml` に配置しています。
- 画像最適化は静的出力に対応するため `images.unoptimized: true` を設定しています
