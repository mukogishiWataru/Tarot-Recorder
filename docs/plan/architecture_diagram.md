## アーキテクチャー図

### システム構成図

- **フロントエンド**
  - 使用技術: Solid.js, Tailwind CSS, Shadcn（ヘッドレスUIライブラリ）
  - デプロイ: Firebase Hosting
- **バックエンド**
  - 使用技術: Firebase（Firestore, Authentication, Cloud Functions）
  - セキュリティ: Firebase Authentication（匿名認証）
  - データベース: Firestore（NoSQL）
- **ストレージ**
  - 保存形式: JSON
  - バックアップ: Firestoreの内蔵バックアップ機能
- **開発環境**
  - Package Manager: Bun
  - CI/CD: Firebase CLIでのデプロイ

```
+-----------------+
|     ユーザー      |
+-----------------+
        |
        v
+-----------------+          +----------------------+
| フロントエンド(Solid.js) |<----->| Firebase Firestore |
| Firebase Hosting          |      | (データ保存)       |
+-----------------+          +----------------------+
        |
        v
+----------------------------+
| Firebase Authentication    |
| (匿名認証)                 |
+----------------------------+
```
