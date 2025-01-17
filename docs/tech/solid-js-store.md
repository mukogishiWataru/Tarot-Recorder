タロットアプリにおいて、**store**（状態管理）で扱うべき情報は、以下の基準に基づいて設計することをお勧めします。

- アプリ全体で共有される情報
- ユーザーが複数の画面を行き来しても失われない情報
- 変更が頻繁に行われる情報

以下はタロットアプリにおいて**storeで扱うべき情報の一覧**です。

---

## **1. Storeで管理する情報の提案**

### **1.1 入力中のタロットデータ**

- 入力途中の情報を一時的に保持します。ユーザーが入力画面を離れた際にも情報を保持するために必要です。
- **構成例**:
  ```javascript
  const [inputData, setInputData] = createStore({
    date: null, // 日付
    question: '', // 質問文
    cards: [], // カード情報 (種類, 正位置/逆位置, 属性)
    tags: [], // タグ情報
  })
  ```

### **1.2 保存済みのタロット結果**

- 過去のタロット結果を表示する画面で使用します。
- データの取得はサーバーから行いますが、ローカルのstoreでキャッシュすることでスムーズなUXを実現します。
- **構成例**:
  ```javascript
  const [savedRecords, setSavedRecords] = createStore([
    {
      id: '1',
      date: '2024-12-31',
      question: '今日の運勢は？',
      cards: [
        { type: 3, position: true, attribute: '過去' },
        { type: 7, position: false, attribute: '現在' },
      ],
      tags: ['運勢', '未来'],
    },
    // 他の結果...
  ])
  ```

### **1.3 UIの状態**

- UIコンポーネントの状態（例えば、モーダルの開閉状態やロード中フラグ）を管理します。
- これにより、コンポーネント間で状態をスムーズに共有可能。
- **構成例**:
  ```javascript
  const [uiState, setUiState] = createStore({
    isLoading: false, // データ取得中のローディングフラグ
    modalVisible: false, // モーダル表示状態
    currentView: 'input', // 現在の画面 ("input" or "view")
  })
  ```

### **1.4 ユーザー設定**

- アプリに関するユーザーの設定を保持します。
  - 例: デフォルトの日付、テーマ（ライト/ダークモード）など。
- **構成例**:
  ```javascript
  const [userSettings, setUserSettings] = createStore({
    defaultDate: '2024-12-31', // 初期表示の日付
    theme: 'light', // テーマ設定 ("light" or "dark")
    recentTags: ['運勢', '恋愛'], // 最近使用したタグ（検索補助に活用）
  })
  ```

---

## **2. Storeで管理しない情報**

以下の情報は、storeで管理する必要はありませんが、必要に応じてローカルな状態（`useState`や`createSignal`）で管理することが適切です。

### **2.1 一時的な入力値**

- ユーザーが一時的に入力する値（例: タグ検索フィールドやモーダル内のテキスト入力）は、storeではなくローカルな状態で管理するのが効率的です。

### **2.2 データ取得のフラグ**

- 特定のAPIリクエストの成功/失敗フラグなどは、該当するコンポーネント内での管理が適切です。

---

## **3. Storeを利用した状態管理の実装例**

### Storeの定義

```javascript
import { createStore } from 'solid-js/store'

// Storeの定義
export const [store, setStore] = createStore({
  inputData: {
    date: null,
    question: '',
    cards: [],
    tags: [],
  },
  savedRecords: [],
  uiState: {
    isLoading: false,
    modalVisible: false,
    currentView: 'input',
  },
  userSettings: {
    defaultDate: '2024-12-31',
    theme: 'light',
    recentTags: [],
  },
})
```

### Storeの操作例

```javascript
// 入力データを更新
setStore('inputData', 'question', '明日の運勢は？')

// 保存済みのレコードを追加
setStore('savedRecords', (records) => [
  ...records,
  {
    id: '2',
    date: '2024-12-30',
    question: '健康運',
    cards: [{ type: 5, position: true, attribute: '未来' }],
    tags: ['健康'],
  },
])

// UIのロード状態を切り替え
setStore('uiState', 'isLoading', true)
```

---

## **4. Storeを活用した利便性向上ポイント**

1. **キャッシュ**:

   - 保存済みデータをstoreに保持することで、画面間を移動しても再取得の必要がなくなります。

2. **シームレスな入力フロー**:

   - 入力中のデータ（`inputData`）をstoreで管理することで、次の入力にスムーズに移行可能です。

3. **テーマ変更**:
   - `userSettings.theme`を利用して、アプリ全体でライト/ダークモードの切り替えが可能です。

---

以上の構成を参考に、タロットアプリの状態管理を設計してください。必要に応じてさらに具体的な実装例をお伝えします！
