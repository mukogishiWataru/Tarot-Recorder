# Release Notes - Tarot Recorder

## Version 0.0.0 (Beta)

### リリース日

2025年1月5日

### 概要

このバージョンは、タロット占い結果を入力、保存、閲覧するための基本的な機能を提供します。まだUI・UXは調整されておらず、最低限の機能のみ実装されています。

### 実装された機能

- **タロット結果入力機能 (/input)**

  - 占い結果（質問、日付、カード情報、タグ）を入力可能。
  - 入力内容をFirebase Firestoreに送信。

- **データ閲覧機能 (/view)**

  - 保存されたタロット結果を一覧表示。

- **ホーム画面 (/)**

  - /input と /view へのリンクを表示。

- **バックエンドセットアップ**

  - FirebaseおよびFirestoreの環境構築。
  - Firestoreに保存されたデータを取得する機能。

- **開発環境構築**

  - Bun, Solid.js, Tailwind CSS, Firebase CLIを使用。

- **デプロイ**
  - Firebase Hostingを利用。

### 注意点

- **未完成の部分**

  - UI/UX調整が未実施。
  - アプリの操作性やデザインに関する最適化は今後の課題。

- **セキュリティ**
  - Firebase Authenticationで匿名認証を採用予定。

### 今後の課題

1. 入力フォームのエラーハンドリングとバリデーションの強化。
2. UI/UXの改善とモバイル対応の最適化。
3. タグや日付での検索・絞り込み機能の強化。
4. Firestoreのセキュリティルールの最適化。