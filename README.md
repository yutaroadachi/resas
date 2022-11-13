# 総人口推移グラフ

都道府県別の総人口推移グラフを表示します。

## Getting Started

```bash
yarn install
yarn dev
```

ブラウザで[http://localhost:3000](http://localhost:3000)を開いてください。

## アーキテクチャ

[ISR](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)で[RESAS API](https://opendata.resas-portal.go.jp/docs/api/v1/index.html)の[都道府県一覧](https://opendata.resas-portal.go.jp/docs/api/v1/prefectures.html)を取得し、クライアントで[RESAS API](https://opendata.resas-portal.go.jp/docs/api/v1/index.html)の[人口構成](https://opendata.resas-portal.go.jp/docs/api/v1/population/composition/perYear.html)を[API Routes](https://nextjs.org/docs/api-routes/introduction)経由で取得しています。

## ディレクトリ構成

[bulletproof-react](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md)を参考にしています。

アプリケーションコードは`src`配下に格納しており、エイリアスとして`@/`を設定しています。
