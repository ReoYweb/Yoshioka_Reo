# CLAUDE.md

このファイルはこのリポジトリで Claude Code を使用する際のガイドです。

## プロジェクト概要

ウェブデザイナー吉岡怜央のポートフォリオサイトです。UI/UX デザイン、ウェブデザインプロジェクト、バナーデザイン、写真を展示する静的 HTML サイトです。

## アーキテクチャ

### ファイル構成
- **index.html** - ポートフォリオメインページ（ヒーロー、作品、フッター全て含む）
- **scss/** - SCSS スタイルシートファイル（目的別に整理）：
  - `main.scss` - メインのエントリーポイント（全 SCSS ファイルをインポート）
  - `abstracts/` - 変数とミックスイン
  - `base/` - ベーススタイル
  - `components/` - ナビゲーション、フッターのスタイル
  - `pages/` - ページ固有のスタイル
  - `lib/` - サードパーティライブラリのスタイル（Slick スライダー）
- **css/** - SCSS からコンパイルされた CSS 出力
- **js/** - JavaScript ファイル：
  - `common.js` - コメントアウトされた機能（参考用に保持）
  - `jquery.easeScroll.js` - スムーズスクロール機能（Windows のみ）
  - index.html の インラインスクリプト（スライダーナビ、メニュートグル）
- **images/** - ポートフォリオ画像（SVG、JPG、PNG）

### 依存関係
- **Gulp 4** - SCSS コンパイルのビルドツール
- **gulp-sass** - SCSS コンパイラプラグイン
- **Sass** - SCSS コンパイラ
- **jQuery** - DOM 操作（3.3.1、CDN から読み込み）
- **Font Awesome** - アイコンライブラリ（v5.7.2、CDN から読み込み）
- **jQuery SlitSlider** - フォトスライダーライブラリ

## よく使うコマンド

### SCSS をコンパイル
```bash
npx gulp
```

`scss/` フォルダのファイルを監視して、`css/` に最小化された CSS を自動コンパイルします。

別のオプション：
```bash
sass --watch -t compact scss:css
```

### 依存関係をインストール
```bash
npm install
```

### サイトを表示
`index.html` をブラウザで開くだけです。サーバーは不要な静的 HTML サイトです。

## 主要な機能と相互作用

### ナビゲーション（index.html、scss/components/nav.scss）
- `.burger` クリックでメニュートグル
- `#nav` 要素がサイドからスライドイン
- クリック時に `is-active` クラスを切り替え

### フォトスライダー（index.html のインラインスクリプト）
- `#slider` で jQuery SlitSlider プラグインを使用
- `#nav-dots` のドット表示でスライドを制御
- 5 枚の写真をスライドトランジション

### スムーズスクロール（js/common.js）
- Windows のみ有効：Mac や iOS 以外でスムーズスクロール
- easeScroll プラグインでホイール・矢印キーに対応

## スタイルアーキテクチャ

SCSS はコンポーネントベースの構造で整理：
- **Abstracts** - 色やレイアウト変数、共有ミックスイン
- **Base** - リセットと基本要素スタイル
- **Components** - 再利用可能なコンポーネントスタイル（ナビ、フッター）
- **Pages** - ページ固有のレイアウト・セクション
- **Lib** - サードパーティライブラリのスタイル上書き

メイン出力は `css/main.css` に最小化され、ソースマップも含まれます。

## 注意点

- レスポンシブ対応・最新の CSS/SCSS を使用
- jQuery は最小限（スライダーナビ、メニュートグルのみ）
- いくつかの JavaScript ファイル（`common.js`）はコメントアウトされ、参考用に保持
- SCSS コンパイル以外のビルドプロセスはなし（HTML・画像はそのまま配信）
- portfolio.pen はデザインファイル（本番環境では使用しない）
