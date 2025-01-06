# Tarot Recorder

## デプロイ

### 必要条件

- **Node.js**
- **bun**
- **Firebase CLI**: Firebase CLIがインストールされていることを確認してください。
  ```bash
  bun add -g firebase-tools
  ```
- **Firebase ログイン**: Firebaseにログイン済みである必要があります。
  ```bash
  firebase login
  ```

### ビルド手順

1. プロジェクトのルートディレクトリで以下のコマンドを実行してビルドします。

   ```bash
   bun x vite build
   ```

   - `dist/`フォルダに静的ファイルが出力されます。
   - ※`bun build`では上手くいかない。

### デプロイ手順

1. Firebase CLIを使用して以下のコマンドを実行します。

   ```bash
   firebase deploy
   ```

   - node.jsが有効になっていないとdeployできない。

2. デプロイが成功したか確認するために、以下のURLにアクセスします。
   [Tarot Recorder](https://tarot-recorder.web.app)

---

この手順に従えば、Tarot Recorderを簡単にデプロイできます。必要に応じてカスタマイズしてください。
